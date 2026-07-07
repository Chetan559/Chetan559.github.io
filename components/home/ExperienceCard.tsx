"use client";

import type { Experience } from "@/data/experience";
import { SpotlightCard } from "@/components/cards/SpotlightCard";

export function ExperienceCard({ entry }: { entry: Experience }) {
  return (
    <SpotlightCard glow={entry.accent === "amber" ? "amber" : "blue"}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-display text-h3 font-bold uppercase tracking-tight">
          {entry.role}
        </h3>
        <p className="text-sm text-muted dark:text-muted-dark">
          {entry.start} — {entry.end}
        </p>
      </div>
      <p className="mt-1 text-sm font-medium">
        {entry.company}
        <span className="text-muted dark:text-muted-dark"> · {entry.type}</span>
      </p>
      <ul className="mt-5 space-y-2">
        {entry.bullets.map((bullet) => (
          <li
            key={bullet.slice(0, 24)}
            className="flex gap-3 text-muted dark:text-muted-dark"
          >
            <span
              aria-hidden
              className={
                entry.accent === "amber" ? "text-amber" : "text-accent"
              }
            >
              —
            </span>
            {bullet}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap gap-2">
        {entry.tech.map((t) => (
          <span
            key={t}
            className="rounded-sm border border-line px-3 py-1 text-xs font-medium text-muted dark:border-line-dark dark:text-muted-dark"
          >
            {t}
          </span>
        ))}
      </div>
    </SpotlightCard>
  );
}
