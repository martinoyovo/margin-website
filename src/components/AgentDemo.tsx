"use client";

import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";

/**
 * Interactive showcase of the Margin agent's real capabilities, mirroring the
 * macOS overlay: a context-aware panel summoned over your notes that can map
 * connections (knowledge graph), answer, extract tasks, create reminders, and
 * recap. Visuals follow the real product (gold-on-ink, card-node graph).
 */

type TabId = "map" | "ask" | "tasks" | "remind" | "recap";

const TABS: { id: TabId; label: string; sub?: string }[] = [
  { id: "map", label: "Map connections", sub: "knowledge graph" },
  { id: "ask", label: "Ask anything" },
  { id: "tasks", label: "Extract tasks" },
  { id: "remind", label: "Create reminders" },
  { id: "recap", label: "Weekly review" },
];

const CONTEXT: Record<TabId, string> = {
  map: "Q3 launch plan",
  ask: "Apartment hunt",
  tasks: "Standup notes",
  remind: "Personal · June",
  recap: "14 notes this week",
};

export function AgentDemo() {
  const [tab, setTab] = useState<TabId>("map");
  const [paused, setPaused] = useState(false);

  // auto-advance through capabilities (paused while the user interacts)
  useEffect(() => {
    if (paused) return;
    const order: TabId[] = ["map", "ask", "tasks", "remind", "recap"];
    const dwell = tab === "map" ? 7000 : 5600;
    const t = setTimeout(() => {
      const next = order[(order.indexOf(tab) + 1) % order.length];
      setTab(next);
    }, dwell);
    return () => clearTimeout(t);
  }, [tab, paused]);

  return (
    <div className="mx-auto w-full max-w-3xl">
      {/* the overlay panel, forced dark (a depiction of the dark macOS app) */}
      <div
        className="relative overflow-hidden rounded-2xl border border-line bg-card shadow-[0_8px_40px_-12px_rgba(0,0,0,0.25)]"
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
      >
        {/* chrome */}
        <div className="flex items-center gap-2.5 border-b border-line px-4 py-3">
          <Logo size={18} />
          <span className="font-mono text-[11px] tracking-wide text-muted">
            margin
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-line-2 bg-surface-2 px-2.5 py-1 text-[11px] text-faint">
            <span className="h-1.5 w-1.5 rounded-full bg-gold/70" />
            Reading: {CONTEXT[tab]}
          </span>
          <span className="ml-auto font-mono text-[10px] text-faint">
            ⌘⇧Space
          </span>
        </div>

        {/* tabs */}
        <div className="flex gap-1 overflow-x-auto border-b border-line px-3 py-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-[12.5px] transition ${
                tab === t.id
                  ? "bg-gold/12 text-accent"
                  : "text-muted hover:text-paper"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* body, keyed by tab so entrance animations re-run */}
        <div key={tab} className="min-h-[340px] p-5 sm:p-6">
          {tab === "map" && <MapPanel />}
          {tab === "ask" && <AskPanel />}
          {tab === "tasks" && <TasksPanel />}
          {tab === "remind" && <RemindPanel />}
          {tab === "recap" && <RecapPanel />}
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-16 right-10 h-44 w-44 rounded-full bg-gold/15 blur-3xl"
        />
      </div>
    </div>
  );
}

/* ── prompt line shared by panels ─────────────────────────────────────────── */
function Prompt({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 flex justify-end">
      <div className="max-w-[85%] rounded-2xl rounded-br-md bg-surface-2 px-4 py-2.5 text-[14px] text-paper">
        {children}
      </div>
    </div>
  );
}

function Spark() {
  return (
    <span className="animate-core mt-0.5 shrink-0 text-[15px] leading-none text-accent">
      ✦
    </span>
  );
}

/* ── Knowledge graph ──────────────────────────────────────────────────────── */
type GNode = { title: string; folder: string; strength: number };

const GRAPH_SOURCE = { title: "Q3 launch plan", folder: "Work" };
const GRAPH_NODES: GNode[] = [
  { title: "Pricing page rewrite", folder: "Work", strength: 0.91 },
  { title: "Waitlist email sequence", folder: "Marketing", strength: 0.82 },
  { title: "Demo video script", folder: "Marketing", strength: 0.74 },
  { title: "Competitor teardown", folder: "Research", strength: 0.61 },
  { title: "Beta feedback log", folder: "Research", strength: 0.55 },
];

const STAGE_W = 600;
const STAGE_H = 340;
const CARD_W = 150;
const CARD_H = 56;

function folderHue(name: string) {
  let h = 5381;
  for (let i = 0; i < name.length; i++)
    h = ((h << 5) + h + name.charCodeAt(i)) & 0x7fffffff;
  return h % 360;
}
function folderColors(hue: number) {
  // tints that read on both light and dark cards
  return {
    bg: `hsla(${hue},60%,50%,0.14)`,
    border: `hsla(${hue},60%,50%,0.32)`,
    text: `hsla(${hue},48%,55%,1)`,
  };
}

type Pt = { x: number; y: number };
type Drag =
  | { kind: "card"; id: string; mx0: number; my0: number; x0: number; y0: number }
  | { kind: "pan"; mx0: number; my0: number; px0: number; py0: number };

const CX = STAGE_W / 2;
const CY = STAGE_H / 2;

function initialPositions(): Map<string, Pt> {
  const m = new Map<string, Pt>();
  m.set(GRAPH_SOURCE.title, { x: CX - CARD_W / 2, y: CY - CARD_H / 2 });
  GRAPH_NODES.forEach((n, i) => {
    const angle = (-90 + i * (360 / GRAPH_NODES.length)) * (Math.PI / 180);
    const radius = 132 + (1 - n.strength) * 26;
    m.set(n.title, {
      x: CX + Math.cos(angle) * radius - CARD_W / 2,
      y: CY + Math.sin(angle) * radius - CARD_H / 2,
    });
  });
  return m;
}

function MapPanel() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const areaRef = useRef<HTMLDivElement>(null);
  const drag = useRef<Drag | null>(null);
  const [positions, setPositions] = useState<Map<string, Pt>>(initialPositions);
  const [pan, setPan] = useState<Pt>({ x: 0, y: 0 });
  const [grabbing, setGrabbing] = useState(false);
  // The graph lives in a fixed STAGE_W×STAGE_H coordinate space; scale it down
  // to fit narrow (mobile) viewports so nothing gets clipped off the edge, and
  // keep it horizontally centered when the viewport is wider than the stage.
  const [scale, setScale] = useState(1);
  const [vw, setVw] = useState(STAGE_W);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      setVw(w);
      setScale(Math.min(1, w / STAGE_W));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const offsetX = Math.max(0, (vw - STAGE_W * scale) / 2);

  const center = (title: string): Pt => {
    const p = positions.get(title) ?? { x: 0, y: 0 };
    return { x: p.x + CARD_W / 2, y: p.y + CARD_H / 2 };
  };

  const onCardDown = (e: React.PointerEvent<HTMLDivElement>, title: string) => {
    e.stopPropagation();
    areaRef.current?.setPointerCapture(e.pointerId);
    const p = positions.get(title) ?? { x: 0, y: 0 };
    drag.current = { kind: "card", id: title, mx0: e.clientX, my0: e.clientY, x0: p.x, y0: p.y };
    setGrabbing(true);
  };
  const onAreaDown = (e: React.PointerEvent<HTMLDivElement>) => {
    areaRef.current?.setPointerCapture(e.pointerId);
    drag.current = { kind: "pan", mx0: e.clientX, my0: e.clientY, px0: pan.x, py0: pan.y };
    setGrabbing(true);
  };
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    // pointer deltas are in screen px; convert to stage-space (the stage is
    // visually scaled by `scale`) so a card tracks the finger 1:1.
    const dx = (e.clientX - d.mx0) / scale;
    const dy = (e.clientY - d.my0) / scale;
    if (d.kind === "pan") {
      setPan({ x: d.px0 + dx, y: d.py0 + dy });
    } else {
      const id = d.id;
      const nx = d.x0 + dx;
      const ny = d.y0 + dy;
      setPositions((prev) => new Map(prev).set(id, { x: nx, y: ny }));
    }
  };
  const onUp = () => {
    drag.current = null;
    setGrabbing(false);
  };

  const sc = center(GRAPH_SOURCE.title);
  const cards = [
    { title: GRAPH_SOURCE.title, folder: GRAPH_SOURCE.folder, source: true, strength: undefined as number | undefined },
    ...GRAPH_NODES.map((n) => ({ title: n.title, folder: n.folder, source: false, strength: n.strength as number | undefined })),
  ];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-start gap-2.5">
        <Spark />
        <p className="text-[14px] leading-relaxed text-paper">
          Five notes orbit this plan. The pricing rewrite and the launch email
          are the tightest links, your competitor teardown is the loosest.
        </p>
      </div>

      {/* graph */}
      <div className="overflow-hidden rounded-xl border border-line bg-[var(--graph-canvas)]">
        <div className="flex items-center justify-between px-3 py-2">
          <span className="font-mono text-[11px] text-faint">
            Knowledge graph · {GRAPH_NODES.length} connections · drag to explore
          </span>
          <span className="font-mono text-[11px] text-faint">↗</span>
        </div>
        <div
          ref={viewportRef}
          className="relative w-full overflow-hidden"
          style={{ height: STAGE_H * scale }}
        >
          <div
            ref={areaRef}
            onPointerDown={onAreaDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
            className="absolute top-0 select-none"
            style={{
              left: offsetX,
              width: STAGE_W,
              height: STAGE_H,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              touchAction: "none",
              cursor: grabbing ? "grabbing" : "grab",
            }}
          >
            <div
              className="absolute inset-0"
              style={{ transform: `translate(${pan.x}px, ${pan.y}px)` }}
            >
            {/* edges */}
            <svg
              width={STAGE_W}
              height={STAGE_H}
              viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
              className="animate-fade absolute left-0 top-0"
              style={{ overflow: "visible", pointerEvents: "none" }}
            >
              {GRAPH_NODES.map((n) => {
                const strong = n.strength > 0.7;
                const cc = center(n.title);
                const mx = (sc.x + cc.x) / 2;
                const my = (sc.y + cc.y) / 2;
                const dx = cc.x - sc.x;
                const dy = cc.y - sc.y;
                const d = `M ${sc.x} ${sc.y} Q ${mx - dy * 0.22} ${my + dx * 0.22} ${cc.x} ${cc.y}`;
                return (
                  <path
                    key={n.title}
                    d={d}
                    fill="none"
                    style={{
                      stroke: strong ? "var(--graph-edge-strong)" : "var(--graph-edge)",
                    }}
                    strokeWidth={0.5 + n.strength * 1.6}
                    strokeDasharray={strong ? undefined : "4,4"}
                  />
                );
              })}
            </svg>

            {/* cards: drag a card to move it, drag empty space to pan */}
            {cards.map((c, i) => {
              const p = positions.get(c.title) ?? { x: 0, y: 0 };
              return (
                <div
                  key={c.title}
                  onPointerDown={(e) => onCardDown(e, c.title)}
                  className="animate-pop absolute"
                  style={{
                    left: p.x,
                    top: p.y,
                    width: CARD_W,
                    cursor: grabbing ? "grabbing" : "grab",
                    animationDelay: c.source ? undefined : `${120 + i * 90}ms`,
                  }}
                >
                  <GraphCard
                    title={c.title}
                    folder={c.folder}
                    colors={folderColors(folderHue(c.folder))}
                    source={c.source}
                    strength={c.strength}
                  />
                </div>
              );
            })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GraphCard({
  title,
  folder,
  colors,
  source,
  strength,
}: {
  title: string;
  folder: string;
  colors: { bg: string; border: string; text: string };
  source?: boolean;
  strength?: number;
}) {
  return (
    <div
      className="relative rounded-[9px] px-2 py-2"
      style={{
        height: CARD_H,
        background: source ? "var(--graph-card-source)" : "var(--graph-card)",
        border: `0.5px solid ${source ? "rgba(255,194,51,0.55)" : "var(--graph-node-border)"}`,
      }}
    >
      <div
        className="pr-5 text-[11px] leading-tight"
        style={{
          color: source ? "var(--graph-title-source)" : "var(--graph-title)",
          display: "-webkit-box",
          WebkitLineClamp: 1,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {title}
      </div>
      {!source && strength != null && (
        <span className="absolute right-2 top-2 font-mono text-[9px] text-faint">
          {Math.round(strength * 100)}%
        </span>
      )}
      <span
        className="mt-1.5 inline-flex max-w-full items-center gap-1 truncate rounded-full px-1.5 py-0.5 text-[9px]"
        style={{ background: colors.bg, border: `0.5px solid ${colors.border}`, color: colors.text }}
      >
        {folder}
      </span>
    </div>
  );
}

/* ── Ask ──────────────────────────────────────────────────────────────────── */
function AskPanel() {
  return (
    <div>
      <Prompt>What did I decide about the apartment lease?</Prompt>
      <div className="animate-rise flex items-start gap-2.5">
        <Spark />
        <div>
          <p className="text-[15px] leading-relaxed text-paper">
            You went with the 12-month at $2,400. The early-termination clause on
            the 6-month option was the dealbreaker.
          </p>
          <p className="mt-2 font-mono text-[11px] text-accent/80">
            From “Apartment hunt” · Mar 3
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Tasks ────────────────────────────────────────────────────────────────── */
function TasksPanel() {
  const tasks = [
    "Sync with Dana about pricing",
    "Send press kit to TechCrunch (due Fri)",
    "Book the studio for the demo shoot",
    "Review the waitlist copy",
  ];
  return (
    <div>
      <Prompt>Pull the tasks out of this note.</Prompt>
      <div className="flex items-start gap-2.5">
        <Spark />
        <div className="min-w-0 flex-1">
          <p className="text-[14px] text-paper">
            Found 4 tasks. Added them as a checklist.
          </p>
          <ul className="mt-3 space-y-2">
            {tasks.map((t, i) => (
              <li
                key={t}
                className="animate-rise flex items-center gap-2.5 rounded-lg border border-line bg-surface px-3 py-2 text-[14px] text-muted"
                style={{ animationDelay: `${i * 130}ms` }}
              >
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded border border-gold/50 text-[10px] text-accent">
                  ✓
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ── Reminders / Calendar ─────────────────────────────────────────────────── */
function RemindPanel() {
  return (
    <div>
      <Prompt>Set these up for me.</Prompt>
      <div className="flex items-start gap-2.5">
        <Spark />
        <div className="min-w-0 flex-1">
          <p className="text-[14px] text-paper">
            Caught two things to schedule from this note.
          </p>
          <div className="mt-3 space-y-2.5">
            <ScheduleCard
              kind="Reminder created"
              title="Call mom for her birthday"
              when="Sat, Jun 14 · 9:00 AM"
            />
            <ScheduleCard
              kind="Calendar event"
              title="Dentist appointment"
              when="Tue, Jun 17 · 2:00 PM"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ScheduleCard({
  kind,
  title,
  when,
}: {
  kind: string;
  title: string;
  when: string;
}) {
  return (
    <div className="animate-rise flex items-center gap-3 rounded-lg border border-gold/25 bg-gold/[0.05] px-3.5 py-2.5">
      <span className="animate-core h-2 w-2 shrink-0 rounded-full bg-gold gold-glow" />
      <div className="min-w-0">
        <p className="font-mono text-[10px] uppercase tracking-wider text-accent/80">
          {kind}
        </p>
        <p className="truncate text-[14px] text-paper">{title}</p>
      </div>
      <span className="ml-auto whitespace-nowrap font-mono text-[11px] text-muted">
        {when}
      </span>
    </div>
  );
}

/* ── Weekly recap ─────────────────────────────────────────────────────────── */
function RecapPanel() {
  const points = [
    "You locked the Q3 pricing and handed the page rewrite to Dana.",
    "Three product ideas captured; the notes agent is the one you kept returning to.",
    "Two follow-ups still open: the demo video owner and the press kit.",
  ];
  return (
    <div>
      <Prompt>Give me a summary of this week.</Prompt>
      <div className="flex items-start gap-2.5">
        <Spark />
        <div>
          <p className="text-[14px] text-paper">
            This week, across 14 notes:
          </p>
          <ul className="mt-3 space-y-2.5">
            {points.map((p, i) => (
              <li
                key={p}
                className="animate-rise flex gap-2.5 text-[14px] leading-relaxed text-muted"
                style={{ animationDelay: `${i * 140}ms` }}
              >
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold/70" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
