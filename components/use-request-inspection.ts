"use client";

import { useEffect, useState } from "react";
import {
  readResponseHeaders,
  type RequestInspection,
} from "@/lib/request-inspection";

export function useRequestInspection(endpoint: string, enabled: boolean) {
  const [inspection, setInspection] = useState<RequestInspection | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const controller = new AbortController();
    const url = new URL(endpoint, window.location.origin);
    const referrer = new URL(window.location.pathname, window.location.origin)
      .href;
    const referrerPolicy = "strict-origin-when-cross-origin";
    const requestHeaders = {
      Accept: "application/json",
      "Accept-Language": navigator.languages.join(", ") || navigator.language,
      "Cache-Control": "no-cache",
    };
    const general = [
      { name: "Request URL", value: url.href },
      { name: "Request method", value: "GET" },
      { name: "Status code", value: "Loading…" },
      { name: "Remote address", value: "Not exposed by browser APIs" },
      { name: "Referrer policy", value: referrerPolicy },
    ];
    const pending: RequestInspection = {
      general,
      responseHeaders: [],
      requestHeaders: [
        ...Object.entries(requestHeaders).map(([name, value]) => ({
          name,
          value,
        })),
        { name: "Referer", value: referrer },
      ],
    };

    setInspection(pending);
    setIsLoading(true);

    async function inspectRequest() {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: requestHeaders,
          cache: "no-store",
          referrer,
          referrerPolicy,
          signal: AbortSignal.any([
            controller.signal,
            AbortSignal.timeout(10000),
          ]),
        });
        const status =
          `${response.status} ${response.statusText || (response.status === 200 ? "OK" : "")}`.trim();
        const responseHeaders = readResponseHeaders(response.headers);
        await response.body?.cancel();

        if (!controller.signal.aborted) {
          setInspection({
            ...pending,
            general: general.map((field) =>
              field.name === "Status code"
                ? { ...field, value: status }
                : field,
            ),
            responseHeaders,
          });
        }
      } catch {
        if (!controller.signal.aborted) {
          setInspection({
            ...pending,
            general: general.map((field) =>
              field.name === "Status code"
                ? { ...field, value: "Request failed" }
                : field,
            ),
            error: "Couldn’t load live headers. Reopen this tab to try again.",
          });
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    void inspectRequest();
    return () => controller.abort();
  }, [endpoint, enabled]);

  return { inspection, isLoading };
}
