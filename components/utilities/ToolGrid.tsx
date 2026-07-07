"use client";

import { toolGroups, type ToolGroup } from "@/data/tools";
import { Reveal, RevealItem } from "@/components/motion/Reveal";

export function ToolGroups() {
  return (
    <div className="mt-16">
      {toolGroups.map((group) => (
        <ToolGrid key={group.title} group={group} />
      ))}
    </div>
  );
}

function ToolGrid({ group }: { group: ToolGroup }) {
  return (
    <div className="mt-16 first:mt-0">
      <h3 className="font-display text-h3 font-bold uppercase tracking-tight">
        {group.title}
      </h3>
      <p className="mt-2 text-muted dark:text-muted-dark">{group.blurb}</p>
      <Reveal stagger className="mt-6">
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
          {group.tools.map((tool) => (
            <RevealItem key={tool.name}>
              <a
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="group flex aspect-square flex-col items-center justify-center gap-3 rounded border border-line bg-white/60 p-4 text-muted transition-all hover:-translate-y-1 hover:border-accent hover:text-fg hover:shadow-hover dark:border-line-dark dark:bg-white/[0.04] dark:text-muted-dark dark:hover:border-accent dark:hover:text-fg-dark"
              >
                {tool.icon ? (
                  <tool.icon className="h-8 w-8" aria-hidden />
                ) : (
                  <span
                    aria-hidden
                    className="flex h-8 w-8 items-center justify-center rounded bg-accent-soft font-display text-xl font-bold text-accent"
                  >
                    {tool.name.charAt(0)}
                  </span>
                )}
                <span className="text-center text-xs font-medium">
                  {tool.name}
                </span>
              </a>
            </RevealItem>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
