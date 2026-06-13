import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { WaitlistForm } from "@/components/WaitlistForm";
import { OverlayMock } from "@/components/OverlayMock";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Story />
        <HowItWorks />
        <Difference />
        <Pillars />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}

/* ── Hero ───────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="aperture-light relative overflow-hidden px-6 pb-24 pt-36 sm:pt-44">
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow animate-rise mb-8">A quiet AI agent for your Mac</p>
        <h1 className="animate-rise font-serif text-[2.7rem] font-light leading-[1.08] tracking-[-0.02em] text-paper sm:text-6xl">
          The best ideas were never
          <br className="hidden sm:block" /> in the text. They were in the{" "}
          <span className="italic text-gold">margin.</span>
        </h1>
        <p
          className="animate-rise mx-auto mt-7 max-w-xl text-lg leading-relaxed text-muted"
          style={{ animationDelay: "80ms" }}
        >
          Apple gave your notes a better pen. Margin gives them a mind — an AI
          agent that reads what you&apos;re working on and thinks with you. One
          keystroke, anywhere on your screen.
        </p>
        <div
          className="animate-rise mt-10 flex justify-center"
          style={{ animationDelay: "160ms" }}
          id="waitlist"
        >
          <WaitlistForm />
        </div>
      </div>

      <div
        className="animate-rise mt-20 px-2"
        style={{ animationDelay: "240ms" }}
      >
        <OverlayMock />
      </div>
    </section>
  );
}

/* ── The margin story ─────────────────────────────────────────────────────── */
function Story() {
  return (
    <section id="story" className="border-t border-white/[0.06] px-6 py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow mb-6">Why &ldquo;Margin&rdquo;</p>
        <h2 className="font-serif text-3xl font-light leading-snug tracking-[-0.01em] text-paper sm:text-[2.5rem]">
          For centuries, the smartest readers thought in the margins.
        </h2>
        <div className="mt-8 space-y-6 text-left text-[1.05rem] leading-relaxed text-muted">
          <p>
            Newton, Fermat, da Vinci — their breakthroughs weren&apos;t in the
            body text. They were scribbled in the margin, where reading turns
            into thinking. <span className="text-paper">Marginalia</span> is the
            oldest form of a second brain.
          </p>
          <p>
            Then notes went digital, and the margin disappeared. Today most of
            us keep years of notes that quietly go to die — a graveyard we never
            reopen. Apple put AI in there, but it only sharpens the pen: rewrite
            this, summarize that, fix the grammar. It makes the tombstones
            prettier.
          </p>
          <p className="text-paper">
            Margin brings the margin back. It doesn&apos;t polish your sentences
            — it thinks alongside them.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── How it works (the magic moment) ──────────────────────────────────────── */
function HowItWorks() {
  const steps = [
    {
      n: "01",
      t: "It’s already reading",
      d: "Margin lives at the edge of your screen, quietly aware of the note, page, or doc in front of you. Nothing to copy, nothing to paste.",
    },
    {
      n: "02",
      t: "One keystroke",
      d: "Press ⌘⇧Space anywhere. A frosted panel slides in from the margin — already holding the context of what you were looking at.",
    },
    {
      n: "03",
      t: "Think together",
      d: "Ask anything. Margin reasons across your notes with a frontier-grade mind and answers from your own knowledge — then gets out of the way.",
    },
  ];
  return (
    <section id="how" className="border-t border-white/[0.06] px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-6">The moment</p>
          <h2 className="font-serif text-3xl font-light tracking-[-0.01em] text-paper sm:text-[2.5rem]">
            It was already reading. Just ask.
          </h2>
        </div>
        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.06] sm:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="bg-ink p-8">
              <span className="font-mono text-sm text-gold">{s.n}</span>
              <h3 className="mt-4 text-lg font-medium text-paper">{s.t}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                {s.d}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── The difference (contrast table) ──────────────────────────────────────── */
function Difference() {
  const rows: [string, string, string][] = [
    ["What it is", "A writing feature", "A thinking agent"],
    ["What it does", "Rewrites this sentence", "Reasons across all your notes"],
    ["Where it lives", "Buried in one app’s menu", "One keystroke, over any app"],
    ["The mind", "Generic, on-device tier", "Frontier-grade reasoning"],
    ["The feeling", "“Fix my grammar”", "“Think with me”"],
  ];
  return (
    <section id="difference" className="border-t border-white/[0.06] px-6 py-28">
      <div className="mx-auto max-w-4xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-6">Apple Intelligence vs. Margin</p>
          <h2 className="font-serif text-3xl font-light tracking-[-0.01em] text-paper sm:text-[2.5rem]">
            A better pen, or a mind?
          </h2>
        </div>

        <div className="mt-14 overflow-hidden rounded-2xl border border-white/[0.08]">
          <div className="grid grid-cols-[1.1fr_1fr_1fr] border-b border-white/[0.08] bg-white/[0.03]">
            <div className="p-5" />
            <div className="p-5 text-center font-mono text-xs uppercase tracking-wider text-faint">
              Built-in AI
            </div>
            <div className="p-5 text-center font-mono text-xs uppercase tracking-wider text-gold">
              Margin
            </div>
          </div>
          {rows.map(([label, apple, margin], i) => (
            <div
              key={label}
              className={`grid grid-cols-[1.1fr_1fr_1fr] items-center ${
                i % 2 ? "bg-white/[0.015]" : ""
              }`}
            >
              <div className="p-5 text-sm text-faint">{label}</div>
              <div className="p-5 text-center text-[15px] text-muted">
                {apple}
              </div>
              <div className="p-5 text-center text-[15px] font-medium text-paper">
                {margin}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Three pillars ────────────────────────────────────────────────────────── */
function Pillars() {
  const pillars = [
    {
      t: "Agent, not feature",
      d: "It acts on your context — answers, connects, drafts — instead of just autocompleting the line you’re on.",
    },
    {
      t: "One key, everywhere",
      d: "Summoned with ⌘⇧Space over any app and dismissed in an instant. It lives in the margin, never in your way.",
    },
    {
      t: "Your context, kept close",
      d: "Margin reads what you choose to show it and reasons privately. Your notes are yours — local-first by design.",
    },
  ];
  return (
    <section className="border-t border-white/[0.06] px-6 py-28">
      <div className="mx-auto grid max-w-5xl gap-10 sm:grid-cols-3">
        {pillars.map((p) => (
          <div key={p.t}>
            <span className="animate-core inline-block h-3 w-3 rounded-full bg-gold gold-glow" />
            <h3 className="mt-5 text-lg font-medium text-paper">{p.t}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">{p.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Final CTA ────────────────────────────────────────────────────────────── */
function FinalCta() {
  return (
    <section className="border-t border-white/[0.06] px-6 py-32">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-serif text-4xl font-light leading-tight tracking-[-0.01em] text-paper sm:text-5xl">
          Bring your notes
          <br /> back to <span className="italic text-gold">life.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-md text-lg text-muted">
          Margin is in private beta for macOS. Join the waitlist and we&apos;ll
          send your invite.
        </p>
        <div className="mt-9 flex justify-center">
          <WaitlistForm />
        </div>
      </div>
    </section>
  );
}
