// Shared motion tokens and variants.
// Keep easing/duration centralized here so animation feels systemized
// across sections rather than picked ad hoc per component.

export const ease = {
  human: [0.22, 1, 0.36, 1], // softer, organic — used in "Noticing" section
  craft: [0.65, 0, 0.35, 1], // tighter, precise — used in "Craft" section
} as const;

export const duration = {
  fast: 0.3,
  base: 0.6,
  slow: 1,
} as const;

// Generic fade + rise on scroll into view
export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease: ease.human },
  },
};

// Sharper variant for the "Craft" section
export const revealSharp = {
  hidden: { opacity: 0, y: 12, clipPath: "inset(0 0 100% 0)" },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: duration.fast, ease: ease.craft },
  },
};

// Stagger wrapper for lists of children (e.g. project cards)
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};
