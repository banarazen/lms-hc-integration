const terms = [
  { term: "Lead", def: "Potential sales opportunity; has lifecycle, timeline, tasks, notes. Multiple leads per person." },
  { term: "Guest", def: "Existing customer in Zenoti with profile, purchase history, consolidated timeline." },
  { term: "HyperConnect (HC)", def: "AI communications concierge; person-centric; calls, voicemail, WhatsApp, SMS, AI calling." },
  { term: "AI Lead Manager (LMS)", def: "Lead lifecycle system; lead-centric timelines." },
  { term: "Lead Indicator", def: "Badge in HyperConnect for leads; removed when converted." },
  { term: "Consolidated View", def: "LMS view at person level: all lead activities merged." },
  { term: "Filtered View", def: "LMS view at lead level: only that lead's activities." },
  { term: "Voice Package", def: "Production-ready Flutter package for calling from HyperConnect." },
  { term: "Messaging Component", def: "SMS/text component from HC; POC stage, not yet plug-and-play." },
];

export function Glossary() {
  return (
    <div className="prose prose-slate max-w-none">
      <p className="text-slate-600">
        Key terms used across the requirements document.
      </p>
      <div className="mt-6 overflow-hidden rounded-lg border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Term</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Definition</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {terms.map(({ term, def }) => (
              <tr key={term}>
                <td className="px-4 py-3 text-sm font-medium text-slate-900">{term}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{def}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
