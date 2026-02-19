import Link from "next/link";

const flows = [
  {
    title: "Flow 1: New Lead from Voicemail → LMS → Conversation Sync",
    subtitle: "Unknown caller leaves voicemail → Smart Bot creates lead → Agent responds via LMS → Conversation syncs to HyperConnect",
    steps: [
      { from: "guest", body: "Guest (unknown number) leaves voicemail in HyperConnect", dir: "Guest → HyperConnect" },
      { from: "bot", body: "Voicemail Smart Bot processes voicemail, creates guest indicator with lead flag in DB", dir: "HyperConnect → Smart Bot → Database" },
      { from: "lms", body: "New Lead created in AI Lead Manager (source: voicemail). Timeline event stored.", dir: "Smart Bot → LMS → Database" },
      { from: "system", body: "SignalR pushes \"New lead created\" event to HyperConnect timeline. Lead badge appears.", dir: "Database → SignalR → HyperConnect" },
      { from: "lms", body: "Sales agent sends SMS from LMS to lead. Message stored in lead timeline.", dir: "Agent → LMS → Database" },
      { from: "system", body: "SMS syncs to HyperConnect via SignalR. Appears in person's timeline with \"via LMS\" tag.", dir: "Database → SignalR → HyperConnect (bidirectional sync)" },
      { from: "guest", body: "Guest replies via SMS. Reply appears in HyperConnect AND all active lead timelines in LMS.", dir: "Guest → HyperConnect → SignalR → LMS (all active leads)" },
    ],
  },
  {
    title: "Flow 2: Existing Guest Creates New Lead → Dual Timeline Behavior",
    subtitle: "2-year guest \"Anurag Duke\" inquires about Botox → Agent creates lead from HC → Lead-specific events stay in LMS; communications sync",
    steps: [
      { from: "guest", body: "Existing guest \"Anurag Duke\" (2-year history) inquires about Botox treatment in HyperConnect", dir: "Guest → HyperConnect" },
      { from: "hc", body: "Agent creates lead for Anurag from HyperConnect. Lead linked to existing guest ID. Lead flag added.", dir: "Agent in HC → LMS → Database" },
      { from: "system", body: "\"New lead created\" event appears in HC timeline. Lead badge added to Anurag's entry.", dir: "SignalR → HyperConnect" },
      { from: "lms", body: "HC timeline: Shows 2-year history + \"New lead created\" event. LMS timeline: Fresh timeline for Botox lead only. No 2-year history.", dir: "Different paradigms: Person-centric (HC) vs Lead-centric (LMS)" },
      { from: "lms", body: "Agent adds Task \"Follow up on Botox pricing\" in LMS.", dir: "LMS only — does NOT sync to HC (lead-specific event)" },
      { from: "lms", body: "Agent sends SMS \"Here's the Botox pricing info\" from LMS.", dir: "LMS → SignalR → HyperConnect (appears in Anurag's 2-year timeline)" },
    ],
  },
  {
    title: "Flow 3: AI Call Scheduling → Rule Validation → Execution → Result Logging",
    subtitle: "Agent selects leads → Schedules AI calls → Business hours validated → AI executes calls → Results logged in both systems",
    steps: [
      { from: "lms", body: "Sales agent selects lead(s) in LMS, clicks \"AI Call\", fills prompt & context in scheduling modal.", dir: "Agent → LMS UI" },
      { from: "rules", body: "Business Hours Rules Engine validates schedule against state/region rules. If within business hours: Approved. If outside: Auto-adjusts to next valid time slot.", dir: "Scheduler → Rules Engine → Scheduler" },
      { from: "system", body: "\"AI call scheduled\" event added to LMS timeline. Agent notified of confirmed time.", dir: "Database → SignalR → LMS" },
      { from: "ai", body: "At scheduled time, AI engine executes call. Can run 100+ parallel calls simultaneously (bulk mode at 7:30 AM).", dir: "AI Calling Engine → Lead Phone Numbers" },
      { from: "ai", body: "Call results logged: Answered/Not answered, duration, sentiment score, key insights, recording link.", dir: "AI Engine → Database" },
      { from: "system", body: "\"AI call completed\" event appears in LMS timeline AND syncs to HyperConnect person timeline.", dir: "Database → SignalR → LMS + HyperConnect" },
    ],
  },
  {
    title: "Flow 4: Lead Conversion → Badge Removal → Guest Transition",
    subtitle: "Lead marked as Won → Confirmation → Badge removed in HC → Timeline archived in LMS → Guest profile continues",
    steps: [
      { from: "lms", body: "Sales manager clicks \"Convert Lead\" in LMS (or sets sales stage to \"Won\").", dir: "Agent → LMS UI" },
      { from: "lms", body: "Confirmation dialog shown: \"Mark this lead as converted? This will remove the lead indicator in HyperConnect.\"", dir: "LMS UI" },
      { from: "system", body: "Lead flag removed in database. SignalR pushes real-time update.", dir: "LMS → Database → SignalR" },
      { from: "hc", body: "HyperConnect: Lead badge removed immediately. \"Lead converted\" event added to timeline. Entry becomes regular guest.", dir: "SignalR → HyperConnect" },
      { from: "lms", body: "LMS: Lead status changes to \"Converted\" (read-only). Timeline archived but accessible. If person has other leads, badge count updates.", dir: "LMS UI update" },
      { from: "hc", body: "Guest profile continues: All communications from before and after conversion visible in HyperConnect. Full continuity preserved.", dir: "HyperConnect (person-centric paradigm)" },
    ],
  },
];

const fromStyles: Record<string, string> = {
  guest: "border-l-4 border-l-amber-400 bg-amber-50 text-amber-900",
  hc: "border-l-4 border-l-blue-400 bg-blue-50 text-blue-900",
  lms: "border-l-4 border-l-violet-400 bg-violet-50 text-violet-900",
  system: "border-l-4 border-l-pink-400 bg-pink-50 text-pink-900",
  bot: "border-l-4 border-l-emerald-400 bg-emerald-50 text-emerald-900",
  ai: "border-l-4 border-l-indigo-400 bg-indigo-50 text-indigo-900",
  rules: "border-l-4 border-l-orange-400 bg-orange-50 text-orange-900",
};

const syncTable = [
  { type: "SMS Inbound", lms: true, hc: true, dir: "↔ Bidirectional", notes: "Appears in all active leads for person" },
  { type: "SMS Outbound", lms: true, hc: true, dir: "↔ Bidirectional", notes: '"via LMS" tag shown in HC' },
  { type: "Manual Call", lms: true, hc: true, dir: "↔ Bidirectional", notes: "Includes duration, outcome" },
  { type: "AI Call", lms: true, hc: true, dir: "↔ Bidirectional", notes: "Includes sentiment, recording" },
  { type: "Voicemail", lms: true, hc: true, dir: "↔ Bidirectional", notes: "May trigger lead creation" },
  { type: "Task", lms: true, hc: false, dir: "— None", notes: "Lead-specific management event" },
  { type: "Note", lms: true, hc: false, dir: "— None", notes: "Lead-specific management event" },
  { type: "Private Note", lms: true, hc: false, dir: "— None", notes: "Internal-only, never synced" },
  { type: "Lead Stage Change", lms: true, hc: false, dir: "— None", notes: "Lead-specific management event" },
  { type: "New Lead Created", lms: true, hc: true, dir: "→ LMS to HC", notes: "Clickable deep link to LMS" },
  { type: "Lead Converted", lms: true, hc: true, dir: "↔ Bidirectional", notes: "Triggers badge removal in HC" },
  { type: "Appointment Booked", lms: true, hc: true, dir: "↔ Bidirectional", notes: "Guest event, visible in both" },
];

export default function DiagramsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="border-b border-slate-200 bg-slate-900 px-8 py-6">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <h1 className="text-xl font-semibold text-white">
            Data Flow Diagrams — LMS ↔ HyperConnect Integration
          </h1>
          <Link href="/" className="text-sm text-cyan-400 hover:text-cyan-300">
            ← Back to Hub
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-8 py-10">
        {flows.map((flow, fi) => (
          <section
            key={fi}
            className="mb-10 rounded-xl border border-slate-200 bg-white p-8 shadow-sm"
          >
            <h2 className="mb-2 text-lg font-semibold text-slate-900">
              📊 {flow.title}
            </h2>
            <p className="mb-6 text-sm text-slate-500">{flow.subtitle}</p>
            <div className="space-y-4">
              {flow.steps.map((step, si) => (
                <div key={si} className="flex items-start gap-4">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-white">
                    {si + 1}
                  </div>
                  <div
                    className={`flex-1 rounded-lg border-slate-200 p-4 ${
                      fromStyles[step.from] ?? "border-l-4 border-l-slate-300 bg-slate-50"
                    }`}
                  >
                    <p className="text-sm font-medium text-slate-800">{step.body}</p>
                    <p className="mt-2 text-xs text-slate-500">{step.dir}</p>
                  </div>
                </div>
              ))}
            </div>
            {fi === 1 && (
              <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                <strong>💡 Key Design Principle:</strong> Communications (SMS, calls, voicemails) sync
                bidirectionally. Lead-specific management events (tasks, notes, stage changes) remain in
                LMS only. This preserves distinct value propositions of both products.
              </div>
            )}
          </section>
        ))}

        {/* Sync Rules Table */}
        <section className="mb-10 rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="mb-2 text-lg font-semibold text-slate-900">
            📊 Timeline Event Sync Rules
          </h2>
          <p className="mb-6 text-sm text-slate-500">What syncs where and in which direction</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th className="bg-slate-800 px-4 py-3 text-left font-medium text-white">
                    Event Type
                  </th>
                  <th className="bg-slate-800 px-4 py-3 text-left font-medium text-white">
                    LMS
                  </th>
                  <th className="bg-slate-800 px-4 py-3 text-left font-medium text-white">
                    HC
                  </th>
                  <th className="bg-slate-800 px-4 py-3 text-left font-medium text-white">
                    Direction
                  </th>
                  <th className="bg-slate-800 px-4 py-3 text-left font-medium text-white">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody>
                {syncTable.map((row, i) => (
                  <tr
                    key={i}
                    className={`border-b border-slate-100 ${
                      !row.hc ? "bg-red-50/50" : ""
                    } hover:bg-slate-50`}
                  >
                    <td className="px-4 py-3 font-medium text-slate-800">{row.type}</td>
                    <td className="px-4 py-3">
                      <span className={row.lms ? "text-emerald-600 font-semibold" : "text-slate-400"}>
                        {row.lms ? "✓ Yes" : "—"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={row.hc ? "text-emerald-600 font-semibold" : "text-red-600 font-semibold"}>
                        {row.hc ? "✓ Yes" : "✗ No"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-blue-600">{row.dir}</td>
                    <td className="px-4 py-3 text-slate-600">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Architecture Overview */}
        <section className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="mb-2 text-lg font-semibold text-slate-900">
            📊 Architecture: Component Extraction Model
          </h2>
          <p className="mb-6 text-sm text-slate-500">
            How HyperConnect components are reused in LMS as Flutter packages
          </p>
          <div className="grid gap-5 sm:grid-cols-3">
            <div className="rounded-lg border-2 border-emerald-400 bg-emerald-50 p-5">
              <div className="mb-2 font-bold text-emerald-800">✓ Voice Package</div>
              <div className="text-sm text-emerald-700">
                <strong>Status:</strong> Production-ready<br />
                <strong>Type:</strong> Flutter plug-and-play<br />
                <strong>Config:</strong> Org ID, Center ID, SignalR, Voice infra URLs<br />
                <strong>Features:</strong> Outbound calls, hold, mute, recording, transfer
              </div>
            </div>
            <div className="rounded-lg border-2 border-amber-400 bg-amber-50 p-5">
              <div className="mb-2 font-bold text-amber-800">⚠ Messaging Component</div>
              <div className="text-sm text-amber-700">
                <strong>Status:</strong> POC done, NOT production-ready<br />
                <strong>Type:</strong> Flutter component<br />
                <strong>Challenge:</strong> Not designed for plug-and-play extraction<br />
                <strong>Next:</strong> Refactor for standalone package
              </div>
            </div>
            <div className="rounded-lg border-2 border-red-400 bg-red-50 p-5">
              <div className="mb-2 font-bold text-red-800">✗ WhatsApp Component</div>
              <div className="text-sm text-red-700">
                <strong>Status:</strong> Not started<br />
                <strong>Type:</strong> Future Flutter package<br />
                <strong>Timeline:</strong> Phase 3 (Q3 2026)<br />
                <strong>Scope:</strong> Multi-channel communication
              </div>
            </div>
          </div>
          <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
            <div className="mb-3 font-semibold text-blue-900">Real-Time Infrastructure</div>
            <div className="grid gap-3 sm:grid-cols-4">
              {["SignalR Hub", "Voice Infra", "WebSocket", "Token Provider"].map((name) => (
                <div
                  key={name}
                  className="rounded-md border border-slate-200 bg-white px-4 py-3 text-center text-sm font-medium"
                >
                  {name}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
