import type { Projects } from "@/lib/projects";

export function ProjectsResponse({ projects }: { projects: Projects }) {
  return (
    <article className="px-9 pt-7 pb-5 mobile:px-5.5 mobile:pt-6 mobile:pb-4 short-wide:pt-5 short-wide:pb-4">
      <div className="flex items-baseline justify-between gap-4">
        <h1 className="text-[36px] leading-[1.2] font-medium tracking-[-1.5px] mobile:text-[32px]">
          {projects.title}
          <span className="ms-[0.08em] text-accent">.</span>
        </h1>
        <span className="font-mono text-[13px] whitespace-nowrap text-muted">
          {projects.items.length} projects
        </span>
      </div>
      <p className="mt-2.5 mb-6 text-[16px] leading-[1.7] text-secondary mobile:text-[15px] short-wide:mt-2 short-wide:mb-4.5">
        {projects.description}
      </p>

      <div className="grid grid-cols-2 gap-x-7 mobile:grid-cols-1">
        {projects.items.map((project) => (
          <section
            className="border-t border-border py-5 short-wide:py-2.75"
            key={project.slug}
            aria-labelledby={`project-${project.slug}`}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2
                id={`project-${project.slug}`}
                className="text-[18px] font-medium tracking-[-0.3px]"
              >
                {project.name}
              </h2>
              <div className="flex gap-3">
                {project.links.map((link) => (
                  <a
                    key={link.url}
                    className="group text-[13px] whitespace-nowrap text-secondary hover:text-accent"
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.name} on ${link.label}`}
                  >
                    {link.label}{" "}
                    <span
                      className="text-muted group-hover:text-accent"
                      aria-hidden="true"
                    >
                      ↗
                    </span>
                  </a>
                ))}
              </div>
            </div>
            <p className="my-2.5 text-[15px] leading-[1.7] text-secondary">
              {project.description}
            </p>
            <ul
              className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[13px] leading-[1.8] text-muted"
              aria-label={`${project.name} technologies`}
            >
              {project.technologies.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </article>
  );
}
