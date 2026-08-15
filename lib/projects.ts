export type Project = {
  slug: string;
  title: string;
  problem: string;
  craft: string;
  outcome: string;
  link?: string;
};

// Fill these in with real copy when ready — kept short on purpose,
// each project should read as problem → craft → outcome.
export const projects: Project[] = [
  {
    slug: "off-campus-hub",
    title: "Off-Campus Hub",
    problem: "FUTA students struggling to find housing and roommates.",
    craft: "Full-stack listings + roommate-matching platform, built solo.",
    outcome: "",
    link: "https://offcampushub.ng",
  },
  {
    slug: "vendor-storefront",
    title: "Vendor Storefront Platform",
    problem: "Nigerian vendors selling over WhatsApp with no real storefront.",
    craft: "Multi-tenant storefront builder — a customizable site per vendor.",
    outcome: "",
  },
  {
    slug: "commitment-issues",
    title: "Commitment Issues",
    problem: "Git history says a lot about how someone builds — nobody sees it.",
    craft: "Shareable git-commit personality readout, Next.js on Vercel.",
    outcome: "",
  },
];
