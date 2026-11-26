import type { ReactNode } from "react";
import { useRequestInspection } from "@/components/use-request-inspection";
import type { HeaderField } from "@/lib/request-inspection";

function HeaderSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <details
      className="not-first:mt-6 not-first:border-t not-first:border-border not-first:pt-5"
      open
    >
      <summary className="mb-3.5 w-fit cursor-pointer text-[16px] font-medium text-foreground marker:text-[12px] marker:text-muted">
        {title}
      </summary>
      {children}
    </details>
  );
}

function HeaderNote({
  children,
  role,
}: {
  children: ReactNode;
  role?: "alert";
}) {
  return (
    <p className="mt-3.5 text-[12px] leading-[1.7] text-muted" role={role}>
      {children}
    </p>
  );
}

function HeaderFields({ fields }: { fields: HeaderField[] }) {
  return (
    <dl className="grid gap-2.5 mobile:gap-3.5">
      {fields.map(({ name, value }) => (
        <div
          key={name}
          className="grid grid-cols-[160px_minmax(0,1fr)] items-baseline gap-5 mobile:grid-cols-1 mobile:gap-0.75"
        >
          <dt className="text-[14px] text-secondary">{name}</dt>
          <dd
            className="min-w-0 font-mono text-[13px] leading-[1.8] wrap-anywhere text-muted data-success:text-success"
            data-success={
              (name === "Status code" && value.startsWith("2")) || undefined
            }
          >
            {name === "Request URL" ? (
              <a className="hover:text-accent" href={value}>
                {value}
              </a>
            ) : (
              value
            )}
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
      <p
        className="mt-3.5 px-6 py-7 text-[12px] leading-[1.7] text-muted"
        role="status"
      >
        Loading request details…
      </p>
    );

  return (
    <div className="px-6 py-7 mobile:px-4.5 mobile:py-6">
      <HeaderSection title="General">
        <HeaderFields fields={inspection.general} />
        {inspection.error && (
          <HeaderNote role="alert">{inspection.error}</HeaderNote>
        )}
      </HeaderSection>
      <HeaderSection title="Response headers">
        {inspection.responseHeaders.length > 0 ? (
          <HeaderFields fields={inspection.responseHeaders} />
        ) : (
          <HeaderNote>No response headers available.</HeaderNote>
        )}
      </HeaderSection>
      <HeaderSection title="Request headers">
        <HeaderFields fields={inspection.requestHeaders} />
        <HeaderNote>
          Selected headers for this GET request. Browser-managed headers are
          omitted.
        </HeaderNote>
      </HeaderSection>
    </div>
  );
}
