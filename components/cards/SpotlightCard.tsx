"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";

export type SpotlightCardProps = {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  glow?: "blue" | "amber" | "dual";
};

const GLOWS = {
  blue: ["rgba(37,87,167,0.65)", "rgba(37,87,167,0.25)"],
  amber: ["rgba(245,166,35,0.65)", "rgba(245,166,35,0.25)"],
  dual: ["rgba(37,87,167,0.55)", "rgba(245,166,35,0.25)"],
} as const;

export function SpotlightCard({
  children,
  className,
  innerClassName,
  glow = "dual",
}: SpotlightCardProps) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const [c1, c2] = GLOWS[glow];
  const spotlight = useMotionTemplate`radial-gradient(320px circle at ${mx}px ${my}px, ${c1}, ${c2} 45%, transparent 70%)`;

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  }

  return (
    <div
      onMouseMove={reduce ? undefined : onMouseMove}
      className={cn(
        "group relative overflow-hidden rounded-card border border-line bg-white/60 backdrop-blur-md transition-shadow duration-300 hover:shadow-hover dark:border-line-dark dark:bg-white/[0.04]",
        className
      )}
    >
      {!reduce && (
        <>
          {/* glowing border ring following the mouse */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-card opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: spotlight,
              padding: "1.5px",
              maskImage:
                "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              WebkitMaskImage:
                "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              maskComposite: "exclude",
              WebkitMaskComposite: "xor",
            }}
          />
          {/* soft outer glow */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-card opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-20"
            style={{ background: spotlight }}
          />
        </>
      )}
      <div className={cn("relative p-8", innerClassName)}>{children}</div>
    </div>
  );
}
