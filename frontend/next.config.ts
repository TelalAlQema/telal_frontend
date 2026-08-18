// import type { NextConfig } from "next";

// const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

// const nextConfig: NextConfig = {
//    output: "export",
//   async rewrites() {
    
//     return {
//       beforeFiles: [
//         {
//           source: "/api/v1/:path*",
//           destination: `${BACKEND_URL}/api/v1/:path*`,
//         },
//       ],
//     };
//   },
//   async redirects() {
//     const legacy = [
//       ["index.php", "/"],
//       ["about.php", "/about"],
//       ["ourteam.php", "/our-team"],
//       ["contact.php", "/contact"],
//       ["mainservices.php", "/services"],
//       ["hvac.php", "/services/hvac"],
//       ["electrical.php", "/services/electrical"],
//       ["automatication.php", "/services/home-automation"],
//       ["plumbing.php", "/services/plumbing"],
//       ["fitout.php", "/services/fit-out"],
//       ["renovation.php", "/services/renovation"],
//       ["woodwork.php", "/services/wood-work"],
//       ["tiling.php", "/services/tiling"],
//       ["ceiling.php", "/services/ceiling"],
//       ["steel.php", "/services/steel-works"],
//       ["glass.php", "/services/glass-aluminium"],
//       ["light.php", "/services/lighting"],
//       ["waterproof.php", "/services/waterproofing"],
//       ["cleaning.php", "/services/cleaning"],
//       ["policy.php", "/privacy-policy"],
//       ["term.php", "/terms-and-conditions"],
//       ["refund.php", "/refund-policy"],
//       ["thankyou.php", "/thank-you"],
//       ["detail.php", "/"],
//       ["login.php", "/"],
//       ["logout.php", "/"],
//       ["register.php", "/"],
//     ].map(([source, destination]) => ({
//       source: `/${source}`,
//       destination,
//       permanent: true,
//     }));

//     return legacy;
//   },
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  images: {
    unoptimized: true,
  },
};

export default nextConfig;