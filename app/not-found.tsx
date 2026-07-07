import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] w-full max-w-[1440px] flex-col items-start justify-center px-6 py-24 md:px-16 xl:px-40">
      <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted dark:text-muted-dark">
        404
      </p>
      <h1 className="font-display text-hero font-bold uppercase tracking-tight">
        Lost in <span className="text-amber">space.</span>
      </h1>
      <p className="mt-6 max-w-xl text-body-lg text-muted dark:text-muted-dark">
        This page doesn&apos;t exist — or it got refactored away.
      </p>
      <div className="mt-10">
        <Button href="/">Back Home</Button>
      </div>
    </section>
  );
}
