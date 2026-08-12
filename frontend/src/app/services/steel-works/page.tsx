import { serviceBySlug } from "@/lib/services";
import { ServiceDetail } from "@/components/service-detail";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Steel Works",
  description:
    "Steel works in Dubai — structural and architectural steel fabrication, welding and installation for buildings and staircases.",
  path: "/services/steel-works",
});

export default function steelworksPage() {
  return (
    <ServiceDetail
      service={serviceBySlug("steel-works")!}
      image={{
        src: "/images/Services/structural-steel-works-welding-dubai-uae.png",
        alt: "Structural steel works and welding in Dubai",
      }}
    />
  );
}
