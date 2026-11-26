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
    <article className="px-9 pt-7 pb-5 mobile:px-5.5 mobile:pt-6 mobile:pb-4">
      <h1 className="text-[36px] leading-[1.2] font-medium tracking-[-1.5px] mobile:text-[32px]">
        {experiences.title}
        <span className="ms-[0.08em] text-accent">.</span>
      </h1>
      <p className="mt-2.5 mb-6 text-[16px] leading-[1.7] text-secondary mobile:text-[15px]">
        {experiences.description}
      </p>

      {experiences.items.map((experience) => (
        <section
          className="border-t border-border py-5.5"
          key={experience.slug}
          aria-labelledby={`experience-${experience.slug}`}
        >
          <div className="flex flex-wrap items-center gap-2.5">
            <h2
              id={`experience-${experience.slug}`}
              className="text-[18px] font-medium tracking-[-0.3px]"
            >
              <a
                className="group hover:text-accent"
                href={experience.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {experience.company}{" "}
                <span
                  className="text-[14px] font-normal text-muted group-hover:text-accent"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </a>
            </h2>
            {experience.endDate === null && (
              <span className="rounded-sm border border-border-strong px-1.75 py-0.5 text-[11px] text-success">
                Current
              </span>
            )}
          </div>
          <p className="mt-2 mb-1 text-[16px]">{experience.position}</p>
          <p className="font-mono text-[13px] leading-[1.8] text-muted">
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
          <p className="mt-3.5 max-w-[72ch] text-[15px] leading-[1.7] text-secondary">
            {experience.summary}
          </p>
        </section>
      ))}
    </article>
  );
}
