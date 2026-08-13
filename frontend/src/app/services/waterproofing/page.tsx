import { serviceBySlug } from "@/lib/services";
import { ServiceDetail } from "@/components/service-detail";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Water-Proofing Dubai | Telal Al Qema",
  description:
    "Waterproofing services in Dubai — roof, terrace, basin and basement protection using tested membranes with reliable warranties.",
  path: "/services/waterproofing",
});

export default function waterproofingPage() {
  return (
    <ServiceDetail
      service={serviceBySlug("waterproofing")!}
      image={{
        src: "/images/Services/roof-waterproofing-membrane-installation-dubai-uae.png",
        alt: "Roof waterproofing membrane installation in Dubai",
      }}
    />
  );
}
