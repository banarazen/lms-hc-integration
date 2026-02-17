export function ExecutiveSummary() {
  return (
    <div className="prose prose-slate max-w-none">
      <p className="lead text-slate-600">
        Zenoti is integrating <strong>HyperConnect</strong> (AI communications concierge) and{" "}
        <strong>AI Lead Manager (LMS)</strong> to provide seamless communication in LMS while
        keeping conversation continuity across both platforms.
      </p>
      <div className="my-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <h3 className="text-sm font-semibold text-slate-900">HyperConnect</h3>
          <p className="mt-1 text-sm text-slate-600">
            Person-centric: one guest = one consolidated timeline. Used for calls, voicemail,
            WhatsApp, SMS, AI outbound calling.
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <h3 className="text-sm font-semibold text-slate-900">AI Lead Manager (LMS)</h3>
          <p className="mt-1 text-sm text-slate-600">
            Lead-centric: each lead has its own timeline. Captures leads from voicemail, Facebook,
            website, manual entry, HyperConnect.
          </p>
        </div>
      </div>
      <h2 className="mt-8 text-lg font-semibold text-slate-900">Key Goals</h2>
      <ul className="list-disc space-y-1 pl-5 text-slate-700">
        <li>Enable communication in LMS using reusable HyperConnect widgets (voice, messaging)</li>
        <li>Maintain UI consistency with HyperConnect</li>
        <li>Support multiple concurrent leads per person with expandable tree model</li>
        <li>Cross-navigation between systems with lead indicators</li>
      </ul>
    </div>
  );
}
