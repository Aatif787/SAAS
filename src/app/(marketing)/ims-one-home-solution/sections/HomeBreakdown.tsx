"use client";

import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Thermometer, Shield, Zap, Droplets, Wifi, Lock, Sun, Wind } from 'lucide-react';

const systems = [
  {
    id: 'climate',
    name: 'Climate Intelligence',
    description: 'AI-powered HVAC with 0.1°C precision. Smart vents, radiant floors, humidity optimization.',
    icon: Thermometer,
    color: '#E8761A',
    gradient: 'from-[#E8761A] to-[#F5A623]',
    metrics: [
      { label: 'Temperature', value: '21.5°C', bar: 72 },
      { label: 'Humidity', value: '45%', bar: 45 },
      { label: 'Air Quality', value: '98/100', bar: 98 },
    ],
  },
  {
    id: 'security',
    name: 'Neural Security',
    description: 'Quantum-encrypted biometrics, facial recognition, predictive threat analysis.',
    icon: Shield,
    color: '#6366F1',
    gradient: 'from-[#6366F1] to-[#8B5CF6]',
    metrics: [
      { label: 'Perimeter', value: 'SECURE', bar: 100 },
      { label: 'Cameras', value: '12 Active', bar: 100 },
      { label: 'Threat Level', value: '0.0%', bar: 2 },
    ],
  },
  {
    id: 'energy',
    name: 'Infinite Energy',
    description: 'Solar-hydrogen hybrid with 94% storage. Net-zero living, real-time optimization.',
    icon: Zap,
    color: '#F5A623',
    gradient: 'from-[#F5A623] to-[#FBBF24]',
    metrics: [
      { label: 'Solar Output', value: '15.4 KW', bar: 85 },
      { label: 'Battery', value: '94%', bar: 94 },
      { label: 'Carbon Offset', value: '120%', bar: 100 },
    ],
  },
  {
    id: 'water',
    name: 'Aqua Management',
    description: 'Smart recycling, rain harvesting, leak detection. 60% water savings.',
    icon: Droplets,
    color: '#0EA5E9',
    gradient: 'from-[#0EA5E9] to-[#38BDF8]',
    metrics: [
      { label: 'Flow Rate', value: '2.4 L/min', bar: 60 },
      { label: 'Purity', value: '99.9%', bar: 99 },
      { label: 'Recycled', value: '60%', bar: 60 },
    ],
  },
];

// Animated number ticker
function Ticker({ value, color }: { value: string; color: string }) {
  return (
    <motion.span
      key={value}
      initial={{ y: 12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -12, opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{ color }}
      className="font-bold text-sm tabular-nums"
    >
      {value}
    </motion.span>
  );
}

// Animated metric bar
function MetricBar({ label, value, bar, color, delay }: { label: string; value: string; bar: number; color: string; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-white/50 text-xs font-medium uppercase tracking-widest">{label}</span>
        <span className="text-white font-bold text-sm">{value}</span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}99)` }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${bar}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

// Pulsing ring animation
function PulseRing({ color, delay = 0 }: { color: string; delay?: number }) {
  return (
    <motion.div
      className="absolute inset-0 rounded-full border-2 opacity-0"
      style={{ borderColor: color }}
      animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
      transition={{ duration: 2, delay, repeat: Infinity, ease: 'easeOut' }}
    />
  );
}

// The central smart home visual — ultra premium
function SmartHomeVisual({ activeSystem }: { activeSystem: typeof systems[0] }) {
  const Icon = activeSystem.icon;

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">

      {/* Deep ambient glow */}
      <motion.div
        key={activeSystem.id + '-glow'}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-25 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${activeSystem.color}, transparent 70%)` }}
      />

      {/* Animated grid */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${activeSystem.color}80 1px, transparent 1px), linear-gradient(90deg, ${activeSystem.color}80 1px, transparent 1px)`,
          backgroundSize: '44px 44px',
        }}
      />

      {/* Perspective floor grid */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 opacity-10 pointer-events-none"
        style={{
          background: `linear-gradient(to top, ${activeSystem.color}30, transparent)`,
          maskImage: 'linear-gradient(to top, black, transparent)',
        }}
      />

      {/* Outer orbit ring */}
      <motion.div
        className="absolute rounded-full border border-dashed opacity-20"
        style={{ width: 340, height: 340, borderColor: activeSystem.color }}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />

      {/* Mid orbit ring with nodes */}
      <div className="absolute" style={{ width: 260, height: 260 }}>
        <motion.div
          className="absolute inset-0 rounded-full border opacity-30"
          style={{ borderColor: activeSystem.color }}
          animate={{ rotate: -360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        >
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <div
              key={deg}
              className="absolute w-2.5 h-2.5 rounded-full"
              style={{
                background: activeSystem.color,
                boxShadow: `0 0 12px ${activeSystem.color}`,
                top: '50%',
                left: '50%',
                transformOrigin: '0 0',
                transform: `rotate(${deg}deg) translateX(128px) translateY(-50%)`,
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Inner fast ring */}
      <motion.div
        className="absolute rounded-full border-2 opacity-40"
        style={{ width: 170, height: 170, borderColor: activeSystem.color }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      >
        {/* Bright arc segment */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(${activeSystem.color} 0deg, ${activeSystem.color}00 90deg, transparent 90deg)`,
            opacity: 0.6,
          }}
        />
      </motion.div>

      {/* Center core */}
      <div className="relative flex items-center justify-center">
        {/* Triple pulse rings */}
        {[0, 0.6, 1.2].map((delay) => (
          <motion.div
            key={delay}
            className="absolute rounded-full border"
            style={{ borderColor: activeSystem.color }}
            animate={{ width: [60, 160], height: [60, 160], opacity: [0.7, 0] }}
            transition={{ duration: 2.5, delay, repeat: Infinity, ease: 'easeOut' }}
          />
        ))}

        {/* Hexagon backdrop */}
        <motion.div
          key={activeSystem.id}
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute w-28 h-28 opacity-20"
          style={{
            background: activeSystem.color,
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          }}
        />

        {/* Icon container */}
        <motion.div
          key={activeSystem.id + '-icon'}
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-24 h-24 rounded-full flex items-center justify-center"
          style={{
            background: `radial-gradient(circle at 40% 35%, ${activeSystem.color}50, ${activeSystem.color}15)`,
            border: `2px solid ${activeSystem.color}70`,
            boxShadow: `0 0 50px ${activeSystem.color}50, 0 0 100px ${activeSystem.color}20, inset 0 0 30px ${activeSystem.color}20`,
          }}
        >
          <Icon className="w-11 h-11" style={{ color: activeSystem.color, filter: `drop-shadow(0 0 8px ${activeSystem.color})` }} />
        </motion.div>
      </div>

      {/* Floating metric chips — 4 corners */}
      {[
        { label: 'AI Active', sub: '99.9%', pos: 'top-[14%] left-[8%]', delay: 0 },
        { label: 'Optimized', sub: 'Real-time', pos: 'top-[14%] right-[8%]', delay: 0.1 },
        { label: 'Secure', sub: 'AES-256', pos: 'bottom-[20%] left-[6%]', delay: 0.2 },
        { label: 'Live Data', sub: '<10ms', pos: 'bottom-[20%] right-[6%]', delay: 0.3 },
      ].map((chip) => (
        <motion.div
          key={chip.label}
          initial={{ opacity: 0, scale: 0.7, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: chip.delay + 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`absolute ${chip.pos} flex flex-col items-center px-4 py-2.5 rounded-2xl backdrop-blur-xl`}
          style={{
            background: `linear-gradient(135deg, ${activeSystem.color}18, ${activeSystem.color}08)`,
            border: `1px solid ${activeSystem.color}35`,
          }}
        >
          <div className="flex items-center gap-1.5 mb-0.5">
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: activeSystem.color, boxShadow: `0 0 8px ${activeSystem.color}` }} />
            <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: activeSystem.color }}>{chip.label}</span>
          </div>
          <span className="text-[11px] font-bold text-white/60">{chip.sub}</span>
        </motion.div>
      ))}

      {/* Scanning line */}
      <motion.div
        className="absolute left-0 right-0 h-px opacity-30 pointer-events-none"
        style={{ background: `linear-gradient(90deg, transparent, ${activeSystem.color}, transparent)` }}
        animate={{ top: ['10%', '90%', '10%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

export default function HomeBreakdown() {
  const [activeSystem, setActiveSystem] = useState(systems[0]);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section ref={containerRef} className="py-20 lg:py-32 bg-[#0A1E3D] relative overflow-hidden">
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: `radial-gradient(#E8761A 1px, transparent 1px)`, backgroundSize: '50px 50px' }}
      />
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E8761A]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-[#E8761A] font-bold tracking-[0.4em] uppercase text-xs mb-4 block"
          >
            Neural Infrastructure
          </motion.span>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: 80, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: 'var(--font-playfair), serif' }}
              className="text-5xl md:text-7xl font-bold text-white tracking-tighter"
            >
              Your Home,{' '}
              <span className="text-gradient-animate">Intelligent.</span>
            </motion.h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.1fr_1fr] gap-8 items-center">
          {/* Left: System selector cards */}
          <div className="space-y-4">
            {systems.map((system, i) => {
              const Icon = system.icon;
              const isActive = activeSystem.id === system.id;
              return (
                <motion.div
                  key={system.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setActiveSystem(system)}
                  whileHover={{ x: 6 }}
                  className={`relative p-5 rounded-2xl cursor-pointer transition-all duration-500 border overflow-hidden group ${
                    isActive
                      ? 'border-white/20 bg-white/10 backdrop-blur-xl'
                      : 'border-white/5 bg-white/3 hover:bg-white/6 hover:border-white/10'
                  }`}
                >
                  {/* Active left bar */}
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                    style={{ background: system.color }}
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  {/* Shine */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none overflow-hidden rounded-2xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>
                  <div className="flex items-center gap-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500"
                      style={{
                        background: isActive ? `${system.color}30` : 'rgba(255,255,255,0.05)',
                        border: `1px solid ${isActive ? system.color + '50' : 'rgba(255,255,255,0.08)'}`,
                      }}
                    >
                      <Icon className="w-5 h-5 transition-colors duration-300" style={{ color: isActive ? system.color : 'rgba(255,255,255,0.4)' }} />
                    </div>
                    <div>
                      <p className={`font-bold text-sm transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/50'}`}>
                        {system.name}
                      </p>
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-white/40 text-xs mt-1 leading-relaxed"
                        >
                          {system.description}
                        </motion.p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Center: Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-[420px] lg:h-[520px] relative rounded-3xl overflow-hidden border border-white/10"
            style={{ background: 'radial-gradient(ellipse at center, #0f1a2e 0%, #0A1E3D 100%)' }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSystem.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <SmartHomeVisual activeSystem={activeSystem} />
              </motion.div>
            </AnimatePresence>
            {/* Live badge */}
            <div className="absolute top-5 left-5 flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">Live</span>
            </div>
            {/* System name badge */}
            <div
              className="absolute bottom-5 left-1/2 -translate-x-1/2 px-6 py-3 rounded-2xl border backdrop-blur-xl text-sm font-bold text-white whitespace-nowrap"
              style={{ background: `${activeSystem.color}20`, borderColor: `${activeSystem.color}40` }}
            >
              {activeSystem.name}
            </div>
          </motion.div>

          {/* Right: Metrics */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSystem.id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl space-y-6"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: activeSystem.color }} />
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Live Metrics</span>
                </div>
                {activeSystem.metrics.map((m, i) => (
                  <MetricBar key={m.label} {...m} color={activeSystem.color} delay={0.1 + i * 0.15} />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Uptime', value: '99.9%' },
                { label: 'Response', value: '<10ms' },
                { label: 'Devices', value: '48' },
                { label: 'Alerts', value: '0' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.08, duration: 0.6 }}
                  className="p-4 rounded-xl border border-white/8 bg-white/4 text-center"
                >
                  <p className="text-xl font-black text-white">{stat.value}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
