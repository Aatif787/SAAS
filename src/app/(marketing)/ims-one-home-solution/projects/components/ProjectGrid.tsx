import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Project } from '@/types';

interface ProjectGridProps {
  projects: Project[];
  onProjectSelect: (project: Project | null) => void;
}

export default function ProjectGrid({ projects, onProjectSelect }: ProjectGridProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.8 }}
      className="grid gap-8"
    >
      {projects.map((project) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 + (projects.indexOf(project) * 0.05), duration: 0.6 }}
          className="group relative aspect-w-16 aspect-h-9 w-full rounded-2xl overflow-hidden cursor-pointer"
          onClick={() => onProjectSelect(project)}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-600 flex items-end p-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
              <p className="text-white/90 mb-2">{project.location}</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-white/20 px-3 py-1 rounded text-xs">{project.category}</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}