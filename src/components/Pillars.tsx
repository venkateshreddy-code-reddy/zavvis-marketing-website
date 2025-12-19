
import "../style/Pillars.css";

interface PillarProps {
  title: string;
  description: string;
  icon: string;
  variant: "purple" | "pink" | "red" | "blue";
  delay?: number;
}

const Pillar: React.FC<PillarProps> = ({ title, description, icon, variant, delay = 0 }) => (
  <article
    className={`pillar-card pillar-card--${variant}`}
    style={{ ["--d" as any]: `${delay}ms` }}
  >
    <div className="pillar-icon-wrapper">
      <div className="pillar-icon-bg" aria-hidden="true">
        <span className="pillar-icon" aria-hidden="true">
          {icon}
        </span>
      </div>
    </div>

    <h3 className="pillar-heading">{title}</h3>
    <p className="pillar-body">{description}</p>
  </article>
);

const PillarsSectionDiamond: React.FC = () => {
  return (
    <section className="pillars-section" aria-labelledby="pillars-title">
      <div className="pillars-bg" aria-hidden="true" />
      <div className="pillars-stars" aria-hidden="true" />
      <div className="pillars-vignette" aria-hidden="true" />
      <div className="pillars-noise" aria-hidden="true" />
      <div className="pillars-aurora" aria-hidden="true" />

      <div className="pillars-container">
        <header className="pillars-header">
          <h2 className="pillars-title" id="pillars-title">
            The Pillars
          </h2>
          <p className="pillars-subtitle">
            The Intelligence Stack That Turns Financial Data into Real-Time Control
          </p>
        </header>

        <div className="pillars-diamond" role="list" aria-label="Zavvis Pillars">
          <div className="pillars-connector" aria-hidden="true">
            <span className="pillars-connector__h" />
            <span className="pillars-connector__v" />
            <span className="pillars-connector__dot" />
            <span className="pillars-connector__pulse" />

            {/* subtle orbiting sparks */}
            <span className="pillars-connector__spark pillars-connector__spark--a" />
            <span className="pillars-connector__spark pillars-connector__spark--b" />
            <span className="pillars-connector__spark pillars-connector__spark--c" />
          </div>

          <div className="pillars-slot pillars-slot--tl" role="listitem">
            <Pillar
              title="Anomaly Intelligence Engine"
              icon="🧠"
              variant="purple"
              delay={60}
              description="Advanced ML models trained on financial semantics continuously scan raw data to surface material outliers, detect variance breaks, and identify emerging risk — shifting finance from reactive firefighting to proactive control."
            />
          </div>

          <div className="pillars-slot pillars-slot--tr" role="listitem">
            <Pillar
              title="Root-Cause Reasoning Agent"
              icon="🔍"
              variant="pink"
              delay={140}
              description="Zavvis traces every anomaly back to its origin across accounting, sales, and operating systems — no manual digging, no spreadsheet hunting. Full provenance to the exact transaction that caused the deviation."
            />
          </div>

          <div className="pillars-slot pillars-slot--bl" role="listitem">
            <Pillar
              title="Conversational Observability"
              icon="💬"
              variant="red"
              delay={220}
              description="Use natural language as your command surface. Ask questions, adjust thresholds, create guardrails, and plan scenarios — all powered by the same intelligence that drives anomaly detection and root-cause provenance."
            />
          </div>

          <div className="pillars-slot pillars-slot--br" role="listitem">
            <Pillar
              title="Live, Drillable War Rooms"
              icon="📊"
              variant="blue"
              delay={300}
              description="Anomalies auto-generate real-time, interactive decks. Drill into any number — see the source record. Run scenarios live. Share via no-login URL. The board sees proof, not PowerPoint."
            />
          </div>
        </div>

        <div className="pillars-footer-container">
          <div className="pillars-footer-pill">
            <span className="pillars-footer-pill__shine" aria-hidden="true" />
            Dashboards show what happened. Zavvis stops it from happening.
          </div>
        </div>
      </div>
    </section>
  );
};

export default PillarsSectionDiamond;
