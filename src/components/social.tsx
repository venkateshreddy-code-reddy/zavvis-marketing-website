// EarlyResultsSection.tsx
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import "../style/EarlyResultsSection.css";

import ceoImg from "../assets/ceo.png";
import cfoImg from "../assets/cfo.png"; // keep your file name as sfo.png
import controllerImg from "../assets/controller.png";

type Testimonial = {
  quote: string;
  role: string;
  subtitle: string;
  image: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote: "This is the first time we’ve had real financial observability.",
    role: "CEO",
    subtitle: "$120M healthcare group",
    image: ceoImg,
  },
  {
    quote: "Caught a $20k duplicate payment the day it posted.",
    role: "Controller",
    subtitle: "$90M SaaS company",
    image: controllerImg,
  },
  {
    quote: "Reduced quarterly investigation time from 120 hours to under 10.",
    role: "CFO",
    subtitle: "$180M manufacturing company",
    image: cfoImg,
  },
];

function ArrowIcon({ dir }: { dir: "left" | "right" }) {
  return (
    <svg className="ers__arrowIcon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {dir === "left" ? (
        <path
          d="M14.9 5.2 8.2 12l6.7 6.8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M9.1 18.8 15.8 12 9.1 5.2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

function QuoteSquareIcon() {
  return (
    <span className="ers__quoteSquare" aria-hidden="true">
      <svg className="ers__quoteSvg" viewBox="0 0 64 64">
        <path
          d="M26.7 28.4c-4.9 0-8.8 3.9-8.8 8.8V46h13.9V32.2c0-2.1-1.7-3.8-3.8-3.8h-1.3z"
          fill="currentColor"
          opacity="0.92"
        />
        <path
          d="M46.6 28.4c-4.9 0-8.8 3.9-8.8 8.8V46h13.9V32.2c0-2.1-1.7-3.8-3.8-3.8h-1.3z"
          fill="currentColor"
          opacity="0.92"
        />
      </svg>
    </span>
  );
}

function JsonCard({ variant }: { variant: "back" | "front" }) {
  return (
    <div className={`ers__jsonCard ers__jsonCard--${variant}`} aria-hidden="true">
      <div className="ers__jsonHeader">json</div>

      <pre className="ers__code" aria-hidden="true">
        <code>
          {"{\n"}
          {variant === "back" ? (
            <>
              {"  "}
              <span className="ers__k">"prefs_id"</span>
              {": "}
              <span className="ers__s">"pref_2025-11-07_abc"</span>
              {",\n"}
              {"  "}
              <span className="ers__k">"metric_key"</span>
              {": "}
              <span className="ers__s">"revenue_total"</span>
              {",\n"}
              {"  "}
              <span className="ers__k">"direction"</span>
              {": "}
              <span className="ers__s">"decrease"</span>
              {",\n"}
              {"  "}
              <span className="ers__k">"min_pct"</span>
              {": "}
              <span className="ers__n">5</span>
              {",\n"}
              {"  "}
              <span className="ers__k">"min_abs"</span>
              {": "}
              <span className="ers__n">10000</span>
              {",\n"}
              {"  "}
              <span className="ers__k">"segments"</span>
              {": ["}
              <span className="ers__s">"customer_id"</span>
              {", "}
              <span className="ers__s">"product_family"</span>
              {"],\n"}
              {"  "}
              <span className="ers__k">"baseline_window_days"</span>
              {": "}
              <span className="ers__n">30</span>
              {",\n"}
              {"  "}
              <span className="ers__k">"alert_channel"</span>
              {": "}
              <span className="ers__s">"email"</span>
              {"\n"}
            </>
          ) : (
            <>
              {"  "}
              <span className="ers__k">"metric"</span>
              {": "}
              <span className="ers__s">"gross_margin_pct"</span>
              {",\n"}
              {"  "}
              <span className="ers__k">"direction"</span>
              {": "}
              <span className="ers__s">"decrease"</span>
              {",\n"}
              {"  "}
              <span className="ers__k">"pct_threshold"</span>
              {": "}
              <span className="ers__n">3</span>
              {",\n"}
              {"\n"}
              {"  "}
              <span className="ers__k">"abs_threshold"</span>
              {": "}
              <span className="ers__n">25000</span>
              {",\n"}
              {"  "}
              <span className="ers__k">"baseline"</span>
              {": "}
              <span className="ers__s">"budget"</span>
              {",\n"}
              {"  "}
              <span className="ers__k">"dimension"</span>
              {": "}
              <span className="ers__s">"customer_segment"</span>
              {",\n"}
              {"  "}
              <span className="ers__k">"recipients"</span>
              {": ["}
              <span className="ers__s">"cfo"</span>
              {", "}
              <span className="ers__s">"fpna"</span>
              {"]\n"}
            </>
          )}
          {"}\n"}
        </code>
      </pre>

      <div className="ers__jsonFade" aria-hidden="true" />
    </div>
  );
}

function useInViewClass<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.classList.add("is-inView");
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.18 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return ref;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  return reduced;
}

export default function EarlyResultsSection() {
  const sectionRef = useInViewClass<HTMLElement>();
  const reducedMotion = usePrefersReducedMotion();

  const setRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const [paused, setPaused] = useState(false);
  const [setWidth, setSetWidth] = useState(0);

  // IMPORTANT: offset is translateX(px) and moves RIGHT continuously
  const [offset, setOffset] = useState(0);
  const offsetRef = useRef(0);

  const items = useMemo(() => {
    const a = TESTIMONIALS;
    return [...a, ...a, ...a, ...a];
  }, []);

  useLayoutEffect(() => {
    const measure = () => {
      const el = setRef.current;
      if (!el) return;
      const w = Math.ceil(el.getBoundingClientRect().width);
      setSetWidth(w);

      const start = -w; // start off-screen left
      setOffset(start);
      offsetRef.current = start;
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const speedPxPerSec = 58;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(40, now - last);
      last = now;

      if (!paused && setWidth > 0) {
        let next = offsetRef.current + (speedPxPerSec * dt) / 1000; // move RIGHT
        if (next >= 0) next = -setWidth; // loop seamlessly
        offsetRef.current = next;
        setOffset(next);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [paused, reducedMotion, setWidth]);

  const nudge = 420;

  const normalize = (val: number) => {
    if (setWidth <= 0) return val;
    while (val >= 0) val -= setWidth;
    while (val < -setWidth) val += setWidth;
    return val;
  };

  const goLeft = () => {
    const next = normalize(offsetRef.current - nudge);
    offsetRef.current = next;
    setOffset(next);
  };

  const goRight = () => {
    const next = normalize(offsetRef.current + nudge);
    offsetRef.current = next;
    setOffset(next);
  };

  return (
    <section ref={sectionRef} className="ers" aria-label="Early Results and Social Proof">
      <div className="ers__bg" aria-hidden="true" />
      <div className="ers__noise" aria-hidden="true" />

      <div className="ers__container">
        <div className="ers__top">
          <header className="ers__left">
            <h2 className="ers__title">
              Early Results &amp; <span className="ers__titleAccent">Social</span>
              <br />
              Proof
            </h2>

            <p className="ers__quote">
              “Reduced monthly investigation <br />
              time from 120 hours to under 10.”
            </p>

            <div className="ers__divider" aria-hidden="true" />
            <QuoteSquareIcon />
          </header>

          <div className="ers__right" aria-hidden="true">
            <div className="ers__jsonStack">
              <JsonCard variant="back" />
              <JsonCard variant="front" />
              <div className="ers__orb ers__orb--a" aria-hidden="true" />
            </div>
          </div>
        </div>

        <div className="ers__bottom">
          <div className="ers__nav" aria-label="Carousel controls">
            <button className="ers__ctrlBtn" type="button" aria-label="Scroll left" onClick={goLeft}>
              <ArrowIcon dir="left" />
            </button>
            <button className="ers__ctrlBtn" type="button" aria-label="Scroll right" onClick={goRight}>
              <ArrowIcon dir="right" />
            </button>
          </div>

          <div
            className="ers__rail"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={() => setPaused(true)}
            onTouchEnd={() => setPaused(false)}
            role="region"
            aria-label="Testimonials"
          >
            {/* This is only to MEASURE width of one full "set" (3 cards). Hidden off-screen. */}
            <div className="ers__measureSet" ref={setRef} aria-hidden="true">
              {TESTIMONIALS.map((t, i) => (
                <article className="ers__card" key={`measure-${i}`}>
                  <div className="ers__cardInner">
                    <div className="ers__cardTop">
                      <img className="ers__avatar" src={t.image} alt="" draggable={false} />
                    </div>
                    <p className="ers__cardQuote">“{t.quote}”</p>
                    <div className="ers__cardRole">
                      <span className="ers__dash">—</span> {t.role}
                    </div>
                    <div className="ers__cardSub">{t.subtitle}</div>
                  </div>
                </article>
              ))}
            </div>

            {/* Actual moving track (MUST stay left->right) */}
            <div className="ers__track" style={{ transform: `translate3d(${offset}px, 0, 0)` }}>
              {items.map((t, i) => (
                <article className="ers__card" key={`${t.role}-${i}`}>
                  <div className="ers__cardInner">
                    <div className="ers__cardTop">
                      <img className="ers__avatar" src={t.image} alt={t.role} draggable={false} />
                    </div>
                    <p className="ers__cardQuote">“{t.quote}”</p>
                    <div className="ers__cardRole">
                      <span className="ers__dash">—</span> {t.role}
                    </div>
                    <div className="ers__cardSub">{t.subtitle}</div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="ers__hint" aria-hidden="true">
            {paused ? "Paused" : "Auto-scrolling"}
          </div>
        </div>
      </div>
    </section>
  );
}
