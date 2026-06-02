import type { Metadata } from "next";
import SteelNavbar from "@/components/steel/steel-navbar";
import SteelFooter from "@/components/steel/steel-footer";
import BlueprintCanvas from "@/components/steel/blueprint-canvas";
import SteelWebGLWrapper from "@/components/steel/steel-webgl-wrapper";
import SteelCursor from "@/components/steel/steel-cursor";
import SteelNoise from "@/components/steel/steel-noise";
import SteelPreloader from "@/components/steel/steel-preloader";

export const metadata: Metadata = {
  title: "IMS Steel | The Future of Luxury Steel",
  description:
    "A next-generation cinematic architecture experience focused on premium steel doors and luxury architectural products.",
};

export default function IMSteelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="steel-theme relative min-h-screen overflow-x-hidden bg-[#050505] text-[#F5F5F5] selection:bg-[#00C853]/30 selection:text-[#00C853]">
      <style>{`
        body:has(.steel-theme) {
          cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='32' viewBox='0 0 28 32'%3E%3Cdefs%3E%3ClinearGradient id='steel' x1='0' y1='0' x2='1' y2='0.6'%3E%3Cstop offset='0%25' stop-color='%23E8E8E8'/%3E%3Cstop offset='18%25' stop-color='%23B0B0B0'/%3E%3Cstop offset='35%25' stop-color='%23D6D6D6'/%3E%3Cstop offset='50%25' stop-color='%23A0A0A0'/%3E%3Cstop offset='68%25' stop-color='%23C8C8C8'/%3E%3Cstop offset='85%25' stop-color='%23888888'/%3E%3Cstop offset='100%25' stop-color='%23707070'/%3E%3C/linearGradient%3E%3ClinearGradient id='edge' x1='0' y1='0' x2='0.3' y2='1'%3E%3Cstop offset='0%25' stop-color='%23555555'/%3E%3Cstop offset='100%25' stop-color='%23333333'/%3E%3C/linearGradient%3E%3ClinearGradient id='shine' x1='0.2' y1='0' x2='0.8' y2='1'%3E%3Cstop offset='0%25' stop-color='%23FFFFFF' stop-opacity='0.7'/%3E%3Cstop offset='50%25' stop-color='%23FFFFFF' stop-opacity='0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M4 2L18 14L12 15L15 26L11 27L8 16L3 21Z' fill='url(%23steel)' stroke='url(%23edge)' stroke-width='1' stroke-linejoin='round'/%3E%3Cpath d='M5 4L15 12.5L11.5 13.5L9.5 16L4 20Z' fill='url(%23shine)'/%3E%3Cline x1='5' y1='5' x2='11' y2='10' stroke='white' stroke-width='0.5' opacity='0.35'/%3E%3Cline x1='6' y1='8' x2='10' y2='12' stroke='white' stroke-width='0.3' opacity='0.2'/%3E%3C/svg%3E") 4 2, auto;
          background-color: #050505;
        }
        body:has(.steel-theme) a,
        body:has(.steel-theme) button,
        body:has(.steel-theme) [role="button"],
        body:has(.steel-theme) input,
        body:has(.steel-theme) select,
        body:has(.steel-theme) textarea {
          cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='32' viewBox='0 0 28 32'%3E%3Cdefs%3E%3ClinearGradient id='s2' x1='0' y1='0' x2='1' y2='0.6'%3E%3Cstop offset='0%25' stop-color='%23F5F5F5'/%3E%3Cstop offset='15%25' stop-color='%23D0D0D0'/%3E%3Cstop offset='30%25' stop-color='%23EEEEEE'/%3E%3Cstop offset='50%25' stop-color='%23BEBEBE'/%3E%3Cstop offset='70%25' stop-color='%23E0E0E0'/%3E%3Cstop offset='85%25' stop-color='%23A8A8A8'/%3E%3Cstop offset='100%25' stop-color='%23909090'/%3E%3C/linearGradient%3E%3ClinearGradient id='e2' x1='0' y1='0' x2='0.3' y2='1'%3E%3Cstop offset='0%25' stop-color='%23666666'/%3E%3Cstop offset='100%25' stop-color='%23444444'/%3E%3C/linearGradient%3E%3ClinearGradient id='sh2' x1='0.1' y1='0' x2='0.7' y2='1'%3E%3Cstop offset='0%25' stop-color='%23FFFFFF' stop-opacity='0.9'/%3E%3Cstop offset='40%25' stop-color='%23FFFFFF' stop-opacity='0.15'/%3E%3Cstop offset='100%25' stop-color='%23FFFFFF' stop-opacity='0'/%3E%3C/linearGradient%3E%3Cfilter id='glow'%3E%3CfeGaussianBlur stdDeviation='0.8' result='blur'/%3E%3CfeMerge%3E%3CfeMergeNode in='blur'/%3E%3CfeMergeNode in='SourceGraphic'/%3E%3C/feMerge%3E%3C/filter%3E%3C/defs%3E%3Cpath d='M4 2L18 14L12 15L15 26L11 27L8 16L3 21Z' fill='url(%23s2)' stroke='url(%23e2)' stroke-width='1' stroke-linejoin='round' filter='url(%23glow)'/%3E%3Cpath d='M5 4L15 12.5L11.5 13.5L9.5 16L4 20Z' fill='url(%23sh2)'/%3E%3Cline x1='5' y1='4' x2='12' y2='11' stroke='white' stroke-width='0.7' opacity='0.5'/%3E%3Cline x1='6' y1='8' x2='10' y2='12' stroke='white' stroke-width='0.3' opacity='0.3'/%3E%3Cline x1='10' y1='17' x2='12' y2='24' stroke='white' stroke-width='0.3' opacity='0.2'/%3E%3C/svg%3E") 4 2, pointer;
        }
        body:has(.steel-theme) > nav,
        body:has(.steel-theme) > footer,
        body:has(.steel-theme) > canvas {
          display: none !important;
        }
        
        /* Premium custom scrollbar for inner areas */
        .steel-theme .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .steel-theme .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(245, 245, 245, 0.02);
          border-radius: 4px;
        }
        .steel-theme .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 200, 83, 0.2);
          border-radius: 4px;
        }
        .steel-theme .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 200, 83, 0.5);
        }
      `}</style>

      {/* Cinematic Overlays */}
      <SteelPreloader />
      <SteelCursor />
      <SteelNoise />

      {/* Matte Black / Deep Emerald Ambient Gradients */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(0,153,102,0.05),transparent_40%),radial-gradient(circle_at_85%_85%,rgba(255,107,26,0.03),transparent_40%)]" />
      </div>

      {/* Dark Architectural Blueprint Canvas */}
      <BlueprintCanvas />

      {/* 3D WebGL Floating Geometry Scene — scroll-reactive */}
      <SteelWebGLWrapper />

      <div className="relative z-10 flex min-h-screen flex-col justify-between">
        <SteelNavbar />
        <main className="flex-1">{children}</main>
        <SteelFooter />
      </div>
    </div>
  );
}
