"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import { fadeUp } from "@/lib/motion";

// "The Noticing" — how you spot real problems. Grounded, human tone.
// Motion should feel calmer here (fadeUp / ease.human) than in Craft.
export default function Noticing() {
  return (
    <section className="h-full flex flex-col justify-center px-6 md:px-16 py-24">
      <ScrollReveal variants={fadeUp}>
        <h2 className="text-3xl md:text-5xl font-semibold max-w-3xl">
          {/* TODO: real examples — FUTA housing struggle, vendor WhatsApp chaos */}
          I notice the friction other people just live with.
        </h2>
      </ScrollReveal>
      <ScrollReveal variants={fadeUp} className="mt-8 max-w-2xl">
        <p className="text-neutral-400 text-lg">
          Placeholder copy — walk through one or two real moments that led
          to a project, in plain, human language.
        </p>
      </ScrollReveal>
    </section>
  );
}
