// src/components/HowItWorks.tsx
import "../style/HowItWorks.css";
import connector from "../assets/Group 155.png";
import stars from "../assets/stars.png";

type CopyItem = {
  title: string;
  body: string;
  pos: "top" | "bottom";
  col: "c1" | "c2" | "c3" | "c4";
};

const items: CopyItem[] = [
  {
    title: "Continuous Monitoring",
    body:
      "Our engine continuously scans new entries for material breaks, from duplicate journals and late postings to margin leakage and DSO stretch.",
    pos: "top",
    col: "c2",
  },
  {
    title: "Live War Room Delivery",
    body:
      "An auto-generated, real-time, interactive presentation delivered via a shareable URL. Drill to the source, run scenarios, and collaborate without exporting files.",
    pos: "top",
    col: "c4",
  },
  {
    title: "Ingest & Normalize",
    body:
      "Connect QuickBooks, NetSuite, Salesforce, SAP, or any data warehouse. Zavvis normalizes every record into a unified transactional timeline.",
    pos: "bottom",
    col: "c1",
  },
  {
    title: "Instant Root-Cause Provenance",
    body:
      "The moment a signal is detected, Zavvis traces it across systems to the exact source record, whether an invoice ID, GL transaction, or CRM opportunity.",
    pos: "bottom",
    col: "c3",
  },
];

function pick(pos: CopyItem["pos"], col: CopyItem["col"]) {
  return items.find((x) => x.pos === pos && x.col === col) || null;
}

function Cell({ item, className }: { item: CopyItem | null; className: string }) {
  if (!item) return <div className={className} aria-hidden="true" />;
  return (
    <div className={className}>
      <h3 className="hiwOnly__h">{item.title}</h3>
      <p className="hiwOnly__p">{item.body}</p>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section
      className="hiwOnly"
      aria-labelledby="hiw-title"
      style={
        {
          ["--stars-url" as any]: `url(${stars})`,
        } as React.CSSProperties
      }
    >
      {/* ✅ stars like hero */}
      <div className="hiwOnly__starsSide hiwOnly__starsSide--left" aria-hidden="true" />
      <div className="hiwOnly__starsSide hiwOnly__starsSide--right" aria-hidden="true" />

      <div className="hiwOnly__container">
        <h2 id="hiw-title" className="hiwOnly__title">
          How It Works
        </h2>

        <div className="hiwOnly__gridStage">
          <Cell item={pick("top", "c1")} className="hiwOnly__cell hiwOnly__cell--top hiwOnly__c1" />
          <Cell item={pick("top", "c2")} className="hiwOnly__cell hiwOnly__cell--top hiwOnly__c2" />
          <Cell item={pick("top", "c3")} className="hiwOnly__cell hiwOnly__cell--top hiwOnly__c3" />
          <Cell item={pick("top", "c4")} className="hiwOnly__cell hiwOnly__cell--top hiwOnly__c4" />

          <div className="hiwOnly__diagramRow">
            <img
              src={connector}
              alt="How it works flow"
              className="hiwOnly__image"
              draggable={false}
            />
          </div>

          <Cell item={pick("bottom", "c1")} className="hiwOnly__cell hiwOnly__cell--bottom hiwOnly__c1" />
          <Cell item={pick("bottom", "c2")} className="hiwOnly__cell hiwOnly__cell--bottom hiwOnly__c2" />
          <Cell item={pick("bottom", "c3")} className="hiwOnly__cell hiwOnly__cell--bottom hiwOnly__c3" />
          <Cell item={pick("bottom", "c4")} className="hiwOnly__cell hiwOnly__cell--bottom hiwOnly__c4" />
        </div>
      </div>
    </section>
  );
}
