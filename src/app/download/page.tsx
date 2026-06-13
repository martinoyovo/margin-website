import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Download",
  description: "Margin for macOS, in private beta. Join the waitlist for your invite.",
};

// Set this to the real .dmg URL when the build is ready.
const DMG_URL = "";

export default function DownloadPage() {
  return (
    <>
      <Nav />
      <main className="aperture-light px-6 pb-28 pt-40">
        <div className="mx-auto max-w-xl text-center">
          <Logo size={64} className="mx-auto" />
          <p className="eyebrow mt-8 mb-5">Margin for macOS</p>
          <h1 className="font-serif text-4xl font-light tracking-[-0.01em] text-paper sm:text-5xl">
            Coming soon to your menu bar.
          </h1>
          <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-muted">
            Margin is in private beta. We&apos;re sending invites in waves. Join
            the waitlist and you&apos;ll get the download link and a setup guide
            by email.
          </p>

          {DMG_URL ? (
            <a
              href={DMG_URL}
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-[15px] font-medium text-ink transition hover:bg-gold-hi"
            >
              Download for macOS
            </a>
          ) : (
            <Link
              href="/#waitlist"
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-[15px] font-medium text-ink transition hover:bg-gold-hi"
            >
              Join the waitlist →
            </Link>
          )}

          <p className="mt-6 font-mono text-xs text-faint">
            Requires macOS 14 or later · Apple silicon &amp; Intel
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
