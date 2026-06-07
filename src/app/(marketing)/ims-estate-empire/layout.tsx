import { ReactNode } from "react";
import { Metadata } from "next";
import { TRPCProvider } from "@/providers/trpc";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import "./estate.css";

export const metadata: Metadata = {
  title: "Shay Trotsky | Premium Real Estate Netanya",
  description: "Netanya's most exclusive real estate agency, specializing in luxury waterfront properties, penthouses and villas.",
};

export default function IMSEstateEmpireLayout({ children }: { children: ReactNode }) {
  return (
    <div className="ims-estate-theme">
      <style>{`
        body:has(.ims-estate-theme) > nav,
        body:has(.ims-estate-theme) > footer,
        body:has(.ims-estate-theme) > canvas,
        body:has(.ims-estate-theme) > div[class*="cursor"] {
          display: none !important;
        }
      `}</style>
      <TRPCProvider>
        <CustomCursor />
        <Navigation />
        <main>
          {children}
        </main>
        <Footer />
      </TRPCProvider>
    </div>
  );
}
