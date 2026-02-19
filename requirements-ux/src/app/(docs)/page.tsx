import Link from "next/link";
import { sections } from "@/lib/sections";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <div className="border-b border-slate-700/50 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/30 px-8 py-14 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
            ⚡ Interactive Prototype v1.0
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
            <span className="text-violet-400">AI Lead Manager</span>{" "}
            <span className="text-slate-300">↔</span>{" "}
            <span className="text-cyan-400">HyperConnect</span>
            <br />
            Integration Prototype
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-400">
            Clickable mock UIs, data flow diagrams, and end-to-end journey walkthroughs showing how Zenoti&apos;s two flagship products work together seamlessly.
          </p>
          <div className="mt-6 flex flex-wrap gap-6 text-sm text-slate-500">
            <span className="flex items-center gap-1">📅 February 2026</span>
            <span>🏢 Zenoti</span>
            <span>👥 Product & UX Team</span>
            <span>🎯 Phase 1: Core Communication & Sync</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-8 py-10 lg:px-12">
        {/* Interactive Deliverables */}
        <h2 className="mb-5 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Interactive Deliverables
        </h2>
        <div className="mb-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <Link
            href="/lms"
            className="group flex flex-col rounded-xl border border-slate-700 bg-slate-800/50 p-6 transition-all hover:-translate-y-0.5 hover:border-slate-600 hover:shadow-lg hover:shadow-slate-900/50"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-violet-500/15 text-2xl">
              📋
            </div>
            <h3 className="font-semibold text-white">AI Lead Manager (LMS) Mock</h3>
            <p className="mt-2 flex-1 text-sm text-slate-400">
              Full 3-panel layout: lead list with expandable tree, activities timeline, lead details. Send SMS, make calls, schedule AI calls, convert leads.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded bg-violet-500/15 px-2 py-0.5 text-xs text-violet-400">LMS</span>
              <span className="rounded bg-emerald-500/15 px-2 py-0.5 text-xs text-emerald-400">Interactive</span>
            </div>
          </Link>

          <Link
            href="/hc"
            className="group flex flex-col rounded-xl border border-slate-700 bg-slate-800/50 p-6 transition-all hover:-translate-y-0.5 hover:border-slate-600 hover:shadow-lg hover:shadow-slate-900/50"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-500/15 text-2xl">
              💬
            </div>
            <h3 className="font-semibold text-white">HyperConnect Mock</h3>
            <p className="mt-2 flex-1 text-sm text-slate-400">
              Guest/lead list with LEAD badges, person timeline with synced events and &quot;via LMS&quot; tags, deep link events, call recordings.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded bg-cyan-500/15 px-2 py-0.5 text-xs text-cyan-400">HC</span>
              <span className="rounded bg-emerald-500/15 px-2 py-0.5 text-xs text-emerald-400">Interactive</span>
            </div>
          </Link>

          <Link
            href="/diagrams"
            className="group flex flex-col rounded-xl border border-slate-700 bg-slate-800/50 p-6 transition-all hover:-translate-y-0.5 hover:border-slate-600 hover:shadow-lg hover:shadow-slate-900/50"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/15 text-2xl">
              📊
            </div>
            <h3 className="font-semibold text-white">Data Flow Diagrams</h3>
            <p className="mt-2 flex-1 text-sm text-slate-400">
              Step-by-step visual flows: Voicemail-to-Lead, Existing Guest New Lead, AI Call Scheduling, Lead Conversion. Sync rules & architecture.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded bg-amber-500/15 px-2 py-0.5 text-xs text-amber-400">Diagrams</span>
              <span className="rounded bg-violet-500/15 px-2 py-0.5 text-xs text-violet-400">LMS</span>
              <span className="rounded bg-cyan-500/15 px-2 py-0.5 text-xs text-cyan-400">HC</span>
            </div>
          </Link>

          <Link
            href="/journey"
            className="group flex flex-col rounded-xl border border-slate-700 bg-slate-800/50 p-6 transition-all hover:-translate-y-0.5 hover:border-slate-600 hover:shadow-lg hover:shadow-slate-900/50"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-pink-500/15 text-2xl">
              🎯
            </div>
            <h3 className="font-semibold text-white">E2E Journey Flows</h3>
            <p className="mt-2 flex-1 text-sm text-slate-400">
              5 interactive journey walkthroughs with step-by-step narration: Voicemail-to-Conversation, SMS Sync, AI Call, Lead Conversion, Cross-Navigation.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded bg-emerald-500/15 px-2 py-0.5 text-xs text-emerald-400">Interactive</span>
              <span className="rounded bg-amber-500/15 px-2 py-0.5 text-xs text-amber-400">Walkthrough</span>
            </div>
          </Link>
        </div>

        {/* Key Integration Features */}
        <h2 className="mb-5 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Key Integration Features (v1 Scope)
        </h2>
        <div className="mb-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: "💬", title: "Two-Way SMS", desc: "Send/receive SMS from LMS using HyperConnect messaging. Bidirectional sync within 1 second." },
            { icon: "📞", title: "Voice Calling", desc: "Manual outbound calls from LMS using production Flutter voice package. Full call controls." },
            { icon: "🤖", title: "AI Calling", desc: "Schedule AI outbound calls with prompts, context, business hours compliance. Bulk 100+ parallel calls." },
            { icon: "🏷️", title: "Lead Badges", desc: "Visual LEAD indicator in HyperConnect. Shows count for multiple leads. Removed on conversion." },
            { icon: "🔄", title: "Conversation Sync", desc: "SMS, calls, voicemails sync bidirectionally. Tasks, notes, stage changes stay in LMS only." },
            { icon: "🔗", title: "Cross-Navigation", desc: "HC → LMS deep link via lead events. LMS → HC via linked guest profile. App-switch pattern." },
            { icon: "🌳", title: "Expandable Tree", desc: "Multiple leads per person with expand/collapse. Consolidated vs filtered timeline views." },
            { icon: "🏆", title: "Lead Conversion", desc: "Convert lead → badge removed in HC → timeline archived in LMS → guest profile continues." },
            { icon: "🔽", title: "Event Filtering", desc: "All events dropdown in LMS timeline. Filter by Messages, Calls, Tasks, Notes, Lead Events." },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-lg border border-slate-800 bg-white/[0.03] p-5"
            >
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
                <span>{f.icon}</span> {f.title}
              </div>
              <p className="text-xs leading-relaxed text-slate-500">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Quick Walkthrough */}
        <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-6">
          <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-white">
            ⚡ Quick Walkthrough
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { n: 1, text: "Open LMS — try sending an SMS (type & press Enter)", href: "/lms" },
              { n: 2, text: "Click \"Call\" to make a manual outbound call", href: "/lms" },
              { n: 3, text: "Click \"AI Call\" to schedule an AI follow-up call", href: "/lms" },
              { n: 4, text: "Click \"Membership Lead\" / \"Botox Lead\" for filtered timelines", href: "/lms" },
              { n: 5, text: "Click \"Convert Lead\" to see conversion flow + HC sync", href: "/lms" },
              { n: 6, text: "Open HC — see LEAD badges, \"via LMS\" tags, deep links", href: "/hc" },
              { n: 7, text: "Click \"New lead created\" event to cross-navigate to LMS", href: "/hc" },
              { n: 8, text: "View E2E Journey flows with side-by-side dual preview", href: "/journey" },
            ].map((a) => (
              <Link
                key={a.n}
                href={a.href}
                className="flex items-center gap-3 rounded-lg bg-slate-900/80 p-3 transition-colors hover:bg-blue-500/10"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-700 text-xs font-semibold text-slate-300">
                  {a.n}
                </span>
                <span className="text-sm text-slate-300">{a.text}</span>
                <span className="ml-auto text-slate-500">→</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Requirements Sections */}
        <h2 className="mb-5 mt-14 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Requirements Document
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map(({ slug, label, icon }) => (
            <Link
              key={slug}
              href={`/section/${slug}`}
              className="group flex items-start gap-4 rounded-xl border border-slate-700 bg-slate-800/50 p-5 transition-all hover:border-slate-600"
            >
              <span className="text-2xl" aria-hidden>{icon}</span>
              <div>
                <h3 className="font-semibold text-white group-hover:text-teal-400">{label}</h3>
                <span className="mt-1 inline-block text-sm text-teal-500/80">View section →</span>
              </div>
            </Link>
          ))}
        </div>

        <footer className="mt-14 border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
          Zenoti — AI Lead Manager ↔ HyperConnect Integration Prototype — v1.0 — February 2026
          <br />
          Product & UX Team | Not for production use
        </footer>
      </div>
    </div>
  );
}
