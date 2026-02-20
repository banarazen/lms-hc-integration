# Metric Architecture: Zenoti Lead Management Dashboard

## Data Model Overview

### Entities
- **Lead** – core entity; has source, type, stage, assigned agent, center, created_at
- **Interaction** – SMS, call, voicemail, email; linked to lead + agent
- **Stage Transition** – log of lead moving between stages with timestamp
- **Agent** – human or AI; has type (human | ai_receptionist | ai_outbound)
- **Center** – physical location/branch
- **Lead Type** – service category (Botox, Laser, etc.)
- **Lead Source** – acquisition channel

---

## Section 2a: Quick Overview KPIs

| Metric | Definition | Calculation | Format |
|--------|-----------|-------------|--------|
| Total Leads | All leads created in period | COUNT(leads) WHERE created_at IN period | 1,247 |
| New vs Returning | First-time vs. prior guest | GROUP BY is_returning_guest | 847 / 400 |
| Conversion Rate | Lead → Booked Appointment | COUNT(leads WHERE stage='Booked') / COUNT(leads) | 23.4% |
| Revenue Attributed | Revenue from converted leads | SUM(appointment.revenue) WHERE lead_id IS NOT NULL | $148,320 |
| Leads at Risk | No activity > 5 days | COUNT(leads WHERE last_activity_at < NOW()-5d AND stage NOT IN ['Won','Lost']) | 47 |
| Avg Response Time | Lead created to first agent contact | AVG(first_interaction.created_at - lead.created_at) | 4.2 min |
| Cost Per Lead | Ad spend / total leads | SUM(ad_spend) / COUNT(leads) | $94 |
| Lead Velocity | % change in lead volume vs prior period | (current_period_count - prior_period_count) / prior_period_count | +18.3% |

---

## Section 2b: Lead Funnel / Pipeline

### Stage Definitions (Medspa-specific)
1. **New** – Lead captured, not yet contacted
2. **Contacted** – First outreach made (AI or human)
3. **Interested** – Responded, expressed interest
4. **Qualified** – Meets criteria (budget, availability, intent)
5. **Booked** – Appointment scheduled
6. **Won** – Appointment completed + service delivered
7. **Lost** – Opted out, unresponsive, or competitor

### Funnel Metrics
| Metric | Definition |
|--------|-----------|
| Stage Count | COUNT(leads) WHERE current_stage = X |
| Stage Value | SUM(estimated_deal_size) WHERE current_stage = X |
| Drop-off Rate | 1 - (next_stage_count / current_stage_count) |
| Avg Time in Stage | AVG(time spent in stage across all leads) |
| Funnel by Source | Segment all stage counts by lead_source |
| Funnel by Type | Segment all stage counts by lead_type |

### Alert Rule
- Drop-off rate > 40% at any stage → highlight in red/amber

---

## Section 2c: Lead Source Performance

### Sources
- AI Receptionist (inbound calls/SMS handled by Zenoti AI)
- Facebook Ads
- Google Ads
- Website Form
- Walk-in
- Referral

### Metrics per Source
| Metric | Definition |
|--------|-----------|
| Lead Volume | COUNT(leads) WHERE source = X |
| Conversion Rate | Won / Total leads per source |
| Revenue Attributed | SUM(revenue) WHERE source = X AND stage = 'Won' |
| CPL | ad_spend_for_source / lead_count_from_source |
| Avg Deal Size | AVG(revenue) WHERE source = X AND stage = 'Won' |
| Trend (Sparkline) | Daily lead count over 30d per source |
| Best Source Badge | Source with highest revenue/conversion |

---

## Section 2d: Lead Type Analysis

### Lead Types (Service Categories)
- Botox / Neurotoxin
- Laser Hair Removal
- Facials / Skin Care
- CoolSculpting / Body Contouring
- Membership / Loyalty Program
- Consultation (general inquiry)

### Metrics per Type
| Metric | Definition |
|--------|-----------|
| Volume | COUNT(leads) WHERE type = X |
| Conversion Rate | Won / Total leads per type |
| Avg Deal Size | AVG(revenue) WHERE type = X |
| Avg Days to Convert | AVG(days from created to Won) WHERE type = X |
| Stage Distribution | % of leads per type at each stage |

---

## Section 2e: Agent / Sales Rep Leaderboard

### Agent Types
- **Human Agent** – Front desk, sales rep, coordinator
- **AI Receptionist** – Handles inbound, triages, books appointments
- **AI Outbound Agent** – Proactive outreach to leads in pipeline

### Metrics per Agent
| Metric | Definition |
|--------|-----------|
| Leads Handled | COUNT(leads) WHERE assigned_agent = X OR interacted_by = X |
| Conversion Rate | Won / Handled per agent |
| Avg Response Time | AVG(time from lead assignment to first contact) |
| Revenue Closed | SUM(revenue) WHERE won_by_agent = X |
| Best Source | Source with highest conv. rate for this agent |
| Best Lead Type | Lead type with highest conv. rate for this agent |
| Trend | Conv. rate current vs prior period |

---

## Section 2f: AI Agent vs Human Agent Performance

### Comparison Dimensions
| Metric | AI Agent | Human Agent | Formula |
|--------|----------|-------------|---------|
| Leads Handled (Volume) | COUNT WHERE agent_type = 'ai' | COUNT WHERE agent_type = 'human' | Absolute + % |
| Conversion Rate | Won / Handled (AI) | Won / Handled (Human) | % |
| Avg Response Time | AVG(first_contact - lead_created) AI | AVG(first_contact - lead_created) Human | minutes |
| Revenue Attributed | SUM(revenue) WHERE won_agent_type = 'ai' | SUM(revenue) WHERE won_agent_type = 'human' | $ |
| Handoff Rate | COUNT(ai_to_human_escalations) / COUNT(ai_handled) | N/A | % |
| Sentiment Score | AVG(sentiment_score) WHERE ai_handled | AVG(sentiment_score) WHERE human_handled | 1–5 |
| Cost per Conversion | AI cost (infra) / AI conversions | Human cost (salary) / Human conversions | $ |
| Best AI Use Cases | Lead types/sources where AI conv. rate > human | — | List |

### Visual: Side-by-side comparison cards + 30d trend line chart

---

## Section 2g: Center / Location Performance

### Metrics per Center
| Metric | Definition |
|--------|-----------|
| Lead Volume | COUNT(leads) WHERE center = X |
| Conversion Rate | Won / Total per center |
| Revenue | SUM(revenue) WHERE center = X |
| Avg Response Time | Per center |
| Top Agent | Agent with most conversions per center |
| Leads at Risk | Leads with no activity > 5d per center |

### Visual: Ranked list with sparklines OR heat map (if geo data available)

---

## Section 2h: Lead Capture Trends

| Metric | Definition | Visualization |
|--------|-----------|---------------|
| Daily Lead Volume | COUNT(leads) GROUP BY date | Line chart (30/60d) |
| Peak Days/Times | GROUP BY day_of_week, hour | Heatmap grid |
| New vs Returning | COUNT by is_returning per day | Stacked area chart |
| Source Mix Over Time | % breakdown by source per week | Stacked bar chart |

---

## Section 2i: Nurture & Outreach Analytics

| Channel | Metric | Definition |
|---------|--------|-----------|
| Email | Sent | COUNT(emails) in period |
| Email | Open Rate | opens / sent |
| Email | Reply Rate | replies / sent |
| SMS | Sent | COUNT(sms) in period |
| SMS | Response Rate | responses / sent |
| SMS | Opt-out Rate | opt_outs / sent |
| Calls (AI) | Made | COUNT(ai_calls) |
| Calls (AI) | Connect Rate | answered / made |
| Calls (AI) | Conversion Rate | booked / answered |
| Calls (Human) | Made | COUNT(human_calls) |
| Calls (Human) | Connect Rate | answered / made |
| Calls (Human) | Conversion Rate | booked / answered |
| Sequences | Completion Rate | completed / started |
| Re-engagement | Re-engaged Leads | COUNT(leads WHERE re_engaged = true) |

---

## Alerts & Risk Definitions

| Alert Type | Condition | Action |
|-----------|-----------|--------|
| Lead at Risk | No activity > 5 days, not Won/Lost | Show in alert panel, one-click assign |
| Stage Stall | Lead in same stage > 10 days | Amber highlight on lead card |
| High Drop-off | Stage drop-off > 40% | Red highlight on funnel stage |
| Slow Response | Center avg response > 30 min | Alert to manager |
| AI Underperforming | AI conv. rate < 80% of human | Alert to product team |

---

## Chatbot RAG Context Schema

The chatbot has access to aggregated metrics (not raw PII) structured as:

```json
{
  "period": "2024-01-01 to 2024-02-29",
  "total_leads": 1247,
  "conversion_rate": 0.234,
  "revenue_attributed": 148320,
  "leads_at_risk": 47,
  "by_source": { ... },
  "by_type": { ... },
  "by_agent": { ... },
  "by_center": { ... },
  "funnel": { ... },
  "nurture": { ... },
  "ai_vs_human": { ... }
}
```
