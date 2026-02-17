const nfrCategories = [
  {
    name: "Performance",
    items: [
      "Real-time message sync under 1 s",
      "Timeline load under 1 s for 100 events",
      "Voice widget ready within 2 s",
      "Bulk AI call scheduling: 100 calls in under 5 s",
      "Deep link + context load under 2 s",
    ],
  },
  {
    name: "Consistency (UI parity with HC)",
    items: [
      "Messaging component matches HyperConnect",
      "Calling action layout top center",
      "Timeline event cards, badge design, responsive behavior",
    ],
  },
  {
    name: "Scalability",
    items: [
      "Up to 10 concurrent leads per person",
      "100+ parallel AI calls",
      "5000+ events per timeline with pagination",
      "1000+ SignalR concurrent users",
    ],
  },
  {
    name: "Compliance",
    items: [
      "AI calling hours (state/region rules)",
      "Call recording consent",
      "Contact info masking (PII)",
      "TCPA compliance",
    ],
  },
  {
    name: "Reliability",
    items: [
      "99.9% SMS delivery",
      "99% call connection success",
      "99.9% event sync success",
      "Zero data loss (audit + reconciliation)",
    ],
  },
  {
    name: "Security",
    items: [
      "Authentication (tokens for API, SignalR, voice)",
      "Authorization (org/center scoped)",
      "PII protection, encryption at rest",
      "Audit trail for actions",
    ],
  },
];

export function NFR() {
  return (
    <div className="prose prose-slate max-w-none">
      <p className="text-slate-600">
        Non-functional requirements for performance, consistency, scalability, compliance, reliability, and security.
      </p>
      <div className="mt-6 space-y-6">
        {nfrCategories.map((cat) => (
          <div
            key={cat.name}
            className="rounded-xl border border-slate-200 bg-white p-5"
          >
            <h3 className="text-base font-semibold text-slate-900">{cat.name}</h3>
            <ul className="mt-3 space-y-1 text-sm text-slate-700">
              {cat.items.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-teal-500">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
