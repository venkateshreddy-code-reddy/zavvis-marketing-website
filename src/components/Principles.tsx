// src/components/PrincipleSection.tsx
import { useEffect, useRef, useState } from "react";
import "../style/PrincipleSection.css";

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

export default function PrincipleSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
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
        el.style.setProperty("--my", `${clampedY * 8}px`);
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`principles ${ready ? "principles--ready" : ""}`}
      aria-label="Principles We Build On"
    >
      <div className="principles__bg" aria-hidden="true" />
      <div className="principles__vignette" aria-hidden="true" />

      <div className="principles__container">
        <div className="principles__left">
          <h2 className="principles__title">Principles We Build On</h2>

          <div className="principles__list">
            {PRINCIPLES.map((p) => (
              <article key={p.title} className="principles__item">
                <div className={`principles__iconBox principles__iconBox--${p.glow}`} aria-hidden="true">
                  <img className="principles__icon" src={p.icon} alt="" draggable={false} />
                </div>

                <div className="principles__copy">
                  <h3 className="principles__itemTitle">{p.title}</h3>
                  <p className="principles__itemDesc">{p.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
