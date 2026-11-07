import type { Projects } from "@/lib/projects";

export function ProjectsResponse({ projects }: { projects: Projects }) {
  return (
    <article className="projects">
      <div className="projects-heading">
        <h1>
          {projects.title}
          <span className="accent">.</span>
        </h1>
        <span className="project-count">{projects.items.length} projects</span>
      </div>
      <p className="projects-description">{projects.description}</p>

      <div className="project-grid">
        {projects.items.map((project) => (
          <section
            className="project"
            key={project.slug}
            aria-labelledby={`project-${project.slug}`}
          >
            <div className="project-heading">
              <h2 id={`project-${project.slug}`}>{project.name}</h2>
              <div className="project-links">
                {project.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.name} on ${link.label}`}
                  >
                    {link.label} <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            </div>
            <p className="project-description">{project.description}</p>
            <ul
              className="project-technologies"
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
