"use client";

import { useEffect, useState } from "react";
import { CopyIcon } from "@/components/copy-icon";

export function EmailContact({ email }: { email: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  useEffect(() => {
    if (status === "idle") return;
    const timeout = setTimeout(() => setStatus("idle"), 2500);
    return () => clearTimeout(timeout);
  }, [status]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
  }

  const label = status === "copied" ? "Email copied" : "Copy email address";

  return (
    <div className="flex items-center gap-2.5">
      <a
        className="min-w-0 text-[18px] leading-[1.6] wrap-anywhere text-foreground hover:text-accent"
        href={`mailto:${email}`}
      >
        {email}
      </a>
      <button
        className="inline-grid size-8 shrink-0 place-items-center rounded-sm text-muted hover:bg-surface-soft hover:text-foreground"
        type="button"
        onClick={copyEmail}
        aria-label={label}
        title={label}
      >
        <CopyIcon copied={status === "copied"} />
      </button>
      <span className="sr-only" role="status">
        {status === "copied" && "Email copied to clipboard."}
        {status === "error" &&
          "Couldn’t copy. Please select and copy the email address."}
      </span>
    </div>
  );
}
