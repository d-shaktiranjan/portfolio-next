import Link from "next/link";
import { MobileEndpointSelector } from "@/components/mobile-endpoint-selector";

const endpoints = [
  { href: "/", path: "/api/me", label: "Profile" },
  { href: "/experiences", path: "/api/experiences", label: "Experience" },
  { href: "/skills", path: "/api/skills", label: "Skills" },
  { href: "/projects", path: "/api/projects", label: "Projects" },
];

export function EndpointNavigation({
  activeEndpoint,
}: {
  activeEndpoint: string;
}) {
  return (
    <nav
      className="self-stretch rounded-xl border border-border bg-surface px-2 py-5 stacked:border-0 stacked:bg-transparent stacked:p-0"
      aria-label="API endpoints"
    >
      <MobileEndpointSelector
        activeEndpoint={activeEndpoint}
        endpoints={endpoints}
      />
      <p className="mx-2.5 mb-4.5 flex justify-between text-[14px] text-muted stacked:hidden">
        Endpoints{" "}
        <span className="font-mono text-[13px]">{endpoints.length}</span>
      </p>
      <ul className="grid gap-1.25 stacked:hidden">
        {endpoints.map((endpoint) => (
          <li key={endpoint.path}>
            <Link
              href={endpoint.href}
              className="flex items-center gap-2.5 rounded-sm border border-transparent px-2.5 py-3 font-mono text-[14px] whitespace-nowrap text-secondary hover:bg-surface-soft hover:text-foreground aria-[current=page]:border-accent-border aria-[current=page]:bg-accent-soft aria-[current=page]:text-foreground"
              aria-current={
                activeEndpoint === endpoint.path ? "page" : undefined
              }
              aria-label={`GET ${endpoint.path} — ${endpoint.label}`}
            >
              <span className="text-[12px] font-semibold text-accent">GET</span>
              <span>{endpoint.path}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
