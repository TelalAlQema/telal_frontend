import { serviceBySlug } from "@/lib/services";
import { ServiceDetail } from "@/components/service-detail";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Fit Out Dubai | Telal Al Qema",
  description:
    "Complete interior fit-out in Dubai — partitions, ceilings, flooring, joinery and finishes for offices, retail and residential spaces, delivered turn-key.",
  path: "/services/fit-out",
});

export default function fitoutPage() {
  return (
    <ServiceDetail
      service={serviceBySlug("fit-out")!}
      image={{
        src: "/images/Services/office-fit-out-contractor-dubai-glass-partitions.png",
        alt: "Office fit-out with glass partitions in Dubai",
      }}
    />
  );
}
