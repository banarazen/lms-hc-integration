"use client";

import React, { createContext, useCallback, useContext, useState } from "react";

type ToastType = "info" | "success" | "warning" | "error";

type PrototypeUIContext = {
  toast: { message: string; type: ToastType } | null;
  showToast: (message: string, type?: ToastType, duration?: number) => void;
  syncMessage: string | null;
  showSync: (message: string) => void;
  hideSync: () => void;
};

const Ctx = createContext<PrototypeUIContext | null>(null);

export function PrototypeUIProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  const showToast = useCallback((message: string, type: ToastType = "info", duration = 3000) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), duration);
  }, []);

  const showSync = useCallback((message: string) => setSyncMessage(message), []);
  const hideSync = useCallback(() => setSyncMessage(null), []);

  return (
    <Ctx.Provider value={{ toast, showToast, syncMessage, showSync, hideSync }}>
      {children}
    </Ctx.Provider>
  );
}

export function usePrototypeUI() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("usePrototypeUI must be used within PrototypeUIProvider");
  return ctx;
}

export function PrototypeUIRender({
  renderToast,
  renderSync,
}: {
  renderToast: (message: string, type: ToastType) => React.ReactNode;
  renderSync: (message: string) => React.ReactNode;
}) {
  const { toast, syncMessage } = usePrototypeUI();
  return (
    <>
      {toast && renderToast(toast.message, toast.type)}
      {syncMessage && renderSync(syncMessage)}
    </>
  );
}
