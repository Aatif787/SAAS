import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { Toaster } from "sonner";
import Navbar from "@/components/ui/navbar";
import CursorParticlesWrapper from "@/components/ui/cursor-particles-wrapper";

export const metadata: Metadata = {
  title: "IMS GROUP | Building Trust Across Healthcare, Infrastructure & Home Solutions",
  description: "Delivering excellence through diversified businesses in healthcare, construction materials, infrastructure, and real estate across Lucknow and beyond.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className="font-sans antialiased overflow-x-hidden w-full max-w-[100vw]">
        <CursorParticlesWrapper />
        <Navbar />

        <div className="w-full max-w-[100vw] overflow-x-hidden">
          {children}
        </div>
        
        {/* Footer */}
        <footer className="py-16 md:py-24 bg-[#0A1E3D] text-[#FAF6F0] w-full">
           <div className="container-xl">
              <div className="grid gap-10 md:gap-16 sm:grid-cols-2 lg:grid-cols-4">
                 <div className="lg:col-span-1">
                    <h3 className="text-2xl md:text-3xl font-serif text-white tracking-tight">IMS GROUP</h3>
                    <div className="mt-4 h-0.5 w-12 bg-[#C5A059]" />
                    <p className="mt-6 md:mt-8 leading-relaxed text-white/65 font-medium text-sm md:text-base">
                       Building trust through excellence across diverse sectors. A legacy of quality and commitment.
                    </p>
                 </div>
                 <div>
                    <h4 className="font-sans font-bold uppercase tracking-[0.2em] text-xs text-[#C5A059] mb-6 md:mb-8">Our Businesses</h4>
                    <ul className="space-y-3 md:space-y-4 text-sm font-medium text-white/55">
                       <li className="hover:text-white transition-colors cursor-pointer">IMS Healthcare</li>
                       <li className="hover:text-white transition-colors cursor-pointer">IMS One Home Solution</li>
                       <li className="hover:text-white transition-colors cursor-pointer">IMS Steel & Infra</li>
                       <li className="hover:text-white transition-colors cursor-pointer">Estate Empire</li>
                    </ul>
                 </div>
                 <div>
                    <h4 className="font-sans font-bold uppercase tracking-[0.2em] text-xs text-[#C5A059] mb-6 md:mb-8">Company</h4>
                    <ul className="space-y-3 md:space-y-4 text-sm font-medium text-white/55">
                       <li className="hover:text-white transition-colors cursor-pointer">About Us</li>
                       <li className="hover:text-white transition-colors cursor-pointer">Our Vision</li>
                       <li className="hover:text-white transition-colors cursor-pointer">Career</li>
                       <li className="hover:text-white transition-colors cursor-pointer">Contact</li>
                    </ul>
                 </div>
                 <div>
                    <h4 className="font-sans font-bold uppercase tracking-[0.2em] text-xs text-[#C5A059] mb-6 md:mb-8">Contact Information</h4>
                    <ul className="space-y-4 md:space-y-6 text-sm font-medium text-white/55">
                       <li className="flex flex-col gap-1">
                          <span className="text-[#C5A059] text-[10px] uppercase tracking-widest">Address</span>
                          <span>IMS Tower, Gomti Nagar, Lucknow</span>
                       </li>
                       <li className="flex flex-col gap-1">
                          <span className="text-[#C5A059] text-[10px] uppercase tracking-widest">Email</span>
                          <span>info@imsgroup.com</span>
                       </li>
                       <li className="flex flex-col gap-1">
                          <span className="text-[#C5A059] text-[10px] uppercase tracking-widest">Phone</span>
                          <span>+91 9699858212</span>
                       </li>
                    </ul>
                 </div>
              </div>
              <div className="mt-16 md:mt-24 pt-8 md:pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 text-[10px] font-bold uppercase tracking-[0.3em] text-white/35">
                 <p>© 2024 IMS GROUP. All Excellence Reserved.</p>
                 <div className="flex gap-8 md:gap-12">
                    <span className="hover:text-[#C5A059] transition-colors cursor-pointer">Privacy Policy</span>
                    <span className="hover:text-[#C5A059] transition-colors cursor-pointer">Terms of Use</span>
                 </div>
              </div>
           </div>
        </footer>

        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
