"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/tracking", label: "Tracking" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [shrink, setShrink] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setShrink(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className={`site-header${shrink ? " shrink" : ""}`} id="site-header">
        <div className="header-container">
          <Link href="/" className="header-logo" onClick={() => setMenuOpen(false)} style={{ cursor: "pointer" }}>
            <img
              src="/images/logo_badge_circle.png"
              alt="Sky Bridge Global"
              style={{ height: 72, width: 72, objectFit: "cover", borderRadius: "50%", background: "#ffffff", border: "2px solid rgba(66, 149, 232, 0.45)", boxShadow: "0 2px 14px rgba(66, 149, 232, 0.35)" }}
            />
            <span style={{ fontFamily: "var(--font-header)", fontWeight: 700, fontSize: 17, color: "#fff", letterSpacing: "0.01em", whiteSpace: "nowrap" }}>
              Sky Bridge Global
            </span>
          </Link>

          <nav className={`nav-menu${menuOpen ? " mobile-open" : ""}`} id="nav-menu">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`nav-link${isActive(l.href) ? " active" : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Link href="/contact" className="nav-link nav-link-mobile-cta" onClick={() => setMenuOpen(false)}>
              Get Quote →
            </Link>
          </nav>

          <div className="nav-actions">
            <Link href="/contact" className="btn btn-primary" style={{ borderRadius: 40 }}>
              Get Quote →
            </Link>
          </div>

          <button
            className={`hamburger${menuOpen ? " active" : ""}`}
            id="hamburger-btn"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>
      <div
        className={`mobile-nav-overlay${menuOpen ? " visible" : ""}`}
        onClick={() => setMenuOpen(false)}
      />
    </>
  );
}
