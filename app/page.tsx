import { ApiConsole } from "@/components/api-console";
import { ApiWorkspace } from "@/components/api-workspace";
import { ProfileResponse } from "@/components/profile-response";
import { profileApiResponse } from "@/lib/profile";

export default function Home() {
  return (
    <ApiWorkspace activeEndpoint="/api/me">
      <ApiConsole endpoint="/api/me" initialResponse={profileApiResponse}>
        <ProfileResponse profile={profileApiResponse.data} />
      </ApiConsole>
    </ApiWorkspace>
  );
}
