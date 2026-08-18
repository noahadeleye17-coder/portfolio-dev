"use client";

import { motion } from "framer-motion";

const links = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2.5rem)] max-w-3xl"
    >
      <nav
        className="flex items-center justify-between gap-6 rounded-full border border-white/10
                   bg-white/5 px-5 py-3 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
      >
        <span className="text-xs tracking-widest uppercase text-neutral-400 whitespace-nowrap">
          Noah Adeleye · Nigeria
        </span>

        <ul className="flex items-center gap-6">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-neutral-300 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}
