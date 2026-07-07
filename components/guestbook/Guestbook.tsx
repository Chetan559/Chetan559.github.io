"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Giscus from "@giscus/react";

export function Guestbook() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Wait for the resolved theme so the widget loads with the right colors
  if (!mounted) {
    return <div className="min-h-[400px]" aria-hidden />;
  }

  return (
    <div className="min-h-[400px]">
      <Giscus
        repo="Chetan559/Chetan559.github.io"
        repoId="R_kgDOIX1yWA"
        category="Announcements"
        categoryId="DIC_kwDOIX1yWM4DArww"
        mapping="specific"
        term="Guestbook"
        strict="1"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={resolvedTheme === "dark" ? "noborder_dark" : "noborder_light"}
        lang="en"
        loading="lazy"
      />
    </div>
  );
}
