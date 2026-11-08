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
    <main className="workspace">
      <div className="api-workspace">
        <Link href="/" className="workspace-label" aria-label="Shakti — Home">
          <span className="workspace-mark" aria-hidden="true">
            [s]
          </span>
          shakti / personal-api <span className="version">v1.0</span>
        </Link>
        <div className="api-client">
          <EndpointNavigation activeEndpoint={activeEndpoint} />
          {children}
        </div>
      </div>
    </main>
  );
}
