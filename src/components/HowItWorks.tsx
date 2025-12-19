// HowItWorks.tsx
import  { useEffect, useRef, useState } from "react";
import "../style/HowItWorks.css";
import connector from "../assets/Group 155.png";

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
      "ML + hybrid thresholds (% or $) scan every new entry for material breaks — from duplicate journals to DSO stretch to margin leakage.",
    pos: "top",
    col: "c2",
  },
  {
    title: "Live War Room Delivery",
    body:
      "Auto-generated, real-time, interactive presentation delivered via shareable URL. Drill to source, run scenarios, collaborate — all without exporting a file.",
    pos: "top",
    col: "c4",
  },
  {
    title: "Ingest & Normalize",
    body:
      "Connect QuickBooks, NetSuite, Salesforce, SAP, or any data warehouse — Zavvis normalizes every record into a unified transactional timeline.",
    pos: "bottom",
    col: "c1",
  },
  {
    title: "Instant Root-Cause Provenance",
    body:
      "The second an anomaly fires, the system traces it across systems to the exact source records (invoice ID, GL txn, opp ID).",
    pos: "bottom",
    col: "c3",
  },
];

export default function HowItWorks() {
  const rootRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.25 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={rootRef} className={`hiwOnly ${visible ? "hiwOnly--in" : ""}`}>
      <div className="hiwOnly__container">
        <h2 className="hiwOnly__title">How It Works</h2>

        <div className="hiwOnly__stage">
          <img
            src={connector}
            alt="How it works flow"
            className="hiwOnly__image"
            draggable={false}
          />

          <div className="hiwOnly__overlay">
            {/* subtle pulses on nodes */}
            <span className="hiwOnly__spark hiwOnly__spark--c1" aria-hidden="true" />
            <span className="hiwOnly__spark hiwOnly__spark--c2" aria-hidden="true" />
            <span className="hiwOnly__spark hiwOnly__spark--c3" aria-hidden="true" />
            <span className="hiwOnly__spark hiwOnly__spark--c4" aria-hidden="true" />

            {/* copy blocks */}
            {items.map((it, idx) => (
              <div
                key={`${it.col}-${it.pos}`}
                className={[
                  "hiwOnly__copy",
                  it.pos === "top" ? "hiwOnly__copy--top" : "hiwOnly__copy--bottom",
                  `hiwOnly__copy--${it.col}`,
                ].join(" ")}
                style={{ ["--i" as any]: idx }}
              >
                <h3 className="hiwOnly__h">{it.title}</h3>
                <p className="hiwOnly__p">{it.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
