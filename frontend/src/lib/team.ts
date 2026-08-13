export type TeamMember = {
  name: string;
  role: string;
  subrole?: string;
  photo: string;
  /**
   * Short bio (1–2 lines). The SEO brief provides a bio template but no
   * verified biographies — leave empty rather than inventing experience or
   * years of service. Awaiting client confirmation.
   */
  bio?: string;
};

/**
 * Real team members as published on the existing website. Names, roles and
 * photos are factual; biographies are pending client confirmation.
 */
export const teamMembers: TeamMember[] = [
  {
    name: "Engr. Essa Almulla",
    role: "Founder / CEO",
    photo: "/images/Our Team/mr.issa.png",
  },
  {
    name: "Eiahia Sohel",
    role: "Business Development Manager",
    photo: "/images/Our Team/sohel.png",
  },
  {
    name: "Marlyn Policarpio",
    role: "Accountant / Admin",
    photo: "/images/Our Team/marllyn.jpg",
  },
  {
    name: "Syed Talib Hussain",
    role: "Digital Marketing Manager",
    subrole: "Associate",
    photo: "/images/Our Team/team1.jpeg",
  },
  {
    name: "Mahmoud Mandour",
    role: "PR Manager",
    photo: "/images/Our Team/mahmoud.png",
  },
  {
    name: "Ghulam Murtaza",
    role: "Supervisor",
    photo: "/images/Our Team/ghulam.png",
  },
];
