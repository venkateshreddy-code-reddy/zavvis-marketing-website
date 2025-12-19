// VisionSection.tsx
import  { useEffect, useRef, useState } from "react";
import "../style/vission.css";
import visionImg from "../assets/vision.png";

function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setInView(true),
      { threshold }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, inView };
}

const VisionSection: React.FC = () => {
  const { ref, inView } = useInView<HTMLElement>(0.22);

  return (
    <section
      ref={ref}
      className={`vision ${inView ? "is-inview" : ""}`}
      aria-labelledby="vision-title"
    >
      <div className="vision__bg" aria-hidden="true" />
      <div className="vision__stars" aria-hidden="true" />
      <div className="vision__vignette" aria-hidden="true" />

      <div className="vision__container">
        <div className="vision__grid">
          <div className="vision__left">
            <header className="vision__header">
              <h2 className="vision__title" id="vision-title">
                Our Vision.
              </h2>

              <p className="vision__lede">
                We envision a future where AI agents guard financial health the way Datadog
                guards infrastructure and Palantir guards mission-critical systems.
              </p>
            </header>

            <p className="vision__subhead">In this future:</p>

            <ul className="vision__list" role="list">
              <li className="vision__item" style={{ ["--i" as any]: 1 }}>
                <span className="vision__check" aria-hidden="true">
                  <svg viewBox="0 0 24 24" focusable="false">
                    <path d="M20 7.5L10.2 17.3 4 11.1" />
                  </svg>
                </span>
                <span className="vision__itemText">
                  Finance teams have continuous visibility into every signal
                </span>
              </li>

              <li className="vision__item" style={{ ["--i" as any]: 2 }}>
                <span className="vision__check" aria-hidden="true">
                  <svg viewBox="0 0 24 24" focusable="false">
                    <path d="M20 7.5L10.2 17.3 4 11.1" />
                  </svg>
                </span>
                <span className="vision__itemText">
                  Adaptive guardrails prevent recurring errors
                </span>
              </li>

              <li className="vision__item" style={{ ["--i" as any]: 3 }}>
                <span className="vision__check" aria-hidden="true">
                  <svg viewBox="0 0 24 24" focusable="false">
                    <path d="M20 7.5L10.2 17.3 4 11.1" />
                  </svg>
                </span>
                <span className="vision__itemText">
                  Live war rooms turn anomalies into aligned, auditable decisions — in
                  seconds, not weeks
                </span>
              </li>
            </ul>

            <p className="vision__closing">
              Zavvis exists to make corporate finance more stable, more predictable, and more
              intelligent.
            </p>
          </div>

          <div className="vision__right" aria-hidden="true">
            <div className="vision__planetWrap">
              <span className="vision__frameGlow" />
              <img className="vision__planet" src={visionImg} alt="" />
              <span className="vision__planetGlow" />
              <span className="vision__planetSheen" />
              <span className="vision__planetFade" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
