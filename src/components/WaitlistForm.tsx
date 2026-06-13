"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function WaitlistForm({
  variant = "hero",
}: {
  variant?: "hero" | "footer";
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Try again.");
        return;
      }
      setStatus("success");
      setMessage("You're on the list. We'll be in touch.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error. Try again.");
    }
  }

  if (status === "success") {
    return (
      <div
        className={`flex items-center gap-3 rounded-full border border-gold/40 bg-gold/10 px-5 py-3.5 text-sm text-gold-hi ${
          variant === "hero" ? "max-w-md" : ""
        }`}
      >
        <span className="animate-core inline-block h-2.5 w-2.5 rounded-full bg-gold gold-glow" />
        {message}
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`w-full ${variant === "hero" ? "max-w-md" : "max-w-sm"}`}
    >
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          aria-label="Email address"
          className="min-w-0 flex-1 rounded-full border border-white/12 bg-white/[0.04] px-5 py-3.5 text-[15px] text-paper outline-none transition placeholder:text-faint focus:border-gold/50 focus:bg-white/[0.06]"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="group inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-gold px-6 py-3.5 text-[15px] font-medium text-ink transition hover:bg-gold-hi disabled:opacity-70"
        >
          {status === "loading" ? "Joining…" : "Get early access"}
          <span className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </button>
      </div>
      {status === "error" && (
        <p className="mt-2.5 pl-1 text-sm text-red-400">{message}</p>
      )}
      <p className="mt-3 pl-1 text-xs text-faint">
        Free during the beta. No spam, just your invite when it's ready.
      </p>
    </form>
  );
}
