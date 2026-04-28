import type { Metadata } from "next";
import { Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Toaster } from "sonner";
import CursorParticles from "@/components/ui/cursor-particles";
import Navbar from "@/components/ui/navbar";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

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
    <html lang="en">
      <body className={`${outfit.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <CursorParticles />
        <Navbar />

        {children}
        
        {/* Footer */}
        <footer className="py-24 bg-ims-blue text-ims-cream">
           <div className="container-xl">
              <div className="grid gap-16 lg:grid-cols-4">
                 <div className="lg:col-span-1">
                    <h3 className="text-3xl font-serif text-white tracking-tight">IMS GROUP</h3>
                    <div className="mt-4 h-0.5 w-12 bg-ims-gold" />
                    <p className="mt-8 leading-relaxed text-white/70 font-medium">
                       Building trust through excellence across diverse sectors. A legacy of quality and commitment.
                    </p>
                 </div>
                 <div>
                    <h4 className="font-sans font-bold uppercase tracking-[0.2em] text-xs text-ims-gold mb-8">Our Businesses</h4>
                    <ul className="space-y-4 text-sm font-medium text-white/60">
                       <li className="hover:text-white transition-colors cursor-pointer">IMS Healthcare</li>
                       <li className="hover:text-white transition-colors cursor-pointer">IMS One Home Solution</li>
                       <li className="hover:text-white transition-colors cursor-pointer">IMS Steel & Infra</li>
                       <li className="hover:text-white transition-colors cursor-pointer">Estate Empire</li>
                       <li className="hover:text-white transition-colors cursor-pointer">IMS Web Solution</li>
                    </ul>
                 </div>
                 <div>
                    <h4 className="font-sans font-bold uppercase tracking-[0.2em] text-xs text-ims-gold mb-8">Web Services</h4>
                    <ul className="space-y-4 text-sm font-medium text-white/60">
                       <li className="hover:text-white transition-colors cursor-pointer">Web Development</li>
                       <li className="hover:text-white transition-colors cursor-pointer">Web Applications</li>
                       <li className="hover:text-white transition-colors cursor-pointer">AI & Automation</li>
                       <li className="hover:text-white transition-colors cursor-pointer">Growth Marketing</li>
                    </ul>
                 </div>
                 <div>
                    <h4 className="font-sans font-bold uppercase tracking-[0.2em] text-xs text-ims-gold mb-8">Company</h4>
                    <ul className="space-y-4 text-sm font-medium text-white/60">
                       <li className="hover:text-white transition-colors cursor-pointer">About Us</li>
                       <li className="hover:text-white transition-colors cursor-pointer">Our Vision</li>
                       <li className="hover:text-white transition-colors cursor-pointer">Career</li>
                       <li className="hover:text-white transition-colors cursor-pointer">Contact</li>
                    </ul>
                 </div>
                 <div>
                    <h4 className="font-sans font-bold uppercase tracking-[0.2em] text-xs text-ims-gold mb-8">Contact Information</h4>
                    <ul className="space-y-6 text-sm font-medium text-white/60">
                       <li className="flex flex-col gap-1">
                          <span className="text-ims-gold text-[10px] uppercase tracking-widest">Address</span>
                          <span>IMS Tower, Gomti Nagar, Lucknow</span>
                       </li>
                       <li className="flex flex-col gap-1">
                          <span className="text-ims-gold text-[10px] uppercase tracking-widest">Email</span>
                          <span>info@imsgroup.com</span>
                       </li>
                       <li className="flex flex-col gap-1">
                          <span className="text-ims-gold text-[10px] uppercase tracking-widest">Phone</span>
                          <span>+91 9699858212</span>
                       </li>
                    </ul>
                 </div>
              </div>
              <div className="mt-24 pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
                 <p>© 2024 IMS GROUP. All Excellence Reserved.</p>
                 <div className="flex gap-12">
                    <span className="hover:text-ims-gold transition-colors cursor-pointer">Privacy Policy</span>
                    <span className="hover:text-ims-gold transition-colors cursor-pointer">Terms of Use</span>
                 </div>
              </div>
           </div>
        </footer>

        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
