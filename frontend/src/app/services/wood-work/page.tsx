import { serviceBySlug } from "@/lib/services";
import { ServiceDetail } from "@/components/service-detail";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Wood Works",
  description:
    "Custom wood works and joinery in Dubai — wardrobes, kitchens, offices and millwork crafted to specification and installed with precision.",
  path: "/services/wood-work",
});

export default function woodworkPage() {
  return (
    <ServiceDetail
      service={serviceBySlug("wood-work")!}
      image={{
        src: "/images/Services/custom-carpentry-joinery-wood-works-dubai-uae.png",
        alt: "Custom carpentry and joinery wood works in Dubai",
      }}
    />
  );
}
