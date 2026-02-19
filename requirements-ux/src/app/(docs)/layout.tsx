import Link from "next/link";
import { sections } from "@/lib/sections";

export default function DocsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen">
      <aside className="fixed left-0 top-0 z-20 h-full w-64 border-r border-slate-200 bg-slate-900 text-white">
        <div className="flex h-14 items-center border-b border-slate-700 px-4">
          <Link href="/" className="font-semibold text-teal-400">
            LMS ↔ HC Requirements
          </Link>
        </div>
        <nav className="overflow-y-auto py-4">
          <ul className="space-y-0.5 px-2">
            <li>
              <Link
                href="/lms"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
              >
                <span aria-hidden>📋</span>
                AI Lead Manager (LMS)
              </Link>
            </li>
            <li>
              <Link
                href="/hc"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
              >
                <span aria-hidden>💬</span>
                HyperConnect
              </Link>
            </li>
            <li>
              <Link
                href="/diagrams"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
              >
                <span aria-hidden>📊</span>
                Data Flow Diagrams
              </Link>
            </li>
            <li>
              <Link
                href="/journey"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
              >
                <span aria-hidden>🎯</span>
                E2E Journey Flows
              </Link>
            </li>
            {sections.map(({ slug, label, icon }) => (
              <li key={slug}>
                <Link
                  href={`/section/${slug}`}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
                >
                  <span aria-hidden>{icon}</span>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="min-h-screen flex-1 pl-64">{children}</main>
    </div>
  );
}
