"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Cinematic text splitter with 3D rotation and blur reveal ─── */
export function useSplitTextReveal(
  ref: React.RefObject<HTMLElement | null>,
  options?: { stagger?: number; duration?: number; start?: string; y?: number; delay?: number }
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const text = el.textContent || "";
    const words = text.split(" ");
    el.innerHTML = "";

    words.forEach((word, wi) => {
      const wordSpan = document.createElement("span");
      wordSpan.style.display = "inline-block";
      wordSpan.style.overflow = "hidden";
      wordSpan.style.verticalAlign = "top";

      word.split("").forEach((char) => {
        const charSpan = document.createElement("span");
        charSpan.textContent = char;
        charSpan.style.display = "inline-block";
        charSpan.style.willChange = "transform, opacity, filter";
        charSpan.classList.add("split-char");
        wordSpan.appendChild(charSpan);
      });

      el.appendChild(wordSpan);
      if (wi < words.length - 1) {
        const space = document.createElement("span");
        space.innerHTML = "&nbsp;";
        space.style.display = "inline-block";
        el.appendChild(space);
      }
    });

    const chars = el.querySelectorAll(".split-char");

    // Hyper-premium split text: fades, zooms, rotates, and blurs in
    gsap.fromTo(
      chars,
      { y: options?.y ?? 100, opacity: 0, rotateX: 65, filter: "blur(12px)", scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        filter: "blur(0px)",
        scale: 1,
        duration: options?.duration ?? 1.4,
        stagger: options?.stagger ?? 0.02,
        ease: "power4.out",
        delay: options?.delay ?? 0,
        scrollTrigger: {
          trigger: el,
          start: options?.start ?? "top 90%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [ref, options?.stagger, options?.duration, options?.start, options?.y, options?.delay]);
}

/* ─── Parallax element: moves at different speed on scroll ─── */
export function useParallax(
  ref: React.RefObject<HTMLElement | null>,
  speed: number = 0.3,
  direction: "y" | "x" = "y"
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.to(el, {
      [direction === "y" ? "yPercent" : "xPercent"]: speed * 100,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [ref, speed, direction]);
}

/* ─── Magnetic hover effect for buttons and cards ─── */
export function useMagneticHover(ref: React.RefObject<HTMLElement | null>, strength: number = 0.35) {
  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Magnetic pull + depth tilt rotation
      gsap.to(el, {
        x: x * strength,
        y: y * strength,
        rotateX: -y * 0.1,
        rotateY: x * 0.1,
        duration: 0.4,
        ease: "power3.out",
      });
    },
    [ref, strength]
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, rotateX: 0, rotateY: 0, duration: 0.8, ease: "elastic.out(1.1, 0.4)" });
  }, [ref]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);
    return () => {
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [ref, onMouseMove, onMouseLeave]);
}

/* ─── Animated counter that counts up on scroll ─── */
export function useScrollCounter(
  ref: React.RefObject<HTMLElement | null>,
  target: number,
  suffix: string = "",
  duration: number = 2.0
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      onUpdate: () => {
        el.textContent = Math.round(obj.val).toLocaleString() + suffix;
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [ref, target, suffix, duration]);
}

/* ─── Reveal on scroll with custom direction ─── */
export function useRevealOnScroll(
  ref: React.RefObject<HTMLElement | null>,
  options?: { x?: number; y?: number; scale?: number; rotate?: number; duration?: number; delay?: number; start?: string }
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(
      el,
      {
        x: options?.x ?? 0,
        y: options?.y ?? 60,
        scale: options?.scale ?? 1,
        rotate: options?.rotate ?? 0,
        opacity: 0,
      },
      {
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
        opacity: 1,
        duration: options?.duration ?? 1.2,
        delay: options?.delay ?? 0,
        ease: "power4.out",
        scrollTrigger: {
          trigger: el,
          start: options?.start ?? "top 82%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [ref, options?.x, options?.y, options?.scale, options?.rotate, options?.duration, options?.delay, options?.start]);
}

/* ─── Impossible Scroll Skew Engine: tilts elements based on scroll speed ─── */
export function useScrollSkew(ref: React.RefObject<HTMLElement | null>, maxSkew: number = 8) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let proxy = { skew: 0 };
    let skewSetter = gsap.quickSetter(el, "skewY", "deg"); // can also use skewX or rotate
    let clamp = gsap.utils.clamp(-maxSkew, maxSkew);

    ScrollTrigger.create({
      onUpdate: (self) => {
        let skew = clamp(self.getVelocity() / -350);
        // Only skew if speed is meaningful
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew;
          gsap.to(proxy, {
            skew: 0,
            duration: 0.8,
            ease: "power3.out",
            overwrite: "auto",
            onUpdate: () => skewSetter(proxy.skew),
          });
        }
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [ref, maxSkew]);
}
