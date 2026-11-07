"use client";

import { useRef, useState, type ReactNode } from "react";
import type { ProfileApiResponse } from "@/lib/profile";
import { JsonCode } from "@/components/json-code";

type ResponseView = "Preview" | "JSON" | "Headers";
const views: ResponseView[] = ["Preview", "JSON", "Headers"];
const requestHeaders = { Accept: "application/json" };
const requestHeadersText = Object.entries(requestHeaders)
  .map(([name, value]) => `${name.toLowerCase()}: ${value}`)
  .join("\n");

export function ApiConsole({
  initialResponse,
  children,
}: {
  initialResponse: ProfileApiResponse;
  children: ReactNode;
}) {
  const [view, setView] = useState<ResponseView>("Preview");
  const [response, setResponse] = useState(
    JSON.stringify(initialResponse, null, 2),
  );
  const [responseHeaders, setResponseHeaders] = useState(
    "content-type: application/json",
  );
  const [status, setStatus] = useState("200 OK");
  const [duration, setDuration] = useState<number | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [feedback, setFeedback] = useState("");
  const requestInFlight = useRef(false);

  async function sendRequest() {
    if (requestInFlight.current) return;
    requestInFlight.current = true;
    setIsSending(true);
    setFeedback("");
    // Keep the indicator perceptible even when the local endpoint responds instantly.
    const minimumLoadingTime = new Promise<void>((resolve) => {
      setTimeout(resolve, 300);
    });

    try {
      const start = performance.now();
      const result = await fetch("/api/me", {
        headers: requestHeaders,
        cache: "no-store",
        signal: AbortSignal.timeout(10000),
      });
      const body = await result.json();
      const elapsed = Math.round(performance.now() - start);
      await minimumLoadingTime;
      setDuration(elapsed);
      setStatus(`${result.status} ${result.statusText}`);
      setResponse(JSON.stringify(body, null, 2));
      setResponseHeaders(
        Array.from(result.headers, ([key, value]) => `${key}: ${value}`).join(
          "\n",
        ),
      );
      if (!result.ok) setView("JSON");
      setFeedback(
        result.ok ? "Response received." : "The request returned an error.",
      );
    } catch {
      await minimumLoadingTime;
      setStatus("Request failed");
      setDuration(null);
      setFeedback("Couldn’t reach the endpoint. Please try again.");
    } finally {
      requestInFlight.current = false;
      setIsSending(false);
    }
  }

  async function copyResponse() {
    try {
      await navigator.clipboard.writeText(
        view === "Headers"
          ? `Request Headers\n${requestHeadersText}\n\nResponse Headers\n${responseHeaders}`
          : response,
      );
      setFeedback("Copied to clipboard.");
    } catch {
      setFeedback("Couldn’t copy. Open the JSON view to select the response.");
    }
  }

  return (
    <div className="api-workspace">
      <div className="workspace-label">
        <span className="workspace-mark" aria-hidden="true">
          [s]
        </span>{" "}
        shakti / personal-api <span className="version">v1.0</span>
      </div>

      <section className="api-console" aria-label="Shakti’s personal API">
        <div className="request-bar">
          <span className="method">GET</span>
          <a
            href="/api/me"
            className="endpoint"
            aria-label="Open the raw API response"
          >
            /api/me
          </a>
          <span className="request-format">HTTP/1.1</span>
          <button
            className="send-button"
            onClick={sendRequest}
            disabled={isSending}
            aria-label={isSending ? "Sending request" : "Send"}
          >
            Send
            <span
              className={isSending ? "send-icon is-loading" : "send-icon"}
              aria-hidden="true"
            >
              {isSending ? null : "↗"}
            </span>
          </button>
        </div>

        <div className="response-toolbar">
          <div
            className="response-views"
            role="group"
            aria-label="Response view"
          >
            {views.map((item) => (
              <button
                key={item}
                className={view === item ? "view-button active" : "view-button"}
                aria-pressed={view === item}
                aria-controls="response-body"
                onClick={() => {
                  setView(item);
                  setFeedback("");
                }}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="response-status" aria-live="polite">
            <span
              className={
                status.startsWith("200") ? "status success" : "status failure"
              }
            >
              <span className="status-dot" />
              {status}
            </span>
            <span
              className="response-duration"
              style={{ visibility: duration === null ? "hidden" : "visible" }}
              aria-hidden={duration === null}
            >
              {duration ?? "—"} ms
            </span>
          </div>
        </div>

        <div id="response-body" className="response-body" aria-busy={isSending}>
          <div hidden={view !== "Preview"}>{children}</div>
          {view === "JSON" && (
            <pre
              className="raw-response"
              tabIndex={0}
              aria-label="JSON response"
            >
              <JsonCode value={response} />
            </pre>
          )}
          {view === "Headers" && (
            <div className="headers-view">
              <section aria-labelledby="request-headers-title">
                <h2 id="request-headers-title">Request Headers</h2>
                <p className="headers-note">
                  Application-set headers. The browser may add others.
                </p>
                <pre tabIndex={0} aria-label="Request headers">
                  <code>{requestHeadersText}</code>
                </pre>
              </section>
              <section aria-labelledby="response-headers-title">
                <h2 id="response-headers-title">Response Headers</h2>
                <pre tabIndex={0} aria-label="Response headers">
                  <code>{responseHeaders}</code>
                </pre>
              </section>
            </div>
          )}
        </div>

        <div className="response-meta">
          <span role="status">
            <span className="meta-dot" aria-hidden="true" />
            {feedback || "application/json"}
          </span>
          <button className="copy-button" onClick={copyResponse}>
            <span aria-hidden="true">⧉</span>{" "}
            {view === "Headers" ? "Copy headers" : "Copy response"}
          </button>
        </div>
      </section>
    </div>
  );
}
