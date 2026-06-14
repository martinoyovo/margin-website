import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Waitlist capture + confirmation, powered by Resend.
 *
 * Env vars (set in Vercel):
 *   RESEND_API_KEY       required to do anything (else the signup is just logged)
 *   RESEND_AUDIENCE_ID   the Resend audience signups are added to
 *   RESEND_FROM          optional from address, e.g. "Margin <team@margin9.com>"
 *                        (defaults below; must be a verified sending domain)
 *
 * On submit we add the email to the audience (capture) and send a branded
 * confirmation email. The confirmation is best-effort: if it fails (e.g. the
 * domain isn't verified yet) the signup still succeeds.
 */
const FROM = process.env.RESEND_FROM || "Margin <team@margin9.com>";

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

  const key = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!key) {
    console.log(`[waitlist] ${email} @ ${new Date().toISOString()} (Resend not configured)`);
    return NextResponse.json({ ok: true });
  }

  const authHeaders = {
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  };

  // 1) Capture: add the contact to the audience.
  if (audienceId) {
    try {
      const r = await fetch(
        `https://api.resend.com/audiences/${audienceId}/contacts`,
        {
          method: "POST",
          headers: authHeaders,
          body: JSON.stringify({ email, unsubscribed: false }),
        },
      );
      // Resend returns 201 on create and is idempotent for existing contacts;
      // 409 (already a contact) is fine.
      if (!r.ok && r.status !== 409) {
        throw new Error(`resend contacts ${r.status} ${await r.text()}`);
      }
    } catch (err) {
      console.error("[waitlist] capture failed:", err);
      return NextResponse.json(
        { ok: false, error: "We couldn't save that just now. Please try again." },
        { status: 502 },
      );
    }
  }

  // 2) Confirmation email (best-effort); never blocks the signup.
  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify({
        from: FROM,
        to: [email],
        subject: "You're on the Margin waitlist",
        html: confirmationHtml(),
      }),
    });
    if (!r.ok) console.error("[waitlist] confirmation email:", r.status, await r.text());
  } catch (err) {
    console.error("[waitlist] confirmation email failed:", err);
  }

  return NextResponse.json({ ok: true });
}

function confirmationHtml(): string {
  return `<!doctype html>
<html><body style="margin:0;background:#f4f4f5;padding:32px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#14131a;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
    <table role="presentation" cellpadding="0" cellspacing="0" style="width:480px;max-width:100%;background:#ffffff;border:1px solid #e6e4ea;border-radius:14px;padding:40px 36px;">
      <tr><td style="font-size:19px;font-weight:600;letter-spacing:-0.5px;padding-bottom:26px;">
        <span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:#ffc233;margin-right:9px;vertical-align:middle;"></span>margin
      </td></tr>
      <tr><td style="font-size:22px;font-weight:600;letter-spacing:-0.3px;padding-bottom:14px;">You're on the list.</td></tr>
      <tr><td style="font-size:15px;line-height:1.6;color:#56535f;padding-bottom:18px;">
        Thanks for joining the Margin waitlist. We're building the power layer for Apple Notes: real search, connected notes, and one-keystroke actions across Notes, Reminders, and Calendar.
      </td></tr>
      <tr><td style="font-size:15px;line-height:1.6;color:#56535f;padding-bottom:30px;">
        We'll email your invite the moment your spot opens. Talk soon.
      </td></tr>
      <tr><td style="font-size:14px;font-weight:500;color:#14131a;">The Margin team</td></tr>
    </table>
    <table role="presentation" style="width:480px;max-width:100%;"><tr><td style="font-size:12px;color:#9a98a2;padding:18px 36px 0;line-height:1.5;">
      You're receiving this because you joined the waitlist at margin9.com.
    </td></tr></table>
  </td></tr></table>
</body></html>`;
}
