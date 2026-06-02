"use client";

import { motion, useTransform, MotionValue } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Environment } from '@react-three/drei';
import { Suspense } from 'react';

interface HeroSectionProps {
  scrollYProgress: MotionValue<number>;
}

export default function ServicesHero({ scrollYProgress }: HeroSectionProps) {
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <section className="relative h-[80vh] w-full overflow-hidden bg-[#FDFBF7] flex items-center justify-center">
      <div className="absolute inset-0 z-10">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <Float speed={4} rotationIntensity={1} floatIntensity={2}>
              <Sphere args={[1, 64, 64]} scale={1.5}>
                <MeshDistortMaterial
                  color="#E8761A"
                  attach="material"
                  distort={0.5}
                  speed={2}
                  roughness={0.2}
                  metalness={0.8}
                />
              </Sphere>
            </Float>
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      </div>

      <motion.div 
        style={{ opacity, scale }}
        className="container-xl relative z-20 text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-ims-gold font-bold tracking-[0.5em] uppercase text-[10px] mb-6 block"
        >
          Comprehensive Luxury Solutions
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ fontFamily: 'var(--font-playfair), serif' }}
          className="text-6xl md:text-8xl font-bold text-[#0A1E3D] mb-8 tracking-tighter"
        >
          Our <span className="gold-shimmer-text">Services</span>
        </motion.h1>
        <div className="w-24 h-[2px] bg-ims-gold mx-auto" />
      </motion.div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#FDFBF7] to-transparent z-20" />
    </section>
  );
}