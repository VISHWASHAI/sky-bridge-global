"use client";

import { useState } from "react";

export default function CopyLinkButton({ text, label = "Copy link" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      className="btn btn-outline btn-sm"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        } catch {
          // Clipboard API blocked (e.g. insecure context) — silently ignore.
        }
      }}
    >
      {copied ? "Copied ✓" : label}
    </button>
  );
}
