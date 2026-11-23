import type { ApiResponse } from "@/lib/api";

// The homepage and the public endpoint share one source of truth.
export const profile = {
  name: "Shakti Ranjan Debata",
  role: "Software Engineer",
  introduction: "I build Backend things.",
  description:
    "I enjoy turning complex problems into simple, dependable systems. I care about what happens between a request and a response.",
  education: "Computer Science Engineering · CV Raman Global University",
  links: {
    github: "https://github.com/d-shaktiranjan",
    linkedin: "https://www.linkedin.com/in/d-shaktiranjan/",
    x: "https://x.com/d_shaktiranjan",
    email: "debatashaktiranjan@gmail.com",
    writing: "https://destructure.in/",
    resume: "/resume.pdf",
    v0: "https://v0.shaktiranjan.dev/",
  },
};

export type Profile = typeof profile;

export const profileApiResponse = {
  isSuccess: true,
  message: "Profile retrieved successfully.",
  data: profile,
} satisfies ApiResponse<Profile>;
