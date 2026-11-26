import type { ReactNode } from "react";
import type { Profile } from "@/lib/profile";
import { EmailContact } from "@/components/email-contact";

function ProfileDetail({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="grid grid-cols-[112px_1fr] items-baseline gap-3 mobile:grid-cols-[92px_1fr] mobile:gap-2.5">
      <dt className="font-mono text-[14px] text-muted">{label}</dt>
      <dd className="text-[15px] leading-[1.7] text-secondary">{children}</dd>
    </div>
  );
}

function ProfileNote({ children }: { children: ReactNode }) {
  return (
    <p className="mt-4 text-[14px] text-muted short-desktop:mt-3 [&>a]:ml-0.75 [&>a]:text-secondary [&>a:hover]:text-accent">
      {children}
    </p>
  );
}

export function ProfileResponse({ profile }: { profile: Profile }) {
  return (
    <article className="px-10 py-6 mobile:px-5.5 mobile:pt-7 short-desktop:py-4.5">
      <div>
        <p className="mb-2 text-[17px] text-secondary">Hi this is</p>
        <h1 className="text-[36px] leading-[1.2] font-medium tracking-[-1.5px] mobile:text-[32px]">
          {profile.name}
          <span className="ms-[0.08em] text-accent">.</span>
        </h1>
        <p className="mt-3.25 flex items-center gap-2 font-mono text-[15px] text-accent short-desktop:mt-2.25">
          <span className="text-[18px]" aria-hidden="true">
            ⌘
          </span>{" "}
          {profile.role}
        </p>
      </div>

      <div className="my-5 short-desktop:my-3.5">
        <h2 className="mb-1.75 text-[18px] font-medium">
          {profile.introduction}
        </h2>
        <p className="max-w-135 text-[17px] leading-[1.8] text-secondary short-desktop:max-w-none">
          {profile.description}
        </p>
      </div>

      <dl className="mb-5 grid gap-3.25 short-desktop:mb-3.5 short-desktop:gap-2.5">
        <ProfileDetail label="Education">{profile.education}</ProfileDetail>
        <ProfileDetail label="Social">
          <div className="flex flex-wrap gap-5.25 mobile:gap-3.5 [&>a]:text-foreground [&>a:hover]:text-accent [&>a>span]:ml-0.75 [&>a>span]:text-muted">
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
          </div>
        </ProfileDetail>
      </dl>

      <ProfileNote>
        A little more context?{" "}
        <a
          href={profile.links.resume}
          target="_blank"
          rel="noopener noreferrer"
        >
          Read my résumé <span aria-hidden="true">↗</span>
        </a>
      </ProfileNote>

      <ProfileNote>
        Evolution matters !{" "}
        <a href={profile.links.v0} target="_blank" rel="noopener noreferrer">
          v0 <span aria-hidden="true">↗</span>
        </a>
      </ProfileNote>

      <section className="mt-6 border-t border-border pt-5" aria-label="Email">
        <p className="mb-3 text-[14px] text-muted">Let’s connect.</p>
        <EmailContact email={profile.links.email} />
      </section>
    </article>
  );
}
