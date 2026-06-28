import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact Us — Get a Freight Quote",
  description:
    "Contact Sky Bridge Global in Robertsonpet, Kolar, Karnataka for air, sea and road freight quotes, customs clearance enquiries, and warehousing support. We respond within one business day.",
};

const ADDRESS_QUERY = "No. 261, BM Road, Near Industrial Estate, Andersonpet, Robertsonpet, Kolar, Karnataka 563113";
const WHATSAPP_NUMBER = "919876543210"; // update once the real business number is confirmed

export default function ContactPage() {
  return (
    <main>
      <div style={{ display: "grid", gridTemplateColumns: "420px 1fr", minHeight: "70vh" }} className="contact-grid">
        {/* Left dark panel */}
        <div style={{ background: "linear-gradient(160deg, var(--navy-800), var(--navy-900))", color: "#fff", padding: "150px 48px 80px" }}>
          <span className="hero-tag">Support desk</span>
          <h1 className="hero-title" style={{ fontSize: "clamp(1.8rem,3vw,2.4rem)", margin: "16px 0 20px" }}>
            Get in Touch<br />with Our Team
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.75, marginBottom: 32 }}>
            Share your cargo type, origin/destination and rough volume — our team
            sends most freight quotes back within one business day.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 32 }}>
            <ContactInfo title="Robertsonpet, Kolar — Karnataka, India" lines={["No. 261, BM Road, Near Industrial Estate", "Andersonpet, Robertsonpet", "Kolar — 563113, Karnataka"]} />
            <ContactInfo title="Email Us" lines={["info@skybridgeglobal.com"]} />
            <ContactInfo title="Call Us" lines={["+91 98765 43210"]} />
            <ContactInfo title="Business Hours" lines={["Mon – Sat: 9:30 AM – 6:30 PM IST", "Sunday: Closed"]} />
          </div>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Sky Bridge Global, I'd like a freight quote.")}`}
            target="_blank"
            rel="noopener"
            style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#25D366", color: "#08130a", fontWeight: 700, fontSize: 14, padding: "12px 22px", borderRadius: 50, marginBottom: 32 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.6-.8-1.9-.9-.2-.1-.4-.1-.6.1-.2.2-.7.9-.9 1.1-.2.2-.3.2-.6.1-.8-.4-1.7-1-2.4-1.8-.6-.7-1-1.4-1.4-2.1-.1-.2 0-.4.1-.6.2-.2.4-.4.5-.6.1-.2.1-.4 0-.6-.1-.2-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.1 0 1.3 1 2.5 1.1 2.7.1.2 1.9 3 4.7 4.1 2.7 1.1 2.7.7 3.2.7.5 0 1.6-.6 1.8-1.2.2-.6.2-1.1.2-1.2 0-.1-.2-.2-.4-.3z"/><path d="M12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.7 1.5 5.2L2 22l4.9-1.3c1.5.8 3.2 1.3 5.1 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.7 0-3.3-.5-4.7-1.3l-.3-.2-3.3.9.9-3.2-.2-.3C3.5 14.4 3 12.7 3 11 3 6.6 7.1 2.5 12 2.5S21 6.6 21 11s-4.5 9.2-9 9.2z"/></svg>
            Chat on WhatsApp
          </a>

          <div style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", height: 200 }}>
            <iframe
              title="Sky Bridge Global office location"
              src={`https://www.google.com/maps?q=${encodeURIComponent(ADDRESS_QUERY)}&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(0.2) contrast(1.1)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Right form panel */}
        <div style={{ padding: "150px 64px 80px", background: "var(--color-light-bg)" }}>
          <h2 className="heading-2" style={{ marginBottom: 4 }}>Send us a Message</h2>
          <p style={{ color: "var(--color-text-muted)", marginBottom: 24 }}>We&apos;ll respond within one business day.</p>
          <ContactForm />
        </div>
      </div>
    </main>
  );
}

function ContactInfo({ title, lines }: { title: string; lines: string[] }) {
  return (
    <div>
      <div style={{ fontWeight: 700, marginBottom: 4 }}>{title}</div>
      {lines.map((l, i) => (
        <div key={i} style={{ color: "rgba(255,255,255,0.55)", fontSize: "var(--font-size-sm)" }}>{l}</div>
      ))}
    </div>
  );
}
