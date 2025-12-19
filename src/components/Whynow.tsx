// WhyNowSection.tsx
import { useEffect, useRef, useState } from "react";
import "../style/WhyNowSection.css";

type Bullet = { title: string };

const BULLETS: Bullet[] = [
  { title: "Close cycles are shrinking" },
  { title: "Boards demand proof, not PowerPoints" },
  { title: "One missed reversal or duplicate payment can cost seven figures" },
];

function CheckIcon() {
  return (
    <svg className="whyNow__check" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M20 6.5L9.5 17 4 11.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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

function InvestigationTimeCard({ animate }: { animate: boolean }) {
  return (
    <aside
      className={`itCard ${animate ? "is-animate" : ""}`}
      aria-label="Investigation Time chart card"
    >
      <div className="itCard__inner">
        <h3 className="itCard__title">Investigation Time</h3>

        <div className="itCard__chart" aria-hidden="true">
          <svg
            className="itCard__svg"
            viewBox="0 0 760 460"
            role="img"
            aria-label="Line chart showing decreasing investigation time"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <filter id="itGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="3.25" result="b" />
                <feColorMatrix
                  in="b"
                  type="matrix"
                  values="
                    0 0 0 0 0.36
                    0 0 0 0 0.31
                    0 0 0 0 0.97
                    0 0 0 0.85 0"
                  result="c"
                />
                <feMerge>
                  <feMergeNode in="c" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <linearGradient id="itArea" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="rgba(125, 96, 255, 0.34)" />
                <stop offset="55%" stopColor="rgba(125, 96, 255, 0.16)" />
                <stop offset="100%" stopColor="rgba(125, 96, 255, 0.02)" />
              </linearGradient>
            </defs>

            {/* Axes */}
            <line className="itCard__axis" x1="150" y1="115" x2="150" y2="372" />
            <line className="itCard__axis" x1="150" y1="345" x2="660" y2="345" />

            {/* Labels */}
            <text className="itCard__label" x="126" y="130" textAnchor="end">
              120h
            </text>
            <text className="itCard__label" x="126" y="352" textAnchor="end">
              10h
            </text>
            <text className="itCard__label itCard__label--x" x="178" y="385" textAnchor="start">
              8s
            </text>

            {/* Area */}
            <path
              className="itCard__area"
              d="
                M 150 130
                L 312 252
                L 642 332
                L 150 345
                Z
              "
              fill="url(#itArea)"
            />

            {/* Line */}
            <path
              className="itCard__line"
              d="
                M 150 130
                L 312 252
                L 642 332
              "
              filter="url(#itGlow)"
            />

            {/* V arrow */}
            <path className="itCard__arrow itCard__arrow--a" d="M 642 332 L 624 322" filter="url(#itGlow)" />
            <path className="itCard__arrow itCard__arrow--b" d="M 642 332 L 628 346" filter="url(#itGlow)" />

            {/* caret */}
            <path className="itCard__caret" d="M 646 382 L 654 372 L 662 382" />
          </svg>
        </div>
      </div>
    </aside>
  );
}

export default function WhyNowSection() {
  const { ref, inView } = useInView<HTMLElement>(0.22);

  return (
    <section className={`whyNow ${inView ? "is-inview" : ""}`} aria-label="Why Now" ref={ref}>
      <div className="whyNow__bgGlow" aria-hidden="true" />
      <div className="whyNow__grain" aria-hidden="true" />

      <div className="whyNow__container">
        <div className="whyNow__grid">
          {/* LEFT */}
          <div className="whyNow__left">
            <InvestigationTimeCard animate={inView} />
          </div>

          {/* RIGHT */}
          <div className="whyNow__right">
            <h2 className="whyNow__title">Why Now</h2>

            <p className="whyNow__lead">
              Finance teams today are flying blind between month-end
              <br />
              close and board meeting.
            </p>

            <ul className="whyNow__bullets" aria-label="Why Now bullets">
              {BULLETS.map((b, i) => (
                <li className="whyNow__bullet" key={b.title} style={{ ["--i" as any]: i }}>
                  <span className="whyNow__bulletIcon" aria-hidden="true">
                    <CheckIcon />
                  </span>
                  <span className="whyNow__bulletText">{b.title}</span>
                </li>
              ))}
            </ul>

            <div className="whyNow__callout" role="note" aria-label="Old model callout">
              <p className="whyNow__calloutText">
                The old model — wait for month-end → investigate → explain → pray it doesn’t happen again —{" "}
                <span className="whyNow__dead">is dead.</span>
              </p>
            </div>

            <p className="whyNow__footer">
              Zavvis is the observability layer corporate finance has been waiting for.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
