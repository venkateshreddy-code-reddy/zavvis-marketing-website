
import  { useEffect, useRef } from "react";
import "../style/ObservabilityGap.css";

type PillVariant = "orange" | "purple";

function useInViewOnce<T extends HTMLElement>(threshold = 0.18) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first && first.isIntersecting) {
          el.classList.add("ogap--inview");
          io.disconnect();
        }
      },
      { threshold }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return ref;
}

const Pill: React.FC<{ children: React.ReactNode; variant?: PillVariant }> = ({
  children,
  variant = "purple",
}) => {
  return (
    <div className={`ogap__pill ogap__pill--${variant}`} role="group" aria-label="Flow step">
      <span className="ogap__pillText">{children}</span>
      <span className="ogap__pillShimmer" aria-hidden="true" />
    </div>
  );
};

const ObservabilityGapSection: React.FC = () => {
  const sectionRef = useInViewOnce<HTMLElement>(0.18);

  return (
    <section ref={sectionRef} className="ogap" aria-labelledby="ogap-title">
      <div className="ogap__bg" aria-hidden="true" />
      <div className="ogap__stars" aria-hidden="true" />
      <div className="ogap__vignette" aria-hidden="true" />

      <div className="ogap__container">
        <header className="ogap__header">
          <h2 className="ogap__title ogap__anim ogap__anim--up" id="ogap-title">
            The Observability Gap
          </h2>

          <p className="ogap__sub ogap__anim ogap__anim--up" style={{ ["--d" as any]: "80ms" }}>
            Finance teams today are flying blind between month-end close and board meeting.
          </p>
        </header>

        <div className="ogap__panel ogap__panel--pulse">
          <div className="ogap__grid">
            {/* LEFT */}
            <div className="ogap__left ogap__anim ogap__anim--left" style={{ ["--d" as any]: "130ms" }}>
              <h3 className="ogap__kicker">
                <span className="ogap__kickerAccent">Traditional tools give you:</span>
              </h3>

              <ul className="ogap__list" aria-label="Traditional tools list">
                <li
                  className="ogap__li ogap__anim ogap__anim--stagger"
                  style={{ ["--i" as any]: 1, ["--d" as any]: "200ms" }}
                >
                  <span className="ogap__check" aria-hidden="true">
                    ✓
                  </span>
                  <span className="ogap__liText">Static reports (after the damage)</span>
                </li>

                <li
                  className="ogap__li ogap__anim ogap__anim--stagger"
                  style={{ ["--i" as any]: 2, ["--d" as any]: "200ms" }}
                >
                  <span className="ogap__check" aria-hidden="true">
                    ✓
                  </span>
                  <span className="ogap__liText">Metric alerts (no proof)</span>
                </li>

                <li
                  className="ogap__li ogap__anim ogap__anim--stagger"
                  style={{ ["--i" as any]: 3, ["--d" as any]: "200ms" }}
                >
                  <span className="ogap__check" aria-hidden="true">
                    ✓
                  </span>
                  <span className="ogap__liText">Manual RCA in spreadsheets (120+ hours/quarter)</span>
                </li>
              </ul>

              <div className="ogap__rule" role="separator" />

              <p className="ogap__p">
                Accounting systems catch errors too late.
                <br />
                FP&amp;A platforms live at the summary level — never the GL.
              </p>

              <div className="ogap__rule" role="separator" />

              <p className="ogap__p">
                Zavvis is the first system that watches the source of truth (your general ledger and
                operating systems) in real time, detects material deviations the moment they occur,
                traces them to the exact transaction, and delivers a live, auditable war room.
              </p>

              <p className="ogap__callout">
                This is financial data observability — the same real-time control engineering teams have
                had for a decade.
              </p>
            </div>

            {/* RIGHT */}
            <div
              className="ogap__right ogap__anim ogap__anim--right ogap__float"
              style={{ ["--d" as any]: "160ms" }}
              aria-label="Before and after flow"
            >
              <div className="ogap__frames">
                <div className="ogap__frame ogap__frame--1" aria-hidden="true" />
                <div className="ogap__frame ogap__frame--2" aria-hidden="true" />
                <div className="ogap__frame ogap__frame--3 ogap__panel--pulse">
                  <div className="ogap__flow">
                    <Pill variant="orange">Alert → Manual Deck → Board</Pill>

                    <div className="ogap__arrowWrap" aria-hidden="true">
                      <span className="ogap__arrow ogap__bounce">↓</span>
                    </div>

                    <Pill variant="purple">Anomaly → War Room → Decision</Pill>
                  </div>
                </div>
              </div>

              <div className="ogap__rightGlow" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ObservabilityGapSection;
