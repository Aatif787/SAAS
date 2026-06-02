import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

export default function CTASection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '-100px',
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: inView ? 0.3 : 0, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative py-24 bg-gradient-to-b from-[#FDFBF7] to-[#FDFBF7]"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-40 h-40 bg-ims-gold/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-0 w-36 h-36 bg-ims-gold/10 rounded-full blur-3xl animate-float-delay" />
        <div className="absolute top-1/4 right-10 w-28 h-28 bg-[#0A1E3D]/5 rounded-full blur-3xl animate-float-slow" />
      </div>
      
      <div className="relative container-xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: inView ? 0.5 : 0, duration: 0.8 }}
          style={{ fontFamily: 'var(--font-playfair), serif' }}
          className="text-4xl md:text-5xl font-bold text-[#0A1E3D] mb-8 text-center"
        >
          Ready to Transform Your <span className="gold-shimmer-text">Home?</span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: inView ? 0.7 : 0, duration: 0.8 }}
          className="text-xl text-[#0A1E3D]/70 mb-16 max-w-2xl text-center"
        >
          Let&apos;s discuss your vision for luxury living. Our experts are ready to guide you through every step of the transformation process.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: inView ? 0.9 : 0, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row gap-6 justify-center"
        >
          <Link
            href="/ims-one-home-solution/contact"
            className="group px-8 py-4 bg-[#E8761A] text-white rounded-xl font-bold text-sm uppercase tracking-widest flex items-center gap-3 hover:scale-105 hover:bg-[#F5A623] transition-all duration-500 shadow-lg shadow-[#E8761A]/20"
          >
            Schedule Consultation
          </Link>
          <Link
            href="/ims-one-home-solution/services"
            className="px-8 py-4 border-2 border-[#0A1E3D]/30 text-[#0A1E3D] rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-[#0A1E3D]/10 hover:scale-105 transition-all duration-500"
          >
            Explore Our Services
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}