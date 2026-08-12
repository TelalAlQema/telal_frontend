export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "faq"; items: { question: string; answer: string }[] }
  | { type: "cta"; text: string };

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  date: string;
  dateLabel: string;
  author: string;
  keywords: string[];
  image: { src: string; alt: string };
  content: BlogBlock[];
};

export const posts: BlogPost[] = [
  {
    slug: "annual-maintenance-contract-dubai-summer",
    title: "Why Every Villa and Office in Dubai Needs an AMC Before Summer Peaks",
    description:
      "Learn why an Annual Maintenance Contract (AMC) is essential for Dubai villas and offices during peak summer heat. HVAC, plumbing & electrical maintenance from Telal Al Qema Building Contracting.",
    excerpt:
      "With August temperatures passing 45°C, small maintenance gaps turn into expensive emergencies. Here's why an Annual Maintenance Contract is essential for Dubai villas and offices — and what a good AMC should cover.",
    date: "2026-08-11",
    dateLabel: "Aug 11, 2026",
    author: "Telal Al Qema Building Contracting",
    keywords: [
      "AMC Dubai",
      "annual maintenance contract Dubai",
      "villa maintenance company Dubai",
      "AC maintenance Dubai summer",
      "HVAC maintenance contract UAE",
      "building maintenance company Dubai",
    ],
    image: {
      src: "/images/Services/hvac-installation-maintenance-dubai-uae-rooftop.png",
      alt: "HVAC rooftop units serviced under an annual maintenance contract in Dubai",
    },
    content: [
      {
        type: "paragraph",
        text: "Dubai's summer doesn't ease in — it arrives all at once, and by August, temperatures regularly climb past 45°C. For villa owners, facility managers, and business operators across the city, this is the season when small maintenance gaps turn into expensive emergencies: AC units that can't keep up, water tanks overheating, electrical panels under strain, and plumbing systems pushed to their limits.",
      },
      {
        type: "paragraph",
        text: "This is exactly why an Annual Maintenance Contract (AMC) isn't a luxury — it's one of the most cost-effective decisions a property owner in the UAE can make.",
      },
      {
        type: "heading",
        text: "What Is an AMC, and Why Does It Matter in Dubai?",
      },
      {
        type: "paragraph",
        text: "An Annual Maintenance Contract is a year-round agreement between a property owner and a technical services provider, covering scheduled and on-call maintenance across HVAC, plumbing, electrical systems, and general upkeep. Instead of calling different contractors every time something breaks, an AMC gives you one accountable partner — with predictable costs and priority response times.",
      },
      {
        type: "paragraph",
        text: "In a climate like Dubai's, where AC systems run almost continuously for eight months of the year, this kind of structured maintenance isn't optional. It's the difference between a unit lasting 10+ years or failing within five.",
      },
      {
        type: "heading",
        text: "The Real Cost of Skipping Maintenance in Summer",
      },
      {
        type: "paragraph",
        text: "When an AC unit, water heater, or electrical panel fails in August, you're not just paying for a repair — you're paying a premium for emergency service, often with limited technician availability because everyone else is dealing with the same seasonal surge. A blocked condenser coil or low refrigerant level that could have been caught in a routine service visit becomes a same-day breakdown, sometimes in an occupied villa or a full office floor.",
      },
      {
        type: "paragraph",
        text: "Common summer failure points we see across Dubai properties include:",
      },
      {
        type: "list",
        items: [
          "AC coil and duct blockages from dust accumulation, reducing cooling efficiency by up to 30%",
          "Overworked compressors running non-stop without adequate servicing",
          "Water tank overheating, which affects both usability and hygiene",
          "Electrical panels under load stress, especially in older or under-serviced buildings",
          "Plumbing pressure issues as demand spikes across a building",
        ],
      },
      {
        type: "paragraph",
        text: "Each of these is preventable with scheduled inspection — and expensive to fix once it becomes a breakdown.",
      },
      {
        type: "heading",
        text: "What a Good AMC Package Should Cover",
      },
      {
        type: "paragraph",
        text: "Not all AMC packages are equal. A comprehensive contract with Telal Al Qema Building Contracting typically includes:",
      },
      {
        type: "list",
        items: [
          "HVAC servicing — coil and duct cleaning, refrigerant checks, filter replacement, and performance testing",
          "Electrical system checks — panel inspection, load testing, and safety compliance",
          "Plumbing maintenance — pipe inspection, leak detection, and water tank cleaning",
          "General property upkeep — for villas, this can extend to painting touch-ups, minor carpentry, and fixture repairs",
          "Priority emergency response — AMC clients are served ahead of one-off service requests",
        ],
      },
      {
        type: "paragraph",
        text: "For commercial clients, an AMC also simplifies budgeting: instead of unpredictable repair invoices throughout the year, maintenance becomes a fixed, planned cost.",
      },
      {
        type: "heading",
        text: "Villas vs. Offices: Slightly Different Priorities",
      },
      {
        type: "paragraph",
        text: "For villas, the biggest AMC value is around AC systems, water tank cleaning, and general handyman coverage — the things that affect daily comfort and are easy to overlook until something stops working.",
      },
      {
        type: "paragraph",
        text: "For offices and commercial spaces, AMC priorities shift toward electrical load management, HVAC systems serving larger footprints, and plumbing infrastructure that affects multiple tenants or floors. Downtime here isn't just inconvenient — it can disrupt business operations entirely.",
      },
      {
        type: "paragraph",
        text: "Either way, the underlying principle is the same: scheduled maintenance costs a fraction of emergency repair, and it extends the working life of every major system in the property.",
      },
      {
        type: "heading",
        text: "When Is the Right Time to Start an AMC?",
      },
      {
        type: "paragraph",
        text: "Ideally, before summer begins — but if you haven't started one yet, now is still a good time. Mid-summer is when systems are under the most stress, which means an inspection today can catch problems before they cause a full breakdown in the weeks ahead. Starting an AMC in August also positions your property well for the remaining peak-heat months and sets up a maintenance rhythm heading into next year.",
      },
      {
        type: "heading",
        text: "Why Property Owners in Dubai Choose Telal Al Qema Building Contracting",
      },
      {
        type: "paragraph",
        text: "We provide AMC packages covering HVAC, electrical, plumbing, and general maintenance for villas, offices, and commercial properties across Dubai. Our technicians work with modern diagnostic equipment, follow a structured maintenance schedule, and prioritize AMC clients for emergency callouts — so a breakdown during peak summer doesn't mean a multi-day wait.",
      },
      {
        type: "paragraph",
        text: "One call can solve all your property's technical problems — before they become expensive ones.",
      },
      {
        type: "heading",
        text: "Frequently Asked Questions",
      },
      {
        type: "faq",
        items: [
          {
            question: "How often does AC servicing happen under an AMC?",
            answer:
              "Most AMC packages include quarterly or bi-monthly HVAC servicing during peak season, with additional visits available on request.",
          },
          {
            question: "Can I start an AMC mid-year?",
            answer:
              "Yes. AMC contracts can begin at any time, and starting now still covers you through the remaining summer months and into next year.",
          },
          {
            question: "Is an AMC only for large commercial buildings?",
            answer:
              "No — AMC packages are equally valuable for individual villas and small offices, where consistent upkeep prevents costly one-off repairs.",
          },
          {
            question: "What's included besides AC maintenance?",
            answer:
              "A full AMC typically covers electrical checks, plumbing maintenance, water tank cleaning, and general property upkeep, depending on the package selected.",
          },
        ],
      },
      {
        type: "cta",
        text: "Ready to protect your property before the next heatwave? Contact Telal Al Qema Building Contracting for a free AMC consultation, or call +971 43 372 440.",
      },
    ],
  },
];

export const getPostBySlug = (slug: string): BlogPost | undefined =>
  posts.find((post) => post.slug === slug);
