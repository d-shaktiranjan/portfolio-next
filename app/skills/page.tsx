import type { Metadata } from "next";
import { connection } from "next/server";
import { ApiConsole } from "@/components/api-console";
import { ApiWorkspace } from "@/components/api-workspace";
import { SkillsResponse } from "@/components/skills-response";
import { skillsApiResponse } from "@/lib/skills";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Skills",
  path: "/skills",
  description:
    "Node.js, Express.js, and TypeScript are my primary stack. Explore my backend, database, language, and DevOps skills.",
});

export default async function SkillsPage() {
  await connection();

  return (
    <ApiWorkspace activeEndpoint="/api/skills">
      <ApiConsole endpoint="/api/skills" initialResponse={skillsApiResponse}>
        <SkillsResponse skills={skillsApiResponse.data} />
      </ApiConsole>
    </ApiWorkspace>
  );
}
