"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";

/* ─── Constants ─── */
const HEX_RADIUS = 0.48;
const HEX_GAP = 0.04;
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

  const COLS = 26;
  const ROWS = 16;
  const total = COLS * ROWS;
  const maxTotal = 26 * 16; // Maximum static size for WebGL buffers

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
  const { width, height, offsetX, offsetY } = useMemo(() => {
    const w = Math.sqrt(3) * (HEX_RADIUS + HEX_GAP);
    const h = 1.5 * (HEX_RADIUS + HEX_GAP);
    // Center alignment correction to balance the row offset shift
    const ox = -((COLS - 1) * w) / 2 - w / 4;
    const oy = -((ROWS - 1) * h) / 2;
    return { width: w, height: h, offsetX: ox, offsetY: oy };
  }, [COLS, ROWS]);

  // Persistent per-hex instance state
  const state = useMemo(() => {
    const initialPositions: { x: number; y: number }[] = [];
    const currentZ = new Float32Array(maxTotal);
    const currentScale = new Float32Array(maxTotal);
    const starRotations = new Float32Array(maxTotal);
    const hasStar = new Uint8Array(maxTotal);

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
  }, [offsetX, offsetY, width, height, maxTotal, COLS, ROWS]);

  // Color interpolators
  const baseColor = useMemo(() => new THREE.Color("#F3EEE0"), []); // Elegant cream
  const goldColor = useMemo(() => new THREE.Color("#C5A059"), []); // Brand gold

  // Initial setup and count adjustment
  useEffect(() => {
    if (meshRef.current) meshRef.current.count = total;
    if (outlineRef.current) outlineRef.current.count = total;
    if (starRef.current) starRef.current.count = total;

    for (let i = 0; i < total; i++) {
      const pos = state.initialPositions[i];
      if (!pos) continue;

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
        starDummy.position.set(pos.x, pos.y, 0.25);
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

  const lastMousePos = useRef(new THREE.Vector2(-100, -100));
  const isFirstFrame = useRef(true);

  // Animation frame loop
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const mx = mousePos.current.x;
    const my = mousePos.current.y;

    // Check if mouse moved
    const mouseMoved = lastMousePos.current.distanceToSquared(mousePos.current) > 0.0001;
    if (mouseMoved) {
      lastMousePos.current.copy(mousePos.current);
    }

    let needsUpdate = mouseMoved || isFirstFrame.current;
    isFirstFrame.current = false;

    // Calculate changes and check if anything changed significantly
    for (let i = 0; i < total; i++) {
      const pos = state.initialPositions[i];
      if (!pos) continue;

      const dx = pos.x - mx;
      const dy = pos.y - my;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const active = dist < HOVER_RADIUS;
      const targetZ = active ? (1 - dist / HOVER_RADIUS) * MAX_LIFT : 0;
      const targetScale = active ? 1 + (1 - dist / HOVER_RADIUS) * 0.12 : 1;

      const deltaZ = targetZ - state.currentZ[i];
      const deltaScale = targetScale - state.currentScale[i];

      if (Math.abs(deltaZ) > 0.0005 || Math.abs(deltaScale) > 0.0005) {
        needsUpdate = true;
      }

      state.currentZ[i] += deltaZ * SMOOTHING;
      state.currentScale[i] += deltaScale * SMOOTHING;
    }

    // Only update buffers on the GPU if there is active motion/transitions
    if (needsUpdate) {
      const tempColor = new THREE.Color();
      for (let i = 0; i < total; i++) {
        const pos = state.initialPositions[i];
        if (!pos) continue;

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

        // Update stars - spinning continuously
        if (state.hasStar[i]) {
          starDummy.position.set(pos.x, pos.y, z + 0.25);
          starDummy.scale.set(scale * 0.65, scale * 0.65, 1);
          starDummy.rotation.z = state.starRotations[i] + time * 1.0;
          starDummy.updateMatrix();
          starRef.current.setMatrixAt(i, starDummy.matrix);
        }
      }

      meshRef.current.instanceMatrix.needsUpdate = true;
      if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
      outlineRef.current.instanceMatrix.needsUpdate = true;
      starRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <>
      <instancedMesh ref={meshRef} args={[hexGeo, null as any, maxTotal]} castShadow receiveShadow>
        <meshStandardMaterial roughness={0.3} metalness={0.1} />
      </instancedMesh>

      <instancedMesh ref={outlineRef} args={[outlineGeo, null as any, maxTotal]}>
        <meshBasicMaterial transparent opacity={0.35} />
      </instancedMesh>

      <instancedMesh ref={starRef} args={[starGeo, null as any, maxTotal]}>
        <meshStandardMaterial 
          roughness={0.1} 
          metalness={0.9} 
          color="#C5A059" 
          emissive="#C5A059" 
          emissiveIntensity={0.85} 
        />
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

/* ─── Mobile SVG Fallback ─── */
function MobileHexBackground() {
  const COLS = 6;
  const ROWS = 12;
  const r = 45;
  const w = Math.sqrt(3) * r;
  const h = 1.5 * r;

  const hexes = useMemo(() => {
    const list = [];
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const cx = col * w + (row % 2) * (w / 2) + w / 2;
        const cy = row * h + r;
        const hash = (row * 7 + col * 13) % 100;
        
        let type: "gradient" | "outline-gold" | "star" | "subtle" = "subtle";
        if (hash < 12) type = "gradient";
        else if (hash < 25) type = "outline-gold";
        else if (hash < 32) type = "star";

        list.push({ cx, cy, type, id: `${row}-${col}`, hash });
      }
    }
    return list;
  }, [w, h, r]);

  return (
    <div className="absolute inset-0 z-0 bg-[#FDFBF7] overflow-hidden flex items-center justify-center">
      <svg 
        viewBox="0 0 510 840" 
        className="w-full h-full object-cover opacity-60"
        style={{ transform: "scale(1.05)" }}
      >
        <defs>
          <linearGradient id="gold-hex-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C5A059" stopOpacity={0.25} />
            <stop offset="100%" stopColor="#FAF6F0" stopOpacity={0.05} />
          </linearGradient>
        </defs>

        <style>{`
          @keyframes spin-slow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>

        {hexes.map((hex) => {
          const cx = hex.cx;
          const cy = hex.cy;
          const points = `
            ${cx + 0.866 * r},${cy + 0.5 * r} 
            ${cx},${cy + r} 
            ${cx - 0.866 * r},${cy + 0.5 * r} 
            ${cx - 0.866 * r},${cy - 0.5 * r} 
            ${cx},${cy - r} 
            ${cx + 0.866 * r},${cy - 0.5 * r}
          `.replace(/\s+/g, " ");

          return (
            <g key={hex.id}>
              {/* Base Hexagon */}
              <polygon
                points={points}
                fill={hex.type === "gradient" ? "url(#gold-hex-grad)" : "none"}
                stroke="#C5A059"
                strokeWidth={hex.type === "outline-gold" ? 1.5 : 0.6}
                strokeOpacity={
                  hex.type === "outline-gold"
                    ? 0.35
                    : hex.type === "gradient"
                    ? 0.2
                    : 0.08
                }
              />

              {/* Twinkling Rotating Star */}
              {hex.type === "star" && (
                <path
                  d={`M ${cx} ${cy - 10} Q ${cx} ${cy} ${cx + 10} ${cy} Q ${cx} ${cy} ${cx} ${cy + 10} Q ${cx} ${cy} ${cx - 10} ${cy} Q ${cx} ${cy} ${cx} ${cy - 10} Z`}
                  fill="#C5A059"
                  opacity={0.8}
                  style={{
                    transformOrigin: `${cx}px ${cy}px`,
                    animation: `spin-slow ${15 + (hex.hash % 15)}s linear infinite`,
                  }}
                />
              )}
            </g>
          );
        })}
      </svg>
      {/* Ambient Radial Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/10 via-transparent to-[#FDFBF7]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,#FDFBF7_95%)]" />
    </div>
  );
}

/* ─── Main Component ─── */
export default function SuperHexBackground() {
  const mousePos = useRef(new THREE.Vector2(-100, -100));
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Return loading state until mounted to avoid hydration mismatch
  if (isMobile === null) {
    return <div className="absolute inset-0 bg-[#FDFBF7]" />;
  }

  // Fallback to lightweight, perfectly aligned SVG on mobile
  if (isMobile) {
    return <MobileHexBackground />;
  }

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
