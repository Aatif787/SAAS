"use client";

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;

  void main() {
    vUv = uv;
    vPosition = position;
    
    vec3 pos = position;
    pos.z += sin(pos.x * 1.5 + uTime) * 0.2;
    pos.z += cos(pos.y * 1.5 + uTime) * 0.2;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  varying vec2 vUv;

  void main() {
    vec2 p = vUv;
    
    // Sharper sine wave blending for "Crystal" clarity
    float blend1 = sin(p.x * 3.0 + uTime * 0.3) * 0.5 + 0.5;
    float blend2 = cos(p.y * 2.0 - uTime * 0.2) * 0.5 + 0.5;
    
    vec3 color = mix(uColor1, uColor2, blend1);
    color = mix(color, uColor3, blend2 * 0.5);
    
    // Subtle Sharp Highlight instead of Blur
    float highlight = pow(sin(p.x * 10.0 + uTime), 20.0);
    color += highlight * 0.05;

    gl_FragColor = vec4(color, 0.15);
  }
`;

export default function LiquidBackground() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor1: { value: new THREE.Color('#E8761A') }, // Coral
    uColor2: { value: new THREE.Color('#1A2E44') }, // Navy
    uColor3: { value: new THREE.Color('#FDFBF7') }, // Cream
  }), []);

  useFrame((state) => {
    if (meshRef.current) {
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -5]} rotation={[0, 0, 0]}>
      <planeGeometry args={[60, 40, 32, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
