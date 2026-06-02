import { motion } from 'framer-motion';

export default function MissionVision() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.8 }}
      className="mb-16"
    >
      <div className="grid gap-8 md:grid-cols-2">
        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="p-6 bg-[#0A1E3D]/5 rounded-2xl border border-[#0A1E3D]/10"
        >
          <h3 className="text-xl font-semibold text-[#0A1E3D] mb-4">Our Mission</h3>
          <p className="text-ims-charcoal/70 leading-relaxed">
            To transform houses into luxurious living spaces by combining innovative design, 
            superior craftsmanship, and cutting-edge technology, creating homes that are 
            not just structures but lifelong legacies.
          </p>
        </motion.div>
        
        {/* Vision */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="p-6 bg-[#0A1E3D]/5 rounded-2xl border border-[#0A1E3D]/10"
        >
          <h3 className="text-xl font-semibold text-[#0A1E3D] mb-4">Our Vision</h3>
          <p className="text-ims-charcoal/70 leading-relaxed">
            To be the most trusted luxury home solutions provider, recognized for 
            excellence in design, quality, and customer satisfaction, setting new 
            benchmarks in the industry and shaping the future of luxury living.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}