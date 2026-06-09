import PinChecker from "@/components/PinChecker";

export const metadata = { title: "Services — Sky Bridge Global" };

const SERVICES = [
  { title: "Air Freight Services", desc: "Time-critical delivery solutions via global air corridors with maximum reliability.", icon: "/images/services_air.png" },
  { title: "Sea Freight Services", desc: "Cost-effective ocean transport for FCL and LCL shipments with weekly departures.", icon: "/images/services_ocean.png" },
  { title: "Road & Land Transport", desc: "Reliable domestic and cross-border trucking and distribution logistics.", icon: "/images/services_road.png" },
  { title: "Secure Warehousing", desc: "Modern, secure storage facilities equipped with advanced WMS technology.", icon: "/images/services_warehouse.png" },
];

export default function ServicesPage() {
  return (
    <main>
      <div className="container" style={{ paddingTop: 140, paddingBottom: 40, textAlign: "left" }}>
        <span className="hero-tag" style={{ color: "var(--color-primary-blue)", background: "var(--sky-100)", border: "none" }}>Logistics solutions</span>
        <h1 className="heading-2" style={{ marginTop: 16 }}>Freight Routing Capabilities</h1>
        <p className="section-desc" style={{ color: "var(--color-text-muted)", maxWidth: 560 }}>
          A robust portfolio of shipping, warehousing, and trade-compliance services.
        </p>
      </div>

      <div className="container" style={{ paddingBottom: 64 }}>
        <div className="grid grid-2 gap-lg">
          {SERVICES.map((s, i) => (
            <div key={i} className="card card-hover" style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
              <img src={s.icon} alt="" style={{ width: 64, height: 64, objectFit: "cover", borderRadius: "var(--radius-md)", flexShrink: 0 }} />
              <div>
                <h3 className="heading-3" style={{ marginBottom: 6 }}>{s.title}</h3>
                <p style={{ color: "var(--color-text-muted)" }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 80 }}>
        <div className="section-header" style={{ textAlign: "center", marginBottom: 24 }}>
          <h2 className="heading-2">Is your area covered?</h2>
        </div>
        <PinChecker />
      </div>
    </main>
  );
}
