import Link from "next/link";
import { logout } from "@/app/admin/actions";

export default function AdminNav({ active }: { active: "enquiries" | "shipments" }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 12,
        borderBottom: "1px solid var(--color-border)",
        paddingBottom: "var(--space-sm)",
        marginBottom: "var(--space-lg)",
      }}
    >
      <div style={{ display: "flex", gap: 8 }}>
        <Link href="/admin" style={tab(active === "enquiries")}>Enquiries</Link>
        <Link href="/admin/shipments" style={tab(active === "shipments")}>Shipments</Link>
      </div>
      <form action={logout}>
        <button className="btn btn-outline btn-sm" type="submit">Log out</button>
      </form>
    </div>
  );
}

function tab(isActive: boolean): React.CSSProperties {
  return {
    padding: "8px 16px",
    borderRadius: "var(--radius-md)",
    fontWeight: 600,
    fontSize: "var(--font-size-sm)",
    textDecoration: "none",
    color: isActive ? "#fff" : "var(--color-primary-navy)",
    background: isActive ? "var(--color-primary-blue, #2563eb)" : "transparent",
  };
}
