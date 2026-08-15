"use client";

import { motion, Variants } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  variants?: Variants;
  className?: string;
};

// Wrap any block of content to have it fade/rise in as it enters the
// viewport. Swap `variants` per-section (e.g. revealSharp in Craft)
// to shift the motion language between story beats.
export default function ScrollReveal({
  children,
  variants = fadeUp,
  className,
}: ScrollRevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
