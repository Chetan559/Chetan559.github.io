import type { Metadata } from "next";
import { blogs } from "@/data/blogs";
import { Section } from "@/components/layout/Section";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { BlogCard } from "@/components/blog/BlogCard";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on AI/ML engineering, product building, and the occasional origami tangent.",
};

export default function BlogPage() {
  const sorted = [...blogs].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <Section title="Blog" eyebrow="Writing">
      <Reveal stagger>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {sorted.map((blog) => (
            <RevealItem key={blog.slug} className="h-full">
              <BlogCard blog={blog} />
            </RevealItem>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
