import type { Metadata } from "next";
import "@/styles/main.css";
import "@/styles/components.css";
import "@/styles/pages.css";
import "@/styles/simulator.css";
import "@/styles/mobile.css";
import TopBar from "@/components/TopBar";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ScrollFx from "@/components/ScrollFx";
import TawkChat from "@/components/TawkChat";
import WhatsAppButton from "@/components/WhatsAppButton";
import { SITE_URL } from "@/lib/site";
import { Inter, Outfit } from "next/font/google";
import Script from "next/script";

// Self-hosted at build time by next/font — no external Google Fonts request.
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
  title: {
    default: "Sky Bridge Global | Freight Forwarding & Customs Clearance in Kolar, Karnataka",
    template: "%s | Sky Bridge Global",
  },
  description:
    "Sky Bridge Global is a freight forwarding and customs brokerage company based in Robertsonpet, Kolar, Karnataka, offering air freight, sea cargo, road transport, warehousing and customs clearance for businesses shipping across India and worldwide.",
  keywords: [
    "freight forwarding India",
    "customs clearance agent Kolar",
    "air cargo Karnataka",
    "sea freight booking India",
    "logistics company Kolar",
    "FCL LCL shipping India",
    "customs brokerage Bangalore",
  ],
  openGraph: {
    type: "website",
    siteName: "Sky Bridge Global",
    title: "Sky Bridge Global | Freight Forwarding & Customs Clearance",
    description:
      "Air, sea and road freight forwarding, warehousing, and customs brokerage based in Kolar, Karnataka — for domestic and international shipments.",
    url: SITE_URL,
    images: [{ url: "/images/og-cover.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sky Bridge Global | Freight Forwarding & Customs Clearance",
    description:
      "Air, sea and road freight forwarding, warehousing, and customs brokerage based in Kolar, Karnataka — for domestic and international shipments.",
  },
  icons: {
    icon: [
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon-48.png",
    apple: "/apple-touch-icon.png",
  },
};

const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "LogisticsBusiness",
  name: "Sky Bridge Global",
  description:
    "Freight forwarding and customs brokerage company offering air freight, sea cargo, road transport, warehousing and customs clearance.",
  url: SITE_URL,
  logo: `${SITE_URL}/logo-512.png`,
  email: "Skybridgeglobal09@gmail.com",
  telephone: "+91-95919-36070",
  address: {
    "@type": "PostalAddress",
    streetAddress: "No. 261, BM Road, Near Industrial Estate, Andersonpet, Robertsonpet",
    addressLocality: "Kolar",
    addressRegion: "Karnataka",
    postalCode: "563113",
    addressCountry: "IN",
  },
  areaServed: "Worldwide",
  sameAs: ["https://www.instagram.com/sky_bridge_global_official"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID}');`}
            </Script>
          </>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSON_LD) }}
        />
        <ScrollFx />
        <TopBar />
        <SiteHeader />
        {children}
        <SiteFooter />
        <WhatsAppButton />
        <TawkChat />
      </body>
    </html>
  );
}
