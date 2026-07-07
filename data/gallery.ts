export type GalleryImage = { src: string; alt: string };

export const gallery: GalleryImage[] = Array.from({ length: 25 }, (_, i) => ({
  src: `/images/gallery/photo${i + 1}.jpg`,
  alt: `Gallery photo ${i + 1}`,
}));
