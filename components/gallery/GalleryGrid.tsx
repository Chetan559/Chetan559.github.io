"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { gallery } from "@/data/gallery";

export function GalleryGrid() {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setActive((i) =>
        i === null ? null : (i + dir + gallery.length) % gallery.length
      ),
    []
  );

  useEffect(() => {
    if (active === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, step]);

  return (
    <>
      <div className="columns-2 gap-4 md:columns-3">
        {gallery.map((img, i) => (
          <button
            key={img.src}
            type="button"
            data-cursor="hover"
            onClick={() => setActive(i)}
            className="mb-4 block w-full overflow-hidden rounded-card border border-line dark:border-line-dark"
            aria-label={`Open ${img.alt}`}
          >
            <motion.div layoutId={img.src}>
              <Image
                src={img.src}
                alt={img.alt}
                width={600}
                height={800}
                sizes="(max-width: 768px) 50vw, 33vw"
                className="h-auto w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </motion.div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-6 backdrop-blur"
            role="dialog"
            aria-modal="true"
            aria-label={gallery[active].alt}
          >
            <button
              type="button"
              aria-label="Previous photo"
              data-cursor="hover"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 p-3 text-3xl text-white/80 hover:text-white"
            >
              ←
            </button>
            <motion.div
              layoutId={gallery[active].src}
              onClick={(e) => e.stopPropagation()}
              className="max-h-full overflow-hidden rounded-card shadow-modal"
            >
              <Image
                src={gallery[active].src}
                alt={gallery[active].alt}
                width={1200}
                height={900}
                sizes="90vw"
                className="max-h-[85vh] w-auto object-contain"
              />
            </motion.div>
            <button
              type="button"
              aria-label="Next photo"
              data-cursor="hover"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 p-3 text-3xl text-white/80 hover:text-white"
            >
              →
            </button>
            <button
              type="button"
              aria-label="Close gallery"
              data-cursor="hover"
              onClick={close}
              className="absolute right-4 top-4 p-3 text-2xl text-white/80 hover:text-white"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
