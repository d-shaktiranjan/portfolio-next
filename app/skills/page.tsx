import type { Metadata } from "next";
import { Suspense } from "react";
import { connection } from "next/server";
import { ApiConsole } from "@/components/api-console";
import { ApiWorkspace } from "@/components/api-workspace";
import { SkillsResponse } from "@/components/skills-response";
import { skillsApiResponse } from "@/lib/skills";

export const metadata: Metadata = {
  title: "Skills · Shakti Ranjan Debata",
  description:
    "Node.js, Express.js, and TypeScript are my primary stack. Explore my backend, database, language, and DevOps skills.",
};

async function SkillsEndpoint() {
  await connection();

  return (
    <ApiConsole endpoint="/api/skills" initialResponse={skillsApiResponse}>
      <SkillsResponse skills={skillsApiResponse.data} />
    </ApiConsole>
  );
}

export default function SkillsPage() {
  return (
    <ApiWorkspace activeEndpoint="/api/skills">
      <Suspense
        fallback={<p className="loading-response">Receiving response…</p>}
      >
        <SkillsEndpoint />
      </Suspense>
    </ApiWorkspace>
  );
}
