import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/Legal";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms for using Margin.",
};

// TODO before launch: replace [LEGAL ENTITY] / [JURISDICTION] / [CONTACT EMAIL]
// and have a lawyer review. Plain-language draft, not legal advice.
export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="June 2026">
      <p>
        These terms govern your use of the Margin app and website, operated by{" "}
        <strong className="text-paper">[LEGAL ENTITY]</strong>. By using Margin,
        you agree to them.
      </p>

      <LegalSection heading="Beta software">
        <p>
          Margin is currently in private beta. It is provided &ldquo;as
          is,&rdquo; may change or break, and is not guaranteed to be available.
          We&apos;d love your feedback as we build it.
        </p>
      </LegalSection>

      <LegalSection heading="Your content">
        <p>
          You keep all rights to your notes and content. You&apos;re responsible
          for what you choose to share with Margin and for using it lawfully.
          Don&apos;t use Margin to break the law or infringe others&apos; rights.
        </p>
      </LegalSection>

      <LegalSection heading="Accounts">
        <p>
          You&apos;re responsible for keeping your account credentials and any
          API keys secure. Tell us promptly if you suspect unauthorized use.
        </p>
      </LegalSection>

      <LegalSection heading="Acceptable use">
        <p>
          Don&apos;t attempt to disrupt the service, reverse-engineer it beyond
          what the law permits, or resell it without our permission.
        </p>
      </LegalSection>

      <LegalSection heading="Liability">
        <p>
          To the extent permitted by law, Margin is provided without warranties,
          and our liability is limited. Margin assists your thinking; you remain
          responsible for your decisions and work.
        </p>
      </LegalSection>

      <LegalSection heading="Changes &amp; contact">
        <p>
          We may update these terms and will revise the date above. These terms
          are governed by the laws of{" "}
          <strong className="text-paper">[JURISDICTION]</strong>. Questions?
          Contact <strong className="text-paper">[CONTACT EMAIL]</strong>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
