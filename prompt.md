# Claude Code Prompt

Copy and paste the following prompt into Claude Code:

---

Generate a detailed requirements document in markdown (`requirements-lms-hc-integration.md`) for the **AI Lead Manager ↔ HyperConnect Communications Integration** feature at Zenoti.

## Company & Product Context

Zenoti is a vertical SaaS company serving medspa, fitness, salon, and spa businesses.

**Two products are being integrated:**

1. **HyperConnect** — An AI communications concierge used by front desk / sales agents to communicate with guests and leads. Capabilities include: inbound/outbound calls, voicemail capture, WhatsApp, SMS, two-way messaging, and outbound AI calling agent. The paradigm here is **person-centric** (one guest = one timeline, regardless of how many leads exist). HyperConnect is the mature, stable product — its UI should not change significantly.

2. **AI Lead Manager (LMS)** — Captures leads from various sources (voicemail smart bot, Facebook campaigns, website forms, manual entry, HyperConnect itself), manages lead lifecycle, nurtures, and converts them. The paradigm here is **lead-centric** (each lead has its own distinct timeline). LMS is newer and is being enhanced with communication capabilities pulled from HyperConnect.

## Current State (from POC)

The voice/calling widget is already extracted as a **Flutter package** (plug & play). It requires environment config including organizationId, centerId, userId, SignalR credentials, voice infra URLs, and agent details. The voice package registration supports callbacks for profile opening, telemetry, recording, toast messages, etc.

The **text/messaging component** (used for SMS, attachments in HyperConnect timeline) is NOT yet production-ready as a standalone package — a POC has been done to extract it, but it's not seamless like the voice package. WhatsApp integration as a pluggable component is future scope.

Backend voice infra changes still need confirmation from the backend team.

## UI Structure (from Figma / screenshot)

The **LMS Lead Details** screen has a 3-panel layout:
- **Left panel**: List of leads (shown by phone number or name, with status badges like "AI call completed, Positive response", "Follow up call completed", "Appointment no show", "Lead is lost", "Won, Lead converted", etc.). Leads are identified by phone number when no guest profile exists.
- **Center panel (Activities)**: Timeline of all events for the selected lead — SMS messages (with inbound/outbound indicator, AI score), call logs, notes. Has "All events" dropdown filter and "Purchase history" button. At the bottom: Reply / Private note toggle, message type selector (SMS dropdown), message input field with attachments.
- **Right panel (Details)**: Lead details including Lead Score (e.g., 83/150), Call / AI Call buttons, tabs for More info / Vitals / Allergies / Habits / +15 more, "Linked guest profile" section (linking to existing HyperConnect guest), User details (Name, Phone, Email, Description), Lead assessment (Sales stage, Priority).

## Key Design Decisions (from team discussion transcript)

These were agreed upon by PM (Balakrishna/BK), UX (Adit), and Dev Lead (Anurag):

### 1. UI Consistency
- The messaging component in LMS should look and behave **exactly like HyperConnect** — same positioning, same interactions.
- Calling functions should move to the **top center section** (matching HyperConnect layout), not remain where they currently are in the prototype.
- The calling actions layout should match HyperConnect's pattern for consistency.

### 2. Lead vs Guest Indicators
- In HyperConnect, leads should have a **badge/indicator** distinguishing them from regular guests.
- When a lead is converted (closed), the lead indicator is removed — it becomes a regular guest entry.
- The lead indicator is **HyperConnect-specific only** — it will NOT show in Zenoti Core.
- Leads are stored using the guest indicator mechanism in the backend, but with an additional lead flag that only HyperConnect recognizes.

### 3. Timeline & Event Architecture

**In LMS (Lead-centric):**
- Each lead has its **own distinct timeline**.
- If Sophia Williams has 2 leads (e.g., package purchase + membership), each lead has a separate timeline with its own tasks, notes, conversations.
- At the phone-number/person level, selecting the person shows a **consolidated view** of all lead activities (task 1 from lead 1 + task 2 from lead 2).
- Selecting a specific lead under that person **filters** to show only that lead's activities.
- This is an **expandable/collapsible tree model**: Person → Lead 1, Lead 2 → each with own timeline.

**In HyperConnect (Person-centric):**
- One guest = one consolidated timeline. No duplicate entries for the same person.
- Lead-specific events (tasks, notes, lead stage changes) will **NOT show in HyperConnect timeline** — only communications (messages, calls, voicemails) will appear.
- This preserves HyperConnect's purpose as a communications tool and preserves the value proposition of the separate LMS module.
- If a user needs to act on lead-specific items, they navigate to LMS.

### 4. Cross-Navigation
- From HyperConnect: When a guest has active leads, there should be an indicator. Clicking a "new lead created" event in the timeline should allow navigation/deep-link to the LMS interface for that specific lead.
- From LMS: The linked guest profile section allows navigating to the full HyperConnect guest profile.
- The team discussed overlay vs. app-switch approaches — the current direction leans toward **deep-linking / app switching** rather than overlaying one module on another (no overlay precedent exists in the platform).

### 5. AI Calling
- **AI call scheduling** is an LMS-specific feature (not available in HyperConnect for now, but may come later).
- AI calling should be a **sub-option under the Call action** (dropdown: Manual Call / AI Call).
- For HyperConnect, AI calling for guests may come in the future — AI can make parallel bulk calls (e.g., 100 calls at 7:30 AM).
- Region/state-level rules govern AI calling hours (business hours only). Settings page will have time-window configurations per region.
- Current supported use case: **appointment follow-up** as outbound AI call. Users select one or multiple guests/leads and trigger AI follow-up calls.

### 6. Dialer
- LMS will **NOT have a standalone dialer** in the first version. Users select a lead and press the call button — the phone number is already associated.
- Full dialer functionality remains in HyperConnect only.
- May be added to LMS later if needed.

### 7. Conversation Continuity
- When a lead is created and conversations happen in LMS, the **same conversation thread** should be visible in both LMS and HyperConnect (for the communications portion).
- The lead's full conversation history carries over — if a lead is created from a voicemail in HyperConnect, subsequent LMS conversations still show up in HyperConnect's timeline for that person.

### 8. Multiple Leads for Same Person
- A person (guest or unknown number) can have **multiple concurrent leads** from different sources (e.g., Facebook campaign for membership + voicemail inquiry about a service).
- In LMS: Expandable tree — person at top, leads nested below, each with own filtered timeline.
- In HyperConnect: Single person entry, consolidated timeline, with lead indicator badge.
- Deduplication logic applies — only genuine distinct leads survive.

## Requirements Document Structure

Generate the document with the following sections:

1. **Executive Summary** — Brief overview of what's being built and why.

2. **Glossary** — Define: Lead, Guest, HyperConnect, LMS, AI Call, Lead Indicator, Timeline, Activity Event, Lead Conversion, Lead Source.

3. **User Personas** — Front desk agent, Sales manager, Center owner.

4. **Feature Scope**
   - In scope for v1
   - Out of scope / future (dialer in LMS, WhatsApp as component, AI calling in HyperConnect for guests, overlay navigation)

5. **System Architecture Overview**
   - Component extraction model (voice package as Flutter plug-and-play, messaging component WIP)
   - Backend dependencies (SignalR, Voice infra, API layer)
   - Data model relationship: Guest ↔ Lead(s), Lead ↔ Timeline Events, Lead ↔ Conversations

6. **Functional Requirements** — Organized by workflow:
   - FR1: Lead creation and display in LMS
   - FR2: Two-way SMS/messaging from LMS (using extracted HyperConnect component)
   - FR3: Manual outbound calling from LMS (using voice package)
   - FR4: AI outbound calling from LMS (scheduling with prompts/context)
   - FR5: Activity timeline in LMS (lead-centric, expandable tree for multiple leads per person)
   - FR6: Lead indicator badge in HyperConnect
   - FR7: Conversation sync between LMS and HyperConnect (communications only — no lead-specific events in HC)
   - FR8: Cross-navigation (HC → LMS deep link, LMS → HC guest profile)
   - FR9: Lead conversion flow (lead indicator removal in HC, timeline preservation)
   - FR10: Filtering and consolidated views (per-lead filter in LMS, "All events" dropdown, lead event filter)

   For each FR, include: Description, User story, Acceptance criteria, UI behavior, Edge cases, Dependencies.

7. **Non-Functional Requirements** — Performance (real-time message sync), consistency (UI parity with HyperConnect), scalability (bulk AI calls), compliance (state-level calling hour rules).

8. **UI/UX Specifications**
   - LMS 3-panel layout details
   - HyperConnect changes (lead badge, timeline event for "new lead created")
   - Calling action placement (top center, matching HyperConnect)
   - Tree/expandable model for multiple leads per person
   - Message component parity with HyperConnect

9. **Data Flow Diagrams** (describe in text/mermaid)
   - New lead from voicemail → LMS → conversation → HyperConnect sync
   - Existing guest creates new opportunity → lead creation → dual timeline behavior
   - AI call scheduling → rule evaluation → call execution → result logging

10. **Edge Cases & Open Questions**
    - Guest who is also a lead — profile display logic
    - Multiple concurrent leads for same person — timeline merging rules
    - Lead conversion — what happens to the lead timeline in LMS and HC
    - AI call for guests (future) — how does it differ from lead AI calls
    - Backend readiness for voice infra in LMS context

11. **Dependencies & Risks**
    - Voice package: ready (Flutter plug-and-play)
    - Messaging/text component: POC done, not production-ready — needs extraction work
    - WhatsApp component: not started
    - Backend voice infra confirmation pending
    - No overlay pattern exists in platform — cross-nav must be app-switch/deep-link

12. **Release Plan** — Suggested phasing:
    - Phase 1: Voice calling + messaging in LMS, lead badge in HC, basic conversation sync
    - Phase 2: AI calling from LMS, cross-navigation deep links, tree model for multiple leads
    - Phase 3: WhatsApp integration, AI calling for HC guests, advanced filtering

Make the document thorough, precise, and actionable — suitable for engineering handoff. Use tables for acceptance criteria where appropriate. Include mermaid diagrams for data flows. Mark all open questions clearly with a ⚠️ emoji.