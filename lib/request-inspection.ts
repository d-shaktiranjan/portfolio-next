export type HeaderField = { name: string; value: string };

export type RequestInspection = {
  url: string;
  status: string;
  referrer: string;
  acceptLanguage: string;
  responseHeaders: HeaderField[];
  error?: string;
};

export const inspectionRequestHeaders = {
  Accept: "application/json",
  "Cache-Control": "no-cache",
};

export const inspectionReferrerPolicy = "strict-origin-when-cross-origin";

// Keep the inspector focused on useful, public response metadata.
const responseHeaderNames = [
  "Content-Type",
  "Date",
  "Cache-Control",
  "ETag",
  "Content-Length",
  "Content-Encoding",
  "Vary",
];

function readResponseHeaders(headers: Headers): HeaderField[] {
  return responseHeaderNames.flatMap((name) => {
    const value = headers.get(name);
    return value === null ? [] : [{ name, value }];
  });
}

export async function inspectRequest(
  endpoint: string | null,
  signal: AbortSignal,
): Promise<RequestInspection> {
  const referrerUrl = new URL(window.location.href);
  referrerUrl.search = "";
  referrerUrl.hash = "";
  const referrer = referrerUrl.href;
  const url = endpoint === null ? referrerUrl : new URL(endpoint, referrerUrl);
  const acceptLanguage = navigator.languages.join(", ") || navigator.language;
  const requestHeaders = {
    ...inspectionRequestHeaders,
    "Accept-Language": acceptLanguage,
  };
  const requestDetails = { url: url.href, referrer, acceptLanguage };

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: requestHeaders,
      cache: "no-store",
      referrer,
      referrerPolicy: inspectionReferrerPolicy,
      signal: AbortSignal.any([signal, AbortSignal.timeout(10000)]),
    });
    const status =
      `${response.status} ${response.statusText || (response.status === 200 ? "OK" : "")}`.trim();
    const responseHeaders = readResponseHeaders(response.headers);
    void response.body?.cancel().catch(() => {});

    return {
      ...requestDetails,
      status,
      responseHeaders,
    };
  } catch {
    return {
      ...requestDetails,
      status: "Request failed",
      responseHeaders: [],
      error: "Couldn’t load live headers. Reopen this tab to try again.",
    };
  }
}
