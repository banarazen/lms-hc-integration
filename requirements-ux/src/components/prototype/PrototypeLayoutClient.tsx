"use client";

import Link from "next/link";
import { PrototypeUIProvider, PrototypeUIRender, usePrototypeUI } from "./PrototypeUI";
import { Toast } from "./Toast";
import { SyncIndicator } from "./SyncIndicator";

function ProtoUI() {
  const { toast, syncMessage } = usePrototypeUI();
  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} />}
      {syncMessage && <SyncIndicator message={syncMessage} />}
    </>
  );
}

export function PrototypeLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <PrototypeUIProvider>
      <div className="flex h-screen flex-col overflow-hidden bg-[#f4f5f7]">
        <div className="flex shrink-0 items-center justify-between border-b border-[#e0e4ea] bg-white px-4 py-2">
          <Link
            href="/"
            className="text-sm font-medium text-[#1a8a8a] hover:text-[#147070]"
          >
            ← Back to requirements
          </Link>
          <span className="text-xs text-slate-500">LMS ↔ HyperConnect Prototype</span>
        </div>
        <div className="min-h-0 flex-1">{children}</div>
      </div>
      <ProtoUI />
    </PrototypeUIProvider>
  );
}
