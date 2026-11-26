import type { Skills } from "@/lib/skills";

export function SkillsResponse({ skills }: { skills: Skills }) {
  return (
    <article className="px-9 pt-7 pb-5 mobile:px-5.5 mobile:pt-6 mobile:pb-4 short-wide:pt-5 short-wide:pb-4">
      <h1 className="text-[36px] leading-[1.2] font-medium tracking-[-1.5px] mobile:text-[32px]">
        {skills.title}
        <span className="ms-[0.08em] text-accent">.</span>
      </h1>
      <p className="mt-2.5 mb-6 text-[16px] leading-[1.7] text-secondary mobile:text-[15px] short-wide:mt-2 short-wide:mb-4.5">
        {skills.description}
      </p>

      <div>
        {skills.categories.map((category, index) => (
          <section
            className="grid grid-cols-[148px_minmax(0,1fr)] gap-4.5 border-t border-border py-4.5 mobile:grid-cols-1 mobile:gap-2 mobile:py-4 short-wide:py-2.75"
            key={category.name}
            aria-labelledby={`skill-category-${index}`}
          >
            <h2
              id={`skill-category-${index}`}
              className="text-[14px] leading-[1.9] text-muted mobile:text-[13px]"
            >
              {category.name}
            </h2>
            <ul className="flex flex-wrap gap-x-3.5 gap-y-1.5 text-[15px] leading-[1.8] text-secondary">
              {category.items.map((skill) => (
                <li
                  key={skill}
                  className={
                    skills.primarySkills.includes(skill)
                      ? "font-medium"
                      : undefined
                  }
                >
                  {skill}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </article>
  );
}
