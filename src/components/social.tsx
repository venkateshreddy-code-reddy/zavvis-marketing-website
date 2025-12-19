// EarlyResultsSection.tsx
import  { useEffect, useMemo, useRef, useState } from "react";
import "../style/EarlyResultsSection.css";

type Testimonial = {
  quote: string;
  role: string;
  subtitle: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote: "This is the first time we’ve had real financial observability.",
    role: "CEO",
    subtitle: "$120M healthcare group",
  },
  {
    quote: "Caught a $20k duplicate payment the day it posted.",
    role: "Controller",
    subtitle: "$90M SaaS company",
  },
  {
    quote: "Reduced quarterly investigation time from 120 hours to under 10.",
    role: "CFO",
    subtitle: "$180M manufacturing company",
  },
];

function ArrowIcon({ dir = "left" }: { dir?: "left" | "right" }) {
  return (
    <svg className="ers__arrowIcon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {dir === "left" ? (
        <path
          d="M14.8 5.6 8.4 12l6.4 6.4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M9.2 18.4 15.6 12 9.2 5.6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
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
          opacity="0.9"
        />
        <path
          d="M46.6 28.4c-4.9 0-8.8 3.9-8.8 8.8V46h13.9V32.2c0-2.1-1.7-3.8-3.8-3.8h-1.3z"
          fill="currentColor"
          opacity="0.9"
        />
      </svg>
    </span>
  );
}

function Avatar({ seed = 1 }: { seed?: number }) {
  const svg = encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
      <defs>
        <radialGradient id="g" cx="30%" cy="25%" r="85%">
          <stop offset="0" stop-color="rgba(170,130,255,1)"/>
          <stop offset="0.55" stop-color="rgba(118,76,255,1)"/>
          <stop offset="1" stop-color="rgba(40,18,80,1)"/>
        </radialGradient>
        <linearGradient id="s" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="rgba(255,255,255,0.18)"/>
          <stop offset="1" stop-color="rgba(255,255,255,0)"/>
        </linearGradient>
      </defs>
      <rect width="96" height="96" rx="48" fill="url(#g)"/>
      <path d="M16 84c6-18 22-28 32-28s26 10 32 28" fill="rgba(0,0,0,0.28)"/>
      <circle cx="48" cy="40" r="16" fill="rgba(255,255,255,0.22)"/>
      <path d="M35 40c2-7 7-11 13-11s11 4 13 11" fill="rgba(0,0,0,0.22)"/>
      <path d="M26 30c9-13 35-13 44 0" stroke="rgba(255,255,255,0.16)" stroke-width="3" stroke-linecap="round" fill="none"/>
      <rect x="10" y="10" width="76" height="76" rx="38" fill="url(#s)"/>
      <text x="50%" y="92%" text-anchor="middle" font-family="system-ui, -apple-system, Segoe UI, Roboto" font-size="10" fill="rgba(255,255,255,0.0)">${seed}</text>
    </svg>
  `);

  return (
    <img
      className="ers__avatar"
      src={`data:image/svg+xml;charset=utf-8,${svg}`}
      alt=""
      draggable={false}
    />
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
              {",  "}
              <span className="ers__c">// Default MOM; user can specify</span>
              {"\n"}
              {"  "}
              <span className="ers__k">"alert_channel"</span>
              {": "}
              <span className="ers__s">"email"</span>
              {"  "}
              <span className="ers__c">// Optional</span>
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

function useIsMobile(breakpoint = 980) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, [breakpoint]);

  return isMobile;
}

export default function EarlyResultsSection() {
  const sectionRef = useInViewClass<HTMLElement>();
  const isMobile = useIsMobile(980);

  const [index, setIndex] = useState(0);
  const maxIndex = useMemo(() => Math.max(0, TESTIMONIALS.length - 1), []);

  useEffect(() => {
    setIndex(0);
  }, [isMobile]);

  const prev = () => setIndex((v) => (v - 1 < 0 ? maxIndex : v - 1));
  const next = () => setIndex((v) => (v + 1 > maxIndex ? 0 : v + 1));

  return (
    <section ref={sectionRef} className="ers" aria-label="Early Results and Social Proof">
      <div className="ers__bgGlow" aria-hidden="true" />
      <div className="ers__bgNoise" aria-hidden="true" />

      <div className="ers__container">
        <div className="ers__top">
          <header className="ers__left">
            <h2 className="ers__title">Early Results &amp; Social Proof</h2>

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
              <div className="ers__orb ers__orb--b" aria-hidden="true" />
            </div>
          </div>
        </div>

        <div className="ers__bottom">
          <div className="ers__controls" aria-label="Carousel controls">
            <button
              className="ers__ctrlBtn"
              type="button"
              aria-label="Previous testimonials"
              onClick={prev}
            >
              <ArrowIcon dir="left" />
            </button>
            <button
              className="ers__ctrlBtn"
              type="button"
              aria-label="Next testimonials"
              onClick={next}
            >
              <ArrowIcon dir="right" />
            </button>
          </div>

          <div
            className={`ers__cards ${isMobile ? "ers__cards--carousel" : ""}`}
            aria-label="Testimonials"
          >
            <div
              className="ers__track"
              style={
                isMobile
                  ? ({ ["--x" as any]: `${index}` } as React.CSSProperties)
                  : undefined
              }
            >
              {TESTIMONIALS.map((t, i) => (
                <article
                  className="ers__card"
                  key={i}
                  style={{ ["--i" as any]: i } as React.CSSProperties}
                >
                  <div className="ers__cardInner">
                    <div className="ers__cardTop">
                      <Avatar seed={i + 1} />
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

            {isMobile && (
              <div className="ers__dots" aria-label="Carousel position">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`ers__dot ${i === index ? "is-active" : ""}`}
                    aria-label={`Go to testimonial ${i + 1}`}
                    onClick={() => setIndex(i)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
