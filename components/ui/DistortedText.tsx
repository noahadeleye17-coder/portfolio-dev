"use client";

import { useEffect, useRef } from "react";

type DistortedTextProps = {
  lines: string[];
  className?: string;
  fontSizeDesktop?: number; // px, should match the ghost text's desktop size
  fontSizeMobile?: number; // px, should match the ghost text's mobile size
  fontWeight?: number;
  lineHeight?: number; // multiplier, matches Tailwind's leading-[x]
};

const VERT_SRC = `
attribute vec2 a_position;
varying vec2 v_uv;
void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

// Pushes texture samples away from the cursor with a soft radial falloff
// and a light ripple wobble, so the text scatters rather than just smears.
const FRAG_SRC = `
precision highp float;
varying vec2 v_uv;
uniform sampler2D u_texture;
uniform vec2 u_mouse;
uniform float u_radius;
uniform float u_strength;
uniform float u_time;

void main() {
  vec2 uv = v_uv;
  vec2 toMouse = uv - u_mouse;
  float dist = length(toMouse);
  float falloff = smoothstep(u_radius, 0.0, dist);
  vec2 dir = dist > 0.0001 ? normalize(toMouse) : vec2(0.0);
  float wave = sin(dist * 40.0 - u_time * 6.0) * 0.5 + 0.5;
  vec2 offset = dir * falloff * u_strength * (0.6 + 0.4 * wave);
  gl_FragColor = texture2D(u_texture, uv + offset);
}
`;

function compileShader(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

// Renders `lines` to an offscreen 2D canvas, uploads it as a WebGL texture,
// then displaces the sampled UVs based on cursor position each frame.
// An invisible DOM heading with matching classes should sit behind this
// (see Hero.tsx) so layout height and screen readers stay correct.
export default function DistortedText({
  lines,
  className,
  fontSizeDesktop = 96,
  fontSizeMobile = 48,
  fontWeight = 700,
  lineHeight = 0.95,
}: DistortedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const gl = canvas.getContext("webgl", {
      premultipliedAlpha: true,
      alpha: true,
    });
    if (!gl) return; // No WebGL — canvas stays empty, ghost text behind it is still visible via CSS fallback if you add one.

    const textCanvas = document.createElement("canvas");
    const textCtx = textCanvas.getContext("2d");
    if (!textCtx) return;

    let texture: WebGLTexture | null = null;
    let program: WebGLProgram | null = null;
    let raf = 0;
    const mouse = { x: -1, y: -1 };
    const targetMouse = { x: -1, y: -1 };
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function drawTextTexture(width: number, height: number) {
      textCanvas.width = width;
      textCanvas.height = height;
      textCtx!.clearRect(0, 0, width, height);
      textCtx!.fillStyle = "#ffffff";
      textCtx!.textBaseline = "top";
      const isMobile = width < 768 * dpr;
      const fontSize = (isMobile ? fontSizeMobile : fontSizeDesktop) * dpr;
      textCtx!.font = `${fontWeight} ${fontSize}px var(--font-geist-sans), Arial, sans-serif`;
      const lineGap = fontSize * lineHeight;
      lines.forEach((text, i) => {
        textCtx!.fillText(text, 0, i * lineGap);
      });
    }

    function setupGL() {
      if (!gl) return;
      const vs = compileShader(gl, gl.VERTEX_SHADER, VERT_SRC);
      const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAG_SRC);
      if (!vs || !fs) return;

      program = gl.createProgram();
      if (!program) return;
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      gl.useProgram(program);

      const posBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
        gl.STATIC_DRAW
      );
      const posLoc = gl.getAttribLocation(program, "a_position");
      gl.enableVertexAttribArray(posLoc);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

      texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    }

    function uploadTexture() {
      if (!gl || !texture) return;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        textCanvas
      );
    }

    function resize() {
      if (!gl || !container || !canvas) return;
      const rect = container.getBoundingClientRect();
      const width = Math.max(1, Math.round(rect.width * dpr));
      const height = Math.max(1, Math.round(rect.height * dpr));
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      gl.viewport(0, 0, width, height);
      drawTextTexture(width, height);
      uploadTexture();
    }

    function onPointerMove(e: PointerEvent) {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      targetMouse.x = (e.clientX - rect.left) / rect.width;
      targetMouse.y = (e.clientY - rect.top) / rect.height;
    }

    function onPointerLeave() {
      targetMouse.x = -1;
      targetMouse.y = -1;
    }

    const start = performance.now();

    function render() {
      if (!gl || !program) {
        raf = requestAnimationFrame(render);
        return;
      }
      mouse.x += (targetMouse.x - mouse.x) * 0.12;
      mouse.y += (targetMouse.y - mouse.y) * 0.12;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);

      gl.uniform2f(
        gl.getUniformLocation(program, "u_mouse"),
        mouse.x,
        1 - mouse.y
      );
      gl.uniform1f(gl.getUniformLocation(program, "u_radius"), 0.22);
      gl.uniform1f(gl.getUniformLocation(program, "u_strength"), 0.05);
      gl.uniform1f(
        gl.getUniformLocation(program, "u_time"),
        (performance.now() - start) / 1000
      );

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(render);
    }

    setupGL();
    resize();
    raf = requestAnimationFrame(render);

    window.addEventListener("resize", resize);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerleave", onPointerLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [lines, fontSizeDesktop, fontSizeMobile, fontWeight, lineHeight]);

  return (
    <div ref={containerRef} className={className} style={{ position: "absolute", inset: 0 }}>
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
    </div>
  );
}
