import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const planetColors = {
  Mercury: { from: '#9ca3af', to: '#6b7280', shadow: 'rgba(156,163,175,0.3)' },
  Venus:   { from: '#fbbf24', to: '#d97706', shadow: 'rgba(251,191,36,0.3)' },
  Earth:   { from: '#3b82f6', to: '#22c55e', shadow: 'rgba(59,130,246,0.3)' },
  Mars:    { from: '#ef4444', to: '#dc2626', shadow: 'rgba(239,68,68,0.3)' },
  Jupiter: { from: '#f59e0b', to: '#b45309', shadow: 'rgba(245,158,11,0.3)' },
  Saturn:  { from: '#eab308', to: '#a16207', shadow: 'rgba(234,179,8,0.3)' },
  Uranus:  { from: '#06b6d4', to: '#0891b2', shadow: 'rgba(6,182,212,0.3)' },
  Neptune: { from: '#6366f1', to: '#4338ca', shadow: 'rgba(99,102,241,0.3)' },
};

export default function PlanetCard({ planet }) {
  const colors = planetColors[planet.name] || { from: '#4f8fff', to: '#a855f7', shadow: 'rgba(79,143,255,0.3)' };

  return (
    <Link href={`/about?id=${planet._id}`}>
      <motion.div
        whileHover={{ y: -8 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="glass glass-hover rounded-2xl p-7 cursor-pointer flex flex-col items-center text-center h-full group relative overflow-hidden"
      >
        {/* Ambient glow behind the planet orb */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{ background: `radial-gradient(circle, ${colors.shadow}, transparent)` }}
        />

        {/* Planet orb */}
        <div className="relative mb-6">
          <div
            className="w-28 h-28 rounded-full flex items-center justify-center text-3xl font-bold text-white/90 overflow-hidden relative"
            style={{
              background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
              boxShadow: `0 0 30px ${colors.shadow}, inset -8px -8px 20px rgba(0,0,0,0.3)`,
            }}
          >
            {planet.image ? (
              <img src={planet.image} alt={planet.name} className="w-full h-full object-cover" />
            ) : (
              planet.name.substring(0, 2)
            )}
            {/* Glossy highlight */}
            <div className="absolute top-1 left-2 w-8 h-8 bg-white/20 rounded-full blur-md" />
          </div>
          {/* Orbit ring */}
          <div 
            className="absolute inset-[-8px] rounded-full border border-white/5 group-hover:border-white/10 transition-colors duration-500"
            style={{ animation: 'spin 20s linear infinite' }}
          />
        </div>

        {/* Text content */}
        <h2 className="text-xl font-bold mb-2 text-white/90 group-hover:text-white transition-colors">
          {planet.name}
        </h2>
        <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed mb-4">
          {planet.summary}
        </p>

        {/* Explore link */}
        <div className="mt-auto flex items-center gap-1 text-xs font-medium text-gray-600 group-hover:text-cyan-400 transition-colors duration-300">
          <span>Explore</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </motion.div>
    </Link>
  );
}
