import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Waitlist capture. Provider-agnostic — wire one of these env vars at launch:
 *
 *   WAITLIST_WEBHOOK_URL   POSTs { email, source, ts } as JSON (Zapier / Make /
 *                          Google Sheets / your own endpoint). Easiest.
 *
 *   SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY
 *                          inserts { email } into a `waitlist` table via REST.
 *
 * With neither set, the email is logged server-side so the form still works in
 * development. Set a provider before running ads so signups are not lost.
 */
export async function POST(req: Request) {
  let email = "";
  try {
    const body = (await req.json()) as { email?: unknown };
    email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const ts = new Date().toISOString();

  try {
    const webhook = process.env.WAITLIST_WEBHOOK_URL;
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (webhook) {
      const r = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "website", ts }),
      });
      if (!r.ok) throw new Error(`webhook ${r.status}`);
    } else if (supabaseUrl && supabaseKey) {
      const r = await fetch(`${supabaseUrl}/rest/v1/waitlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          Prefer: "resolution=merge-duplicates,return=minimal",
        },
        body: JSON.stringify({ email }),
      });
      // 201 created or 200/204 on upsert; 409 means already on the list — fine.
      if (!r.ok && r.status !== 409) throw new Error(`supabase ${r.status}`);
    } else {
      console.log(`[waitlist] ${email} @ ${ts} (no provider configured)`);
    }
  } catch (err) {
    console.error("[waitlist] capture failed:", err);
    return NextResponse.json(
      { ok: false, error: "We couldn't save that just now. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
