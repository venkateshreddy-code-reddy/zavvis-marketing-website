// CTASection.tsx
import { useEffect, useRef } from "react";
import "../style/CTASection.css";
import logo from "../assets/logo.png";
import stars from "../assets/stars.png";

function WireSphere({ className }: { className: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 260 260"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="ctaSphereStroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(180, 180, 180, 0.55)" />
          <stop offset="48%" stopColor="rgba(150, 150, 150, 0.75)" />
          <stop offset="100%" stopColor="rgba(120, 120, 120, 0.55)" />
        </linearGradient>

        <filter id="ctaSphereGlow" x="-45%" y="-45%" width="190%" height="190%">
          <feGaussianBlur stdDeviation="1.7" result="b" />
          <feColorMatrix
            in="b"
            type="matrix"
            values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 0.75 0
            "
            result="g"
          />
          <feMerge>
            <feMergeNode in="g" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g
        fill="none"
        stroke="url(#ctaSphereStroke)"
        strokeWidth="2.3"
        filter="url(#ctaSphereGlow)"
      >
        <circle cx="130" cy="130" r="92" opacity="0.58" />
        <circle cx="130" cy="130" r="78" opacity="0.42" />
        <circle cx="130" cy="130" r="64" opacity="0.34" />
        <circle cx="130" cy="130" r="50" opacity="0.26" />
        <circle cx="130" cy="130" r="36" opacity="0.2" />
        <circle cx="130" cy="130" r="22" opacity="0.16" />
        <path
          d="M38 130c20-40 52-60 92-60s72 20 92 60c-20 40-52 60-92 60s-72-20-92-60Z"
          opacity="0.18"
        />
        <path
          d="M60 130c16-29 41-44 70-44s54 15 70 44c-16 29-41 44-70 44s-54-15-70-44Z"
          opacity="0.14"
        />
        <path
          d="M80 130c12-20 31-31 50-31s38 11 50 31c-12 20-31 31-50 31s-38-11-50-31Z"
          opacity="0.11"
        />
      </g>
    </svg>
  );
}

export default function CTASection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  // stars parallax like hero
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const hover = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    if (reduced || !hover) return;

    let raf = 0;

    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const nx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
        const ny = (e.clientY - r.top - r.height / 2) / (r.height / 2);

        const clampedX = Math.max(-1, Math.min(1, nx));
        const clampedY = Math.max(-1, Math.min(1, ny));

        el.style.setProperty("--mx", `${clampedX * 10}px`);
        el.style.setProperty("--my", `${clampedY * 6}px`);
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // card tilt + glow tracking
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduce) return;

    const setNeutral = () => {
      el.style.setProperty("--cta-mx", "0.5");
      el.style.setProperty("--cta-my", "0.5");
      el.style.setProperty("--cta-rx", "0deg");
      el.style.setProperty("--cta-ry", "0deg");
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
      const y = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
      const rx = (y - 0.5) * -5.5;
      const ry = (x - 0.5) * 7.5;

      el.style.setProperty("--cta-mx", String(x));
      el.style.setProperty("--cta-my", String(y));
      el.style.setProperty("--cta-rx", `${rx.toFixed(3)}deg`);
      el.style.setProperty("--cta-ry", `${ry.toFixed(3)}deg`);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", setNeutral);
    setNeutral();

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", setNeutral);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="cta"
      aria-label="CTA"
      style={
        {
          ["--stars-url" as any]: `url(${stars})`,
        } as React.CSSProperties
      }
    >
      <div className="cta__starsSide cta__starsSide--left" aria-hidden="true" />
      <div
        className="cta__starsSide cta__starsSide--right"
        aria-hidden="true"
      />

      <div className="cta__wrap">
        <div
          className="cta__card"
          ref={cardRef}
          role="region"
          aria-label="CTA card"
        >
          <div className="cta__bgGlow" aria-hidden="true" />
          <div className="cta__vignette" aria-hidden="true" />
          <div className="cta__sheen" aria-hidden="true" />

          <WireSphere className="cta__sphere cta__sphere--left" />
          <WireSphere className="cta__sphere cta__sphere--right" />

          <span className="cta__dot cta__dot--l1" aria-hidden="true" />
          <span className="cta__dot cta__dot--l2" aria-hidden="true" />
          <span className="cta__dot cta__dot--r1" aria-hidden="true" />
          <span className="cta__dot cta__dot--r2" aria-hidden="true" />
          <span className="cta__dot cta__dot--r3" aria-hidden="true" />

          <div className="cta__content">
            <h2 className="cta__title">
              <span className="cta__tStrong">Ready</span>{" "}
              <span className="cta__tMidGlow" aria-label="to">
                <span className="cta__tMidText">to</span>
              </span>{" "}
              <span className="cta__tStrong">Transform Your</span>
              <br />
              <span className="cta__tStrong">Finance Operations?</span>
            </h2>

            <p className="cta__kicker">
              START WITH QUICKBOOKS → ADD NETSUITE, SALESFORCE IN WEEKS
            </p>

            <p className="cta__support">
              Book a 15-minute demo → see a live war room generated from your
              data.
            </p>

            <a className="cta__btn" href="#contact" aria-label="Get in touch">
              <span className="cta__btnText">GET IN TOUCH</span>
              <span className="cta__btnGlow" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <footer className="ctaFooter" aria-label="Footer">
        <div className="ctaFooter__divider" aria-hidden="true" />

        <div className="ctaFooter__inner">
          <div className="ctaFooter__left">
            <div className="ctaFooter__logoWrap" aria-label="Zavvis logo">
              <img
                className="ctaFooter__logoImg"
                src={logo}
                alt="Zavvis"
                draggable={false}
              />
            </div>
            <div className="ctaFooter__company">Zavvis Technologies, Inc.</div>
          </div>

          <div className="ctaFooter__center">
            <div className="ctaFooter__rings" aria-hidden="true" />
            <div className="ctaFooter__patent">
              <div className="ctaFooter__patentTitle">Patent Pending</div>
              <div className="ctaFooter__patentSub">(US 63/915,671)</div>
            </div>
          </div>

          <div className="ctaFooter__right">
            <div className="ctaFooter__loc">Dover, DE</div>
            <a className="ctaFooter__email" href="mailto:contact@zavvis.ai">
              contact@zavvis.ai
            </a>
          </div>
        </div>

        <div className="ctaFooter__footnote">
          <div className="ctaFooter__footLinks" aria-label="Footer legal links">
            <a className="ctaFooter__footLink" href="/privacy-policy">
              Privacy Policy
            </a>
            <span className="ctaFooter__footSep" aria-hidden="true">
              |
            </span>
            <a className="ctaFooter__footLink" href="/terms-of-service">
              Terms of Service
            </a>
          </div>

          <div className="ctaFooter__copy">
            © 2025 Zavvis Technologies, Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </section>
  );
}
