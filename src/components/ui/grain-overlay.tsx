"use client";

import { useEffect, useRef } from "react";

/**
 * Film grain / noise texture overlay — exactly like fromanother.love
 * Generates a noise texture on a canvas and animates it at a low framerate
 * for a cinematic, tactile feel.
 */
export default function GrainOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Small canvas size, scaled up via CSS for performance
    const size = 256;
    canvas.width = size;
    canvas.height = size;

    let frame = 0;

    const generateNoise = () => {
      const imageData = ctx.createImageData(size, size);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;
        data[i] = value;     // R
        data[i + 1] = value; // G
        data[i + 2] = value; // B
        data[i + 3] = 18;    // Very subtle alpha
      }

      ctx.putImageData(imageData, 0, 0);
    };

    // Animate at ~8fps for cinematic grain feel
    const interval = setInterval(() => {
      frame++;
      generateNoise();
    }, 125);

    generateNoise();

    return () => clearInterval(interval);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[2] pointer-events-none opacity-40"
      style={{
        width: "100vw",
        height: "100vh",
        imageRendering: "pixelated",
        mixBlendMode: "overlay",
      }}
      aria-hidden="true"
    />
  );
}
