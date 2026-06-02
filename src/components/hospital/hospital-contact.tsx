"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Share2, Globe, ArrowUpRight } from "lucide-react";
import { useHospital } from "@/lib/hospital-store";

export default function HospitalContact() {
  const { cms } = useHospital();

  const CONTACT_DETAILS = [
    {
      label: "Emergency (24/7)",
      value: `${cms?.emergencyPhone || "+91 9699858212"}`,
      icon: <Phone size={24} />
    },
    {
      label: "Email Inquiries",
      value: (cms?.emails || ["hospital@imsgroup.com"]).join('\n'),
      icon: <Mail size={24} />
    },
    {
      label: "Reach Us",
      value: (cms?.address || "IMS Tower, Gomti Nagar, Lucknow").replace(', ', '\n'),
      icon: <MapPin size={24} />
    }
  ];

  const socialIcons: Record<string, typeof Globe> = {
    Globe: Globe,
    Mail: Mail,
    Share2: Share2
  };

  return (
    <section id="contact" className="section-pad bg-[#F0F4F8] relative overflow-hidden">
      <div className="container-xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:w-2/5"
          >
            <div className="flex items-center gap-4 mb-8">
               <div className="w-12 h-2 bg-[#F0F4F8] shadow-[2px_2px_5px_#d1d9e6,-2px_-2px_5px_#ffffff] rounded-full" />
               <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-ims-blue/40 block font-mono">Liaison // Location</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif mb-10 leading-[0.95] tracking-tighter text-[#F0F4F8] [text-shadow:4px_4px_8px_#d1d9e6,-4px_-4px_8px_#ffffff]">
              Get in <br />
              <span className="text-ims-red italic drop-shadow-sm">Touch</span> Now
            </h2>
            <p className="text-ims-charcoal/40 text-lg leading-relaxed mb-12 p-8 bg-[#F0F4F8] shadow-[inset_8px_8px_16px_#d1d9e6,inset_-8px_-8px_16px_#ffffff] rounded-3xl font-medium">
              Our clinical facility is strategically located in {(cms?.address || "Lucknow").split(',').pop()?.trim()} 
              for rapid access during medical emergencies.
            </p>

            <div className="space-y-10">
               {CONTACT_DETAILS.map((detail, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="p-8 bg-[#F0F4F8] shadow-[10px_10px_20px_#d1d9e6,-10px_-10px_20px_#ffffff] rounded-[32px] flex gap-8 group hover:shadow-[inset_5px_5px_10px_#d1d9e6,inset_-5px_-5px_10px_#ffffff] transition-all duration-500"
                  >
                     <div className="w-16 h-16 bg-[#F0F4F8] shadow-[4px_4px_8px_#d1d9e6,-4px_-4px_8px_#ffffff] text-ims-blue flex items-center justify-center shrink-0 group-hover:text-ims-red transition-all rounded-2xl">
                        {detail.icon}
                     </div>
                     <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-ims-gold mb-3 font-mono">{detail.label}</h4>
                        <p className="text-2xl font-serif text-ims-blue group-hover:text-ims-red transition-colors whitespace-pre-line leading-snug tracking-tighter">
                           {detail.value}
                        </p>
                     </div>
                  </motion.div>
               ))}
            </div>

            <div className="mt-16 pt-12 border-t border-ims-blue/5">
               <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-ims-charcoal/20 mb-8 font-mono">Satellite Network Updates</p>
               <div className="flex gap-8">
                  {(cms?.social || []).map((s, i) => {
                    const Icon = socialIcons[s.platform] || Globe;
                    return (
                      <motion.a 
                        key={i}
                        href={s.link}
                        target="_blank"
                        whileHover={{ scale: 1.1 }}
                        className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#F0F4F8] shadow-[4px_4px_8px_#d1d9e6,-4px_-4px_8px_#ffffff] text-ims-blue/40 hover:text-ims-red transition-all"
                      >
                         <Icon size={20} />
                      </motion.a>
                    );
                  })}
               </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:w-3/5"
          >
            <div className="relative h-[600px] lg:h-full min-h-[700px] p-6 bg-[#F0F4F8] shadow-[20px_20px_60px_#d1d9e6,-20px_-20px_60px_#ffffff] rounded-[60px] overflow-hidden group">
               <div className="relative w-full h-full rounded-[40px] overflow-hidden border border-white/40">
                  {/* Grayscale Map Overlay */}
                  <div className="absolute inset-0 bg-ims-blue/5 z-10 pointer-events-none group-hover:opacity-0 transition-opacity duration-1000" />
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.882417724395!2d80.9416!3d26.8467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDUwJzQ4LjEiTiA4MMKwNTYnMzIuNSJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
                    className="w-full h-full border-0 grayscale contrast-125 group-hover:grayscale-0 transition-all duration-1000"
                    allowFullScreen={true} 
                    loading="lazy"
                  />
               </div>
               
               {/* Neumorphic Floating Address Card */}
               <div className="absolute bottom-12 left-12 right-12 bg-[#F0F4F8] p-12 shadow-[15px_15px_30px_#d1d9e6,-15px_-15px_30px_#ffffff] z-20 md:max-w-md rounded-[40px] border border-white/20">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-ims-red mb-4 font-mono">Central Facility</h4>
                  <p className="text-3xl font-serif text-ims-blue leading-tight mb-8 tracking-tighter">{cms?.address || "IMS Tower, Lucknow"}</p>
                  <a 
                    href="https://maps.google.com" 
                    target="_blank" 
                    className="inline-flex items-center gap-4 px-8 py-4 bg-[#F0F4F8] shadow-[4px_4px_8px_#d1d9e6,-4px_-4px_8px_#ffffff] hover:shadow-[inset_2px_2px_5px_#d1d9e6,inset_-2px_-2px_5px_#ffffff] rounded-full text-[10px] font-bold uppercase tracking-[0.3em] text-ims-gold hover:text-ims-red transition-all"
                  >
                    Launch Navigator <ArrowUpRight size={16} />
                  </a>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
