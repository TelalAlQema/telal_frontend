import Image from "next/image";

import { Container } from "@/components/layout/container";

export type BrandPartner = {
  name: string;
  image: { src: string; alt?: string };
};

/**
 * Brand partners / certifications logo strip.
 *
 * Only real partner or certification logos should be added. Alt text follows
 * the SEO brief formula: "[Brand/Certification name] — Telal Al Qema Building
 * Contracting partner". Renders nothing until logos are provided.
 */
export const brandPartners: BrandPartner[] = [];

export function PartnersSection() {
  if (brandPartners.length === 0) return null;

  return (
    <section className="py-14">
      <Container>
        <ul className="flex flex-wrap items-center justify-center gap-8 opacity-80">
          {brandPartners.map((partner) => (
            <li key={partner.name} className="grayscale transition hover:grayscale-0">
              <Image
                src={partner.image.src}
                alt={
                  partner.image.alt ??
                  `${partner.name} — Telal Al Qema Building Contracting partner`
                }
                width={140}
                height={48}
                className="h-12 w-auto object-contain"
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
