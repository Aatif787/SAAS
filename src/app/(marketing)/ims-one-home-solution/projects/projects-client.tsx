"use client";

import { motion, useScroll } from 'framer-motion';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import ProjectFilterBar from './components/ProjectFilterBar';
import ProjectGrid from './components/ProjectGrid';
import ProjectModal from './components/ProjectModal';
import { projectsData } from './projectsData';
import HeroSection from './components/HeroSection';
import CTASection from '../sections/CTASection';
import { Project } from '@/types';

export default function ProjectsClient() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: '-100px' });

  const { scrollYProgress } = useScroll();

  const filteredProjects = activeFilter === 'all'
    ? projectsData
    : projectsData.filter(project => project.category.toLowerCase() === activeFilter.toLowerCase());

  return (
    <div className="min-h-screen bg-ims-cream overflow-hidden">
      <HeroSection scrollYProgress={scrollYProgress} />
      
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: inView ? 0.3 : 0, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        className="py-20"
      >
        <div className="container-xl">
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: inView ? 0.5 : 0, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold text-[#0A1E3D] mb-8 tracking-tighter"
            >
              Exquisite <span className="text-ims-gold">Creations</span>
            </motion.h2>
          </div>
          
          <ProjectFilterBar 
            activeFilter={activeFilter} 
            setActiveFilter={setActiveFilter} 
          />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: inView ? 0.9 : 0, duration: 0.8 }}
            className="mt-12"
          >
            <ProjectGrid projects={filteredProjects} onProjectSelect={setSelectedProject} />
          </motion.div>
        </div>
      </motion.div>
      
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
      
      <CTASection />
    </div>
  );
}
