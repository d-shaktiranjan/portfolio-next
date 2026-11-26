"use client";

import { Suspense, use, type ReactNode } from "react";
import {
  inspectionReferrerPolicy,
  inspectionRequestHeaders,
  type RequestInspection,
} from "@/lib/request-inspection";

type InspectionSource = RequestInspection | Promise<RequestInspection> | null;

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

function HeaderField({
  name,
  children,
}: {
  name: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="grid grid-cols-[160px_minmax(0,1fr)] items-baseline gap-5 mobile:grid-cols-1 mobile:gap-0.75">
      <dt className="text-[14px] text-secondary">{name}</dt>
      <dd className="min-w-0 font-mono text-[13px] leading-[1.8] wrap-anywhere text-muted">
        {children}
      </dd>
    </div>
  );
}

function HeaderFields({ children }: { children: ReactNode }) {
  return <dl className="grid gap-2.5 mobile:gap-3.5">{children}</dl>;
}

function HeaderPlaceholder() {
  return (
    <span
      aria-hidden="true"
      className="inline-block h-2.5 w-24 max-w-full rounded-sm bg-surface-soft align-middle"
    />
  );
}

function ResponsePlaceholder() {
  return (
    <>
      <p className="sr-only" role="status">
        Loading response headers…
      </p>
      <div aria-hidden="true">
        <HeaderFields>
          {[0, 1, 2, 3].map((row) => (
            <HeaderField key={row} name={<HeaderPlaceholder />}>
              <HeaderPlaceholder />
            </HeaderField>
          ))}
        </HeaderFields>
      </div>
    </>
  );
}

function InspectionValue({
  request,
  children,
}: {
  request: Promise<RequestInspection>;
  children: (inspection: RequestInspection) => ReactNode;
}) {
  return children(use(request));
}

function LiveValue({
  inspection,
  fallback,
  children,
}: {
  inspection: InspectionSource;
  fallback: ReactNode;
  children: (inspection: RequestInspection) => ReactNode;
}) {
  if (!inspection) return fallback;
  if ("responseHeaders" in inspection) return children(inspection);

  return (
    <Suspense fallback={fallback}>
      <InspectionValue request={inspection}>{children}</InspectionValue>
    </Suspense>
  );
}

export function RequestHeaders({
  endpoint,
  inspection,
}: {
  endpoint: string | null;
  inspection: InspectionSource;
}) {
  return (
    <div className="px-6 py-7 mobile:px-4.5 mobile:py-6">
      <HeaderSection title="General">
        <HeaderFields>
          <HeaderField name="Request URL">
            <LiveValue
              inspection={inspection}
              fallback={endpoint ?? <HeaderPlaceholder />}
            >
              {({ url }) => (
                <a className="hover:text-accent" href={url}>
                  {url}
                </a>
              )}
            </LiveValue>
          </HeaderField>
          <HeaderField name="Request method">GET</HeaderField>
          <HeaderField name="Status code">
            <LiveValue inspection={inspection} fallback={<HeaderPlaceholder />}>
              {({ status, error }) => (
                <>
                  <span
                    className="data-success:text-success"
                    data-success={status.startsWith("2") || undefined}
                  >
                    {status}
                  </span>
                  {error && (
                    <p className="mt-1 text-[12px] leading-[1.7]" role="alert">
                      {error}
                    </p>
                  )}
                </>
              )}
            </LiveValue>
          </HeaderField>
          <HeaderField name="Remote address">
            Unavailable in browser APIs
          </HeaderField>
          <HeaderField name="Referrer policy">
            {inspectionReferrerPolicy}
          </HeaderField>
        </HeaderFields>
      </HeaderSection>
      <HeaderSection title="Response headers">
        <LiveValue inspection={inspection} fallback={<ResponsePlaceholder />}>
          {({ responseHeaders }) =>
            responseHeaders.length > 0 ? (
              <HeaderFields>
                {responseHeaders.map(({ name, value }) => (
                  <HeaderField key={name} name={name}>
                    {value}
                  </HeaderField>
                ))}
              </HeaderFields>
            ) : (
              <p className="mt-3.5 text-[12px] leading-[1.7] text-muted">
                No response headers available.
              </p>
            )
          }
        </LiveValue>
      </HeaderSection>
      <HeaderSection title="Request headers">
        <HeaderFields>
          <HeaderField name="Accept">
            {inspectionRequestHeaders.Accept}
          </HeaderField>
          <HeaderField name="Cache-Control">
            {inspectionRequestHeaders["Cache-Control"]}
          </HeaderField>
          <HeaderField name="Accept-Language">
            <LiveValue inspection={inspection} fallback={<HeaderPlaceholder />}>
              {({ acceptLanguage }) => acceptLanguage}
            </LiveValue>
          </HeaderField>
          <HeaderField name="Referer">
            <LiveValue inspection={inspection} fallback={<HeaderPlaceholder />}>
              {({ referrer }) => referrer}
            </LiveValue>
          </HeaderField>
        </HeaderFields>
        <p className="mt-3.5 text-[12px] leading-[1.7] text-muted">
          Selected headers for this GET request. Browser-managed headers are
          omitted.
        </p>
      </HeaderSection>
    </div>
  );
}
