import type { ReactNode } from "react";
import Link from "next/link";
import { EndpointNavigation } from "@/components/endpoint-navigation";

export function ApiWorkspace({
  activeEndpoint,
  children,
}: {
  activeEndpoint: string;
  children: ReactNode;
}) {
  return (
    <main className="grid min-h-svh items-start justify-items-center p-3 mobile:p-2">
      <div className="flex h-[calc(100svh-24px)] max-h-[calc(100svh-24px)] w-full max-w-7xl flex-col mobile:h-[calc(100svh-16px)] mobile:max-h-[calc(100svh-16px)]">
        <Link
          href="/"
          className="mx-0.5 mb-3 flex shrink-0 items-center gap-2.75 font-mono text-[15px] text-muted hover:text-secondary [@media(max-width:360px)]:gap-2"
          aria-label="Shakti — Home"
        >
          <span
            className="text-[19px] font-semibold text-accent"
            aria-hidden="true"
          >
            [s]
          </span>
          shakti / personal-api{" "}
          <span className="ml-auto text-[14px] [@media(max-width:360px)]:hidden">
            v1.0
          </span>
        </Link>
        <div className="grid min-h-0 flex-1 grid-cols-[220px_minmax(0,1fr)] grid-rows-[minmax(0,1fr)] gap-3 stacked:grid-cols-1 stacked:grid-rows-[auto_minmax(0,1fr)]">
          <EndpointNavigation activeEndpoint={activeEndpoint} />
          {children}
        </div>
      </div>
    </main>
  );
}
