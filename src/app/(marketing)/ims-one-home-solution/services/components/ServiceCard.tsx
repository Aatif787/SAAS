import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  service: {
    id: number;
    title: string;
    description: string;
    shortDescription: string;
    icon: string;
    image: string;
  };
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative aspect-w-16 aspect-h-9 w-full rounded-2xl overflow-hidden border border-[#0A1E3D]/10"
    >
      {/* Image Background */}
      <div className="absolute inset-0">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black/40" />
      </div>
      
      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-end p-6 pointer-events-none">
        {/* Icon */}
        <div className="mb-4">
          <span className="w-10 h-10 bg-[#0A1E3D]/20 rounded-full flex items-center justify-center">
            {/* Using text representation for icons since we're not using lucide-react in this example */}
            {service.title === "Home Construction" && "🏠"}
            {service.title === "Interior Design" && "🛋️"}
            {service.title === "Modular Kitchen" && "🍳"}
            {service.title === "Smart Home Automation" && "📱"}
            {service.title === "Renovation & Remodeling" && "🔧"}
            {service.title === "CCTV & Security" && "🛡️"}
          </span>
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-semibold text-ims-cream mb-2">
          {service.title}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-ims-cream/80 line-clamp-2">
          {service.shortDescription}
        </p>
        
        {/* Arrow */}
        <motion.span
          whileHover={{ x: 4 }}
          whileTap={{ x: 0 }}
          className="mt-6 inline-flex items-center text-ims-gold transition-transform duration-300"
        >
          {service.title}
          <ArrowRight className="ml-2 h-4 w-4" />
        </motion.span>
      </div>
    </motion.div>
  );
}