import { serviceBySlug } from "@/lib/services";
import { ServiceDetail } from "@/components/service-detail";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Electrical System Installation & Maintenance Dubai | Telal Al Qema",
  description:
    "Electrical installation, upgrades and maintenance in Dubai — cabling, panels, distribution and lighting control, installed to specification and maintained reliably.",
  path: "/services/electrical",
});

export default function electricalPage() {
  return (
    <ServiceDetail
      service={serviceBySlug("electrical")!}
      image={{
        src: "/images/Services/electrical-system-installation-maintenance-dubai-uae.png",
        alt: "Electrical system installation and maintenance in Dubai",
      }}
    />
  );
}
