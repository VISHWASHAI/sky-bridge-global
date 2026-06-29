import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid" style={{ textAlign: "left" }}>
        <div className="footer-info">
          <img
            src="/images/logo_badge_circle.png"
            alt="Sky Bridge Global"
            style={{ height: 64, width: 64, objectFit: "cover", borderRadius: "50%", background: "#fff", marginBottom: 24 }}
          />
          <p className="footer-tagline">
            Connecting supply chains across land, air and ocean. Resilient
            logistics, smart border compliance, and express cargo routes across
            150+ countries.
          </p>
          <div className="top-contact-socials" style={{ marginTop: 8 }}>
            <a href="https://www.instagram.com/sky_bridge_global_official?igsh=aDZjbGlrdWdna2p4" target="_blank" rel="noopener" aria-label="Instagram">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
            </a>
            <a href="https://www.facebook.com/share/1F9PmdzTwW/?mibextid=wwXIfr" target="_blank" rel="noopener" aria-label="Facebook">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
            </a>
          </div>
        </div>

        <div>
          <h4 className="footer-heading">Services</h4>
          <div className="footer-links">
            <Link href="/services" className="footer-link">Air Freight</Link>
            <Link href="/services" className="footer-link">Sea Freight</Link>
            <Link href="/services" className="footer-link">Road Transport</Link>
            <Link href="/services" className="footer-link">Customs Clearance</Link>
          </div>
        </div>

        <div>
          <h4 className="footer-heading">Company</h4>
          <div className="footer-links">
            <Link href="/about" className="footer-link">About Us</Link>
            <Link href="/careers" className="footer-link">Careers</Link>
            <Link href="/tracking" className="footer-link">Track Shipment</Link>
            <Link href="/contact" className="footer-link">Contact</Link>
          </div>
        </div>

        <div>
          <h4 className="footer-heading">Contact</h4>
          <div className="footer-links">
            <a href="mailto:info@skybridgeglobal.com" className="footer-link">info@skybridgeglobal.com</a>
            <a href="tel:+919591936070" className="footer-link">+91 95919 36070</a>
            <span className="footer-link">Robertsonpet, Kolar, Karnataka, India</span>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>&copy; 2026 Sky Bridge Global · Robertsonpet, Kolar, Karnataka, India</p>
        <div className="footer-bottom-links">
          <span>Proprietorship · Arivazhagan K</span>
          <span>Karnataka, India</span>
        </div>
      </div>
    </footer>
  );
}
