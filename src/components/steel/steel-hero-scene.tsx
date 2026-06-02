"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, ContactShadows, Environment, Lightformer, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function MonolithDoor() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        (state.mouse.x * Math.PI) / 4,
        0.05
      );
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        (state.mouse.y * Math.PI) / 8,
        0.05
      );
    }
  });

  return (
    <group>
      {/* Outer Liquid Chrome / Glass Monolith */}
      <Float speed={2.5} rotationIntensity={0.5} floatIntensity={1.5}>
        <mesh ref={meshRef} position={[0, 0, 0]}>
          {/* A massive architectural portal shape */}
          <boxGeometry args={[3, 5, 0.4]} />
          <MeshTransmissionMaterial
            backside
            samples={8}
            thickness={2}
            chromaticAberration={0.06}
            anisotropy={0.3}
            distortion={0.2}
            distortionScale={0.5}
            temporalDistortion={0.1}
            iridescence={0.5}
            iridescenceIOR={1.2}
            iridescenceThicknessRange={[0, 1400]}
            color="#ffffff"
            attenuationDistance={1}
            attenuationColor="#ffffff"
          />
        </mesh>
      </Float>

      {/* Floating Energy Particles */}
      <Sparkles count={150} scale={12} size={1.5} speed={0.4} opacity={0.3} color="#ffffff" />

      {/* Premium Cinematic Lighting Setup */}
      <ambientLight intensity={0.5} color="#ffffff" />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} color="#ffffff" />
      <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={1.5} color="#ffffff" />
      <pointLight position={[0, 0, 0]} intensity={0.5} color="#ffffff" />

      {/* Extreme Contact Shadow for weight */}
      <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.2} far={10} color="#000000" />
      
      {/* Hyper-realistic Environment Reflections */}
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 4, -0.3, 0]}>
          <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
          <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[20, 0.5, 1]} />
          <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 1, 1]} />
          <Lightformer intensity={2} color="#ffffff" position={[0, 0, 5]} scale={[10, 10, 1]} />
        </group>
      </Environment>
    </group>
  );
}

export default function SteelHeroScene() {
  return (
    <div className="absolute inset-0 z-0 h-full w-full bg-white">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ powerPreference: "high-performance", antialias: false, stencil: false, depth: false }}
        dpr={[1, 2]}
      >
        <MonolithDoor />
      </Canvas>
    </div>
  );
}
