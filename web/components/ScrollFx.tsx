"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const REVEAL_SELECTOR =
  ".reveal-fade-up, .reveal-stagger-container, .reveal-fade-in, .text-reveal-ltr, .journey-section, .slide-in-left, .slide-in-right";

function animateCounters(scope: Element) {
  scope.querySelectorAll<HTMLElement>(".stat-count").forEach((counter) => {
    if (counter.classList.contains("counted")) return;
    counter.classList.add("counted");

    const target = parseFloat(counter.dataset.target || "0");
    const suffix = counter.dataset.suffix || "";
    const decimals = parseInt(counter.dataset.decimals || "0", 10);
    const duration = 2000;
    const startTime = performance.now();

    function update(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = (target * eased).toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
}

/**
 * Replicates the prototype's scroll-reveal + animated-counter behaviour for
 * the Next.js app. Mounted in the root layout; re-runs on every route change.
 */
export default function ScrollFx() {
  const pathname = usePathname();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("active");
          if (entry.target.querySelector(".stat-count")) {
            animateCounters(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.12 }
    );

    const els = document.querySelectorAll(REVEAL_SELECTOR);
    els.forEach((el) => observer.observe(el));

    // Elements already in the viewport on load/navigation reveal immediately;
    // anything IO misses (e.g. display toggles) is force-revealed as a fallback
    // so no section can be left invisible.
    const failsafe = window.setTimeout(() => {
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) {
          el.classList.add("active");
          if (el.querySelector(".stat-count")) animateCounters(el);
        }
      });
    }, 600);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, [pathname]);

  return null;
}
