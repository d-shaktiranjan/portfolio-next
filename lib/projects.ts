import type { ApiResponse } from "@/lib/api";

// The projects screen and endpoint use the same content.
export const projects = {
  title: "Projects",
  description: "A selection of things I’ve built.",
  items: [
    {
      slug: "lorin",
      name: "Lorin",
      description:
        "Express middleware for colorful API logging with file output.",
      technologies: ["Node.js", "TypeScript", "Express.js"],
      links: [
        { label: "GitHub", url: "https://github.com/d-shaktiranjan/lorin" },
        { label: "npm", url: "https://www.npmjs.com/package/lorin" },
      ],
    },
    {
      slug: "destructure",
      name: "Destructure",
      description: "A simple, clean platform for blogs and articles.",
      technologies: ["Node.js", "Express.js", "Next.js", "MongoDB"],
      links: [
        {
          label: "GitHub",
          url: "https://github.com/d-shaktiranjan/destructure-backend",
        },
        { label: "Live", url: "https://destructure.in/" },
      ],
    },
    {
      slug: "e-note-book",
      name: "E Note Book",
      description: "A cloud-based notebook for storing notes.",
      technologies: ["Python", "Django", "SQLite", "Bootstrap"],
      links: [
        {
          label: "GitHub",
          url: "https://github.com/d-shaktiranjan/E_Note_Book",
        },
      ],
    },
    {
      slug: "file-share",
      name: "File Share",
      description: "Share files between devices on the same network.",
      technologies: ["Python", "Flask", "HTML", "CSS", "JavaScript"],
      links: [
        {
          label: "GitHub",
          url: "https://github.com/d-shaktiranjan/file_share",
        },
      ],
    },
    {
      slug: "web-image-editor",
      name: "Web Image Editor",
      description: "An OpenCV web app for applying filters to images.",
      technologies: ["Python", "OpenCV", "Flask"],
      links: [
        {
          label: "GitHub",
          url: "https://github.com/d-shaktiranjan/WebImageEditor",
        },
      ],
    },
    {
      slug: "shortify-visit",
      name: "Shortify Visit",
      description: "Shorten long URLs into compact links.",
      technologies: ["Python", "Flask", "SQLite", "Bootstrap"],
      links: [
        {
          label: "GitHub",
          url: "https://github.com/d-shaktiranjan/ShortifyVisit",
        },
      ],
    },
  ],
};

export type Projects = typeof projects;

export const projectsApiResponse = {
  isSuccess: true,
  message: "Projects retrieved successfully.",
  data: projects,
} satisfies ApiResponse<Projects>;
