"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";


export default function Footer() {
  const pathname = usePathname();
  
  // Hide global footer on vertical-specific subpages that have their own footers
  const hideOnPaths = ["/upvc", "/ims-one-home-solution", "/admin", "/hospital/admin", "/upvc-admin", "/ims-estate-empire"];
  const shouldHide = hideOnPaths.some(path => pathname.startsWith(path));

  if (shouldHide) return null;

  return (
    <footer className="py-24 bg-ims-blue text-ims-cream">
       <div className="container-xl">
          <div className="grid gap-16 sm:grid-cols-2 lg:grid-cols-4">
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
                   <li><Link href="/hospital" className="hover:text-white transition-colors cursor-pointer block">IMS Hospital</Link></li>
                   <li><Link href="/ims-one-home-solution" className="hover:text-white transition-colors cursor-pointer block">IMS One Home Solution</Link></li>
                   <li><Link href="/upvc" className="hover:text-white transition-colors cursor-pointer block">IMS UPVC Doors & Windows</Link></li>
                   <li><Link href="/ims-steel" className="hover:text-white transition-colors cursor-pointer block">IMS Steel</Link></li>
                   <li><Link href="/about" className="hover:text-white transition-colors cursor-pointer block">IMS Infra</Link></li>
                   <li><Link href="/ims-estate-empire" className="hover:text-white transition-colors cursor-pointer block">IMS Estate Empire</Link></li>
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
  );
}
