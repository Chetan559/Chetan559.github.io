import type { MetadataRoute } from "next";

const BASE = "https://chetansharma.co"; // TODO: confirm production domain on Vercel

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/contact", "/gallery", "/utilities"].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
  }));
}
