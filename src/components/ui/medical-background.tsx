"use client";

import React, { useRef, useState } from "react";
import { useIsClient } from "@/hooks/use-is-client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Float, Environment } from "@react-three/drei";

function MolecularNexus() {
  const meshRef = useRef<THREE.Points>(null!);
  const lineRef = useRef<THREE.LineSegments>(null!);
  const { mouse, viewport } = useThree();
  
  const count = 150; // Number of "molecules"
  
  const { particles, connections } = useState(() => {
    const tempParticles = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      tempParticles[i * 3] = (Math.random() - 0.5) * 15;
      tempParticles[i * 3 + 1] = (Math.random() - 0.5) * 15;
      tempParticles[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }

    const tempConnections = new Float32Array(count * count * 6);
    return { particles: tempParticles, connections: tempConnections };
  })[0];

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Gentle floating motion
    meshRef.current.rotation.y = time * 0.05;
    meshRef.current.rotation.x = time * 0.02;

    const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
    const linePositions = lineRef.current.geometry.attributes.position.array as Float32Array;
    let lineCount = 0;

    // React to mouse
    const targetX = mouse.x * viewport.width / 2;
    const targetY = mouse.y * viewport.height / 2;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Add some subtle noise to movement
      positions[i3] += Math.sin(time + positions[i3+1]) * 0.002;
      positions[i3+1] += Math.cos(time + positions[i3]) * 0.002;

      // Distance to mouse
      const dx = positions[i3] - targetX;
      const dy = positions[i3+1] - targetY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 3) {
        positions[i3] += dx * 0.01;
        positions[i3+1] += dy * 0.01;
      }

      // Build connections
      for (let j = i + 1; j < count; j++) {
        const j3 = j * 3;
        const dx2 = positions[i3] - positions[j3];
        const dy2 = positions[i3+1] - positions[j3+1];
        const dz2 = positions[i3+2] - positions[j3+2];
        const d2 = dx2 * dx2 + dy2 * dy2 + dz2 * dz2;

        if (d2 < 6) { // Connection threshold
          linePositions[lineCount++] = positions[i3];
          linePositions[lineCount++] = positions[i3+1];
          linePositions[lineCount++] = positions[i3+2];
          linePositions[lineCount++] = positions[j3];
          linePositions[lineCount++] = positions[j3+1];
          linePositions[lineCount++] = positions[j3+2];
        }
      }
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
    lineRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Set draw range for lines
    lineRef.current.geometry.setDrawRange(0, lineCount);
  });

  return (
    <group>
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particles, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#BF0A30" // IMS Red for medical focus
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>

      <lineSegments ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[connections, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#121214" // IMS Charcoal
          transparent
          opacity={0.1}
          linewidth={1}
        />
      </lineSegments>
    </group>
  );
}

export default function MedicalBackground() {
  const mounted = useIsClient();

  if (!mounted) return <div className="absolute inset-0 bg-white" />;

  return (
    <div className="absolute inset-0 z-0 bg-white">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#ffffff"]} />
        
        {/* Super White Lighting */}
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#ffeef0" />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <MolecularNexus />
        </Float>

        {/* Soft volumetric fog effect */}
        <fog attach="fog" args={["#ffffff", 5, 25]} />
      </Canvas>

      {/* Extraordinary bluish corner shadows */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.05)]" />
    </div>
  );
}
