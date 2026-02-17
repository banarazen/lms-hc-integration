const flows = [
  {
    title: "New lead from voicemail → LMS → conversation → HC sync",
    steps: [
      "Guest leaves voicemail (new number)",
      "Voicemail bot creates guest indicator + lead flag, new lead in LMS",
      "SignalR pushes 'new lead created' to HC timeline",
      "Agent responds via SMS in LMS → event syncs to HC",
      "Guest replies via SMS in HC → event syncs to LMS lead timeline",
    ],
  },
  {
    title: "Existing guest → new opportunity → lead creation → dual timeline",
    steps: [
      "Existing guest inquires in HC (e.g. Botox)",
      "Agent creates lead in LMS linked to guest; HC gets 'new lead created', lead badge",
      "HC timeline: full history + new event; LMS: fresh lead timeline",
      "Tasks in LMS do NOT sync to HC; SMS does sync to HC",
    ],
  },
  {
    title: "AI call scheduling → rules → execution → logging",
    steps: [
      "Agent selects lead(s), AI Call, fills prompt/context/schedule",
      "Scheduler validates state/region business hours; stores or adjusts time",
      "At scheduled time, AI engine executes call",
      "Result (answered/sentiment/recording) logged; sync to LMS and HC timelines",
    ],
  },
];

export function DataFlows() {
  return (
    <div className="prose prose-slate max-w-none">
      <p className="text-slate-600">
        Key data flows are described in the requirements doc as Mermaid sequence diagrams. Summaries below.
      </p>
      <div className="mt-6 space-y-6">
        {flows.map((flow) => (
          <div
            key={flow.title}
            className="rounded-xl border border-slate-200 bg-white p-5"
          >
            <h3 className="font-semibold text-slate-900">{flow.title}</h3>
            <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-slate-700">
              {flow.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}
