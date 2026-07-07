"use client";

import Image from "next/image";
import Link from "next/link";
import type { Blog } from "@/data/blogs";
import { SpotlightCard } from "@/components/cards/SpotlightCard";

export function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Link
      href={`/blog/${blog.slug}`}
      data-cursor="hover"
      className="block h-full"
      aria-label={`Read: ${blog.title}`}
    >
      <SpotlightCard
        glow={blog.accent}
        className="h-full"
        innerClassName="flex h-full flex-col"
      >
        <div className="relative h-52 w-full overflow-hidden">
          <Image
            src={blog.cover}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-3 left-4 flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-sm bg-white/15 px-2 py-0.5 text-xs font-medium text-white backdrop-blur"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-1 flex-col p-8">
          <p className="text-sm text-muted dark:text-muted-dark">
            {new Date(blog.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}{" "}
            · {blog.readTime}
          </p>
          <h3 className="mt-2 font-display text-h3 font-bold uppercase tracking-tight">
            {blog.title}
          </h3>
          <p className="mt-3 flex-1 text-muted dark:text-muted-dark">
            {blog.excerpt}
          </p>
          <p className="mt-5 text-sm font-medium text-accent">Read post →</p>
        </div>
      </SpotlightCard>
    </Link>
  );
}
