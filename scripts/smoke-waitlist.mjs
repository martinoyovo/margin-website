#!/usr/bin/env node
/*
 * Waitlist smoke test.
 *
 *   node scripts/smoke-waitlist.mjs [baseUrl] [email]
 *
 * Defaults: baseUrl = http://localhost:3000, email = smoke+<ts>@example.com
 *
 * Step 1 always runs: POST /api/waitlist and check the response.
 * Step 2 runs only if RESEND_API_KEY + RESEND_AUDIENCE_ID are in the env:
 *   confirm the contact actually landed in the Resend audience.
 *
 * Examples:
 *   node scripts/smoke-waitlist.mjs                          # local dev
 *   node scripts/smoke-waitlist.mjs https://margin9.com      # production
 *   RESEND_API_KEY=re_... RESEND_AUDIENCE_ID=... node scripts/smoke-waitlist.mjs https://margin9.com you+test@example.com
 */

const base = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");
const email = process.argv[3] || `smoke+${Date.now()}@example.com`;

async function main() {
  console.log(`-> POST ${base}/api/waitlist  (${email})`);
  const res = await fetch(`${base}/api/waitlist`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const body = await res.json().catch(() => ({}));
  console.log(`   status ${res.status}`, body);
  if (!res.ok || !body.ok) {
    console.error("FAIL: signup was not accepted");
    process.exit(1);
  }
  console.log("OK: signup accepted");

  const key = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!key || !audienceId) {
    console.log(
      "INFO: set RESEND_API_KEY + RESEND_AUDIENCE_ID to also verify the contact landed in Resend",
    );
    return;
  }

  const r = await fetch(
    `https://api.resend.com/audiences/${audienceId}/contacts`,
    { headers: { Authorization: `Bearer ${key}` } },
  );
  const data = await r.json().catch(() => ({}));
  const contacts = Array.isArray(data?.data) ? data.data : [];
  const found = contacts.some(
    (c) => (c.email || "").toLowerCase() === email.toLowerCase(),
  );
  console.log(
    found
      ? "OK: contact is present in the Resend audience"
      : "WARN: contact not visible in the audience yet (give it a moment, then re-check)",
  );
}

main().catch((e) => {
  console.error("ERROR:", e);
  process.exit(1);
});
