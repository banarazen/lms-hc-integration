export function UISpecs() {
  return (
    <div className="prose prose-slate max-w-none">
      <h2 className="text-lg font-semibold text-slate-900">LMS 3-panel layout</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-sm font-semibold text-slate-900">Left panel (320px)</h3>
          <p className="mt-1 text-sm text-slate-600">
            Lead list: search, persons/leads, expandable tree, status badges. Click person → consolidated timeline; click lead → filtered timeline.
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-sm font-semibold text-slate-900">Center panel (flex)</h3>
          <p className="mt-1 text-sm text-slate-600">
            Activities timeline: header with All events filter, chronological events, infinite scroll. Bottom: messaging component (Reply / Private note, SMS, attachments).
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-sm font-semibold text-slate-900">Right panel (360px)</h3>
          <p className="mt-1 text-sm text-slate-600">
            Lead details: score, <strong>Call</strong> (Manual / AI Call), tabs. Linked guest profile (link to HC), user details, lead assessment.
          </p>
        </div>
      </div>
      <h2 className="mt-8 text-lg font-semibold text-slate-900">HyperConnect changes</h2>
      <ul className="mt-2 space-y-1 text-slate-700">
        <li>Lead badge on entries (single or &quot;2 Leads&quot;); orange/yellow.</li>
        <li>&quot;New lead created&quot; event card: clickable, opens LMS.</li>
        <li>&quot;Lead converted&quot; event card: informational.</li>
      </ul>
      <h2 className="mt-6 text-lg font-semibold text-slate-900">Calling action placement</h2>
      <p className="mt-1 text-slate-700">
        LMS: Call button top center of center panel; dropdown Manual Call / AI Call. Matches HyperConnect pattern.
      </p>
    </div>
  );
}
