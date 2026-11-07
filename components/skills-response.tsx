import type { Skills } from "@/lib/skills";

export function SkillsResponse({ skills }: { skills: Skills }) {
  return (
    <article className="skills">
      <h1>
        {skills.title}
        <span className="accent">.</span>
      </h1>
      <p className="skills-description">{skills.description}</p>

      <div className="skill-categories">
        {skills.categories.map((category, index) => (
          <section
            className="skill-category"
            key={category.name}
            aria-labelledby={`skill-category-${index}`}
          >
            <h2 id={`skill-category-${index}`}>{category.name}</h2>
            <ul>
              {category.items.map((skill) => (
                <li
                  key={skill}
                  className={
                    skills.primarySkills.includes(skill)
                      ? "primary-skill"
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
