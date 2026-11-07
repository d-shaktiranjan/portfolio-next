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

export function formatRequestInspection(inspection: RequestInspection) {
  return [
    { title: "General", fields: inspection.general },
    { title: "Response headers", fields: inspection.responseHeaders },
    { title: "Request headers", fields: inspection.requestHeaders },
  ]
    .map(({ title, fields }) =>
      [title, ...fields.map(({ name, value }) => `${name}: ${value}`)].join(
        "\n",
      ),
    )
    .join("\n\n");
}
