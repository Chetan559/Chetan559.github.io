import Image from "next/image";
import type { BlogBlock } from "@/data/blogs";

function VideoBlock({
  block,
}: {
  block: Extract<BlogBlock, { type: "video" }>;
}) {
  return (
    <figure className="my-10">
      <div className="overflow-hidden rounded-card border border-line dark:border-line-dark">
        {block.youtubeId ? (
          <div className="relative aspect-video">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${block.youtubeId}`}
              title={block.caption ?? "Embedded video"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        ) : block.src ? (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <video src={block.src} controls playsInline className="w-full" />
        ) : null}
      </div>
      {block.caption && (
        <figcaption className="mt-3 text-sm text-muted dark:text-muted-dark">
          {block.caption}
        </figcaption>
      )}
    </figure>
  );
}

export function BlogBlocks({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="mx-auto max-w-3xl">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading":
            return (
              <h2
                key={i}
                className="mt-14 mb-5 font-display text-h3 font-bold uppercase tracking-tight"
              >
                {block.text}
              </h2>
            );
          case "paragraph":
            return (
              <p
                key={i}
                className="my-5 text-body-lg text-muted dark:text-muted-dark"
              >
                {block.text}
              </p>
            );
          case "image":
            return (
              <figure key={i} className="my-10">
                <div className="overflow-hidden rounded-card border border-line dark:border-line-dark">
                  <Image
                    src={block.src}
                    alt={block.alt}
                    width={1200}
                    height={800}
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="h-auto w-full object-cover"
                  />
                </div>
                {block.caption && (
                  <figcaption className="mt-3 text-sm text-muted dark:text-muted-dark">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );
          case "video":
            return <VideoBlock key={i} block={block} />;
          case "quote":
            return (
              <blockquote
                key={i}
                className="my-10 border-l-2 border-amber pl-6"
              >
                <p className="font-display text-2xl font-medium">
                  {block.text}
                </p>
                {block.by && (
                  <cite className="mt-2 block text-sm not-italic text-muted dark:text-muted-dark">
                    — {block.by}
                  </cite>
                )}
              </blockquote>
            );
        }
      })}
    </div>
  );
}
