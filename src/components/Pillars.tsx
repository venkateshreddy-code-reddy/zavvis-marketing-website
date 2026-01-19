// src/components/PillarsSectionDiamond.tsx
import React, { useEffect, useRef } from "react";
import "../style/Pillars.css";

import stars from "../assets/stars.png";

import coIcon from "../assets/csd.png";
import lwerIcon from "../assets/lwer.png";
import rcreIcon from "../assets/rcre.png";
import csdIcon from "../assets/co.png";

type PillarItem = {
  title: string;
  body: string;
  icon: string;
  alt: string;
};

const items: PillarItem[] = [
  {
    title: "Continuous Signal Detection",
    body:
      "Machine learning models continuously monitor cross-system transactional data to surface material issues, variances, outliers, anomalies, and emerging risk. Finance teams shift from reactive investigation to continuous control.",
    icon: coIcon,
    alt: "Continuous Signal Detection icon",
  },
  {
    title: "Root-Cause Reasoning Engine",
    body:
      "Every signal is traced back to its origin across accounting, sales, and operating systems. No manual digging. No spreadsheet hunting. Full provenance to the exact transaction that caused the deviation.",
    icon: rcreIcon,
    alt: "Root-Cause Reasoning Engine icon",
  },
  {
    title: "Conversational Observability",
    body:
      "Use natural language as your command surface. Ask questions, adjust thresholds, define guardrails, and explore scenarios using the same intelligence layer that drives detection and causal reasoning.",
    icon: csdIcon,
    alt: "Conversational Observability icon",
  },
  {
    title: "Live, Drillable War Rooms",
    body:
      "Signals automatically generate real-time, interactive decks. Drill into any number and see the source record. Run scenarios live. Share via a secure, no-login URL. The board sees evidence, not explanations.",
    icon: lwerIcon,
    alt: "Live, Drillable War Rooms icon",
  },
];

const PillarCard: React.FC<{ item: PillarItem; pos: string; i: number }> = ({
  item,
  pos,
  i,
}) => (
  <article
    className={`pillars__card pillars__card--${pos}`}
    style={{ ["--d" as any]: `${i * 120}ms` }}
  >
    <div className="pillars__iconWrap">
      <img className="pillars__icon" src={item.icon} alt={item.alt} draggable={false} />
    </div>
    <h3 className="pillars__title">{item.title}</h3>
    <p className="pillars__body">{item.body}</p>
  </article>
);

const PillarsSectionDiamond: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
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
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="pillars"
      style={
        {
          ["--stars-url" as any]: `url(${stars})`,
        } as React.CSSProperties
      }
    >
      <div className="pillars__bg" aria-hidden="true">
        <div className="pillars__vignette" />
        <div className="pillars__glow" />
        <div className="pillars__glow2" />
      </div>

      <div className="pillars__starsSide pillars__starsSide--left" aria-hidden="true" />
      <div className="pillars__starsSide pillars__starsSide--right" aria-hidden="true" />

      <div className="pillars__inner">
        <header className="pillars__head">
          <h2 className="pillars__h2">The Pillars</h2>
          <p className="pillars__sub">
            The Intelligence Stack That Turns Financial Data Into Real-Time Control
          </p>
        </header>

        <div className="pillars__grid">
          <div className="pillars__lines">
            <span className="pillars__line--h" />
            <span className="pillars__line--v" />
            <span className="pillars__centerDot" />
          </div>

          <PillarCard item={items[0]} pos="tl" i={0} />
          <PillarCard item={items[1]} pos="tr" i={1} />
          <PillarCard item={items[2]} pos="bl" i={2} />
          <PillarCard item={items[3]} pos="br" i={3} />
        </div>

        <div className="pillars__ctaWrap">
          <a className="pillars__cta" href="#contact">
            Dashboards show what happened. Zavvis prevents it from happening again.
          </a>
        </div>
      </div>
    </section>
  );
};

export default PillarsSectionDiamond;
