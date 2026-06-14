"use client";

import { useEffect, useState } from "react";

type Pref = "light" | "dark" | "auto";

const OPTIONS: { id: Pref; label: string }[] = [
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
  { id: "auto", label: "Auto" },
];

function systemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function apply(pref: Pref) {
  const resolved = pref === "auto" ? systemTheme() : pref;
  const el = document.documentElement;
  el.classList.remove("light", "dark");
  el.classList.add(resolved);
}

export function ThemeToggle() {
  const [pref, setPref] = useState<Pref>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = (localStorage.getItem("theme") as Pref) || "dark";
    setPref(saved);
    apply(saved);
    setMounted(true);
  }, []);

  // keep "auto" in sync with the OS as it changes
  useEffect(() => {
    if (pref !== "auto") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => apply("auto");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [pref]);

  function choose(p: Pref) {
    setPref(p);
    localStorage.setItem("theme", p);
    apply(p);
  }

  return (
    <div
      className="inline-flex items-center rounded-full border border-line p-0.5 text-[13px]"
      role="group"
      aria-label="Color theme"
    >
      {OPTIONS.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => choose(o.id)}
          aria-pressed={mounted && pref === o.id}
          className={`rounded-full px-3 py-1 transition ${
            mounted && pref === o.id
              ? "bg-gold font-medium text-ink"
              : "text-muted hover:text-paper"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
