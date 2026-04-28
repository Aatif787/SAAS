"use client";

import React from "react";
import { motion } from "framer-motion";

const techs = [
  "Next.js", "React", "TypeScript", "Node.js", "MongoDB", "Prisma", 
  "Tailwind CSS", "Framer Motion", "Three.js", "OpenAI", "Stripe", "Clerk"
];

const STYLES = `
  .stone-track {
    display: flex;
    align-items: center;
    gap: 100px;
    width: max-content;
    animation: stone-slide 70s linear infinite;
    padding: 60px 0;
    will-change: transform;
  }

  @keyframes stone-slide {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }

  .stone-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    perspective: 800px;
  }

  .stone {
    width: 200px;
    height: 110px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.7s cubic-bezier(0.19, 1, 0.22, 1);
    
    /* Hyper-Realistic River Stone: Deep Volumetric Texturing */
    background-color: #3d4043;
    background-image: 
      /* Micro-Texture Detail */
      url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.2'/%3E%3C/svg%3E"),
      /* Top Specular Rim Light */
      radial-gradient(ellipse at 40% 15%, rgba(255,255,255,0.1) 0%, transparent 40%),
      /* Core Volumetric Light */
      radial-gradient(ellipse at center, #55585b 0%, #212325 100%);
    
    background-blend-mode: overlay, normal, normal;
    border-radius: 46% 54% 49% 51% / 40% 48% 52% 60%;
    
    /* Complex Multi-Stage Shadowing for Depth */
    box-shadow: 
      inset -12px -12px 25px rgba(0,0,0,0.6),
      inset 8px 8px 15px rgba(255,255,255,0.03),
      inset 0 2px 4px rgba(255,255,255,0.05),
      0 20px 40px -10px rgba(0,0,0,0.4),
      0 10px 15px rgba(0,0,0,0.15);
  }

  /* Secondary Layer: Natural Imperfections, Veining & Surface Wear */
  .stone::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background-image: 
      /* Crisp White Veins */
      repeating-linear-gradient(145deg, transparent 0, transparent 40px, rgba(255,255,255,0.06) 41px, transparent 41.5px),
      repeating-linear-gradient(215deg, transparent 0, transparent 80px, rgba(255,255,255,0.04) 81px, transparent 81.5px),
      /* Surface Wear Spots */
      radial-gradient(circle at 75% 25%, rgba(255,255,255,0.05) 0%, transparent 20%),
      radial-gradient(circle at 20% 70%, rgba(255,255,255,0.03) 0%, transparent 15%);
    pointer-events: none;
    mix-blend-mode: overlay;
    opacity: 0.8;
  }

  .tech-label {
    font-family: 'Playfair Display', serif;
    font-weight: 800;
    font-size: 0.95rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: rgba(0, 0, 0, 0.45);
    
    /* Carved/Engraved Detail */
    text-shadow: 
      -0.5px -0.5px 0.5px rgba(0,0,0,0.5), 
      0.5px 0.5px 0.5px rgba(255,255,255,0.1);
    
    transition: all 0.6s ease;
    z-index: 10;
  }

  .stone-shadow {
    width: 150px;
    height: 25px;
    background: radial-gradient(ellipse, rgba(0,0,0,0.45) 0%, transparent 80%);
    filter: blur(12px);
    position: absolute;
    bottom: -15px;
    z-index: -1;
    transition: all 0.7s ease;
    opacity: 0.8;
  }

  /* Interaction: Hyper-Reflective Glow */
  .stone-wrapper:hover .stone {
    transform: scale(1.1) translateY(-12px) rotateX(8deg) rotateY(2deg);
    filter: brightness(1.15) contrast(1.05);
    box-shadow: 
      inset -15px -15px 35px rgba(0,0,0,0.4),
      inset 12px 12px 30px rgba(255,255,255,0.08),
      0 45px 70px -15px rgba(0,0,0,0.5);
  }

  .stone-wrapper:hover .tech-label {
    color: rgba(255, 255, 255, 0.7);
    text-shadow: 0 0 12px rgba(255,255,255,0.2);
    transform: scale(1.02);
  }

  .stone-wrapper:hover .stone-shadow {
    transform: scaleX(1.3) scaleY(0.4) translateY(12px);
    opacity: 0.3;
    filter: blur(15px);
  }
`;

export default function TechStack() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="py-32 bg-ims-cream border-t border-ims-blue/5 overflow-hidden relative">
      <style>{STYLES}</style>
      
      <div className="text-center mb-16 relative z-10">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-[10px] font-bold uppercase tracking-[0.6em] text-ims-gold mb-4 block"
        >
          Foundational Excellence
        </motion.span>
        <h2 className="text-3xl md:text-4xl font-serif text-ims-blue">Engineered with Precision</h2>
      </div>

      <div className="relative">
        <div className="stone-track">
          {[...techs, ...techs].map((tech, i) => {
            // Stable randomization for client-side only
            const randomRadius = mounted ? `${44 + Math.random() * 8}% ${50 + Math.random() * 8}% ${48 + Math.random() * 8}% ${52 + Math.random() * 8}% / ${40 + Math.random() * 10}% ${45 + Math.random() * 10}% ${55 + Math.random() * 10}% ${60 + Math.random() * 10}%` : "50%";
            const randomRotate = mounted ? `${Math.random() * 4 - 2}deg` : "0deg";
            const randomDuration = mounted ? 5 + Math.random() * 3 : 5;

            return (
              <div key={`${tech}-${i}`} className="stone-wrapper">
                <motion.div 
                  className="stone"
                  style={{
                    borderRadius: randomRadius,
                    transform: `rotate(${randomRotate})`
                  }}
                  animate={{
                    y: [0, -6, 0],
                    rotate: [0, 0.5, 0]
                  }}
                  transition={{
                    duration: randomDuration,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <span className="tech-label">{tech}</span>
                </motion.div>
                <div className="stone-shadow" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
