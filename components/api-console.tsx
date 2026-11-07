"use client";

import { useState, type ReactNode } from "react";
import type { ApiResponse } from "@/lib/api";
import { JsonCode } from "@/components/json-code";
import { RequestHeaders } from "@/components/request-headers";
import { useRequestInspection } from "@/components/use-request-inspection";
import { formatRequestInspection } from "@/lib/request-inspection";

type ResponseView = "Preview" | "JSON" | "Headers";
const views: ResponseView[] = ["Preview", "JSON", "Headers"];

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
  const { inspection, isLoading } = useRequestInspection(
    endpoint,
    view === "Headers",
  );

  async function copyResponse() {
    try {
      await navigator.clipboard.writeText(
        view === "Headers" && inspection
          ? formatRequestInspection(inspection)
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
          <RequestHeaders inspection={inspection} isLoading={isLoading} />
        )}
      </div>

      <div className="response-meta">
        <span role="status">
          <span className="meta-dot" aria-hidden="true" />
          {feedback || "application/json"}
        </span>
        <button
          className="copy-button"
          onClick={copyResponse}
          disabled={view === "Headers" && (isLoading || !inspection)}
        >
          <span aria-hidden="true">⧉</span>{" "}
          {view === "Headers" ? "Copy headers" : "Copy response"}
        </button>
      </div>
    </section>
  );
}
