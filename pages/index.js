import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import PlanetCard from '../components/PlanetCard';
import { motion } from 'framer-motion';
import { Sparkles, Globe } from 'lucide-react';

export default function Home() {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlanets() {
      try {
        const res = await fetch('/api/planets');
        const data = await res.json();
        setPlanets(data);
      } catch (error) {
        console.error('Failed to fetch planets:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchPlanets();
  }, []);

  return (
    <Layout title="Cosmos Explorer — Journey Through the Solar System">
      {/* Hero section */}
      <section className="text-center mb-20 pt-8">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative inline-block"
        >
          {/* Decorative badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-400 mb-8"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Exploring 8 planets in our solar system</span>
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-8xl font-extrabold leading-[0.95] mb-8"
        >
          <span className="text-gradient bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400">
            Explore the
          </span>
          <br />
          <span className="text-gradient bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300">
            Cosmos
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-gray-500 max-w-lg mx-auto leading-relaxed"
        >
          Journey through our solar system and discover the wonders that orbit our Sun.
        </motion.p>
      </section>

      {/* Section header */}
      <div className="flex items-center gap-3 mb-8">
        <Globe className="w-5 h-5 text-cyan-400" />
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
          The Planets
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
      </div>

      {/* Planet grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-2 border-transparent border-t-cyan-400 animate-spin" />
            <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-purple-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
          </div>
        </div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.07 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-16"
        >
          {planets.map((planet, index) => (
            <motion.div
              key={planet._id || index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
            >
              <PlanetCard planet={planet} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </Layout>
  );
}
