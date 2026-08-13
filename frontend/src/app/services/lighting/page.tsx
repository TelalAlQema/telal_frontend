import { serviceBySlug } from "@/lib/services";
import { ServiceDetail } from "@/components/service-detail";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Lighting on Furniture & High-Level Finishing Dubai | Telal Al Qema",
  description:
    "Decorative lighting in Dubai — accent and functional lighting integrated into furniture and high-level finishes to transform interiors.",
  path: "/services/lighting",
});

export default function lightingPage() {
  return (
    <ServiceDetail
      service={serviceBySlug("lighting")!}
      image={{
        src: "/images/Services/led-lighting-luxury-joinery-finishing-dubai-uae.png",
        alt: "LED lighting and luxury joinery finishing in Dubai",
      }}
    />
  );
}
