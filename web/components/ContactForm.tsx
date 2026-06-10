"use client";

import { useState } from "react";
import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase/client";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const company_name = String(data.get("company_name") || "").trim();
    const contact_name = String(data.get("contact_name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setError("Backend is not configured yet. Please try again later.");
      return;
    }

    setSubmitting(true);
    const { error: insertError } = await supabase
      .from("enquiries")
      .insert({ company_name, contact_name, email, message });
    setSubmitting(false);

    if (insertError) {
      setError("Something went wrong sending your enquiry. Please try again.");
      return;
    }

    setSent(true);
  }

  if (sent) {
    return (
      <div className="card" style={{ borderLeft: "5px solid var(--color-success)" }}>
        <h3 className="heading-3" style={{ color: "var(--color-success)" }}>Thank you!</h3>
        <p style={{ color: "var(--color-text-muted)" }}>
          We&apos;ve received your enquiry and will respond within one business day.
        </p>
      </div>
    );
  }

  return (
    <form className="card" onSubmit={onSubmit} style={{ textAlign: "left" }}>
      <div className="form-group">
        <label className="form-label">Company Name</label>
        <input name="company_name" className="form-control" placeholder="Your Enterprises Ltd." required />
      </div>
      <div className="grid grid-2 gap-md">
        <div className="form-group">
          <label className="form-label">Contact Person</label>
          <input name="contact_name" className="form-control" placeholder="John Doe" required />
        </div>
        <div className="form-group">
          <label className="form-label">Business Email</label>
          <input name="email" type="email" className="form-control" placeholder="doe@company.com" required />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Message</label>
        <textarea name="message" className="form-textarea" placeholder="Describe your freight routing or customs inquiry…" required />
      </div>
      {error && (
        <p style={{ color: "var(--color-danger, #d9534f)", fontSize: "var(--font-size-sm)", marginBottom: "var(--space-sm)" }}>{error}</p>
      )}
      <button className="btn btn-primary" type="submit" disabled={submitting} style={{ width: "100%", borderRadius: "var(--radius-md)" }}>
        {submitting ? "Sending…" : "Send Inquiry →"}
      </button>
    </form>
  );
}
