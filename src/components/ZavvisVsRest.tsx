// src/components/ZavvisVsRest.tsx
import React from "react";
import "../style/ZavvisVsRest.css";
import stars from "../assets/stars.png";

const leftItems = [
  "Static dashboards & monthly reports",
  "Metric-level alerts",
  "Manual RCA in spreadsheets",
  "Exported PDF decks",
  "Post-mortem analysis",
];

const rightItems = [
  "Real-time transactional observability",
  "GL-line and cross-system signal detection",
  "Instant provenance to source transaction",
  "Live, drillable, collaborative war room",
  "Preventative guardrails and closed loop",
];

function IconX({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 20 20"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M5.25 5.25L14.75 14.75M14.75 5.25L5.25 14.75"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconCheck({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M4.1 10.6l3.2 3.2L16 5.9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ZavvisVsRest() {
  return (
    <section
      className="zvr"
      style={
        {
          ["--stars-url" as any]: `url(${stars})`,
        } as React.CSSProperties
      }
    >
      <div className="zvr__starsSide zvr__starsSide--left" aria-hidden="true" />
      <div className="zvr__starsSide zvr__starsSide--right" aria-hidden="true" />

      <div className="zvr__inner">
        <h2 className="zvr__title">Zavvis vs. The Status Quo</h2>

        <div className="zvr__card" role="group" aria-label="Zavvis vs the status quo comparison">
          <div className="zvr__grid">
            <div
              className="zvr__cell zvr__cell--head zvr__cell--left zvr__reveal"
              style={{ ["--i" as any]: 0 }}
            >
              <span className="zvr__headText">Traditional Tools</span>
            </div>
            <div
              className="zvr__cell zvr__cell--head zvr__cell--right zvr__reveal"
              style={{ ["--i" as any]: 0 }}
            >
              <span className="zvr__headText">Zavvis</span>
            </div>

            {leftItems.map((left, i) => (
              <React.Fragment key={left}>
                <div
                  className="zvr__cell zvr__cell--left zvr__cell--body zvr__reveal"
                  style={{ ["--i" as any]: i + 1 }}
                >
                  <span className="zvr__item">
                    <span className="zvr__icon zvr__icon--bad" aria-hidden="true">
                      <IconX />
                    </span>
                    <span className="zvr__text">{left}</span>
                  </span>
                </div>

                <div
                  className="zvr__cell zvr__cell--right zvr__cell--body zvr__reveal"
                  style={{ ["--i" as any]: i + 1 }}
                >
                  <span className="zvr__item">
                    <span className="zvr__icon zvr__icon--good" aria-hidden="true">
                      <IconCheck />
                    </span>
                    <span className="zvr__text">{rightItems[i]}</span>
                  </span>
                </div>
              </React.Fragment>
            ))}
          </div>

          <div className="zvr__pillWrap">
            <div className="zvr__pill">They report the past. We prevent the future.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
