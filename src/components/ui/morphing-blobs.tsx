"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * MorphingBlobs — Full-viewport animated gradient orbs inspired by fromanother.love
 * Uses pure Canvas 2D for maximum performance. Blobs morph, drift, and respond to scroll.
 */

interface Blob {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  radius: number;
  baseRadius: number;
  color: string;
  phase: number;
  speed: number;
  wobbleSpeed: number;
  wobbleAmount: number;
}

const BLOB_CONFIGS = [
  { color: "rgba(10, 30, 61, 0.6)", baseRadius: 350, speed: 0.0003, wobbleAmount: 40 },
  { color: "rgba(197, 160, 89, 0.15)", baseRadius: 280, speed: 0.0005, wobbleAmount: 50 },
  { color: "rgba(211, 47, 47, 0.08)", baseRadius: 200, speed: 0.0004, wobbleAmount: 30 },
  { color: "rgba(10, 30, 61, 0.4)", baseRadius: 300, speed: 0.0006, wobbleAmount: 45 },
  { color: "rgba(197, 160, 89, 0.1)", baseRadius: 250, speed: 0.0003, wobbleAmount: 35 },
];

export default function MorphingBlobs() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const blobsRef = useRef<Blob[]>([]);
  const scrollRef = useRef(0);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  const initBlobs = useCallback((w: number, h: number) => {
    blobsRef.current = BLOB_CONFIGS.map((cfg, i) => ({
      x: w * (0.2 + (i * 0.15)),
      y: h * (0.3 + (i * 0.1)),
      targetX: w * (0.2 + (i * 0.15)),
      targetY: h * (0.3 + (i * 0.1)),
      radius: cfg.baseRadius,
      baseRadius: cfg.baseRadius,
      color: cfg.color,
      phase: (Math.PI * 2 * i) / BLOB_CONFIGS.length,
      speed: cfg.speed,
      wobbleSpeed: 0.001 + Math.random() * 0.002,
      wobbleAmount: cfg.wobbleAmount,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0, h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (blobsRef.current.length === 0) initBlobs(w, h);
    };

    const onScroll = () => {
      scrollRef.current = window.scrollY;
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const drawBlob = (blob: Blob, time: number) => {
      const points = 6;
      ctx.beginPath();
      for (let i = 0; i <= points; i++) {
        const angle = (i / points) * Math.PI * 2;
        const wobble = Math.sin(time * blob.wobbleSpeed + angle * 3 + blob.phase) * blob.wobbleAmount;
        const wobble2 = Math.cos(time * blob.wobbleSpeed * 0.7 + angle * 2) * blob.wobbleAmount * 0.6;
        const r = blob.radius + wobble + wobble2;
        const px = blob.x + Math.cos(angle) * r;
        const py = blob.y + Math.sin(angle) * r;
        if (i === 0) {
          ctx.moveTo(px, py);
        } else {
          // Bezier curves for organic shape
          const prevAngle = ((i - 1) / points) * Math.PI * 2;
          const prevWobble = Math.sin(time * blob.wobbleSpeed + prevAngle * 3 + blob.phase) * blob.wobbleAmount;
          const prevWobble2 = Math.cos(time * blob.wobbleSpeed * 0.7 + prevAngle * 2) * blob.wobbleAmount * 0.6;
          const prevR = blob.radius + prevWobble + prevWobble2;
          const cp1x = blob.x + Math.cos(prevAngle + 0.3) * (prevR * 1.1);
          const cp1y = blob.y + Math.sin(prevAngle + 0.3) * (prevR * 1.1);
          const cp2x = blob.x + Math.cos(angle - 0.3) * (r * 1.1);
          const cp2y = blob.y + Math.sin(angle - 0.3) * (r * 1.1);
          ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, px, py);
        }
      }
      ctx.closePath();

      const gradient = ctx.createRadialGradient(
        blob.x, blob.y, 0,
        blob.x, blob.y, blob.radius + blob.wobbleAmount
      );
      gradient.addColorStop(0, blob.color);
      gradient.addColorStop(0.6, blob.color.replace(/[\d.]+\)$/, (m) => `${parseFloat(m) * 0.5})`));
      gradient.addColorStop(1, "rgba(0,0,0,0)");
      
      ctx.fillStyle = gradient;
      ctx.fill();
    };

    const animate = (time: number) => {
      ctx.clearRect(0, 0, w, h);

      const scrollProgress = Math.min(scrollRef.current / (h * 2), 1);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      blobsRef.current.forEach((blob, i) => {
        // Orbital movement
        const orbitX = Math.sin(time * blob.speed + blob.phase) * (w * 0.2);
        const orbitY = Math.cos(time * blob.speed * 0.7 + blob.phase) * (h * 0.15);
        
        // Scroll displacement — blobs "sink" as you scroll
        const scrollDisplacement = scrollProgress * h * 0.3 * (i % 2 === 0 ? 1 : -0.5);
        
        // Mouse influence (subtle attraction)
        const dx = mx - blob.x;
        const dy = my - blob.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const mouseInfluence = Math.max(0, 1 - dist / 600) * 30;
        
        blob.targetX = w * (0.2 + i * 0.15) + orbitX + (dx / (dist || 1)) * mouseInfluence;
        blob.targetY = h * (0.3 + i * 0.08) + orbitY + scrollDisplacement + (dy / (dist || 1)) * mouseInfluence;
        
        // Smooth interpolation
        blob.x += (blob.targetX - blob.x) * 0.015;
        blob.y += (blob.targetY - blob.y) * 0.015;
        
        // Scale with scroll — grow slightly as user scrolls
        blob.radius = blob.baseRadius + scrollProgress * 50;
        
        drawBlob(blob, time);
      });

      animRef.current = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [initBlobs]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ mixBlendMode: "normal" }}
      aria-hidden="true"
    />
  );
}
