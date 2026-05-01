import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import products from '../data/products.json';
import HeroSection from '../components/HeroSection.jsx';
import Controls from '../components/Controls.jsx';
import CategorySection from '../components/CategorySection.jsx';
import Footer from '../components/Footer.jsx';

const ALL_CATEGORIES = [...new Set(products.map((p) => p.category))];

export default function HomePage({ searchQuery }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('default');

  const filtered = useMemo(() => {
    let items = [...products];

    if (searchQuery?.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (p) =>
          p.itemname.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.itemprops.some(
            (prop) =>
              prop.label.toLowerCase().includes(q) ||
              prop.value.toLowerCase().includes(q)
          )
      );
    }

    if (activeCategory !== 'All') {
      items = items.filter((p) => p.category === activeCategory);
    }

    if (sortOrder === 'az') items.sort((a, b) => a.itemname.localeCompare(b.itemname));
    else if (sortOrder === 'za') items.sort((a, b) => b.itemname.localeCompare(a.itemname));

    return items;
  }, [searchQuery, activeCategory, sortOrder]);

  const grouped = useMemo(() => {
    const g = {};
    filtered.forEach((p) => {
      if (!g[p.category]) g[p.category] = [];
      g[p.category].push(p);
    });
    return g;
  }, [filtered]);

  const categoriesToShow = ALL_CATEGORIES.filter(
    (cat) => (activeCategory === 'All' ? true : cat === activeCategory) && grouped[cat]?.length > 0
  );

  return (
    <main>
      <HeroSection totalItems={products.length} categories={ALL_CATEGORIES} />
      <Controls
        categories={ALL_CATEGORIES}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
      />

      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-32 px-4"
          >
            <p style={{ fontFamily: '"Instrument Serif", serif', fontSize: 48, color: 'var(--fg)', marginBottom: 12 }}>
              No results.
            </p>
            <p style={{ color: 'var(--fg-muted)' }}>Try adjusting your search or filter.</p>
          </motion.div>
        ) : (
          <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {categoriesToShow.map((cat) => (
              <CategorySection key={cat} category={cat} products={grouped[cat]} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <Footer totalItems={products.length} />
    </main>
  );
}
