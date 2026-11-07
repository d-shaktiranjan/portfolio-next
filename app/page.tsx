import { Suspense } from "react";
import { connection } from "next/server";
import { ApiConsole } from "@/components/api-console";
import { ApiWorkspace } from "@/components/api-workspace";
import { ProfileResponse } from "@/components/profile-response";
import { profileApiResponse } from "@/lib/profile";

async function ProfileEndpoint() {
  // Render the profile for each incoming request, rather than at build time.
  await connection();

  return (
    <ApiConsole endpoint="/api/me" initialResponse={profileApiResponse}>
      <ProfileResponse profile={profileApiResponse.data} />
    </ApiConsole>
  );
}

export default function Home() {
  return (
    <ApiWorkspace activeEndpoint="/api/me">
      <Suspense
        fallback={<p className="loading-response">Receiving response…</p>}
      >
        <ProfileEndpoint />
      </Suspense>
    </ApiWorkspace>
  );
}
