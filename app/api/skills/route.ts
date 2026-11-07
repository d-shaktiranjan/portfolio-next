import { skillsApiResponse } from "@/lib/skills";

export function GET() {
  return Response.json(skillsApiResponse);
}
