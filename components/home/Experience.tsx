import { experience } from "@/data/experience";
import { Section } from "@/components/layout/Section";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { ExperienceCard } from "./ExperienceCard";

export function Experience() {
  return (
    <Section id="experience" title="Experience" eyebrow="Where I've worked">
      <Reveal stagger>
        <div className="relative space-y-8 lg:border-l lg:border-line lg:pl-10 lg:dark:border-line-dark">
          {experience.map((entry) => (
            <RevealItem key={entry.company} className="relative">
              <span
                aria-hidden
                className={`absolute -left-[45px] top-10 hidden h-2.5 w-2.5 rounded-full lg:block ${
                  entry.accent === "amber" ? "bg-amber" : "bg-accent"
                }`}
              />
              <ExperienceCard entry={entry} />
            </RevealItem>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
