"use client";

import * as THREE from 'three';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

export default function LuxuryHouse() {
  const groupRef = useRef<THREE.Group>(null);

  // Use useMemo to avoid recreating geometry on every render
  const houseElements = useMemo(() => {
    const group = new THREE.Group();

    // 1. Concrete Base (Foundation)
    const baseGeo = new THREE.BoxGeometry(18, 0.8, 18);
    const baseMat = new THREE.MeshStandardMaterial({ color: '#E0E0E0', roughness: 0.9 });
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.position.y = -3.6;
    base.receiveShadow = true;
    group.add(base);

    // 2. Main Glass Volume (Upper Floor)
    const glassGeo = new THREE.BoxGeometry(14, 8, 14);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: '#ffffff',
      transmission: 0.9,
      thickness: 1.5,
      roughness: 0.05,
      ior: 1.5,
      transparent: true,
      opacity: 0.3,
    });
    const glassVolume = new THREE.Mesh(glassGeo, glassMat);
    glassVolume.position.y = 0;
    group.add(glassVolume);

    // 3. Structural Frames (Metal)
    const frameColor = '#1A2E44';
    const frameMat = new THREE.MeshStandardMaterial({ color: frameColor, metalness: 0.8, roughness: 0.2 });

    // Vertical Pillars
    const pillarGeo = new THREE.BoxGeometry(0.4, 8, 0.4);
    for (let x = -1; x <= 1; x += 2) {
      for (let z = -1; z <= 1; z += 2) {
        const pillar = new THREE.Mesh(pillarGeo, frameMat);
        pillar.position.set(x * 7, 0, z * 7);
        group.add(pillar);
      }
    }

    // Horizontal Frames
    const hFrameGeo = new THREE.BoxGeometry(14.4, 0.4, 0.4);
    [-4, 4].forEach(y => {
      [-7, 7].forEach(z => {
        const hFrame = new THREE.Mesh(hFrameGeo, frameMat);
        hFrame.position.set(0, y, z);
        group.add(hFrame);
      });
    });

    const vFrameGeo = new THREE.BoxGeometry(0.4, 0.4, 14.4);
    [-4, 4].forEach(y => {
      [-7, 7].forEach(x => {
        const vFrame = new THREE.Mesh(vFrameGeo, frameMat);
        vFrame.position.set(x, y, 0);
        group.add(vFrame);
      });
    });

    // 4. Cantilevered Roof (Luxury Feature)
    const roofGeo = new THREE.BoxGeometry(20, 0.5, 20);
    const roofMat = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.5 });
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.y = 4.25;
    roof.castShadow = true;
    group.add(roof);

    // 5. Interior "Core" (Privacy Wall)
    const coreGeo = new THREE.BoxGeometry(4, 8, 4);
    const coreMat = new THREE.MeshStandardMaterial({ color: '#E8761A', roughness: 0.6 });
    const core = new THREE.Mesh(coreGeo, coreMat);
    core.position.set(-2, 0, -2);
    group.add(core);

    // 6. Pool Area (Luxury)
    const poolGeo = new THREE.BoxGeometry(12, 0.2, 6);
    const poolMat = new THREE.MeshPhysicalMaterial({ 
      color: '#4A90E2', 
      transmission: 0.8, 
      thickness: 1, 
      ior: 1.33 
    });
    const pool = new THREE.Mesh(poolGeo, poolMat);
    pool.position.set(0, -3.2, 12);
    group.add(pool);

    return group;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Very subtle floating rotation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={houseElements} />
    </group>
  );
}