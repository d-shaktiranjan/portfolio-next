import { connection } from "next/server";
import { ApiConsole } from "@/components/api-console";
import { ApiWorkspace } from "@/components/api-workspace";
import { ProfileResponse } from "@/components/profile-response";
import { profileApiResponse } from "@/lib/profile";

export default async function Home() {
  // Keep request-time SSR without splitting the workspace into streamed sections.
  await connection();

  return (
    <ApiWorkspace activeEndpoint="/api/me">
      <ApiConsole endpoint="/api/me" initialResponse={profileApiResponse}>
        <ProfileResponse profile={profileApiResponse.data} />
      </ApiConsole>
    </ApiWorkspace>
  );
}
