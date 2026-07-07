import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogs, getBlog } from "@/data/blogs";
import { BlogBlocks } from "@/components/blog/BlogBlocks";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlog(slug);
  if (!blog) return {};
  return {
    title: blog.title,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: "article",
      images: [{ url: blog.cover }],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const blog = getBlog(slug);
  if (!blog) notFound();

  return (
    <article>
      {/* Header with background cover image */}
      <header className="relative flex min-h-[55vh] items-end overflow-hidden">
        <Image
          src={blog.cover}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
        <div className="relative mx-auto w-full max-w-[1440px] px-6 pb-14 pt-32 md:px-16 xl:px-40">
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-sm bg-white/15 px-2 py-0.5 text-xs font-medium text-white backdrop-blur"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="mt-4 max-w-4xl font-display text-display font-bold uppercase tracking-tight text-white">
            {blog.title}
          </h1>
          <p className="mt-4 text-sm text-white/80">
            {new Date(blog.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            · {blog.readTime} · Chetan Sharma
          </p>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[1440px] px-6 py-16 md:px-16 xl:px-40">
        <BlogBlocks blocks={blog.blocks} />

        <div className="mx-auto mt-16 flex max-w-3xl items-center justify-between border-t border-line pt-8 dark:border-line-dark">
          <Link
            href="/blog"
            data-cursor="hover"
            className="text-sm font-medium text-accent underline-offset-4 hover:underline"
          >
            ← All posts
          </Link>
          <Link
            href="/contact"
            data-cursor="hover"
            className="text-sm font-medium text-muted transition-colors hover:text-fg dark:text-muted-dark dark:hover:text-fg-dark"
          >
            Discuss this post →
          </Link>
        </div>
      </div>
    </article>
  );
}
