import Link from "next/link";
import { sections } from "@/lib/sections";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white px-10 py-8 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">
          AI Lead Manager ↔ HyperConnect Integration
        </h1>
        <p className="mt-1 text-slate-600">
          Requirements document — Zenoti · Version 1.0 · February 2026
        </p>
      </header>
      <div className="px-10 py-8">
        <p className="mb-6 max-w-2xl text-slate-600">
          Click any section below to explore the requirements, or try the interactive LMS and HyperConnect prototypes.
        </p>

        <h2 className="mb-4 text-lg font-semibold text-slate-900">Interactive prototypes</h2>
        <div className="mb-10 grid gap-4 sm:grid-cols-2">
          <Link
            href="/lms"
            className="group flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-teal-300 hover:shadow-md"
          >
            <span className="text-2xl" aria-hidden>📋</span>
            <div>
              <h2 className="font-semibold text-slate-900 group-hover:text-teal-700">
                AI Lead Manager (LMS) Mock
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                3-panel layout: lead list with tree, activities timeline, lead details. Send SMS, call, schedule AI calls, convert leads.
              </p>
              <span className="mt-2 inline-block text-sm text-teal-600">Open prototype →</span>
            </div>
          </Link>
          <Link
            href="/hc"
            className="group flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-teal-300 hover:shadow-md"
          >
            <span className="text-2xl" aria-hidden>💬</span>
            <div>
              <h2 className="font-semibold text-slate-900 group-hover:text-teal-700">
                HyperConnect Mock
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Guest/lead list with LEAD badges, timeline with &quot;via LMS&quot; events, &quot;New lead created&quot; deep link to LMS.
              </p>
              <span className="mt-2 inline-block text-sm text-teal-600">Open prototype →</span>
            </div>
          </Link>
        </div>

        <h2 className="mb-4 text-lg font-semibold text-slate-900">Requirements sections</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map(({ slug, label, icon }) => (
            <Link
              key={slug}
              href={`/section/${slug}`}
              className="group flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-teal-300 hover:shadow-md"
            >
              <span className="text-2xl" aria-hidden>{icon}</span>
              <div>
                <h2 className="font-semibold text-slate-900 group-hover:text-teal-700">{label}</h2>
                <span className="mt-1 inline-block text-sm text-teal-600">View section →</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="font-semibold text-slate-900">Full document</h2>
          <p className="mt-1 text-sm text-slate-600">
            For the complete requirements document (including appendices and document control),
            open the markdown file in the repo:{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">
              requirements-lms-hc-integration.md
            </code>
          </p>
        </div>
      </div>
    </div>
  );
}
