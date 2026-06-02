import { motion } from 'framer-motion';

interface ProjectFilterBarProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

export default function ProjectFilterBar({ activeFilter, setActiveFilter }: ProjectFilterBarProps) {
  const filters = ['all', 'mansion', 'apartments', 'smart home', 'kitchen', 'office', 'hospitality'];

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.8 }}
      className="mb-16 flex flex-wrap gap-4 justify-center"
    >
      {filters.map((filter) => (
        <motion.button
          key={filter}
          onClick={() => setActiveFilter(filter)}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 + (filters.indexOf(filter) * 0.05), duration: 0.6 }}
          className={`${filter === activeFilter 
            ? 'px-6 py-3 bg-[#0A1E3D] text-white text-sm font-medium rounded-full hover:bg-ims-gold transition-colors transform'
            : 'px-6 py-3 bg-[#0A1E3D]/20 text-[#0A1E3D] text-sm font-medium rounded-full hover:bg-[#0A1E3D]/30 transition-colors transform'}`}
        >
          {filter.toUpperCase()}
        </motion.button>
      ))}
    </motion.div>
  );
}