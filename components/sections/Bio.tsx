"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import { fadeUp } from "@/lib/motion";

// The bio beat — a real photo + plain-language "who is this person"
// copy. Replaces the old "Noticing" placeholder section. Keep this
// scannable: one-line identity, what he builds, current status
// (school/level/in-progress work), CV link. No narrative framing —
// that's not this section's job.
export default function Bio() {
  return (
    <section className="h-full flex items-center px-6 md:px-16 py-24">
      <div className="grid md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-10 md:gap-16 items-center max-w-5xl w-full">
        {/* Photo slot — placeholder for now */}
        <ScrollReveal variants={fadeUp}>
          <div
            className="aspect-[3/4] w-full max-w-sm mx-auto md:mx-0 rounded-2xl
                       border border-dashed border-white/20 bg-white/5
                       flex items-center justify-center text-neutral-500 text-sm"
          >
            {/* TODO: real photo — desaturated/duotone + grain treatment to match Hero */}
            photo goes here
          </div>
        </ScrollReveal>

        {/* Bio copy */}
        <ScrollReveal variants={fadeUp} className="max-w-xl">
          <p className="text-2xl md:text-4xl font-semibold leading-snug">
            {/* TODO: one-line identity */}
            Placeholder — who you are, one line.
          </p>

          <p className="mt-6 text-neutral-400 text-lg">
            {/* TODO: what he builds / cares about */}
            Placeholder — a couple sentences on what you build and what
            kind of problems you actually enjoy solving.
          </p>

          <p className="mt-4 text-neutral-400 text-lg">
            {/* TODO: current status — school, level, in-progress work */}
            Placeholder — where you're at right now: school, level,
            anything currently in progress.
          </p>

          <a
            href="#"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20
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
