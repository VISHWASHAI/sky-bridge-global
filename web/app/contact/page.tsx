import ContactForm from "@/components/ContactForm";

export const metadata = { title: "Contact — Sky Bridge Global" };

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
            Submit freight inquiries, request customs clearance quotes, or reach us at our office directly.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <ContactInfo title="Robertsonpet, Kolar — Karnataka, India" lines={["No. 261, BM Road, Near Industrial Estate", "Andersonpet, Robertsonpet", "Kolar — 563113, Karnataka"]} />
            <ContactInfo title="Email Us" lines={["info@skybridgeglobal.com"]} />
            <ContactInfo title="Call Us" lines={["+91 98765 43210"]} />
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
