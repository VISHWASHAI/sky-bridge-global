"use client";

import { useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  // NOTE: v1 ships tracking + serviceability against Supabase. Wiring this form
  // to an `enquiries` table + email notification is the next backend phase;
  // for now it confirms locally so the UI flow is complete.
  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
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
        <input className="form-control" placeholder="Your Enterprises Ltd." required />
      </div>
      <div className="grid grid-2 gap-md">
        <div className="form-group">
          <label className="form-label">Contact Person</label>
          <input className="form-control" placeholder="John Doe" required />
        </div>
        <div className="form-group">
          <label className="form-label">Business Email</label>
          <input type="email" className="form-control" placeholder="doe@company.com" required />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Message</label>
        <textarea className="form-textarea" placeholder="Describe your freight routing or customs inquiry…" required />
      </div>
      <button className="btn btn-primary" type="submit" style={{ width: "100%", borderRadius: "var(--radius-md)" }}>
        Send Inquiry →
      </button>
    </form>
  );
}
