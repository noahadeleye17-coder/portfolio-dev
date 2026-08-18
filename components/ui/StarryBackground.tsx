"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  radius: number;
  baseOpacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
  hue: number;
  sparkle: boolean;
};

type ShootingStar = {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  active: boolean;
};

const STAR_COUNT = 180;

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

// Light desaturated tint for the handful of non-neutral stars —
// 210 = cool blue-white, 40 = warm amber-white.
function hueToRgb(hue: number): string {
  return hue === 210 ? "205,220,255" : "255,235,205";
}

/**
 * Full-bleed animated starry-night background: a field of twinkling stars
 * of varying sizes, plus the occasional shooting star crossing the screen.
 * Pure canvas — no DOM nodes per star, so it stays cheap even with a lot
 * of stars on screen.
 */
export default function StarryBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let shootingStars: ShootingStar[] = [];
    let animationFrame = 0;
    let frame = 0;
    let nextShootIn = randomBetween(60, 180);

    function seedStars() {
      stars = Array.from({ length: STAR_COUNT }, () => {
        // A handful of "big" stars stand out and get a sparkle flare;
        // most stay small, soft points.
        const isBig = Math.random() < 0.12;
        const radius = isBig
          ? randomBetween(1.4, 2.2)
          : randomBetween(0.4, 1.2);
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          radius,
          baseOpacity: Math.random() * 0.4 + 0.45,
          twinkleSpeed: Math.random() * 0.02 + 0.006,
          twinklePhase: Math.random() * Math.PI * 2,
          // Mostly neutral-white, with a few warm and cool outliers —
          // real starfields aren't uniformly white.
          hue: Math.random() < 0.7 ? 0 : Math.random() < 0.5 ? 210 : 40,
          sparkle: isBig,
        };
      });
    }

    function resize() {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedStars();
    }

    function spawnShootingStar() {
      shootingStars.push({
        x: randomBetween(0, width * 0.7),
        y: randomBetween(0, height * 0.4),
        length: randomBetween(80, 160),
        speed: randomBetween(7, 11),
        angle: randomBetween(0.4, 0.7),
        opacity: randomBetween(0.7, 1),
        active: true,
      });
    }

    function draw() {
      frame++;
      ctx!.clearRect(0, 0, width, height);

      for (const star of stars) {
        const twinkle = Math.sin(frame * star.twinkleSpeed + star.twinklePhase);
        const opacity = Math.min(1, Math.max(0, star.baseOpacity + twinkle * 0.3));
        const color = star.hue === 0 ? "255,255,255" : hueToRgb(star.hue);

        // Soft glow: a radial falloff a few times the star's own radius,
        // rather than a hard-edged dot — this is what reads as "star" vs
        // "circle" from a normal viewing distance.
        const glowRadius = star.radius * 5;
        const glow = ctx!.createRadialGradient(
          star.x,
          star.y,
          0,
          star.x,
          star.y,
          glowRadius
        );
        glow.addColorStop(0, `rgba(${color},${opacity})`);
        glow.addColorStop(0.4, `rgba(${color},${opacity * 0.25})`);
        glow.addColorStop(1, `rgba(${color},0)`);
        ctx!.fillStyle = glow;
        ctx!.beginPath();
        ctx!.arc(star.x, star.y, glowRadius, 0, Math.PI * 2);
        ctx!.fill();

        // Bright core
        ctx!.beginPath();
        ctx!.arc(star.x, star.y, star.radius * 0.55, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${color},${Math.min(1, opacity * 1.3)})`;
        ctx!.fill();

        // Four-point sparkle flare for the handful of standout stars
        if (star.sparkle) {
          const flareLen = star.radius * 6 * (0.7 + twinkle * 0.3);
          ctx!.strokeStyle = `rgba(${color},${opacity * 0.55})`;
          ctx!.lineWidth = 0.6;
          ctx!.beginPath();
          ctx!.moveTo(star.x - flareLen, star.y);
          ctx!.lineTo(star.x + flareLen, star.y);
          ctx!.moveTo(star.x, star.y - flareLen);
          ctx!.lineTo(star.x, star.y + flareLen);
          ctx!.stroke();
        }
      }

      nextShootIn -= 1;
      if (nextShootIn <= 0) {
        spawnShootingStar();
        nextShootIn = randomBetween(150, 360);
      }

      shootingStars = shootingStars.filter((s) => s.active);
      for (const s of shootingStars) {
        const dx = Math.cos(s.angle);
        const dy = Math.sin(s.angle);
        const tailX = s.x - dx * s.length;
        const tailY = s.y - dy * s.length;

        const gradient = ctx!.createLinearGradient(s.x, s.y, tailX, tailY);
        gradient.addColorStop(0, `rgba(255,255,255,${s.opacity})`);
        gradient.addColorStop(1, "rgba(255,255,255,0)");

        ctx!.strokeStyle = gradient;
        ctx!.lineWidth = 2;
        ctx!.beginPath();
        ctx!.moveTo(s.x, s.y);
        ctx!.lineTo(tailX, tailY);
        ctx!.stroke();

        s.x += dx * s.speed;
        s.y += dy * s.speed;

        if (s.x - s.length > width || s.y - s.length > height) {
          s.active = false;
        }
      }

      animationFrame = requestAnimationFrame(draw);
    }

    resize();
    draw();

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 w-full h-full"
    />
  );
}
