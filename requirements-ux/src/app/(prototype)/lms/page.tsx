"use client";

import { Suspense } from "react";
import { LMSPageContent } from "@/components/prototype/LMSPageContent";

export default function LMSPage() {
  return (
    <Suspense fallback={<div className="flex h-full items-center justify-center">Loading...</div>}>
      <LMSPageContent />
    </Suspense>
  );
}
