"use client";

import dynamic from "next/dynamic";

const SteelWebGLScene = dynamic(() => import("@/components/steel/steel-webgl-scene"), { ssr: false });

export default function SteelWebGLWrapper() {
  return <SteelWebGLScene />;
}
