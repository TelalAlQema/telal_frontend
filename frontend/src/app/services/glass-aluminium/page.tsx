import { serviceBySlug } from "@/lib/services";
import { ServiceDetail } from "@/components/service-detail";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Glass & Aluminium Works",
  description:
    "Glass and aluminium works in Dubai — windows, partitions, facades and structural glazing fabricated and installed to tight tolerances.",
  path: "/services/glass-aluminium",
});

export default function glassaluminiumPage() {
  return (
    <ServiceDetail
      service={serviceBySlug("glass-aluminium")!}
      image={{
        src: "/images/Services/glass-aluminium-works-installation-dubai-uae.png",
        alt: "Glass and aluminium works installation in Dubai",
      }}
    />
  );
}
