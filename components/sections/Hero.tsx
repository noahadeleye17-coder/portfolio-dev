"use client";

import { motion } from "framer-motion";
import { ease, duration } from "@/lib/motion";

// Entrance choreography: label -> headline lines -> subtext,
// staggered so the page feels like it's arriving, not just appearing.
const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.15 },
  },
};

const line = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: ease.human },
  },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 overflow-hidden">
      {/* Animated grain — a filter-driven texture, not a static PNG,
          so the background feels alive even when nothing else moves.
          Cursor-reactive text distortion is the next layer to add here. */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay">
        <svg className="w-full h-full">
          <filter id="grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.85"
              numOctaves={3}
              stitchTiles="stitch"
              result="noise"
            >
              <animate
                attributeName="seed"
                values="1;25;50;75;1"
                dur="1.4s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feColorMatrix in="noise" type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={container}
        className="relative z-10"
      >
        <motion.p
          variants={line}
          className="text-sm tracking-widest uppercase text-neutral-500 mb-6"
        >
          Full-stack developer · Nigeria
        </motion.p>

        <h1 className="text-5xl md:text-8xl font-bold leading-[0.95] tracking-tight">
          <motion.span variants={line} className="block">
            Noah Adeleye /
          </motion.span>
          <motion.span variants={line} className="block">
            I build what everyone
          </motion.span>
          <motion.span variants={line} className="block">
            just puts up with.
          </motion.span>
        </h1>

        <motion.p
          variants={line}
          className="mt-6 max-w-xl text-neutral-400 text-lg"
        >
          I notice the friction people just live with — then build the thing
          that actually fixes it, properly.
        </motion.p>
      </motion.div>
    </section>
  );
}
