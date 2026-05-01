import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFoundPage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 text-center"
    >
      <h1 style={{ fontFamily: '"Instrument Serif", serif', fontSize: 96, color: 'var(--fg)' }}>404</h1>
      <p style={{ fontSize: 18, color: 'var(--fg-muted)' }}>Page not found.</p>
      <Link
        to="/"
        className="px-5 py-2 rounded-full text-sm font-semibold"
        style={{ background: 'var(--accent)', color: 'var(--accent-fg)', textDecoration: 'none' }}
      >
        ← Back to Catalog
      </Link>
    </motion.main>
  );
}
