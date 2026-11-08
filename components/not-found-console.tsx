"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ApiConsole } from "@/components/api-console";

export function NotFoundConsole({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <ApiConsole
      endpoint={pathname || "/unknown"}
      initialResponse={null}
      statusCode={404}
    >
      {children}
    </ApiConsole>
  );
}
