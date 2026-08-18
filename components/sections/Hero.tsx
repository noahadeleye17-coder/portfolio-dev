"use client";

import { motion } from "framer-motion";
import { ease, duration } from "@/lib/motion";
import DistortedText from "@/components/ui/DistortedText";

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
  "Noah Adeleye /",
  "I build what everyone",
  "just puts up with.",
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-[0.12]">
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
            <feColorMatrix in="noise" type="saturate" values="0" result="grayNoise" />
            <feComponentTransfer in="grayNoise">
              <feFuncA type="linear" slope="2.2" intercept="-0.35" />
            </feComponentTransfer>
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

        <motion.div variants={line} className="relative">
          <h1
            aria-hidden={false}
            className="text-5xl md:text-8xl font-bold leading-[0.95] tracking-tight opacity-0 select-none"
          >
            {headlineLines.map((text, i) => (
              <span key={i} className="block">
                {text}
              </span>
            ))}
          </h1>
          <DistortedText lines={headlineLines} fontSizeDesktop={96} fontSizeMobile={48} />
        </motion.div>

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