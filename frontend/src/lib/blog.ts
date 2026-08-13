export type BlogCategory = {
  slug: string;
  title: string;
  description: string;
};

export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "faq"; items: { question: string; answer: string }[] }
  | {
      type: "cta";
      text: string;
      href?: string;
      anchor?: string;
      buttonLabel?: string;
      buttonHref?: string;
    };

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  date: string;
  dateLabel: string;
  author: string;
  category: string;
  readTimeMinutes: number;
  keywords: string[];
  image: { src: string; alt: string };
  content: BlogBlock[];
  relatedSlugs?: string[];
};

/**
 * Blog content pillars. Every post is assigned one category so the hub can be
 * filtered and so planned posts (see the 12-post editorial roadmap in the SEO
 * brief) can be added under the same structure.
 */
export const blogCategories: BlogCategory[] = [
  {
    slug: "mep-maintenance",
    title: "MEP & Maintenance Tips",
    description: "HVAC, electrical, plumbing upkeep and troubleshooting",
  },
  {
    slug: "renovation-fitout",
    title: "Renovation & Fit-Out Guides",
    description: "Planning, cost, and process content",
  },
  {
    slug: "smart-homes",
    title: "Smart Homes & Automation",
    description: "Home automation trends and how-tos",
  },
  {
    slug: "cost-buying",
    title: "Cost & Buying Guides",
    description: "How much does it cost in Dubai style content",
  },
  {
    slug: "company-news",
    title: "Company News & Projects",
    description: "Completed project write-ups, announcements",
  },
];

export const posts: BlogPost[] = [
  {
    slug: "how-often-service-ac-dubai",
    title: "How Often Should You Service Your AC in Dubai? A Complete Guide",
    description:
      "Find out how often to service your AC in Dubai's climate, what a proper service includes, and the warning signs you shouldn't ignore.",
    excerpt:
      "Residential AC units in Dubai should be serviced every 3 to 4 months. Here's what a proper service includes and the warning signs you shouldn't ignore.",
    date: "2026-08-13",
    dateLabel: "Aug 13, 2026",
    author: "Telal Al Qema Team",
    category: "MEP & Maintenance Tips",
    readTimeMinutes: 6,
    keywords: [
      "AC maintenance Dubai",
      "AC service schedule Dubai",
      "HVAC maintenance frequency",
      "AC maintenance tips Dubai",
    ],
    image: {
      src: "/images/Services/hvac-installation-maintenance-dubai-uae-rooftop.png",
      alt: "HVAC technician servicing an air conditioning unit on a Dubai rooftop",
    },
    content: [
      {
        type: "paragraph",
        text: "If you live or work in Dubai, your air conditioning system isn't a convenience — it's essential equipment running under constant strain for most of the year. Yet AC maintenance is one of the most overlooked parts of property upkeep, usually only addressed after something breaks. Here's what a proper maintenance schedule actually looks like, and why sticking to it saves you money.",
      },
      {
        type: "heading",
        text: "How often should you service your AC?",
      },
      {
        type: "paragraph",
        text: "As a general rule, residential AC units in Dubai should be serviced every 3 to 4 months. That's more frequent than the annual servicing common in cooler climates, and it's because of two factors specific to this region: near year-round usage, and high levels of dust and sand that clog filters and coils far faster than in most other markets.",
      },
      {
        type: "list",
        items: [
          "Villas & apartments (standard use): every 3–4 months",
          "Commercial spaces & offices (heavy use): every 2–3 months",
          "Units near construction sites or with high dust exposure: every 6–8 weeks for filter checks, full service every 3 months",
        ],
      },
      {
        type: "heading",
        text: "What does a proper AC service include?",
      },
      {
        type: "paragraph",
        text: "A thorough service is more than a quick filter wipe. At minimum, it should cover:",
      },
      {
        type: "list",
        items: [
          "Filter cleaning or replacement",
          "Coil cleaning (both indoor and outdoor units)",
          "Duct inspection and cleaning where needed",
          "Refrigerant (gas) level check and top-up if required",
          "Drainage check to prevent leaks and water damage",
          "General inspection of electrical connections and thermostat function",
        ],
      },
      {
        type: "heading",
        text: "Warning signs you shouldn't ignore",
      },
      {
        type: "paragraph",
        text: "Between scheduled services, watch for these signs that your system needs attention sooner:",
      },
      {
        type: "list",
        items: [
          "Weaker airflow or longer cooling times",
          "Unusual noise or a burning smell when the unit runs",
          "Water pooling near indoor units",
          "A noticeable jump in your DEWA bill with no change in usage",
        ],
      },
      {
        type: "heading",
        text: "Why regular servicing actually saves you money",
      },
      {
        type: "paragraph",
        text: "A neglected AC system doesn't just fail more often — it runs less efficiently the whole time it's neglected, which shows up directly in your electricity bill. Regular maintenance typically costs far less than a single emergency repair or a full unit replacement, and it extends the working life of equipment that's expensive to install in the first place.",
      },
      {
        type: "cta",
        text: "Need this handled by a professional? Our HVAC installation and maintenance team services villas, apartments, and commercial properties across Dubai — as a one-off visit or as part of an Annual Maintenance Contract. Get a free quote today.",
        href: "/services/hvac",
        anchor: "our HVAC installation and maintenance team",
        buttonLabel: "Get a Free HVAC Quote",
        buttonHref: "/contact",
      },
    ],
    relatedSlugs: [
      "annual-maintenance-contract-worth-it-dubai",
      "duct-cleaning-vs-coil-cleaning",
      "villa-maintenance-checklist-dubai",
    ],
  },
  {
    slug: "annual-maintenance-contract-dubai-summer",
    title:
      "Why Every Villa and Office in Dubai Needs an AMC Before Summer Peaks",
    description:
      "Learn why an Annual Maintenance Contract (AMC) is essential for Dubai villas and offices during peak summer heat. HVAC, plumbing & electrical maintenance from Telal Al Qema Building Contracting.",
    excerpt:
      "With August temperatures passing 45°C, small maintenance gaps turn into expensive emergencies. Here's why an Annual Maintenance Contract is essential for Dubai villas and offices — and what a good AMC should cover.",
    date: "2026-08-11",
    dateLabel: "Aug 11, 2026",
    author: "Telal Al Qema Building Contracting",
    category: "MEP & Maintenance Tips",
    readTimeMinutes: 7,
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
        text: "Ready to protect your property before the next heatwave? Contact Telal Al Qema Building Contracting for a free AMC consultation, or call +971 4 337 2440.",
        href: "/services/amc",
        anchor: "Telal Al Qema Building Contracting",
        buttonLabel: "Get My AMC Quote",
        buttonHref: "/services/amc",
      },
    ],
  },
];

export const getPostBySlug = (slug: string): BlogPost | undefined =>
  posts.find((post) => post.slug === slug);
