import { Nav } from "./Nav";
import { Footer } from "./Footer";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className="px-6 pb-28 pt-40">
        <article className="mx-auto max-w-2xl">
          <h1 className="font-serif text-4xl font-light tracking-[-0.01em] text-paper">
            {title}
          </h1>
          <p className="mt-3 font-mono text-xs text-faint">
            Last updated {updated}
          </p>
          <div className="legal-prose mt-10 space-y-7 text-[15px] leading-relaxed text-muted">
            {children}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-2.5 text-base font-medium text-paper">{heading}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
