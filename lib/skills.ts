import type { ApiResponse } from "@/lib/api";

// Keep the skills screen and /api/skills response in sync.
export const skills = {
  title: "Skills",
  description: "The tools I use to build and ship backend systems.",
  primaryStack: ["Node.js", "Express.js", "TypeScript"],
  primaryStackNote: "The stack I work with most for backend services and APIs.",
  categories: [
    {
      name: "Backend",
      items: [
        "Node.js",
        "Express.js",
        "Django",
        "Django REST Framework",
        "Flask",
      ],
    },
    {
      name: "Databases",
      items: ["MySQL", "MongoDB", "MariaDB", "Redis"],
    },
    {
      name: "Languages",
      items: ["TypeScript", "JavaScript", "Python", "Java"],
    },
    {
      name: "DevOps & tools",
      items: ["Linux", "Git", "Docker", "Nginx", "GitHub"],
    },
    {
      name: "Frontend (basic)",
      items: ["HTML", "CSS", "React", "Tailwind CSS", "Bootstrap"],
    },
  ],
};

export type Skills = typeof skills;

export const skillsApiResponse = {
  isSuccess: true,
  message: "Skills retrieved successfully.",
  data: skills,
} satisfies ApiResponse<Skills>;
