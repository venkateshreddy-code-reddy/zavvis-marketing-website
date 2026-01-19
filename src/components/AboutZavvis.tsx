import { useEffect, useRef, useState } from "react";
import "../style/AboutZavvis.css";

import grid from "../assets/grid.png";
import stars from "../assets/stars.png";

const AboutZavvis: React.FC = () => {
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
        el.style.setProperty("--my", `${clampedY * 6}px`);
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`aboutZ ${ready ? "aboutZ--ready" : ""}`}
      aria-label="About Zavvis"
      style={
        {
          ["--grid-url" as any]: `url(${grid})`,
          ["--stars-url" as any]: `url(${stars})`,
        } as React.CSSProperties
      }
    >
      <div className="aboutZ__grid" aria-hidden="true" />
      <div className="aboutZ__starsSide aboutZ__starsSide--left" aria-hidden="true" />
      <div className="aboutZ__starsSide aboutZ__starsSide--right" aria-hidden="true" />

      <div className="aboutZ__center">
        <div className="aboutZ__content">
          <h1 className="aboutZ__title">About Zavvis</h1>

          <p className="aboutZ__subtitle">
       Corporate finance has entered its observability era. Zavvis is the first engine that watches every transaction, from GL entry to CRM deal, and converts it into real-time, preventative intelligence.
          </p>

          <p className="aboutZ__subtitle aboutZ__subtitle--spaced">
       We build Financial Data Observability, using advanced reasoning systems to continuously monitor transactional signals, detect material issues, trace root causes across systems, and prevent recurrence.
          </p>
        </div>
      </div>

      <div className="aboutZ__seam" aria-hidden="true" />
    </section>
  );
};

export default AboutZavvis;
