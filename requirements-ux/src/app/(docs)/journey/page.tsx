"use client";

import Link from "next/link";
import { useState } from "react";

const journeys = [
  {
    id: "j1",
    title: "Journey 1: Voicemail → Lead → Conversation",
    type: "info" as const,
    scenario:
      "Unknown number calls and leaves a voicemail. Smart Bot creates a lead. Sales agent nurtures via LMS. Conversation stays in sync with HyperConnect.",
    steps: [
      { sys: "guest", title: "Voicemail received", body: "Unknown number +1 (407) 203-8926 calls and leaves a voicemail about gym membership pricing. HyperConnect captures the voicemail.", detail: "The voicemail Smart Bot transcribes: \"Hi, I saw your ad on Facebook about the gym membership. I'd like to know more about pricing and class schedules.\"" },
      { sys: "system", title: "Lead auto-created", body: "Smart Bot processes voicemail, creates a guest indicator with lead flag in the database, and auto-creates a new lead in LMS.", detail: "Source: Voicemail | Lead type: Membership inquiry | Auto-assigned to sales queue" },
      { sys: "hc", title: "Lead badge appears & event added", body: "In HyperConnect, the phone number entry now shows a \"LEAD\" badge. A \"New lead created: Membership Lead\" event appears in the timeline with a deep link to LMS.", actions: [{ label: "See it in HC Mock →", href: "/hc" }] },
      { sys: "lms", title: "Agent opens lead & sends SMS", body: "Sales agent Sarah opens the lead in LMS, reviews the voicemail, and sends an SMS: \"Hello! Thank you for your interest in our full body laser service.\"", detail: "The messaging component at the bottom of the center panel is used. It looks and behaves exactly like HyperConnect's messaging interface.", actions: [{ label: "Try it in LMS Mock →", href: "/lms" }] },
      { sys: "system", title: "SMS appears in HyperConnect (< 1 second)", body: "SignalR pushes the SMS event in real-time. It appears in HyperConnect's person timeline with a \"via LMS\" tag. No manual refresh needed.", detail: "Sync target: < 1 second latency | Retry: exponential backoff if failure" },
      { sys: "guest", title: "Guest replies via SMS", body: "Guest replies: \"Can you please call tomorrow evening around 7pm?\" The reply appears in HyperConnect AND in all active lead timelines in LMS.", detail: "Edge case: If person has 3 leads, inbound SMS appears in all 3 lead timelines. AI score is computed and displayed alongside the message." },
      { sys: "lms", title: "Agent creates task (does NOT sync to HC)", body: "Agent creates a Task: \"Call on May 9, 2025 | 07:00PM\". This task appears in the LMS lead timeline only. It does NOT sync to HyperConnect.", detail: "Design principle: Lead-specific management events (tasks, notes, stage changes) remain in LMS to preserve distinct product value propositions." },
    ],
  },
  {
    id: "j2",
    title: "Journey 2: SMS from LMS → HC Sync",
    type: "info" as const,
    scenario: "Agent sends SMS from LMS. Message syncs to HyperConnect in real-time. Private notes do NOT sync.",
    steps: [
      { sys: "lms", title: "Agent selects lead in left panel", body: "Agent clicks on \"Membership Lead\" under +1 (407) 203-8926. The center panel switches to filtered timeline view showing only this lead's activities." },
      { sys: "lms", title: "Types and sends SMS", body: "Using the messaging component (bottom of center panel), agent types \"Here's our membership pricing info...\" and hits Send. The SMS appears immediately in the timeline.", detail: "The messaging component includes: Reply/Private note toggle, SMS type selector, text input, attachment button, send button — matching HyperConnect exactly.", actions: [{ label: "Try sending a message →", href: "/lms" }] },
      { sys: "system", title: "Real-time sync to HyperConnect", body: "Within 1 second, the SMS appears in HyperConnect's person timeline. A \"via LMS\" tag indicates origin. No page refresh required." },
      { sys: "system", title: "Private note does NOT sync", body: "If agent toggles to \"Private note\" and writes an internal note, it stays in LMS only. The toggle clearly separates public communication from internal notes.", detail: "Private notes: visible in LMS lead timeline (marked private) | NOT visible in HyperConnect | NOT synced anywhere" },
    ],
  },
  {
    id: "j3",
    title: "Journey 3: AI Call Scheduling",
    type: "info" as const,
    scenario: "Sales manager schedules AI calls for bulk lead follow-up. System validates business hours. AI executes and logs results.",
    steps: [
      { sys: "lms", title: "Agent clicks \"AI Call\" button", body: "In the right panel, agent clicks the \"AI Call\" button (next to manual Call). A scheduling modal opens with fields for use case, prompt, context, and schedule time.", actions: [{ label: "Try the AI Call modal →", href: "/lms" }] },
      { sys: "lms", title: "Fills scheduling details", body: "Agent selects \"Appointment Follow-Up\", writes prompt, reviews auto-populated context (lead name, last interaction, interest), optionally sets time.", detail: "Context auto-populated: Lead name, phone, last interaction date, service of interest. For bulk: can select multiple leads with checkboxes." },
      { sys: "system", title: "Business hours validation", body: "System checks state/region-level rules. If scheduled time is within allowed hours (e.g., 9 AM – 5 PM EST), it's approved. Otherwise, auto-adjusted to next valid slot.", detail: "Example: Agent schedules for 7:30 PM → System adjusts to 9:00 AM next business day and notifies agent." },
      { sys: "ai", title: "Executes call at scheduled time", body: "At the scheduled time, AI calling engine initiates outbound call. Can handle 100+ parallel calls simultaneously for bulk outreach." },
      { sys: "ai", title: "Results logged", body: "Call result captured: answered/not answered, duration, sentiment score (Positive/Negative/Neutral), key insights, recording link." },
      { sys: "system", title: "Result in both LMS and HyperConnect", body: "\"AI call completed\" event with full details appears in LMS lead timeline AND syncs to HyperConnect person timeline. Both systems show recording playback." },
    ],
  },
  {
    id: "j4",
    title: "Journey 4: Lead Conversion",
    type: "success" as const,
    scenario: "Lead successfully nurtured. Agent converts lead. Badge removed from HyperConnect. Timeline archived in LMS.",
    steps: [
      { sys: "lms", title: "Agent clicks \"Convert Lead\"", body: "After successful appointment booking, agent clicks the \"Convert Lead\" button at the bottom of the right panel in LMS.", actions: [{ label: "Try lead conversion →", href: "/lms" }] },
      { sys: "lms", title: "Confirmation dialog", body: "System shows: \"Mark this lead as converted? This will remove the lead indicator in HyperConnect.\" Agent confirms." },
      { sys: "system", title: "Real-time badge removal", body: "Lead flag removed in database. SignalR pushes update. HyperConnect removes badge immediately. \"Lead converted\" event added to both timelines." },
      { sys: "hc", title: "Badge removed, regular guest", body: "The \"LEAD\" badge disappears. The entry now appears as a regular guest. If person had 2 leads and 1 converts, badge updates to \"1 Lead\"." },
      { sys: "lms", title: "Lead archived, read-only", body: "Lead status changes to \"Converted\". Timeline is archived but still accessible. Sales stage is set to \"Won\". Undo option available for 5 minutes.", detail: "Edge case: If appointment gets canceled after conversion, lead remains converted. Agent can manually \"reopen lead\" if needed (pending business decision)." },
    ],
  },
  {
    id: "j5",
    title: "Journey 5: Cross-Navigation",
    type: "warning" as const,
    scenario: "Cross-navigation between systems. HC → LMS via \"New lead created\" deep link. LMS → HC via \"Linked guest profile\".",
    steps: [
      { sys: "hc", title: "HC → LMS: Click \"New lead created\" event", body: "In HyperConnect timeline, agent sees \"New lead created: Membership Lead\" event. Clicking \"View in AI Lead Manager\" deep-links to that specific lead in LMS.", detail: "Navigation: App-switch pattern (not overlay). Lead ID passed via URL parameter. LMS opens with that lead pre-selected. If LMS isn't open, system launches it.", actions: [{ label: "See deep link in HC →", href: "/hc" }] },
      { sys: "lms", title: "LMS → HC: Click \"Linked guest profile\"", body: "In LMS right panel, the \"Linked guest profile\" section shows \"Emily Johnson Smith\". Clicking \"Change\" with the external link icon deep-links to HyperConnect guest profile.", detail: "Navigation: App-switch pattern. Guest ID passed via URL. HyperConnect opens with that guest pre-selected. If user lacks HC permissions, error message shown.", actions: [{ label: "See linked profile in LMS →", href: "/lms" }] },
      { sys: "system", title: "Navigation transition", body: "Smooth app switch with loading indicator. Target: context load < 2 seconds. Shared authentication means no re-login required.", detail: "If target app not open: system launches it. If lead was deleted: \"Lead not found\" error with return option. If guest not linked: \"No guest profile\" with \"Link profile\" button." },
    ],
  },
] as const;

const sysColors: Record<string, string> = {
  guest: "bg-emerald-600",
  hc: "bg-cyan-600",
  lms: "bg-violet-600",
  system: "bg-amber-600",
  ai: "bg-pink-600",
};

const sysBorders: Record<string, string> = {
  guest: "border-l-emerald-500",
  hc: "border-l-cyan-500",
  lms: "border-l-violet-500",
  system: "border-l-amber-500",
  ai: "border-l-pink-500",
};

const sysTags: Record<string, string> = {
  guest: "bg-emerald-500/20 text-emerald-400",
  hc: "bg-cyan-500/20 text-cyan-400",
  lms: "bg-violet-500/20 text-violet-400",
  system: "bg-amber-500/20 text-amber-400",
  ai: "bg-pink-500/20 text-pink-400",
};

export default function JourneyPage() {
  const [active, setActive] = useState<(typeof journeys)[number]["id"]>(journeys[0].id);

  const journey = journeys.find((j) => j.id === active) ?? journeys[0];

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="border-b border-slate-700/50 bg-slate-900/50 px-8 py-8">
        <Link href="/" className="text-sm text-cyan-400 hover:text-cyan-300">← Back to Hub</Link>
        <h1 className="mt-3 text-2xl font-bold text-white">End-to-End Journey Flows</h1>
        <p className="mt-1 text-sm text-slate-400">
          Interactive walkthrough of how LMS and HyperConnect work together across key user scenarios
        </p>
      </div>

      <div className="flex flex-col border-b border-slate-700/50 bg-slate-900/30 lg:flex-row">
        <div className="flex overflow-x-auto lg:flex-col">
          {journeys.map((j) => (
            <button
              key={j.id}
              onClick={() => setActive(j.id)}
              className={`whitespace-nowrap border-b-2 px-6 py-4 text-left text-sm font-medium transition-colors lg:border-b-0 lg:border-l-2 ${
                active === j.id
                  ? "border-cyan-500 text-cyan-400"
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              {j.title}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-8 py-10">
        <div
          className={`mb-6 rounded-lg border px-5 py-4 ${
            journey.type === "info"
              ? "border-blue-500/30 bg-blue-500/10 text-blue-200"
              : journey.type === "success"
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
              : "border-amber-500/30 bg-amber-500/10 text-amber-200"
          }`}
        >
          <strong>Scenario:</strong> {journey.scenario}
        </div>

        <div className="relative pl-12 before:absolute before:left-5 before:top-5 before:bottom-5 before:w-0.5 before:bg-slate-700">
          {journey.steps.map((step, i) => (
            <div key={i} className="relative mb-8 flex gap-5">
              <div
                className={`absolute -left-12 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-base font-bold text-white ${sysColors[step.sys] ?? "bg-slate-600"}`}
              >
                {i + 1}
              </div>
              <div
                className={`flex-1 rounded-xl border border-slate-700 bg-slate-800/50 p-5 transition-colors hover:border-slate-600 ${sysBorders[step.sys] ?? ""}`}
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className={`rounded px-2 py-0.5 text-xs font-semibold uppercase ${sysTags[step.sys] ?? "bg-slate-500/20 text-slate-400"}`}>
                    {step.sys}
                  </span>
                  <span className="font-semibold text-white">{step.title}</span>
                </div>
                <p className="text-sm leading-relaxed text-slate-400">{step.body}</p>
                {"detail" in step && step.detail && (
                  <div className="mt-3 rounded-lg bg-slate-900/80 p-3 text-xs leading-relaxed text-slate-500">
                    {step.detail}
                  </div>
                )}
                {"actions" in step && step.actions && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {step.actions.map((a) => (
                      <Link
                        key={a.label}
                        href={a.href}
                        className="inline-flex items-center gap-1 rounded-lg border border-violet-500/30 bg-violet-500/10 px-3 py-2 text-xs font-medium text-violet-400 transition-colors hover:bg-violet-500/20"
                      >
                        👁 {a.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Dual Preview */}
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <div className="overflow-hidden rounded-lg border border-slate-700">
            <div className="flex items-center gap-2 bg-violet-600 px-3 py-2 text-sm font-semibold text-white">
              📋 AI Lead Manager
            </div>
            <iframe
              src="/lms"
              title="LMS Preview"
              className="h-[400px] w-full border-0"
            />
          </div>
          <div className="overflow-hidden rounded-lg border border-slate-700">
            <div className="flex items-center gap-2 bg-cyan-600 px-3 py-2 text-sm font-semibold text-white">
              💬 HyperConnect
            </div>
            <iframe
              src="/hc"
              title="HC Preview"
              className="h-[400px] w-full border-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
