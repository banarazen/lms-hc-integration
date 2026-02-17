const edgeCases = [
  { case: "Guest who is also a lead", handling: "Lead badge in HC; lead details in LMS; guest profile in HC.", status: "Defined" },
  { case: "Multiple concurrent leads for same person", handling: "Expandable tree in LMS; consolidated timeline in HC; badge shows count.", status: "Defined" },
  { case: "Lead conversion — timeline", handling: "LMS: archived; HC: Lead converted event, badge removed.", status: "Defined" },
  { case: "Message from HC to person with 3 leads", handling: "Message appears in all 3 lead timelines in LMS (default).", status: "May need user testing" },
  { case: "Lead without phone number", handling: "Call/AI Call disabled; tooltip.", status: "Defined" },
  { case: "AI call outside business hours", handling: "Auto-adjust to next valid slot.", status: "Defined" },
  { case: "Voice infra not configured", handling: "Configuration error; prompt admin.", status: "Defined" },
  { case: "SMS sending failure", handling: "Error toast; retry; mark failed in timeline.", status: "Defined" },
  { case: "Sync failure (> 5 s)", handling: "Syncing indicator; retry with backoff.", status: "Defined" },
  { case: "Lead deleted while viewing filtered view", handling: "Redirect to person-level; toast.", status: "Defined" },
];

const openQuestions = [
  "AI call for guests (future) — how does it differ from lead AI calls?",
  "Backend voice infra readiness for LMS (PENDING CONFIRMATION)",
  "WhatsApp component timeline",
  "Messaging component production-readiness (NEEDS ESTIMATION)",
  "Lead badge text: 'Lead' vs custom labels",
  "Deduplication logic for multiple leads (NEEDS SPEC)",
  "Message attribution for person with multiple leads (NEEDS DECISION)",
  "Reopen converted lead action (NEEDS DECISION)",
  "Settings page for AI calling hours (NEEDS DESIGN)",
  "Lead without phone number — source? (NEEDS CLARIFICATION)",
];

export function EdgeCases() {
  return (
    <div className="prose prose-slate max-w-none">
      <h2 className="text-lg font-semibold text-slate-900">Edge cases</h2>
      <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-slate-900">Edge case</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-900">Handling</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-900">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {edgeCases.map((row) => (
              <tr key={row.case}>
                <td className="px-4 py-3 font-medium text-slate-900">{row.case}</td>
                <td className="px-4 py-3 text-slate-600">{row.handling}</td>
                <td className="px-4 py-3 text-slate-600">{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2 className="mt-8 text-lg font-semibold text-slate-900">Open questions</h2>
      <ul className="mt-4 space-y-2">
        {openQuestions.map((q) => (
          <li key={q} className="flex items-start gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700">
            <span className="text-amber-500">?</span>
            {q}
          </li>
        ))}
      </ul>
    </div>
  );
}
