import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard.jsx';

export default function CategorySection({ category, products }) {
  return (
    <section className="mb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <motion.h2
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          style={{ fontFamily: '"Instrument Serif", serif', fontSize: 28, color: 'var(--fg)', whiteSpace: 'nowrap' }}
        >
          {category}
        </motion.h2>
        <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 12, color: 'var(--fg-muted)' }}>
          {products.length} item{products.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((product, i) => (
          <ProductCard key={product.itemname} product={product} index={i} />
        ))}
      </div>
    </section>
  );
}
