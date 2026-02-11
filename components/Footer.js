import Link from 'next/link';
import { Rocket, Github, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative mt-20">
      {/* Top gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      <div className="glass border-t-0 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Rocket className="w-5 h-5 text-cyan-400" />
                <span className="text-lg font-bold tracking-[0.15em] text-white/80">COSMOS</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                Explore the universe, one planet at a time. An interactive guide to the wonders of our solar system.
              </p>
            </div>

            {/* Navigation */}
            <div className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">Navigate</h4>
              <div className="flex flex-col gap-2">
                <Link href="/" className="text-sm text-gray-500 hover:text-white transition-colors w-fit">Home</Link>
                <Link href="/about" className="text-sm text-gray-500 hover:text-white transition-colors w-fit">About</Link>
                <Link href="/contact" className="text-sm text-gray-500 hover:text-white transition-colors w-fit">Contact</Link>
              </div>
            </div>

            {/* Info */}
            <div className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">Sources</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Planet data sourced from NASA and Wikipedia. Images courtesy of NASA/JPL.
              </p>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-600">
              &copy; {new Date().getFullYear()} Cosmos Explorer. All rights reserved.
            </p>
            <p className="text-xs text-gray-600">
              Built with Next.js &middot; Tailwind CSS &middot; MongoDB
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
