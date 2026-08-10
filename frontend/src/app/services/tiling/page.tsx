import { serviceBySlug } from "@/lib/services";
import { ServiceDetail } from "@/components/service-detail";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Tiling Works",
  description:
    "Professional tiling in Dubai — floors, walls, bathrooms and entrances in ceramic, porcelain, granite, marble and mosaic with precise laying.",
  path: "/services/tiling",
});

export default function tilingPage() {
  return <ServiceDetail service={serviceBySlug("tiling")!} />;
}
