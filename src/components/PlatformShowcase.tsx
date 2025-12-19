// src/components/PlatformShowcase.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import "../style/PlatformShowcase.css";

import logo from "../assets/logo.png";
import leftGlow from "../assets/left.png";
import rightGlow from "../assets/right.png";

import qbLogo from "../assets/quickbooks.png";
import salesforceLogo from "../assets/salesforce-logo.png";
import plaidLogo from "../assets/plaid-logo.webp";

import SparklesIcon from "../icons/SparklesIcon";
import AlertTriangleIcon from "../icons/AlertTriangleIcon";
import HomeIcon from "../icons/HomeIcon";
import DatabaseIcon from "../icons/DatabaseIcon";
import ClipboardIcon from "../icons/ClipboardIcon";
import GridIcon from "../icons/GridIcon";
import SettingsIcon from "../icons/SettingsIcon";

type Star = {
  id: number;
  left: string;
  top: string;
  delay: string;
  size: string;
  opacity: number;
};

const PlatformShowcase: React.FC = () => {
  const [activeNav, setActiveNav] = useState<string>("sparkles");
  const shellRef = useRef<HTMLDivElement | null>(null);

  const reduceMotion =
    typeof window !== "undefined" &&
    !!window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const stars: Star[] = useMemo(() => {
    const count = 30;
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${(i * 37) % 100}%`,
      top: `${(i * 53) % 100}%`,
      delay: `${(i % 10) * 0.28}s`,
      size: `${1 + (i % 3)}px`,
      opacity: 0.18 + ((i % 5) * 0.06),
    }));
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    const els = document.querySelectorAll<HTMLElement>("[data-ps-reveal]");
    els.forEach((el, idx) => {
      el.style.setProperty("--reveal-delay", `${idx * 90}ms`);
      el.classList.add("ps-reveal");
    });
  }, [reduceMotion]);

  // Mouse parallax tilt (very subtle, premium)
  useEffect(() => {
    if (reduceMotion) return;
    const shell = shellRef.current;
    if (!shell) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = shell.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5; // -0.5..0.5
        const py = (e.clientY - r.top) / r.height - 0.5;

        // super subtle tilts
        const rx = (-py * 6).toFixed(2);
        const ry = (px * 8).toFixed(2);

        shell.style.setProperty("--tiltX", `${rx}deg`);
        shell.style.setProperty("--tiltY", `${ry}deg`);

        // glow drift for extra “alive”
        shell.style.setProperty("--glowShiftX", `${(px * 30).toFixed(1)}px`);
        shell.style.setProperty("--glowShiftY", `${(py * 20).toFixed(1)}px`);
      });
    };

    const onLeave = () => {
      shell.style.setProperty("--tiltX", `0deg`);
      shell.style.setProperty("--tiltY", `0deg`);
      shell.style.setProperty("--glowShiftX", `0px`);
      shell.style.setProperty("--glowShiftY", `0px`);
    };

    shell.addEventListener("mousemove", onMove);
    shell.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      shell.removeEventListener("mousemove", onMove);
      shell.removeEventListener("mouseleave", onLeave);
    };
  }, [reduceMotion]);

  return (
    <div className="platform-showcase">
      <div className="ps-shell" ref={shellRef}>
        <div className="ps-ambient" aria-hidden="true" />
        <div className="ps-starfield" aria-hidden="true">
          {stars.map((s) => (
            <span
              key={s.id}
              className="ps-twinkle"
              style={{
                left: s.left,
                top: s.top,
                width: s.size,
                height: s.size,
                opacity: s.opacity,
                animationDelay: s.delay,
              }}
            />
          ))}
        </div>

        {/* EDGE GLOWS only on this component */}
        <img src={leftGlow} alt="" className="ps-glow ps-glow--left" />
        <img src={rightGlow} alt="" className="ps-glow ps-glow--right" />

        <div className="ps-dashboardWrap">
          <div className="ps-dashboard" data-ps-reveal>
            {/* SIDEBAR */}
            <aside className="ps-sidebar">
              <div className="ps-sidebarInner">
                <div className="ps-sidebarTop">
                  <button className="ps-icon ps-icon--menu" aria-label="Menu" type="button">
                    ☰
                  </button>

                  <div className="ps-sidebarIcons">
                    <button
                      className={`ps-icon ${activeNav === "sparkles" ? "ps-icon--active" : ""}`}
                      onClick={() => setActiveNav("sparkles")}
                      aria-label="Sparkles"
                      type="button"
                    >
                      <SparklesIcon />
                    </button>

                    <button
                      className={`ps-icon ${activeNav === "alerts" ? "ps-icon--active" : ""}`}
                      onClick={() => setActiveNav("alerts")}
                      aria-label="Alerts"
                      type="button"
                    >
                      <AlertTriangleIcon />
                    </button>

                    <button
                      className={`ps-icon ${activeNav === "home" ? "ps-icon--active" : ""}`}
                      onClick={() => setActiveNav("home")}
                      aria-label="Home"
                      type="button"
                    >
                      <HomeIcon />
                    </button>

                    <button
                      className={`ps-icon ${activeNav === "db" ? "ps-icon--active" : ""}`}
                      onClick={() => setActiveNav("db")}
                      aria-label="Database"
                      type="button"
                    >
                      <DatabaseIcon />
                    </button>

                    <button
                      className={`ps-icon ${activeNav === "reports" ? "ps-icon--active" : ""}`}
                      onClick={() => setActiveNav("reports")}
                      aria-label="Reports"
                      type="button"
                    >
                      <ClipboardIcon />
                    </button>

                    <button
                      className={`ps-icon ${activeNav === "grid" ? "ps-icon--active" : ""}`}
                      onClick={() => setActiveNav("grid")}
                      aria-label="Grid"
                      type="button"
                    >
                      <GridIcon />
                    </button>

                    <button
                      className={`ps-icon ${activeNav === "settings" ? "ps-icon--active" : ""}`}
                      onClick={() => setActiveNav("settings")}
                      aria-label="Settings"
                      type="button"
                    >
                      <SettingsIcon />
                    </button>
                  </div>
                </div>

                <div className="ps-sidebarBottom">
                  <button className="ps-logout" aria-label="Logout" type="button">
                    ⮞
                  </button>
                </div>
              </div>
            </aside>

            {/* MAIN */}
            <div className="ps-mainWrap">
              <div className="ps-main">
                <header className="ps-header" data-ps-reveal>
                  <div className="ps-headerLeft">
                    <img src={logo} alt="Zavvis AI" className="ps-logo" />
                  </div>

                  <div className="ps-headerCenter">Good Morning, John!</div>

                  <div className="ps-headerRight">
                    <div className="ps-time">🗓️ 11:40 AM, Nov 25</div>
                    <button className="ps-hIcon" aria-label="Notifications" type="button">
                      🔔
                    </button>
                    <button className="ps-hIcon" aria-label="Messages" type="button">
                      💬
                    </button>

                    <div className="ps-search">
                      <input className="ps-searchInput" placeholder="Search here" type="search" />
                      <span className="ps-searchIcon">🔍</span>
                    </div>
                  </div>
                </header>

                <div className="ps-grid">
                  {/* LEFT */}
                  <section className="ps-left">
                    <div className="ps-card ps-welcome" data-ps-reveal>
                      <div className="ps-badgeRow">
                        <div className="ps-badge ps-badge--pulse">
                          <SparklesIcon size={20} />
                        </div>
                      </div>

                      <h1 className="ps-title">
                        Hi! I'm Zavvis AI. What would you like me to monitor, check, or explain
                        today?
                      </h1>

                      <div className="ps-prompts">
                        <button className="ps-prompt" type="button">
                          Trace the root cause of anomalies affecting revenue or expenses.
                        </button>
                        <button className="ps-prompt" type="button">
                          Where are the biggest risks across my financial data?
                        </button>
                        <button className="ps-prompt" type="button">
                          Summarize today’s financial health and fired guardrails.
                        </button>
                        <button className="ps-prompt" type="button">
                          Show inconsistencies between QuickBooks and canonical data.
                        </button>
                      </div>

                      <div className="ps-inputRow">
                        <input className="ps-input" placeholder="What do you want to know..." type="text" />
                        <button className="ps-cta ps-cta--shine" type="button">
                          SHOW
                        </button>
                      </div>
                    </div>

                    <div className="ps-card ps-panel" data-ps-reveal>
                      <h3 className="ps-cardTitle">Reports</h3>
                      <button className="ps-chipBtn" type="button">
                        Add Report
                      </button>
                      <div className="ps-placeholder">Generate custom reports</div>
                    </div>
                  </section>

                  {/* RIGHT */}
                  <section className="ps-right">
                    <div className="ps-card ps-anomaly" data-ps-reveal>
                      <div className="ps-anomHead">
                        <div className="ps-anomPill">🔍</div>
                        <h3 className="ps-anomTitle">ANOMALY DETECTION COMPLETE</h3>
                      </div>

                      <p className="ps-anomIntro">
                        I analyzed your financial data and identified issues that require attention:
                      </p>

                      <div className="ps-anomItem ps-anomItem--pink ps-anomItem--float">
                        <h4 className="ps-anomItemTitle">Revenue Integrity Issue — $48,900 Missing</h4>
                        <p className="ps-anomDesc">Salesforce closed-won deals not reflected in QuickBooks.</p>
                        <p className="ps-anomSub">Indicates a break in revenue recognition workflow.</p>
                      </div>

                      <div className="ps-anomItem ps-anomItem--orange ps-anomItem--float">
                        <h4 className="ps-anomItemTitle">November 2025 Financial Irregularities</h4>
                        <ul className="ps-anomList">
                          <li>Sales down 173% vs average</li>
                          <li>Supplies up 300%</li>
                          <li>6 deals missing in GL</li>
                          <li>2 deposits unlinked</li>
                        </ul>
                        <p className="ps-anomSub">
                          Suggests potential data entry errors or missing revenue entries.
                        </p>
                      </div>

                      <div className="ps-anomItem ps-anomItem--blue ps-anomItem--float">
                        <h4 className="ps-anomItemTitle">Unreversed Accrual — $12,400</h4>
                        <p className="ps-anomDesc">Accrual from Nov 2023 missing reversal entry.</p>
                        <p className="ps-anomSub">Should be corrected for accurate reporting.</p>
                      </div>
                    </div>

                    <div className="ps-card ps-panel" data-ps-reveal>
                      <h3 className="ps-cardTitle">Data Sources</h3>
                      <button className="ps-chipBtn" type="button">
                        Add data
                      </button>

                      <ul className="ps-sources">
                        <li className="ps-sourceRow">
                          <img src={qbLogo} alt="QuickBooks" className="ps-sourceLogo" />
                          QuickBooks
                        </li>
                        <li className="ps-sourceRow">
                          <img src={salesforceLogo} alt="Salesforce" className="ps-sourceLogo" />
                          Salesforce
                        </li>
                        <li className="ps-sourceRow">
                          <img src={plaidLogo} alt="Plaid" className="ps-sourceLogo" />
                          Plaid
                        </li>
                      </ul>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PlatformShowcase;
