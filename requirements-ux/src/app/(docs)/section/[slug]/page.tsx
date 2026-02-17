import Link from "next/link";
import { notFound } from "next/navigation";
import { sections, type SectionSlug } from "@/lib/sections";
import { ExecutiveSummary } from "@/components/sections/ExecutiveSummary";
import { Glossary } from "@/components/sections/Glossary";
import { Personas } from "@/components/sections/Personas";
import { FeatureScope } from "@/components/sections/FeatureScope";
import { FunctionalRequirements } from "@/components/sections/FunctionalRequirements";
import { NFR } from "@/components/sections/NFR";
import { UISpecs } from "@/components/sections/UISpecs";
import { DataFlows } from "@/components/sections/DataFlows";
import { HIPAA } from "@/components/sections/HIPAA";
import { ReleasePlan } from "@/components/sections/ReleasePlan";
import { EdgeCases } from "@/components/sections/EdgeCases";

const sectionComponents: Record<SectionSlug, React.ComponentType> = {
  "executive-summary": ExecutiveSummary,
  glossary: Glossary,
  personas: Personas,
  "feature-scope": FeatureScope,
  "functional-requirements": FunctionalRequirements,
  nfr: NFR,
  "ui-specs": UISpecs,
  "data-flows": DataFlows,
  hipaa: HIPAA,
  "release-plan": ReleasePlan,
  "edge-cases": EdgeCases,
};

export async function generateStaticParams() {
  return sections.map(({ slug }) => ({ slug }));
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const validSlug = slug as SectionSlug;
  if (!sections.some((s) => s.slug === validSlug)) notFound();
  const SectionContent = sectionComponents[validSlug];
  const sectionLabel = sections.find((s) => s.slug === validSlug)?.label ?? slug;
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="border-b border-slate-200 bg-white px-10 py-4">
        <Link href="/" className="text-sm text-teal-600 hover:text-teal-700">
          ← Back to overview
        </Link>
        <h1 className="mt-2 text-xl font-bold text-slate-900">{sectionLabel}</h1>
      </div>
      <article className="px-10 py-8">
        <SectionContent />
      </article>
    </div>
  );
}
