import { useEffect, useRef, useState } from "react";
import "../style/PlatformShowcase.css";

import leftGlow from "../assets/left.png";
import rightGlow from "../assets/right.png";
import stars from "../assets/stars.png";

import qbLogo from "../assets/quickbooks.png";
import salesforceLogo from "../assets/salesforce-logo.png";
import plaidLogo from "../assets/plaid-logo.webp";

import MenuIcon from "../icons/MenuIcon";
import SparklesIcon from "../icons/SparklesIcon";
import AlertTriangleIcon from "../icons/AlertTriangleIcon";
import HomeIcon from "../icons/HomeIcon";
import DatabaseIcon from "../icons/DatabaseIcon";
import ClipboardIcon from "../icons/ClipboardIcon";
import GridIcon from "../icons/GridIcon";
import SettingsIcon from "../icons/SettingsIcon";

const PlatformShowcase: React.FC = () => {
  const [activeNav, setActiveNav] = useState<string>("sparkles");
  const shellRef = useRef<HTMLDivElement | null>(null);

  const reduceMotion =
    typeof window !== "undefined" &&
    !!window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduceMotion) return;
    const shell = shellRef.current;
    if (!shell) return;

    let raf = 0;

    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = shell.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;

        const rx = (-py * 4.5).toFixed(2);
        const ry = (px * 6).toFixed(2);

        shell.style.setProperty("--tiltX", `${rx}deg`);
        shell.style.setProperty("--tiltY", `${ry}deg`);
        shell.style.setProperty("--glowShiftX", `${(px * 26).toFixed(1)}px`);
        shell.style.setProperty("--glowShiftY", `${(py * 18).toFixed(1)}px`);
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
    <section className="platform-showcase">
      <div
        className="ps-shell"
        ref={shellRef}
        style={
          {
            ["--stars-url" as any]: `url(${stars})`,
          } as React.CSSProperties
        }
      >
        <div className="ps-ambient" aria-hidden="true" />

        <div className="ps-starsSide ps-starsSide--left" aria-hidden="true" />
        <div className="ps-starsSide ps-starsSide--right" aria-hidden="true" />

        <img src={leftGlow} alt="" className="ps-glow ps-glow--left" />
        <img src={rightGlow} alt="" className="ps-glow ps-glow--right" />

        <div className="ps-dashboardWrap">
          <div className="ps-dashboard">
            <div className="ps-dashboardInner">
              <aside className="ps-sidebar" aria-label="Sidebar">
                <button className="ps-menuBtn" aria-label="Menu" type="button">
                  <MenuIcon size={16} />
                </button>

                <nav className="ps-nav" aria-label="Primary">
                  <button
                    className={`ps-icon ${
                      activeNav === "sparkles" ? "ps-icon--active" : ""
                    }`}
                    onClick={() => setActiveNav("sparkles")}
                    aria-label="Sparkles"
                    type="button"
                  >
                    <SparklesIcon />
                  </button>

                  <button
                    className={`ps-icon ${
                      activeNav === "alerts" ? "ps-icon--active" : ""
                    }`}
                    onClick={() => setActiveNav("alerts")}
                    aria-label="Alerts"
                    type="button"
                  >
                    <AlertTriangleIcon />
                  </button>

                  <button
                    className={`ps-icon ${
                      activeNav === "home" ? "ps-icon--active" : ""
                    }`}
                    onClick={() => setActiveNav("home")}
                    aria-label="Home"
                    type="button"
                  >
                    <HomeIcon />
                  </button>

                  <button
                    className={`ps-icon ${
                      activeNav === "db" ? "ps-icon--active" : ""
                    }`}
                    onClick={() => setActiveNav("db")}
                    aria-label="Database"
                    type="button"
                  >
                    <DatabaseIcon />
                  </button>

                  <button
                    className={`ps-icon ${
                      activeNav === "reports" ? "ps-icon--active" : ""
                    }`}
                    onClick={() => setActiveNav("reports")}
                    aria-label="Reports"
                    type="button"
                  >
                    <ClipboardIcon />
                  </button>

                  <button
                    className={`ps-icon ${
                      activeNav === "grid" ? "ps-icon--active" : ""
                    }`}
                    onClick={() => setActiveNav("grid")}
                    aria-label="Grid"
                    type="button"
                  >
                    <GridIcon />
                  </button>

                  <button
                    className={`ps-icon ${
                      activeNav === "settings" ? "ps-icon--active" : ""
                    }`}
                    onClick={() => setActiveNav("settings")}
                    aria-label="Settings"
                    type="button"
                  >
                    <SettingsIcon />
                  </button>
                </nav>

                <div className="ps-spacer" />

                <button className="ps-logout" aria-label="Open" type="button">
                  ↗
                </button>
              </aside>

              <div className="ps-main">
                <header className="ps-header">
                  <div className="ps-headerLeft">
                    <span className="ps-brand">
                      <span className="ps-brandText">Z A V V I S</span>
                    </span>
                  </div>

                  <div className="ps-headerCenter">Good Morning, John!</div>

                  <div className="ps-headerRight">
                    <div className="ps-time">
                      <span aria-hidden="true">🗓️</span> 11:40 AM, Nov 25
                    </div>

                    <button
                      className="ps-hIcon"
                      aria-label="Notifications"
                      type="button"
                    >
                      🔔
                    </button>
                    <button
                      className="ps-hIcon"
                      aria-label="Messages"
                      type="button"
                    >
                      💬
                    </button>

                    <div className="ps-search">
                      <input
                        className="ps-searchInput"
                        placeholder="Search here"
                        type="search"
                      />
                      <span className="ps-searchIcon">🔍</span>
                    </div>
                  </div>
                </header>

                <div className="ps-layout">
                  {/* ✅ Welcome panel (matches 2nd image spacing) */}
                  <section className="ps-card ps-welcome">
                    <div className="ps-badgeRow">
                      <div className="ps-badge">
                        <SparklesIcon size={14} />
                      </div>
                    </div>

                    <h1 className="ps-title">
                      Hi! I&apos;m Zavvis AI. What would you like me to monitor,
                      check, or explain today?
                    </h1>

                    <div className="ps-prompts">
                      <button className="ps-prompt" type="button">
                        Trace the root cause of any anomalies affecting revenue
                        or expenses.
                      </button>
                      <button className="ps-prompt" type="button">
                        Where are the biggest risks or inconsistencies across my
                        financial data?
                      </button>
                      <button className="ps-prompt" type="button">
                        Summarize today’s financial system health and flag any
                        thresholds or guardrails that fired.
                      </button>
                      <button className="ps-prompt" type="button">
                        Show me inconsistencies between QuickBooks data and the
                        canonical model.
                      </button>
                    </div>

                    <div className="ps-inputRow">
                      <input
                        className="ps-input"
                        placeholder="What do you want to know..."
                        type="text"
                      />
                      <button className="ps-cta" type="button">
                        SHOW
                      </button>
                    </div>
                  </section>

                  <aside className="ps-card ps-anomaly">
                    <div className="ps-anomTop">
                      <div className="ps-anomHead">
                        <div className="ps-anomPill">🔎</div>
                        <div className="ps-anomTitle">
                          Anomaly Detection Complete
                        </div>
                      </div>

                      <p className="ps-anomIntro">
                        I’ve analyzed your financial data and identified the
                        following anomalies that require attention:
                      </p>
                    </div>

                    <div className="ps-anomItem">
                      <div className="ps-anomItemTitle">
                        1. Revenue Integrity Issue — $48,900 Missing
                      </div>
                      <p className="ps-anomDesc">
                        Detected a mismatch between Salesforce closed-won deals
                        and revenue posted in QuickBooks. This inconsistency
                        suggests a break in your revenue-recognition workflow
                        and should be reviewed.
                      </p>
                    </div>

                    <div className="ps-anomItem">
                      <div className="ps-anomItemTitle">
                        2. November 2025 Financial Irregularities
                      </div>

                      <ul className="ps-anomList">
                        <li>
                          <strong>Sales Revenue:</strong> $6.8M (17.5% below
                          average of ~ $8.3M)
                        </li>
                        <li>
                          <strong>Supplies:</strong> $140,000 (30% above normal
                          $105,000)
                        </li>
                        <li>6 deals marked closed-won not reflected in GL</li>
                        <li>2 deposits unlinked to customer records</li>
                      </ul>

                      <p className="ps-anomDesc ps-anomDesc--afterList">
                        This significant deviation suggests potential data entry
                        errors or missing revenue entries.
                      </p>
                    </div>

                    <div className="ps-anomItem">
                      <div className="ps-anomItemTitle">
                        3. Unreversed Accrual — $12,400
                      </div>
                      <p className="ps-anomDesc">
                        Found an accrual from{" "}
                        <span className="ps-anomMeta">2025-11-01</span> that did
                        not generate its expected reversal entry. Traced to
                        journal entry <span className="ps-anomMeta">#4412</span>.
                      </p>
                      <p className="ps-anomDesc ps-anomDesc--afterList">
                        This integrity risk should be corrected to ensure
                        accurate financial reporting.
                      </p>
                    </div>
                  </aside>

                  <section className="ps-card ps-panel ps-reports">
                    <div className="ps-panelHead">
                      <h3 className="ps-panelTitle">
                        <span aria-hidden="true">🗂️</span> Reports
                      </h3>
                      <button className="ps-chipBtn" type="button">
                        Add Report
                      </button>
                    </div>
                    <div className="ps-placeholder">Generate custom reports</div>
                  </section>

                  <section className="ps-card ps-panel ps-sourcesPanel">
                    <div className="ps-panelHead">
                      <h3 className="ps-panelTitle">
                        <span aria-hidden="true">🗄️</span> Data sources
                      </h3>
                      <button className="ps-chipBtn" type="button">
                        Add data
                      </button>
                    </div>

                    <ul className="ps-sources">
                      <li className="ps-sourceRow">
                        <img
                          src={qbLogo}
                          alt="QuickBooks"
                          className="ps-sourceLogo"
                        />
                        Quick Books
                      </li>
                      <li className="ps-sourceRow">
                        <img
                          src={salesforceLogo}
                          alt="Salesforce"
                          className="ps-sourceLogo"
                        />
                        Salesforce
                      </li>
                      <li className="ps-sourceRow">
                        <img
                          src={plaidLogo}
                          alt="Plaid"
                          className="ps-sourceLogo"
                        />
                        Plaid
                      </li>
                    </ul>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformShowcase;
