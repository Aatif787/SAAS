"use client";

import React, { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { 
  Float, 
  Decal,
  Environment, 
  PerspectiveCamera,
  ContactShadows
} from "@react-three/drei";

const techs = [
  "Next.js", "React", "TypeScript", "Node.js", "MongoDB", "Prisma", 
  "Tailwind", "Motion", "Three.js", "OpenAI", "Stripe", "Clerk",
  "Next.js", "React", "TypeScript", "Node.js", "MongoDB", "Prisma" 
];

function FloatingStone({
  name,
  position,
  color = "#FF3131",
  scale = 1,
}: {
  name: string;
  position: [number, number, number];
  color?: string;
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(THREE.TextureLoader, "/images/engineered-stone.png");
  
  // Physics refs for gravity jump
  const velocity = useRef(0);
  const yOffset = useRef(0);
  const isJumping = useRef(false);

  const textTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = "bold 150px serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = color;
      ctx.fillText(name.toUpperCase(), canvas.width / 2, canvas.height / 2);
      ctx.strokeStyle = "rgba(0,0,0,0.3)";
      ctx.lineWidth = 2;
      ctx.strokeText(name.toUpperCase(), canvas.width / 2, canvas.height / 2);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.anisotropy = 16;
    return tex;
  }, [name, color]);

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.2, 8), []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Steady rotation
      meshRef.current.rotation.y += 0.01;

      // Gravity Physics Logic
      if (isJumping.current || yOffset.current > 0) {
        velocity.current -= 30 * delta; // Increased Gravity force
        yOffset.current += velocity.current * delta;

        if (yOffset.current <= 0) {
          yOffset.current = 0;
          velocity.current = 0;
          isJumping.current = false;
        }
      }
      
      meshRef.current.position.y = yOffset.current;
    }
  });

  const handlePointerEnter = () => {
    if (!isJumping.current) {
      velocity.current = 12; // Increased Initial upward kick
      isJumping.current = true;
    }
  };

  return (
    <group position={position} scale={scale}>
      <mesh 
        ref={meshRef} 
        geometry={geometry} 
        castShadow 
        receiveShadow
        onPointerEnter={handlePointerEnter}
      >
        <meshPhysicalMaterial 
          map={texture}
          color="#ffffff"
          roughness={0.15}
          metalness={0.05}
          bumpMap={texture}
          bumpScale={0.01}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
        <Decal
          position={[0, 0, 1.1]}
          rotation={[0, 0, 0]}
          scale={[4.2, 2.4, 2.4]}
        >
          <meshStandardMaterial
            map={textTexture}
            transparent
            polygonOffset
            polygonOffsetFactor={-10}
            roughness={1}
            metalness={0}
            emissive={color}
            emissiveIntensity={0.3}
          />
        </Decal>
      </mesh>
    </group>
  );
}

const techItems = [...techs, ...techs, ...techs]; // Triple for ultra-seamless loop

function MarqueeContent() {
  const groupRef = useRef<THREE.Group>(null);
  const count = techItems.length;
  const spacing = 5;
  const totalWidth = count * spacing;
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.position.x -= delta * 2;
      // Modulo-like reset for seamlessness
      if (groupRef.current.position.x < -spacing * techs.length) {
        groupRef.current.position.x += spacing * techs.length;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {techItems.map((tech, i) => (
        <FloatingStone 
          key={`${tech}-${i}`} 
          name={tech} 
          position={[i * spacing, 0, 0]} 
          scale={0.6}
          color={i % 2 === 0 ? "#FF3131" : "#39FF14"}
        />
      ))}
    </group>
  );
}

export default function ThreeDTechStack() {
  return (
    <section className="h-[300px] md:h-[450px] w-full bg-ims-cream relative overflow-hidden">
      <div className="absolute top-12 left-0 w-full text-center z-10">
        <span className="text-[9px] font-bold uppercase tracking-[0.6em] text-ims-gold mb-2 block">
          Foundational Excellence
        </span>
        <h2 className="text-2xl md:text-3xl font-serif text-ims-blue">Engineered Precision</h2>
      </div>

      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={35} />
        <ambientLight intensity={0.7} />
        <spotLight position={[5, 5, 5]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
        <pointLight position={[-5, -5, -5]} intensity={0.5} />
        
        <Suspense fallback={null}>
          <MarqueeContent />
          <Environment preset="city" />
          <ContactShadows position={[0, -2.5, 0]} opacity={0.3} scale={40} blur={2.5} far={10} />
        </Suspense>
      </Canvas>

      <div className="absolute bottom-6 left-0 w-full text-center z-10 pointer-events-none opacity-30">
        <p className="text-[8px] font-bold uppercase tracking-[1em]">3D SPATIAL INFRASTRUCTURE • WEBGL ENGINE</p>
      </div>
    </section>
  );
}
