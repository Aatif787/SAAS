import { motion } from 'framer-motion';
import { useState } from 'react';

interface ServiceDetailProps {
  service: {
    id: number;
    title: string;
    description: string;
    shortDescription: string;
    icon: string;
    image: string;
    gallery: string[];
    features: string[];
    process: { step: number; title: string; description: string }[];
  };
}

export default function ServiceDetail({ service }: ServiceDetailProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'process' | 'gallery'>('overview');

  return (
    <motion.div className="relative w-full h-full p-8">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.8 }}
        className="mb-12"
      >
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-[#0A1E3D] rounded-full flex items-center justify-center">
            {/* Icon representation */}
            {service.title === "Home Construction" && "🏠"}
            {service.title === "Interior Design" && "🛋️"}
            {service.title === "Modular Kitchen" && "🍳"}
            {service.title === "Smart Home Automation" && "📱"}
            {service.title === "Renovation & Remodeling" && "🔧"}
            {service.title === "CCTV & Security" && "🛡️"}
          </div>
          <div>
            <h2 className="text-3xl font-bold text-[#0A1E3D]">{service.title}</h2>
            <p className="text-lg text-ims-charcoal/70">{service.shortDescription}</p>
          </div>
        </div>
        <p className="text-xl text-ims-charcoal/80 leading-relaxed mb-6">
          {service.description}
        </p>
      </motion.div>
      
      {/* Tabs */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="mb-8"
      >
        <div className="flex overflow-x-auto scrollbar-none whitespace-nowrap gap-2 sm:gap-4 px-4 py-2 bg-[#0A1E3D]/5 rounded-xl">
          <button
            onClick={() => setActiveTab('overview')}
            className={`${activeTab === 'overview' ? 'text-white bg-[#0A1E3D]' : 'text-[#0A1E3D]/60 hover:text-[#0A1E3D] transition-colors'} px-4 py-2 rounded text-sm font-medium shrink-0`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('features')}
            className={`${activeTab === 'features' ? 'text-white bg-[#0A1E3D]' : 'text-[#0A1E3D]/60 hover:text-[#0A1E3D] transition-colors'} px-4 py-2 rounded text-sm font-medium shrink-0`}
          >
            Features
          </button>
          <button
            onClick={() => setActiveTab('process')}
            className={`${activeTab === 'process' ? 'text-white bg-[#0A1E3D]' : 'text-[#0A1E3D]/60 hover:text-[#0A1E3D] transition-colors'} px-4 py-2 rounded text-sm font-medium shrink-0`}
          >
            Process
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`${activeTab === 'gallery' ? 'text-white bg-[#0A1E3D]' : 'text-[#0A1E3D]/60 hover:text-[#0A1E3D] transition-colors'} px-4 py-2 rounded text-sm font-medium shrink-0`}
          >
            Gallery
          </button>
        </div>
      </motion.div>
      
      {/* Tab Content */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="space-y-8"
      >
        {activeTab === 'overview' && (
          <div>
            <h3 className="text-xl font-semibold text-[#0A1E3D] mb-4">About This Service</h3>
            <p className="text-ims-charcoal/70 leading-relaxed">
              {service.description}
            </p>
          </div>
        )}
        
        {activeTab === 'features' && (
          <div>
            <h3 className="text-xl font-semibold text-[#0A1E3D] mb-4">Key Features</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {service.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + (index * 0.05), duration: 0.6 }}
                  className="flex items-start space-x-3 p-4 bg-[#0A1E3D]/5 rounded-lg"
                >
                  <div className="w-6 h-6 bg-[#0A1E3D] rounded-full flex items-center justify-center shrink-0">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-[#0A1E3D]">{feature}</h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'process' && (
          <div>
            <h3 className="text-xl font-semibold text-[#0A1E3D] mb-4">Our Process</h3>
            <div className="space-y-6">
              {service.process.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + (index * 0.05), duration: 0.6 }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-10 h-10 bg-[#0A1E3D] rounded-full flex items-center justify-center shrink-0">
                    <span className="text-white text-sm font-medium">{step.step}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0A1E3D]">{step.title}</h4>
                    <p className="text-ims-charcoal/60">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'gallery' && (
          <div>
            <h3 className="text-xl font-semibold text-[#0A1E3D] mb-4">Project Gallery</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {service.gallery.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 + (index * 0.05), duration: 0.6 }}
                  className="group relative aspect-w-16 aspect-h-9 w-full rounded-2xl overflow-hidden"
                >
                  <img
                    src={image}
                    alt={`${service.title} Gallery ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-4 left-4 text-white">
                      <h4 className="text-lg font-semibold">{service.title}</h4>
                      <p className="text-sm">Project Detail View</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}