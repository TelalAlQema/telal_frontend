import { ServiceDetail } from "@/components/service-detail";
import { serviceBySlug } from "@/lib/services";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Annual Maintenance Contracts (AMC) Dubai | Telal Al Qema",
  description:
    "Year-round property maintenance in Dubai under one contract. Cover HVAC, plumbing, electrical, cleaning, and more with Telal Al Qema's Annual Maintenance Contract (AMC).",
  path: "/services/amc",
});

export default function AmcPage() {
  return <ServiceDetail service={serviceBySlug("amc")!} />;
}
