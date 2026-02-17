"use client";

import { useEffect, useState } from "react";

type ToastType = "info" | "success" | "warning" | "error";

const styles: Record<ToastType, string> = {
  info: "bg-[#1a8a8a]",
  success: "bg-[#2d9e6a]",
  warning: "bg-[#d4872e]",
  error: "bg-[#c9453a]",
};

export function Toast({
  message,
  type = "info",
  onDismiss,
}: {
  message: string;
  type?: ToastType;
  onDismiss?: () => void;
}) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = requestAnimationFrame(() => setShow(true));
    return () => cancelAnimationFrame(t);
  }, []);
  useEffect(() => {
    if (!onDismiss) return;
    const id = setTimeout(() => {
      setShow(false);
      setTimeout(onDismiss, 300);
    }, 3000);
    return () => clearTimeout(id);
  }, [onDismiss]);
  return (
    <div
      className={`fixed right-5 top-5 z-[10000] rounded-lg px-6 py-3 text-sm font-medium text-white shadow-lg transition-transform duration-300 ${
        styles[type]
      } ${show ? "translate-x-0" : "translate-x-full"}`}
    >
      {message}
    </div>
  );
}
