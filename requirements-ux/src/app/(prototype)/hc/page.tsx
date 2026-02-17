"use client";

import { Suspense } from "react";
import { HCPageContent } from "@/components/prototype/HCPageContent";

export default function HCPage() {
  return (
    <Suspense fallback={<div className="flex h-full items-center justify-center">Loading...</div>}>
      <HCPageContent />
    </Suspense>
  );
}
