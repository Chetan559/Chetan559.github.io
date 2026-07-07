"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { site } from "@/data/site";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { containerStagger, fadeUpItem } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled &&
          "border-b border-line bg-bg/80 backdrop-blur dark:border-line-dark dark:bg-bg-dark/80"
      )}
    >
      <nav className="mx-auto flex h-20 w-full max-w-[1440px] items-center justify-between px-6 md:px-16 xl:px-40">
        <Link
          href="/"
          data-cursor="hover"
          className="font-display text-xl font-bold uppercase tracking-tight"
          onClick={() => setOpen(false)}
        >
          Chetan Sharma
        </Link>

        <div className="hidden items-center gap-6 lg:flex xl:gap-8">
          {site.nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              data-cursor="hover"
              className="text-sm text-fg transition-colors hover:text-muted dark:text-fg-dark dark:hover:text-muted-dark"
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            data-cursor="hover"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded border border-line dark:border-line-dark"
          >
            <span
              className={cn(
                "h-0.5 w-5 bg-fg transition-transform dark:bg-fg-dark",
                open && "translate-y-1 rotate-45"
              )}
            />
            <span
              className={cn(
                "h-0.5 w-5 bg-fg transition-transform dark:bg-fg-dark",
                open && "-translate-y-1 -rotate-45"
              )}
            />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-20 z-40 bg-bg dark:bg-bg-dark lg:hidden"
          >
            <motion.ul
              variants={containerStagger}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-2 px-6 py-10"
            >
              {site.nav.map((item) => (
                <motion.li key={item.label} variants={fadeUpItem}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 font-display text-4xl font-bold uppercase tracking-tight"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
