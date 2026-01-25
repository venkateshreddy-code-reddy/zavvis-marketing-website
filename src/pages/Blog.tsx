import React, { useMemo, useState } from "react";
import "../style/Blog.css";
import FinalCtaFooter from "../components/FinalCtaFooter";

type Tag =
  | "All Tags"
  | "Product Updates"
  | "Reflect Workflows"
  | "Toolshed Interviews"
  | "Articles";

type CardStyle = "purple" | "blue" | "slate";

type Post = {
  id: string;
  tag: Exclude<Tag, "All Tags">;
  date: string;
  title: string;
  excerpt: string;
  style: CardStyle;
  topSubtitle: string;
  body: string;
};

const TAGS: Tag[] = [
  "All Tags",
  "Product Updates",
  "Reflect Workflows",
  "Toolshed Interviews",
  "Articles",
];

const POSTS: Post[] = [
  {
    id: "1",
    tag: "Articles",
    date: "Jan 25, 2026",
    title: "Why Finance Still Finds Problems Too Late",
    excerpt:
      "Finance doesn’t lack data—it lacks timing. Most issues show up at month-end, when the damage is already done. The result: forensics, not control.",
    style: "purple",
    topSubtitle: "Financial control",
    body: `# Why Finance Still Finds Problems Too Late

Finance teams don’t struggle because they lack data. They struggle because they find problems after the damage is already done.

Every company today is drowning in financial information—transactions, journal entries, invoices, bills, payments, adjustments, reconciliations. But when something goes wrong, most teams still discover it the same way they did decades ago: at month-end, during a variance review, or when someone asks an uncomfortable question.

By then, the problem has already hit revenue, margins, cash flow, or credibility.

CFOs don’t miss problems because they aren’t looking. They miss them because the system they operate in is fundamentally reactive.

Issues usually surface in three ways:

- A number looks “off” in a report
- A budget vs. actual variance is bigger than expected
- A board or executive asks, “Why did this change?”

That moment triggers a familiar cycle: exports, spreadsheets, filters, reconciliations, emails, Slack messages, and long meetings trying to reconstruct what happened. Days—or weeks—are spent tracing transactions, systems, and people just to answer a single question: what changed, and why?

This isn’t analysis. It’s forensics.

Month-end close, variance analysis, and board decks are all post-mortems. They explain yesterday’s problems. They do not prevent tomorrow’s.

The real issue is not reporting quality. It’s timing.

Finance today has no true early-warning system. Nothing is constantly watching how the business behaves financially. Nothing flags structural changes as they start. Nothing explains root causes in real time.

So finance teams spend their best energy reconstructing the past instead of protecting the future.

And that’s the quiet risk every company runs: a mission-critical function operating with no real-time alerting, no early detection, and no built-in understanding of why things change.`,
  },
  {
    id: "2",
    tag: "Articles",
    date: "Jan 25, 2026",
    title: "What Is Financial Observability?",
    excerpt:
      "Dashboards show what changed. Observability explains why it changed, when it started, what caused it, and what to do about it—continuously.",
    style: "blue",
    topSubtitle: "New category",
    body: `# What Is Financial Observability?

Most finance teams think they need better dashboards.

What they actually need is understanding.

Not just what changed—but why it changed, when it started, what caused it, and what to do about it.

That gap is what a new category is emerging to solve: **financial observability**.

## Where the Idea Comes From

In engineering, observability is not about charts. It is about answering one core question:

**When something changes, can we understand why?**

Modern software systems are complex. Engineers can’t predict every failure mode in advance. So instead of relying only on predefined alerts, they build systems that let them observe behavior in real time—across logs, metrics, and traces—and explain what is happening as it happens.

Observability in engineering means:

- Detect change early
- Explain what caused it
- Fix before it spreads

It is not “Did a metric move?”
It is “What changed in the system’s behavior, and why?”

## Finance Today: Reactive by Design

Finance also operates in complex systems: accounting, billing, payroll, banking, procurement, CRM, revenue systems, inventory, operations.

But finance has no equivalent of observability.

What happens instead:

- Changes are noticed late (month-end, board prep, budget vs. actuals)
- Investigation is manual (exports, spreadsheets, filters, reconciliations)
- Explanation is slow and fragile
- Fixes happen after damage

## What Financial Observability Means

Financial observability applies the same principle engineers use to finance:

You don’t just watch totals. You observe behavior.

Financial observability means:

- Continuous monitoring of financial behavior
- Early detection of structural change
- Automatic driver explanation
- Traceability to source transactions

Not: “Revenue is down 12%.”

But:

- “A structurally stable customer stopped renewing on its usual cadence.”
- “Invoice generation for one segment silently slowed last week.”
- “Expense classification behavior changed in procurement flows.”
- “Cash collection behavior shifted before revenue showed it.”

Observability is not about reporting the past.
It is about understanding the present.

## Dashboards Are Not Observability

Dashboards show numbers. Observability explains systems.

Dashboards answer “what.”
Observability answers “why.”

Without observability, finance teams do not manage a living system. They perform periodic autopsies.

## What Changes When Finance Becomes Observable

1) **Timing**
Issues are detected when they begin, not when they accumulate.

2) **Effort**
Investigation moves from manual reconstruction to automatic explanation.

3) **Control**
Finance moves from reporting to operating—intervening earlier, preventing recurrence, reducing surprise.

Observability turns finance from reactive reporting into proactive control.`,
  },
  {
    id: "3",
    tag: "Articles",
    date: "Jan 25, 2026",
    title: "Why Every CFO Will Need Financial Observability",
    excerpt:
      "Finance complexity is growing faster than finance headcount. Manual investigation doesn’t scale. Observability becomes the control layer CFOs need.",
    style: "slate",
    topSubtitle: "CFO reality",
    body: `# Why Every CFO Will Need Financial Observability

Finance is becoming more complex faster than finance teams are growing.

That single fact explains why a new category is becoming inevitable.

## More Systems. More Transactions. More Speed.

A modern company runs on dozens of systems: accounting, billing, CRM, payroll, banking, procurement, inventory, subscriptions, usage, operations, warehouses.

Each one produces transactions. Each transaction affects financial reality.

Volume is exploding. Speed is accelerating. Interdependencies are multiplying.

But finance teams are not doubling in size.

## Manual Investigation Breaks at Scale

Manual processes fail quietly at first:

- A reconciliation takes longer
- A variance is explained later
- A root cause is guessed instead of proven

Over time:

- Problems are found later
- Confidence in numbers erodes
- Boards ask harder questions
- CFOs feel exposed

Not because teams are bad—because complexity outgrows human monitoring.

## What CFOs Are Now Judged On

Modern CFOs are judged on:

- **Control:** prevent surprises, not just explain them
- **Trust in numbers:** every number traceable to truth
- **Speed of insight:** explain change when it happens

These are control problems, not reporting problems.

## Why Observability Becomes Necessary

Observability is what makes complex systems manageable.

In engineering, it became mandatory when systems outgrew human intuition.

Finance is now at that point.

Observability in finance becomes:

- A control layer: spotting breakdowns early
- A trust layer: every number traceable
- A board-confidence layer: proof, not storytelling

## Where Zavvis Fits

Zavvis is building this layer for finance.

Not another reporting tool. Not another planning system.

A real-time control system for financial reality—making causality visible, risk detectable, trust provable, and control continuous.

As complexity grows, finance has two options:

- Hire endlessly and still fall behind
- Or build systems that see what humans cannot

Finance will choose the second.

The future CFO runs on observability, not spreadsheets.`,
  },
];

function pillLabel(t: Tag) {
  if (t === "All Tags") return "All Tags";
  if (t === "Product Updates") return "Product Updates";
  if (t === "Reflect Workflows") return "Reflect Workflows";
  if (t === "Toolshed Interviews") return "Toolshed Interviews";
  return "Articles";
}

function escapeHtml(s: string) {
  return s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function mdToHtml(md: string) {
  const lines = md.split("\n");
  const out: string[] = [];
  let inList = false;

  const closeList = () => {
    if (inList) {
      out.push("</ul>");
      inList = false;
    }
  };

  for (const raw of lines) {
    const line = raw.trimEnd();

    if (!line.trim()) {
      closeList();
      continue;
    }

    if (line.startsWith("# ")) {
      closeList();
      out.push(`<h1>${escapeHtml(line.slice(2).trim())}</h1>`);
      continue;
    }
    if (line.startsWith("## ")) {
      closeList();
      out.push(`<h2>${escapeHtml(line.slice(3).trim())}</h2>`);
      continue;
    }

    if (line.startsWith("- ")) {
      if (!inList) {
        out.push("<ul>");
        inList = true;
      }
      out.push(`<li>${escapeHtml(line.slice(2).trim())}</li>`);
      continue;
    }

    closeList();
    out.push(`<p>${escapeHtml(line.trim())}</p>`);
  }

  closeList();
  return out.join("\n");
}

export default function BlogDesign() {
  const [active, setActive] = useState<Tag>("All Tags");
  const [limit, setLimit] = useState<number>(6);
  const [openPostId, setOpenPostId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return active === "All Tags" ? POSTS : POSTS.filter((p) => p.tag === active);
  }, [active]);

  const visible = filtered.slice(0, limit);
  const canLoadMore = limit < filtered.length;

  const openPost = openPostId ? POSTS.find((p) => p.id === openPostId) : null;

  return (
    <div className="rd-page">
      <div className="rd-bg" />

      <header className="rd-hero">
        <div className="rd-container">
          <h1 className="rd-title">Zavvis Blog</h1>
          <p className="rd-subtitle">
            Financial observability: why finance finds problems late, what the new control layer is,
            and why CFOs will increasingly need it.
          </p>

          <div className="rd-tags">
            {TAGS.map((t) => (
              <button
                key={t}
                type="button"
                className={t === active ? "rd-pill rd-pillActive" : "rd-pill"}
                onClick={() => {
                  setActive(t);
                  setLimit(6);
                }}
              >
                {pillLabel(t)}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="rd-main">
        <div className="rd-container">
          {/* ✅ centered + smaller grid */}
          <div className="rd-gridWrap">
            <section className="rd-grid">
              {visible.map((p) => (
                <article key={p.id} className="rd-card">
                  <div className={`rd-top rd-top-${p.style}`}>
                    <div className="rd-topGlass">
                      <div className="rd-icon" aria-hidden="true">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M12 2l8.5 5v10L12 22 3.5 17V7L12 2z"
                            stroke="currentColor"
                            strokeWidth="1.6"
                          />
                        </svg>
                      </div>

                      <div className="rd-topText">
                        <div className="rd-topTitle">Zavvis</div>
                        <div className="rd-topSub">{p.topSubtitle}</div>
                      </div>
                    </div>
                  </div>

                  <div className="rd-divider" />

                  <div className="rd-body">
                    <div className="rd-meta">
                      <span className="rd-badge">{p.tag}</span>
                      <span className="rd-dot">•</span>
                      <span className="rd-date">{p.date}</span>
                    </div>

                    <h3 className="rd-h3">{p.title}</h3>
                    <p className="rd-excerpt">{p.excerpt}</p>

                    <div className="rd-actions">
                      <button className="rd-read" type="button" onClick={() => setOpenPostId(p.id)}>
                        Read →
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </section>
          </div>

          <div className="rd-loadWrap">
            <button
              className="rd-load"
              type="button"
              disabled={!canLoadMore}
              onClick={() => setLimit((v) => v + 6)}
            >
              <span className="rd-chev">⌄</span>
              {canLoadMore ? "Load More" : "No more posts"}
            </button>
          </div>
        </div>
      </main>

                <FinalCtaFooter />
      {openPost && (
        <div
          className="rd-modalOverlay"
          role="dialog"
          aria-modal="true"
          aria-label={openPost.title}
          onClick={() => setOpenPostId(null)}
        >
          <div className="rd-modal" onClick={(e) => e.stopPropagation()}>
            <div className="rd-modalTop">
              <div className="rd-modalMeta">
                <span className="rd-badge">{openPost.tag}</span>
                <span className="rd-dot">•</span>
                <span className="rd-date">{openPost.date}</span>
              </div>

              <button className="rd-modalClose" type="button" onClick={() => setOpenPostId(null)}>
                ✕
              </button>
            </div>

            <h2 className="rd-modalTitle">{openPost.title}</h2>

            <div
              className="rd-modalBody"
              dangerouslySetInnerHTML={{ __html: mdToHtml(openPost.body) }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
