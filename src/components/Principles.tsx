// src/components/PrincipleSection.tsx
import { useEffect, useRef, useState } from "react";
import "../style/PrincipleSection.css";

import grid from "../assets/grid.png";
import stars from "../assets/stars.png";

import ponIcon from "../assets/pon.png";
import efcIcon from "../assets/EFC.png";
import itpIcon from "../assets/ITP.png";
import apIcon from "../assets/ap.png";

type Principle = {
  title: string;
  desc: string;
  icon: string;
  glow: "violet" | "purple" | "pink" | "blue";
};

const PRINCIPLES: Principle[] = [
  {
    title: "Precision Over Noise",
    desc: "We surface only what materially matters to you. No dashboards. No vanity metrics.",
    icon: ponIcon,
    glow: "violet",
  },
  {
    title: "Engineering + Finance Combined",
    desc: "Modern detection, causal reasoning, and system design applied directly to financial sources of truth.",
    icon: efcIcon,
    glow: "purple",
  },
  {
    title: "Integrity Through Provenance",
    desc: "Every signal comes with immutable proof, traceable to its exact invoice, journal, or opportunity ID.",
    icon: itpIcon,
    glow: "pink",
  },
  {
    title: "Autonomous Prevention",
    desc: "Insights are not enough. Zavvis generates guardrails and adaptive thresholds so the same risk does not return.",
    icon: apIcon,
    glow: "blue",
  },
];

function useInView<T extends HTMLElement>(threshold = 0.18) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

export default function PrincipleSection() {
  const { ref: sectionRef, inView } = useInView<HTMLElement>(0.18);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

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
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`principles ${ready ? "principles--ready" : ""} ${inView ? "principles--inview" : ""}`}
      aria-label="Principles We Build On"
      style={
        {
          ["--grid-url" as any]: `url(${grid})`,
          ["--stars-url" as any]: `url(${stars})`,
        } as React.CSSProperties
      }
    >
      <div className="principles__gridBowl" aria-hidden="true" />
      <div className="principles__starsSide principles__starsSide--left" aria-hidden="true" />
      <div className="principles__starsSide principles__starsSide--right" aria-hidden="true" />

      <div className="principles__container">
        <h2 className="principles__title">Principles We Build On</h2>

        <div className="principles__stage">
          <div className="principles__grid">
            {PRINCIPLES.map((p, idx) => (
              <article
                key={p.title}
                className={`principles__card principles__card--${p.glow}`}
                style={{ ["--i" as any]: idx } as React.CSSProperties}
              >
                <div className="principles__iconWrap" aria-hidden="true">
                  <div className={`principles__iconBox principles__iconBox--${p.glow}`}>
                    <img className="principles__icon" src={p.icon} alt="" draggable={false} />
                  </div>
                </div>

                <h3 className="principles__cardTitle">{p.title}</h3>
                <p className="principles__cardDesc">{p.desc}</p>
              </article>
            ))}
          </div>

          <div className="principles__cross" aria-hidden="true">
            <span className="principles__hLine" />
            <span className="principles__dot" />
          </div>
        </div>
      </div>
    </section>
  );
}
