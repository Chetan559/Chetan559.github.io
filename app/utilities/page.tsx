import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { GearGrid } from "@/components/utilities/GearGrid";
import { ToolGroups } from "@/components/utilities/ToolGrid";

export const metadata: Metadata = {
  title: "Utilities",
  description:
    "The hardware, system, coding tools, and software behind the work.",
};

export default function UtilitiesPage() {
  return (
    <Section title="Gear / Utilities" eyebrow="Daily drivers">
      <p className="mb-12 max-w-3xl text-body-lg text-muted dark:text-muted-dark">
        In case you're wondering what I use — here's the hardware and software
        I code with on a daily basis. This list is always evolving.
      </p>

      <h3 className="mb-6 font-display text-h3 font-bold uppercase tracking-tight">
        Everyday
      </h3>
      <GearGrid />

      <ToolGroups />
    </Section>
  );
}
