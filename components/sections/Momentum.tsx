"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import { fadeUp } from "@/lib/motion";

// Close on momentum, not a dead-end contact form —
// contact should feel like a natural continuation of the story.
export default function Momentum() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-16 py-24">
      <ScrollReveal variants={fadeUp}>
        <h2 className="text-3xl md:text-5xl font-semibold max-w-3xl">
          {/* TODO: forward-looking statement, not "get in touch" */}
          This is what I&apos;m building next.
        </h2>
      </ScrollReveal>
      <ScrollReveal variants={fadeUp} className="mt-8">
        <a
          href="mailto:you@example.com"
          className="text-2xl underline underline-offset-4"
        >
          you@example.com
        </a>
      </ScrollReveal>
    </section>
  );
}
