const inScope = [
  "Two-way SMS/messaging from LMS (HyperConnect messaging component)",
  "Manual outbound calling from LMS (voice package)",
  "AI outbound calling with scheduling, prompts, context",
  "Lead indicator badge in HyperConnect",
  "Conversation sync (communications only) between LMS and HC",
  "Activity timeline in LMS (lead-centric)",
  "Expandable tree model for multiple leads per person",
  "Consolidated and filtered views",
  "Cross-navigation: HC → LMS (new lead), LMS → HC (linked guest)",
  "Lead conversion flow with indicator removal",
  "UI consistency with HyperConnect; Call/AI Call placement",
  "State/region rules for AI calling hours",
  "All events dropdown filter; lead event filtering",
];

const outOfScope = [
  "Dialer in LMS (Phase 1)",
  "WhatsApp as pluggable component (future)",
  "AI calling for guests in HC (future)",
  "Overlay navigation (v1 uses app-switch/deep-link)",
  "Lead-specific events in HC timeline (tasks, notes stay in LMS)",
  "Messaging component as production-ready standalone package (POC only)",
];

export function FeatureScope() {
  return (
    <div className="prose prose-slate max-w-none">
      <h2 className="text-lg font-semibold text-slate-900">In scope (v1)</h2>
      <ul className="mt-2 space-y-1.5">
        {inScope.map((item) => (
          <li key={item} className="flex items-start gap-2 text-slate-700">
            <span className="text-teal-500">✓</span>
            {item}
          </li>
        ))}
      </ul>
      <h2 className="mt-8 text-lg font-semibold text-slate-900">Out of scope / future</h2>
      <ul className="mt-2 space-y-1.5">
        {outOfScope.map((item) => (
          <li key={item} className="flex items-start gap-2 text-slate-600">
            <span className="text-slate-400">✗</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
