import type { MetadataRoute } from "next";
import { blogs } from "@/data/blogs";

const BASE = "https://chetansharma.co"; // TODO: confirm production domain on Vercel

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/contact", "/blog", "/gallery", "/utilities"].map(
    (path) => ({
      url: `${BASE}${path}`,
      lastModified: new Date(),
    })
  );
  const posts = blogs.map((b) => ({
    url: `${BASE}/blog/${b.slug}`,
    lastModified: new Date(b.date),
  }));
  return [...pages, ...posts];
}
