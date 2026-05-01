import React from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';

export default function Controls({ categories, activeCategory, onCategoryChange, sortOrder, onSortChange }) {
  const all = ['All', ...categories];

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {all.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="pill-btn"
              style={activeCategory === cat ? {
                background: 'var(--accent)',
                color: 'var(--accent-fg)',
                borderColor: 'var(--accent)',
                fontWeight: 600,
              } : {}}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <SlidersHorizontal size={14} style={{ color: 'var(--fg-muted)' }} />
          <select
            value={sortOrder}
            onChange={(e) => onSortChange(e.target.value)}
            className="text-sm rounded-full px-3 py-1.5 outline-none cursor-pointer"
            style={{
              background: 'var(--bg-card)',
              color: 'var(--fg)',
              border: '1px solid var(--border)',
              fontFamily: 'Outfit, sans-serif',
            }}
          >
            <option value="default">Default</option>
            <option value="az">A → Z</option>
            <option value="za">Z → A</option>
          </select>
        </div>
      </div>
    </div>
  );
}
