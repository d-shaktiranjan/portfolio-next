"use client";

import { useEffect, useState } from "react";

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
    <div className="email-contact">
      <a href={`mailto:${email}`}>{email}</a>
      <button
        type="button"
        onClick={copyEmail}
        aria-label={label}
        title={label}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {status === "copied" ? (
            <path d="m5 12 4 4L19 6" />
          ) : (
            <>
              <rect x="4" y="8" width="12" height="12" rx="1" />
              <path d="M8 8V4h12v12h-4" />
            </>
          )}
        </svg>
      </button>
      <span className="sr-only" role="status">
        {status === "copied" && "Email copied to clipboard."}
        {status === "error" &&
          "Couldn’t copy. Please select and copy the email address."}
      </span>
    </div>
  );
}
