import Link from "next/link";
import { MobileEndpointSelector } from "@/components/mobile-endpoint-selector";

const endpoints = [
  { href: "/", path: "/api/me", label: "Profile" },
  { href: "/skills", path: "/api/skills", label: "Skills" },
  { href: "/projects", path: "/api/projects", label: "Projects" },
];

export function EndpointNavigation({
  activeEndpoint,
}: {
  activeEndpoint: string;
}) {
  return (
    <nav className="endpoint-navigation" aria-label="API endpoints">
      <MobileEndpointSelector
        activeEndpoint={activeEndpoint}
        endpoints={endpoints}
      />
      <p className="endpoint-navigation-title">
        Endpoints <span>{endpoints.length}</span>
      </p>
      <ul>
        {endpoints.map((endpoint) => (
          <li key={endpoint.path}>
            <Link
              href={endpoint.href}
              className="endpoint-link"
              aria-current={
                activeEndpoint === endpoint.path ? "page" : undefined
              }
              aria-label={`GET ${endpoint.path} — ${endpoint.label}`}
            >
              <span className="endpoint-method">GET</span>
              <span>{endpoint.path}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
