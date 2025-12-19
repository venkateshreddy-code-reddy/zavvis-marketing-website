// PrinciplesSection.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import "../style/PrincipleSection.css";

type Principle = {
  key: string;
  title: string;
  body: string;
  tone: "violet" | "orchid" | "magenta" | "indigo";
  icon: React.ReactNode;
};

const IconFunnel = () => (
  <svg className="principles__icon" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M4 6h16l-6.6 7.2v4.2l-2.8 1.6v-5.8L4 6z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

const IconGear = () => (
  <svg className="principles__icon" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M12 14.8a2.8 2.8 0 1 0 0-5.6 2.8 2.8 0 0 0 0 5.6Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <path
      d="M19.2 12a7.4 7.4 0 0 0-.08-1l2-1.2-1.8-3.1-2.3.8a7.8 7.8 0 0 0-1.73-1l-.3-2.4H9l-.3 2.4a7.8 7.8 0 0 0-1.73 1l-2.3-.8L2.9 9.8l2 1.2a7.4 7.4 0 0 0-.08 1c0 .34.03.67.08 1l-2 1.2 1.8 3.1 2.3-.8c.53.42 1.11.76 1.73 1l.3 2.4h6l.3-2.4c.62-.24 1.2-.58 1.73-1l2.3.8 1.8-3.1-2-1.2c.05-.33.08-.66.08-1Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinejoin="round"
      opacity="0.95"
    />
  </svg>
);

const IconLink = () => (
  <svg className="principles__icon" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M10.3 13.7 8.9 15.1a3.4 3.4 0 0 1-4.8 0 3.4 3.4 0 0 1 0-4.8l2.3-2.3a3.4 3.4 0 0 1 4.8 0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path
      d="M13.7 10.3 15.1 8.9a3.4 3.4 0 0 1 4.8 0 3.4 3.4 0 0 1 0 4.8l-2.3 2.3a3.4 3.4 0 0 1-4.8 0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path
      d="M9.6 14.4l4.8-4.8"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      opacity="0.9"
    />
  </svg>
);

const IconBot = () => (
  <svg className="principles__icon" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M12 5.2V3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      opacity="0.85"
    />
    <path
      d="M8.2 9.4h7.6c2.1 0 3.8 1.7 3.8 3.8v2.6c0 2.6-2.1 4.7-4.7 4.7H9.1c-2.6 0-4.7-2.1-4.7-4.7v-2.6c0-2.1 1.7-3.8 3.8-3.8Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    <path
      d="M9.2 14.1h.01M14.8 14.1h.01"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
    <path
      d="M9.2 17.1c1 .9 4.6.9 5.6 0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      opacity="0.9"
    />
  </svg>
);

const PRINCIPLES: Principle[] = [
  {
    key: "precision",
    title: "Precision Over Noise",
    body: "We surface only what materially matters — no dashboards, no vanity metrics.",
    tone: "violet",
    icon: <IconFunnel />,
  },
  {
    key: "engfin",
    title: "Engineering + Finance Combined",
    body: "Modern ML, anomaly detection, and causal inference applied to the source of truth: your general ledger and operating systems.",
    tone: "orchid",
    icon: <IconGear />,
  },
  {
    key: "provenance",
    title: "Integrity Through Provenance",
    body: "Every signal comes with immutable proof — drill from any number to its exact invoice, journal, or opportunity ID.",
    tone: "magenta",
    icon: <IconLink />,
  },
  {
    key: "prevention",
    title: "Autonomous Prevention",
    body: "Insights aren’t enough. We auto-generate guardrails, corrective actions, and adaptive thresholds so the same risk never recurs.",
    tone: "indigo",
    icon: <IconBot />,
  },
];

function useInView<T extends HTMLElement>(threshold = 0.22) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, inView };
}

const PrinciplesSection: React.FC = () => {
  const { ref, inView } = useInView<HTMLElement>(0.18);

  const reducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  return (
    <section
      ref={ref}
      className={`principles ${inView ? "is-in" : ""} ${reducedMotion ? "rm" : ""}`}
      aria-labelledby="principles-title"
    >
      <div className="principles__bg" aria-hidden="true">
        <div className="principles__glowTop" />
        <div className="principles__vignette" />
        <div className="principles__stars" />
      </div>

      <div className="principles__container">
        <header className="principles__header">
          <h2 id="principles-title" className="principles__title">
            Principles We Build On
          </h2>
        </header>

        <div className="principles__grid" role="list">
          {PRINCIPLES.map((p, i) => (
            <article
              key={p.key}
              className={`principles__item principles__item--${p.key}`}
              style={{ ["--d" as any]: `${i * 110}ms` }}
              role="listitem"
            >
              <div className={`principles__tile principles__tile--${p.tone}`} aria-hidden="true">
                <span className="principles__tileGrid" aria-hidden="true" />
                <span className="principles__tileGlow" aria-hidden="true" />
                <span className="principles__tileInner" aria-hidden="true">
                  {p.icon}
                </span>
              </div>

              <h3 className="principles__itemTitle">{p.title}</h3>
              <p className="principles__itemBody">{p.body}</p>
            </article>
          ))}

          <div className="principles__divider" aria-hidden="true">
            <span className="principles__dividerLine principles__dividerLine--left" />
            <span className="principles__dividerDot" />
            <span className="principles__dividerLine principles__dividerLine--right" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrinciplesSection;
