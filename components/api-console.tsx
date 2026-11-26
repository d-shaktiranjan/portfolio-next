"use client";

import {
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react";
import type { ApiResponse } from "@/lib/api";
import {
  inspectRequest,
  type RequestInspection,
} from "@/lib/request-inspection";
import { JsonCode } from "@/components/json-code";
import { CopyIcon } from "@/components/copy-icon";
import { CurrentPathLink } from "@/components/current-path-link";
import { RequestHeaders } from "@/components/request-headers";

type ResponseView = "Preview" | "JSON" | "Headers";
type ViewSelection =
  | { view: "Preview" | "JSON" }
  | {
      view: "Headers";
      controller?: AbortController;
      inspection: RequestInspection | Promise<RequestInspection>;
    };
type CachedInspection = {
  endpoint: string | null;
  expiresAt: number;
  inspection: RequestInspection;
};
const views: ResponseView[] = ["Preview", "JSON", "Headers"];
const inspectionCacheDurationMs = 30_000;
const command = "npx hi-dev";
const commandCopied = "Command copied to clipboard.";
const responseCopied = "Copied to clipboard.";

function readCachedInspection(
  cached: CachedInspection | null,
  endpoint: string | null,
) {
  if (
    cached &&
    cached.endpoint === endpoint &&
    cached.inspection.referrer ===
      window.location.origin + window.location.pathname &&
    cached.expiresAt > performance.now()
  ) {
    return cached.inspection;
  }
}

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
}: {
  endpoint: string | null;
  initialResponse: ApiResponse<unknown> | null;
  children: ReactNode;
}) {
  const statusCode = endpoint === null ? 404 : 200;
  const status = statusCode === 404 ? "404 Not Found" : "200 OK";
  const [selection, setSelection] = useState<ViewSelection>({
    view: "Preview",
  });
  const inspectionCache = useRef<CachedInspection | null>(null);
  const { view } = selection;
  const controller = selection.view === "Headers" ? selection.controller : null;
  const response =
    initialResponse === null ? "" : JSON.stringify(initialResponse, null, 2);
  const [feedback, setFeedback] = useState("");

  useEffect(() => () => controller?.abort(), [controller]);

  function selectView(nextView: ResponseView) {
    setFeedback("");
    if (nextView === view) return;

    if (nextView === "Headers") {
      const cached = readCachedInspection(inspectionCache.current, endpoint);
      if (cached) {
        setSelection({ view: nextView, inspection: cached });
        return;
      }

      const controller = new AbortController();
      const inspection = inspectRequest(endpoint, controller.signal).then(
        (result) => {
          if (!result.error && !controller.signal.aborted) {
            inspectionCache.current = {
              endpoint,
              expiresAt: performance.now() + inspectionCacheDurationMs,
              inspection: result,
            };
          }
          return result;
        },
      );
      setSelection({
        view: nextView,
        controller,
        inspection,
      });
    } else {
      controller?.abort();
      setSelection({ view: nextView });
    }
  }

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
        {endpoint === null ? (
          <span className="text-[17px]">
            <CurrentPathLink />
          </span>
        ) : (
          <a
            href={endpoint}
            className="text-[17px] hover:text-accent"
            aria-label="Open the raw API response"
          >
            {endpoint}
          </a>
        )}
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
              onClick={() => selectView(item)}
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
            onClick={() => selectView("Headers")}
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
          <div hidden={view !== "Headers"}>
            <RequestHeaders
              endpoint={endpoint}
              inspection={
                selection.view === "Headers" ? selection.inspection : null
              }
            />
          </div>
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
