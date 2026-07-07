import type { Metadata } from "next";
import { site } from "@/data/site";
import { Section } from "@/components/layout/Section";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Chetan Sharma.",
};

export default function ContactPage() {
  return (
    <Section title="Let's Talk" eyebrow="Contact">
      <div className="grid gap-16 lg:grid-cols-[3fr_2fr]">
        <ContactForm />
        <div>
          <p className="text-body-lg text-muted dark:text-muted-dark">
            Have a project, an internship lead, or just want to argue about
            which anime arc is peak? My inbox is open.
          </p>
          <a
            href={`mailto:${site.email}`}
            data-cursor="hover"
            className="mt-6 inline-block font-medium text-accent underline-offset-4 hover:underline"
          >
            {site.email}
          </a>
          <div className="mt-10 flex flex-wrap gap-6">
            {site.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="text-sm text-muted transition-colors hover:text-fg dark:text-muted-dark dark:hover:text-fg-dark"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
