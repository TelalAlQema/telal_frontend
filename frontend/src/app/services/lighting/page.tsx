import { serviceBySlug } from "@/lib/services";
import { ServiceDetail } from "@/components/service-detail";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Lighting on Furniture & High-Level Finishing",
  description:
    "Decorative lighting in Dubai — accent and functional lighting integrated into furniture and high-level finishes to transform interiors.",
  path: "/services/lighting",
});

export default function lightingPage() {
  return <ServiceDetail service={serviceBySlug("lighting")!} />;
}
