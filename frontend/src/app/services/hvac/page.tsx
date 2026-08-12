import { serviceBySlug } from "@/lib/services";
import { ServiceDetail } from "@/components/service-detail";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "HVAC Installation & Maintenance",
  description:
    "Professional HVAC installation, maintenance and repair in Dubai — split and ducted units, ventilation and central systems installed and serviced to manufacturer standards.",
  path: "/services/hvac",
});

export default function hvacPage() {
  return (
    <ServiceDetail
      service={serviceBySlug("hvac")!}
      image={{
        src: "/images/Services/hvac-installation-maintenance-dubai-uae-rooftop.png",
        alt: "HVAC installation and maintenance in Dubai",
      }}
    />
  );
}
