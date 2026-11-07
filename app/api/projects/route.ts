import { projectsApiResponse } from "@/lib/projects";

export function GET() {
  return Response.json(projectsApiResponse);
}
