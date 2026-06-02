"use client";

import dynamic from "next/dynamic";

const CursorParticles = dynamic(() => import("@/components/ui/cursor-particles"), {
  ssr: false,
});

export default function CursorParticlesWrapper() {
  return <CursorParticles />;
}
