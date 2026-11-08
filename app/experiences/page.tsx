import type { Metadata } from "next";
import { connection } from "next/server";
import { ApiConsole } from "@/components/api-console";
import { ApiWorkspace } from "@/components/api-workspace";
import { ExperiencesResponse } from "@/components/experiences-response";
import { experiencesApiResponse } from "@/lib/experiences";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Experience",
  path: "/experiences",
  description:
    "My professional experience as a Backend Developer at GrowthPanda and Associate Software Engineer at Muvi.",
});

export default async function ExperiencesPage() {
  await connection();

  return (
    <ApiWorkspace activeEndpoint="/api/experiences">
      <ApiConsole
        endpoint="/api/experiences"
        initialResponse={experiencesApiResponse}
      >
        <ExperiencesResponse experiences={experiencesApiResponse.data} />
      </ApiConsole>
    </ApiWorkspace>
  );
}
