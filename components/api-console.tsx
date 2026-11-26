"use client";

import { useState, type ComponentProps, type ReactNode } from "react";
import type { ApiResponse } from "@/lib/api";
import { JsonCode } from "@/components/json-code";
import { RequestHeaders } from "@/components/request-headers";
import { CopyIcon } from "@/components/copy-icon";

type ResponseView = "Preview" | "JSON" | "Headers";
const views: ResponseView[] = ["Preview", "JSON", "Headers"];
const command = "npx hi-dev";
const commandCopied = "Command copied to clipboard.";
const responseCopied = "Copied to clipboard.";

function CopyButton({
  copied,
  floating,
  children,
  ...props
}: Pick<
  ComponentProps<"button">,
  "aria-label" | "title" | "onClick" | "children"
> & {
  copied: boolean;
  floating?: boolean;
}) {
  return (
    <button
      {...props}
      type="button"
      data-floating={floating || undefined}
      className="flex shrink-0 items-center gap-1.75 rounded-sm border border-border-strong bg-surface-soft px-2 py-1 text-[13px] whitespace-nowrap text-foreground hover:border-muted data-floating:absolute data-floating:inset-e-4 data-floating:inset-bs-2 data-floating:z-1 data-floating:font-mono"
    >
      {children}
      <CopyIcon copied={copied} />
    </button>
  );
}

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
    <section
      className="flex h-full max-h-full min-h-0 flex-col overflow-hidden rounded-xl border border-border-strong bg-surface shadow-[0_16px_64px_#00000012]"
      aria-label="Shakti’s personal API"
    >
      <div className="flex shrink-0 items-center gap-4.75 border-b border-border py-4 pr-4.5 pl-6 font-mono mobile:gap-3.5 mobile:px-4 mobile:py-3.5">
        <span className="text-[16px] font-semibold text-accent">GET</span>
        <a
          href={endpoint}
          className="text-[17px] hover:text-accent"
          aria-label="Open the raw API response"
        >
          {endpoint}
        </a>
        <span className="ml-auto text-[14px] text-muted mobile:hidden">
          HTTP/1.1
        </span>
      </div>

      <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-border px-6 mobile:px-4">
        <div
          className="flex gap-5.75 mobile:gap-4.25"
          role="group"
          aria-label="Response view"
        >
          {views.map((item) => (
            <button
              key={item}
              className="border-b-2 border-transparent pt-3.5 pb-3 text-[15px] text-muted hover:text-foreground aria-pressed:border-accent aria-pressed:text-foreground"
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
        <div className="flex items-center gap-3.5 font-mono text-[14px] mobile:gap-1.75 mobile:text-[13px]">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 py-1.5 text-success underline-offset-4 hover:underline data-[status=404]:text-failure"
            data-status={statusCode}
            aria-label={`${status} — View headers`}
            aria-controls="response-body"
            aria-pressed={view === "Headers"}
            onClick={() => {
              setView("Headers");
              setFeedback("");
            }}
          >
            <span
              className="size-1.25 rounded-full bg-current"
              aria-hidden="true"
            />
            {status}
          </button>
        </div>
      </div>

      <div id="response-body" className="relative flex min-h-0 flex-1 flex-col">
        {view === "JSON" && (
          <CopyButton
            copied={feedback === responseCopied}
            floating
            onClick={copyResponse}
          >
            Copy response
          </CopyButton>
        )}
        <div className="min-h-0 flex-1 scrollbar-thin [scrollbar-color:var(--color-border-strong)_transparent] overflow-y-auto">
          <div hidden={view !== "Preview"}>{children}</div>
          {view === "JSON" && (
            <pre
              className="px-10 py-8.5 font-mono text-[16px] leading-[1.9] wrap-anywhere whitespace-pre-wrap text-secondary mobile:px-5.5 mobile:py-6 mobile:text-[15px]"
              tabIndex={0}
              aria-label="JSON response"
            >
              <JsonCode value={response} />
            </pre>
          )}
          {view === "Headers" && (
            <RequestHeaders key={endpoint} endpoint={endpoint} />
          )}
        </div>
      </div>

      <footer className="flex shrink-0 items-center justify-between gap-3 border-t border-border px-6 py-3 font-mono text-[13px] text-muted mobile:px-4 mobile:py-2.75">
        <span className="flex min-w-0 items-center gap-1.75 truncate">
          <span className="size-1 rounded-full bg-muted" aria-hidden="true" />
          application/json
        </span>
        <CopyButton
          copied={feedback === commandCopied}
          onClick={copyCommand}
          aria-label={`Copy ${command}`}
          title={`Copy ${command}`}
        >
          <code>{command}</code>
        </CopyButton>
      </footer>
      <span className="sr-only" role="status">
        {feedback}
      </span>
    </section>
  );
}
