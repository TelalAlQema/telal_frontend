import {
  CalendarClock,
  Cpu,
  Droplets,
  Frame,
  Grid3x3,
  Hammer,
  Layers,
  Lightbulb,
  Paintbrush,
  ShieldCheck,
  Sparkles,
  Wind,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

export type ServiceGroupId = "mep" | "fitout" | "maintenance";

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  icon: LucideIcon;
  group: ServiceGroupId;
  included?: string[];
  whyChoose?: string[];
  faqs?: { question: string; answer: string }[];
};

export const serviceGroups: {
  id: ServiceGroupId;
  title: string;
  intro: string;
}[] = [
  {
    id: "mep",
    title: "MEP Services",
    intro:
      "The mechanical, electrical, and plumbing systems that keep your property running safely and efficiently.",
  },
  {
    id: "fitout",
    title: "Fit-Out & Interiors",
    intro:
      "From a single room to a full commercial fit-out, built to your design and finished to a high standard.",
  },
  {
    id: "maintenance",
    title: "Maintenance & Support",
    intro: "Keep your property protected and running smoothly year-round.",
  },
];

export const services: Service[] = [
  {
    slug: "hvac",
    title: "HVAC Installation & Maintenance",
    short:
      "AC installation, repair, coil and duct cleaning, and full HVAC system maintenance to keep Dubai homes and offices cool and efficient year-round.",
    description:
      "Dubai's climate puts real strain on air conditioning systems — regular maintenance isn't optional, it's essential. Telal Al Qema installs, services, and repairs HVAC systems for villas, apartments, and commercial spaces, keeping your property cool, efficient, and running the way it should, year-round.",
    icon: Wind,
    group: "mep",
    included: [
      "New AC unit installation and system setup",
      "Routine servicing, gas top-up, and filter replacement",
      "Duct cleaning and coil cleaning",
      "Fault diagnosis and repair for cooling, noise, or leak issues",
      "Full system maintenance under an Annual Maintenance Contract (AMC)",
    ],
    whyChoose: [
      "Technicians experienced with residential and commercial systems across Dubai's building types.",
      "Transparent pricing with no hidden call-out fees.",
      "Available as a one-off service or as part of a wider AMC package.",
    ],
    faqs: [
      {
        question: "How often should I service my AC in Dubai?",
        answer:
          "Every 3 to 4 months is recommended given Dubai's heat and dust; more frequently for heavy-use commercial systems.",
      },
      {
        question: "Do you offer emergency AC repair?",
        answer:
          "[Confirm with client: yes/no and response time before publishing.]",
      },
      {
        question: "Is HVAC maintenance included in your AMC?",
        answer:
          "Yes, HVAC is one of the core services included in our Annual Maintenance Contracts.",
      },
    ],
  },
  {
    slug: "electrical",
    title: "Electrical System Installation & Maintenance",
    short:
      "Safe, code-compliant electrical wiring, panel upgrades, and troubleshooting for residential and commercial properties.",
    description:
      "We deliver complete electrical works: cabling, panels, distribution, lighting control and AV-ready wiring, installed to Dubai specification and maintained to minimise downtime.",
    icon: Zap,
    group: "mep",
  },
  {
    slug: "home-automation",
    title: "Home Automation System",
    short:
      "Smart home installation for lighting, climate, security, and entertainment, controlled from a single app.",
    description:
      "Automated lighting, security, climate control, and modern smart home systems for convenience and efficiency — installed and programmed by our technicians.",
    icon: Cpu,
    group: "mep",
  },
  {
    slug: "plumbing",
    title: "Plumbing",
    short:
      "Leak repairs, pipe installation, fixture upgrades, and full plumbing system maintenance.",
    description:
      "From concealed plumbing for new fit-outs to leak detection, drainage and water tank works, our plumbers keep water flowing where it should and sealed where it shouldn't.",
    icon: Droplets,
    group: "mep",
  },
  {
    slug: "fit-out",
    title: "Fit Out",
    short:
      "Complete interior fit-out for residential, retail, and commercial spaces, from concept to handover.",
    description:
      "Turn-key interior fit-out: partitions, suspended ceilings, flooring, joinery and finishes — managed by a single accountable team from first sketch to handover.",
    icon: Hammer,
    group: "fitout",
  },
  {
    slug: "renovation",
    title: "Renovation",
    short:
      "Full or partial villa, apartment, and office renovation with in-house project management.",
    description:
      "Structural and cosmetic renovation — from kitchen and bathroom upgrades to full unit refurbishment — planned to minimise disruption and maximised for durability.",
    icon: Paintbrush,
    group: "fitout",
  },
  {
    slug: "wood-work",
    title: "Wood Works & Carpentry",
    short: "Custom joinery, cabinetry, and furniture built and installed to spec.",
    description:
      "Custom joinery and carpentry: wardrobes, kitchens, offices, partition details and millwork, crafted in our workspaces and installed neatly on site.",
    icon: Wrench,
    group: "fitout",
  },
  {
    slug: "tiling",
    title: "Tiling Works",
    short:
      "Precision floor and wall tiling for kitchens, bathrooms, and living spaces.",
    description:
      "Floor and wall tiling in ceramic, porcelain, granite, marble and mosaic — measured precisely, laid level and grouted to a flawless finish.",
    icon: Grid3x3,
    group: "fitout",
  },
  {
    slug: "ceiling",
    title: "Ceiling Work",
    short: "Gypsum, POP, and suspended ceiling design and installation.",
    description:
      "Gypsum board, suspended and decorative ceilings with integrated lighting, cornices and clean access to services — built to code and crafted to detail.",
    icon: Layers,
    group: "fitout",
  },
  {
    slug: "steel-works",
    title: "Steel Works",
    short: "Structural and decorative steel fabrication and installation.",
    description:
      "Structural steel columns and frames, staircases, canopies and architectural metalwork — fabricated and installed to drawing and tested to local codes.",
    icon: Wrench,
    group: "fitout",
  },
  {
    slug: "glass-aluminium",
    title: "Glass & Aluminium Works",
    short:
      "Partitions, façades, shower enclosures, and aluminium fittings.",
    description:
      "Aluminium windows and doors, glass partitions, curtain walls and structural glazing — supplied, fabricated and installed to specification and tight tolerances.",
    icon: Frame,
    group: "fitout",
  },
  {
    slug: "lighting",
    title: "Lighting on Furniture & High-Level Finishing",
    short:
      "Feature lighting and premium finishing touches for high-end interiors.",
    description:
      "Decorative and functional lighting designed into furniture, feature walls and high-level finishing — bringing interiors to life with controlled, quality light.",
    icon: Lightbulb,
    group: "fitout",
  },
  {
    slug: "waterproofing",
    title: "Water-Proofing",
    short:
      "Roof, bathroom, and terrace waterproofing to prevent leaks and structural damage.",
    description:
      "Waterproofing of roofs, terraces, basins, basements and wet areas using tested membranes and systems, with reliable warranties and re-inspection.",
    icon: ShieldCheck,
    group: "maintenance",
  },
  {
    slug: "cleaning",
    title: "Home & Office Cleaning",
    short:
      "Deep cleaning and regular maintenance cleaning for residential and commercial spaces.",
    description:
      "Post-construction, deep and regular cleaning for homes and offices, using professional equipment and approved products to hand over spaces ready for use.",
    icon: Sparkles,
    group: "maintenance",
  },
  {
    slug: "amc",
    title: "Annual Maintenance Contracts (AMC)",
    short:
      "Year-round property upkeep across multiple services on one predictable contract.",
    description:
      "Cover HVAC, plumbing, electrical, cleaning, and more under a single Annual Maintenance Contract — priced to your property, scheduled around you.",
    icon: CalendarClock,
    group: "maintenance",
  },
];

export const servicesByGroup = (group: ServiceGroupId): Service[] =>
  services.filter((service) => service.group === group);

export const serviceBySlug = (slug: string): Service | undefined =>
  services.find((service) => service.slug === slug);
