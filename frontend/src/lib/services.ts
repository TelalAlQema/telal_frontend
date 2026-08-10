import {
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

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    slug: "hvac",
    title: "HVAC Installation & Maintenance",
    short:
      "Design, installation and servicing of air-conditioning and ventilation systems for homes and businesses.",
    description:
      "From split and ducted units to full centralised HVAC plants, our technicians handle design, supply, installation and preventive maintenance — keeping your spaces cool, ventilated and energy-efficient year round.",
    icon: Wind,
  },
  {
    slug: "electrical",
    title: "Electrical System Installation & Maintenance",
    short:
      "Safe, code-compliant electrical installation, upgrades and maintenance for residential and commercial projects.",
    description:
      "We deliver complete electrical works: cabling, panels, distribution, lighting control and AV-ready wiring, installed to Dubai specification and maintained to minimise downtime.",
    icon: Zap,
  },
  {
    slug: "plumbing",
    title: "Plumbing",
    short:
      "Supply, installation and repair of sanitary, drainage and water-supply systems.",
    description:
      "From concealed plumbing for new fit-outs to leak detection, drainage and water tank works, our plumbers keep water flowing where it should and sealed where it shouldn't.",
    icon: Droplets,
  },
  {
    slug: "fit-out",
    title: "Fit Out",
    short:
      "Complete interior fit-out for offices, retail and residential spaces — on time and on budget.",
    description:
      "Turn-key interior fit-out: partitions, suspended ceilings, flooring, joinery and finishes — managed by a single accountable team from first sketch to handover.",
    icon: Hammer,
  },
  {
    slug: "renovation",
    title: "Renovation",
    short:
      "Refresh and upgrade of interiors, exteriors and service lines to modern standards.",
    description:
      "Structural and cosmetic renovation — from kitchen and bathroom upgrades to full unit refurbishment — planned to minimise disruption and maximised for durability.",
    icon: Paintbrush,
  },
  {
    slug: "wood-work",
    title: "Wood Works",
    short:
      "Custom carpentry, joinery and furniture installation finished to specification.",
    description:
      "Custom joinery and carpentry: wardrobes, kitchens, offices, partition details and millwork, crafted in our workspaces and installed neatly on site.",
    icon: Wrench,
  },
  {
    slug: "tiling",
    title: "Tiling Works",
    short:
      "Professional tiling of floors, walls, entryways and bathrooms with precision laying.",
    description:
      "Floor and wall tiling in ceramic, porcelain, granite, marble and mosaic — measured precisely, laid level and grouted to a flawless finish.",
    icon: Grid3x3,
  },
  {
    slug: "ceiling",
    title: "Ceiling Work",
    short:
      "Gypsum, false and decorative ceilings with integrated lighting and MEP access.",
    description:
      "Gypsum board, suspended and decorative ceilings with integrated lighting, cornices and clean access to services — built to code and crafted to detail.",
    icon: Layers,
  },
  {
    slug: "glass-aluminium",
    title: "Glass & Aluminium Works",
    short:
      "Windows, partitions, facades and aluminium structures — glazed with safety and style.",
    description:
      "Aluminium windows and doors, glass partitions, curtain walls and structural glazing — supplied, fabricated and installed to specification and tight tolerances.",
    icon: Frame,
  },
  {
    slug: "cleaning",
    title: "Home & Office Cleaning",
    short:
      "Deep and regular cleaning for homes, offices and post-construction handover.",
    description:
      "Post-construction, deep and regular cleaning for homes and offices, using professional equipment and approved products to hand over spaces ready for use.",
    icon: Sparkles,
  },
  {
    slug: "lighting",
    title: "Lighting on Furniture & High-Level Finishing",
    short:
      "Accent and decorative lighting integrated into furniture and high-level finishes.",
    description:
      "Decorative and functional lighting designed into furniture, feature walls and high-level finishing — bringing interiors to life with controlled, quality light.",
    icon: Lightbulb,
  },
  {
    slug: "steel-works",
    title: "Steel Works",
    short:
      "Structural and architectural steel fabrication, welding and installation.",
    description:
      "Structural steel columns and frames, staircases, canopies and architectural metalwork — fabricated and installed to drawing and tested to local codes.",
    icon: Wrench,
  },
  {
    slug: "waterproofing",
    title: "Water-Proofing",
    short:
      "Roof, basin and crack protection that stops leaks before they start.",
    description:
      "Waterproofing of roofs, terraces, basins, basements and wet areas using tested membranes and systems, with reliable warranties and re-inspection.",
    icon: ShieldCheck,
  },
];

export const serviceBySlug = (slug: string): Service | undefined =>
  services.find((service) => service.slug === slug);
