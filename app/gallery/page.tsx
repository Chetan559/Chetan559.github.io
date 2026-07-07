import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos and moments.",
};

export default function GalleryPage() {
  return (
    <Section title="Gallery" eyebrow="Frames">
      <GalleryGrid />
    </Section>
  );
}
