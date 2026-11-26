import { useRequestInspection } from "@/components/use-request-inspection";
import type { HeaderField } from "@/lib/request-inspection";

function HeaderFields({ fields }: { fields: HeaderField[] }) {
  return (
    <dl className="header-fields">
      {fields.map(({ name, value }) => (
        <div key={name}>
          <dt>{name}</dt>
          <dd
            className={
              name === "Status code"
                ? value.startsWith("2")
                  ? "success"
                  : /^[45]\d{2}/.test(value)
                    ? "failure"
                    : undefined
                : undefined
            }
          >
            {name === "Request URL" ? <a href={value}>{value}</a> : value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function RequestHeaders({ endpoint }: { endpoint: string }) {
  const inspection = useRequestInspection(endpoint);

  if (!inspection)
    return (
      <p className="headers-loading" role="status">
        Loading request details…
      </p>
    );

  return (
    <div className="headers-view">
      <details className="header-section" open>
        <summary>General</summary>
        <HeaderFields fields={inspection.general} />
        {inspection.error && (
          <p className="headers-note" role="alert">
            {inspection.error}
          </p>
        )}
      </details>
      <details className="header-section" open>
        <summary>Response headers</summary>
        {inspection.responseHeaders.length > 0 ? (
          <HeaderFields fields={inspection.responseHeaders} />
        ) : (
          <p className="headers-note">No response headers available.</p>
        )}
      </details>
      <details className="header-section" open>
        <summary>Request headers</summary>
        <HeaderFields fields={inspection.requestHeaders} />
        <p className="headers-note">
          Selected headers for this GET request. Browser-managed headers are
          omitted.
        </p>
      </details>
    </div>
  );
}
