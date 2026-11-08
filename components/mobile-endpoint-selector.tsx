"use client";

import { useRouter } from "next/navigation";

type Endpoint = {
  href: string;
  path: string;
  label: string;
};

export function MobileEndpointSelector({
  activeEndpoint,
  endpoints,
}: {
  activeEndpoint: string;
  endpoints: Endpoint[];
}) {
  const router = useRouter();

  return (
    <label className="mobile-endpoint-selector">
      <span>Endpoints</span>
      <span className="endpoint-select-control">
        <select
          aria-label="Select endpoint"
          value={activeEndpoint}
          onChange={(event) => {
            const endpoint = endpoints.find(
              (item) => item.path === event.target.value,
            );
            if (endpoint) router.push(endpoint.href);
          }}
        >
          {!endpoints.some((endpoint) => endpoint.path === activeEndpoint) && (
            <option value={activeEndpoint} disabled>
              Select endpoint
            </option>
          )}
          {endpoints.map((endpoint) => (
            <option key={endpoint.path} value={endpoint.path}>
              GET {endpoint.path}
            </option>
          ))}
        </select>
        <svg
          viewBox="0 0 16 16"
          width="14"
          height="14"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="m4 6 4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </label>
  );
}
