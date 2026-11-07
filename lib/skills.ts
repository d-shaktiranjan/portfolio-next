import type { ApiResponse } from "@/lib/api";

// Keep the skills screen and /api/skills response in sync.
export const skills = {
  title: "Skills",
  description: "The tools I use to build and ship backend systems.",
  primarySkills: [
    "TypeScript",
    "Express.js",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "CI/CD",
    "RAG",
    "AWS",
    "Linux",
  ],
  categories: [
    {
      name: "Backend",
      items: ["Node.js", "Express.js", "Django", "FastAPI", "Flask"],
    },
    {
      name: "Databases",
      items: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
    },
    {
      name: "Languages",
      items: ["TypeScript", "JavaScript", "Python", "Java"],
    },
    {
      name: "DevOps & tools",
      items: [
        "Linux",
        "Git",
        "GitHub",
        "Docker",
        "CI/CD",
        "AWS",
        "Nginx",
        "OpenAPI",
      ],
    },
    {
      name: "AI & Retrieval",
      items: ["RAG", "Vector Databases", "LangChain"],
    },
    {
      name: "Frontend (basic)",
      items: ["HTML", "CSS", "React", "Next.js", "Tailwind CSS"],
    },
  ],
};

export type Skills = typeof skills;

export const skillsApiResponse = {
  isSuccess: true,
  message: "Skills retrieved successfully.",
  data: skills,
} satisfies ApiResponse<Skills>;
