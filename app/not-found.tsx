import type { Metadata } from "next";
import Link from "next/link";
import { ApiWorkspace } from "@/components/api-workspace";
import { NotFoundConsole } from "@/components/not-found-console";

export const metadata: Metadata = {
  title: "404 · Page not found · Shakti Ranjan Debata",
  description: "The requested page could not be found.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <ApiWorkspace activeEndpoint="">
      <NotFoundConsole>
        <article className="p-9 mobile:px-5.5 mobile:py-7">
          <p className="mb-4 font-mono text-[13px] text-muted">
            404 / NOT_FOUND
          </p>
          <h1 className="text-[36px] leading-[1.2] font-medium tracking-[-1.5px] mobile:text-[32px]">
            Page not found<span className="ms-[0.08em] text-accent">.</span>
          </h1>
          <p className="mt-4 mb-7 text-[16px] leading-[1.7] text-secondary">
            This endpoint doesn’t lead anywhere. Let’s head back home.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-sm border border-border-strong px-3.5 py-2.5 text-[14px] hover:border-muted hover:bg-surface-soft"
          >
            <span aria-hidden="true">←</span> Back to home
          </Link>
        </article>
      </NotFoundConsole>
    </ApiWorkspace>
  );
}
