import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const achievements = [
  { number: "10K+", label: "Homes Transformed" },
  { number: "25+", label: "Years of Excellence" },
  { number: "98%", label: "Customer Satisfaction" },
  { number: "500+", label: "Expert Team Members" }
];

export default function AchievementCounters() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '-100px',
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: inView ? 0.3 : 0, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      className="py-20 bg-ims-cream"
    >
      <div className="container-xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: inView ? 0.5 : 0, duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-[#0A1E3D] mb-16 text-center"
        >
          Our Legacy in Numbers
        </motion.h2>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 text-center">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: inView ? 0.7 + (index * 0.1) : 0, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col items-center"
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="w-20 h-20 bg-[#0A1E3D]/10 rounded-2xl flex items-center justify-center mb-6"
              >
                <span className="text-3xl font-bold text-[#0A1E3D]">{achievement.number}</span>
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: inView ? 0.9 + (index * 0.1) : 0, duration: 0.6 }}
                className="text-xl font-semibold text-[#0A1E3D]"
              >
                {achievement.label}
              </motion.h3>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}