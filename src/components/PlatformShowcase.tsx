"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Send, Database, FileText, Plus, ChevronRight, Play, RotateCcw } from "lucide-react";

import "../style/PlatformShowcase.css";

import fileIcon from "../assets/file.png";
import starIcon from "../assets/sta.png";
import warningIcon from "../assets/warning.png";
import graphIcon from "../assets/barchat.png";
import databaseIcon from "../assets/database.png";
import taskIcon from "../assets/task.png";
import menuIcon from "../assets/menu.png";
import settingsIcon from "../assets/settings.png";

/* ✅ ADD THESE TWO */
import leftGlow from "../assets/left.png";
import rightGlow from "../assets/right.png";

type SimulationState = "idle" | "running" | "complete";
type CodeLineType = "comment" | "import" | "code" | "export" | "empty";

type CodeLine = {
  id: number;
  content: string;
  type: CodeLineType;
  milestone?: number;
};

type DetectionSignal = {
  id: string;
  title: string;
  description?: string;
  details?: string[];
  type: "error" | "warning";
};

type DataSource = {
  name: string;
  icon: string;
  color: string;
};

const SIMULATION_CONFIG = {
  baseDelay: 220,
  variance: 110,
  scrollThreshold: 0.35,
};

const CODE_LINES: CodeLine[] = [
  { id: 1, content: "// CHAT", type: "comment" },
  { id: 2, content: "// Financial Control Center", type: "comment" },
  { id: 3, content: "", type: "empty" },
  { id: 4, content: "import { financial_observability_scan } from 'zavvis/engine';", type: "import" },
  { id: 5, content: "", type: "empty" },

  { id: 6, content: "{", type: "code" },
  {
    id: 7,
    content: "  all connected systems have been analyzed for material changes and control deviations;",
    type: "code",
  },
  { id: 8, content: "}", type: "code" },
  { id: 9, content: "", type: "empty" },

  {
    id: 10,
    content: "detect agent has analyzed your financial systems and identified material signals across revenue,",
    type: "code",
  },
  { id: 11, content: "expenses, and controls. {", type: "code" },
  { id: 12, content: "  runnerService: priority signals are summarized on the right => {", type: "code", milestone: 0 },

  {
    id: 13,
    content: "    explain agent is ready to drill into root causes at the transaction level ({",
    type: "code",
    milestone: 1,
  },
  { id: 14, content: "      });", type: "code" },
  { id: 15, content: "    }", type: "code" },
  { id: 16, content: "  };", type: "code" },
  { id: 17, content: "};", type: "code" },
  { id: 18, content: "", type: "empty" },

  {
    id: 19,
    content: "export default: present agent can generate updated live war room reflecting the latest financial",
    type: "export",
    milestone: 2,
  },
  { id: 20, content: "state;", type: "export" },
];

const DETECTION_SIGNALS: DetectionSignal[] = [
  {
    id: "1",
    title: "Revenue Integrity Issue — $48,900 Missing",
    description: "Mismatch between Salesforce closed-won deals and revenue posted in QuickBooks.",
    details: ["Potential break in revenue-recognition workflow; review deal-to-GL mapping and posting cadence."],
    type: "error",
  },
  {
    id: "2",
    title: "November 2025 Financial Irregularities",
    details: [
      "• Sales Revenue: $6.8M (below normal baseline)",
      "• Supplies: $140,000 (above normal baseline)",
      "• 6 closed-won deals not reflected in GL",
      "• 2 deposits unlinked to customer records",
      "Threshold/guardrail triggers suggest posting gaps or classification errors.",
    ],
    type: "error",
  },
  {
    id: "3",
    title: "Unreversed Accrual — $12,400",
    description: "Accrual from 2025-11-01 did not generate its expected reversal entry. Traced to journal 114412.",
    details: ["Correct to ensure accurate period reporting and avoid overstated liabilities."],
    type: "error",
  },
];

const DATA_SOURCES: DataSource[] = [
  { name: "NetSuite", icon: "T", color: "#4A5568" },
  { name: "SalesForce", icon: "☁", color: "#00A1E0" },
  { name: "Stripe", icon: "S", color: "#635BFF" },
  { name: "QuickBooks", icon: "qb", color: "#2CA01C" },
];

const PROMPT_CARDS = [
  "Trace the root cause of any signal affecting revenue or expenses.",
  "Where are the biggest financial risks and control gaps across my data?",
  "Summarize system health and flag any thresholds or guardrails that fired.",
  "Show inconsistencies between my financial data and the canonical model.",
];

const REPORTS = [
  "Q4_2025_revenue-behavior-shift_warroom_2026-01-22.html",
  "Oct_2025_missed-invoicing_control-break_warroom_2026-01-22.html",
  "Nov_2025_expense-misclassification_opex-to-cogs_warroom_2026-01-22.html",
];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  return reduced;
}

function useDashboardSimulation(codeLines: CodeLine[]) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const [state, setState] = useState<SimulationState>("idle");
  const [currentLineIndex, setCurrentLineIndex] = useState(-1);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [isInView, setIsInView] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);


  const timerRef = useRef<number | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const hasRunRef = useRef(false);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const resetSimulation = useCallback(() => {
    clearTimer();
    setState("idle");
    setCurrentLineIndex(-1);
    setVisibleCards(new Set());
    hasRunRef.current = false;
  }, [clearTimer]);

  const startSimulation = useCallback(() => {
    if (state === "running") return;

    clearTimer();
    setVisibleCards(new Set());
    setCurrentLineIndex(-1);
    setState("running");
    hasRunRef.current = true;

    const step = (idx: number) => {
      if (idx >= codeLines.length) {
        setState("complete");
        return;
      }

      setCurrentLineIndex(idx);

      const line = codeLines[idx];
      if (typeof line.milestone === "number") {
        setVisibleCards((prev) => {
          const next = new Set(prev);
          next.add(line.milestone!);
          return next;
        });
      }

      const base = prefersReducedMotion ? 30 : SIMULATION_CONFIG.baseDelay;
      const variance = prefersReducedMotion ? 0 : SIMULATION_CONFIG.variance;
      const delay = base + Math.random() * variance;

      timerRef.current = window.setTimeout(() => step(idx + 1), delay);
    };

    timerRef.current = window.setTimeout(() => step(0), prefersReducedMotion ? 0 : 220);
  }, [clearTimer, codeLines, prefersReducedMotion, state]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const nowInView = entry.isIntersecting && entry.intersectionRatio >= SIMULATION_CONFIG.scrollThreshold;

        setIsInView(nowInView);

        if (nowInView) {
          if (!hasRunRef.current || state === "complete") startSimulation();
        } else {
          if (state === "running" || state === "complete") hasRunRef.current = false;
        }
      },
      { threshold: [0, SIMULATION_CONFIG.scrollThreshold, 1] }
    );

    observerRef.current.observe(el);
    return () => observerRef.current?.disconnect();
  }, [startSimulation, state]);

  useEffect(() => {
    const onVis = () => {
      if (document.visibilityState === "visible" && isInView) {
        if (state === "complete" || !hasRunRef.current) startSimulation();
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [isInView, startSimulation, state]);

  useEffect(() => () => clearTimer(), [clearTimer]);

  return {
    state,
    currentLineIndex,
    visibleCards,
    startSimulation,
    resetSimulation,
    containerRef,
    isInView,
    prefersReducedMotion,
  };
}

function renderCodeContent(content: string, type: CodeLineType) {
  if (type === "empty") return "";

  if (type === "comment") return <span className="ds-code-comment">{content}</span>;

  if (type === "import") {
    const parts = content.split(/(\bimport\b|\bfrom\b|\{[^}]+\}|'[^']+'|`[^`]+`)/g).filter(Boolean);
    return parts.map((p, i) => {
      if (p === "import" || p === "from") return <span key={i} className="ds-code-keyword">{p}</span>;
      if (p.startsWith("{")) return <span key={i} className="ds-code-variable">{p}</span>;
      if (p.startsWith("'") || p.startsWith("`")) return <span key={i} className="ds-code-string">{p}</span>;
      return <span key={i}>{p}</span>;
    });
  }

  if (type === "export") {
    const parts = content.split(/(\bexport\b|\bdefault\b|\bfunction\b|\breturn\b|'[^']+')/g).filter(Boolean);
    return parts.map((p, i) => {
      if (["export", "default", "function", "return"].includes(p)) return <span key={i} className="ds-code-keyword">{p}</span>;
      if (p.startsWith("'")) return <span key={i} className="ds-code-string">{p}</span>;
      return <span key={i}>{p}</span>;
    });
  }

  const parts = content
    .split(
      /(await|const|ledgerScan|reconcile|anomalyScore|revenueGuardrails|accrualIntegrity|controls|sources|snapshot|recon|flags|accruals|ctrl|score|'[^']+')/g
    )
    .filter(Boolean);

  return parts.map((p, i) => {
    if (p === "await" || p === "const") return <span key={i} className="ds-code-keyword">{p}</span>;
    if (p.startsWith("'")) return <span key={i} className="ds-code-string">{p}</span>;
    if (["ledgerScan", "reconcile", "anomalyScore", "revenueGuardrails", "accrualIntegrity", "controls"].includes(p))
      return <span key={i} className="ds-code-function">{p}</span>;
    if (["sources", "snapshot", "recon", "flags", "accruals", "ctrl", "score"].includes(p))
      return <span key={i} className="ds-code-variable">{p}</span>;
    return <span key={i}>{p}</span>;
  });
}

export default function DashboardSimulation() {
  const [activeTab, setActiveTab] = useState("engine-main.ds");
  const [inputValue, setInputValue] = useState("");
  const codeEditorRef = useRef<HTMLDivElement | null>(null);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { state, currentLineIndex, visibleCards, startSimulation, resetSimulation, containerRef, isInView, prefersReducedMotion } =
    useDashboardSimulation(CODE_LINES);

useEffect(() => {
  if (state !== "running") return;
  if (currentLineIndex < 0) return;

  const editor = codeEditorRef.current;
  const currentEl = lineRefs.current[currentLineIndex];
  if (!editor || !currentEl) return;

  const targetTop =
    currentEl.offsetTop - editor.clientHeight / 2 + currentEl.clientHeight / 2;

  editor.scrollTo({
    top: Math.max(0, targetTop),
    behavior: prefersReducedMotion ? "auto" : "smooth",
  });
}, [currentLineIndex, prefersReducedMotion, state]);


  const tabs = useMemo(
    () => [
      { id: "engine-main.ds", label: "engine-main.ds", icon: "Ds" },
      { id: "revenue-related.sg", label: "revenue-related.sg", icon: "⚙" },
      { id: "control-related.sg", label: "control-related.sg", icon: "⚙" },
    ],
    []
  );

  const showReplay = state === "complete" || state === "idle";

  return (
    <section
      className="ds-outer"
      style={
        {
          "--left-glow": `url(${leftGlow})`,
          "--right-glow": `url(${rightGlow})`,
        } as React.CSSProperties
      }
    >
      <div
        ref={containerRef}
        className="ds-container"
        data-simulation-state={state}
        data-in-view={isInView}
        aria-label="Financial Control Center Demo"
      >
        <AnimatePresence>
          {state === "running" && (
            <motion.div
              className="ds-status-bar"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.16 }}
            >
              <span className="ds-status-dot" />
              <span className="ds-status-text">Running analysis…</span>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showReplay && (
            <motion.button
              className="ds-replay-btn"
              onClick={() => {
                resetSimulation();
                startSimulation();
              }}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.16 }}
              type="button"
            >
              {state === "complete" ? (
                <>
                  <RotateCcw size={13} /> Replay Demo
                </>
              ) : (
                <>
                  <Play size={13} /> Start Demo
                </>
              )}
            </motion.button>
          )}
        </AnimatePresence>

        <aside className="ds-sidebar" aria-hidden="true">
          <div className="ds-sidebar-top">
            <div className="ds-logo-icon" title="Zavvis">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
          </div>

          <nav className="ds-sidebar-nav" aria-label="Sidebar">
            <button className="ds-nav-item active" type="button" aria-label="File">
              <img className="ds-nav-icon" src={fileIcon} alt="" />
            </button>
            <button className="ds-nav-item" type="button" aria-label="Star">
              <img className="ds-nav-icon" src={starIcon} alt="" />
            </button>
            <button className="ds-nav-item" type="button" aria-label="Warning">
              <img className="ds-nav-icon" src={warningIcon} alt="" />
            </button>
            <button className="ds-nav-item" type="button" aria-label="Graph">
              <img className="ds-nav-icon" src={graphIcon} alt="" />
            </button>
            <button className="ds-nav-item" type="button" aria-label="Database">
              <img className="ds-nav-icon" src={databaseIcon} alt="" />
            </button>
            <button className="ds-nav-item" type="button" aria-label="Task">
              <img className="ds-nav-icon" src={taskIcon} alt="" />
            </button>
            <button className="ds-nav-item" type="button" aria-label="Menu">
              <img className="ds-nav-icon" src={menuIcon} alt="" />
            </button>
            <button className="ds-nav-item" type="button" aria-label="Settings">
              <img className="ds-nav-icon" src={settingsIcon} alt="" />
            </button>
          </nav>
        </aside>

        <main className="ds-main">
          <div className="ds-tabs" role="tablist" aria-label="Editor tabs">
            {tabs.map((t) => (
              <button
                key={t.id}
                className={`ds-tab ${activeTab === t.id ? "active" : ""}`}
                onClick={() => setActiveTab(t.id)}
                type="button"
                role="tab"
                aria-selected={activeTab === t.id}
              >
                <span className="ds-tab-icon">{t.icon}</span>
                <span className="ds-tab-label">{t.label}</span>
                <X size={13} className="ds-tab-close" />
              </button>
            ))}
          </div>

          <div className="ds-content-panels">
            <div className="ds-left-panel">
           <div ref={codeEditorRef} className="ds-code-editor" aria-label="Code editor simulation">

                <div className="ds-code-lines">
                  {CODE_LINES.map((line, idx) => {
                    const isVisible = idx <= currentLineIndex;
                    const isCurrent = idx === currentLineIndex && state === "running";

                    return (
                      <motion.div
                        key={line.id}
                           ref={(el) => {
        lineRefs.current[idx] = el as unknown as HTMLDivElement | null;
      }}
                        className={`ds-code-line ${isCurrent ? "current" : ""}`}
                        initial={false}
                        animate={{ opacity: isVisible ? 1 : 0.16 }}
                        transition={{ duration: prefersReducedMotion ? 0 : 0.1 }}
                      >
                        <span className="ds-line-number">{line.id}</span>
                        <span className="ds-line-content">
                          {renderCodeContent(line.content, line.type)}
                          {isCurrent && <span className="ds-cursor" />}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <div className="ds-prompts">
                <div className="ds-prompt-grid">
                  {PROMPT_CARDS.map((p, i) => (
                    <motion.button
                      key={i}
                      className="ds-prompt-card"
                      type="button"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: prefersReducedMotion ? 0 : 0.18,
                        delay: prefersReducedMotion ? 0 : i * 0.04,
                      }}
                      whileHover={prefersReducedMotion ? undefined : { y: -1 }}
                    >
                      {p}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="ds-input-area">
                <div className="ds-input-wrapper">
                  <input
                    className="ds-input"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask Conversation Agent"
                    aria-label="Ask Conversation Agent"
                  />
                  <button className="ds-send-btn" type="button" aria-label="Send">
                    <Send size={16} />
                  </button>
                </div>
              </div>

              <div className="ds-reports">
                <div className="ds-reports-header">
                  <div className="ds-reports-title">
                    <FileText size={16} />
                    <span>Reports</span>
                  </div>
                  <button className="ds-add-report-btn" type="button">
                    <Plus size={14} />
                    Add Report
                  </button>
                </div>

                <div className="ds-reports-list">
                  {REPORTS.map((r, i) => (
                    <motion.div
                      key={r}
                      className="ds-report-item"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: prefersReducedMotion ? 0 : 0.18,
                        delay: prefersReducedMotion ? 0 : i * 0.04,
                      }}
                    >
                      <ChevronRight size={13} />
                      <span>{r}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="ds-right-panel" aria-label="Detect Agent Output">
              <div className="ds-panel-header">
                <h2>DETECT AGENT OUTPUT</h2>
              </div>

              <div className="ds-panel-content">
                <p className="ds-panel-intro">The following signals were produced by the latest detection run:</p>

                <div className="ds-signals">
                  <AnimatePresence>
                    {DETECTION_SIGNALS.map((s, idx) =>
                      visibleCards.has(idx) ? (
                        <motion.div
                          key={s.id}
                          className={`ds-signal-card ${s.type}`}
                          initial={{ opacity: 0, x: 18, scale: 0.985 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          exit={{ opacity: 0, x: 18 }}
                          transition={{
                            duration: prefersReducedMotion ? 0 : 0.28,
                            ease: [0.25, 0.46, 0.45, 0.94],
                          }}
                        >
                          <div className="ds-signal-header">
                            <span className="ds-signal-indicator">×</span>
                            <h3>{s.title}</h3>
                          </div>

                          {s.description ? <p className="ds-signal-desc">{s.description}</p> : null}

                          {s.details?.length ? (
                            <div className="ds-signal-details">
                              {s.details.map((d, i) => (
                                <p key={i}>{d}</p>
                              ))}
                            </div>
                          ) : null}

                          <button className="ds-show-rca" type="button">
                            Show RCA
                          </button>
                        </motion.div>
                      ) : null
                    )}
                  </AnimatePresence>
                </div>

                <motion.div
                  className="ds-data-sources"
                  initial={false}
                  animate={{ opacity: visibleCards.size ? 1 : 0.35 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.18 }}
                >
                  <div className="ds-data-sources-header">
                    <div className="ds-data-sources-title">
                      <Database size={16} />
                      <span>Data Sources</span>
                    </div>
                    <button className="ds-add-data-btn" type="button">
                      Add Data
                    </button>
                  </div>

                  <div className="ds-data-sources-list">
                    {DATA_SOURCES.map((src, i) => (
                      <motion.div
                        key={src.name}
                        className="ds-data-source-item"
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: prefersReducedMotion ? 0 : 0.18,
                          delay: prefersReducedMotion ? 0 : 0.06 + i * 0.05,
                        }}
                        whileHover={prefersReducedMotion ? undefined : { x: 2 }}
                      >
                        <div className="ds-data-source-icon" style={{ backgroundColor: src.color }}>
                          {src.icon}
                        </div>
                        <span>{src.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </section>
  );
}
