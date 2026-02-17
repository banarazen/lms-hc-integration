const personas = [
  {
    name: "Front Desk Agent",
    role: "Primary",
    goals: "Quickly respond, schedule appointments, provide information",
    pain: "Context switching; tracking lead vs guest conversations",
    needs: "Unified communication, cross-navigation, lead vs guest indicators",
  },
  {
    name: "Sales Manager",
    role: "Primary",
    goals: "Convert leads, track stages, prioritize outreach",
    pain: "Losing context when leads convert; multiple leads per person",
    needs: "Lead-centric timeline, AI calling, conversation sync",
  },
  {
    name: "Center Owner",
    role: "Secondary",
    goals: "Maximize conversion, timely follow-ups, service quality",
    pain: "Lack of visibility into lead nurturing; lead vs guest engagement",
    needs: "Separation of lead vs guest, compliance with calling regulations",
  },
];

export function Personas() {
  return (
    <div className="prose prose-slate max-w-none">
      <p className="text-slate-600">
        User personas for the LMS ↔ HyperConnect integration.
      </p>
      <div className="mt-6 space-y-6">
        {personas.map((p) => (
          <div
            key={p.name}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-slate-900">{p.name}</h3>
              <span className="rounded-full bg-teal-100 px-2 py-0.5 text-xs font-medium text-teal-800">
                {p.role}
              </span>
            </div>
            <dl className="mt-4 grid gap-2 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-medium uppercase text-slate-500">Goals</dt>
                <dd className="text-sm text-slate-700">{p.goals}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase text-slate-500">Pain points</dt>
                <dd className="text-sm text-slate-700">{p.pain}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs font-medium uppercase text-slate-500">Needs</dt>
                <dd className="text-sm text-slate-700">{p.needs}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}
