import Link from "next/link";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-line dark:border-line-dark">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-16 md:px-16 xl:px-40">
        <p className="font-display text-display font-bold uppercase tracking-tight">
          Let&apos;s build{" "}
          <span className="text-accent">something.</span>
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          {site.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="text-sm text-muted transition-colors hover:text-fg dark:text-muted-dark dark:hover:text-fg-dark"
            >
              {s.label}
            </a>
          ))}
          <a
            href="/vcard.vcf"
            download
            data-cursor="hover"
            className="text-sm text-muted transition-colors hover:text-fg dark:text-muted-dark dark:hover:text-fg-dark"
          >
            Save contact
          </a>
          <Link
            href="/contact"
            data-cursor="hover"
            className="text-sm text-muted transition-colors hover:text-fg dark:text-muted-dark dark:hover:text-fg-dark"
          >
            Contact
          </Link>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-sm text-muted dark:border-line-dark dark:text-muted-dark">
          <p>© 2026 Chetan Sharma</p>
          <a href="#" data-cursor="hover" className="hover:text-fg dark:hover:text-fg-dark">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
