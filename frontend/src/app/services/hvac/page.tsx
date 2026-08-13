import { serviceBySlug } from "@/lib/services";
import { ServiceDetail } from "@/components/service-detail";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "HVAC Installation & Maintenance Dubai | Telal Al Qema",
  description:
    "Professional HVAC installation, repair & maintenance in Dubai. AC servicing, duct & coil cleaning, and full system upkeep. Get a free quote today.",
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
