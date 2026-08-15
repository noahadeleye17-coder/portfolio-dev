"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import { revealSharp } from "@/lib/motion";

// "The Craft" — how you build once committed. Precision, detail.
// Motion should feel sharper/tighter here (revealSharp / ease.craft).
// Good place for a live "show don't tell" micro-interaction.
export default function Craft() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-16 py-24">
      <ScrollReveal variants={revealSharp}>
        <h2 className="text-3xl md:text-5xl font-semibold max-w-3xl">
          {/* TODO: statement about attention to detail / craftsmanship */}
          Then I build it properly.
        </h2>
      </ScrollReveal>
      <ScrollReveal variants={revealSharp} className="mt-8 max-w-2xl">
        <p className="text-neutral-400 text-lg">
          Placeholder copy — talk about process, standards, the details
          most people skip. Consider a small interactive demo here.
        </p>
      </ScrollReveal>
    </section>
  );
}
