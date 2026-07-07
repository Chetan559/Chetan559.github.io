import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "selector",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.ts",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-oswald)", "Impact", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      colors: {
        bg: { DEFAULT: "#FFFFFF", dark: "#111111" },
        fg: { DEFAULT: "#000000", dark: "#FFFFFF" },
        muted: { DEFAULT: "#444444", dark: "#D4D4D8" },
        line: { DEFAULT: "#E5E7EB", dark: "#333333" },
        accent: { DEFAULT: "#2557A7", soft: "#2557A71A" },
        amber: { DEFAULT: "#F5A623", soft: "#F5A6231A" },
        cyan: "#00D1FF",
        warn: "#FFF100",
      },
      borderRadius: {
        none: "0",
        sm: "2px",
        DEFAULT: "4px",
        card: "24px",
      },
      fontSize: {
        hero: [
          "clamp(48px, 9vw, 130px)",
          { lineHeight: "0.92", letterSpacing: "-0.02em" },
        ],
        display: [
          "clamp(36px, 6vw, 80px)",
          { lineHeight: "0.95", letterSpacing: "-0.01em" },
        ],
        h3: ["clamp(24px, 3vw, 40px)", { lineHeight: "1.05" }],
        "body-lg": ["20px", { lineHeight: "1.5" }],
      },
      boxShadow: {
        hover: "0 8px 30px rgba(0,0,0,0.12)",
        modal: "0 24px 60px rgba(0,0,0,0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
