const phases = [
  {
    name: "Phase 1: Core Communication & Sync (MVP)",
    target: "Q1 2026 (8–10 weeks)",
    goal: "Basic communication in LMS with HC conversation sync",
    features: [
      "Voice calling from LMS (manual); two-way SMS from LMS",
      "Lead indicator badge in HC; conversation sync (SMS, calls, voicemails)",
      "Basic timeline in LMS; New lead created (HC) → LMS deep link; Linked guest (LMS) → HC",
      "UI consistency with HyperConnect",
    ],
    deps: "Voice infra confirmation; messaging component production-ready",
  },
  {
    name: "Phase 2: AI Calling & Advanced Navigation",
    target: "Q2 2026 (6–8 weeks)",
    goal: "AI calling and multiple leads per person",
    features: [
      "AI outbound calling with scheduling, prompts, context; business hours rules",
      "Expandable tree model; consolidated and filtered views",
      "Lead conversion flow; All events dropdown filter",
    ],
    deps: "AI calling engine; business hours rules; tree UI",
  },
  {
    name: "Phase 3: Multi-Channel & Guest AI Calling",
    target: "Q3 2026 (TBD)",
    goal: "WhatsApp, AI calling for guests, analytics",
    features: [
      "WhatsApp as pluggable component in LMS",
      "AI calling for guests in HC; dialer in LMS if needed",
      "Advanced filtering and analytics; overlay navigation if approved",
    ],
    deps: "WhatsApp component; AI engine for guest context",
  },
];

export function ReleasePlan() {
  return (
    <div className="prose prose-slate max-w-none">
      <p className="text-slate-600">
        Three-phase release plan with MVP in Q1 2026.
      </p>
      <div className="mt-6 space-y-6">
        {phases.map((phase) => (
          <div
            key={phase.name}
            className="rounded-xl border border-slate-200 bg-white p-5"
          >
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold text-slate-900">{phase.name}</h3>
              <span className="rounded-full bg-teal-100 px-2 py-0.5 text-xs font-medium text-teal-800">
                {phase.target}
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-600">{phase.goal}</p>
            <ul className="mt-3 space-y-1 text-sm text-slate-700">
              {phase.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span className="text-teal-500">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-slate-500">
              <strong>Dependencies:</strong> {phase.deps}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
