"use client";

import dynamic from "next/dynamic";
import UPVCHero from "@/components/upvc/upvc-hero";
import UPVC3DViewer from "@/components/upvc/upvc-3d-viewer";

const UPVCStats = dynamic(() => import("@/components/upvc/upvc-stats"));
const UPVCWhyIMS = dynamic(() => import("@/components/upvc/upvc-why-ims"));
const UPVCProducts = dynamic(() => import("@/components/upvc/upvc-products-showcase"));
const UPVCSignatureStory = dynamic(() => import("@/components/upvc/upvc-signature-story"));
const UPVCFeatures = dynamic(() => import("@/components/upvc/upvc-features"));
const UPVCMaterials = dynamic(() => import("@/components/upvc/upvc-materials"));
const UPVCProcess = dynamic(() => import("@/components/upvc/upvc-process"));
const UPVCPremiumZones = dynamic(() => import("@/components/upvc/upvc-premium-zones"));
const UPVCTestimonials = dynamic(() => import("@/components/upvc/upvc-testimonials"));
const UPVCGrandCTA = dynamic(() => import("@/components/upvc/upvc-grand-cta"));
const UPVCFAQ = dynamic(() => import("@/components/upvc/upvc-faq"));

export default function UPVCHomePage() {
  return (
    <div className="upvc-theme" style={{ background: "#040810" }}>
      {/* 1 — Cinematic Hero */}
      <UPVCHero />

      {/* 2 — Stats Counter */}
      <UPVCStats />

      {/* 3 — Why IMS */}
      <UPVCWhyIMS />

      {/* 4 — 3D Product Viewer (scroll-driven showroom) */}
      <div className="relative z-10">
        <UPVC3DViewer />
      </div>

      {/* 5 — Products Showcase */}
      <div className="relative z-20">
        <UPVCProducts />
      </div>

      {/* 6 — Signature Story */}
      <UPVCSignatureStory />

      {/* 7 — Material Technology / Features */}
      <UPVCFeatures />

      {/* 8 — Material Cross-Section */}
      <UPVCMaterials />

      {/* 9 — Process Timeline */}
      <UPVCProcess />

      {/* 10 — Premium Zones */}
      <UPVCPremiumZones />

      {/* 11 — Testimonials */}
      <UPVCTestimonials />

      {/* 12 — Contact / CTA */}
      <UPVCGrandCTA />

      {/* 13 — FAQ */}
      <UPVCFAQ />
    </div>
  );
}
