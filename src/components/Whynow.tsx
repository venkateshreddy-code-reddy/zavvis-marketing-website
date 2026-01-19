// src/components/WhyNowSection.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import "../style/WhyNowSection.css";

import graphImg from "../assets/graph.png";

type Bullet = { text: string };

const BULLETS: Bullet[] = [
  { text: "Close cycles are shrinking" },
  { text: "Boards demand instant, auditable proof, not PowerPoints." },
  { text: "A single missed reversal or duplicate payment can cost seven figures" },
];

function CheckIcon() {
  return (
    <svg className="wn__check" viewBox="0 0 24 24" aria-hidden="true">
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

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function useStars(count = 42) {
  return useMemo(() => {
    const arr = new Array(count).fill(0).map((_, i) => {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const s = 0.7 + Math.random() * 1.7;
      const o = 0.25 + Math.random() * 0.55;
      const d = Math.random() * 3.2;
      const t = 2.4 + Math.random() * 3.6;
      return {
        id: i,
        x,
        y,
        s,
        o,
        d,
        t,
      };
    });
    return arr;
  }, [count]);
}

export default function WhyNowSection() {
  const { ref, inView } = useInView<HTMLElement>(0.22);
  const stars = useStars(48);

  return (
    <section className={`wn ${inView ? "wn--in" : ""}`} ref={ref} aria-label="Why Now">
      <div className="wn__bg" aria-hidden="true">
        <div className="wn__glow wn__glow--top" />
        <div className="wn__glow wn__glow--mid" />
        <div className="wn__vignette" />
        <div className="wn__noise" />

        <div className="wn__stars">
          {stars.map((s) => (
            <span
              key={s.id}
              className="wn__star"
              style={
                {
                  left: `${s.x}%`,
                  top: `${s.y}%`,
                  opacity: s.o,
                  transform: `translate3d(0,0,0) scale(${s.s})`,
                  ["--sd" as any]: `${s.d}s`,
                  ["--st" as any]: `${s.t}s`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      </div>

      <div className="wn__wrap">
        <div className="wn__grid">
          {/* LEFT: Graph card (image) */}
          <div className="wn__left wn__reveal wn__reveal--card">
            <div className="wn__card" role="img" aria-label="Investigation Time chart">
              <div className="wn__cardInner">
                <img className="wn__graphImg" src={graphImg} alt="Investigation Time" />
              </div>
              <div className="wn__cardBorder" aria-hidden="true" />
              <div className="wn__cardGlow" aria-hidden="true" />
              <div className="wn__sheen" aria-hidden="true" />
            </div>
          </div>

          {/* RIGHT: Copy */}
          <div className="wn__right">
            <h2 className="wn__title wn__reveal wn__reveal--t1">Why Now</h2>

            <p className="wn__lead wn__reveal wn__reveal--t2">
              Corporate finance is operating under unprecedented transactional volume and volatility.
            </p>

            <ul className="wn__bullets">
              {BULLETS.map((b, i) => (
                <li className={`wn__bullet wn__reveal wn__reveal--b`} style={{ ["--i" as any]: i } as any} key={i}>
                  <span className="wn__bulletIcon">
                    <CheckIcon />
                  </span>
                  <span className="wn__bulletText">{b.text}</span>
                </li>
              ))}
            </ul>

            <div className="wn__callout wn__reveal wn__reveal--t3">
              <p className="wn__calloutText">
              The old model of waiting for month-end, investigating after impact, and hoping issues do not repeat, no longer works.
              </p>
              <span className="wn__calloutGlow" aria-hidden="true" />
            </div>

            <p className="wn__foot wn__reveal wn__reveal--t4">
              Zavvis is the layer enabling finance teams to operate in this new reality.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
