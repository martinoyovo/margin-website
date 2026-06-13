import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/Legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Margin handles your data. Your notes are yours — local-first by design.",
};

// TODO before launch: replace [LEGAL ENTITY] and [CONTACT EMAIL], and have a
// lawyer review. This is a plain-language draft, not legal advice.
export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="June 2026">
      <p>
        Margin is built on a simple principle: your notes are yours. This policy
        explains, in plain language, what the Margin app and this website do and
        don&apos;t collect. Margin is operated by{" "}
        <strong className="text-paper">[LEGAL ENTITY]</strong> (&ldquo;we&rdquo;,
        &ldquo;us&rdquo;).
      </p>

      <LegalSection heading="Your notes stay on your device">
        <p>
          Margin reads the note, document, or on-screen content you choose to
          show it so it can help you. This content is processed locally on your
          Mac and is sent to an AI provider only when you ask Margin a question.
          We do not store your notes on our servers, and we do not use them to
          train any model.
        </p>
      </LegalSection>

      <LegalSection heading="What we collect">
        <p>
          <strong className="text-paper">Waitlist &amp; account.</strong> If you
          join the waitlist or create an account, we store your email address so
          we can send your invite and product updates.
        </p>
        <p>
          <strong className="text-paper">Diagnostics.</strong> The app may
          collect anonymous, aggregated crash and usage data to improve
          stability. This never includes the content of your notes.
        </p>
      </LegalSection>

      <LegalSection heading="AI processing">
        <p>
          When you ask Margin something, the relevant context is sent to an AI
          provider to generate a response. That provider processes the request
          to return an answer and, per its terms, does not use it to train its
          models. You can use your own API key to control this relationship
          directly.
        </p>
      </LegalSection>

      <LegalSection heading="What we never do">
        <p>
          We don&apos;t sell your data. We don&apos;t run ads against your
          content. We don&apos;t read your notes — Margin does, on your device,
          at your request.
        </p>
      </LegalSection>

      <LegalSection heading="Your choices">
        <p>
          You can unsubscribe from emails at any time, and you can request
          deletion of your account and associated data by contacting us at{" "}
          <strong className="text-paper">[CONTACT EMAIL]</strong>.
        </p>
      </LegalSection>

      <LegalSection heading="Changes">
        <p>
          We&apos;ll update this page if our practices change and revise the date
          above. Questions? Reach us at{" "}
          <strong className="text-paper">[CONTACT EMAIL]</strong>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
