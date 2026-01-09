// src/components/Hero.tsx
import { useEffect, useRef, useState } from "react";
import "../style/hero.css";
import grid from "../assets/grid.png";
import stars from "../assets/stars.png";

const Hero: React.FC = () => {
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
      className={`hero ${ready ? "hero--ready" : ""}`}
      style={
        {
          ["--grid-url" as any]: `url(${grid})`,
          ["--stars-url" as any]: `url(${stars})`,
        } as React.CSSProperties
      }
    >
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__starsSide hero__starsSide--left" aria-hidden="true" />
      <div className="hero__starsSide hero__starsSide--right" aria-hidden="true" />

      <div className="hero__content">
        <h1 className="hero__title">
          <span className="hero__titleTop">The Datadog of</span>
          <span className="hero__titleBottom">Corporate Finance</span>
        </h1>

        <p className="hero__subtitle">
          Real-time observability across GL, CRM, ERP, and data warehouses so material risk never
          compounds.
        </p>

        <div className="hero__ctas">
          <button className="hero__ctaBtn hero__ctaPrimary">Get Started</button>
          <button className="hero__ctaBtn hero__ctaSecondary">Book Demo</button>
        </div>

        <p className="hero__fineprint">
          Replace 120 hours per quarter of manual investigation with 8-second war room generation.
        </p>

        <div className="hero__box">
          <p className="hero__boxText">
            Observability is no longer just a backend concern. It is now a direct driver of financial
            performance, operational control, and board-level decision making.
          </p>
          <p className="hero__boxText" style={{ marginTop: 12 }}>
            Zavvis eliminates financial surprises by making causality observable in real time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
