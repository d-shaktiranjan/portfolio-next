export type HeaderField = { name: string; value: string };

export type RequestInspection = {
  general: HeaderField[];
  responseHeaders: HeaderField[];
  requestHeaders: HeaderField[];
  error?: string;
};

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

export function readResponseHeaders(headers: Headers): HeaderField[] {
  return responseHeaderNames.flatMap((name) => {
    const value = headers.get(name);
    return value === null ? [] : [{ name, value }];
  });
}
