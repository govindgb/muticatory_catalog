import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import products from '../data/products.json';
import { findBySlug, slugify } from '../lib/slugify.js';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function DetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = findBySlug(products, slug);
  const [imgError, setImgError] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <p style={{ fontFamily: '"Instrument Serif", serif', fontSize: 64, color: 'var(--fg)' }}>404</p>
        <p style={{ color: 'var(--fg-muted)' }}>Item not found.</p>
        <Link
          to="/"
          className="px-5 py-2 rounded-full text-sm font-semibold"
          style={{ background: 'var(--accent)', color: 'var(--accent-fg)', textDecoration: 'none' }}
        >
          ← Back to Catalog
        </Link>
      </div>
    );
  }

  const related = products
    .filter((p) => p.category === product.category && p.itemname !== product.itemname)
    .slice(0, 3);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
    >
      {/* Back */}
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-8 text-sm group"
        style={{ background: 'none', border: 'none', color: 'var(--fg-muted)', cursor: 'pointer', fontFamily: 'Outfit, sans-serif' }}
      >
        <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
        Back
      </motion.button>

      {/* Main grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16"
      >
        {/* Image */}
        <motion.div variants={itemVariants} className="relative">
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid var(--border)', aspectRatio: '4/3', background: 'var(--border)' }}
          >
            {!imgError ? (
              <img
                src={product.image}
                alt={product.itemname}
                onError={() => setImgError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span style={{ fontFamily: 'monospace', fontSize: 64, opacity: 0.1, color: 'var(--fg)' }}>?</span>
              </div>
            )}
          </div>
          {/* Category badge */}
          <div
            className="absolute -bottom-4 left-6 flex items-center gap-2 px-4 py-2 rounded-full shadow-lg"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            <div className="w-2 h-2 rounded-full" style={{ background: 'var(--accent)' }} />
            <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 12, color: 'var(--fg)' }}>
              {product.category}
            </span>
          </div>
        </motion.div>

        {/* Details */}
        <motion.div variants={itemVariants} className="pt-2">
          <motion.h1
            variants={itemVariants}
            className="leading-tight mb-8"
            style={{ fontFamily: '"Instrument Serif", serif', fontSize: 'clamp(32px, 5vw, 52px)', color: 'var(--fg)' }}
          >
            {product.itemname}
          </motion.h1>

          <p
            className="uppercase tracking-widest mb-4"
            style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: 'var(--fg-muted)' }}
          >
            Specifications
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {product.itemprops.map((prop, i) => (
              <motion.div
                key={prop.label}
                variants={itemVariants}
                className="p-4 rounded-xl"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
              >
                <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: 'var(--fg-muted)', marginBottom: 4 }}>
                  {prop.label}
                </p>
                <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--fg)' }}>{prop.value}</p>
                {i === 0 && (
                  <div className="mt-2 w-8 h-0.5 rounded-full" style={{ background: 'var(--accent)' }} />
                )}
              </motion.div>
            ))}
          </div>

          <div
            className="inline-flex items-center gap-3 px-4 py-3 rounded-xl"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            <span style={{ fontFamily: '"Instrument Serif", serif', fontSize: 36, color: 'var(--accent)' }}>
              {product.itemprops.length}
            </span>
            <span style={{ fontSize: 14, color: 'var(--fg-muted)' }}>listed specifications</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Related */}
      {related.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <div className="flex items-center gap-4 mb-6">
            <h2 style={{ fontFamily: '"Instrument Serif", serif', fontSize: 24, color: 'var(--fg)', whiteSpace: 'nowrap' }}>
              More {product.category}
            </h2>
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map((rel) => (
              <Link
                key={rel.itemname}
                to={`/item/${slugify(rel.itemname)}`}
                style={{ textDecoration: 'none' }}
                className="group card overflow-hidden"
              >
                <div className="overflow-hidden" style={{ height: 160, background: 'var(--border)' }}>
                  <img
                    src={rel.image}
                    alt={rel.itemname}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
                <div className="p-3">
                  <p style={{ fontFamily: '"Instrument Serif", serif', fontSize: 16, color: 'var(--fg)', marginBottom: 4 }}>
                    {rel.itemname}
                  </p>
                  {rel.itemprops[0] && (
                    <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: 'var(--fg-muted)' }}>
                      {rel.itemprops[0].label}: {rel.itemprops[0].value}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </motion.section>
      )}
    </motion.main>
  );
}
