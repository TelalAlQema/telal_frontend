import { ServiceDetail } from "@/components/service-detail";
import { serviceBySlug } from "@/lib/services";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Home Automation System Dubai | Telal Al Qema",
  description:
    "Smart home automation solutions in Dubai — automated lighting, security, climate control, and modern smart home systems installed and programmed by Telal Al Qema.",
  path: "/services/home-automation",
});

export default function HomeAutomationPage() {
  return (
    <ServiceDetail
      service={serviceBySlug("home-automation")!}
      image={{
        src: "/images/dome/automatication.jpg",
        alt: "Smart home automation system installation in Dubai",
      }}
    />
  );
}
