import { serviceBySlug } from "@/lib/services";
import { ServiceDetail } from "@/components/service-detail";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Renovation",
  description:
    "Home and office renovation in Dubai — structural and cosmetic upgrades, refurbishment and modernisation planned to minimise disruption.",
  path: "/services/renovation",
});

export default function renovationPage() {
  return (
    <ServiceDetail
      service={serviceBySlug("renovation")!}
      image={{
        src: "/images/Services/apartment-renovation-before-after-dubai-uae.png",
        alt: "Apartment renovation before and after in Dubai",
      }}
    />
  );
}
