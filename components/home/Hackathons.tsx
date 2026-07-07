import { hackathons, hackathonsIntro } from "@/data/hackathons";
import { Section } from "@/components/layout/Section";
import { Reveal, RevealItem } from "@/components/motion/Reveal";

export function Hackathons() {
  return (
    <Section id="hackathons" title="Hackathons" eyebrow="I like building things">
      <Reveal stagger>
        <RevealItem>
          <p className="max-w-3xl text-body-lg text-muted dark:text-muted-dark">
            {hackathonsIntro}
          </p>
        </RevealItem>
        <div className="mt-12">
          {hackathons.map((h) => (
            <RevealItem key={h.title}>
              <div className="group grid gap-2 border-t border-line py-6 transition-colors last:border-b hover:bg-line/20 dark:border-line-dark dark:hover:bg-line-dark/20 md:grid-cols-[1fr_auto] md:items-baseline md:gap-8">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-2xl font-bold uppercase tracking-tight transition-colors group-hover:text-accent">
                      {h.link ? (
                        <a
                          href={h.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor="hover"
                        >
                          {h.title} <span aria-hidden>↗</span>
                        </a>
                      ) : (
                        h.title
                      )}
                    </h3>
                    {h.highlight && (
                      <span className="rounded-sm border border-amber px-2 py-0.5 text-xs font-medium text-amber">
                        {h.highlight}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 max-w-2xl text-sm text-muted dark:text-muted-dark">
                    {h.description}
                  </p>
                </div>
                <div className="text-sm text-muted dark:text-muted-dark md:text-right">
                  <p className="font-medium text-fg dark:text-fg-dark">{h.dates}</p>
                  <p className="mt-1">{h.location}</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
