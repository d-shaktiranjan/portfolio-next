import type { Metadata } from "next";
import { profile } from "@/lib/profile";

export const site = {
  url: "https://shaktiranjan.dev",
  title: `${profile.name} · ${profile.role}`,
  description:
    "Shakti Ranjan Debata is a backend developer working with Node.js, Express.js, and TypeScript. Explore his skills, projects, and writing.",
  imageAlt: `${profile.name} · ${profile.role}`,
};

export function createPageMetadata({
  title,
  description = site.description,
  path,
}: {
  title?: string;
  description?: string;
  path: string;
}): Metadata {
  const pageTitle = title ? `${title} · ${profile.name}` : site.title;
  const image = {
    url: "/opengraph-image",
    width: 1200,
    height: 630,
    alt: site.imageAlt,
  };

  return {
    title: pageTitle,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: profile.name,
      title: pageTitle,
      description,
      url: path,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      creator: "@d_shaktiranjan",
      title: pageTitle,
      description,
      images: [image],
    },
  };
}

export const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: profile.name,
      url: `${site.url}/`,
      jobTitle: profile.role,
      description: profile.description,
      sameAs: [profile.links.github, profile.links.linkedin, profile.links.x],
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      name: site.title,
      url: `${site.url}/`,
      inLanguage: "en",
      publisher: { "@id": `${site.url}/#person` },
    },
  ],
};
