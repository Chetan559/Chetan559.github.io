import React from "react";

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}) {
  return (
    <div
      {...props}
      className={`group flex overflow-hidden p-2 [--duration:8s] [--gap:1rem] [gap:var(--gap)] ${className}`}
    >
      {Array.from({ length: repeat }, (_, i) => (
        <div
          key={i}
          className={`flex shrink-0 justify-around [gap:var(--gap)] ${
            !vertical
              ? "animate-marquee flex-row"
              : "animate-marquee-vertical flex-col"
          } ${
            pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""
          } ${reverse ? "[animation-direction:reverse]" : ""}`}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
