import type { Skills } from "@/lib/skills";

export function SkillsResponse({ skills }: { skills: Skills }) {
  return (
    <article className="skills">
      <h1>
        {skills.title}
        <span className="accent">.</span>
      </h1>
      <p className="skills-description">{skills.description}</p>

      <section className="primary-stack" aria-labelledby="primary-stack-title">
        <h2 id="primary-stack-title">Primary stack</h2>
        <ul>
          {skills.primaryStack.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
        <p>{skills.primaryStackNote}</p>
      </section>

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
                  className={
                    skills.primaryStack.includes(skill)
                      ? "primary-skill"
                      : undefined
                  }
                  key={skill}
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
