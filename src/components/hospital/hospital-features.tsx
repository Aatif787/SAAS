"use client";

import { motion } from "framer-motion";
import { 
  Calendar, 
  Video, 
  FileText, 
  Shield, 
  Smartphone, 
  MapPin, 
  Ambulance, 
  Clock,
  LogIn,
  MessageSquare,
  CreditCard,
  Bell
} from "lucide-react";

const FEATURES = [
  { 
    title: "Appointment System", 
    icon: <Calendar />, 
    desc: "Real-time online booking with doctor availability schedules and history.",
    color: "bg-ims-gold/10"
  },
  { 
    title: "Online Consultation", 
    icon: <Video />, 
    desc: "Secure video and chat consultations with top specialists from anywhere.",
    color: "bg-purple-50"
  },
  { 
    title: "Digital Medical Reports", 
    icon: <FileText />, 
    desc: "Instant download of lab reports and complete prescription history.",
    color: "bg-green-50"
  },
  { 
    title: "24/7 Emergency", 
    icon: <Clock />, 
    desc: "Dedicated trauma response team and rapid ambulance dispatch system.",
    color: "bg-red-50"
  },
  { 
    title: "Patient Dashboard", 
    icon: <LogIn />, 
    desc: "Personalized login for patients to manage history and payments.",
    color: "bg-ims-gold/10"
  },
  { 
    title: "Payment Gateway", 
    icon: <CreditCard />, 
    desc: "Secure online payment system for bills and consultation fees.",
    color: "bg-ims-blue/5"
  }
];

export default function HospitalFeatures() {
  return (
    <section id="features" className="section-pad bg-white relative overflow-hidden">
      {/* Background HUD Decorations */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-ims-blue/5 skew-x-12 -z-10" />

      <div className="container-xl relative z-10">
        <div className="grid lg:grid-cols-12 gap-20 items-center">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-4 mb-6">
               <div className="w-12 h-[1px] bg-ims-red" />
               <span className="text-xs font-bold uppercase tracking-[0.4em] text-ims-red block">Digital Healthcare</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-serif text-ims-blue mb-10 leading-tight tracking-tighter">
              Seamless <br />
              <span className="text-ims-red italic">Patient</span> Experience.
            </h2>
            <p className="text-ims-charcoal/40 text-lg leading-relaxed mb-12">
              We&apos;ve digitized the entire patient lifecycle to minimize wait times 
              and maximize clinical outcome accuracy.
            </p>
            
            <ul className="space-y-8 mb-12">
               {[
                 { text: "SSL Secured Health Data", icon: <Shield size={18} /> },
                 { text: "Mobile App Access", icon: <Smartphone size={18} /> },
                 { text: "SMS/Email Notifications", icon: <Bell size={18} /> },
                 { text: "Google Maps Integration", icon: <MapPin size={18} /> }
               ].map((item, i) => (
                  <motion.li 
                    key={i} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-center gap-5 text-[11px] font-bold uppercase tracking-[0.3em] text-ims-blue group cursor-default"
                  >
                     <div className="w-10 h-10 rounded-full bg-ims-cream text-ims-red flex items-center justify-center group-hover:bg-ims-red group-hover:text-white transition-all shadow-xl shadow-ims-blue/5">
                        {item.icon}
                     </div>
                     {item.text}
                  </motion.li>
               ))}
            </ul>
          </div>

          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-6">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                whileHover={{ scale: 1.02 }}
                className="p-12 border border-ims-blue/5 group hover:shadow-3xl transition-all duration-500 rounded-sm bg-white relative overflow-hidden"
              >
                {/* Background Number */}
                <span className="absolute -top-4 -right-4 text-9xl font-serif text-ims-blue/5 group-hover:text-ims-red/5 transition-colors -z-10 select-none pointer-events-none">0{i+1}</span>
                
                <div className={`w-16 h-16 ${feature.color} flex items-center justify-center text-ims-blue mb-10 rounded-sm group-hover:bg-ims-red group-hover:text-white transition-all duration-700 shadow-xl shadow-ims-blue/5`}>
                  {feature.icon}
                </div>
                <h4 className="text-3xl font-serif text-ims-blue mb-6 group-hover:text-ims-red transition-colors">{feature.title}</h4>
                <p className="text-sm text-ims-charcoal/40 leading-relaxed group-hover:text-ims-charcoal/60 transition-colors">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Action Bar */}
        <motion.div 
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
           className="mt-32 bg-ims-blue p-12 lg:p-24 flex flex-col lg:flex-row items-center justify-between gap-12 rounded-sm relative overflow-hidden"
        >
           {/* Abstract Background HUD */}
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px] opacity-20" />
           
           <div className="flex items-center gap-12 relative z-10">
              <div className="w-24 h-24 bg-ims-red flex items-center justify-center text-white shrink-0 shadow-3xl rotate-3 group-hover:rotate-0 transition-transform">
                 <Ambulance size={48} />
              </div>
              <div>
                 <h3 className="text-white text-4xl md:text-5xl font-serif mb-4 tracking-tighter">24/7 Advanced Life Support</h3>
                 <p className="text-white/40 text-[11px] uppercase tracking-[0.4em] font-bold">Fastest Response Network In Uttar Pradesh</p>
              </div>
           </div>
           <div className="flex flex-col sm:flex-row gap-6 relative z-10 w-full lg:w-auto">
              <a href="tel:9699858212" className="bg-white text-ims-blue px-12 py-6 rounded-sm font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-ims-red hover:text-white transition-all text-center shadow-3xl">
                 Emergency Response
              </a>
              <button className="bg-ims-red text-white px-12 py-6 rounded-sm font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-white hover:text-ims-blue transition-all text-center shadow-3xl">
                 Online Helpdesk
              </button>
           </div>
        </motion.div>
      </div>
    </section>
  );
}
