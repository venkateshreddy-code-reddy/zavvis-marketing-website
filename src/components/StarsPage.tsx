// src/components/MissionSection.tsx
import { useEffect, useRef, useState } from "react";
import "../style/mission.css";
import missionImg from "../assets/mission.png";
import stars from "../assets/stars.png";

function useInView<T extends HTMLElement>(threshold = 0.22) {
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

const MissionSection: React.FC = () => {
  const { ref, inView } = useInView<HTMLElement>(0.22);

  useEffect(() => {
    const el = ref.current;
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
      ref={ref}
      className={`mission ${inView ? "is-inview" : ""}`}
      aria-labelledby="mission-title"
      style={
        {
          ["--stars-url" as any]: `url(${stars})`,
        } as React.CSSProperties
      }
    >
      <div className="mission__bg" aria-hidden="true" />
      <div className="mission__starsSide mission__starsSide--left" aria-hidden="true" />
      <div className="mission__starsSide mission__starsSide--right" aria-hidden="true" />
      <div className="mission__vignette" aria-hidden="true" />

      <div className="mission__container">
        <div className="mission__grid">
          <figure className="mission__media mission__reveal mission__reveal--img" aria-hidden="true">
            <img className="mission__img" src={missionImg} alt="" draggable={false} />
            <span className="mission__imgGlow" aria-hidden="true" />
          </figure>

          <div className="mission__copy mission__reveal">
            <h2 className="mission__title" id="mission-title">
              Our Mission
            </h2>

            <div className="mission__text">
              <p>
               We founded Zavvis to fix a fundamental flaw in corporate finance: too much data, too little control, discovered too late.
              </p>

              <p>
                Traditional tools leave finance teams buried in month-end surprises, manual
                reconciliations, and 120-hour investigation cycles — after performance is already
                impacted.
              </p>

              <p>
              Our mission is to make financial operations proactive, controlled, and preventative.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
