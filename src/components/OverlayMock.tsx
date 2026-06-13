import { Logo } from "./Logo";

/**
 * Stylized depiction of the Margin overlay: a note open on the left, the
 * frosted Margin panel sliding in from the right edge of the screen, already
 * answering from the note's context. Pure CSS — no screenshots.
 */
export function OverlayMock() {
  return (
    <div className="relative mx-auto w-full max-w-3xl">
      {/* desktop window */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-ink-soft shadow-2xl">
        {/* title bar */}
        <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-xs text-faint">Notes</span>
        </div>

        <div className="relative flex min-h-[300px]">
          {/* the note */}
          <div className="flex-1 space-y-3 p-6">
            <div className="h-3 w-2/5 rounded-full bg-white/15" />
            <div className="space-y-2 pt-2">
              <div className="h-2.5 w-full rounded-full bg-white/[0.07]" />
              <div className="h-2.5 w-11/12 rounded-full bg-white/[0.07]" />
              <div className="h-2.5 w-4/5 rounded-full bg-white/[0.07]" />
              <div className="h-2.5 w-full rounded-full bg-white/[0.07]" />
              <div className="h-2.5 w-3/4 rounded-full bg-white/[0.07]" />
            </div>
            <div className="space-y-2 pt-4">
              <div className="h-2.5 w-5/6 rounded-full bg-white/[0.07]" />
              <div className="h-2.5 w-full rounded-full bg-white/[0.07]" />
              <div className="h-2.5 w-2/3 rounded-full bg-white/[0.07]" />
            </div>
          </div>

          {/* Margin panel — frosted, sliding in from the edge */}
          <div className="animate-slide-edge absolute inset-y-3 right-3 flex w-[58%] flex-col rounded-xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-md sm:w-[52%]">
            <div className="flex items-center gap-2 border-b border-white/[0.07] pb-3">
              <Logo size={18} />
              <span className="font-mono text-[11px] tracking-wide text-muted">
                margin
              </span>
              <span className="ml-auto font-mono text-[10px] text-faint">
                ⌘⇧Space
              </span>
            </div>

            {/* user question */}
            <div className="mt-3 self-end rounded-2xl rounded-br-sm bg-white/[0.08] px-3 py-2 text-[12px] text-paper">
              What did I decide here?
            </div>

            {/* answer, with the gold core thinking */}
            <div className="mt-3 flex gap-2">
              <span className="animate-core mt-1 h-2 w-2 shrink-0 rounded-full bg-gold gold-glow" />
              <div className="space-y-1.5">
                <div className="h-2 w-40 rounded-full bg-gold/30" />
                <div className="h-2 w-32 rounded-full bg-white/12" />
                <div className="h-2 w-36 rounded-full bg-white/12" />
                <div className="h-2 w-24 rounded-full bg-white/12" />
              </div>
            </div>

            <div className="mt-auto flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">
              <div className="h-1.5 flex-1 rounded-full bg-white/[0.08]" />
              <span className="h-5 w-5 rounded-full bg-gold" />
            </div>
          </div>
        </div>
      </div>

      {/* ambient glow under the panel */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-10 right-10 h-40 w-40 rounded-full bg-gold/20 blur-3xl"
      />
    </div>
  );
}
