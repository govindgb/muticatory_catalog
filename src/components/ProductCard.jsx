import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { slugify } from '../lib/slugify.js';

export default function ProductCard({ product, index }) {
  const [imgError, setImgError] = useState(false);
  const slug = slugify(product.itemname);
  const firstProp = product.itemprops[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
      layout
    >
      <Link to={`/item/${slug}`} style={{ textDecoration: 'none', display: 'block' }}>
        <div
          className="card overflow-hidden group"
          style={{ ':hover': { transform: 'translateY(-2px)' } }}
        >
          {/* Image */}
          <div className="relative overflow-hidden" style={{ height: 200, background: 'var(--border)' }}>
            {!imgError ? (
              <img
                src={product.image}
                alt={product.itemname}
                onError={() => setImgError(true)}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span style={{ fontFamily: 'monospace', fontSize: 48, opacity: 0.15, color: 'var(--fg)' }}>?</span>
              </div>
            )}
            <div className="absolute top-3 left-3">
              <span className="tag">{product.category}</span>
            </div>
            <div
              className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
              style={{ background: 'var(--accent)', transform: 'translateX(4px)' }}
            >
              <ArrowUpRight size={13} style={{ color: 'var(--accent-fg)' }} />
            </div>
          </div>

          {/* Body */}
          <div className="p-4">
            <h3
              className="mb-1 leading-tight"
              style={{ fontFamily: '"Instrument Serif", serif', fontSize: 18, color: 'var(--fg)' }}
            >
              {product.itemname}
            </h3>
            {firstProp && (
              <div className="flex items-center gap-2 mt-2">
                <span style={{ fontSize: 12, fontFamily: '"JetBrains Mono", monospace', color: 'var(--fg-muted)' }}>
                  {firstProp.label}
                </span>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--fg)' }}>
                  {firstProp.value}
                </span>
              </div>
            )}
            <div className="flex gap-1 mt-3">
              {product.itemprops.slice(0, 4).map((_, i) => (
                <div
                  key={i}
                  className="h-1 rounded-full flex-1"
                  style={{ background: i === 0 ? 'var(--accent)' : 'var(--border)' }}
                />
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
