import { projects } from "@/data/projects";
import { Section } from "@/components/layout/Section";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { ProjectCard } from "./ProjectCard";

export function Projects() {
  return (
    <Section id="projects" title="Projects" eyebrow="Things I've shipped">
      <Reveal stagger>
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <RevealItem key={project.slug} className="h-full">
              <ProjectCard project={project} />
            </RevealItem>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
