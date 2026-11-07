import type { Metadata } from "next";
import { Suspense } from "react";
import { connection } from "next/server";
import { ApiConsole } from "@/components/api-console";
import { ApiWorkspace } from "@/components/api-workspace";
import { ProjectsResponse } from "@/components/projects-response";
import { projectsApiResponse } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects · Shakti Ranjan Debata",
  description:
    "Explore my projects, from Express.js logging middleware to blogging platforms and Python tools.",
};

async function ProjectsEndpoint() {
  await connection();

  return (
    <ApiConsole endpoint="/api/projects" initialResponse={projectsApiResponse}>
      <ProjectsResponse projects={projectsApiResponse.data} />
    </ApiConsole>
  );
}

export default function ProjectsPage() {
  return (
    <ApiWorkspace activeEndpoint="/api/projects">
      <Suspense
        fallback={<p className="loading-response">Receiving response…</p>}
      >
        <ProjectsEndpoint />
      </Suspense>
    </ApiWorkspace>
  );
}
