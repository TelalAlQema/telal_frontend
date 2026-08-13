export const siteConfig = {
  name: "Telal Al Qema",
  legalName: "Telal Al Qema Building Contracting",
  tagline:
    "Dubai-based building contracting — MEP, fit-out, renovation and maintenance services delivered with quality and accountability.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://telal-contracting.com",
  phone: "+971 4 337 2440",
  phoneRaw: "+97143372440",
  telUrl: "tel:+97143372440",
  whatsapp: "+971 55 261 5993",
  whatsappRaw: "+971552615993",
  whatsappUrl: "https://wa.me/971552615993",
  // Alias kept for backward compatibility; matches whatsappUrl.
  whatsappMobileUrl: "https://wa.me/971552615993",
  email: "info@telal-contracting.com",
  emailHref: "mailto:info@telal-contracting.com",
  address: "Al Reem Tower, Office 1301, Dubai, UAE",
  mapUrl: "https://www.google.com/maps/place/25.26325,55.31559",
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.029213659458!2d55.3132251!3d25.2633744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5d10c15be145%3A0xf93e5c8b4f928d15!2sAl%20Reem%20Tower!5e0!3m2!1sen!2sin!4v1713173877613!5m2!1sen!2sin",
  ogImage:
    "/images/About Us/telal-building-contracting-services-dubai-about-us.png",
  adsenseClient: "ca-pub-3498544422186445",
} as const;

export type SiteConfig = typeof siteConfig;
