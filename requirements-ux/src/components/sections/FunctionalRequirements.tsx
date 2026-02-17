const frs = [
  { id: "FR1", title: "Lead Creation and Display in LMS", summary: "Leads grouped by person; expandable tree; status badges; sources tracked." },
  { id: "FR2", title: "Two-Way SMS/Messaging from LMS", summary: "HyperConnect messaging component; reply/private note; sync to HC; attachments." },
  { id: "FR3", title: "Manual Outbound Calling from LMS", summary: "Call button; voice package; call overlay; recordings; sync to HC." },
  { id: "FR4", title: "AI Outbound Calling from LMS", summary: "AI Call dropdown; scheduling; bulk scheduling; business hours rules; results in timeline." },
  { id: "FR5", title: "Activity Timeline (Lead-Centric)", summary: "Consolidated (person) vs filtered (lead) view; event types; All events filter." },
  { id: "FR6", title: "Lead Indicator Badge in HyperConnect", summary: "Lead badge in HC left panel; removed on conversion; HC-only, not Zenoti Core." },
  { id: "FR7", title: "Conversation Sync LMS ↔ HC", summary: "SMS, calls, voicemails sync; tasks/notes/stage changes do NOT sync to HC." },
  { id: "FR8", title: "Cross-Navigation (HC ↔ LMS)", summary: "New lead created (HC) → deep link to LMS; Linked guest profile (LMS) → HC." },
  { id: "FR9", title: "Lead Conversion Flow", summary: "Convert lead → badge removed in HC; timeline preserved; Lead converted event." },
  { id: "FR10", title: "Filtering and Consolidated Views", summary: "Person = consolidated; lead = filtered; All events dropdown; event type filter." },
];

export function FunctionalRequirements() {
  return (
    <div className="prose prose-slate max-w-none">
      <p className="text-slate-600">
        Ten functional requirements (FR1–FR10) for the integration. Click through the list for high-level summaries.
      </p>
      <div className="mt-6 space-y-3">
        {frs.map((fr) => (
          <div
            key={fr.id}
            className="rounded-lg border border-slate-200 bg-white p-4 transition-colors hover:border-teal-200"
          >
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-sm font-semibold text-teal-700">{fr.id}</span>
              <h3 className="font-semibold text-slate-900">{fr.title}</h3>
            </div>
            <p className="mt-2 text-sm text-slate-600">{fr.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
