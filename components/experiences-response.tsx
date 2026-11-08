import type { Experiences } from "@/lib/experiences";

function formatMonth(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}-01T00:00:00Z`));
}

export function ExperiencesResponse({
  experiences,
}: {
  experiences: Experiences;
}) {
  return (
    <article className="experiences">
      <h1>
        {experiences.title}
        <span className="accent">.</span>
      </h1>
      <p className="experiences-description">{experiences.description}</p>

      {experiences.items.map((experience) => (
        <section
          className="experience"
          key={experience.slug}
          aria-labelledby={`experience-${experience.slug}`}
        >
          <div className="experience-heading">
            <h2 id={`experience-${experience.slug}`}>
              <a
                className="experience-company-link"
                href={experience.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {experience.company} <span aria-hidden="true">↗</span>
              </a>
            </h2>
            {experience.endDate === null && (
              <span className="experience-current">Current</span>
            )}
          </div>
          <p className="experience-position">{experience.position}</p>
          <p className="experience-duration">
            <time dateTime={experience.startDate}>
              {formatMonth(experience.startDate)}
            </time>
            {" — "}
            {experience.endDate === null ? (
              "Present"
            ) : (
              <time dateTime={experience.endDate}>
                {formatMonth(experience.endDate)}
              </time>
            )}
            <span aria-hidden="true"> · </span>
            {experience.location}
          </p>
          <p className="experience-summary">{experience.summary}</p>
        </section>
      ))}
    </article>
  );
}
