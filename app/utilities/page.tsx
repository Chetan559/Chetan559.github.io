import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { GearGrid } from "@/components/utilities/GearGrid";

export const metadata: Metadata = {
  title: "Utilities",
  description: "The gear behind the work.",
};

export default function UtilitiesPage() {
  return (
    <Section title="Gear / Utilities" eyebrow="Daily drivers">
      <GearGrid />
    </Section>
  );
}
