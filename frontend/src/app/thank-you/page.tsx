import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Thank You",
  description:
    "Thank you for contacting Telal Al Qema Building Contracting. We have received your enquiry and will be in touch within one working day.",
  path: "/thank-you",
});

export default function ThankYouPage() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-4 py-16 text-center">
      <span className="bg-brand-soft flex size-16 items-center justify-center rounded-full">
        <CheckCircle2 className="text-brand size-9" />
      </span>
      <h1 className="font-heading text-navy text-2xl font-semibold">
        Thank you — your enquiry has been received
      </h1>
      <p className="text-ink max-w-md text-sm leading-relaxed">
        We&apos;ve got your details and will respond with a quotation within one
        working day. In the meantime, feel free to browse our services or give
        us a call.
      </p>
      <div className="mt-2 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link href="/">Back to Home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/services">Explore Services</Link>
        </Button>
      </div>
    </Container>
  );
}
