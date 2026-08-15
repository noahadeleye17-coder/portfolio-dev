"use client";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-16">
      {/* TODO: sharp opening statement — not "full-stack developer".
          Candidate for the signature interactive/cursor-reactive moment. */}
      <h1 className="text-5xl md:text-8xl font-bold leading-[0.95] tracking-tight">
        Your name /<br />your statement here
      </h1>
      <p className="mt-6 max-w-xl text-neutral-400 text-lg">
        One or two lines that hint at both halves of the theme —
        noticing real problems, building them properly.
      </p>
    </section>
  );
}
