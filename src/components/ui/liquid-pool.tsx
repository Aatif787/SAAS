"use client";

import { useRef, useEffect } from "react";

/**
 * LiquidPoolEffect — The "pooling" liquid gradient at the bottom of the hero,
 * inspired by fromanother.love. Renders an organic, glowing liquid shape
 * that sits at the bottom of the hero section and morphs continuously.
 */
export default function LiquidPoolEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0, h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      w = canvas.parentElement?.clientWidth || window.innerWidth;
      h = 300;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const animate = (time: number) => {
      ctx.clearRect(0, 0, w, h);

      // Draw multiple layered liquid shapes
      const layers = [
        { yOffset: 80, color: "rgba(197, 160, 89, 0.15)", amplitude: 20, frequency: 0.003, speed: 0.0008 },
        { yOffset: 100, color: "rgba(10, 30, 61, 0.25)", amplitude: 25, frequency: 0.004, speed: 0.001 },
        { yOffset: 120, color: "rgba(211, 47, 47, 0.08)", amplitude: 15, frequency: 0.005, speed: 0.0012 },
        { yOffset: 90, color: "rgba(10, 30, 61, 0.4)", amplitude: 30, frequency: 0.002, speed: 0.0006 },
      ];

      layers.forEach((layer) => {
        ctx.beginPath();
        ctx.moveTo(0, h);

        // Create organic wave
        for (let x = 0; x <= w; x += 10) {
          const wave1 = Math.sin(x * layer.frequency + time * layer.speed) * layer.amplitude;
          const wave2 = Math.sin(x * layer.frequency * 1.5 + time * layer.speed * 0.7) * layer.amplitude * 0.5;
          const wave3 = Math.cos(x * layer.frequency * 0.5 + time * layer.speed * 1.3) * layer.amplitude * 0.3;
          const y = layer.yOffset + wave1 + wave2 + wave3;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(w, h);
        ctx.closePath();

        // Gradient fill
        const gradient = ctx.createLinearGradient(0, 0, 0, h);
        gradient.addColorStop(0, layer.color);
        gradient.addColorStop(0.5, layer.color.replace(/[\d.]+\)$/, (m) => `${parseFloat(m) * 1.5})`));
        gradient.addColorStop(1, layer.color.replace(/[\d.]+\)$/, (m) => `${parseFloat(m) * 0.3})`));
        
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      // Central glow — the bright pool
      const glowX = w / 2 + Math.sin(time * 0.0005) * 50;
      const glowY = 140 + Math.sin(time * 0.0008) * 15;
      const glowGradient = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, 180);
      glowGradient.addColorStop(0, "rgba(197, 160, 89, 0.3)");
      glowGradient.addColorStop(0.4, "rgba(10, 30, 61, 0.15)");
      glowGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = glowGradient;
      ctx.fillRect(glowX - 250, glowY - 200, 500, 400);

      // Drip line from center
      ctx.beginPath();
      ctx.moveTo(w / 2, 0);
      const dripWave = Math.sin(time * 0.001) * 3;
      ctx.quadraticCurveTo(w / 2 + dripWave, glowY * 0.5, w / 2, glowY - 30);
      ctx.strokeStyle = "rgba(197, 160, 89, 0.2)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Small glowing dot at drip end
      ctx.beginPath();
      ctx.arc(w / 2, glowY - 30, 3 + Math.sin(time * 0.002) * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(197, 160, 89, 0.5)";
      ctx.fill();

      animRef.current = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute bottom-0 left-0 w-full pointer-events-none z-10"
      style={{ height: "300px" }}
      aria-hidden="true"
    />
  );
}
