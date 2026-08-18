"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  radius: number;
  baseOpacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
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
      stars = Array.from({ length: STAR_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.4 + 0.3,
        baseOpacity: Math.random() * 0.5 + 0.35,
        twinkleSpeed: Math.random() * 0.02 + 0.006,
        twinklePhase: Math.random() * Math.PI * 2,
      }));
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
        ctx!.beginPath();
        ctx!.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255,255,255,${opacity})`;
        ctx!.fill();
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
