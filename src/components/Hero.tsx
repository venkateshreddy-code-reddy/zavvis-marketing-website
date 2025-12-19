import  { useEffect, useRef, useState } from "react";
import grid from "../assets/grid.png";
import stars from "../assets/stars.png";

const Hero: React.FC = () => {
  // Triggers entrance sequence after mount (minimal JS, CSS-driven)
  const [ready, setReady] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Optional: ultra-subtle parallax (desktop only, respects reduced motion)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const canHover =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (prefersReduced || !canHover) return;

    let raf = 0;

    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const nx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2); // -1..1
        const ny = (e.clientY - (r.top + r.height / 2)) / (r.height / 2); // -1..1

        // Keep it extremely subtle (board-room calm)
        const px = Math.max(-1, Math.min(1, nx)) * 10; // px
        const py = Math.max(-1, Math.min(1, ny)) * 6; // px

        el.style.setProperty("--mx", `${px.toFixed(2)}px`);
        el.style.setProperty("--my", `${py.toFixed(2)}px`);
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`hero relative w-full min-h-screen pt-20 text-white overflow-hidden ${
        ready ? "hero--ready" : ""
      }`}
      style={{
        backgroundColor: "#000000",
        minHeight: "100vh",
        paddingTop: "5rem", // pt-20 = 5rem
      }}
    >
      {/* =========================
          SCOPED ANIMATION STYLES
          ========================= */}
      <style>{`
        /* Scope */
        .hero { position: relative; isolation: isolate; }

        /* Parallax vars (default 0) */
        .hero { --mx: 0px; --my: 0px; }

        /* --- Performance-friendly defaults --- */
        .hero__grid,
        .hero__stars,
        .hero__title,
        .hero__subtitle,
        .hero__ctas,
        .hero__fineprint,
        .hero__box {
          will-change: transform, opacity, filter;
        }

        /* =========================
           HERO ENTRANCE (staggered)
           Calm, premium, non-flashy
           ========================= */
        .hero__title,
        .hero__subtitle,
        .hero__ctas,
        .hero__fineprint,
        .hero__box {
          opacity: 0;
          transform: translate3d(0, 10px, 0);
          filter: blur(0.2px);
        }

        .hero--ready .hero__title {
          animation: heroFadeUp 900ms cubic-bezier(0.2, 0.7, 0.2, 1) both;
          animation-delay: 60ms;
        }

        .hero--ready .hero__subtitle {
          animation: heroFadeUp 950ms cubic-bezier(0.2, 0.7, 0.2, 1) both;
          animation-delay: 190ms;
        }

        .hero--ready .hero__ctas {
          animation: heroFadeUpSoftScale 980ms cubic-bezier(0.2, 0.7, 0.2, 1) both;
          animation-delay: 330ms;
        }

        .hero--ready .hero__fineprint {
          animation: heroFadeUp 980ms cubic-bezier(0.2, 0.7, 0.2, 1) both;
          animation-delay: 470ms;
        }

        .hero--ready .hero__box {
          animation: heroFadeUp 1050ms cubic-bezier(0.2, 0.7, 0.2, 1) both;
          animation-delay: 610ms;
        }

        @keyframes heroFadeUp {
          from { opacity: 0; transform: translate3d(0, 12px, 0); }
          to   { opacity: 1; transform: translate3d(0, 0, 0); }
        }

        @keyframes heroFadeUpSoftScale {
          from { opacity: 0; transform: translate3d(0, 12px, 0) scale(0.985); }
          to   { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
        }

        /* =========================
           GRID BOWL AMBIENCE
           Slow drift + subtle breathing
           (IMPORTANT: no inline transform so animation can run)
           ========================= */
        .hero__grid {
          transform: translate3d(-50%, 0, 0) translate3d(calc(var(--mx) * 0.18), calc(var(--my) * 0.16), 0);
        }

        .hero--ready .hero__grid {
          animation:
            gridDrift 18s ease-in-out infinite,
            gridBreath 14s ease-in-out infinite;
        }

        @keyframes gridDrift {
          0%   { transform: translate3d(-50%, 0px, 0) translate3d(calc(var(--mx) * 0.18), calc(var(--my) * 0.16), 0); }
          50%  { transform: translate3d(-50%, -10px, 0) translate3d(calc(var(--mx) * 0.18), calc(var(--my) * 0.16), 0); }
          100% { transform: translate3d(-50%, 0px, 0) translate3d(calc(var(--mx) * 0.18), calc(var(--my) * 0.16), 0); }
        }

        @keyframes gridBreath {
          0%   { opacity: 1; }
          50%  { opacity: 0.92; }
          100% { opacity: 1; }
        }

        /* =========================
           STARS FIELD AMBIENCE
           Extremely slow drift (subconscious)
           (IMPORTANT: no inline transform so animation can run)
           ========================= */
        .hero__stars {
          transform: translate3d(-50%, 0, 0) translate3d(calc(var(--mx) * 0.12), calc(var(--my) * 0.08), 0);
        }

        .hero--ready .hero__stars {
          animation: starsDrift 42s linear infinite;
        }

        @keyframes starsDrift {
          0%   { transform: translate3d(-50%, 0, 0) translate3d(calc(var(--mx) * 0.12), calc(var(--my) * 0.08), 0); }
          50%  { transform: translate3d(calc(-50% + 18px), 0, 0) translate3d(calc(var(--mx) * 0.12), calc(var(--my) * 0.08), 0); }
          100% { transform: translate3d(-50%, 0, 0) translate3d(calc(var(--mx) * 0.12), calc(var(--my) * 0.08), 0); }
        }

        /* =========================
           CTA MICRO-INTERACTIONS
           Hover: soft lift + glow
           Active: micro-press
           ========================= */
        .hero__ctaBtn {
          transition:
            transform 180ms cubic-bezier(0.2, 0.8, 0.2, 1),
            box-shadow 220ms cubic-bezier(0.2, 0.8, 0.2, 1),
            filter 220ms cubic-bezier(0.2, 0.8, 0.2, 1),
            border-color 220ms cubic-bezier(0.2, 0.8, 0.2, 1),
            background 220ms cubic-bezier(0.2, 0.8, 0.2, 1);
          transform: translate3d(0, 0, 0);
        }

        .hero__ctaBtn:hover {
          transform: translate3d(0, -2px, 0);
          filter: brightness(1.03);
        }

        .hero__ctaPrimary:hover {
          box-shadow:
            0 10px 30px rgba(135, 85, 255, 0.22),
            0 2px 10px rgba(255, 255, 255, 0.06);
          border-color: rgba(255,255,255,0.22);
        }

        .hero__ctaSecondary:hover {
          box-shadow:
            0 10px 30px rgba(255, 255, 255, 0.08),
            0 2px 10px rgba(255, 255, 255, 0.05);
          border-color: rgba(255,255,255,0.28);
        }

        .hero__ctaBtn:active {
          transform: translate3d(0, 0px, 0) scale(0.985);
        }

        /* =========================
           Observability box ambience
           Subtle glow pulse (very slow)
           ========================= */
        .hero__box { position: relative; }

        .hero--ready .hero__box::after {
          content: "";
          position: absolute;
          inset: -1px;
          border-radius: 18px;
          pointer-events: none;
          background: radial-gradient(
            closest-side at 50% 40%,
            rgba(175, 120, 255, 0.18),
            rgba(0,0,0,0) 72%
          );
          opacity: 0.0;
          animation: boxGlow 16s ease-in-out infinite;
        }

        @keyframes boxGlow {
          0%   { opacity: 0.02; }
          50%  { opacity: 0.10; }
          100% { opacity: 0.02; }
        }

        /* =========================
           Reduced Motion
           ========================= */
        @media (prefers-reduced-motion: reduce) {
          .hero { --mx: 0px; --my: 0px; }
          .hero__grid,
          .hero__stars,
          .hero__title,
          .hero__subtitle,
          .hero__ctas,
          .hero__fineprint,
          .hero__box,
          .hero__box::after {
            animation: none !important;
            transition: none !important;
            transform: none !important;
            opacity: 1 !important;
            filter: none !important;
          }
        }
      `}</style>

      {/* GRID BOWL */}
      <div
        className="hero__grid absolute left-1/2 top-[80px] pointer-events-none"
        style={{
          width: "90vw",
          maxWidth: "1400px",
          height: "40vw", // Scales height with width
          maxHeight: "580px",
          backgroundImage: `url(${grid})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center 1vw",
          maskImage:
            "radial-gradient(ellipse 70% 50% at 50% 40%, black 0%, black 70%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 50% at 50% 40%, black 0%, black 70%, transparent 100%)",
        }}
      />

      {/* TEXT BLOCK */}
      <div
        className="
          absolute left-1/2 
          -translate-x-1/2 text-center
        "
        style={{
          top: "-50px",
          width: "100%",
          maxWidth: "820px",
          padding: "0 1rem",
          boxSizing: "border-box",
        }}
      >
        {/* MAIN TITLE */}
        <h1
          className="hero__title"
          style={{
            fontSize: "clamp(36px, 6vw, 60px)",
            fontWeight: 700,
            lineHeight: "1.15",
            marginBottom: "1.5rem", // 30px
            color: "#ffffff",
            letterSpacing: "-0.02em",
            fontFamily: "Inter, sans-serif",
            marginTop: "0px",
          }}
        >
          <br /> <br /> The Datadog of <br /> Corporate Finance
        </h1>

        {/* SUBTEXT */}
        <p
          className="hero__subtitle"
          style={{
            fontSize: "clamp(16px, 2.2vw, 19px)",
            lineHeight: "1.6",
            color: "rgba(255,255,255,0.90)",
            marginBottom: "2rem",
            maxWidth: "720px",
            margin: "0 auto",
            fontWeight: 400,
          }}
        >
          Real-time observability across GL, CRM, ERP, and data warehouses — turning raw
          data into board-ready war rooms, so material risk never slips through.
        </p>

        {/* CTA BUTTONS */}
        <div
          className="hero__ctas mt-24 flex justify-center"
          style={{
            marginTop: "2rem",
            gap: "1rem",
            padding: "0 1rem",
            boxSizing: "border-box",
            width: "100%",
          }}
        >
          <button
            className="hero__ctaBtn hero__ctaPrimary"
            style={{
              padding: "14px 25px",
              borderRadius: "9999px",
              background: "linear-gradient(90deg, rgba(135,85,255,1), rgba(175,120,255,1))",
              border: "1px solid rgba(255,255,255,0.16)",
              color: "#fff",
              fontWeight: 600,
              fontSize: "14px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              flex: "1 1 0%",
              maxWidth: "200px",
            }}
          >
            Get Started
          </button>

          <button
            className="hero__ctaBtn hero__ctaSecondary"
            style={{
              padding: "14px 25px",
              borderRadius: "9999px",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.22)",
              color: "#fff",
              fontWeight: 600,
              fontSize: "14px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              backdropFilter: "blur(12px)",
              flex: "1 1 0%",
              maxWidth: "200px",
            }}
          >
            Book Demo
          </button>
        </div>

        {/* SMALL TEXT */}
        <p
          className="hero__fineprint"
          style={{
            marginTop: "2.5rem",
            fontSize: "clamp(13px, 1.8vw, 15px)",
            color: "rgba(255,255,255,0.75)",
          }}
        >
          Replace 120 hours per quarter of manual investigation with 8-second war room
          generation.
        </p>

        {/* OBSERVABILITY BOX */}
        <div
          className="hero__box"
          style={{
            marginTop: "3rem",
            padding: "20px 5vw",
            paddingLeft: "min(40px, 5vw)",
            paddingRight: "min(40px, 5vw)",
            paddingTop: "20px",
            paddingBottom: "20px",
            borderRadius: "18px",
            background: "rgba(90,70,150,0.22)",
            border: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(16px)",
            maxWidth: "820px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <h3
            style={{
              fontSize: "clamp(16px, 2.5vw, 18px)",
              fontWeight: 600,
              marginBottom: "0.75rem",
              color: "#ffffff",
            }}
          >
            Observability is now a business catalyst, not just a backend function.
          </h3>

          <p
            style={{
              fontSize: "clamp(13px, 2vw, 15px)",
              lineHeight: "1.6",
              color: "rgba(255,255,255,0.85)",
            }}
          >
            At Zavvis, we’re pioneering Financial Data Observability — the new category that
            directly correlates with performance, financial operations, and board-level
            decisions in corporate finance.
          </p>
        </div>
      </div>

      {/* STARS FIELD */}
      <div
        className="hero__stars"
        style={{
          position: "absolute",
          bottom: "0px",
          left: "50%",
          width: "90vw",
          maxWidth: "1400px",
          height: "30vh",
          maxHeight: "380px",
          backgroundImage: `url(${stars})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
          opacity: 0.55,
          pointerEvents: "none",
        }}
      />
    </section>
  );
};

export default Hero;
