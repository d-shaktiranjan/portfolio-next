"use client";

import { useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";

const subscribe = () => () => {};

export function CurrentPathLink() {
  const currentPath = usePathname() || "/unknown";
  const pathname = useSyncExternalStore(
    subscribe,
    () => currentPath,
    // The shared 404 shell is built at /_not-found.
    () => "/unknown",
  );
  const href =
    pathname.startsWith("//") || pathname.startsWith("/\\")
      ? "/unknown"
      : pathname;

  return (
    <a className="hover:text-accent" href={href}>
      {pathname}
    </a>
  );
}
