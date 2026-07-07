"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { containerStagger, fadeUpItem, viewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  variants?: Variants;
  stagger?: boolean;
  delay?: number;
  className?: string;
};

export function Reveal({
  children,
  variants,
  stagger = false,
  delay = 0,
  className,
}: RevealProps) {
  const reduce = useReducedMotion();
  const v = variants ?? (stagger ? containerStagger : fadeUpItem);

  return (
    <motion.div
      variants={v}
      initial={reduce ? "visible" : "hidden"}
      whileInView="visible"
      viewport={viewport}
      transition={delay ? { delay } : undefined}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={fadeUpItem} className={cn(className)}>
      {children}
    </motion.div>
  );
}
