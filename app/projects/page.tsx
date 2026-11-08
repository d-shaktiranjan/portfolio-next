import type { Metadata } from "next";
import { connection } from "next/server";
import { ApiConsole } from "@/components/api-console";
import { ApiWorkspace } from "@/components/api-workspace";
import { ProjectsResponse } from "@/components/projects-response";
import { projectsApiResponse } from "@/lib/projects";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Projects",
  path: "/projects",
  description:
    "Explore my projects, from Express.js logging middleware to blogging platforms and Python tools.",
});

export default async function ProjectsPage() {
  await connection();

  return (
    <ApiWorkspace activeEndpoint="/api/projects">
      <ApiConsole
        endpoint="/api/projects"
        initialResponse={projectsApiResponse}
      >
        <ProjectsResponse projects={projectsApiResponse.data} />
      </ApiConsole>
    </ApiWorkspace>
  );
}
