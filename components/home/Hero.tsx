"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { containerStagger, fadeIn, heroLine } from "@/lib/motion";

const HEADLINE = ["Product Guy.", "Creative Problem-", "Solving Enthusiast."];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-[1440px] flex-col justify-center px-6 py-16 md:px-16 xl:px-40">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto]">
        <motion.div
          variants={containerStagger}
          initial={reduce ? "visible" : "hidden"}
          animate="visible"
        >
          <motion.p
            variants={fadeIn}
            className="mb-4 text-sm font-medium uppercase tracking-widest text-muted dark:text-muted-dark"
          >
            {site.eyebrow}
          </motion.p>
          <motion.p variants={fadeIn} className="mb-6 max-w-xl text-body-lg text-muted dark:text-muted-dark">
            {site.intro}
          </motion.p>

          <h1 className="font-display text-hero font-bold uppercase tracking-tight">
            {HEADLINE.map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  variants={heroLine}
                  transition={{ delay: 0.15 + i * 0.12 }}
                  className="block"
                >
                  {i === 0 ? (
                    <>
                      <span className="text-amber">Product</span> Guy.
                    </>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div variants={fadeIn} className="mt-10 flex flex-wrap gap-4">
            <Button href="#projects">View Projects</Button>
            <Button href="/contact" variant="ghost">
              Get in Touch
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative mx-auto hidden lg:block"
        >
          <div
            aria-hidden
            className="absolute -inset-8 rounded-full bg-[radial-gradient(circle_at_30%_30%,#2557A733,transparent_60%),radial-gradient(circle_at_70%_70%,#F5A62333,transparent_60%)] blur-2xl"
          />
          <div className="relative overflow-hidden rounded-card border border-line dark:border-line-dark">
            <Image
              src="/images/photo.png"
              alt="Chetan Sharma"
              width={400}
              height={400}
              priority
              className="h-[400px] w-[400px] object-cover"
            />
          </div>
        </motion.div>
      </div>

      {!reduce && (
        <motion.a
          href="#about"
          aria-label="Scroll to about section"
          data-cursor="hover"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted dark:text-muted-dark"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </motion.a>
      )}
    </section>
  );
}
