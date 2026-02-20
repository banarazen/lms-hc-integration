# Lead Management Dashboard — Product Spec
### PR-Ready · Zenoti AI Lead Manager (LMS)

> **Status:** Ready for Design Review → Engineering Handoff
> **Author:** Product / Design
> **Target:** LMS v2.0 — Dashboard Module
> **Last updated:** February 2026

---

## 1. Overview

A new analytics dashboard for the Zenoti AI Lead Manager (LMS), surfacing the full lead lifecycle from capture to revenue attribution. The dashboard is the **first screen** a business owner, front desk manager, or sales agent sees after logging in.

### Goals
- Give owners a real-time view of pipeline health in under 10 seconds
- Surface AI vs Human agent performance as a first-class differentiator
- Proactively flag leads at risk before they go cold
- Enable natural-language querying of lead data via embedded AI assistant

### Non-goals (this PR)
- Live backend integration (mock data only for now)
- Mobile-native app (responsive web only)
- WhatsApp analytics (Phase 3)

---

## 2. User Personas

| Persona | Primary Need | Key Metrics |
|---------|-------------|-------------|
| **Business Owner** | ROI on lead sources, AI vs human cost | Revenue attributed, CPL, conversion rate |
| **Front Desk Manager** | Daily workload, at-risk leads | Leads at risk, response time, stage distribution |
| **Sales Agent** | My performance vs peers, my pipeline | Personal conversion rate, leads handled, revenue |
| **Marketing Manager** | Channel performance, campaign ROI | Source analytics, CPL, lead velocity |

---

## 3. Dashboard Sections

### 3.1 Quick KPI Strip
Eight scrollable cards pinned to the top of the page. Always visible.

| # | Metric | Definition | Format | Alert |
|---|--------|-----------|--------|-------|
| 1 | Total Leads | COUNT(leads) in selected period | 1,247 | — |
| 2 | New Leads | First-time leads only | 847 / 400 ret | — |
| 3 | Conversion Rate | Won / Total leads | 25.4% | — |
| 4 | Revenue Attributed | SUM(revenue) from won leads | $698K | — |
| 5 | Leads at Risk | No activity > 5 days, not Won/Lost | 47 | ⚠ amber outline |
| 6 | Avg Response Time | Lead created → first contact | 4.2m | — |
| 7 | Cost Per Lead | Ad spend / total leads | $94 | — |
| 8 | Lead Velocity | % change vs prior period | +18.3% | — |

**Behaviour:**
- All KPIs update when date range changes
- Delta badges (↑ green / ↓ red) vs prior period
- "Leads at Risk" card has amber ring treatment
- Cards animate in with stagger (60ms delay each)

---

### 3.2 Lead Funnel
Stage-by-stage horizontal bar funnel.

**Stages:** New → Contacted → Interested → Qualified → Booked → Won → Lost

| Stage | Drop-off Threshold | Visual Treatment |
|-------|-------------------|-----------------|
| < 20% | Healthy | No indicator |
| 20–25% | Watch | 🟡 Amber |
| > 25% | Critical | 🔴 Red |

**Additional data per stage:**
- Lead count + pipeline value ($ estimate)
- Average days spent in stage
- Click to filter the rest of the dashboard to that stage

---

### 3.3 Lead Source Distribution
Doughnut chart + ranked bar list side by side.

**Sources:** AI Receptionist, Facebook Ads, Google Ads, Website Form, Walk-in, Referral

**Metrics per source:** Volume, conversion rate, revenue, CPL (if ad-connected), avg deal size

**Best Source Badge:** Automatically highlights the source with highest revenue.

---

### 3.4 Lead Source Performance Table
Sortable data table. Click any column header to sort ascending/descending.

Columns: Source · Leads · Conv% · Revenue · Avg Deal · CPL

Conversion % color coding:
- > 25% → green
- 20–25% → amber
- < 20% → red

---

### 3.5 AI Agent vs Human Agent ⭐ Key Differentiator

Side-by-side comparison of AI agents (Receptionist + Outbound) vs human agents.

**Comparison metrics:**

| Metric | Expected Winner | Notes |
|--------|----------------|-------|
| Leads Handled | AI (volume) | AI handles after-hours |
| Conversion Rate | AI (slightly) | AI: 26.5% vs Human: 24.2% |
| Avg Response Time | AI (dramatically) | AI: 18s vs Human: 9.8m |
| Revenue Attributed | Roughly equal | AI: $312K vs Human: $306K |
| Cost per Conversion | AI (dramatically) | AI: $18 vs Human: $142 |
| Handoff Rate | N/A | AI→Human escalation: 12.3% |

**Visual:** Left side = metric comparison rows with winner highlight. Right side = 6-month trend line chart (AI conv% vs Human conv%).

**AI Best Use Cases panel:** Automatically surfaces lead types/sources where AI outperforms (e.g. "Botox inquiries: 28.5% vs 22%").

---

### 3.6 Agent Leaderboard
Ranked by conversion rate. Click row to expand.

**Expanded view shows:** Leads handled, revenue, avg response time, best source, best lead type, delta vs prior period.

Agent type badges: Human (blue) · AI Receptionist (teal) · AI Outbound (purple)

---

### 3.7 Lead Capture Trends
Area/bar chart with 3 view modes (toggle pills):
- **Total** — single area chart
- **By Source** — stacked bar chart
- **New / Returning** — dual area chart

Date range selector drives the window (7d / 30d / 60d).

---

### 3.8 Lead Type Analysis
Performance breakdown by service category.

**Types:** Botox · Laser Hair Removal · Facials · CoolSculpting · Membership · Consultation

**Per type:** Volume, conversion rate (bar), revenue, avg days to convert

Sorted by revenue descending. Footer callouts: fastest-converting and best-deal-size types.

---

### 3.9 Center / Location Performance
Ranked cards (1–N) for each business location.

**Per center:** Lead volume, conversion rate, revenue, agent count, leads at risk

At-risk count color: > 15 = red background, 10–15 = amber, < 10 = neutral.

---

### 3.10 Nurture & Outreach Analytics
4-column channel grid: Email · SMS · AI Calls · Human Calls

**Per channel:** Volume sent/made, response/connect rate, conversion rate

Footer: Sequence completion rate (progress bar) + Re-engaged leads count + estimated revenue recovery.

---

### 3.11 Leads at Risk Panel
Actionable cards for every lead with no activity > 5 days.

**Per lead card:** Name · Service type · Source · Stage · Days stale · Estimated value · Priority badge

**One-click actions:**
- 📞 Call Now
- 💬 Send SMS
- 👤 Assign Agent
- ✕ Dismiss (removes from panel, persists in session)

Priority levels: High (red, 8+ days) · Medium (amber, 6–7 days) · Low (blue, 5 days)

---

### 3.12 Analytics Chatbot (RAG Assistant)
Floating panel (bottom-right). Minimises to a ✦ FAB.

**Prompt categories (chip groups):**
- Lead Sources
- Agent Performance
- Funnel & Conversion
- Revenue & ROI
- Nurture

**UX requirements:**
- Animated thinking dots while generating
- Responses in pre-wrap format (tables, bullets)
- "Take Action" button on relevant responses (e.g. "View these leads")
- Maintains session conversation history
- Powered by Claude claude-sonnet-4-6 with RAG over aggregated lead metrics

---

## 4. Filters & Interactivity

| Control | Location | Effect |
|---------|----------|--------|
| Date range | Header (Today / 7d / 30d / 60d) | Updates all KPIs + trend chart |
| Source filter | Header dropdown | Highlights source in table/chart |
| Center filter | Header dropdown | Scopes all data to selected center |
| Funnel stage click | Funnel section | Active highlight, filters lead list |
| Agent row click | Leaderboard | Expands detail panel inline |
| Table column click | Source table | Sort ascending/descending |
| Dismiss button | Risk panel | Removes card for session |

---

## 5. Design System Alignment

### 5.1 Tokens (must align with Zenoti DS)

```
Primary:     #0d9488  (teal-600 — existing accent in globals.css)
Primary dark:#0f766e  (teal-700 — existing accent-hover)
Primary light:#f0fdfa (teal-50)

Background:  #f8fafc  (existing --background)
Card:        #ffffff  (existing --card-bg)
Border:      #e2e8f0  (existing --border)
Text:        #0f172a  (existing --foreground)
Text muted:  #64748b  (slate-500)

Alert amber: #f59e0b
Alert red:   #ef4444
Success:     #10b981

Font:        Geist Sans (existing --font-sans)
```

> ⚠️ Note: Dashboard currently uses `#2D9D8F` as primary. Must be updated to `#0d9488` to match `globals.css` accent token.

### 5.2 Component Mapping (to Zenoti DS / shadcn)

| Dashboard element | Map to DS component |
|------------------|-------------------|
| KPI cards | `<Card>` with `<CardContent>` |
| Date range pills | `<ToggleGroup>` |
| Source / center dropdowns | `<Select>` |
| Sortable table | `<Table>` with `<TableHead>` sort |
| Agent badges | `<Badge variant="outline">` |
| Risk action buttons | `<Button size="sm">` variants |
| Progress bars | `<Progress>` |
| Chat input | `<Input>` + `<Button>` |
| Floating chat panel | `<Sheet side="right">` or custom |

### 5.3 Typography Scale

| Use | Style |
|-----|-------|
| KPI value | `text-2xl font-extrabold` |
| Section title | `text-sm font-semibold text-slate-900` |
| Section subtitle | `text-xs text-slate-500` |
| Table header | `text-xs font-semibold text-slate-500` |
| Table cell | `text-xs text-slate-700` |
| Badge | `text-[10px] font-semibold` |
| Chart labels | `font-size: 10px` |

### 5.4 Spacing & Layout

- Page padding: `px-5 py-5`
- Card padding: `p-5`
- Section gap: `gap-5` (20px)
- KPI card min-width: `160px`, scrollable row on mobile
- Grid: `grid-cols-2` at ≥ 900px, `grid-cols-1` below

---

## 6. Figma Handoff Checklist

When Figma mocks are available, validate these:

- [ ] Color tokens match `globals.css` — especially primary teal (`#0d9488` not `#2D9D8F`)
- [ ] Font is Geist Sans (not Inter — current dashboard uses Inter, needs update)
- [ ] KPI card component matches Zenoti card DS
- [ ] Badge component sizes and variants match DS
- [ ] Funnel bar style matches any existing progress/bar DS component
- [ ] Chart color palette matches Zenoti data-vis palette (if defined)
- [ ] Chatbot panel shadow/border matches Modal/Sheet DS component
- [ ] Dark mode tokens defined (dashboard is dark-mode ready via CSS vars)
- [ ] Icon library confirmed (Lucide vs Heroicons vs custom Zenoti icons)
- [ ] Responsive breakpoints match Zenoti grid system

---

## 7. Engineering Handoff Notes

### Tech stack (proposed, align with existing requirements-ux app)
```
Framework:   Next.js 15 (App Router) — matches requirements-ux
Styling:     Tailwind CSS v4 — matches requirements-ux
Charts:      Recharts (already in many Zenoti apps) or Chart.js
Icons:       Lucide React
Components:  shadcn/ui (or Zenoti DS components when available)
Font:        Geist Sans — matches requirements-ux
AI/Chatbot:  Claude claude-sonnet-4-6 via Anthropic SDK (streaming)
```

### File structure (proposed)
```
src/
  app/
    dashboard/
      page.tsx              ← Dashboard route
      layout.tsx            ← Dashboard layout (header, filters)
  components/
    dashboard/
      KPIStrip.tsx
      LeadFunnel.tsx
      SourceDistribution.tsx
      SourceTable.tsx
      AIvsHuman.tsx
      AgentLeaderboard.tsx
      LeadCaptureTrends.tsx
      LeadTypeAnalysis.tsx
      CenterPerformance.tsx
      NurtureAnalytics.tsx
      LeadsAtRisk.tsx
      ChatbotPanel.tsx
    ui/                     ← shadcn/Zenoti DS components
  lib/
    dashboard/
      mock-data.ts          ← Seed data (60 days, all entities)
      types.ts              ← Lead, Agent, Source, Funnel types
      formatters.ts         ← fmt.usd, fmt.num, fmt.min helpers
  api/
    chat/
      route.ts              ← Claude API streaming endpoint
```

### Mock data entities
- 6 lead sources · 6 lead types · 4 agents (2 human, 2 AI) · 3 centers
- 60 days daily volume data
- Realistic medspa conversion rates: 20–30% lead→booked

### API route (chatbot)
```typescript
// POST /api/chat
// Body: { messages: Message[], context: DashboardContext }
// Response: ReadableStream (SSE)
// Model: claude-sonnet-4-6
// System prompt: injected with aggregated dashboard metrics (no PII)
```

---

## 8. Acceptance Criteria

### Must have (P0)
- [ ] All 12 sections render with mock data
- [ ] Date range picker updates KPIs and trend chart
- [ ] Funnel drop-off > 25% shows red indicator
- [ ] Leads at Risk panel shows dismiss action (session-persisted)
- [ ] AI vs Human section visible and accurate
- [ ] Chatbot opens/closes, accepts input, shows canned responses
- [ ] Responsive: works at 1280px, 1440px, mobile (single column)
- [ ] Color tokens aligned to `globals.css` (`#0d9488`)
- [ ] Font updated to Geist Sans

### Should have (P1)
- [ ] Source filter scopes funnel + table
- [ ] Agent row click expands detail
- [ ] Chatbot streaming via Claude API
- [ ] Chart animations on load
- [ ] Export button (CSV download)

### Nice to have (P2)
- [ ] Dark mode
- [ ] Saved filter states (localStorage)
- [ ] Drill-down: click funnel stage → leads list modal
- [ ] Center map view (if geo data available)

---

## 9. Open Questions for Design Review

1. **Primary teal value** — Dashboard uses `#2D9D8F`, globals.css uses `#0d9488`. Which is the Zenoti DS canonical value? → Need Figma token confirmation.
2. **Font** — Dashboard uses Inter, requirements-ux uses Geist. Confirm Geist for all new LMS surfaces.
3. **Chart library** — Is there an existing Zenoti standard for data-vis (Recharts / Victory / custom)? Or is Chart.js acceptable?
4. **Icon set** — Confirm Lucide React vs Heroicons vs Zenoti custom icons.
5. **Chatbot placement** — Floating FAB (current) vs persistent right sidebar (GoHighLevel pattern). Business preference?
6. **AI vs Human section** — Confirm this is approved for external/customer-facing dashboards, or is it internal-only?
7. **Figma mocks** — Are LMS dashboard Figma frames available? Share link or frame IDs for token extraction.
8. **Dark mode** — Is this a requirement for LMS v2 launch or a later milestone?
9. **Multi-center filter** — Should selecting a center scope ALL sections or just Center Performance card?
10. **Real-time** — Is SignalR push for live KPI updates a v1 requirement, or polling acceptable?
