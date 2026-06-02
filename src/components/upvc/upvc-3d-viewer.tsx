"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Float,
  PerspectiveCamera,
  RoundedBox,
  Environment,
} from "@react-three/drei";
import * as THREE from "three";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const DOOR_TYPES = [
  {
    id: "wooden",
    name: "Solid Mahogany",
    category: "door",
    desc: "Deep-profile premium entry door with layered panels and gallery-grade timber character.",
    accent: "#b45309",
    frame: "#5b3716",
    glassTint: "#f7fbff",
    type: "solid",
    width: 1.75,
    height: 3.55,
  },
  {
    id: "sliding",
    name: "Panoramic Sliding",
    category: "door",
    desc: "Wide-span sliding door with synchronized tracks and crisp premium framing for villa elevations.",
    accent: "#38bdf8",
    frame: "#1e293b",
    glassTint: "#d8f3ff",
    type: "sliding",
    width: 3.55,
    height: 3.55,
  },
  {
    id: "french",
    name: "Classic French",
    category: "door",
    desc: "Balanced double-door composition with precise mullions, clean sightlines, and smooth swing motion.",
    accent: "#f8fafc",
    frame: "#d4d4d8",
    glassTint: "#eef7ff",
    type: "french",
    width: 2.35,
    height: 3.55,
  },
  {
    id: "barn",
    name: "Industrial Barn",
    category: "door",
    desc: "Statement barn door with exposed track detailing and a strong loft-inspired architectural profile.",
    accent: "#94a3b8",
    frame: "#27272a",
    glassTint: "#e8f1f7",
    type: "barn",
    width: 1.9,
    height: 3.55,
  },
  {
    id: "glass",
    name: "Minimalist Glass",
    category: "door",
    desc: "Ultra-clear pivot door with a slim perimeter structure and crisp architectural proportions.",
    accent: "#a5f3fc",
    frame: "#cbd5e1",
    glassTint: "#f2fdff",
    type: "glass",
    width: 1.7,
    height: 3.6,
  },
  {
    id: "folding",
    name: "Bi-Fold System",
    category: "door",
    desc: "Architectural bi-fold system engineered for airy indoor-outdoor transitions and fluid movement.",
    accent: "#84cc16",
    frame: "#475569",
    glassTint: "#ebffe3",
    type: "folding",
    width: 3.4,
    height: 3.5,
  },
  {
    id: "pivot",
    name: "Pivot Entry",
    category: "door",
    desc: "Large-format pivot door with offset hinge geometry and a strong contemporary facade presence.",
    accent: "#f59e0b",
    frame: "#7c5a2b",
    glassTint: "#fef7ed",
    type: "pivot",
    width: 2.05,
    height: 3.6,
  },
  {
    id: "patio",
    name: "Patio Slider",
    category: "door",
    desc: "Slim patio slider designed for brighter openings, lighter sections, and crisp day-lit visibility.",
    accent: "#60a5fa",
    frame: "#475569",
    glassTint: "#e0f2fe",
    type: "patio",
    width: 3.75,
    height: 3.35,
  },
  {
    id: "casement-window",
    name: "Casement Window",
    category: "window",
    desc: "Outward-opening UPVC casement window with clean sash profiles and strong daylight clarity.",
    accent: "#16a34a",
    frame: "#f8fafc",
    glassTint: "#eefcff",
    type: "casement-window",
    width: 2.15,
    height: 2.1,
  },
  {
    id: "sliding-window",
    name: "Sliding Window",
    category: "window",
    desc: "Horizontal sliding window system with compact tracks and a sharper modern residential profile.",
    accent: "#0ea5e9",
    frame: "#e2e8f0",
    glassTint: "#ecfeff",
    type: "sliding-window",
    width: 2.7,
    height: 1.95,
  },
  {
    id: "fixed-window",
    name: "Fixed Picture",
    category: "window",
    desc: "Minimal fixed picture window with broad glass area for clean light entry and premium facade rhythm.",
    accent: "#38bdf8",
    frame: "#dbe4ea",
    glassTint: "#f8fdff",
    type: "fixed-window",
    width: 2.5,
    height: 1.9,
  },
  {
    id: "awning-window",
    name: "Awning Window",
    category: "window",
    desc: "Top-hung awning window designed for ventilation, weather protection, and a refined compact look.",
    accent: "#84cc16",
    frame: "#e5e7eb",
    glassTint: "#f0fdf4",
    type: "awning-window",
    width: 2.15,
    height: 1.75,
  },
] as const;

const FINISHES = [
  { name: "Signature", color: "" },
  { name: "Arctic", color: "#f8fafc" },
  { name: "Graphite", color: "#1f2937" },
  { name: "Walnut", color: "#7c4a21" },
] as const;

type DoorConfig = (typeof DOOR_TYPES)[number];

function createStripedTexture(
  palette: [string, string, string],
  width: number,
  height: number,
  repeat: [number, number],
  axis: "x" | "y",
) {
  const data = new Uint8Array(width * height * 4);
  const c1 = new THREE.Color(palette[0]);
  const c2 = new THREE.Color(palette[1]);
  const c3 = new THREE.Color(palette[2]);

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const stride = (y * width + x) * 4;
      const primary = axis === "x" ? x / width : y / height;
      const secondary = axis === "x" ? y / height : x / width;
      const wave = Math.sin(primary * 20 + secondary * 4.5) * 0.18;
      const fine = Math.sin(primary * 95 + secondary * 16) * 0.05;
      const blend = THREE.MathUtils.clamp(primary + wave + fine, 0, 1);
      const color = c1.clone().lerp(c2, blend).lerp(c3, (Math.sin(primary * 42) + 1) * 0.08);

      data[stride] = Math.round(color.r * 255);
      data[stride + 1] = Math.round(color.g * 255);
      data[stride + 2] = Math.round(color.b * 255);
      data[stride + 3] = 255;
    }
  }

  const texture = new THREE.DataTexture(data, width, height, THREE.RGBAFormat);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeat[0], repeat[1]);
  texture.anisotropy = 8;
  texture.needsUpdate = true;

  return texture;
}

function createGradientTexture(top: string, bottom: string, width: number, height: number) {
  const data = new Uint8Array(width * height * 4);
  const topColor = new THREE.Color(top);
  const bottomColor = new THREE.Color(bottom);

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const stride = (y * width + x) * 4;
      const blend = y / Math.max(height - 1, 1);
      const color = topColor.clone().lerp(bottomColor, blend);

      data[stride] = Math.round(color.r * 255);
      data[stride + 1] = Math.round(color.g * 255);
      data[stride + 2] = Math.round(color.b * 255);
      data[stride + 3] = 255;
    }
  }

  const texture = new THREE.DataTexture(data, width, height, THREE.RGBAFormat);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

// ─── MODULE-LEVEL SINGLETON TEXTURES ────────────────────────────────────────
// Created ONCE at module load — never recreated per component instance.
// This keeps total GPU texture units well under the WebGL limit of 16.

const TEX = (() => {
  // Only run on client (Three.js needs browser WebGL context)
  if (typeof window === "undefined") return null;

  return {
    // Door frame / window frame brushed metal
    frameBrushed: createStripedTexture(
      ["#d9dde5", "#6b7280", "#f8fafc"], 128, 128, [4, 3], "y",
    ),
    // Solid mahogany wood grain
    wood: createStripedTexture(
      ["#3b2415", "#82522d", "#c08a53"], 128, 128, [2.6, 1.2], "x",
    ),
    // Showroom bay gold trim
    goldTrim: createStripedTexture(
      ["#c9a84c", "#e8c96a", "#b8922e"], 64, 64, [1, 8], "y",
    ),
    // Showroom bay stucco wall
    stucco: createStuccoTexture(128, 256),
    // Showroom marble floor
    marble: createMarbleTexture(256, 256),
  };
})();

function DoorSurface({
  size,
  position = [0, 0, 0],
  color,
  roughness = 0.12,
  metalness = 0.18,
  radius = 0.03,
  map,
}: {
  size: [number, number, number];
  position?: [number, number, number];
  color: string;
  roughness?: number;
  metalness?: number;
  radius?: number;
  map?: THREE.Texture;
}) {
  return (
    <RoundedBox args={size} radius={radius} smoothness={8} position={position} castShadow receiveShadow>
      <meshPhysicalMaterial
        color={color}
        map={map}
        roughness={roughness}
        metalness={metalness}
        clearcoat={0.5}
        clearcoatRoughness={0.1}
        envMapIntensity={0.6}
        reflectivity={0.2}
      />
    </RoundedBox>
  );
}

function GlassPanel({
  size,
  position = [0, 0, 0],
  tint = "#dff5ff",
}: {
  size: [number, number, number];
  position?: [number, number, number];
  tint?: string;
}) {
  return (
    <group position={position}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={size} />
        <meshPhysicalMaterial
          color={tint}
          transmission={0.99}
          roughness={0.0}
          thickness={0.08}
          ior={1.52}
          transparent
          opacity={0.04}
          metalness={0}
          reflectivity={0.06}
          clearcoat={1}
          clearcoatRoughness={0.0}
          attenuationColor="#e8f8ff"
          attenuationDistance={16}
          envMapIntensity={0.3}
        />
      </mesh>
      {/* Primary specular highlight — top-left */}
      <mesh position={[size[0] * -0.25, size[1] * 0.28, size[2] / 2 + 0.002]}>
        <planeGeometry args={[size[0] * 0.14, size[1] * 0.5]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.055} />
      </mesh>
      {/* Secondary highlight — bottom right */}
      <mesh position={[size[0] * 0.3, -size[1] * 0.25, size[2] / 2 + 0.002]}>
        <planeGeometry args={[size[0] * 0.08, size[1] * 0.2]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.03} />
      </mesh>
      {/* Bottom reflection band */}
      <mesh position={[0, -size[1] * 0.32, size[2] / 2 + 0.002]}>
        <planeGeometry args={[size[0] * 0.88, size[1] * 0.12]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.02} />
      </mesh>
    </group>
  );
}

function HandleSet({
  x,
  y = -0.05,
  z = 0.08,
  mirrored = false,
}: {
  x: number;
  y?: number;
  z?: number;
  mirrored?: boolean;
}) {
  const handle = (
    <>
      <mesh castShadow>
        <capsuleGeometry args={[0.028, 0.38, 20, 32]} />
        <meshPhysicalMaterial
          color="#f8fafc"
          metalness={1}
          roughness={0.02}
          clearcoat={1}
          clearcoatRoughness={0.02}
          envMapIntensity={3}
          reflectivity={1}
        />
      </mesh>
      {/* Escutcheon plate */}
      <mesh position={[0, 0, -0.055]} castShadow>
        <cylinderGeometry args={[0.022, 0.022, 0.1, 32]} />
        <meshPhysicalMaterial
          color="#b0b8c4"
          metalness={1}
          roughness={0.06}
          clearcoat={0.8}
          envMapIntensity={2}
        />
      </mesh>
      {/* Grip detail ring */}
      <mesh position={[0, 0.12, 0]} castShadow>
        <torusGeometry args={[0.028, 0.006, 12, 32]} />
        <meshPhysicalMaterial color="#e2e8f0" metalness={1} roughness={0.04} envMapIntensity={2} />
      </mesh>
      <mesh position={[0, -0.12, 0]} castShadow>
        <torusGeometry args={[0.028, 0.006, 12, 32]} />
        <meshPhysicalMaterial color="#e2e8f0" metalness={1} roughness={0.04} envMapIntensity={2} />
      </mesh>
    </>
  );

  return (
    <>
      <group position={[x, y, z]}>{handle}</group>
      {mirrored ? <group position={[x, y, -z]} rotation={[0, Math.PI, 0]}>{handle}</group> : null}
    </>
  );
}

function DoorFrame({
  width,
  height,
  color,
}: {
  width: number;
  height: number;
  color: string;
}) {
  const side = 0.16;
  const top = 0.18;
  const depth = 0.17;
  const brushedTexture = TEX?.frameBrushed;

  return (
    <group>
      <DoorSurface size={[width, top, depth]} position={[0, height / 2 - top / 2, 0]} color={color} map={brushedTexture} />
      <DoorSurface size={[side, height, depth]} position={[-width / 2 + side / 2, 0, 0]} color={color} map={brushedTexture} />
      <DoorSurface size={[side, height, depth]} position={[width / 2 - side / 2, 0, 0]} color={color} map={brushedTexture} />
      <DoorSurface size={[width, 0.08, 0.22]} position={[0, -height / 2 + 0.04, 0.015]} color="#d6d3d1" roughness={0.3} metalness={0.4} />
      <DoorSurface size={[width - 0.18, 0.03, 0.09]} position={[0, -height / 2 + 0.11, 0.09]} color="#0f172a" roughness={0.2} metalness={0.8} radius={0.01} />
      <mesh position={[0, 0, depth / 2 + 0.005]}>
        <planeGeometry args={[width - 0.05, height - 0.18]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.05} />
      </mesh>
    </group>
  );
}

function SolidDoor({ door, finish, openAmount }: { door: DoorConfig; finish: string; openAmount: number }) {
  const pivot = useRef<THREE.Group>(null);
  const leafWidth = door.width - 0.26;
  const leafHeight = door.height - 0.34;
  const woodTexture = TEX?.wood;

  useFrame((_, delta) => {
    if (!pivot.current) return;
    pivot.current.rotation.y = THREE.MathUtils.damp(pivot.current.rotation.y, -0.52 * openAmount, 5, delta);
  });

  return (
    <group>
      <DoorFrame width={door.width} height={door.height} color={finish} />
      <group ref={pivot} position={[-door.width / 2 + 0.13, 0, 0.015]}>
        <group position={[leafWidth / 2, 0, 0]}>
          <DoorSurface size={[leafWidth, leafHeight, 0.09]} color={finish} roughness={0.3} metalness={0.08} map={woodTexture} />
          {[-1.05, 0, 1.05].map((y) => (
            <DoorSurface
              key={y}
              size={[leafWidth - 0.34, 0.62, 0.03]}
              position={[0, y, 0.06]}
              color={finish}
              roughness={0.44}
              metalness={0.08}
              radius={0.02}
              map={woodTexture}
            />
          ))}
          <DoorSurface size={[0.16, leafHeight - 0.24, 0.02]} position={[-leafWidth / 2 + 0.18, 0, 0.058]} color="#3f2a18" roughness={0.62} metalness={0.06} radius={0.01} />
          <HandleSet x={leafWidth / 2 - 0.16} mirrored />
        </group>
      </group>
    </group>
  );
}

function SlidingDoor({ door, finish, openAmount }: { door: DoorConfig; finish: string; openAmount: number }) {
  const frontPanel = useRef<THREE.Group>(null);
  const backPanel = useRef<THREE.Group>(null);
  const panelWidth = door.width / 2 - 0.18;
  const panelHeight = door.height - 0.34;

  useFrame((_, delta) => {
    if (frontPanel.current) {
      frontPanel.current.position.x = THREE.MathUtils.damp(frontPanel.current.position.x, -0.62 * openAmount, 5, delta);
    }
    if (backPanel.current) {
      backPanel.current.position.x = THREE.MathUtils.damp(backPanel.current.position.x, 0.18 * openAmount, 5, delta);
    }
  });

  return (
    <group>
      <DoorFrame width={door.width} height={door.height} color={finish} />
      <DoorSurface size={[door.width - 0.24, 0.06, 0.08]} position={[0, door.height / 2 - 0.22, 0.06]} color="#cbd5e1" roughness={0.18} metalness={0.75} radius={0.01} />
      <group ref={backPanel} position={[-panelWidth / 2 + 0.04, 0, -0.02]}>
        <DoorSurface size={[panelWidth, panelHeight, 0.06]} color={finish} roughness={0.2} metalness={0.28} />
        <GlassPanel size={[panelWidth - 0.22, panelHeight - 0.28, 0.03]} position={[0, 0, 0.03]} tint={door.glassTint} />
        <HandleSet x={panelWidth / 2 - 0.15} y={0} z={0.05} />
      </group>
      <group ref={frontPanel} position={[panelWidth / 2 - 0.04, 0, 0.04]}>
        <DoorSurface size={[panelWidth, panelHeight, 0.06]} color={finish} roughness={0.18} metalness={0.32} />
        <GlassPanel size={[panelWidth - 0.22, panelHeight - 0.28, 0.03]} position={[0, 0, 0.03]} tint={door.glassTint} />
        <HandleSet x={-panelWidth / 2 + 0.15} y={0} z={0.05} />
      </group>
    </group>
  );
}

function FrenchDoor({ door, finish, openAmount }: { door: DoorConfig; finish: string; openAmount: number }) {
  const leftLeaf = useRef<THREE.Group>(null);
  const rightLeaf = useRef<THREE.Group>(null);
  const leafWidth = door.width / 2 - 0.13;
  const leafHeight = door.height - 0.34;

  useFrame((_, delta) => {
    if (leftLeaf.current) {
      leftLeaf.current.rotation.y = THREE.MathUtils.damp(leftLeaf.current.rotation.y, 0.42 * openAmount, 5, delta);
    }
    if (rightLeaf.current) {
      rightLeaf.current.rotation.y = THREE.MathUtils.damp(rightLeaf.current.rotation.y, -0.42 * openAmount, 5, delta);
    }
  });

  return (
    <group>
      <DoorFrame width={door.width} height={door.height} color={finish} />
      <group ref={leftLeaf} position={[-door.width / 2 + 0.13, 0, 0.015]}>
        <group position={[leafWidth / 2, 0, 0]}>
          <DoorSurface size={[leafWidth, leafHeight, 0.065]} color={finish} roughness={0.18} metalness={0.32} />
          <GlassPanel size={[leafWidth - 0.2, leafHeight - 0.25, 0.03]} position={[0, 0, 0.03]} tint={door.glassTint} />
          <DoorSurface size={[0.03, leafHeight - 0.24, 0.02]} position={[0, 0, 0.046]} color={finish} roughness={0.24} metalness={0.24} radius={0.008} />
          <DoorSurface size={[leafWidth - 0.18, 0.03, 0.02]} position={[0, 0.48, 0.046]} color={finish} roughness={0.24} metalness={0.24} radius={0.008} />
          <DoorSurface size={[leafWidth - 0.18, 0.03, 0.02]} position={[0, -0.48, 0.046]} color={finish} roughness={0.24} metalness={0.24} radius={0.008} />
          <HandleSet x={leafWidth / 2 - 0.12} mirrored />
        </group>
      </group>
      <group ref={rightLeaf} position={[door.width / 2 - 0.13, 0, 0.015]}>
        <group position={[-leafWidth / 2, 0, 0]}>
          <DoorSurface size={[leafWidth, leafHeight, 0.065]} color={finish} roughness={0.18} metalness={0.32} />
          <GlassPanel size={[leafWidth - 0.2, leafHeight - 0.25, 0.03]} position={[0, 0, 0.03]} tint={door.glassTint} />
          <DoorSurface size={[0.03, leafHeight - 0.24, 0.02]} position={[0, 0, 0.046]} color={finish} roughness={0.24} metalness={0.24} radius={0.008} />
          <DoorSurface size={[leafWidth - 0.18, 0.03, 0.02]} position={[0, 0.48, 0.046]} color={finish} roughness={0.24} metalness={0.24} radius={0.008} />
          <DoorSurface size={[leafWidth - 0.18, 0.03, 0.02]} position={[0, -0.48, 0.046]} color={finish} roughness={0.24} metalness={0.24} radius={0.008} />
          <HandleSet x={-leafWidth / 2 + 0.12} mirrored />
        </group>
      </group>
    </group>
  );
}

function BarnDoor({ door, finish, openAmount }: { door: DoorConfig; finish: string; openAmount: number }) {
  const panel = useRef<THREE.Group>(null);
  const leafHeight = door.height - 0.28;
  const leafWidth = door.width - 0.14;

  useFrame((_, delta) => {
    if (!panel.current) return;
    panel.current.position.x = THREE.MathUtils.damp(panel.current.position.x, 0.72 * openAmount, 5, delta);
  });

  return (
    <group>
      <DoorSurface size={[door.width + 1.1, 0.09, 0.08]} position={[0, door.height / 2 + 0.22, 0.15]} color="#64748b" roughness={0.25} metalness={0.82} radius={0.01} />
      <mesh position={[-(door.width + 0.62) / 2, door.height / 2 + 0.22, 0.15]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 0.08, 20]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.9} roughness={0.14} />
      </mesh>
      <mesh position={[(door.width + 0.62) / 2, door.height / 2 + 0.22, 0.15]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 0.08, 20]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.9} roughness={0.14} />
      </mesh>
      <group ref={panel} position={[0, 0, 0.12]}>
        <DoorSurface size={[leafWidth, leafHeight, 0.09]} color={finish} roughness={0.42} metalness={0.1} />
        <DoorSurface size={[0.12, leafHeight - 0.24, 0.02]} position={[-0.42, 0, 0.058]} color="#e5e7eb" roughness={0.25} metalness={0.8} radius={0.01} />
        <DoorSurface size={[0.12, leafHeight - 0.24, 0.02]} position={[0.42, 0, 0.058]} color="#e5e7eb" roughness={0.25} metalness={0.8} radius={0.01} />
        <DoorSurface size={[leafWidth - 0.34, 0.12, 0.02]} position={[0, 0.86, 0.058]} color="#e5e7eb" roughness={0.25} metalness={0.8} radius={0.01} />
        <DoorSurface size={[leafWidth - 0.34, 0.12, 0.02]} position={[0, -0.86, 0.058]} color="#e5e7eb" roughness={0.25} metalness={0.8} radius={0.01} />
        <HandleSet x={leafWidth / 2 - 0.14} mirrored />
      </group>
    </group>
  );
}

function GlassDoor({ door, finish, openAmount }: { door: DoorConfig; finish: string; openAmount: number }) {
  const pivot = useRef<THREE.Group>(null);
  const leafWidth = door.width - 0.18;
  const leafHeight = door.height - 0.24;

  useFrame((_, delta) => {
    if (!pivot.current) return;
    pivot.current.rotation.y = THREE.MathUtils.damp(pivot.current.rotation.y, -0.6 * openAmount, 5, delta);
  });

  return (
    <group>
      <DoorFrame width={door.width} height={door.height} color={finish} />
      <group ref={pivot} position={[-door.width / 2 + 0.1, 0, 0.015]}>
        <group position={[leafWidth / 2, 0, 0]}>
          <DoorSurface size={[leafWidth, leafHeight, 0.035]} color="#dbeafe" roughness={0.05} metalness={0.24} />
          <GlassPanel size={[leafWidth - 0.12, leafHeight - 0.16, 0.026]} position={[0, 0, 0.014]} tint={door.glassTint} />
          <DoorSurface size={[0.05, leafHeight - 0.12, 0.02]} position={[-leafWidth / 2 + 0.05, 0, 0.022]} color={finish} roughness={0.18} metalness={0.68} radius={0.008} />
          <DoorSurface size={[0.05, leafHeight - 0.12, 0.02]} position={[leafWidth / 2 - 0.05, 0, 0.022]} color={finish} roughness={0.18} metalness={0.68} radius={0.008} />
          <HandleSet x={leafWidth / 2 - 0.1} mirrored />
        </group>
      </group>
    </group>
  );
}

function FoldingDoor({ door, finish, openAmount }: { door: DoorConfig; finish: string; openAmount: number }) {
  const segmentRef0 = useRef<THREE.Group>(null);
  const segmentRef1 = useRef<THREE.Group>(null);
  const segmentRef2 = useRef<THREE.Group>(null);
  const segmentRef3 = useRef<THREE.Group>(null);
  const segments = [segmentRef0, segmentRef1, segmentRef2, segmentRef3];
  const segmentWidth = door.width / 4 - 0.06;
  const segmentHeight = door.height - 0.34;

  useFrame((_, delta) => {
    const targetRotations = [-0.08, -0.34, -0.52, -0.72].map((value) => value * openAmount);
    segments.forEach((segment, index) => {
      if (!segment.current) return;
      segment.current.rotation.y = THREE.MathUtils.damp(segment.current.rotation.y, targetRotations[index], 5, delta);
      segment.current.position.x = THREE.MathUtils.damp(
        segment.current.position.x,
        -door.width / 2 + 0.14 + index * (segmentWidth + 0.05) - openAmount * index * 0.08,
        5,
        delta,
      );
    });
  });

  return (
    <group>
      <DoorFrame width={door.width} height={door.height} color={finish} />
      {segments.map((segment, index) => (
        <group key={index} ref={segment} position={[-door.width / 2 + 0.14 + index * (segmentWidth + 0.05), 0, 0.015]}>
          <group position={[segmentWidth / 2, 0, 0]}>
            <DoorSurface size={[segmentWidth, segmentHeight, 0.055]} color={finish} roughness={0.18} metalness={0.28} />
            <GlassPanel size={[segmentWidth - 0.14, segmentHeight - 0.24, 0.03]} position={[0, 0, 0.03]} tint={door.glassTint} />
            {index === 2 ? <HandleSet x={segmentWidth / 2 - 0.09} mirrored /> : null}
          </group>
        </group>
      ))}
    </group>
  );
}

function WindowFrame({ width, height, color }: { width: number; height: number; color: string }) {
  const side = 0.13;
  const top = 0.13;
  const depth = 0.14;
  const brushedTexture = TEX?.frameBrushed;

  return (
    <group>
      <DoorSurface size={[width, top, depth]} position={[0, height / 2 - top / 2, 0]} color={color} map={brushedTexture} />
      <DoorSurface size={[width, top, depth]} position={[0, -height / 2 + top / 2, 0]} color={color} map={brushedTexture} />
      <DoorSurface size={[side, height, depth]} position={[-width / 2 + side / 2, 0, 0]} color={color} map={brushedTexture} />
      <DoorSurface size={[side, height, depth]} position={[width / 2 - side / 2, 0, 0]} color={color} map={brushedTexture} />
    </group>
  );
}

function PivotDoor({ door, finish, openAmount }: { door: DoorConfig; finish: string; openAmount: number }) {
  const leaf = useRef<THREE.Group>(null);
  const leafWidth = door.width - 0.22;
  const leafHeight = door.height - 0.26;

  useFrame((_, delta) => {
    if (!leaf.current) return;
    leaf.current.rotation.y = THREE.MathUtils.damp(leaf.current.rotation.y, -0.42 * openAmount, 5, delta);
  });

  return (
    <group>
      <DoorFrame width={door.width} height={door.height} color={finish} />
      <group ref={leaf} position={[-door.width / 2 + 0.48, 0, 0.015]}>
        <group position={[leafWidth / 2 - 0.36, 0, 0]}>
          <DoorSurface size={[leafWidth, leafHeight, 0.075]} color={finish} roughness={0.24} metalness={0.18} />
          <GlassPanel size={[leafWidth - 0.34, leafHeight - 0.36, 0.03]} position={[0.08, 0.08, 0.03]} tint={door.glassTint} />
          <DoorSurface size={[0.12, leafHeight - 0.22, 0.02]} position={[-leafWidth / 2 + 0.18, 0, 0.048]} color="#f5f5f4" roughness={0.32} metalness={0.24} radius={0.01} />
          <HandleSet x={leafWidth / 2 - 0.14} mirrored />
        </group>
      </group>
    </group>
  );
}

function PatioDoor({ door, finish, openAmount }: { door: DoorConfig; finish: string; openAmount: number }) {
  const frontPanel = useRef<THREE.Group>(null);
  const rearPanel = useRef<THREE.Group>(null);
  const panelWidth = door.width / 2 - 0.16;
  const panelHeight = door.height - 0.28;

  useFrame((_, delta) => {
    if (frontPanel.current) {
      frontPanel.current.position.x = THREE.MathUtils.damp(frontPanel.current.position.x, -0.55 * openAmount, 5, delta);
    }
    if (rearPanel.current) {
      rearPanel.current.position.x = THREE.MathUtils.damp(rearPanel.current.position.x, 0.12 * openAmount, 5, delta);
    }
  });

  return (
    <group>
      <DoorFrame width={door.width} height={door.height} color={finish} />
      <group ref={rearPanel} position={[-panelWidth / 2 + 0.04, 0, -0.02]}>
        <DoorSurface size={[panelWidth, panelHeight, 0.05]} color={finish} roughness={0.18} metalness={0.18} />
        <GlassPanel size={[panelWidth - 0.18, panelHeight - 0.22, 0.03]} position={[0, 0, 0.025]} tint={door.glassTint} />
      </group>
      <group ref={frontPanel} position={[panelWidth / 2 - 0.04, 0, 0.04]}>
        <DoorSurface size={[panelWidth, panelHeight, 0.05]} color={finish} roughness={0.16} metalness={0.2} />
        <GlassPanel size={[panelWidth - 0.18, panelHeight - 0.22, 0.03]} position={[0, 0, 0.025]} tint={door.glassTint} />
        <HandleSet x={-panelWidth / 2 + 0.12} y={0} z={0.04} />
      </group>
    </group>
  );
}

function CasementWindow({ door, finish, openAmount }: { door: DoorConfig; finish: string; openAmount: number }) {
  const leftLeaf = useRef<THREE.Group>(null);
  const rightLeaf = useRef<THREE.Group>(null);
  const leafWidth = door.width / 2 - 0.11;
  const leafHeight = door.height - 0.2;

  useFrame((_, delta) => {
    if (leftLeaf.current) {
      leftLeaf.current.rotation.y = THREE.MathUtils.damp(leftLeaf.current.rotation.y, 0.24 * openAmount, 5, delta);
    }
    if (rightLeaf.current) {
      rightLeaf.current.rotation.y = THREE.MathUtils.damp(rightLeaf.current.rotation.y, -0.24 * openAmount, 5, delta);
    }
  });

  return (
    <group>
      <WindowFrame width={door.width} height={door.height} color={finish} />
      <group ref={leftLeaf} position={[-door.width / 2 + 0.11, 0, 0.01]}>
        <group position={[leafWidth / 2, 0, 0]}>
          <DoorSurface size={[leafWidth, leafHeight, 0.04]} color={finish} roughness={0.18} metalness={0.16} />
          <GlassPanel size={[leafWidth - 0.14, leafHeight - 0.16, 0.024]} position={[0, 0, 0.02]} tint={door.glassTint} />
        </group>
      </group>
      <group ref={rightLeaf} position={[door.width / 2 - 0.11, 0, 0.01]}>
        <group position={[-leafWidth / 2, 0, 0]}>
          <DoorSurface size={[leafWidth, leafHeight, 0.04]} color={finish} roughness={0.18} metalness={0.16} />
          <GlassPanel size={[leafWidth - 0.14, leafHeight - 0.16, 0.024]} position={[0, 0, 0.02]} tint={door.glassTint} />
        </group>
      </group>
      <DoorSurface size={[0.025, door.height - 0.14, 0.02]} position={[0, 0, 0.03]} color={finish} roughness={0.2} metalness={0.14} radius={0.008} />
    </group>
  );
}

function SlidingWindow({ door, finish, openAmount }: { door: DoorConfig; finish: string; openAmount: number }) {
  const frontLeaf = useRef<THREE.Group>(null);
  const panelWidth = door.width / 2 - 0.13;
  const panelHeight = door.height - 0.18;

  useFrame((_, delta) => {
    if (!frontLeaf.current) return;
    frontLeaf.current.position.x = THREE.MathUtils.damp(frontLeaf.current.position.x, -0.28 * openAmount, 5, delta);
  });

  return (
    <group>
      <WindowFrame width={door.width} height={door.height} color={finish} />
      <group position={[-panelWidth / 2 + 0.03, 0, -0.01]}>
        <DoorSurface size={[panelWidth, panelHeight, 0.036]} color={finish} roughness={0.18} metalness={0.16} />
        <GlassPanel size={[panelWidth - 0.12, panelHeight - 0.14, 0.022]} position={[0, 0, 0.018]} tint={door.glassTint} />
      </group>
      <group ref={frontLeaf} position={[panelWidth / 2 - 0.03, 0, 0.03]}>
        <DoorSurface size={[panelWidth, panelHeight, 0.036]} color={finish} roughness={0.16} metalness={0.18} />
        <GlassPanel size={[panelWidth - 0.12, panelHeight - 0.14, 0.022]} position={[0, 0, 0.018]} tint={door.glassTint} />
      </group>
    </group>
  );
}

function FixedWindow({ door, finish }: { door: DoorConfig; finish: string }) {
  return (
    <group>
      <WindowFrame width={door.width} height={door.height} color={finish} />
      <GlassPanel size={[door.width - 0.22, door.height - 0.2, 0.024]} position={[0, 0, 0.018]} tint={door.glassTint} />
      <DoorSurface size={[0.024, door.height - 0.16, 0.02]} position={[0, 0, 0.026]} color={finish} roughness={0.16} metalness={0.14} radius={0.006} />
      <DoorSurface size={[door.width - 0.16, 0.024, 0.02]} position={[0, 0, 0.026]} color={finish} roughness={0.16} metalness={0.14} radius={0.006} />
    </group>
  );
}

function AwningWindow({ door, finish, openAmount }: { door: DoorConfig; finish: string; openAmount: number }) {
  const sash = useRef<THREE.Group>(null);
  const sashWidth = door.width - 0.16;
  const sashHeight = door.height - 0.16;

  useFrame((_, delta) => {
    if (!sash.current) return;
    sash.current.rotation.x = THREE.MathUtils.damp(sash.current.rotation.x, 0.28 * openAmount, 5, delta);
  });

  return (
    <group>
      <WindowFrame width={door.width} height={door.height} color={finish} />
      <group ref={sash} position={[0, door.height / 2 - 0.08, 0.01]}>
        <group position={[0, -sashHeight / 2, 0]}>
          <DoorSurface size={[sashWidth, sashHeight, 0.038]} color={finish} roughness={0.16} metalness={0.16} />
          <GlassPanel size={[sashWidth - 0.12, sashHeight - 0.12, 0.022]} position={[0, 0, 0.018]} tint={door.glassTint} />
        </group>
      </group>
    </group>
  );
}

function DoorModel({ door, frameColor, activeAmount }: { door: DoorConfig; frameColor: string; activeAmount: number }) {
  const finish = frameColor || door.frame;

  switch (door.type) {
    case "pivot":
      return <PivotDoor door={door} finish={finish} openAmount={activeAmount} />;
    case "patio":
      return <PatioDoor door={door} finish={finish} openAmount={activeAmount} />;
    case "sliding":
      return <SlidingDoor door={door} finish={finish} openAmount={activeAmount} />;
    case "french":
      return <FrenchDoor door={door} finish={finish} openAmount={activeAmount} />;
    case "barn":
      return <BarnDoor door={door} finish={finish} openAmount={activeAmount} />;
    case "glass":
      return <GlassDoor door={door} finish={finish} openAmount={activeAmount} />;
    case "folding":
      return <FoldingDoor door={door} finish={finish} openAmount={activeAmount} />;
    case "casement-window":
      return <CasementWindow door={door} finish={finish} openAmount={activeAmount} />;
    case "sliding-window":
      return <SlidingWindow door={door} finish={finish} openAmount={activeAmount} />;
    case "fixed-window":
      return <FixedWindow door={door} finish={finish} />;
    case "awning-window":
      return <AwningWindow door={door} finish={finish} openAmount={activeAmount} />;
    default:
      return <SolidDoor door={door} finish={finish} openAmount={activeAmount} />;
  }
}

// ─── MARBLE TILE TEXTURE ───────────────────────────────────────────────────
function createMarbleTexture(w: number, h: number) {
  const data = new Uint8Array(w * h * 4);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const nx = x / w, ny = y / h;
      // Veining via layered sine
      const vein =
        Math.sin((nx * 18 + ny * 6) * Math.PI) * 0.5 +
        Math.sin((nx * 5 - ny * 14) * Math.PI) * 0.25 +
        Math.sin((nx * 30 + ny * 2) * Math.PI) * 0.12;
      const base = 0.88 + vein * 0.06;
      const r = Math.min(255, Math.round(base * 248));
      const g = Math.min(255, Math.round(base * 244));
      const b = Math.min(255, Math.round(base * 238));
      data[i] = r; data[i + 1] = g; data[i + 2] = b; data[i + 3] = 255;
    }
  }
  const tex = new THREE.DataTexture(data, w, h, THREE.RGBAFormat);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(3, 3);
  tex.anisotropy = 16;
  tex.needsUpdate = true;
  return tex;
}

// ─── WALL PANEL TEXTURE (fine stucco) ──────────────────────────────────────
function createStuccoTexture(w: number, h: number) {
  const data = new Uint8Array(w * h * 4);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const noise =
        Math.sin(x * 0.8 + y * 0.3) * 0.03 +
        Math.sin(x * 2.1 - y * 1.4) * 0.015 +
        Math.sin(x * 0.15 + y * 0.9) * 0.02;
      const v = Math.round((0.97 + noise) * 250);
      data[i] = v; data[i + 1] = v - 2; data[i + 2] = v - 5; data[i + 3] = 255;
    }
  }
  const tex = new THREE.DataTexture(data, w, h, THREE.RGBAFormat);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 4);
  tex.anisotropy = 8;
  tex.needsUpdate = true;
  return tex;
}

// ─── SHOWROOM BAY — Ultra Premium European Gallery ──────────────────────────
function ShowroomBay({
  door,
  positionX,
  frameColor,
  activeAmount,
}: {
  door: DoorConfig;
  positionX: number;
  frameColor: string;
  activeAmount: number;
}) {
  const bay = useRef<THREE.Group>(null);
  const spotRef = useRef<THREE.SpotLight>(null);

  const stuccoTex  = TEX?.stucco;
  const marbleTex  = TEX?.marble;
  const goldTrimTex = TEX?.goldTrim;

  useFrame((state, delta) => {
    if (!bay.current) return;
    // Subtle breathing float
    bay.current.position.y = THREE.MathUtils.damp(
      bay.current.position.y,
      Math.sin(state.clock.elapsedTime * 0.4 + positionX * 0.5) * 0.008,
      3, delta,
    );
    // Slight turn toward camera when active
    bay.current.rotation.y = THREE.MathUtils.damp(
      bay.current.rotation.y, activeAmount * 0.04, 5, delta,
    );
    // Scale up when active
    const s = 0.96 + activeAmount * 0.04;
    bay.current.scale.setScalar(THREE.MathUtils.damp(bay.current.scale.x, s, 5, delta));

    // Spotlight intensity follows active state
    if (spotRef.current) {
      spotRef.current.intensity = THREE.MathUtils.damp(
        spotRef.current.intensity, 0.6 + activeAmount * 2.2, 4, delta,
      );
    }
  });

  const sideW = Math.max(1.0, (5.6 - door.width) / 2);
  const totalW = door.width + sideW * 2;
  const wallH = door.height + 1.8;
  const wallDepth = 0.28;

  return (
    <group ref={bay} position={[positionX, 0, 0]}>

      {/* ── Dedicated spotlight per bay ── */}
      <spotLight
        ref={spotRef}
        position={[0, door.height + 2.2, 2.8]}
        target-position={[0, 0, 0]}
        angle={0.22}
        penumbra={0.7}
        intensity={0.6}
        color="#fff8f0"
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
      />

      {/* ── Back wall — fine stucco plaster ── */}
      <mesh position={[0, wallH / 2 - 1.72, -0.62]} receiveShadow>
        <planeGeometry args={[totalW + 0.6, wallH + 0.4]} />
        <meshStandardMaterial
          map={stuccoTex}
          color="#f5f0e8"
          roughness={0.92}
          metalness={0}
        />
      </mesh>

      {/* ── Architectural wainscoting panel (lower third) ── */}
      <DoorSurface
        size={[totalW + 0.4, 1.4, 0.06]}
        position={[0, -door.height / 2 + 0.0, -0.55]}
        color="#ede6d8"
        roughness={0.85}
        metalness={0}
        radius={0.01}
      />

      {/* ── Gold chair-rail trim ── */}
      <DoorSurface
        size={[totalW + 0.5, 0.055, 0.09]}
        position={[0, -door.height / 2 + 0.72, -0.52]}
        color="#c9a84c"
        roughness={0.18}
        metalness={0.9}
        radius={0.01}
        map={goldTrimTex}
      />

      {/* ── Cornice (top trim) ── */}
      <DoorSurface
        size={[totalW + 0.5, 0.08, 0.14]}
        position={[0, door.height / 2 + 0.78, -0.48]}
        color="#c9a84c"
        roughness={0.18}
        metalness={0.9}
        radius={0.01}
        map={goldTrimTex}
      />

      {/* ── Left pilaster ── */}
      <group position={[-door.width / 2 - sideW / 2, 0, -0.12]}>
        {/* Main pilaster body */}
        <DoorSurface
          size={[sideW, wallH, wallDepth]}
          position={[0, wallH / 2 - 1.72, 0]}
          color="#f0ebe0"
          roughness={0.88}
          metalness={0}
        />
        {/* Pilaster flute detail */}
        {[-0.18, 0, 0.18].map((ox, fi) => (
          <DoorSurface
            key={fi}
            size={[0.04, wallH - 0.5, 0.02]}
            position={[ox, wallH / 2 - 1.72, wallDepth / 2 + 0.005]}
            color="#e8e0d0"
            roughness={0.9}
            metalness={0}
            radius={0.01}
          />
        ))}
        {/* Capital */}
        <DoorSurface
          size={[sideW + 0.06, 0.18, wallDepth + 0.06]}
          position={[0, door.height / 2 + 0.62, 0]}
          color="#e8dfc8"
          roughness={0.7}
          metalness={0.05}
          radius={0.02}
        />
        {/* Base */}
        <DoorSurface
          size={[sideW + 0.06, 0.18, wallDepth + 0.06]}
          position={[0, -door.height / 2 - 0.62, 0]}
          color="#e8dfc8"
          roughness={0.7}
          metalness={0.05}
          radius={0.02}
        />
      </group>

      {/* ── Right pilaster ── */}
      <group position={[door.width / 2 + sideW / 2, 0, -0.12]}>
        <DoorSurface
          size={[sideW, wallH, wallDepth]}
          position={[0, wallH / 2 - 1.72, 0]}
          color="#f0ebe0"
          roughness={0.88}
          metalness={0}
        />
        {[-0.18, 0, 0.18].map((ox, fi) => (
          <DoorSurface
            key={fi}
            size={[0.04, wallH - 0.5, 0.02]}
            position={[ox, wallH / 2 - 1.72, wallDepth / 2 + 0.005]}
            color="#e8e0d0"
            roughness={0.9}
            metalness={0}
            radius={0.01}
          />
        ))}
        <DoorSurface
          size={[sideW + 0.06, 0.18, wallDepth + 0.06]}
          position={[0, door.height / 2 + 0.62, 0]}
          color="#e8dfc8"
          roughness={0.7}
          metalness={0.05}
          radius={0.02}
        />
        <DoorSurface
          size={[sideW + 0.06, 0.18, wallDepth + 0.06]}
          position={[0, -door.height / 2 - 0.62, 0]}
          color="#e8dfc8"
          roughness={0.7}
          metalness={0.05}
          radius={0.02}
        />
      </group>

      {/* ── Arched header above door ── */}
      <DoorSurface
        size={[door.width + 0.12, 0.55, wallDepth]}
        position={[0, door.height / 2 + 0.28, -0.12]}
        color="#ede6d8"
        roughness={0.88}
        metalness={0}
        radius={0.04}
      />
      {/* Gold arch trim */}
      <DoorSurface
        size={[door.width + 0.18, 0.06, 0.06]}
        position={[0, door.height / 2 + 0.02, -0.08]}
        color="#c9a84c"
        roughness={0.18}
        metalness={0.9}
        radius={0.01}
        map={goldTrimTex}
      />

      {/* ── Threshold / step ── */}
      <DoorSurface
        size={[door.width + 0.3, 0.12, 0.55]}
        position={[0, -door.height / 2 - 0.06, 0.18]}
        color="#d8d0c0"
        roughness={0.6}
        metalness={0.1}
        radius={0.02}
        map={marbleTex}
      />

      {/* ── Marble floor tile in front of door ── */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -door.height / 2 - 0.12, 1.2]}
        receiveShadow
      >
        <planeGeometry args={[door.width + 1.2, 3.5]} />
        <meshStandardMaterial
          map={marbleTex}
          color="#f8f4ee"
          roughness={0.08}
          metalness={0.06}
          envMapIntensity={0.5}
        />
      </mesh>

      {/* ── Gold inlay lines on floor ── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -door.height / 2 - 0.115, 1.2]}>
        <planeGeometry args={[door.width + 1.22, 0.04]} />
        <meshStandardMaterial color="#c9a84c" roughness={0.15} metalness={0.95} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -door.height / 2 - 0.115, 2.8]}>
        <planeGeometry args={[door.width + 1.22, 0.04]} />
        <meshStandardMaterial color="#c9a84c" roughness={0.15} metalness={0.95} />
      </mesh>

      {/* ── Product name plaque ── */}
      <group position={[0, -door.height / 2 - 0.55, 0.05]}>
        <DoorSurface
          size={[door.width * 0.55, 0.22, 0.04]}
          position={[0, 0, 0]}
          color="#1a1208"
          roughness={0.2}
          metalness={0.6}
          radius={0.02}
        />
        {/* Gold border on plaque */}
        <DoorSurface
          size={[door.width * 0.55 + 0.04, 0.26, 0.02]}
          position={[0, 0, -0.01]}
          color="#c9a84c"
          roughness={0.15}
          metalness={0.9}
          radius={0.02}
        />
      </group>

      {/* ── Recessed ceiling cove light strip ── */}
      <mesh position={[0, door.height / 2 + 1.05, -0.3]}>
        <boxGeometry args={[door.width + 0.6, 0.04, 0.04]} />
        <meshStandardMaterial
          color="#fffbe8"
          emissive="#fffbe8"
          emissiveIntensity={activeAmount * 2.2 + 0.5}
        />
      </mesh>

      {/* ── The door/window model ── */}
      <DoorModel door={door} frameColor={frameColor} activeAmount={activeAmount} />
    </group>
  );
}

// ─── GRAND MARBLE FLOOR (full showroom) ────────────────────────────────────
function GrandFloor({ marbleTex }: { marbleTex: THREE.Texture | undefined }) {
  return (
    <>
      {/* Main polished marble floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.72, 0]} receiveShadow>
        <planeGeometry args={[200, 30]} />
        <meshStandardMaterial
          map={marbleTex}
          color="#f9f5ee"
          roughness={0.06}
          metalness={0.08}
          envMapIntensity={0.6}
        />
      </mesh>
      {/* Dark inlay border strip */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.715, 0]}>
        <planeGeometry args={[200, 0.12]} />
        <meshStandardMaterial color="#2a1f14" roughness={0.3} metalness={0.2} />
      </mesh>
    </>
  );
}

// ─── CONTINUOUS CEILING ─────────────────────────────────────────────────────
function ShowroomCeiling({ totalWidth }: { totalWidth: number }) {
  return (
    <group>
      {/* Main ceiling plane */}
      <mesh position={[0, 5.8, -1]} receiveShadow>
        <planeGeometry args={[totalWidth + 20, 18]} />
        <meshStandardMaterial color="#f8f4ec" roughness={0.95} metalness={0} />
      </mesh>
      {/* Ceiling cove — warm glow strip */}
      <mesh position={[0, 5.6, -0.5]}>
        <boxGeometry args={[totalWidth + 18, 0.06, 0.06]} />
        <meshStandardMaterial color="#fff8e8" emissive="#fff8e8" emissiveIntensity={1.2} />
      </mesh>
      {/* Ceiling beam / coffer edge */}
      <mesh position={[0, 5.75, -0.5]}>
        <boxGeometry args={[totalWidth + 18, 0.12, 0.12]} />
        <meshStandardMaterial color="#e8dfc8" roughness={0.7} metalness={0.05} />
      </mesh>
    </group>
  );
}

// ─── CONTINUOUS BACK WALL ────────────────────────────────────────────────────
function ShowroomBackWall({ totalWidth, stuccoTex }: { totalWidth: number; stuccoTex: THREE.Texture | undefined }) {
  return (
    <group>
      {/* Main back wall */}
      <mesh position={[0, 2.0, -1.2]} receiveShadow>
        <planeGeometry args={[totalWidth + 20, 16]} />
        <meshStandardMaterial map={stuccoTex} color="#f2ece0" roughness={0.9} metalness={0} />
      </mesh>
      {/* Continuous gold dado rail */}
      <mesh position={[0, -0.3, -1.1]}>
        <boxGeometry args={[totalWidth + 20, 0.07, 0.1]} />
        <meshStandardMaterial color="#c9a84c" roughness={0.15} metalness={0.95} />
      </mesh>
      {/* Continuous skirting */}
      <mesh position={[0, -1.65, -1.0]}>
        <boxGeometry args={[totalWidth + 20, 0.14, 0.18]} />
        <meshStandardMaterial color="#d8d0be" roughness={0.6} metalness={0.1} />
      </mesh>
    </group>
  );
}

// ─── SHOWROOM SCENE — 8K Cinematic Grand Gallery ────────────────────────────
function ShowroomScene({
  progress,
  activeIndex,
  frameColor,
}: {
  progress: number;
  activeIndex: number;
  frameColor: string;
}) {
  const rig = useRef<THREE.Group>(null);
  const travel = progress * (DOOR_TYPES.length - 1);

  const xPositions = useMemo(
    () => DOOR_TYPES.map((_, i) => (i - (DOOR_TYPES.length - 1) / 2) * 6.2),
    [],
  );

  const totalWidth = useMemo(
    () => (DOOR_TYPES.length - 1) * 6.2 + 8,
    [],
  );

  useFrame((state, delta) => {
    const base = Math.floor(travel);
    const next = Math.min(base + 1, xPositions.length - 1);
    const seg  = travel - base;
    const tx   = THREE.MathUtils.lerp(xPositions[base], xPositions[next], seg);

    // Cinematic camera — slightly lower, closer, tighter FOV
    state.camera.position.x = THREE.MathUtils.damp(
      state.camera.position.x, tx + state.pointer.x * 0.18, 5, delta,
    );
    state.camera.position.y = THREE.MathUtils.damp(
      state.camera.position.y, 0.35 + state.pointer.y * 0.08, 5, delta,
    );
    state.camera.position.z = THREE.MathUtils.damp(
      state.camera.position.z, 7.8, 5, delta,
    );
    state.camera.lookAt(tx, 0.4, 0);

    if (rig.current) {
      rig.current.rotation.y = THREE.MathUtils.damp(
        rig.current.rotation.y, state.pointer.x * 0.012, 4, delta,
      );
    }
  });

  return (
    <>
      {/* ── Sky / background ── */}
      <color attach="background" args={["#f5f0e6"]} />
      <fog attach="fog" args={["#f5f0e6", 32, 65]} />

      {/* ── Camera ── */}
      <PerspectiveCamera makeDefault position={[xPositions[activeIndex], 0.35, 7.8]} fov={28} />

      {/* ── Lighting ── */}
      {/* Warm ambient fill */}
      <ambientLight intensity={0.55} color="#fff8f0" />

      {/* Key directional — warm afternoon sun angle */}
      <directionalLight
        position={[12, 14, 10]}
        intensity={1.4}
        color="#fffdf5"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={80}
        shadow-camera-left={-40}
        shadow-camera-right={40}
        shadow-camera-top={20}
        shadow-camera-bottom={-10}
        shadow-bias={-0.0003}
      />

      {/* Fill from opposite side */}
      <directionalLight
        position={[-10, 8, 6]}
        intensity={0.35}
        color="#e8f4ff"
      />

      {/* Hemisphere — sky/ground bounce */}
      <hemisphereLight intensity={0.45} color="#fff8ee" groundColor="#d4c8b0" />

      {/* Gallery overhead track lights — NO castShadow to stay under texture unit limit */}
      {xPositions.map((x, i) => (
        <spotLight
          key={i}
          position={[x, 5.2, 1.5]}
          target-position={[x, 0, 0]}
          angle={0.2}
          penumbra={0.65}
          intensity={Math.abs(travel - i) < 1.5 ? 2.8 : 0.6}
          color="#fff8f0"
          castShadow={false}
        />
      ))}

      {/* Accent rim light from behind */}
      <pointLight position={[0, 3, -3]} intensity={0.3} color="#ffe8c8" />

      {/* ── Environment geometry ── */}
      <group ref={rig}>
        {/* Shared floor */}
        <GrandFloor marbleTex={TEX?.marble} />

        {/* Shared ceiling */}
        <ShowroomCeiling totalWidth={totalWidth} />

        {/* Shared back wall */}
        <ShowroomBackWall totalWidth={totalWidth} stuccoTex={TEX?.stucco} />

        {/* Continuous floor inlay grid lines */}
        {xPositions.map((x, i) => (
          <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[x, -1.71, 1.5]}>
            <planeGeometry args={[0.04, 5]} />
            <meshStandardMaterial color="#c9a84c" roughness={0.2} metalness={0.8} />
          </mesh>
        ))}

        {/* Door bays */}
        {DOOR_TYPES.map((door, index) => {
          const distance = Math.abs(travel - index);
          const activeAmount = THREE.MathUtils.clamp(1 - distance, 0, 1);
          return (
            <ShowroomBay
              key={door.id}
              door={door}
              positionX={xPositions[index]}
              frameColor={frameColor}
              activeAmount={activeAmount}
            />
          );
        })}
      </group>

      {/* ── Contact shadows ── */}
      <ContactShadows
        position={[0, -1.69, 0]}
        scale={22}
        blur={2.2}
        opacity={0.28}
        far={10}
        resolution={512}
      />
    </>
  );
}

export default function UPVC3DViewer() {
  const sectionRef = useRef<HTMLElement>(null);
  const [frameColor, setFrameColor] = useState("");
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.7,
  });

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (!isMobile) {
      setProgress(latest);
    }
  });

  useEffect(() => {
    if (isMobile) {
      setProgress(mobileActiveIndex / (DOOR_TYPES.length - 1));
    }
  }, [mobileActiveIndex, isMobile]);

  const activeIndex = isMobile
    ? mobileActiveIndex
    : Math.min(DOOR_TYPES.length - 1, Math.max(0, Math.round(progress * (DOOR_TYPES.length - 1))));
  const activeDoor = DOOR_TYPES[activeIndex];

  return (
    <section ref={sectionRef} className={cn("relative z-30 w-full overflow-clip bg-[#f5f0e8]", isMobile ? "py-12" : "lg:h-[320vh] h-auto")}>
      <div className="relative h-full">
        <div className="lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden relative h-auto flex flex-col justify-center">

          {/* Clean warm background — no green tints */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(180deg, #faf6ee 0%, #f5f0e6 55%, #ede5d5 100%)" }}
          />
          <div className="absolute inset-x-0 top-0 h-28 pointer-events-none z-10"
            style={{ background: "linear-gradient(to bottom, rgba(250,246,238,0.9), transparent)" }}
          />
          <div className="absolute inset-x-0 bottom-0 h-40 pointer-events-none z-10 hidden lg:block"
            style={{ background: "linear-gradient(to top, #ede5d5, transparent)" }}
          />

          {/* Canvas */}
          <div className={cn(
            isMobile
              ? "relative w-full h-[45vh] min-h-[360px] z-10 px-4 pt-4"
              : "absolute inset-0 z-10"
          )}>
            <div className={cn(isMobile ? "w-full h-full rounded-[2rem] overflow-hidden border border-[#ddd5c5] bg-[#f5f0e8] shadow-inner relative" : "w-full h-full")}>
              <Canvas
                shadows={{ type: THREE.PCFSoftShadowMap }}
                dpr={[1, 2]}
                performance={{ min: 0.8 }}
                gl={{
                  antialias: true,
                  alpha: false,
                  powerPreference: "high-performance",
                  logarithmicDepthBuffer: true,
                }}
                onCreated={({ gl }) => {
                  gl.toneMapping = THREE.ACESFilmicToneMapping;
                  gl.toneMappingExposure = 1.18;
                  gl.shadowMap.enabled = true;
                  gl.shadowMap.type = THREE.PCFSoftShadowMap;
                }}
              >
                <ShowroomScene progress={progress} activeIndex={activeIndex} frameColor={frameColor} />
              </Canvas>
              {isMobile && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#1a1208]/80 backdrop-blur-md px-4 py-2 rounded-full text-white text-[9px] font-bold uppercase tracking-[0.22em] pointer-events-none flex items-center gap-2 shadow-lg">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#c9a84c] animate-ping" />
                  Drag to rotate
                </div>
              )}
            </div>
          </div>

          {/* ═══ DESKTOP UI OVERLAYS ═══ */}
          <div className="hidden lg:block pointer-events-none absolute inset-0 z-20">
            <div className="mx-auto flex h-full w-full max-w-[1600px] flex-col justify-between px-14 py-12">

              {/* TOP ROW */}
              <div className="flex items-start justify-between">

                {/* TOP-LEFT — Title card: solid neomorphic */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9 }}
                  className="max-w-[380px]"
                  style={{
                    background: "#faf6ee",
                    borderRadius: "1.75rem",
                    padding: "1.5rem 1.75rem",
                    boxShadow: "8px 8px 24px rgba(180,160,120,0.18), -4px -4px 14px rgba(255,255,255,0.85)",
                    border: "1px solid rgba(210,195,165,0.4)",
                  }}
                >
                  <div className="mb-3 flex items-center gap-3">
                    <div style={{ width: 28, height: 1, background: "#c9a84c" }} />
                    <span style={{ fontSize: 9, fontWeight: 900, letterSpacing: "0.42em", textTransform: "uppercase", color: "#8a6e3a" }}>
                      UPVC Product Studio
                    </span>
                  </div>
                  <h2 style={{ fontSize: "clamp(1.6rem,2.8vw,2.6rem)", fontWeight: 900, lineHeight: 0.95, letterSpacing: "-0.04em", color: "#1a1208" }}>
                    Premium UPVC<br />Doors & Windows
                  </h2>
                  <p style={{ marginTop: "0.75rem", fontSize: 11, lineHeight: 1.7, color: "#6b5c3e" }}>
                    Explore our complete architectural UPVC collection in a high-fidelity 3D showroom.
                  </p>
                </motion.div>

                {/* TOP-RIGHT — Finish selector: solid neomorphic */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.1 }}
                  className="pointer-events-auto w-[300px]"
                  style={{
                    background: "#faf6ee",
                    borderRadius: "1.75rem",
                    padding: "1.25rem 1.5rem",
                    boxShadow: "8px 8px 24px rgba(180,160,120,0.18), -4px -4px 14px rgba(255,255,255,0.85)",
                    border: "1px solid rgba(210,195,165,0.4)",
                  }}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span style={{ fontSize: 9, fontWeight: 900, letterSpacing: "0.32em", textTransform: "uppercase", color: "#8a6e3a" }}>
                      Frame Finish
                    </span>
                    <span style={{
                      fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase",
                      color: "#6b5c3e",
                      background: "#f0e8d8",
                      borderRadius: 999,
                      padding: "2px 10px",
                      border: "1px solid rgba(180,155,110,0.25)",
                    }}>
                      {activeIndex + 1} / {DOOR_TYPES.length}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {FINISHES.map((finish) => {
                      const isActive = frameColor === finish.color;
                      return (
                        <button
                          key={finish.name}
                          onClick={() => setFrameColor(finish.color)}
                          style={{
                            display: "flex", alignItems: "center", gap: 8,
                            padding: "8px 10px",
                            borderRadius: "0.875rem",
                            border: isActive ? "1.5px solid #c9a84c" : "1px solid rgba(200,185,155,0.35)",
                            background: isActive
                              ? "#f0e8d8"
                              : "#faf6ee",
                            boxShadow: isActive
                              ? "inset 2px 2px 6px rgba(180,155,110,0.15), inset -2px -2px 6px rgba(255,255,255,0.7)"
                              : "3px 3px 8px rgba(180,160,120,0.12), -2px -2px 6px rgba(255,255,255,0.8)",
                            cursor: "pointer",
                            transition: "all 0.25s ease",
                          }}
                        >
                          <span style={{
                            width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                            background: finish.color || "linear-gradient(135deg,#334155,#64748b)",
                            border: "1px solid rgba(0,0,0,0.08)",
                            boxShadow: "inset 0 1px 3px rgba(0,0,0,0.12)",
                          }} />
                          <span>
                            <span style={{ display: "block", fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1a1208" }}>
                              {finish.name}
                            </span>
                            <span style={{ display: "block", fontSize: 8, color: "#8a7a5e" }}>Premium</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              </div>

              {/* BOTTOM ROW */}
              <div className="flex items-end justify-between">

                {/* BOTTOM-LEFT — Active product info: solid neomorphic */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.15 }}
                  className="pointer-events-auto w-full max-w-[400px]"
                  style={{
                    background: "#faf6ee",
                    borderRadius: "1.75rem",
                    padding: "1.25rem 1.5rem",
                    boxShadow: "8px 8px 24px rgba(180,160,120,0.18), -4px -4px 14px rgba(255,255,255,0.85)",
                    border: "1px solid rgba(210,195,165,0.4)",
                  }}
                >
                  <div className="mb-3 flex items-center gap-2">
                    <Sparkles size={12} style={{ color: "#c9a84c" }} />
                    <span style={{ fontSize: 9, fontWeight: 900, letterSpacing: "0.32em", textTransform: "uppercase", color: "#8a7a5e" }}>
                      Active Product
                    </span>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeDoor.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.28 }}
                    >
                      <p style={{ fontSize: 9, fontWeight: 900, letterSpacing: "0.28em", textTransform: "uppercase", color: "#8a6e3a" }}>
                        {activeDoor.category}
                      </p>
                      <h3 style={{ marginTop: 4, fontSize: "1.2rem", fontWeight: 900, letterSpacing: "-0.02em", textTransform: "uppercase", color: "#1a1208" }}>
                        {activeDoor.name}
                      </h3>
                      <p style={{ marginTop: 6, fontSize: 11, lineHeight: 1.65, color: "#6b5c3e" }}>
                        {activeDoor.desc}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>

                {/* BOTTOM-RIGHT — Scroll track: solid neomorphic */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.2 }}
                  className="pointer-events-none w-[340px]"
                  style={{
                    background: "#faf6ee",
                    borderRadius: "1.75rem",
                    padding: "1rem 1.25rem",
                    boxShadow: "8px 8px 24px rgba(180,160,120,0.18), -4px -4px 14px rgba(255,255,255,0.85)",
                    border: "1px solid rgba(210,195,165,0.4)",
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5">
                      <ArrowDown size={10} style={{ color: "#c9a84c" }} className="animate-bounce" />
                      <span style={{ fontSize: 9, fontWeight: 900, letterSpacing: "0.3em", textTransform: "uppercase", color: "#8a7a5e" }}>
                        Scroll to Explore
                      </span>
                    </div>
                    <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#b0a080" }}>
                      Product Track
                    </span>
                  </div>

                  {/* Progress bar — gold */}
                  <div style={{ height: 4, borderRadius: 999, background: "#e8dece", overflow: "hidden", marginBottom: 10,
                    boxShadow: "inset 1px 1px 3px rgba(180,155,110,0.2)" }}>
                    <motion.div
                      style={{
                        height: "100%", borderRadius: 999,
                        background: "linear-gradient(90deg, #c9a84c, #e8c96a, #c9a84c)",
                        width: `${Math.max(progress * 100, 5)}%`,
                      }}
                    />
                  </div>

                  {/* Dot indicators */}
                  <div className="flex items-center justify-between">
                    {DOOR_TYPES.slice(0, 8).map((door, index) => (
                      <div key={door.id} className="flex flex-col items-center gap-1">
                        <div style={{
                          width: index === activeIndex ? 10 : 6,
                          height: index === activeIndex ? 10 : 6,
                          borderRadius: 999,
                          background: index === activeIndex ? "#c9a84c" : "#d8cdb8",
                          border: index === activeIndex ? "1.5px solid #a8883a" : "1px solid #c8baa0",
                          boxShadow: index === activeIndex ? "0 0 8px rgba(201,168,76,0.5)" : "none",
                          transition: "all 0.3s ease",
                        }} />
                        <span style={{ fontSize: 7, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#a09070", maxWidth: 36, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {door.name.split(" ")[0]}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* ═══ MOBILE UI ═══ */}
          {isMobile && (
            <div className="relative z-20 px-4 pb-8 pt-4 flex flex-col gap-4 w-full">

              {/* Header card */}
              <div style={{
                background: "#faf6ee", borderRadius: "1.5rem", padding: "1.25rem 1.5rem",
                boxShadow: "6px 6px 18px rgba(180,160,120,0.16), -3px -3px 10px rgba(255,255,255,0.85)",
                border: "1px solid rgba(210,195,165,0.4)",
              }}>
                <div className="flex items-center gap-2 mb-2">
                  <div style={{ width: 20, height: 1, background: "#c9a84c" }} />
                  <span style={{ fontSize: 9, fontWeight: 900, letterSpacing: "0.38em", textTransform: "uppercase", color: "#8a6e3a" }}>
                    UPVC Product Studio
                  </span>
                </div>
                <h2 style={{ fontSize: "1.2rem", fontWeight: 900, letterSpacing: "-0.03em", color: "#1a1208", lineHeight: 1.1 }}>
                  Premium UPVC Doors & Windows
                </h2>
                <p style={{ marginTop: 6, fontSize: 11, lineHeight: 1.6, color: "#6b5c3e" }}>
                  Select a product type and finish to configure your space.
                </p>
              </div>

              {/* System type selector */}
              <div style={{
                background: "#faf6ee", borderRadius: "1.5rem", padding: "1.25rem 1.5rem",
                boxShadow: "6px 6px 18px rgba(180,160,120,0.16), -3px -3px 10px rgba(255,255,255,0.85)",
                border: "1px solid rgba(210,195,165,0.4)",
              }}>
                <div className="flex items-center justify-between mb-3">
                  <span style={{ fontSize: 9, fontWeight: 900, letterSpacing: "0.28em", textTransform: "uppercase", color: "#8a7a5e" }}>
                    1. Select System
                  </span>
                  <span style={{
                    fontSize: 9, fontWeight: 700, color: "#8a6e3a",
                    background: "#f0e8d8", borderRadius: 999, padding: "2px 10px",
                    border: "1px solid rgba(180,155,110,0.25)",
                  }}>
                    {activeIndex + 1} / {DOOR_TYPES.length}
                  </span>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2 snap-x no-scrollbar">
                  {DOOR_TYPES.map((door, index) => {
                    const isActive = index === activeIndex;
                    return (
                      <button
                        key={door.id}
                        onClick={() => setMobileActiveIndex(index)}
                        style={{
                          flexShrink: 0, padding: "6px 14px",
                          borderRadius: "0.75rem",
                          fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                          border: isActive ? "1.5px solid #c9a84c" : "1px solid rgba(200,185,155,0.4)",
                          background: isActive ? "#f0e8d8" : "#faf6ee",
                          color: isActive ? "#1a1208" : "#6b5c3e",
                          boxShadow: isActive
                            ? "inset 2px 2px 5px rgba(180,155,110,0.15), inset -2px -2px 5px rgba(255,255,255,0.7)"
                            : "2px 2px 6px rgba(180,160,120,0.1), -1px -1px 4px rgba(255,255,255,0.8)",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {door.name}
                      </button>
                    );
                  })}
                </div>

                <div className="flex gap-3 mt-3 pt-3" style={{ borderTop: "1px solid rgba(200,185,155,0.3)" }}>
                  <button
                    disabled={activeIndex === 0}
                    onClick={() => setMobileActiveIndex(p => Math.max(0, p - 1))}
                    style={{
                      flex: 1, padding: "8px 0",
                      borderRadius: "0.75rem", fontSize: 9, fontWeight: 700,
                      letterSpacing: "0.12em", textTransform: "uppercase",
                      border: "1px solid rgba(200,185,155,0.4)",
                      background: "#faf6ee", color: "#6b5c3e",
                      boxShadow: "2px 2px 6px rgba(180,160,120,0.1), -1px -1px 4px rgba(255,255,255,0.8)",
                      cursor: "pointer", opacity: activeIndex === 0 ? 0.4 : 1,
                    }}
                  >
                    ← Previous
                  </button>
                  <button
                    disabled={activeIndex === DOOR_TYPES.length - 1}
                    onClick={() => setMobileActiveIndex(p => Math.min(DOOR_TYPES.length - 1, p + 1))}
                    style={{
                      flex: 1, padding: "8px 0",
                      borderRadius: "0.75rem", fontSize: 9, fontWeight: 700,
                      letterSpacing: "0.12em", textTransform: "uppercase",
                      border: "1.5px solid #c9a84c",
                      background: "#f0e8d8", color: "#1a1208",
                      boxShadow: "inset 2px 2px 5px rgba(180,155,110,0.15), inset -2px -2px 5px rgba(255,255,255,0.7)",
                      cursor: "pointer", opacity: activeIndex === DOOR_TYPES.length - 1 ? 0.4 : 1,
                    }}
                  >
                    Next →
                  </button>
                </div>
              </div>

              {/* Finish selector */}
              <div style={{
                background: "#faf6ee", borderRadius: "1.5rem", padding: "1.25rem 1.5rem",
                boxShadow: "6px 6px 18px rgba(180,160,120,0.16), -3px -3px 10px rgba(255,255,255,0.85)",
                border: "1px solid rgba(210,195,165,0.4)",
              }}>
                <span style={{ display: "block", fontSize: 9, fontWeight: 900, letterSpacing: "0.28em", textTransform: "uppercase", color: "#8a7a5e", marginBottom: 12 }}>
                  2. Frame Finish
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  {FINISHES.map((finish) => {
                    const isActive = frameColor === finish.color;
                    return (
                      <button
                        key={finish.name}
                        onClick={() => setFrameColor(finish.color)}
                        style={{
                          display: "flex", alignItems: "center", gap: 8, padding: "8px 10px",
                          borderRadius: "0.875rem",
                          border: isActive ? "1.5px solid #c9a84c" : "1px solid rgba(200,185,155,0.35)",
                          background: isActive ? "#f0e8d8" : "#faf6ee",
                          boxShadow: isActive
                            ? "inset 2px 2px 6px rgba(180,155,110,0.15), inset -2px -2px 6px rgba(255,255,255,0.7)"
                            : "3px 3px 8px rgba(180,160,120,0.12), -2px -2px 6px rgba(255,255,255,0.8)",
                          cursor: "pointer", transition: "all 0.2s ease",
                        }}
                      >
                        <span style={{
                          width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                          background: finish.color || "linear-gradient(135deg,#334155,#64748b)",
                          border: "1px solid rgba(0,0,0,0.08)",
                          boxShadow: "inset 0 1px 3px rgba(0,0,0,0.12)",
                        }} />
                        <span>
                          <span style={{ display: "block", fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1a1208" }}>
                            {finish.name}
                          </span>
                          <span style={{ display: "block", fontSize: 8, color: "#8a7a5e" }}>Premium</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active product card */}
              <div style={{
                background: "#faf6ee", borderRadius: "1.5rem", padding: "1.25rem 1.5rem",
                boxShadow: "6px 6px 18px rgba(180,160,120,0.16), -3px -3px 10px rgba(255,255,255,0.85)",
                border: "1px solid rgba(210,195,165,0.4)",
              }}>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={11} style={{ color: "#c9a84c" }} />
                  <span style={{ fontSize: 9, fontWeight: 900, letterSpacing: "0.28em", textTransform: "uppercase", color: "#8a7a5e" }}>
                    Technical Details
                  </span>
                </div>
                <p style={{ fontSize: 9, fontWeight: 900, letterSpacing: "0.22em", textTransform: "uppercase", color: "#8a6e3a" }}>
                  {activeDoor.category}
                </p>
                <h3 style={{ marginTop: 3, fontSize: "1.1rem", fontWeight: 900, letterSpacing: "-0.02em", textTransform: "uppercase", color: "#1a1208" }}>
                  {activeDoor.name}
                </h3>
                <p style={{ marginTop: 5, fontSize: 11, lineHeight: 1.65, color: "#6b5c3e" }}>
                  {activeDoor.desc}
                </p>
                <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: "1px solid rgba(200,185,155,0.3)" }}>
                  <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#8a7a5e" }}>
                    Dimensions
                  </span>
                  <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "monospace", color: "#8a6e3a" }}>
                    {activeDoor.width}m × {activeDoor.height}m
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );

}
