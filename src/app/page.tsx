import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { WaitlistForm } from "@/components/WaitlistForm";
import Image from "next/image";
import { OverlayMock } from "@/components/OverlayMock";
import { AgentDemo } from "@/components/AgentDemo";
import { Logo } from "@/components/Logo";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Ecosystem />
        <Outcomes />
        <HowItWorks />
        <Difference />
        <Pillars />
        <Story />
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
        <p className="eyebrow animate-rise mb-8">
          For people who live in Apple Notes
        </p>
        <h1 className="animate-rise font-serif text-[2.7rem] font-light leading-[1.08] tracking-[-0.02em] text-paper sm:text-6xl">
          Apple Notes,
          <br className="hidden sm:block" /> finally{" "}
          <span className="italic text-accent">powerful.</span>
        </h1>
        <p
          className="animate-rise mx-auto mt-7 max-w-xl text-lg leading-relaxed text-muted"
          style={{ animationDelay: "80ms" }}
        >
          Real search, connected notes, and one-keystroke actions across your
          Notes, Reminders, and Calendar. Margin is the agent that makes the
          Apple ecosystem work the way you always wanted.
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
        className="animate-rise mt-16"
        style={{ animationDelay: "240ms" }}
      >
        <AgentDemo />
      </div>
    </section>
  );
}

/* ── The margin story ─────────────────────────────────────────────────────── */
function Story() {
  return (
    <section id="story" className="border-t border-divider px-6 py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow mb-6">Why &ldquo;Margin&rdquo;</p>
        <h2 className="font-serif text-3xl font-light leading-snug tracking-[-0.01em] text-paper sm:text-[2.5rem]">
          For centuries, the smartest readers thought in the margins.
        </h2>
        <div className="mt-8 space-y-6 text-left text-[1.05rem] leading-relaxed text-muted">
          <p>
            Newton, Fermat, da Vinci: their breakthroughs weren&apos;t in the
            body text. They were scribbled in the margin, where reading turns
            into thinking. <span className="text-paper">Marginalia</span> is the
            oldest form of a second brain.
          </p>
          <p>
            Then notes went digital, and the margin disappeared. Today most of
            us keep years of notes that quietly go to die, a graveyard we never
            reopen. Apple put AI in there, but it only sharpens the pen: rewrite
            this, summarize that, fix the grammar. It makes the tombstones
            prettier.
          </p>
          <p className="text-paper">
            Margin brings the margin back. It doesn&apos;t polish your
            sentences. It thinks alongside them.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── The problem ──────────────────────────────────────────────────────────── */
function Problem() {
  const pains = [
    {
      t: "You can’t find anything.",
      d: "Apple Notes search matches exact words, not meaning. You know the note is in there. You just can’t find it.",
    },
    {
      t: "No way to see how things connect.",
      d: "Hundreds of notes, zero links between them. The ideas that belong together never meet.",
    },
    {
      t: "You can’t act on them.",
      d: "A note full of tasks, dates, and people just sits there. Nothing becomes a reminder, an event, or a next step.",
    },
    {
      t: "Apple Intelligence only rewrites.",
      d: "It polishes the sentence in front of you. It can’t reason across your notes or do anything with them.",
    },
  ];
  return (
    <section className="border-t border-divider px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-6">The problem</p>
          <h2 className="font-serif text-3xl font-light tracking-[-0.01em] text-paper sm:text-[2.5rem]">
            Apple Notes is where notes go to die.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-muted">
            You write things down and never see them again. Four reasons why.
          </p>
        </div>
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-surface-2 sm:grid-cols-2">
          {pains.map((p) => (
            <div key={p.t} className="bg-bg p-8">
              <h3 className="text-lg font-medium text-paper">{p.t}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                {p.d}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Ecosystem / works-with ───────────────────────────────────────────────── */
function Ecosystem() {
  const apps = [
    {
      icon: "/brand/apps/notes.png",
      name: "Apple Notes",
      d: "Reads and understands every note you’ve written, going back years.",
    },
    {
      icon: "/brand/apps/reminders.png",
      name: "Reminders",
      d: "Turns what you wrote into reminders, so nothing slips through.",
    },
    {
      icon: "/brand/apps/calendar.png",
      name: "Calendar",
      d: "Pulls the dates out of your notes and puts them on your calendar.",
    },
  ];
  return (
    <section className="border-t border-divider px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-6">Works with your stack</p>
          <h2 className="font-serif text-3xl font-light tracking-[-0.01em] text-paper sm:text-[2.5rem]">
            Made for people who live in Apple Notes.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-muted">
            Margin isn’t another app to migrate to. It works on top of the
            Notes, Reminders, and Calendar you already use, and finally makes
            them talk to each other.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {apps.map((a) => (
            <div
              key={a.name}
              className="rounded-2xl border border-line bg-surface p-7"
            >
              <Image
                src={a.icon}
                alt={`${a.name} app icon`}
                width={52}
                height={52}
                className="rounded-[12px]"
              />
              <h3 className="mt-5 text-lg font-medium text-paper">{a.name}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-muted">
                {a.d}
              </p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-xl text-center text-sm text-faint">
          <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-gold/70 align-middle" />
          Nothing to import or move. Your notes stay exactly where they are.
        </p>
      </div>
    </section>
  );
}

/* ── Outcomes / use-cases ─────────────────────────────────────────────────── */
function Outcomes() {
  const outcomes = [
    {
      t: "Find the note you can’t find.",
      d: "Search the way you remember, not by keyword. Ask “where did I write about the visa paperwork?” and Margin surfaces it, even if you never used those words.",
    },
    {
      t: "Connect the dots across everything.",
      d: "Margin reads the whole picture, not one page. It pulls ideas scattered across hundreds of notes into a single, straight answer.",
    },
    {
      t: "Stop paying the copy-paste tax.",
      d: "No more shuttling text into a chatbot and re-explaining the context every time. Margin is already there, already reading what’s in front of you.",
    },
    {
      t: "Turn notes into a first draft.",
      d: "Hand it the scattered thoughts you already wrote and get back a draft grounded in your own words, not a stranger’s.",
    },
  ];
  return (
    <section className="border-t border-divider px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-6">What it’s for</p>
          <h2 className="font-serif text-3xl font-light tracking-[-0.01em] text-paper sm:text-[2.5rem]">
            Your notes, finally working for you.
          </h2>
        </div>
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-surface-2 sm:grid-cols-2">
          {outcomes.map((o) => (
            <div key={o.t} className="bg-bg p-8">
              <span className="animate-core inline-block h-3 w-3 rounded-full bg-gold gold-glow" />
              <h3 className="mt-5 text-lg font-medium text-paper">{o.t}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                {o.d}
              </p>
            </div>
          ))}
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
      d: "Press ⌘⇧Space anywhere. A frosted panel slides in from the margin, already holding the context of what you were looking at.",
    },
    {
      n: "03",
      t: "Think together",
      d: "Ask anything. Margin reasons across your notes with a frontier-grade mind and answers from your own knowledge, then gets out of the way.",
    },
  ];
  return (
    <section id="how" className="border-t border-divider px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-6">The moment</p>
          <h2 className="font-serif text-3xl font-light tracking-[-0.01em] text-paper sm:text-[2.5rem]">
            It was already reading. Just ask.
          </h2>
        </div>
        <div className="mt-14">
          <OverlayMock />
        </div>
        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-surface-2 sm:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="bg-bg p-8">
              <span className="font-mono text-sm text-accent">{s.n}</span>
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
    ["Works across", "Apple Notes only", "Notes, Reminders & Calendar"],
    ["Where it lives", "Buried in one app’s menu", "One keystroke, over any app"],
    ["The mind", "Generic, on-device tier", "Frontier-grade reasoning"],
    ["The feeling", "“Fix my grammar”", "“Think with me”"],
  ];
  return (
    <section id="difference" className="border-t border-divider px-6 py-28">
      <div className="mx-auto max-w-4xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-6">Apple Intelligence vs. Margin</p>
          <h2 className="font-serif text-3xl font-light tracking-[-0.01em] text-paper sm:text-[2.5rem]">
            A better pen, or a mind?
          </h2>
        </div>

        <div className="mt-14 overflow-hidden rounded-2xl border border-line">
          {/* head-to-head header */}
          <div className="grid grid-cols-[1.1fr_1fr_1fr] items-stretch border-b border-line">
            <div className="bg-surface" />
            <div className="flex flex-col items-center gap-2 bg-surface px-3 py-6 text-center sm:px-5">
              <div className="flex h-14 items-center justify-center">
                <Image
                  src="/brand/apps/apple-intelligence-mono.png"
                  alt="Apple Intelligence app icon"
                  width={38}
                  height={38}
                  className="rounded-[11px] opacity-75 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.4)]"
                />
              </div>
              <span className="text-sm font-medium text-muted">
                Apple Intelligence
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-faint">
                built into Notes
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 bg-gold/[0.07] px-3 py-6 text-center sm:px-5">
              <div className="flex h-14 items-center justify-center">
                <span className="flex h-[52px] w-[52px] items-center justify-center rounded-[15px] border border-gold/40 bg-ink-soft shadow-[0_0_30px_-3px_rgba(255,194,51,0.7),0_0_0_1px_rgba(255,194,51,0.18)]">
                  <Logo size={48} ring="#f7f6f3" />
                </span>
              </div>
              <span className="text-base font-semibold text-paper">Margin</span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-accent/80">
                the agent
              </span>
            </div>
          </div>
          {rows.map(([label, apple, margin], i) => (
            <div
              key={label}
              className="grid grid-cols-[1.1fr_1fr_1fr] items-center"
            >
              <div className="p-3 text-xs text-faint sm:p-5 sm:text-sm">
                {label}
              </div>
              <div
                className={`p-3 text-center text-[13px] text-muted sm:p-5 sm:text-[15px] ${
                  i % 2 ? "bg-surface" : ""
                }`}
              >
                {apple}
              </div>
              <div className="p-3 text-center text-[13px] font-medium text-paper bg-gold/[0.04] sm:p-5 sm:text-[15px]">
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
      d: "It acts on your context (answers, connects, drafts) instead of just autocompleting the line you’re on.",
    },
    {
      t: "One key, everywhere",
      d: "Summoned with ⌘⇧Space over any app and dismissed in an instant. It lives in the margin, never in your way.",
    },
    {
      t: "Your context, kept close",
      d: "Margin reads what you choose to show it and reasons privately. Your notes are yours, local-first by design.",
    },
  ];
  return (
    <section className="border-t border-divider px-6 py-28">
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
    <section className="border-t border-divider px-6 py-32">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-serif text-4xl font-light leading-tight tracking-[-0.01em] text-paper sm:text-5xl">
          Bring your notes
          <br /> back to <span className="italic text-accent">life.</span>
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
