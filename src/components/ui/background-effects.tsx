"use client";

import dynamic from "next/dynamic";

const GrainOverlay = dynamic(() => import("@/components/ui/grain-overlay"), { ssr: false });
const MorphingBlobs = dynamic(() => import("@/components/ui/morphing-blobs"), { ssr: false });

/**
 * Client-side wrapper for background effects that must use ssr: false.
 * Separated from the Server Component page.tsx to comply with Next.js rules.
 */
export default function BackgroundEffects() {
  return (
    <>
      <GrainOverlay />
      <MorphingBlobs />
    </>
  );
}
