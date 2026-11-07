import type { ReactNode } from "react";
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
        <div className="workspace-label">
          <span className="workspace-mark" aria-hidden="true">
            [s]
          </span>
          shakti / personal-api <span className="version">v1.0</span>
        </div>
        <div className="api-client">
          <EndpointNavigation activeEndpoint={activeEndpoint} />
          {children}
        </div>
      </div>
    </main>
  );
}
