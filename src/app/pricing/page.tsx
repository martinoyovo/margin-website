import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Margin is free during the private beta. Simple pricing when it ships.",
};

type Tier = {
  name: string;
  price: string;
  cadence?: string;
  blurb: string;
  features: string[];
  cta: string;
  featured?: boolean;
};

// Placeholder pricing — swap in real numbers before launch.
const tiers: Tier[] = [
  {
    name: "Beta",
    price: "Free",
    blurb: "Everything, while we&apos;re in private beta. Help shape what Margin becomes.",
    features: [
      "The full Margin agent",
      "⌘⇧Space anywhere on macOS",
      "Reads your notes &amp; on-screen context",
      "Bring your own API key",
    ],
    cta: "Get early access",
    featured: true,
  },
  {
    name: "Pro",
    price: "$—",
    cadence: "/ month",
    blurb: "For when Margin ships. Final price announced to the waitlist first.",
    features: [
      "Everything in Beta",
      "Margin-managed intelligence (no key needed)",
      "Higher usage limits",
      "Priority support",
    ],
    cta: "Join the waitlist",
  },
];

export default function PricingPage() {
  return (
    <>
      <Nav />
      <main className="px-6 pb-28 pt-40">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-6">Pricing</p>
          <h1 className="font-serif text-4xl font-light tracking-[-0.01em] text-paper sm:text-5xl">
            Free while we&apos;re in beta.
          </h1>
          <p className="mx-auto mt-6 max-w-md text-lg text-muted">
            Margin is free for everyone in the private beta. Paid plans arrive
            when it ships — waitlist members hear the price first.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-3xl gap-6 sm:grid-cols-2">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`flex flex-col rounded-2xl border p-8 ${
                t.featured
                  ? "border-gold/40 bg-gold/[0.04]"
                  : "border-white/[0.08] bg-white/[0.02]"
              }`}
            >
              <div className="flex items-center gap-2">
                <h2 className="font-mono text-sm uppercase tracking-wider text-paper">
                  {t.name}
                </h2>
                {t.featured && (
                  <span className="rounded-full bg-gold px-2 py-0.5 text-[10px] font-medium text-ink">
                    NOW
                  </span>
                )}
              </div>
              <div className="mt-5 flex items-baseline gap-1.5">
                <span className="font-serif text-4xl font-light text-paper">
                  {t.price}
                </span>
                {t.cadence && (
                  <span className="text-sm text-faint">{t.cadence}</span>
                )}
              </div>
              <p
                className="mt-3 text-[15px] leading-relaxed text-muted"
                dangerouslySetInnerHTML={{ __html: t.blurb }}
              />
              <ul className="mt-7 space-y-3 text-[15px] text-muted">
                {t.features.map((f) => (
                  <li key={f} className="flex gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    <span dangerouslySetInnerHTML={{ __html: f }} />
                  </li>
                ))}
              </ul>
              <Link
                href="/#waitlist"
                className={`mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 text-[15px] font-medium transition ${
                  t.featured
                    ? "bg-gold text-ink hover:bg-gold-hi"
                    : "border border-white/15 text-paper hover:bg-white/[0.04]"
                }`}
              >
                {t.cta}
              </Link>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
