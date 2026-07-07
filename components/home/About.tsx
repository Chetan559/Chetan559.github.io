import Image from "next/image";
import { site } from "@/data/site";
import { education } from "@/data/education";
import { Section } from "@/components/layout/Section";
import { Reveal, RevealItem } from "@/components/motion/Reveal";

export function About() {
  return (
    <Section id="about" title="About" eyebrow="Who I am">
      <div className="grid gap-16 lg:grid-cols-[3fr_2fr]">
        <Reveal stagger>
          <div className="space-y-6">
            {site.about.map((paragraph) => (
              <RevealItem key={paragraph.slice(0, 24)}>
                <p className="text-body-lg text-muted dark:text-muted-dark">
                  {paragraph}
                </p>
              </RevealItem>
            ))}
            <RevealItem>
              <div className="flex flex-wrap gap-3 pt-2">
                {site.hobbies.map((hobby) => (
                  <span
                    key={hobby.label}
                    className="inline-flex h-10 items-center gap-2 rounded border border-line px-4 text-sm dark:border-line-dark"
                  >
                    <span aria-hidden className="text-amber">
                      {hobby.emoji}
                    </span>
                    {hobby.label}
                  </span>
                ))}
              </div>
            </RevealItem>
          </div>
        </Reveal>

        <Reveal className="space-y-8">
          <div className="overflow-hidden rounded-card border border-line dark:border-line-dark">
            <Image
              src="/images/Photocard1.jpg"
              alt="Chetan Sharma"
              width={520}
              height={380}
              className="h-64 w-full object-cover"
            />
          </div>
          <div>
            <h3 className="mb-4 font-display text-h3 font-bold uppercase tracking-tight">
              Education
            </h3>
            <ul>
              {education.map((entry) => (
                <li
                  key={entry.degree}
                  className="border-t border-line py-4 dark:border-line-dark"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="font-medium">{entry.degree}</p>
                    <p className="shrink-0 text-sm text-muted dark:text-muted-dark">
                      {entry.year}
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-muted dark:text-muted-dark">
                    {entry.school}
                  </p>
                  <p className="mt-1 text-sm font-medium text-accent">
                    {entry.result}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
