import { serviceBySlug } from "@/lib/services";
import { ServiceDetail } from "@/components/service-detail";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Home & Office Cleaning Dubai | Telal Al Qema",
  description:
    "Home and office cleaning in Dubai — deep, regular and post-construction cleaning with professional equipment and approved products.",
  path: "/services/cleaning",
});

export default function cleaningPage() {
  return (
    <ServiceDetail
      service={serviceBySlug("cleaning")!}
      image={{
        src: "/images/Services/home-office-cleaning-services-dubai-commercial-team.png",
        alt: "Home and office cleaning services in Dubai",
      }}
    />
  );
}
