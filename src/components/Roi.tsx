// ROISection.tsx
import  { useEffect, useRef, useState } from "react";
import "../style/ROISection.css";

type RoiRow = {
  metric: string;
  target: string;
};

const ROWS: RoiRow[] = [
  { metric: "Time Anomaly-to-Deck", target: "< 3 minutes" },
  { metric: "Drill-Down Clicks", target: "80% of users click ≥1 number" },
  { metric: "Share Rate", target: "60% of sessions → shared link" },
  { metric: "NPS (Beta)", target: "> 70" },
  { metric: 'ICP “Wow”', target: '8-second Loom: “Anomaly → Live Deck → Fix”' },
];

export default function ROISection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`roi ${visible ? "is-visible" : ""}`}
      aria-labelledby="roi-title"
    >
      <div className="roi__glow" aria-hidden="true" />
      <div className="roi__glow roi__glow--b" aria-hidden="true" />
      <div className="roi__noise" aria-hidden="true" />

      <div className="roi__container">
        <header className="roi__header">
          <h2 id="roi-title" className="roi__title">
            ROI
          </h2>

          <p className="roi__subtitle">Observability Leaders Generate 125% ROI</p>

          <p className="roi__lead">
            Companies that adopt financial observability — rather than static dashboards — achieve
            measurable ROI through faster investigation time, reduced risk exposure, and early
            anomaly prevention.
          </p>
        </header>

        <div className="roi__card" role="region" aria-label="Zavvis ROI table card">
          <div className="roi__cardInner">
            <h3 className="roi__cardTitle">Zavvis ROI</h3>

            <div className="roi__tableWrap">
              <div className="roi__tableDecor roi__tableDecor--left" aria-hidden="true" />
              <div className="roi__tableDecor roi__tableDecor--right" aria-hidden="true" />

              <div className="roi__tableCard">
                <div className="roi__tableHeader" role="row">
                  <div className="roi__th" role="columnheader">
                    Metric
                  </div>
                  <div className="roi__th roi__th--right" role="columnheader">
                    Target
                  </div>
                </div>

                <div className="roi__rows" role="rowgroup">
                  {ROWS.map((r, i) => (
                    <div
                      className="roi__row"
                      role="row"
                      key={r.metric}
                      style={{ ["--i" as any]: i }}
                    >
                      <div className="roi__cell roi__cell--metric" role="cell">
                        <span className="roi__dot" aria-hidden="true" />
                        <span className="roi__text">{r.metric}</span>
                      </div>

                      <div className="roi__cell roi__cell--target" role="cell">
                        <span className="roi__dot" aria-hidden="true" />
                        <span className="roi__text">{r.target}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="roi__sheen" aria-hidden="true" />
              </div>
            </div>

            <div className="roi__cardFrame" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
