import { experiencesApiResponse } from "@/lib/experiences";

export function GET() {
  return Response.json(experiencesApiResponse);
}
