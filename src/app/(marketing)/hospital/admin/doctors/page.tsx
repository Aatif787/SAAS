"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  UserPlus, 
  Mail, 
  Globe,
  X,
  Camera,
  CheckCircle2,
  Trash2
} from "lucide-react";
import { useHospital } from "@/lib/hospital-store";
import type { Doctor } from "@/lib/hospital-data";
import { useForm } from "react-hook-form";

export default function AdminDoctorsPage() {
  const { doctors, addDoctor, updateDoctorStatus } = useHospital();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDoctors = doctors.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  type DoctorFormValues = {
    name: string;
    specialty: string;
    experience: number;
    education: string;
  };

  const { register, handleSubmit, reset, formState: { errors } } = useForm<DoctorFormValues>();

  const onAddDoctor = (data: DoctorFormValues) => {
    addDoctor({
      ...data,
      status: "Active",
      experience: `${data.experience} Years`,
      img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600" // Default placeholder
    });
    reset();
    setIsAddModalOpen(false);
  };

  return (
    <div className="flex-1 min-h-screen bg-[#F8FAFC] p-12">
      <header className="flex items-center justify-between mb-16">
        <div>
          <h2 className="text-4xl font-serif text-ims-blue mb-2">Medical Board</h2>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-ims-charcoal/40">Manage Specialists & Clinical Staff</p>
        </div>

        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-ims-blue text-white px-8 py-4 rounded-sm font-bold uppercase tracking-[0.2em] text-[10px] flex items-center gap-3 hover:bg-ims-red transition-all shadow-xl"
        >
          <UserPlus size={16} /> Add New Specialist
        </button>
      </header>

      {/* Controls */}
      <div className="flex items-center gap-6 mb-10">
        <div className="relative flex-1">
          <input 
            type="text" 
            placeholder="Search by name, specialty, or ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-ims-blue/5 rounded-sm px-12 py-5 text-xs font-medium focus:outline-none focus:border-ims-blue/20 transition-all shadow-sm"
          />
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ims-blue/20" />
        </div>
        <button className="px-8 py-5 bg-white border border-ims-blue/5 rounded-sm flex items-center gap-3 text-ims-blue font-bold uppercase tracking-widest text-[10px] hover:bg-ims-cream transition-all">
          <Filter size={16} /> Filter
        </button>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        <AnimatePresence>
          {filteredDoctors.map((doc, i) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white border border-ims-blue/5 rounded-sm overflow-hidden hover:shadow-2xl transition-all group"
            >
              <div className="p-8 flex items-center gap-6 border-b border-ims-blue/5">
                <div className="relative">
                  <div className="w-20 h-20 rounded-sm overflow-hidden border border-ims-blue/10">
                    <img src={doc.img} alt={doc.name} className="w-full h-full object-cover" />
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-4 border-white ${
                    doc.status === "Active" ? "bg-green-500" :
                    doc.status === "Surgery" ? "bg-ims-gold" :
                    "bg-ims-red"
                  }`} />
                </div>
                <div>
                  <h3 className="text-xl font-serif text-ims-blue mb-1">{doc.name}</h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-ims-red">{doc.specialty}</p>
                </div>
              </div>

              <div className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-ims-charcoal/30 mb-1">Experience</p>
                    <p className="text-xs font-bold text-ims-blue">{doc.experience}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-ims-charcoal/30 mb-1">Education</p>
                    <p className="text-xs font-bold text-ims-blue">{doc.education}</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-ims-blue/5 flex items-center justify-between">
                  <div className="flex gap-4">
                    <button className="text-ims-blue/20 hover:text-ims-blue transition-colors"><Mail size={16} /></button>
                    <button className="text-ims-blue/20 hover:text-ims-blue transition-colors"><Globe size={16} /></button>
                  </div>
                  <div className="flex items-center gap-2">
                    <select 
                      value={doc.status}
                      onChange={(e) => updateDoctorStatus(doc.id, e.target.value as Doctor["status"])}
                      className="text-[9px] font-bold uppercase tracking-widest border-0 p-0 bg-transparent text-ims-blue/40 focus:ring-0 cursor-pointer hover:text-ims-blue transition-colors"
                    >
                      <option value="Active">Set Active</option>
                      <option value="Surgery">In Surgery</option>
                      <option value="On-Leave">On Leave</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add Doctor Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="absolute inset-0 bg-ims-blue/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white shadow-3xl rounded-sm overflow-hidden"
            >
              <div className="bg-ims-blue p-8 text-white flex items-center justify-between">
                <h3 className="text-2xl font-serif">Onboard Specialist</h3>
                <button onClick={() => setIsAddModalOpen(false)}><X size={24} /></button>
              </div>

              <form onSubmit={handleSubmit(onAddDoctor)} className="p-12 space-y-8">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-ims-blue/40">Full Name</label>
                    <input {...register("name", { required: true })} className="w-full bg-[#F8FAFC] border border-ims-blue/5 px-6 py-4 text-xs font-medium focus:border-ims-blue/20 transition-all" placeholder="Dr. Jane Smith" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-ims-blue/40">Specialty</label>
                    <input {...register("specialty", { required: true })} className="w-full bg-[#F8FAFC] border border-ims-blue/5 px-6 py-4 text-xs font-medium focus:border-ims-blue/20 transition-all" placeholder="Neuro-Cardiology" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-ims-blue/40">Experience (Years)</label>
                    <input type="number" {...register("experience", { required: true })} className="w-full bg-[#F8FAFC] border border-ims-blue/5 px-6 py-4 text-xs font-medium focus:border-ims-blue/20 transition-all" placeholder="10" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-ims-blue/40">Education</label>
                    <input {...register("education", { required: true })} className="w-full bg-[#F8FAFC] border border-ims-blue/5 px-6 py-4 text-xs font-medium focus:border-ims-blue/20 transition-all" placeholder="MD, FRCP" />
                  </div>
                </div>

                <div className="pt-8 border-t border-ims-blue/5">
                  <button type="submit" className="w-full bg-ims-blue text-white py-6 rounded-sm font-bold uppercase tracking-[0.3em] text-[11px] shadow-3xl hover:bg-ims-red transition-all">
                    Register Specialist
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
