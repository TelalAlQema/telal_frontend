import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { Container } from "@/components/layout/container";
import { serviceGroups, servicesByGroup } from "@/lib/services";
import { siteConfig } from "@/lib/site";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact Us" },
  { href: "/services", label: "Our Services" },
  { href: "/our-team", label: "Our Team" },
];

const legalLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
  { href: "/refund-policy", label: "Refund Policy" },
];

export function Footer() {
  return (
    <footer className="bg-navy-dark text-gray-300">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <p className="font-heading text-lg text-white">{siteConfig.name}</p>
          <p className="text-sm leading-relaxed">
            {siteConfig.legalName}. Trusted contracting across Dubai —
            everything from MEP installations to complete fit-out and
            renovation.
          </p>
        </div>

        <div>
          <p className="font-heading mb-4 text-sm tracking-wide text-white">
            Quick Links
          </p>
          <ul className="space-y-2 text-sm">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-brand">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-heading mb-4 text-sm tracking-wide text-white">
            Our Services
          </p>
          {serviceGroups.map((group) => (
            <div key={group.id} className="mb-3 last:mb-0">
              <p className="mb-1 text-xs tracking-wide text-gray-400 uppercase">
                {group.title}
              </p>
              <ul className="space-y-1.5 text-sm">
                {servicesByGroup(group.id).map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="hover:text-brand"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div>
          <p className="font-heading mb-4 text-sm tracking-wide text-white">
            Contact
          </p>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <Phone className="text-brand mt-0.5 size-4 shrink-0" />
              <a href={siteConfig.telUrl} className="hover:text-brand">
                {siteConfig.phone}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MessageCircle className="text-brand mt-0.5 size-4 shrink-0" />
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand"
              >
                {siteConfig.whatsapp}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="text-brand mt-0.5 size-4 shrink-0" />
              <a href={siteConfig.emailHref} className="hover:text-brand">
                {siteConfig.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="text-brand mt-0.5 size-4 shrink-0" />
              <a
                href={siteConfig.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand"
              >
                {siteConfig.address}
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-5 text-xs text-gray-400 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.legalName}. All rights
            reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-brand">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
