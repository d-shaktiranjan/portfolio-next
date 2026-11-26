"use client";

import { useState, type ReactNode } from "react";
import type { ApiResponse } from "@/lib/api";
import { JsonCode } from "@/components/json-code";
import { RequestHeaders } from "@/components/request-headers";
import { useRequestInspection } from "@/components/use-request-inspection";
import { CopyIcon } from "@/components/copy-icon";

type ResponseView = "Preview" | "JSON" | "Headers";
const views: ResponseView[] = ["Preview", "JSON", "Headers"];
const command = "npx hi-dev";
const commandCopied = "Command copied to clipboard.";
const responseCopied = "Copied to clipboard.";

export function ApiConsole({
  endpoint,
  initialResponse,
  children,
  statusCode = 200,
}: {
  endpoint: string;
  initialResponse: ApiResponse<unknown> | null;
  children: ReactNode;
  statusCode?: 200 | 404;
}) {
  const status = statusCode === 404 ? "404 Not Found" : "200 OK";
  const [view, setView] = useState<ResponseView>("Preview");
  const response =
    initialResponse === null ? "" : JSON.stringify(initialResponse, null, 2);
  const [feedback, setFeedback] = useState("");
  const { inspection, isLoading } = useRequestInspection(
    endpoint,
    view === "Headers",
  );

  async function copyResponse() {
    try {
      await navigator.clipboard.writeText(response);
      setFeedback(responseCopied);
    } catch {
      setFeedback("Couldn’t copy. Select the text to copy it manually.");
    }
  }

  async function copyCommand() {
    try {
      await navigator.clipboard.writeText(command);
      setFeedback(commandCopied);
    } catch {
      setFeedback("Couldn’t copy command.");
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
          <button
            type="button"
            className={`status ${statusCode === 404 ? "failure" : "success"} status-button`}
            aria-label={`${status} — View headers`}
            aria-controls="response-body"
            aria-pressed={view === "Headers"}
            onClick={() => {
              setView("Headers");
              setFeedback("");
            }}
          >
            <span className="status-dot" aria-hidden="true" />
            {status}
          </button>
        </div>
      </div>

      <div id="response-body" className="response-body">
        {view === "JSON" && (
          <button
            type="button"
            className="copy-button floating-copy-button"
            onClick={copyResponse}
          >
            Copy response
            <CopyIcon copied={feedback === responseCopied} />
          </button>
        )}
        <div className="response-scroll">
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
      </div>

      <footer className="response-meta">
        <span>
          <span className="meta-dot" aria-hidden="true" />
          application/json
        </span>
        <button
          type="button"
          className="copy-button"
          onClick={copyCommand}
          aria-label={`Copy ${command}`}
          title={`Copy ${command}`}
        >
          <code>{command}</code>
          <CopyIcon copied={feedback === commandCopied} />
        </button>
      </footer>
      <span className="sr-only" role="status">
        {feedback}
      </span>
    </section>
  );
}
