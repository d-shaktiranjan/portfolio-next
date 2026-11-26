"use client";

import { useEffect, useState } from "react";
import {
  readResponseHeaders,
  type RequestInspection,
} from "@/lib/request-inspection";

export function useRequestInspection(endpoint: string) {
  const [inspection, setInspection] = useState<RequestInspection | null>(null);

  useEffect(() => {
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
    const general = (status: string) => [
      { name: "Request URL", value: url.href },
      { name: "Request method", value: "GET" },
      { name: "Status code", value: status },
      { name: "Remote address", value: "Not exposed by browser APIs" },
      { name: "Referrer policy", value: referrerPolicy },
    ];
    const displayedRequestHeaders = [
      ...Object.entries(requestHeaders).map(([name, value]) => ({
        name,
        value,
      })),
      { name: "Referer", value: referrer },
    ];

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
            general: general(status),
            requestHeaders: displayedRequestHeaders,
            responseHeaders,
          });
        }
      } catch {
        if (!controller.signal.aborted) {
          setInspection({
            general: general("Request failed"),
            requestHeaders: displayedRequestHeaders,
            responseHeaders: [],
            error: "Couldn’t load live headers. Reopen this tab to try again.",
          });
        }
      }
    }

    void inspectRequest();
    return () => controller.abort();
  }, [endpoint]);

  return inspection;
}
