"use client";

import type { Project } from "@/data/projects";
import { TiltCard } from "@/components/cards/TiltCard";
import { DocuMindMark } from "@/components/logos/DocuMindMark";

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.72.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.35.96.11-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.78 1.05.78 2.12v3.15c0 .3.21.66.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <path d="M15 3h6v6M10 14L21 3" />
    </svg>
  );
}

function ProjectMark({ project }: { project: Project }) {
  if (project.mark === "documind") {
    return <DocuMindMark size={44} className="text-fg dark:text-fg-dark" />;
  }
  return (
    <span
      aria-hidden
      className={`flex h-11 w-11 items-center justify-center rounded font-display text-xl font-bold ${
        project.accent === "amber"
          ? "bg-amber-soft text-amber"
          : "bg-accent-soft text-accent"
      }`}
    >
      {project.title.charAt(0)}
    </span>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <TiltCard
      glow={project.accent === "amber" ? "amber" : "blue"}
      className="h-full"
      innerClassName="flex h-full flex-col p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <ProjectMark project={project} />
        <div className="flex gap-3 text-muted dark:text-muted-dark">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} on GitHub`}
              data-cursor="hover"
              className="transition-colors hover:text-fg dark:hover:text-fg-dark"
            >
              <GitHubIcon />
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live site`}
              data-cursor="hover"
              className="transition-colors hover:text-fg dark:hover:text-fg-dark"
            >
              <ExternalIcon />
            </a>
          )}
        </div>
      </div>

      <h3 className="mt-6 font-display text-h3 font-bold uppercase tracking-tight">
        {project.title}
      </h3>
      <p className="mt-1 text-sm font-medium text-accent">{project.tagline}</p>
      <p className="mt-4 flex-1 text-muted dark:text-muted-dark">
        {project.description}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="rounded-sm border border-line px-3 py-1 text-xs font-medium text-muted dark:border-line-dark dark:text-muted-dark"
          >
            {t}
          </span>
        ))}
      </div>
    </TiltCard>
  );
}
