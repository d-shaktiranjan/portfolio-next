import type { Profile } from "@/lib/profile";
import { EmailContact } from "@/components/email-contact";

export function ProfileResponse({ profile }: { profile: Profile }) {
  return (
    <article className="profile">
      <div className="profile-intro">
        <p className="profile-greeting">Hi this is</p>
        <h1>
          {profile.name}
          <span className="accent">.</span>
        </h1>
        <p className="profile-role">
          <span aria-hidden="true">⌘</span> {profile.role}
        </p>
      </div>

      <div className="profile-about">
        <h2>{profile.introduction}</h2>
        <p>{profile.description}</p>
      </div>

      <dl className="profile-details">
        <div>
          <dt>Education</dt>
          <dd>{profile.education}</dd>
        </div>
        <div>
          <dt>Social</dt>
          <dd className="social-links">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub <span aria-hidden="true">↗</span>
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
            <a href={profile.links.x} target="_blank" rel="noopener noreferrer">
              X <span aria-hidden="true">↗</span>
            </a>
            <a
              href={profile.links.writing}
              target="_blank"
              rel="noopener noreferrer"
            >
              Blog <span aria-hidden="true">↗</span>
            </a>
          </dd>
        </div>
      </dl>

      <p className="profile-note">
        A little more context?{" "}
        <a
          href={profile.links.resume}
          target="_blank"
          rel="noopener noreferrer"
        >
          Read my résumé <span aria-hidden="true">↗</span>
        </a>
      </p>
      <section className="profile-email" aria-label="Email">
        <p>Let’s connect.</p>
        <EmailContact email={profile.links.email} />
      </section>
    </article>
  );
}
