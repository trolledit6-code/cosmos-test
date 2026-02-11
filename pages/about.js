import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, Orbit } from 'lucide-react';

const planetColors = {
  Mercury: { from: '#9ca3af', to: '#6b7280' },
  Venus:   { from: '#fbbf24', to: '#d97706' },
  Earth:   { from: '#3b82f6', to: '#22c55e' },
  Mars:    { from: '#ef4444', to: '#dc2626' },
  Jupiter: { from: '#f59e0b', to: '#b45309' },
  Saturn:  { from: '#eab308', to: '#a16207' },
  Uranus:  { from: '#06b6d4', to: '#0891b2' },
  Neptune: { from: '#6366f1', to: '#4338ca' },
};

export default function About() {
  const router = useRouter();
  const { id } = router.query;
  const [planets, setPlanets] = useState([]);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/planets');
        const data = await res.json();
        setPlanets(data);
        if (id) {
          const found = data.find(p => p._id === id);
          if (found) setSelectedPlanet(found);
          else if (data.length > 0) setSelectedPlanet(data[0]);
        } else if (data.length > 0) {
          setSelectedPlanet(data[0]);
        }
      } catch (error) {
        console.error('Failed to fetch planets:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const handlePlanetClick = (planet) => {
    setSelectedPlanet(planet);
    router.push(`/about?id=${planet._id}`, undefined, { shallow: true });
  };

  const colors = selectedPlanet ? (planetColors[selectedPlanet.name] || { from: '#4f8fff', to: '#a855f7' }) : {};

  return (
    <Layout title={selectedPlanet ? `${selectedPlanet.name} — Cosmos Explorer` : 'About — Cosmos Explorer'}>
      {/* Page header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <Info className="w-5 h-5 text-cyan-400" />
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">Planet Encyclopedia</h2>
        </div>
        <p className="text-gray-600 text-sm max-w-lg">
          Select a planet from the sidebar to explore detailed information about each world in our solar system.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 min-h-[calc(100vh-280px)]">
        {/* Sidebar */}
        <div className="w-full lg:w-64 shrink-0">
          <div className="glass rounded-2xl p-3 lg:sticky lg:top-28">
            <div className="flex items-center gap-2 px-3 py-2 mb-2">
              <Orbit className="w-4 h-4 text-gray-500" />
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">Solar System</span>
            </div>
            <div className="space-y-1">
              {loading ? (
                <div className="px-4 py-3 text-sm text-gray-600">Loading...</div>
              ) : planets.map(planet => {
                const pc = planetColors[planet.name] || { from: '#4f8fff', to: '#a855f7' };
                const active = selectedPlanet?._id === planet._id;
                return (
                  <button
                    key={planet._id}
                    onClick={() => handlePlanetClick(planet)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-3 ${
                      active
                        ? 'bg-white/8 text-white'
                        : 'text-gray-500 hover:text-gray-300 hover:bg-white/3'
                    }`}
                  >
                    <div
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${pc.from}, ${pc.to})`,
                        boxShadow: active ? `0 0 8px ${pc.from}40` : 'none',
                      }}
                    />
                    {planet.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 glass rounded-2xl p-8 lg:p-10 relative overflow-hidden min-h-[500px]">
          {/* Background ambient glow for selected planet */}
          {selectedPlanet && (
            <div
              className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-[120px] opacity-10 pointer-events-none transition-all duration-1000"
              style={{ background: `radial-gradient(circle, ${colors.from}, transparent)` }}
            />
          )}

          <AnimatePresence mode="wait">
            {selectedPlanet ? (
              <motion.div
                key={selectedPlanet._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="relative z-10"
              >
                {/* Header row */}
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <h1
                      className="text-4xl lg:text-5xl font-bold text-gradient mb-2"
                      style={{ backgroundImage: `linear-gradient(135deg, ${colors.from}, ${colors.to})` }}
                    >
                      {selectedPlanet.name}
                    </h1>
                    <div className="flex items-center gap-3">
                      <span
                        className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full border"
                        style={{
                          color: colors.from,
                          borderColor: `${colors.from}30`,
                          backgroundColor: `${colors.from}10`,
                        }}
                      >
                        {selectedPlanet.type || 'Planet'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content grid */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                  {/* Planet image */}
                  <div className="lg:col-span-2 flex justify-center">
                    <div className="relative">
                      <div
                        className="w-48 h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden relative"
                        style={{
                          boxShadow: `0 0 40px ${colors.from}25, 0 0 80px ${colors.from}10`,
                        }}
                      >
                        {selectedPlanet.image ? (
                          <img
                            src={selectedPlanet.image}
                            alt={selectedPlanet.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div
                            className="w-full h-full flex items-center justify-center text-6xl font-bold text-white/20"
                            style={{ background: `linear-gradient(135deg, ${colors.from}, ${colors.to})` }}
                          >
                            {selectedPlanet.name[0]}
                          </div>
                        )}
                        {/* Inner shadow for depth */}
                        <div className="absolute inset-0 rounded-full shadow-[inset_-15px_-15px_40px_rgba(0,0,0,0.6)]" />
                        {/* Glossy highlight */}
                        <div className="absolute top-3 left-6 w-12 h-12 bg-white/10 rounded-full blur-lg" />
                      </div>
                      {/* Orbit ring decoration */}
                      <div className="absolute inset-[-12px] rounded-full border border-white/5" />
                      <div className="absolute inset-[-24px] rounded-full border border-white/[0.02]" />
                    </div>
                  </div>

                  {/* Description and stats */}
                  <div className="lg:col-span-3 space-y-6">
                    <p className="text-base leading-relaxed text-gray-400">
                      {selectedPlanet.description}
                    </p>

                    {/* Stats grid */}
                    <div className="grid grid-cols-2 gap-3">
                      <StatBox label="Distance from Sun" value={selectedPlanet.distance} color={colors.from} />
                      <StatBox label="Diameter" value={selectedPlanet.diameter} color={colors.from} />
                      <StatBox label="Orbit Period" value={selectedPlanet.orbit} color={colors.from} />
                      <StatBox label="Known Moons" value={selectedPlanet.moons} color={colors.from} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="flex h-full items-center justify-center text-gray-600 text-sm">
                {loading ? 'Loading planetary data...' : 'Select a planet to explore.'}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
}

function StatBox({ label, value, color }) {
  return (
    <div className="bg-white/[0.03] p-4 rounded-xl border border-white/5 hover:border-white/10 transition-all duration-300 group">
      <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-600 mb-1.5">{label}</div>
      <div className="text-lg font-bold text-white/80 group-hover:text-white transition-colors">
        {value !== undefined && value !== null ? String(value) : 'N/A'}
      </div>
    </div>
  );
}
