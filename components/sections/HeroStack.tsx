"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Hero from "@/components/sections/Hero";
import Bio from "@/components/sections/Bio";

// Hero stays pinned to the top of the viewport while Bio scrolls
// up and covers it — a classic sticky-stack reveal, done with plain
// CSS `position: sticky` (no scroll-driven JS needed for the base
// effect). Framer Motion is layered on top only for the extra polish:
// Hero scales down and dims slightly as it disappears underneath,
// driven by scroll progress across this wrapper.
export default function HeroStack() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.55]);

  return (
    <div ref={wrapperRef} className="relative">
      <motion.div
        style={{ scale, opacity }}
        className="sticky top-0 h-screen overflow-hidden origin-center"
      >
        <Hero />
      </motion.div>

      <section
        id="about"
        className="sticky top-0 h-screen overflow-hidden rounded-t-[2.5rem] bg-black"
      >
        <Bio />
      </section>
    </div>
  );
}
