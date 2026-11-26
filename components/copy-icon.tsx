export function CopyIcon({ copied = false }: { copied?: boolean }) {
  return (
    <svg
      className="shrink-0"
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
      {copied ? (
        <path d="m5 12 4 4L19 6" />
      ) : (
        <>
          <rect x="4" y="8" width="12" height="12" rx="1" />
          <path d="M8 8V4h12v12h-4" />
        </>
      )}
    </svg>
  );
}
