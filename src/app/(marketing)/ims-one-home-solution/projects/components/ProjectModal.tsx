import { motion } from 'framer-motion';

interface ProjectModalProps {
  project: {
    id: number;
    title: string;
    location: string;
    category: string;
    image: string;
    gallery: string[];
    description: string;
    features: string[];
    specifications: Record<string, string>;
  };
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.8 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6, stiffness: 200, damping: 20 }}
        className="relative w-full max-w-5xl h-[90vh] bg-white/95 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 w-10 h-10 bg-[#0A1E3D]/20 rounded-full flex items-center justify-center text-[#0A1E3D] hover:bg-[#0A1E3D]/30 transition-colors z-10"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <span className="text-xl">×</span>
        </button>
        
        {/* Modal Content */}
        <div className="flex flex-col lg:flex-row h-full overflow-y-auto lg:overflow-hidden">
          {/* Image Gallery */}
          <div className="w-full lg:w-1/2 flex flex-col shrink-0">
            {/* Main Image */}
            <div className="relative h-48 sm:h-80 lg:h-auto lg:flex-1">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              {/* Category Badge */}
              <div className="absolute top-4 left-4 bg-[#0A1E3D]/90 text-ims-cream px-3 py-1 rounded text-sm font-medium">
                {project.category.toUpperCase()}
              </div>
            </div>
            
            {/* Thumbnails */}
            <div className="mt-2 lg:mt-4 flex gap-2 overflow-x-auto h-16 lg:h-20 scrollbar-hide px-4 lg:px-0">
              {[project.image, ...project.gallery].map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${project.title} ${index + 1}`}
                  className="w-16 lg:w-20 h-full object-cover rounded border-2 border-transparent hover:border-[#0A1E3D] transition-all cursor-pointer shrink-0"
                />
              ))}
            </div>
          </div>
          
          {/* Project Details */}
          <div className="w-full lg:w-1/2 p-4 sm:p-8 overflow-y-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0A1E3D] mb-4">{project.title}</h2>
            <p className="text-lg text-ims-charcoal/70 mb-6">{project.location}</p>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#0A1E3D] mb-3">Description</h3>
              <p className="text-ims-charcoal/70 leading-relaxed">
                {project.description}
              </p>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#0A1E3D] mb-3">Key Features</h3>
              <div className="grid gap-3 md:grid-cols-2">
                {project.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + (index * 0.05), duration: 0.6 }}
                    className="flex items-start space-x-3 p-3 bg-[#0A1E3D]/5 rounded-lg"
                  >
                    <div className="w-5 h-5 bg-[#0A1E3D] rounded-full flex items-center justify-center shrink-0">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-[#0A1E3D]">{feature}</h4>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#0A1E3D] mb-3">Specifications</h3>
              <div className="space-y-2">
                {Object.entries(project.specifications).map(([key, value], index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + (index * 0.05), duration: 0.6 }}
                    className="flex justify-between px-3 py-2 bg-[#0A1E3D]/3 rounded-lg"
                  >
                    <span className="font-medium text-[#0A1E3D]">{key}</span>
                    <span className="text-ims-charcoal/70">{value}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="mt-10 pt-6 border-t border-[#0A1E3D]/10">
              <a
                href="/contact"
                className="btn-premium w-full hover:scale-105 transition-transform duration-300"
              >
                Schedule a Consultation for This Project
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}