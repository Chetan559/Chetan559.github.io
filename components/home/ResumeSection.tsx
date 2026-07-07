import { resumes } from "@/data/resumes";
import { Section } from "@/components/layout/Section";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { SpotlightCard } from "@/components/cards/SpotlightCard";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function ResumeSection() {
  return (
    <Section id="resume" title="Resume" eyebrow="On paper">
      <Reveal stagger>
        <div className="grid gap-6 md:grid-cols-2">
          {resumes.map((resume) => (
            <RevealItem key={resume.label} className="h-full">
              <SpotlightCard
                glow={resume.accent}
                className="h-full"
                innerClassName="flex h-full flex-col"
              >
                <h3 className="font-display text-h3 font-bold uppercase tracking-tight">
                  {resume.label}
                </h3>
                <p className="mt-3 flex-1 text-muted dark:text-muted-dark">
                  {resume.blurb}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {resume.highlights.map((h) => (
                    <span
                      key={h.label}
                      className={cn(
                        "rounded-sm border px-3 py-1 text-xs font-medium",
                        h.featured
                          ? "border-amber text-amber"
                          : "border-line text-muted dark:border-line-dark dark:text-muted-dark"
                      )}
                    >
                      {h.label}
                    </span>
                  ))}
                </div>
                <div className="mt-8">
                  <Button href={resume.file} download>
                    Download PDF
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                    </svg>
                  </Button>
                </div>
              </SpotlightCard>
            </RevealItem>
          ))}
        </div>
        <RevealItem>
          <p className="mt-8 text-sm text-muted dark:text-muted-dark">
            Prefer a vCard?{" "}
            <a
              href="/vcard.vcf"
              download
              data-cursor="hover"
              className="font-medium text-accent underline-offset-4 hover:underline"
            >
              Save my contact
            </a>
            .
          </p>
        </RevealItem>
      </Reveal>
    </Section>
  );
}
