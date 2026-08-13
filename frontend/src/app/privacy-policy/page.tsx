import { LegalPage } from "@/components/legal-page";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description:
    "How Telal Al Qema Building Contracting collects, uses and protects your personal information when you contact us or request a quotation.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      path="/privacy-policy"
      updated="08 August 2026"
      sections={[
        {
          heading: "Information we collect",
          body: [
            "When you contact us or request a quotation we collect the information you provide in the form: your name, email address, phone number, the service you are interested in and your message. We do not collect anything else without telling you.",
          ],
        },
        {
          heading: "How we use your information",
          body: [
            "We use the details you provide solely to respond to your enquiry, prepare a quotation, and deliver the services you have requested. We do not sell, rent or trade your personal information to any third party.",
          ],
        },
        {
          heading: "Cookies and analytics",
          body: [
            "Our website may use cookies and standard analytics tools to understand how visitors use the site. Where advertising (AdSense) is served, Google may use cookies to serve ads; you can manage these through your browser or Google's ad settings.",
          ],
        },
        {
          heading: "Data retention & security",
          body: [
            "Enquiries are stored on protected servers in Dubai and accessible only to staff who need them to serve you. We retain enquiry records for as long as needed for business purposes and legal obligations.",
          ],
        },
        {
          heading: "Your choices",
          body: [
            "You may ask us to access, correct or delete your personal information at any time by emailing us. Contact details are listed on our Contact Us page.",
          ],
        },
      ]}
    />
  );
}
