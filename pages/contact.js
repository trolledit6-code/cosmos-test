import { useState } from 'react';
import Layout from '../components/Layout';
import { Send, CheckCircle, AlertCircle, Loader, MessageSquare, User, Mail, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <Layout title="Contact — Cosmos Explorer">
      <div className="max-w-2xl mx-auto">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-400 mb-6">
            <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
            <span>We&apos;d love to hear from you</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
              Contact Mission Control
            </span>
          </h1>
          <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
            Have suggestions, questions, or comments? Send us a transmission and we&apos;ll get back to you.
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass rounded-2xl p-8 md:p-10 relative overflow-hidden"
        >
          {/* Ambient glows */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-500/8 rounded-full blur-[100px] pointer-events-none" />

          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative z-10 py-8 text-center flex flex-col items-center"
            >
              <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
                <CheckCircle className="w-10 h-10 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Transmission Received!</h3>
              <p className="text-gray-500 mb-8 text-sm max-w-sm">
                Thank you for your feedback. Our team will review your message and get back to you shortly.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
              {/* Name field */}
              <div>
                <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-gray-500 mb-2.5">
                  <User className="w-3.5 h-3.5" />
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full bg-white/[0.03] border border-white/8 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/30 transition-all hover:bg-white/[0.05] hover:border-white/12"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              {/* Email field */}
              <div>
                <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-gray-500 mb-2.5">
                  <Mail className="w-3.5 h-3.5" />
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  className="w-full bg-white/[0.03] border border-white/8 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/30 transition-all hover:bg-white/[0.05] hover:border-white/12"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              {/* Message field */}
              <div>
                <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-gray-500 mb-2.5">
                  <FileText className="w-3.5 h-3.5" />
                  Your Message
                </label>
                <textarea
                  rows="5"
                  required
                  className="w-full bg-white/[0.03] border border-white/8 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/30 transition-all hover:bg-white/[0.05] hover:border-white/12 resize-none"
                  placeholder="Your suggestions, questions, or comments..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              {/* Error message */}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 text-sm text-red-400 bg-red-500/5 border border-red-500/15 p-4 rounded-xl"
                >
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>Transmission failed. Please check your connection and try again.</span>
                </motion.div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full mt-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 py-4 rounded-xl font-semibold text-sm shadow-lg shadow-purple-900/20 transition-all flex justify-center items-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    <span>Transmitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    <span>Transmit Message</span>
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </Layout>
  );
}
