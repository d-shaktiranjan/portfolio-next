"use client";

import { useState, type ReactNode } from "react";
import type { ApiResponse } from "@/lib/api";
import { JsonCode } from "@/components/json-code";

type ResponseView = "Preview" | "JSON" | "Headers";
const views: ResponseView[] = ["Preview", "JSON", "Headers"];
const requestHeadersText = "accept: application/json";
const responseHeaders = "content-type: application/json";

export function ApiConsole({
  endpoint,
  initialResponse,
  children,
}: {
  endpoint: string;
  initialResponse: ApiResponse<unknown>;
  children: ReactNode;
}) {
  const [view, setView] = useState<ResponseView>("Preview");
  const response = JSON.stringify(initialResponse, null, 2);
  const [feedback, setFeedback] = useState("");

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
    <section className="api-console" aria-label="Shakti’s personal API">
      <div className="request-bar">
        <span className="method">GET</span>
        <a
          href={endpoint}
          className="endpoint"
          aria-label="Open the raw API response"
        >
          {endpoint}
        </a>
        <span className="request-format">HTTP/1.1</span>
      </div>

      <div className="response-toolbar">
        <div className="response-views" role="group" aria-label="Response view">
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
        <div className="response-status">
          <span className="status success">
            <span className="status-dot" />
            200 OK
          </span>
        </div>
      </div>

      <div id="response-body" className="response-body">
        <div hidden={view !== "Preview"}>{children}</div>
        {view === "JSON" && (
          <pre className="raw-response" tabIndex={0} aria-label="JSON response">
            <JsonCode value={response} />
          </pre>
        )}
        {view === "Headers" && (
          <div className="headers-view">
            <section aria-labelledby="request-headers-title">
              <h2 id="request-headers-title">Request Headers</h2>
              <p className="headers-note">
                Expected headers for this endpoint. The browser may add others.
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
  );
}
