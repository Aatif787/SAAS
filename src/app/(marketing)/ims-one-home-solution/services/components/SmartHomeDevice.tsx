"use client";

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function SmartHomeDevice() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.2;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Central Hub */}
      <mesh>
        <cylinderGeometry args={[2, 2, 0.5, 32]} />
        <meshStandardMaterial color="#C5A059" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Inner Glowing Ring */}
      <mesh position={[0, 0.3, 0]}>
        <torusGeometry args={[1.5, 0.05, 16, 100]} />
        <meshStandardMaterial color="#C5A059" emissive="#C5A059" emissiveIntensity={2} />
      </mesh>

      {/* Floating Satellites */}
      {[0, 1, 2].map((i) => (
        <mesh 
          key={i} 
          position={[
            Math.cos((i * 2 * Math.PI) / 3) * 4,
            0.5,
            Math.sin((i * 2 * Math.PI) / 3) * 4
          ]}
        >
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="#C5A059" />
        </mesh>
      ))}

      <pointLight position={[0, 2, 0]} intensity={10} color="#C5A059" />
    </group>
  );
}
