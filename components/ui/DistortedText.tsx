"use client";

import { useEffect, useRef } from "react";

interface DistortedTextProps {
  text: string;
  className?: string;
  /** px — how far from the cursor the effect reaches */
  radius?: number;
  /** px — max distance a character scatters at peak proximity */
  maxOffset?: number;
  /** deg — max rotation a character gets at peak proximity */
  maxRotate?: number;
}

export default function DistortedText({
  text,
  className = "",
  radius = 90,
  maxOffset = 7,
  maxRotate = 8,
}: DistortedTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);
  const mouse = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMove = (e: PointerEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const handleLeave = () => {
      mouse.current = null;
    };

    // scoped to this line only — so hovering one line never affects the others
    container.addEventListener("pointermove", handleMove);
    container.addEventListener("pointerleave", handleLeave);

    const tick = () => {
      charRefs.current.forEach((el) => {
        if (!el) return;

        if (!mouse.current) {
          el.style.transform = "translate(0px, 0px) rotate(0deg)";
          return;
        }

        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        const dx = cx - mouse.current.x;
        const dy = cy - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > radius) {
          el.style.transform = "translate(0px, 0px) rotate(0deg)";
          return;
        }

        const strength = 1 - dist / radius; // 0..1, closer to cursor = stronger
        const seed = el.dataset.seed ? parseFloat(el.dataset.seed) : 0;

        // stable pseudo-random direction per character, no jitter/warp
        const angle = seed * Math.PI * 2;
        const offsetX = Math.cos(angle) * maxOffset * strength;
        const offsetY = Math.sin(angle) * maxOffset * strength;
        const rotate = (seed - 0.5) * 2 * maxRotate * strength;

        el.style.transform = `translate(${offsetX.toFixed(2)}px, ${offsetY.toFixed(2)}px) rotate(${rotate.toFixed(2)}deg)`;
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      container.removeEventListener("pointermove", handleMove);
      container.removeEventListener("pointerleave", handleLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [radius, maxOffset, maxRotate]);

  charRefs.current = [];
  let charIndex = 0;

  // Split into words vs. whitespace so each word's letters can be
  // grouped in a non-wrapping span — this keeps line breaks landing
  // only between words instead of mid-word (which per-character
  // inline-block spans would otherwise allow).
  const tokens = text.split(/(\s+)/);

  const renderChar = (char: string) => {
    const i = charIndex++;
    const seed = ((i * 137.5) % 100) / 100;
    return (
      <span
        key={i}
        ref={(el) => {
          charRefs.current[i] = el;
        }}
        data-seed={seed}
        style={{
          display: "inline-block",
          willChange: "transform",
          transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    );
  };

  return (
    <span ref={containerRef} className={className} style={{ display: "inline-block" }}>
      {tokens.map((token, tokenIndex) => {
        if (token === "") return null;

        if (/^\s+$/.test(token)) {
          // whitespace token — fine to break here between words
          return <span key={`ws-${tokenIndex}`}>{token.split("").map(renderChar)}</span>;
        }

        return (
          <span key={`word-${tokenIndex}`} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
            {token.split("").map(renderChar)}
          </span>
        );
      })}
    </span>
  );
}
