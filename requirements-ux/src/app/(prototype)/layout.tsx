import { PrototypeLayoutClient } from "@/components/prototype/PrototypeLayoutClient";

export default function PrototypeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <PrototypeLayoutClient>{children}</PrototypeLayoutClient>;
}
