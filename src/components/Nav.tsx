import Link from "next/link";
import { Wordmark } from "./Logo";

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-divider bg-bg/70 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" aria-label="Margin home">
          <Wordmark size={26} />
        </Link>
        <div className="hidden items-center gap-8 text-sm text-muted md:flex">
          <Link href="/#story" className="transition hover:text-paper">
            Story
          </Link>
          <Link href="/#difference" className="transition hover:text-paper">
            The difference
          </Link>
          <Link href="/pricing" className="transition hover:text-paper">
            Pricing
          </Link>
          <Link href="/download" className="transition hover:text-paper">
            Download
          </Link>
        </div>
        <Link
          href="/#waitlist"
          className="rounded-full bg-gold px-4 py-2 text-sm font-medium text-ink transition hover:bg-gold-hi"
        >
          Get early access
        </Link>
      </nav>
    </header>
  );
}
