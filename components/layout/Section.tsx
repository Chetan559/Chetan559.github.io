import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  title?: string;
  eyebrow?: string;
  className?: string;
  children: React.ReactNode;
};

export function Section({ id, title, eyebrow, className, children }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("mx-auto w-full max-w-[1440px] px-6 py-24 md:px-16 xl:px-40", className)}
    >
      {eyebrow && (
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted dark:text-muted-dark">
          {eyebrow}
        </p>
      )}
      {title && (
        <h2 className="mb-12 font-display text-display font-bold uppercase tracking-tight">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
