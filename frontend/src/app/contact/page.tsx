import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

import { ContactForm } from "@/components/contact-form";
import { ContactInfoCard } from "@/components/contact-info-card";
import { CtaBanner } from "@/components/cta-banner";
import { PageHeader } from "@/components/layout/page-header";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = createMetadata({
  title: "Contact Us",
  description:
    "Contact Telal Al Qema Building Contracting in Dubai. Request a free quote by phone, WhatsApp or email — we respond within one working day.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        description="Have a project in mind? Tell us about it and get a free, no-obligation quotation within one working day."
        breadcrumb="Get in touch"
      />
      <section className="py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <Image
            src="/images/Contact Us/contact-telal-building-contracting-dubai-office-desk.png"
            alt="Telal Al Qema building contracting office desk in Dubai"
            width={1774}
            height={887}
            priority
            className="mb-12 w-full rounded-xl object-cover shadow-sm"
          />
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="space-y-6 lg:col-span-5">
              <div>
                <h2 className="font-heading text-navy text-2xl font-semibold">
                  Get in Touch
                </h2>
                <p className="text-ink mt-2 text-sm">
                  Visit us or simply send us an email anytime. If you have any
                  questions, please feel free to contact us.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <ContactInfoCard
                  icon={MapPin}
                  title="Address"
                  link={siteConfig.mapUrl}
                  linkLabel={siteConfig.address}
                  hint="Open in Google Maps"
                />
                <ContactInfoCard
                  icon={Phone}
                  title="Phone No"
                  link={siteConfig.whatsappMobileUrl}
                  linkLabel={`WhatsApp · ${siteConfig.phoneMobile}`}
                  hint={`Direct · ${siteConfig.phone}`}
                />
                <ContactInfoCard
                  icon={Mail}
                  title="Email"
                  link={siteConfig.emailHref}
                  linkLabel={siteConfig.email}
                  hint="Replies within one working day"
                />
              </div>

              <div className="overflow-hidden rounded-xl border shadow-sm">
                <iframe
                  src={siteConfig.mapsEmbedUrl}
                  title="Telal Al Qema — Al Reem Tower, Dubai"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
