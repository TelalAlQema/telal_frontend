import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Image from "next/image";

import { ContactForm } from "@/components/contact-form";
import { ContactInfoCard } from "@/components/contact-info-card";
import { PageHeader } from "@/components/layout/page-header";
import { breadcrumbJsonLd, createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = createMetadata({
  title: "Contact Us | Telal Al Qema Building Contracting Dubai",
  description:
    "Contact Telal Al Qema Building Contracting in Dubai for a free quote on MEP, fit-out, renovation, or AMC services. Call, WhatsApp, or send an enquiry.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Get in Touch"
        description="Tell us what you need — we'll get back to you with a free quote, usually within 24 hours."
        breadcrumb="Contact"
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
                  Contact Details
                </h2>
                <p className="text-ink mt-2 text-sm">
                  Call, WhatsApp, or send an enquiry — we usually reply within
                  24 hours.
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
                  title="Phone"
                  link={siteConfig.telUrl}
                  linkLabel={siteConfig.phone}
                  hint="Call for a free quote"
                />
                <ContactInfoCard
                  icon={MessageCircle}
                  title="WhatsApp"
                  link={siteConfig.whatsappUrl}
                  linkLabel={siteConfig.whatsapp}
                  hint="Chat on WhatsApp"
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact Telal Al Qema Building Contracting",
            url: `${siteConfig.url}/contact`,
            description:
              "Contact Telal Al Qema Building Contracting in Dubai for a free quote on MEP, fit-out, renovation, or AMC services.",
            mainEntity: {
              "@type": "LocalBusiness",
              name: siteConfig.legalName,
              telephone: siteConfig.phoneRaw,
              email: siteConfig.email,
              address: {
                "@type": "PostalAddress",
                streetAddress: "Al Reem Tower, Office 1301",
                addressLocality: "Dubai",
                addressCountry: "AE",
              },
            },
          }).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Contact Us", path: "/contact" },
            ]),
          ).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
