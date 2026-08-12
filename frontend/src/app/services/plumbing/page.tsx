import { serviceBySlug } from "@/lib/services";
import { ServiceDetail } from "@/components/service-detail";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Plumbing",
  description:
    "Plumbing services in Dubai — sanitary, drainage and water supply installation, leak detection and repairs for residential and commercial buildings.",
  path: "/services/plumbing",
});

export default function plumbingPage() {
  return (
    <ServiceDetail
      service={serviceBySlug("plumbing")!}
      image={{
        src: "/images/Services/plumbing-repair-utility-pipes-dubai-uae.png",
        alt: "Plumbing repair and utility pipes in Dubai",
      }}
    />
  );
}
