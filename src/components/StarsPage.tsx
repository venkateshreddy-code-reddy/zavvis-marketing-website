// MissionSection.tsx
import  { useEffect, useRef, useState } from "react";
import "../style/mission.css";
import missionImg from "../assets/Mission.png";

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

  return (
    <section
      ref={ref}
      className={`mission ${inView ? "is-inview" : ""}`}
      aria-labelledby="mission-title"
    >
      <div className="mission__bg" aria-hidden="true" />
      <div className="mission__stars" aria-hidden="true" />
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
                We founded Zavvis to solve a fundamental flaw in corporate finance: Too much
                data. Too little control. Discovered too late.
              </p>

              <p>
                Traditional tools leave finance teams buried in month-end surprises, manual
                reconciliations, and 120-hour investigation cycles — after performance is
                already impacted.
              </p>

              <p>
                Our mission: make financial operations proactive, intelligent, and
                preventative — transforming raw transactional data into real-time anomaly
                intelligence that stops risk before it compounds.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
