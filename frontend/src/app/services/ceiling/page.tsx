import { serviceBySlug } from "@/lib/services";
import { ServiceDetail } from "@/components/service-detail";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Ceiling Work Dubai | Telal Al Qema",
  description:
    "Gypsum and false ceiling work in Dubai — suspended and decorative ceilings with integrated lighting and clean service access.",
  path: "/services/ceiling",
});

export default function ceilingPage() {
  return (
    <ServiceDetail
      service={serviceBySlug("ceiling")!}
      image={{
        src: "/images/Services/gypsum-false-ceiling-installation-dubai-uae.png",
        alt: "Gypsum false ceiling installation in Dubai",
      }}
    />
  );
}
