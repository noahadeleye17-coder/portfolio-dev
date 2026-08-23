"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import StarryBackground from "@/components/ui/StarryBackground";
import { fadeUp } from "@/lib/motion";

// The bio beat — a real photo + plain-language "who is this person"
// copy. Replaces the old "Noticing" placeholder section. Keep this
// scannable: one-line identity, what he builds, current status
// (school/level/in-progress work), CV link. No narrative framing —
// that's not this section's job.
export default function Bio() {
  return (
    <section className="relative h-full flex items-center px-6 md:px-16 py-10 md:py-16 bg-black overflow-hidden">
      {/* Dimmed vs. Hero's — same field, quieter presence, so this
          reads as a continuation of the same surface, not a new page */}
      <div className="absolute inset-0 opacity-30">
        <StarryBackground />
      </div>

      <div className="relative z-10 grid md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-8 md:gap-12 items-center max-w-5xl w-full">
        {/* Photo slot — placeholder for now */}
        <ScrollReveal variants={fadeUp}>
          <div
            className="aspect-3/4 w-full max-w-xs mx-auto md:mx-0 rounded-2xl
                       border border-dashed border-white/20 bg-white/5
                       flex items-center justify-center text-neutral-500 text-sm"
          >
            {/* TODO: real photo — desaturated/duotone treatment to match Hero */}
            photo goes here
          </div>
        </ScrollReveal>

        {/* Bio copy */}
        <ScrollReveal variants={fadeUp} className="max-w-xl">
          <p className="text-xl md:text-3xl font-semibold leading-snug">
            {/* TODO: one-line identity */}
            Full-stack developer, AI/ML Engineer. Building real products,from backend architecture to deployment.
          </p>

          <ul className="mt-4 space-y-2 text-neutral-400 text-base md:text-lg">
            <li className="flex gap-3">
              <span className="text-white">*</span>
              <span>
                Currently pursuing a degree in Computer Information Systems
                at the Federal University of Technology Akure — 3rd-year
                student.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-white">*</span>
              <span>
                Currently shipping{" "}
                <a
                  href="#projects"
                  className="text-white font-semibold underline underline-offset-4 decoration-white/40 hover:decoration-white transition-colors"
                >
                  Off-Campus Hub
                </a>
                , a student housing &amp; roommate-matching platform with
                geo-location for FUTA students.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-white">*</span>
              <span>
                Alongside other projects exploring AI and machine learning.
              </span>
            </li>
          </ul>

          <a
            href="#"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20
                       px-6 py-3 text-sm text-white hover:bg-white hover:text-black
                       transition-colors"
          >
            {/* TODO: real CV link */}
            View CV
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
