"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  type: "cross" | "circle" | "target";
  angle: number;
  rotationSpeed: number;
}

export default function BlueprintCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const nodes: Node[] = [];
    const nodeCount = 28;
    const types: ("cross" | "circle" | "target")[] = ["cross", "circle", "target"];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        size: 4 + Math.random() * 8,
        type: types[i % types.length],
        angle: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.005,
      });
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const gridSpacing = 120;

    const drawGrid = (t: number) => {
      ctx.strokeStyle = "rgba(154, 154, 154, 0.04)"; // Industrial Silver very dim
      ctx.lineWidth = 1;

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      const mouseActive = mouseRef.current.active;

      for (let x = 0; x < width; x += gridSpacing) {
        ctx.beginPath();
        for (let y = 0; y < height; y += 15) {
          let drawX = x;
          if (mouseActive) {
            const dx = mouseX - x;
            const dy = mouseY - y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 200) {
              const force = (1 - dist / 200) * 15;
              drawX -= (dx / dist) * force;
            }
          }
          if (y === 0) ctx.moveTo(drawX, y);
          else ctx.lineTo(drawX, y);
        }
        ctx.stroke();
      }

      for (let y = 0; y < height; y += gridSpacing) {
        ctx.beginPath();
        for (let x = 0; x < width; x += 15) {
          let drawY = y;
          if (mouseActive) {
            const dx = mouseX - x;
            const dy = mouseY - y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 200) {
              const force = (1 - dist / 200) * 15;
              drawY -= (dy / dist) * force;
            }
          }
          if (x === 0) ctx.moveTo(x, drawY);
          else ctx.lineTo(x, drawY);
        }
        ctx.stroke();
      }

      ctx.fillStyle = "rgba(154, 154, 154, 0.15)";
      ctx.font = "9px 'Courier New', monospace";
      for (let x = gridSpacing; x < width; x += gridSpacing * 2) {
        for (let y = gridSpacing; y < height; y += gridSpacing * 2) {
          if ((x + y) % 3 === 0) {
            const valX = (x / 100).toFixed(1);
            const valY = (y / 100).toFixed(1);
            ctx.fillStyle = "rgba(154, 154, 154, 0.1)";
            ctx.fillText(`[${valX}, ${valY}]`, x + 6, y - 6);
          }

          ctx.strokeStyle = "rgba(255, 107, 26, 0.15)"; // Premium Orange accents
          ctx.beginPath();
          ctx.moveTo(x - 4, y);
          ctx.lineTo(x + 4, y);
          ctx.moveTo(x, y - 4);
          ctx.lineTo(x, y + 4);
          ctx.stroke();
        }
      }
    };

    const drawNodes = () => {
      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      const mouseActive = mouseRef.current.active;

      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;
        node.angle += node.rotationSpeed;

        if (node.x < -20) node.x = width + 20;
        if (node.x > width + 20) node.x = -20;
        if (node.y < -20) node.y = height + 20;
        if (node.y > height + 20) node.y = -20;

        ctx.save();
        ctx.translate(node.x, node.y);
        ctx.rotate(node.angle);

        ctx.strokeStyle = "rgba(217, 217, 217, 0.2)"; // Liquid chrome nodes
        ctx.lineWidth = 1;

        if (node.type === "cross") {
          ctx.beginPath();
          ctx.moveTo(-node.size, 0);
          ctx.lineTo(node.size, 0);
          ctx.moveTo(0, -node.size);
          ctx.lineTo(0, node.size);
          ctx.stroke();
        } else if (node.type === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, node.size / 2, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(-node.size, 0);
          ctx.lineTo(node.size, 0);
          ctx.moveTo(0, -node.size);
          ctx.lineTo(0, node.size);
          ctx.stroke();
        } else if (node.type === "target") {
          ctx.beginPath();
          ctx.arc(0, 0, node.size / 2, 0, Math.PI * 2);
          ctx.arc(0, 0, node.size, 0, Math.PI * 2);
          ctx.stroke();
          ctx.fillStyle = "rgba(0, 200, 83, 0.4)"; // Luxury Green target centers
          ctx.beginPath();
          ctx.arc(0, 0, 2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();

        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = other.x - node.x;
          const dy = other.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 180) {
            const alpha = (1 - dist / 180) * 0.1;
            ctx.strokeStyle = `rgba(154, 154, 154, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }

        if (mouseActive) {
          const dx = mouseX - node.x;
          const dy = mouseY - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 220) {
            const alpha = (1 - dist / 220) * 0.3;
            ctx.strokeStyle = `rgba(255, 107, 26, ${alpha})`; // Premium Orange tracking
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(mouseX, mouseY);
            ctx.stroke();
          }
        }
      });
    };

    const drawCompass = (t: number) => {
      const cx = 90;
      const cy = height - 90;
      ctx.save();
      ctx.translate(cx, cy);

      ctx.rotate(t * 0.0002);

      ctx.strokeStyle = "rgba(0, 200, 83, 0.15)"; // Luxury Green compass
      ctx.lineWidth = 1;

      ctx.beginPath();
      ctx.arc(0, 0, 52, 0, Math.PI * 2);
      ctx.arc(0, 0, 48, 0, Math.PI * 2);
      ctx.stroke();

      for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 12) {
        ctx.beginPath();
        ctx.moveTo(Math.cos(angle) * 48, Math.sin(angle) * 48);
        ctx.lineTo(Math.cos(angle) * 44, Math.sin(angle) * 44);
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.moveTo(-60, 0);
      ctx.lineTo(60, 0);
      ctx.moveTo(0, -60);
      ctx.lineTo(0, 60);
      ctx.stroke();

      ctx.fillStyle = "rgba(255, 107, 26, 0.5)"; // Premium Orange letters
      ctx.font = "9px 'Courier New', monospace";
      ctx.fillText("N", -4, -54);
      ctx.fillText("S", -4, 62);

      ctx.restore();
    };

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      drawGrid(time);
      drawNodes();
      drawCompass(time);

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-60"
    />
  );
}
