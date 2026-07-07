"use client";

import Image from "next/image";
import { gear } from "@/data/gear";
import { SpotlightCard } from "@/components/cards/SpotlightCard";
import { Reveal, RevealItem } from "@/components/motion/Reveal";

export function GearGrid() {
  return (
    <Reveal stagger>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {gear.map((item) => (
          <RevealItem key={item.name} className="h-full">
            <SpotlightCard
              glow="amber"
              className="h-full"
              innerClassName="flex h-full flex-col"
            >
              <div className="flex h-40 items-center justify-center rounded bg-line/40 p-4 dark:bg-line-dark/40">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={200}
                  height={140}
                  className="max-h-32 w-auto object-contain"
                />
              </div>
              <div className="mt-5 flex items-center justify-between gap-3">
                <h3 className="font-display text-xl font-bold uppercase tracking-tight">
                  {item.name}
                </h3>
                <span className="shrink-0 rounded-sm border border-line px-2 py-0.5 text-xs font-medium text-muted dark:border-line-dark dark:text-muted-dark">
                  {item.category}
                </span>
              </div>
              <p className="mt-2 flex-1 text-sm text-muted dark:text-muted-dark">
                {item.note}
              </p>
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="mt-4 text-sm font-medium text-accent underline-offset-4 hover:underline"
                >
                  Where to find it ↗
                </a>
              )}
            </SpotlightCard>
          </RevealItem>
        ))}
      </div>
    </Reveal>
  );
}
