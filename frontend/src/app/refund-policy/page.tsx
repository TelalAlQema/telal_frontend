import { LegalPage } from "@/components/legal-page";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Refund Policy",
  description:
    "Refund and cancellation policy for works and deposits placed with Telal Al Qema Building Contracting in Dubai.",
  path: "/refund-policy",
});

export default function RefundPolicyPage() {
  return (
    <LegalPage
      title="Refund Policy"
      updated="08 August 2026"
      sections={[
        {
          heading: "What this policy covers",
          body: [
            "This policy describes how deposits and payments are handled when a project is cancelled or changes scope after you have instructed us and paid a deposit.",
          ],
        },
        {
          heading: "Cancellation before works start",
          body: [
            "If you cancel before any work has begun, your deposit is refunded in full, less any credit-card or bank transfer fees we reasonably incurred. Please notify us in writing or email.",
          ],
        },
        {
          heading: "Cancellation mid-project",
          body: [
            "If you cancel after works have started, you are charged for works actually completed and materials already purchased or cut to your project. The balance of any unused, uncut materials is refunded.",
          ],
        },
        {
          heading: "Defective or incomplete works",
          body: [
            "If we fail to complete works to an agreed standard, we will firstly remedy the defect at our cost. Where that is not possible, we will refund the portion paid for the defective works. No refund applies to works completed correctly or to dissatisfaction with a finish that was agreed in advance.",
          ],
        },
        {
          heading: "How refunds are processed",
          body: [
            "Refunds are processed within 14 working days of approval, via the original payment method. Contact us on the details listed on the Contact page to start a request.",
          ],
        },
      ]}
    />
  );
}
