"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Stethoscope, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Loader2
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useHospital } from "@/lib/hospital-store";
import { toast } from "sonner";

const bookingSchema = z.object({
  patientName: z.string().min(3, "Name must be at least 3 characters"),
  phone: z.string().regex(/^[0-9]{10}$/, "Invalid phone number (10 digits required)"),
  specialty: z.string().min(1, "Please select a specialty"),
  doctor: z.string().min(1, "Please select a doctor"),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time slot"),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export default function BookingEngine({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { addAppointment, doctors } = useHospital();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [confirmedToken, setConfirmedToken] = useState("");

  const specialties = Array.from(new Set(doctors.map(d => d.specialty)));

  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
  });

  const selectedSpecialty = watch("specialty");
  const filteredDoctors = doctors.filter(d => d.specialty === selectedSpecialty);

  const onSubmit = async (data: BookingFormValues) => {
    setLoading(true);
    try {
      const res = await fetch("/api/hospital/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok || !result.success) throw new Error(result.error || "Booking failed");

      setConfirmedToken(result.token);
      addAppointment(data);
      setSuccess(true);
      toast.success("Appointment Booked Successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Connection error");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-ims-blue/60 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-4xl bg-white shadow-3xl overflow-hidden flex flex-col md:flex-row min-h-[600px]"
        >
          {/* Sidebar / Info */}
          <div className="w-full md:w-1/3 bg-ims-blue p-12 text-white flex flex-col justify-between">
            <div>
               <div className="w-12 h-12 bg-ims-red flex items-center justify-center rounded-sm mb-8 shadow-xl">
                  <Calendar size={24} />
               </div>
               <h2 className="text-3xl font-serif mb-4 leading-tight">Priority Medical <br /><span className="text-ims-red italic">Booking</span>.</h2>
               <p className="text-white/40 text-[11px] uppercase tracking-[0.3em] font-bold leading-relaxed">
                  Real-time synchronization with clinical staff schedules.
               </p>
            </div>

            <div className="space-y-8 mt-12">
               {[
                 { label: "SSL Secured", icon: <ShieldCheck size={16} /> },
                 { label: "Instant SMS", icon: <ArrowRight size={16} /> },
                 { label: "Priority Lane", icon: <ArrowRight size={16} /> },
               ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-white/60">
                     <div className="text-ims-red">{item.icon}</div>
                     {item.label}
                  </div>
               ))}
            </div>
          </div>

          {/* Form Area */}
          <div className="flex-1 p-12 relative bg-[#F8FAFC]">
            <button onClick={onClose} className="absolute top-8 right-8 text-ims-blue/20 hover:text-ims-red transition-colors">
               <X size={24} />
            </button>

            {!success ? (
               <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col">
                  <div className="flex-1 space-y-8 overflow-y-auto pr-4 custom-scrollbar">
                     <div className="grid sm:grid-cols-2 gap-8">
                        <div className="space-y-2">
                           <label className="text-[10px] font-bold uppercase tracking-widest text-ims-blue/40 ml-1">Full Name</label>
                           <div className="relative">
                              <input {...register("patientName")} className="w-full bg-white border border-ims-blue/10 px-12 py-5 rounded-sm text-xs font-medium focus:border-ims-blue transition-all" placeholder="John Doe" />
                              <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ims-blue/20" />
                           </div>
                           {errors.patientName && <p className="text-[9px] text-ims-red font-bold uppercase tracking-widest">{errors.patientName.message}</p>}
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-bold uppercase tracking-widest text-ims-blue/40 ml-1">Phone Number</label>
                           <div className="relative">
                              <input {...register("phone")} className="w-full bg-white border border-ims-blue/10 px-12 py-5 rounded-sm text-xs font-medium focus:border-ims-blue transition-all" placeholder="9876543210" />
                              <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ims-blue/20" />
                           </div>
                           {errors.phone && <p className="text-[9px] text-ims-red font-bold uppercase tracking-widest">{errors.phone.message}</p>}
                        </div>
                     </div>

                     <div className="grid sm:grid-cols-2 gap-8">
                        <div className="space-y-2">
                           <label className="text-[10px] font-bold uppercase tracking-widest text-ims-blue/40 ml-1">Specialty</label>
                           <div className="relative">
                              <select {...register("specialty")} className="w-full bg-white border border-ims-blue/10 px-12 py-5 rounded-sm text-xs font-medium focus:border-ims-blue transition-all appearance-none">
                                 <option value="">Select Specialty</option>
                                 {specialties.map(s => <option key={s} value={s}>{s}</option>)}
                              </select>
                              <Stethoscope size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ims-blue/20" />
                           </div>
                           {errors.specialty && <p className="text-[9px] text-ims-red font-bold uppercase tracking-widest">{errors.specialty.message}</p>}
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-bold uppercase tracking-widest text-ims-blue/40 ml-1">Doctor</label>
                           <div className="relative">
                              <select {...register("doctor")} className="w-full bg-white border border-ims-blue/10 px-12 py-5 rounded-sm text-xs font-medium focus:border-ims-blue transition-all appearance-none" disabled={!selectedSpecialty}>
                                 <option value="">Select Doctor</option>
                                 {filteredDoctors.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                              </select>
                              <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ims-blue/20" />
                           </div>
                           {errors.doctor && <p className="text-[9px] text-ims-red font-bold uppercase tracking-widest">{errors.doctor.message}</p>}
                        </div>
                     </div>

                     <div className="grid sm:grid-cols-2 gap-8">
                        <div className="space-y-2">
                           <label className="text-[10px] font-bold uppercase tracking-widest text-ims-blue/40 ml-1">Preferred Date</label>
                           <div className="relative">
                              <input type="date" {...register("date")} className="w-full bg-white border border-ims-blue/10 px-12 py-5 rounded-sm text-xs font-medium focus:border-ims-blue transition-all" />
                              <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ims-blue/20" />
                           </div>
                           {errors.date && <p className="text-[9px] text-ims-red font-bold uppercase tracking-widest">{errors.date.message}</p>}
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-bold uppercase tracking-widest text-ims-blue/40 ml-1">Time Slot</label>
                           <div className="relative">
                              <select {...register("time")} className="w-full bg-white border border-ims-blue/10 px-12 py-5 rounded-sm text-xs font-medium focus:border-ims-blue transition-all appearance-none">
                                 <option value="">Select Time</option>
                                 <option value="09:00 AM">09:00 AM</option>
                                 <option value="10:30 AM">10:30 AM</option>
                                 <option value="01:00 PM">01:00 PM</option>
                                 <option value="04:00 PM">04:00 PM</option>
                              </select>
                              <Clock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ims-blue/20" />
                           </div>
                           {errors.time && <p className="text-[9px] text-ims-red font-bold uppercase tracking-widest">{errors.time.message}</p>}
                        </div>
                     </div>
                  </div>

                  <div className="mt-12 pt-8 border-t border-ims-blue/5">
                     <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="w-full bg-ims-blue text-white py-6 rounded-sm font-bold uppercase tracking-[0.3em] text-[11px] shadow-3xl hover:bg-ims-red transition-all flex items-center justify-center gap-4"
                     >
                        {loading ? (
                           <>
                              <Loader2 size={18} className="animate-spin" />
                              Processing Secure Transaction...
                           </>
                        ) : (
                           <>
                              Confirm Priority Appointment
                              <ArrowRight size={18} />
                           </>
                        )}
                     </motion.button>
                  </div>
               </form>
            ) : (
               <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center p-8"
               >
                  <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-10 shadow-xl">
                     <CheckCircle2 size={48} />
                  </div>
                  <h3 className="text-4xl font-serif text-ims-blue mb-4">Booking Successful!</h3>
                  <p className="text-ims-charcoal/60 text-sm leading-relaxed mb-12 max-w-sm">
                     Your priority appointment has been registered. An SMS confirmation with the token number has been sent to your device.
                  </p>
                  
                  <div className="w-full bg-white border border-ims-blue/5 p-8 rounded-sm shadow-xl mb-12 text-left">
                     <p className="text-[10px] font-bold uppercase tracking-widest text-ims-blue/40 mb-4">Appointment Token</p>
                     <p className="text-2xl font-mono text-ims-blue">{confirmedToken || "#IMS-PENDING"}</p>
                  </div>

                  <button 
                     onClick={() => { reset(); setSuccess(false); onClose(); }}
                     className="bg-ims-blue text-white px-12 py-6 rounded-sm font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-ims-red transition-all shadow-3xl"
                  >
                     Close Portal
                  </button>
               </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
