"use client";

export function NavCrosshair({ text }: { text: string }) {
  return (
    <div className="fixed left-1/2 top-1/2 z-[9500] -translate-x-1/2 -translate-y-1/2 text-center">
      <div className="mx-auto mb-3 h-12 w-12 animate-spin rounded-full border-3 border-slate-200 border-t-[#1a8a8a]" />
      <div className="rounded-lg bg-[#1b2332] px-4 py-2 text-sm text-white">{text}</div>
    </div>
  );
}
