import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { ApiWorkspace } from "@/components/api-workspace";
import { NotFoundConsole } from "@/components/not-found-console";

export const metadata: Metadata = {
  title: "404 · Page not found · Shakti Ranjan Debata",
  description: "The requested page could not be found.",
  robots: { index: false, follow: true },
};

export default async function NotFound() {
  await connection();

  return (
    <ApiWorkspace activeEndpoint="">
      <NotFoundConsole>
        <article className="not-found">
          <p className="not-found-code">404 / NOT_FOUND</p>
          <h1>
            Page not found<span className="accent">.</span>
          </h1>
          <p className="not-found-description">
            This endpoint doesn’t lead anywhere. Let’s head back home.
          </p>
          <Link href="/" className="not-found-home">
            <span aria-hidden="true">←</span> Back to home
          </Link>
        </article>
      </NotFoundConsole>
    </ApiWorkspace>
  );
}
