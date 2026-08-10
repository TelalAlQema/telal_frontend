import { LegalPage } from "@/components/legal-page";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Terms & Conditions",
  description:
    "Terms and conditions governing quotations, works and contracts provided by Telal Al Qema Building Contracting in Dubai.",
  path: "/terms-and-conditions",
});

export default function TermsAndConditionsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      updated="08 August 2026"
      sections={[
        {
          heading: "Quotations",
          body: [
            "Every quotation is based on the scope described and agreed with you before work begins. Prices are valid for the period stated on the quotation and may require revision if the scope on site differs materially from what was described.",
          ],
        },
        {
          heading: "Acceptance & payment",
          body: [
            "A quotation becomes a binding agreement once you instruct us to proceed. Payment terms are stated in our proposal (typically a deposit before mobilisation and the balance milestone payments). We do not begin works without a confirmed instruction.",
          ],
        },
        {
          heading: "Our obligations",
          body: [
            "We will carry out the works with reasonable skill and care, in compliance with applicable Dubai authorities' regulations, using compliant materials and our own certified or vetted personnel and subcontractors.",
          ],
        },
        {
          heading: "Your obligations",
          body: [
            "You agree to provide reasonable access to the site, accurate information about the property and services, and timely decisions so the schedule can be met. Delays caused by the client may reasonably extend the programme.",
          ],
        },
        {
          heading: "Liability",
          body: [
            "Our liability is limited to defects in our own workmanship and materials, and to the total value of the contract, except to the extent liability cannot be limited by law. We are not liable for indirect or consequential loss.",
          ],
        },
      ]}
    />
  );
}
