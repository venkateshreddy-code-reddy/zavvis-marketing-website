// VisionSection.tsx
import { useEffect, useRef, useState } from "react";
import "../style/vission.css";
import visionImg from "../assets/vision.png";
import stars from "../assets/stars.png";

const VisionSection: React.FC = () => {
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
      className={`vision ${ready ? "vision--ready" : ""}`}
      aria-labelledby="vision-title"
      style={
        {
          ["--stars-url" as any]: `url(${stars})`,
        } as React.CSSProperties
      }
    >
      <div className="vision__bg" aria-hidden="true" />
      <div className="vision__vignette" aria-hidden="true" />

      <div className="vision__starsSide vision__starsSide--left" aria-hidden="true" />
      <div className="vision__starsSide vision__starsSide--right" aria-hidden="true" />

      <div className="vision__container">
        <div className="vision__grid">
          <div className="vision__content">
            <h2 className="vision__title" id="vision-title">
              Our Vision
            </h2>

            <div className="vision__copy">
              <p className="vision__text">
                Financial health will be guarded the way infrastructure is guarded today. Finance teams will
                operate with continuous visibility, automated prevention, and live, auditable decision
                environments.
              </p>

              <p className="vision__text">
                In this future, finance moves from periodic review to continuous control. Risk is detected as it
                emerges, not after it compounds, and decisions are made with shared, provable context — not static
                reports or manual reconciliation. Zavvis exists to make this standard operating reality for
                corporate finance.
              </p>
            </div>
          </div>

          <div className="vision__media" aria-hidden="true">
            <div className="vision__orbAmbient" />
            <div className="vision__imgWrap">
              <img className="vision__img" src={visionImg} alt="" loading="lazy" draggable={false} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
