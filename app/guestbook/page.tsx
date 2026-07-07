import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Guestbook } from "@/components/guestbook/Guestbook";

export const metadata: Metadata = {
  title: "Guestbook",
  description: "Sign the guestbook — leave a note, some wisdom, or a joke.",
};

export default function GuestbookPage() {
  return (
    <Section title="Guestbook" eyebrow="Say hi">
      <div className="max-w-3xl">
        <p className="text-body-lg text-muted dark:text-muted-dark">
          Leave a message below — it can be anything. Appreciation,
          information, wisdom, something good or bad about me, or even humor.
        </p>
        <p className="mt-3 text-sm text-muted dark:text-muted-dark">
          Be kind, be respectful, and keep it creative. Sign in with GitHub to
          write on the wall.
        </p>
        <div className="mt-12">
          <Guestbook />
        </div>
      </div>
    </Section>
  );
}
