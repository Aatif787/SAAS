"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";

/* ─── Constants ─── */
const HEX_RADIUS = 0.48;
const HEX_GAP = 0.04;
const COLS = 26; // Good balance of coverage and performance
const ROWS = 16;
const HOVER_RADIUS = 2.4; 
const SMOOTHING = 0.12;
const MAX_LIFT = 0.7; // Maximum Z lift on hover

/* ─── Helper: Create Star Shape ─── */
function createStarShape(innerRadius: number, outerRadius: number, points: number): THREE.Shape {
  const shape = new THREE.Shape();
  const angleStep = Math.PI / points;
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outerRadius : innerRadius;
    const angle = i * angleStep - Math.PI / 2;
    const x = r * Math.cos(angle);
    const y = r * Math.sin(angle);
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();
  return shape;
}

/* ─── Helper: Create Hexagon Shape ─── */
function createHexShape(radius: number): THREE.Shape {
  const shape = new THREE.Shape();
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();
  return shape;
}

/* ─── Helper: Create Hexagon Outline Shape ─── */
function createHexOutlineShape(outerRadius: number, innerRadius: number): THREE.Shape {
  const shape = new THREE.Shape();
  // Outer hexagon
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    const x = outerRadius * Math.cos(angle);
    const y = outerRadius * Math.sin(angle);
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();

  // Inner hexagon path (clockwise to cut hole)
  const hole = new THREE.Path();
  for (let i = 5; i >= 0; i--) {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    const x = innerRadius * Math.cos(angle);
    const y = innerRadius * Math.sin(angle);
    if (i === 5) hole.moveTo(x, y);
    else hole.lineTo(x, y);
  }
  hole.closePath();
  shape.holes.push(hole);

  return shape;
}

/* ─── Instanced Hex Grid ─── */
interface HexGridProps {
  mousePos: React.MutableRefObject<THREE.Vector2>;
}

function HexGrid({ mousePos }: HexGridProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const starRef = useRef<THREE.InstancedMesh>(null!);
  const outlineRef = useRef<THREE.InstancedMesh>(null!);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const starDummy = useMemo(() => new THREE.Object3D(), []);
  const outlineDummy = useMemo(() => new THREE.Object3D(), []);

  // Geometry construction
  const hexGeo = useMemo(() => {
    const shape = createHexShape(HEX_RADIUS);
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.15,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.015,
      bevelSegments: 2,
    });
  }, []);

  const starGeo = useMemo(() => {
    const shape = createStarShape(0.06, 0.15, 4);
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.04,
      bevelEnabled: false,
    });
  }, []);

  const outlineGeo = useMemo(() => {
    const shape = createHexOutlineShape(HEX_RADIUS, HEX_RADIUS - 0.015);
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.03,
      bevelEnabled: false,
    });
  }, []);

  // Base grid layout math
  const { width, height, offsetX, offsetY, total } = useMemo(() => {
    const w = Math.sqrt(3) * (HEX_RADIUS + HEX_GAP);
    const h = 1.5 * (HEX_RADIUS + HEX_GAP);
    const ox = -((COLS - 1) * w) / 2;
    const oy = -((ROWS - 1) * h) / 2;
    return { width: w, height: h, offsetX: ox, offsetY: oy, total: COLS * ROWS };
  }, []);

  // Persistent per-hex instance state
  const state = useMemo(() => {
    const initialPositions: { x: number; y: number }[] = [];
    const currentZ = new Float32Array(total);
    const currentScale = new Float32Array(total);
    const starRotations = new Float32Array(total);
    const hasStar = new Uint8Array(total);

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const x = offsetX + c * width + (r % 2) * (width / 2);
        const y = offsetY + r * height;
        initialPositions.push({ x, y });
        starRotations[initialPositions.length - 1] = Math.random() * Math.PI;
        // ~15% chance to have a star on top
        hasStar[initialPositions.length - 1] = Math.random() < 0.15 ? 1 : 0;
      }
    }

    return { initialPositions, currentZ, currentScale, starRotations, hasStar };
  }, [offsetX, offsetY, width, height, total]);

  // Color interpolators
  const baseColor = useMemo(() => new THREE.Color("#F3EEE0"), []); // Elegant cream
  const goldColor = useMemo(() => new THREE.Color("#C5A059"), []); // Brand gold

  // Initial setup
  useEffect(() => {
    for (let i = 0; i < total; i++) {
      const pos = state.initialPositions[i];
      dummy.position.set(pos.x, pos.y, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
      meshRef.current.setColorAt(i, baseColor);

      outlineDummy.position.set(pos.x, pos.y, 0.01);
      outlineDummy.updateMatrix();
      outlineRef.current.setMatrixAt(i, outlineDummy.matrix);
      outlineRef.current.setColorAt(i, goldColor);

      if (state.hasStar[i]) {
        starDummy.position.set(pos.x, pos.y, 0.02);
        starDummy.scale.set(0.6, 0.6, 1);
        starDummy.rotation.z = state.starRotations[i];
        starDummy.updateMatrix();
        starRef.current.setMatrixAt(i, starDummy.matrix);
        starRef.current.setColorAt(i, baseColor);
      } else {
        // Hide unused star instances
        starDummy.position.set(0, 0, -100);
        starDummy.scale.set(0, 0, 0);
        starDummy.updateMatrix();
        starRef.current.setMatrixAt(i, starDummy.matrix);
      }
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    outlineRef.current.instanceMatrix.needsUpdate = true;
    starRef.current.instanceMatrix.needsUpdate = true;
  }, [total, baseColor, goldColor, dummy, outlineDummy, starDummy, state]);

  // Animation frame loop
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const mx = mousePos.current.x;
    const my = mousePos.current.y;
    const tempColor = new THREE.Color();

    for (let i = 0; i < total; i++) {
      const pos = state.initialPositions[i];
      const dx = pos.x - mx;
      const dy = pos.y - my;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Lift calculations
      const active = dist < HOVER_RADIUS;
      const targetZ = active ? (1 - dist / HOVER_RADIUS) * MAX_LIFT : 0;
      const targetScale = active ? 1 + (1 - dist / HOVER_RADIUS) * 0.12 : 1;

      state.currentZ[i] += (targetZ - state.currentZ[i]) * SMOOTHING;
      state.currentScale[i] += (targetScale - state.currentScale[i]) * SMOOTHING;

      const z = state.currentZ[i];
      const scale = state.currentScale[i];

      // Update base hexagons
      dummy.position.set(pos.x, pos.y, z);
      dummy.scale.set(scale, scale, 1);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      // Glow color based on hover height
      const t = z / MAX_LIFT;
      tempColor.lerpColors(baseColor, goldColor, t);
      meshRef.current.setColorAt(i, tempColor);

      // Update outline meshes
      outlineDummy.position.set(pos.x, pos.y, z + 0.06);
      outlineDummy.scale.set(scale * 1.01, scale * 1.01, 1);
      outlineDummy.updateMatrix();
      outlineRef.current.setMatrixAt(i, outlineDummy.matrix);

      // Update stars
      if (state.hasStar[i]) {
        starDummy.position.set(pos.x, pos.y, z + 0.1);
        starDummy.scale.set(scale * 0.65, scale * 0.65, 1);
        starDummy.rotation.z = state.starRotations[i] + time * 0.3;
        starDummy.updateMatrix();
        starRef.current.setMatrixAt(i, starDummy.matrix);
      }
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;

    outlineRef.current.instanceMatrix.needsUpdate = true;
    starRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh ref={meshRef} args={[hexGeo, null as any, total]} castShadow receiveShadow>
        <meshStandardMaterial roughness={0.3} metalness={0.1} />
      </instancedMesh>

      <instancedMesh ref={outlineRef} args={[outlineGeo, null as any, total]}>
        <meshBasicMaterial transparent opacity={0.35} />
      </instancedMesh>

      <instancedMesh ref={starRef} args={[starGeo, null as any, total]}>
        <meshStandardMaterial roughness={0.1} metalness={0.8} color="#FFFFFF" emissive="#C5A059" emissiveIntensity={0.5} />
      </instancedMesh>
    </>
  );
}

/* ─── Mouse Tracker ─── */
interface MouseTrackerProps {
  mousePos: React.MutableRefObject<THREE.Vector2>;
}

function MouseTracker({ mousePos }: MouseTrackerProps) {
  const { viewport } = useThree();

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const nx = (event.clientX / window.innerWidth) * 2 - 1;
      const ny = -(event.clientY / window.innerHeight) * 2 + 1;
      const x = (nx * viewport.width) / 2;
      const y = (ny * viewport.height) / 2;
      mousePos.current.set(x, y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [viewport]);

  return null;
}

/* ─── Main Component ─── */
export default function SuperHexBackground() {
  const mousePos = useRef(new THREE.Vector2(-100, -100));

  return (
    <div className="absolute inset-0 z-0 bg-[#FDFBF7]">
      <Canvas
        shadows
        camera={{ position: [0, 0, 12], fov: 38 }}
        dpr={[1, 1.25]}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <ambientLight intensity={0.85} />
        
        <directionalLight 
          position={[4, 6, 8]} 
          intensity={1.2} 
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.001}
        />

        <directionalLight 
          position={[-4, -6, -2]} 
          intensity={0.4} 
          color="#D4C8B3"
        />

        <MouseTracker mousePos={mousePos} />
        <HexGrid mousePos={mousePos} />
        
        <Sparkles 
          count={25} 
          scale={[14, 10, 2]} 
          color="#C5A059" 
          size={1.5} 
          speed={0.25} 
        />
      </Canvas>
      
      {/* Premium Overlays */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/10 via-transparent to-[#FDFBF7]" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.025] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')]" />
      
      {/* Ambient Depth */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.02)_100%)]" />
    </div>
  );
}
