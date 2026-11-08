import type { ApiResponse } from "@/lib/api";

// The screen and endpoint share the professional work history from the résumé.
export const experiences = {
  title: "Experience",
  description: "My work building and shipping software professionally.",
  items: [
    {
      slug: "growthpanda",
      company: "GrowthPanda",
      website: "https://growthpanda.co/",
      position: "Backend Developer",
      location: "Remote",
      startDate: "2023-05",
      endDate: null,
      summary:
        "Build and maintain REST APIs and backend services with Node.js, Express.js, and Django. Work spans a document-based RAG chatbot, database optimization, cloud deployments on AWS and Azure, and CI/CD pipelines with GitHub Actions.",
    },
    {
      slug: "muvi",
      company: "Muvi Entertainment Pvt. Ltd.",
      website: "https://www.muvi.com/",
      position: "Associate Software Engineer",
      location: "Remote",
      startDate: "2022-04",
      endDate: "2022-09",
      summary:
        "Developed internal admin dashboards using PHP, JavaScript, and MySQL for over 500 employees. Automated error logging and monitoring to help reduce production issues.",
    },
  ],
};

export type Experiences = typeof experiences;

export const experiencesApiResponse = {
  isSuccess: true,
  message: "Experiences retrieved successfully.",
  data: experiences,
} satisfies ApiResponse<Experiences>;
