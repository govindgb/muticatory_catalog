import React from 'react';
import { motion } from 'framer-motion';

export default function HeroSection({ totalItems, categories }) {
  return (
    <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-2 flex-wrap mb-5"
      >
        <span className="tag">{totalItems} Items</span>
        <span className="tag">{categories.length} Categories</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="leading-tight mb-5"
        style={{
          fontFamily: '"Instrument Serif", serif',
          fontSize: 'clamp(40px, 7vw, 80px)',
          color: 'var(--fg)',
        }}
      >
        The{' '}
        <span style={{ fontStyle: 'italic', color: 'var(--accent)', WebkitTextStroke: '1px var(--fg)' }}>
          Multi&#8209;Category
        </span>
        <br />
        Catalog.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="text-base sm:text-lg max-w-xl leading-relaxed"
        style={{ color: 'var(--fg-muted)' }}
      >
        Explore the world's most iconic Cars, Bikes, Phones, and Computers — all in one place.
      </motion.p>
    </section>
  );
}
