import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  variant?: "primary" | "ghost";
  download?: boolean;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
};

const base =
  "inline-flex h-12 items-center justify-center gap-2 rounded px-6 text-sm font-medium transition-colors";

const variants = {
  primary:
    "bg-fg text-bg hover:bg-[#1A1A1A] dark:bg-fg-dark dark:text-bg-dark dark:hover:bg-[#E5E5E5]",
  ghost:
    "border border-line bg-transparent text-fg hover:border-accent dark:border-line-dark dark:text-fg-dark dark:hover:border-accent",
};

export function Button({
  href,
  variant = "primary",
  download,
  external,
  className,
  children,
}: ButtonProps) {
  const cls = cn(base, variants[variant], className);

  if (download || external || href.startsWith("#")) {
    return (
      <a
        href={href}
        download={download}
        data-cursor="hover"
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={cls}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} data-cursor="hover" className={cls}>
      {children}
    </Link>
  );
}
