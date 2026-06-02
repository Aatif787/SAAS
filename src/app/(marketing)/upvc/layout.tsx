import type { Metadata } from "next";
import UPVCNavbar from "@/components/upvc/upvc-navbar";
import UPVCFooter from "@/components/upvc/upvc-footer";

export const metadata: Metadata = {
  title: "IMS UPVC Doors & Windows | Where Light Lives",
  description:
    "Ultra-performance UPVC systems engineered for eternity. IMS engineers doors and windows that don't just seal your home — they transform it.",
};

export default function UPVCLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="upvc-theme min-h-screen text-[#E8F4FF] selection:bg-[#00C2FF] selection:text-[#040810]"
      style={{ background: "#040810" }}>
      <style>{`
        body:has(.upvc-theme) > nav,
        body:has(.upvc-theme) > footer,
        body:has(.upvc-theme) > canvas {
          display: none !important;
        }
        .upvc-theme {
          --cyan: #00C2FF;
          --mint: #7DFFD1;
          --ember: #FF6B35;
          --ice: #E8F4FF;
          --navy: #040810;
          --surface: #0A1628;
          --border: rgba(0,194,255,0.18);
          --glass: rgba(255,255,255,0.04);
          cursor: none;
        }
        .upvc-theme *, .upvc-theme *::before, .upvc-theme *::after {
          cursor: none !important;
        }
        .upvc-theme h1, .upvc-theme h2, .upvc-theme h3,
        .upvc-theme h4, .upvc-theme h5, .upvc-theme h6 {
          color: inherit;
          font-family: inherit;
        }
        /* Custom scrollbar */
        .upvc-theme ::-webkit-scrollbar { width: 4px; }
        .upvc-theme ::-webkit-scrollbar-track { background: #040810; }
        .upvc-theme ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #00C2FF, #7DFFD1);
          border-radius: 2px;
        }
        /* Glow utilities */
        .glow-cyan { box-shadow: 0 0 40px rgba(0,194,255,0.3); }
        .glow-mint { box-shadow: 0 0 40px rgba(125,255,209,0.3); }
        .text-cyan { color: #00C2FF; }
        .text-mint { color: #7DFFD1; }
        .text-ember { color: #FF6B35; }
        .text-ice { color: #E8F4FF; }
        .border-cyan { border-color: rgba(0,194,255,0.18); }
        /* Noise grain overlay */
        .upvc-theme::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          opacity: 0.025;
          pointer-events: none;
          z-index: 9999;
        }
        /* Magnetic button base */
        .btn-ember {
          background: #FF6B35;
          color: #040810;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          transition: all 0.3s ease;
        }
        .btn-ember:hover {
          background: #E8F4FF;
          color: #040810;
          box-shadow: 0 0 40px rgba(255,107,53,0.5);
        }
        .btn-ghost {
          border: 1px solid rgba(0,194,255,0.3);
          color: #E8F4FF;
          background: transparent;
          transition: all 0.3s ease;
        }
        .btn-ghost:hover {
          background: rgba(0,194,255,0.1);
          border-color: #00C2FF;
          color: #00C2FF;
        }
        /* Section divider */
        .section-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,194,255,0.3), transparent);
        }
        /* Topographic background */
        .topo-bg {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Cdefs%3E%3Cstyle%3E.c%7Bfill:none;stroke:rgba(0,194,255,0.06);stroke-width:1%7D%3C/style%3E%3C/defs%3E%3Cellipse class='c' cx='50%25' cy='50%25' rx='20%25' ry='10%25'/%3E%3Cellipse class='c' cx='50%25' cy='50%25' rx='35%25' ry='18%25'/%3E%3Cellipse class='c' cx='50%25' cy='50%25' rx='50%25' ry='26%25'/%3E%3Cellipse class='c' cx='50%25' cy='50%25' rx='65%25' ry='34%25'/%3E%3Cellipse class='c' cx='50%25' cy='50%25' rx='80%25' ry='42%25'/%3E%3C/svg%3E");
        }
        @keyframes float-up {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @keyframes scan-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes draw-line {
          from { stroke-dashoffset: 1000; }
          to { stroke-dashoffset: 0; }
        }
        .animate-float { animation: float-up 6s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
      `}</style>
      <UPVCNavbar />
      <main>{children}</main>
      <UPVCFooter />
    </div>
  );
}
