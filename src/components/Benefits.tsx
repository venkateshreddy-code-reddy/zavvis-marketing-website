// src/components/Benefits.tsx
import { useEffect, useRef } from "react";
import "../style/Benefits.css";
import stars from "../assets/stars.png";

type Benefit = {
  title: React.ReactNode;
  desc: string;
  icon: "bolt" | "shield" | "growth" | "doc" | "target";
};

const BENEFITS: Benefit[] = [
  {
    icon: "bolt",
    title: (
      <>
        Reduce Investigation Time By <br />
        70–90%
      </>
    ),
    desc: "Stop digging through GL exports, spreadsheets, and multiple systems. Zavvis surfaces anomalies with built-in explanations — so you focus on solutions, not searches.",
  },
  {
    icon: "shield",
    title: (
      <>
        Catch Issues Before They <br />
        Compound
      </>
    ),
    desc: "Traditional tools alert you after the fact. Zavvis detects deviations early, explains drivers, and recommends prevention — avoiding margin erosion, cash shortfalls, or compliance risks.",
  },
  {
    icon: "growth",
    title: (
      <>
        Scale Without Adding <br />
        Headcount
      </>
    ),
    desc: "Manual analysis doesn’t scale. Zavvis automates monitoring and causal reasoning across systems, freeing teams for strategic work instead of routine checks.",
  },
  {
    icon: "doc",
    title: (
      <>
        Build Trust Through <br />
        Transparency
      </>
    ),
    desc: "Every anomaly comes with traceable evidence and live drill-downs. Share interactive war rooms with stakeholders to prove rigor and build confidence in your financial intelligence.",
  },
  {
    icon: "target",
    title: (
      <>
        Prevent Recurring <br />
        Risk
      </>
    ),
    desc: "Zavvis converts insight into action: corrective playbooks, adaptive guardrails, and auto-suggested journal fixes — closing the loop so the same issue never happens twice.",
  },
];

function Icon({ name }: { name: Benefit["icon"] }) {
  switch (name) {
    case "bolt":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="bf__iconSvg">
          <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8Z" fill="currentColor" />
        </svg>
      );
    case "shield":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="bf__iconSvg">
          <path
            d="M12 2l7 4v6c0 5-3 9-7 10-4-1-7-5-7-10V6l7-4Z"
            fill="currentColor"
            opacity="0.95"
          />
          <path
            d="M10.2 12.2l1.4 1.4 3.6-3.6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "growth":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="bf__iconSvg">
          <path
            d="M4 19h16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M7 17V11M12 17V8M17 17v-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M7 11l4-3 3 2 5-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "doc":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="bf__iconSvg">
          <path
            d="M7 2h7l3 3v15a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z"
            fill="currentColor"
            opacity="0.95"
          />
          <path
            d="M14 2v4h4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path
            d="M8.7 13.2l1.3 1.3 3-3.1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 17h8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.9"
          />
        </svg>
      );
    case "target":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="bf__iconSvg">
          <path
            d="M12 21a9 9 0 1 1 9-9"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M12 17a5 5 0 1 1 5-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.95"
          />
          <path d="M12 13a1 1 0 1 0-1-1 1 1 0 0 0 1 1Z" fill="currentColor" />
          <path
            d="M14.2 9.8l5-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M16.8 4.2h2.4v2.4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return null;
  }
}

export default function Benefits() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-anim]"));
    if (!targets.length) return;

    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (prefersReduced) {
      targets.forEach((el) => el.classList.add("is-in"));
      root.classList.add("bf--play");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
    );

    targets.forEach((el) => io.observe(el));

    const ioRoot = new IntersectionObserver(
      (entries) => {
        const hit = entries.some((e) => e.isIntersecting);
        if (hit) {
          root.classList.add("bf--play");
          ioRoot.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    ioRoot.observe(root);

    return () => {
      io.disconnect();
      ioRoot.disconnect();
    };
  }, []);

  return (
    <section
      className="bf"
      ref={rootRef}
      aria-label="Benefits for Finance Teams"
      style={
        {
          ["--stars-url" as any]: `url(${stars})`,
        } as React.CSSProperties
      }
    >
      {/* ⭐ Stars like Hero */}
      <div className="bf__starsSide bf__starsSide--left" aria-hidden="true" />
      <div className="bf__starsSide bf__starsSide--right" aria-hidden="true" />

      <div className="bf__container">
        <h2 className="bf__title" data-anim style={{ ["--d" as any]: "0ms" }}>
          Benefits For Finance Teams
        </h2>

        <div className="bf__grid">
          {BENEFITS.map((b, idx) => (
            <article
              className="bf__item"
              key={idx}
              data-anim
              style={{ ["--d" as any]: `${120 + idx * 90}ms` }}
            >
              <div className="bf__badge" aria-hidden="true">
                <Icon name={b.icon} />
              </div>

              <h3 className="bf__h">{b.title}</h3>
              <p className="bf__p">{b.desc}</p>
            </article>
          ))}

          <div
            className="bf__chart"
            aria-label="Bar comparison chart"
            data-anim
            style={{ ["--d" as any]: "620ms" }}
          >
            <div className="bf__bars">
              <div className="bf__barGroup">
                <div className="bf__barLabel">120</div>
                <div className="bf__bar bf__bar--tall" aria-hidden="true" />
              </div>

              <div className="bf__barGroup">
                <div className="bf__barLabel">&lt;10h</div>
                <div className="bf__bar bf__bar--short" aria-hidden="true" />
              </div>

              <div className="bf__baseline" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
