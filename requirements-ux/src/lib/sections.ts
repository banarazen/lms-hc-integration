export const sections = [
  { slug: "executive-summary", label: "Executive Summary", icon: "📋" },
  { slug: "glossary", label: "Glossary", icon: "📖" },
  { slug: "personas", label: "User Personas", icon: "👥" },
  { slug: "feature-scope", label: "Feature Scope", icon: "✅" },
  { slug: "functional-requirements", label: "Functional Requirements", icon: "⚙️" },
  { slug: "nfr", label: "Non-Functional Requirements", icon: "📐" },
  { slug: "ui-specs", label: "UI/UX Specifications", icon: "🎨" },
  { slug: "data-flows", label: "Data Flow Diagrams", icon: "🔄" },
  { slug: "hipaa", label: "HIPAA Compliance", icon: "🔒" },
  { slug: "release-plan", label: "Release Plan", icon: "🚀" },
  { slug: "edge-cases", label: "Edge Cases & Open Questions", icon: "⚠️" },
] as const;

export type SectionSlug = (typeof sections)[number]["slug"];
