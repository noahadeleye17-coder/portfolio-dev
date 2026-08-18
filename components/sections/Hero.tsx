"use client";

import { motion } from "framer-motion";
import { ease, duration } from "@/lib/motion";
import StarryBackground from "@/components/ui/StarryBackground";

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

const headlineLines = [
  "Full-stack Developer.",
  "Building software",
  "that solves problems",
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 overflow-hidden bg-black">
      <StarryBackground />

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
          Noah Adeleye 
        </motion.p>

        <motion.div variants={line} className="relative">
          <h1 className="text-5xl md:text-8xl font-bold leading-[0.95] tracking-tight text-white">
            {headlineLines.map((text, i) => (
              <span key={i} className="block">
                {text}
              </span>
            ))}
          </h1>
        </motion.div>

        <motion.p
          variants={line}
          className="mt-6 max-w-xl text-neutral-400 text-lg"
        >
          I notice the friction people just live with, then build the thing
          that actually fixes it, properly.
        </motion.p>
      </motion.div>
    </section>
  );
}
