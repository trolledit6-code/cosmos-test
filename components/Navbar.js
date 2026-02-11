import Link from 'next/link';
import { useRouter } from 'next/router';
import { Rocket, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const isActive = (href) => {
    if (href === '/') return router.pathname === '/';
    return router.pathname.startsWith(href);
  };

  return (
    <nav className="fixed w-full z-50 top-0 left-0">
      <div className="glass border-t-0 border-l-0 border-r-0 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Rocket className="w-7 h-7 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
              <div className="absolute inset-0 blur-md bg-cyan-400/30 group-hover:bg-cyan-300/40 transition-colors rounded-full"></div>
            </div>
            <span className="text-xl font-bold tracking-[0.2em] text-white/90 group-hover:text-white transition-colors">
              COSMOS
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive(href)
                    ? 'text-white bg-white/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-gray-300 hover:text-white p-2"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t-0 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-2">
              {links.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive(href)
                      ? 'text-white bg-white/10'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
