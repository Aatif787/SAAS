"use client";

import { motion } from "framer-motion";
import ContactLeadForm from "@/components/forms/contact-lead-form";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="section-pad bg-[#121214]">
      <div className="container-xl">
        <div className="grid gap-20 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-xs font-bold uppercase tracking-[0.5em] text-ims-gold mb-6 block"
            >
              Get In Touch
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-7xl font-serif text-[#FFFDE2] leading-tight"
            >
              Let&apos;s Start a <br />
              <span className="text-[#00dcc4] italic">Legacy Together.</span>
            </motion.h2>
            <p className="mt-8 text-lg text-white/50 leading-relaxed mx-auto lg:mx-0 max-w-xl font-medium">
              Whether you&apos;re looking for advanced healthcare, infrastructure solutions, 
              or comprehensive corporate strategies, our team is ready to deliver excellence.
            </p>
            
            <div className="mt-10 sm:mt-16 space-y-10 flex flex-col items-center lg:items-start">
               <div className="flex items-center gap-4 sm:gap-8 group">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/5 bg-white/5 text-[#00dcc4] group-hover:bg-[#00dcc4] group-hover:text-[#121214] transition-all">
                     <Mail size={24} />
                  </div>
                  <div>
                     <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Email Our Team</p>
                     <p className="text-xl font-serif text-[#FFFDE2]">info@imsgroup.com</p>
                  </div>
               </div>
               
               <div className="flex items-center gap-4 sm:gap-8 group">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/5 bg-white/5 text-[#00dcc4] group-hover:bg-[#00dcc4] group-hover:text-[#121214] transition-all">
                     <Phone size={24} />
                  </div>
                  <div>
                     <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Call Our Office</p>
                     <p className="text-xl font-serif text-[#FFFDE2]">+91 9699858212</p>
                  </div>
               </div>
               
               <div className="flex items-center gap-4 sm:gap-8 group">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/5 bg-white/5 text-[#00dcc4] group-hover:bg-[#00dcc4] group-hover:text-[#121214] transition-all">
                     <MapPin size={24} />
                  </div>
                  <div>
                     <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Our Location</p>
                     <p className="text-xl font-serif text-[#FFFDE2]">Gomti Nagar, Lucknow, India</p>
                  </div>
               </div>
            </div>
            
            <div className="mt-10 sm:mt-16 h-[300px] w-full premium-border p-1 grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl">
               <iframe 
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14234.677953705252!2d80.99920955!3d26.8530495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be29339e0750d%3A0x7d6052309e3e7f45!2sGomti%20Nagar%2C%20Lucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1713980000000!5m2!1sen!2sin" 
                 width="100%" 
                 height="100%" 
                 style={{ border: 0 }} 
                 allowFullScreen={true} 
                 loading="lazy" 
                 referrerPolicy="no-referrer-when-downgrade"
               />
            </div>
          </div>
          
          <div className="bg-[#1E1E20] premium-border p-6 pb-6 sm:p-10 sm:pb-8 md:p-12 md:pb-10 shadow-2xl relative">
             <div className="absolute top-0 right-0 p-8 opacity-[0.05] pointer-events-none">
                <Send size={120} className="text-white" />
             </div>
             <h3 className="text-2xl font-serif text-white mb-8 tracking-tight">Institutional Inquiry</h3>
             <ContactLeadForm />
          </div>
        </div>
      </div>
    </section>
  );
}
