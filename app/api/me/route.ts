import { profileApiResponse } from "@/lib/profile";

export function GET() {
  return Response.json(profileApiResponse);
}
