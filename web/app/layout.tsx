import type { Metadata } from "next";
import "@/styles/main.css";
import "@/styles/components.css";
import "@/styles/pages.css";
import "@/styles/simulator.css";
import "@/styles/mobile.css";
import TopBar from "@/components/TopBar";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Sky Bridge Global — Connecting Supply Chains, Delivering Excellence",
  description:
    "Resilient supply chains, smart border compliance, and express cargo routes across 150+ countries — air, ocean and land freight, all in one platform.",
  icons: { icon: "/images/logo_badge_circle.png" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TopBar />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
