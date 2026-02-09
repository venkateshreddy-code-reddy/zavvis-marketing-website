"use client";

import React, { useEffect, useMemo, useRef, useState, type JSX } from "react";
import "../style/PlatformShowcase.css";

// PNG icons (src/assets)
import iconfile from "../assets/file.png";
import iconfiles from "../assets/iconfile.png";
import sta from "../assets/sta.png";
import warning from "../assets/warning.png";
import barchart from "../assets/barchat.png";
import databases from "../assets/datas.svg";
import database from "../assets/database.png";
import task from "../assets/task.png";
import menu from "../assets/menu.png";
import settings from "../assets/settings.png";
import sendicon from "../assets/sendicon.png";

type CodeLineType = "comment" | "import" | "code" | "export" | "empty";

type CodeLine = {
  id: number;
  content: string;
  type: CodeLineType;
  milestone?: number;
};

type Signal = {
  id: number;
  title: string;
  desc: string | null;
  details: string | string[];
  type: "error" | "warn" | "info";
};

// Token types for syntax highlighting
type TokenType = "keyword" | "string" | "func" | "punc" | "comment" | "emph" | "plain";

type Token = {
  type: TokenType;
  value: string;
};

export default function PlatformShowcase() {
  const codeLines: CodeLine[] = useMemo(
    () => [
      { id: 1, content: "// CHAT", type: "comment" },
      { id: 2, content: "// Financial Control Center", type: "comment" },
      { id: 3, content: "", type: "empty" },
      {
        id: 4,
        content: "import { financial_observability_scan } from 'zavvis/engine';",
        type: "import",
      },
      { id: 5, content: "{", type: "code" },
      {
        id: 6,
        content: "  all connected systems have been analyzed for material changes and control deviations;",
        type: "code",
      },
      { id: 7, content: "}", type: "code" },
      { id: 8, content: "", type: "empty" },
      {
        id: 9,
        content:
          "detect agent has analyzed your financial systems and identified material signals across revenue,",
        type: "code",
      },
      { id: 10, content: "expenses, and controls. {", type: "code" },
      {
        id: 11,
        content: "  runnerService: priority signals are summarized on the right => {",
        type: "code",
        milestone: 0,
      },
      {
        id: 12,
        content:
          "    explain agent is ready to drill into root causes at the transaction level ({",
        type: "code",
        milestone: 1,
      },
      { id: 13, content: "      });", type: "code" },
      { id: 14, content: "    }", type: "code" },
      { id: 15, content: "  };", type: "code" },
      { id: 16, content: "};", type: "code" },
      { id: 17, content: "", type: "empty" },
      {
        id: 18,
        content:
          "export default: present agent can generate updated live war room reflecting the latest financial",
        type: "export",
        milestone: 2,
      },
      { id: 19, content: "state;", type: "export" },
    ],
    []
  );

  const signals: Signal[] = useMemo(
    () => [
      {
        id: 1,
        title: "Revenue Integrity Issue — $48,900 Missing",
        desc: "Detected a mismatch between Salesforce closed-won deals and revenue posted in QuickBooks.",
        details:
          "This inconsistency suggests a break in your revenue-recognition workflow and should be reviewed.",
        type: "error",
      },
      {
        id: 2,
        title: "November 2025 Financial Irregularities",
        desc: null,
        details: [
          "• Sales Revenue: $6.8 M (75% below average of ~$8.3 M)",
          "• Supplies: $140,000 (300% above normal $35,000)",
          "• 6 deals marked closed-won not reflected in GL",
          "• 2 deposits unlinked to customer records",
          "",
          "This significant deviation suggests potential data entry errors or missing revenue entries, thresholds or guardrails that fired.",
        ],
        type: "error",
      },
      {
        id: 3,
        title: "Unreversed Accrual — $12,400",
        desc: "Found an accrual from 2025-11-01 that did not generate its expected reversal entry. Traced to journal entry 114412.",
        details: "This integrity risk should be corrected to ensure accurate financial reporting.",
        type: "error",
      },
    ],
    []
  );

  const [isRunning, setIsRunning] = useState(false);
  const [typed, setTyped] = useState<string[]>(() => codeLines.map(() => ""));
  const [done, setDone] = useState<boolean[]>(() => codeLines.map(() => false));
  const [activeLine, setActiveLine] = useState<number>(-1);
  const [shownSignals, setShownSignals] = useState<Signal[]>([]);

  const editorRef = useRef<HTMLDivElement | null>(null);
  const signalsRef = useRef<HTMLDivElement | null>(null);
  const timersRef = useRef<number[]>([]);
  const milestonesSeenRef = useRef<Set<number>>(new Set());

  const clearTimers = () => {
    timersRef.current.forEach((t) => window.clearTimeout(t));
    timersRef.current = [];
  };

  const tokenize = (text: string, type: CodeLineType): Token[] => {
    if (type === "empty") return [{ type: "plain", value: " " }];
    if (type === "comment" || text.trim().startsWith("//")) {
      return [{ type: "comment", value: text }];
    }

    const tokens: Token[] = [];
    let remaining = text;

    const patterns: { pattern: RegExp; type: TokenType }[] = [
      { pattern: /'[^']*'/, type: "string" },
      { pattern: /\ball connected systems\b/, type: "func" },
      { pattern: /\btransaction level\b/, type: "func" },
      { pattern: /\blive war room\b/, type: "emph" },
      { pattern: /\b(import|from|export|default|const|return)\b/, type: "keyword" },
      {
        pattern: /\b(financial_observability_scan|runnerService|detect|explain|present)\b/,
        type: "func",
      },
      { pattern: /\b(expenses|controls|state|priority)\b/, type: "func" },
      {
        pattern:
          /\b(analyzed|identified|material|signals|drill|root|causes|generate|updated|latest|financial|summarized)\b/,
        type: "emph",
      },
      { pattern: /=>/, type: "punc" },
      { pattern: /[{}()\[\];,:]/, type: "punc" },
    ];

    while (remaining.length > 0) {
      let matched = false;

      for (const { pattern, type: tokenType } of patterns) {
        const match = remaining.match(pattern);
        if (match && match.index === 0) {
          tokens.push({ type: tokenType, value: match[0] });
          remaining = remaining.slice(match[0].length);
          matched = true;
          break;
        }
      }

      if (!matched) {
        tokens.push({ type: "plain", value: remaining[0] });
        remaining = remaining.slice(1);
      }
    }

    const merged: Token[] = [];
    for (const token of tokens) {
      if (merged.length > 0 && merged[merged.length - 1].type === "plain" && token.type === "plain") {
        merged[merged.length - 1].value += token.value;
      } else {
        merged.push({ ...token });
      }
    }

    return merged;
  };

  const renderTokens = (tokens: Token[]): JSX.Element[] => {
    return tokens.map((token, idx) => {
      const className = `syntax-${token.type}`;
      return (
        <span key={idx} className={className}>
          {token.value}
        </span>
      );
    });
  };

  const showSignal = (milestoneIndex: number) => {
    if (milestonesSeenRef.current.has(milestoneIndex)) return;
    milestonesSeenRef.current.add(milestoneIndex);

    const s = signals[milestoneIndex];
    if (!s) return;

    setShownSignals((prev) => [...prev, s]);

    const t = window.setTimeout(() => {
      if (signalsRef.current) signalsRef.current.scrollTop = signalsRef.current.scrollHeight;
    }, 30);
    timersRef.current.push(t);
  };

  const startSimulation = () => {
    if (isRunning) return;

    clearTimers();
    milestonesSeenRef.current = new Set();

    setIsRunning(true);
    setShownSignals([]);
    setTyped(codeLines.map(() => ""));
    setDone(codeLines.map(() => false));
    setActiveLine(-1);

    const t = window.setTimeout(() => typeLine(0), 550);
    timersRef.current.push(t);
  };

  const finishSimulation = () => {
    setIsRunning(false);
    setActiveLine(codeLines.length - 1);
  };

  // ✅ Scroll ONLY inside the editor (prevents page scroll jitter)
  const scrollEditorToLine = (index: number) => {
    const editor = editorRef.current;
    if (!editor) return;

    const el = document.getElementById(`ds-line-${index}`);
    if (!el) return;

    const editorRect = editor.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();

    const currentTop = editor.scrollTop;
    const delta = (elRect.top - editorRect.top) - editor.clientHeight / 2 + el.clientHeight / 2;
    const targetTop = Math.max(0, currentTop + delta);

    editor.scrollTo({ top: targetTop, behavior: "smooth" });
  };

  const typeLine = (index: number) => {
    if (index >= codeLines.length) {
      finishSimulation();
      return;
    }

    setActiveLine(index);

    const text = codeLines[index].content;
    const speed = 30;

    const scrollToLine = window.setTimeout(() => scrollEditorToLine(index), 20);
    timersRef.current.push(scrollToLine);

    let i = 0;

    const tick = () => {
      i += 1;

      setTyped((prev) => {
        const next = [...prev];
        next[index] = text.slice(0, i);
        return next;
      });

      if (i < text.length) {
        const t = window.setTimeout(tick, speed);
        timersRef.current.push(t);
        return;
      }

      setDone((prev) => {
        const next = [...prev];
        next[index] = true;
        return next;
      });

      const ms = codeLines[index].milestone;
      if (ms !== undefined) showSignal(ms);

      const nextT = window.setTimeout(() => typeLine(index + 1), 110);
      timersRef.current.push(nextT);
    };

    const first = window.setTimeout(tick, text.length === 0 ? 40 : speed);
    timersRef.current.push(first);
  };

  useEffect(() => {
    const t = window.setTimeout(() => startSimulation(), 800);
    return () => {
      window.clearTimeout(t);
      clearTimers();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="ds-page">
      <div className="app-window">
        {/* TOP BAR (mac dots) */}
        <div className="ds-topbar" aria-hidden="true">
          <div className="ds-window-controls">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
          </div>
        </div>

        <div className="ds-shell">
          {/* LEFT SIDEBAR */}
          <aside className="ds-sidebar">
            <div className="ds-sidebar-inner">
              <nav className="ds-nav">
                <button className="sidebar-icon active sidebar-icon-files" type="button" title="Files" aria-label="Files">
                  <img className="ds-ic" src={iconfile} alt="Files" />
                </button>

                <button className="sidebar-icon" type="button" title="Starred" aria-label="Starred">
                  <img className="ds-ic" src={sta} alt="Starred" />
                </button>
                <button className="sidebar-icon" type="button" title="Alerts" aria-label="Alerts">
                  <img className="ds-ic" src={warning} alt="Alerts" />
                </button>
                <button className="sidebar-icon" type="button" title="Analytics" aria-label="Analytics">
                  <img className="ds-ic" src={barchart} alt="Analytics" />
                </button>
                <button className="sidebar-icon" type="button" title="Database" aria-label="Database">
                  <img className="ds-ic" src={database} alt="Database" />
                </button>
                <button className="sidebar-icon" type="button" title="Tasks" aria-label="Tasks">
                  <img className="ds-ic" src={task} alt="Tasks" />
                </button>
                <button className="sidebar-icon" type="button" title="Menu" aria-label="Menu">
                  <img className="ds-ic" src={menu} alt="Menu" />
                </button>
              </nav>

              <div className="ds-sidebar-bottom">
                <button className="sidebar-icon" type="button" title="Settings" aria-label="Settings">
                  <img className="ds-ic" src={settings} alt="Settings" />
                </button>
              </div>
            </div>
          </aside>

          <main className="ds-main">
            {/* HEADER: tabs + Detect Agent Output */}
            <header className="ds-header">
              <div className="ds-header-grid">
                <div className="ds-header-left">
                  <div className="ds-tabs">
                    <button className="ds-tab tab-active" type="button">
                      <span className="ds-badge">Ds</span>
                      <span>engine-main.ds</span>
                      <span className="ds-tab-close" aria-hidden="true">
                        ×
                      </span>
                    </button>

                    <button className="ds-tab tab-inactive" type="button">
                      <img className="ds-ic ds-tab-ic" src={iconfiles} alt="" />
                      <span>revenue-related.sg</span>
                      <span className="ds-tab-close ghost" aria-hidden="true">
                        ×
                      </span>
                    </button>

                    <button className="ds-tab tab-inactive" type="button">
                      <img className="ds-ic ds-tab-ic" src={iconfiles} alt="" />
                      <span>control-related.sg</span>
                      <span className="ds-tab-close ghost" aria-hidden="true">
                        ×
                      </span>
                    </button>
                  </div>
                </div>

                <div className="ds-header-right">
                  <div className="ds-header-right-title">DETECT AGENT OUTPUT</div>
                  <div className="ds-header-right-underline" />
                  <div className="ds-header-helper">
                    The following signals were produced by the latest detection run:
                  </div>
                </div>
              </div>
            </header>

            <div className="ds-content">
              <section className="ds-left">
                {/* CODE EDITOR */}
                <div className="ds-editor" ref={editorRef}>
                  {/* ✅ SIZER LAYER: reserves final height from the start (prevents reflow / scroll jitter) */}
                  <div className="ds-code ds-code-sizer" aria-hidden="true">
                    {codeLines.map((line, idx) => {
                      const tokens = tokenize(line.content, line.type);
                      return (
                        <div key={`sizer-${line.id}`} className="ds-line ds-line-sizer">
                          <span className="ds-lnum">{line.id}</span>
                          <span className="ds-ltxt">
                            {line.type === "empty" ? (
                              <span className="ds-empty">&nbsp;</span>
                            ) : (
                              <span className="line-highlight">{renderTokens(tokens)}</span>
                            )}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* ✅ LIVE TYPING LAYER: overlays sizer (no layout changes during typing) */}
                  <div className="ds-code ds-code-layer">
                    {codeLines.map((line, idx) => {
                      const isActive = idx === activeLine;
                      const content = done[idx] ? line.content : typed[idx];
                      const tokens = tokenize(content, line.type);

                      return (
                        <div
                          key={line.id}
                          id={`ds-line-${idx}`}
                          className={`ds-line ${isActive ? "active" : ""} ${typed[idx] || done[idx] ? "visible" : ""}`}
                        >
                          <span className="ds-lnum">{line.id}</span>
                          <span className="ds-ltxt">
                            {line.type === "empty" ? (
                              <span className="ds-empty">&nbsp;</span>
                            ) : (
                              <>
                                <span className={idx === activeLine ? "line-highlight" : ""}>
                                  {renderTokens(tokens)}
                                </span>
                                {!done[idx] && <span className="cursor-blink" />}
                              </>
                            )}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* PROMPT SUGGESTIONS */}
                <div className="ds-prompts">
                  <div className="ds-prompt-grid">
                    <button className="prompt-card" type="button" onClick={() => !isRunning && startSimulation()}>
                      Trace the root cause of any signal affecting revenue or expenses.
                    </button>
                    <button className="prompt-card" type="button" onClick={() => !isRunning && startSimulation()}>
                      Where are the biggest financial risks and control gaps across my data?
                    </button>
                    <button className="prompt-card" type="button" onClick={() => !isRunning && startSimulation()}>
                      Summarize system health and flag any thresholds or guardrails that fired.
                    </button>
                    <button className="prompt-card" type="button" onClick={() => !isRunning && startSimulation()}>
                      Show inconsistencies between my financial data and the canonical model.
                    </button>
                  </div>

                  {/* INPUT FIELD */}
                  <div className="ds-inputwrap">
                    <input className="ds-input" placeholder="Ask Conversation Agent" />
                    <button className="ds-send" type="button" aria-label="Send">
                      <img className="ds-ic ds-ic-send" src={sendicon} alt="Send" />
                    </button>
                  </div>
                </div>

                {/* REPORTS SECTION */}
                <div className="ds-reports">
                  <div className="ds-reports-head">
                    <div className="ds-reports-title">
                      <img className="ds-ic" src={iconfile} alt="" />
                      <span>Reports</span>
                    </div>
                    <button className="btn-gradient" type="button">
                      <span className="btn-plus" aria-hidden="true">
                        +
                      </span>
                      <span>Add Report</span>
                    </button>
                  </div>

                  <div className="ds-report-list">
                    {[
                      "Q4_2025_revenue-behavior-shift_warroom_2026-01-22.html",
                      "Oct_2025_missed-invoicing_control-break_warroom_2026-01-22.html",
                      "Nov_2025_expense-misclassification_opex-to-cogs_warroom_2026-01-22.html",
                    ].map((f) => (
                      <div key={f} className="ds-report-item" role="button" tabIndex={0}>
                        <span className="chev" aria-hidden="true">
                          ›
                        </span>
                        <span className="ds-report-name">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* RIGHT PANEL */}
              <aside className="ds-right">
                <div className="ds-signals" ref={signalsRef}>
                  {shownSignals.map((s) => (
                    <div key={s.id} className={`signal-section ${s.type} fade-in-up`}>
                      <div className="sig-top">
                        <span className="sig-x" aria-hidden="true">
                          ×
                        </span>
                        <h3 className="sig-title">{s.title}</h3>
                      </div>

                      {s.desc ? <p className="sig-desc">{s.desc}</p> : null}

                      <div className="sig-details">
                        {Array.isArray(s.details) ? (
                          s.details.map((d, i) => (
                            <p key={`${s.id}-${i}`} className="sig-line">
                              {d}
                            </p>
                          ))
                        ) : (
                          <p className="sig-line">{s.details}</p>
                        )}
                      </div>

                      <button className="sig-rca" type="button">
                        Show RCA
                      </button>
                    </div>
                  ))}
                </div>

                {/* DATA SOURCES */}
                <div className="ds-sources">
                  <div className="ds-sources-head">
                    <div className="ds-sources-title">
                      <img className="ds-ic" src={databases} alt="" />
                      <span>Data Sources</span>
                    </div>
                    <button className="btn-gradient small" type="button">
                      Add Data
                    </button>
                  </div>

                  <div className="ds-source-list">
                    <div className="ds-source">
                      <div className="ds-source-ic gray">T</div>
                      <span>NetSuite</span>
                    </div>

                    <div className="ds-source">
                      <div className="ds-source-ic sf">
                        <span className="sf-cloud" aria-hidden="true">
                          ☁
                        </span>
                      </div>
                      <span>SalesForce</span>
                    </div>

                    <div className="ds-source">
                      <div className="ds-source-ic stripe">S</div>
                      <span>Stripe</span>
                    </div>

                    <div className="ds-source">
                      <div className="ds-source-ic qb">qb</div>
                      <span>QuickBooks</span>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
