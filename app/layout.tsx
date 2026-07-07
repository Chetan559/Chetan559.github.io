import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/motion/CustomCursor";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Chetan Sharma — AI/ML Engineer",
    template: "%s — Chetan Sharma",
  },
  description:
    "Final-year Computer Engineering student and AI/ML Engineer Intern building RAG pipelines, document intelligence, and natural-language-to-web-app tools.",
  openGraph: {
    title: "Chetan Sharma — AI/ML Engineer",
    description:
      "Product guy and creative problem-solving enthusiast building real-world AI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${oswald.variable} ${inter.variable}`}
    >
      <body className="font-sans">
        <ThemeProvider>
          <CustomCursor />
          <Navbar />
          <main className="pt-20">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
