"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [hoverType, setHoverType] = useState<"standard" | "gold" | "red">("standard");
  const pos = useRef({ x: 0, y: 0 });
  const isTouch = useRef(false);

  useEffect(() => {
    // Detect touch device
    isTouch.current = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch.current) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Add body class to hide default cursor
    document.body.classList.add("custom-cursor-active");

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      
      // Separate spring speeds for outer ring and inner dot
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.05,
        ease: "power2.out",
      });
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.22,
        ease: "power3.out",
      });
    };

    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);

    const onOver = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const interactiveEl = target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-pointer") ||
        target.closest(".cursor-pointer") ||
        target.classList.contains("cursor-hover") ||
        target.closest(".cursor-hover");

      if (interactiveEl) {
        setIsHovering(true);
        
        // Color customization based on visual context
        if (target.closest(".btn-premium") || target.closest(".bg-ims-red") || target.closest(".text-[#9B1B30]")) {
          setHoverType("red");
        } else if (target.closest(".gold-text") || target.closest(".text-[#C5A059]") || target.closest(".gold-accent") || target.closest(".bg-[#C5A059]")) {
          setHoverType("gold");
        } else {
          setHoverType("standard");
        }
      }
    };
    
    const onOut = () => {
      setIsHovering(false);
      setHoverType("standard");
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  const getBorderColor = () => {
    if (!isHovering) return "rgba(10, 30, 61, 0.4)"; // Deep Navy
    if (hoverType === "gold") return "#C5A059"; // Gold
    if (hoverType === "red") return "#9B1B30"; // Burgundy
    return "#C5A059";
  };

  return (
    <>
      {/* Outer Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          transform: "translate(-50%, -50%)",
          willChange: "transform",
        }}
      >
        <div
          className="rounded-full border transition-all duration-300"
          style={{
            width: isHovering ? 56 : isClicking ? 24 : 36,
            height: isHovering ? 56 : isClicking ? 24 : 36,
            borderColor: getBorderColor(),
            borderWidth: isHovering ? 2 : 1.5,
            backgroundColor: isHovering ? "rgba(197, 160, 89, 0.05)" : "transparent",
            transform: isClicking ? "scale(0.85)" : "scale(1)",
            boxShadow: isHovering ? "0 0 15px rgba(197, 160, 89, 0.2)" : "none",
          }}
        />
      </div>

      {/* Center Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          transform: "translate(-50%, -50%)",
          willChange: "transform",
        }}
      >
        <div
          className="rounded-full transition-all duration-200"
          style={{
            width: isHovering ? 0 : 6,
            height: isHovering ? 0 : 6,
            backgroundColor: "#0A1E3D", // Brand Deep Navy
            opacity: isHovering ? 0 : 0.8,
          }}
        />
      </div>
    </>
  );
}
