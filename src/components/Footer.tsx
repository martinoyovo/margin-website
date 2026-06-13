import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] px-6 py-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-xs">
          <div className="flex items-center gap-2.5">
            <Logo size={26} />
            <span className="font-sans text-lg font-medium tracking-[-0.04em] text-paper">
              margin
            </span>
          </div>
          <p className="mt-4 font-serif text-[15px] italic leading-relaxed text-muted">
            The best ideas were never in the text. They were in the margin.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-14 gap-y-8 text-sm sm:grid-cols-3">
          <FooterCol
            title="Product"
            links={[
              ["The difference", "/#difference"],
              ["How it works", "/#how"],
              ["Pricing", "/pricing"],
              ["Download", "/download"],
            ]}
          />
          <FooterCol
            title="Company"
            links={[
              ["Early access", "/#waitlist"],
              ["Privacy", "/privacy"],
              ["Terms", "/terms"],
            ]}
          />
          <FooterCol
            title="Connect"
            links={[
              ["X / Twitter", "https://x.com"],
              ["Email", "mailto:hello@margin.app"],
            ]}
          />
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl items-center justify-between border-t border-white/[0.06] pt-6 text-xs text-faint">
        <span>© {new Date().getFullYear()} Margin</span>
        <span className="font-mono">Made for macOS</span>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: [string, string][];
}) {
  return (
    <div>
      <h4 className="eyebrow mb-3.5 !text-faint">{title}</h4>
      <ul className="space-y-2.5">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link href={href} className="text-muted transition hover:text-paper">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
