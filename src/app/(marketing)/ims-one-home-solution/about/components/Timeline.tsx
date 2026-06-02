import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const timelineData = [
  {
    year: "1999",
    title: "Foundation Laid",
    description: "IMS Group established with a vision to build excellence across multiple sectors.",
    icon: "🏗️"
  },
  {
    year: "2005",
    title: "Entry into Real Estate",
    description: "Expanded into property development with focus on quality construction.",
    icon: "🏢"
  },
  {
    year: "2010",
    title: "IMS One Home Solution Launched",
    description: "Dedicated home solutions division created to provide end-to-end luxury home services.",
    icon: "🏠"
  },
  {
    year: "2015",
    title: "Smart Home Integration",
    description: "Pioneered smart home automation solutions in residential projects.",
    icon: "🤖"
  },
  {
    year: "2020",
    title: "Sustainable Building Initiatives",
    description: "Introduced eco-friendly materials and energy-efficient designs across projects.",
    icon: "🌱"
  },
  {
    year: "2023",
    title: "Luxury Redefined",
    description: "Launched premium luxury segment with international design collaborations.",
    icon: "💎"
  }
];

export default function Timeline() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8 }}
      className="py-20 bg-ims-cream"
    >
      <div className="container-xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-[#0A1E3D] mb-16 text-center"
        >
          Our Journey of Excellence
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-xl text-ims-charcoal/70 mb-20 max-w-xl text-center"
        >
          From humble beginnings to becoming a trusted name in luxury home solutions, our journey has been defined by innovation, quality, and unwavering commitment to excellence.
        </motion.p>
        
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-[#0A1E3D]/20" />
          
          {/* Timeline Items */}
          <div className="relative">
            {timelineData.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + (index * 0.1), duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                className={`relative mb-16 pl-12 lg:pl-0 lg:flex lg:items-start ${index % 2 === 0 ? 'lg:justify-start' : 'lg:justify-end'}`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 lg:left-1/2 -translate-x-1/2 top-0 w-8 h-8 bg-[#0A1E3D] rounded-full flex items-center justify-center z-10">
                  <div className="w-4 h-4 bg-white rounded-full" />
                </div>
                
                {/* Timeline Content */}
                <div className="relative w-full lg:w-1/2 lg:px-8">
                  <div className="bg-white p-6 rounded-2xl border border-[#0A1E3D]/10">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-10 h-10 bg-[#0A1E3D]/10 rounded-full flex items-center justify-center">
                        <span className="text-[#0A1E3D] text-lg">{item.icon}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#0A1E3D]">{item.year}</h3>
                        <p className="text-sm text-ims-charcoal/60 mt-1">{item.title}</p>
                      </div>
                    </div>
                    <p className="text-ims-charcoal/70 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}