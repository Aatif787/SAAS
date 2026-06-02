"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { steelAudio } from "./steel-audio-engine";

export default function SteelCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const cursorScannerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on touch screens
    if (window.matchMedia("(pointer: coarse)").matches) return;
    
    setIsVisible(true);

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    const scanner = cursorScannerRef.current;
    if (!dot || !ring || !scanner) return;

    // Center coordinates origin
    gsap.set([dot, ring, scanner], { xPercent: -50, yPercent: -50 });

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };
    const speed = 0.16;

    // Quick setters for performance
    const xDotSet = gsap.quickSetter(dot, "x", "px");
    const yDotSet = gsap.quickSetter(dot, "y", "px");
    const xRingSet = gsap.quickSetter(ring, "x", "px");
    const yRingSet = gsap.quickSetter(ring, "y", "px");
    const xScanSet = gsap.quickSetter(scanner, "x", "px");
    const yScanSet = gsap.quickSetter(scanner, "y", "px");

    // Velocity variables to stretch cursor on fast movement
    let lastX = pos.x;
    let lastY = pos.y;
    let velocity = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      xDotSet(e.clientX);
      yDotSet(e.clientY);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Smooth physics loop
    gsap.ticker.add(() => {
      const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;

      xRingSet(pos.x);
      yRingSet(pos.y);
      xScanSet(pos.x);
      yScanSet(pos.y);

      // Speed velocity calculation
      const dx = pos.x - lastX;
      const dy = pos.y - lastY;
      velocity = Math.min(Math.sqrt(dx * dx + dy * dy) * 0.08, 1.8);

      lastX = pos.x;
      lastY = pos.y;

      // Stretch trailing ring on high velocity
      gsap.set(ring, {
        scaleX: 1.0 + velocity,
        scaleY: 1.0 - velocity * 0.3,
        rotation: Math.atan2(dy, dx) * (180 / Math.PI),
      });
    });

    // Premium Interaction Hover Targets (Buttons, links, inputs)
    const handleMouseEnter = () => {
      steelAudio.playHover();

      gsap.to(dot, { scale: 2.2, backgroundColor: "transparent", border: "1.5px solid #FFD600", duration: 0.3 });
      gsap.to(ring, {
        scale: 2.5,
        borderWidth: "1.5px",
        borderColor: "#FFD600",
        backgroundColor: "rgba(255, 214, 0, 0.08)",
        backdropFilter: "blur(6px)",
        duration: 0.3,
        ease: "power2.out",
      });
      // Show energetic Crosshair scanner
      gsap.to(scanner, { opacity: 0.8, scale: 1.3, duration: 0.25 });
    };

    const handleMouseLeave = () => {
      gsap.to(dot, { scale: 1, backgroundColor: "#FFD600", border: "none", duration: 0.3 });
      gsap.to(ring, {
        scale: 1,
        borderWidth: "1px",
        borderColor: "rgba(255, 214, 0, 0.4)",
        backgroundColor: "transparent",
        backdropFilter: "blur(0px)",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(scanner, { opacity: 0, scale: 0.6, duration: 0.25 });
    };

    // Metallic mechanical click response
    const handleMouseDown = () => {
      steelAudio.playClick();
      gsap.to([dot, ring], { scale: 0.6, duration: 0.15 });
    };

    const handleMouseUp = () => {
      gsap.to([dot, ring], { scale: 1.0, duration: 0.25 });
    };

    const addListeners = () => {
      const interactables = document.querySelectorAll("a, button, input, select, textarea, [role='button']");
      interactables.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
        el.addEventListener("mousedown", handleMouseDown);
        el.addEventListener("mouseup", handleMouseUp);
      });
    };

    // Wait until boot preloader is done mounting to scan DOM targets
    setTimeout(addListeners, 2500);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      const interactables = document.querySelectorAll("a, button, input, select, textarea, [role='button']");
      interactables.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
        el.removeEventListener("mousedown", handleMouseDown);
        el.removeEventListener("mouseup", handleMouseUp);
      });
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Laser Targeting Dot */}
      <div
        ref={cursorDotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2.5 w-2.5 rounded-full bg-[#FFD600]"
      />
      
      {/* Dynamic Trailing Energy Ring */}
      <div
        ref={cursorRingRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-11 w-11 rounded-full border border-[#FFD600]/40 bg-transparent transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]"
      />

      {/* Cybernetic OS UI Crosshair Scanner overlay */}
      <div
        ref={cursorScannerRef}
        className="pointer-events-none fixed left-0 top-0 z-[9997] h-16 w-16 opacity-0 scale-50 transition-opacity transition-transform duration-200"
      >
        {/* Horizontal Laser Line */}
        <div className="absolute top-1/2 left-0 right-0 h-[0.5px] bg-[#FFD600]/60" />
        {/* Vertical Laser Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[0.5px] bg-[#FFD600]/60" />
        {/* Neon target corners */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#FFD600]" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#FFD600]" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#FFD600]" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#FFD600]" />
      </div>
    </>
  );
}
