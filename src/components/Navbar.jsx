import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Search, X } from 'lucide-react';
import { useTheme } from '../hooks/useTheme.js';

export default function Navbar({ onSearch, searchQuery }) {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const clearSearch = () => {
    onSearch?.('');
    setSearchOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? 'var(--bg-card)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--border)' : 'none',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" style={{ textDecoration: 'none' }} className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
              style={{
                background: 'var(--accent)',
                color: 'var(--accent-fg)',
                fontFamily: '"JetBrains Mono", monospace',
              }}
            >
              CH
            </div>
            <span
              className="text-xl"
              style={{ fontFamily: '"Instrument Serif", serif', color: 'var(--fg)' }}
            >
              CatalogHub
            </span>
          </Link>

          <div className="flex items-center gap-2">
            {isHome && (
              <AnimatePresence mode="wait">
                {searchOpen ? (
                  <motion.div
                    key="open"
                    initial={{ width: 36, opacity: 0 }}
                    animate={{ width: 220, opacity: 1 }}
                    exit={{ width: 36, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="flex items-center gap-2 rounded-full px-3 py-1.5"
                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                  >
                    <Search size={14} style={{ color: 'var(--fg-muted)', flexShrink: 0 }} />
                    <input
                      autoFocus
                      type="text"
                      placeholder="Search items..."
                      value={searchQuery}
                      onChange={(e) => onSearch?.(e.target.value)}
                      className="bg-transparent outline-none text-sm flex-1"
                      style={{ color: 'var(--fg)', fontFamily: 'Outfit, sans-serif' }}
                    />
                    <button onClick={clearSearch}>
                      <X size={13} style={{ color: 'var(--fg-muted)' }} />
                    </button>
                  </motion.div>
                ) : (
                  <motion.button
                    key="closed"
                    className="icon-btn"
                    onClick={() => setSearchOpen(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Search size={15} />
                  </motion.button>
                )}
              </AnimatePresence>
            )}

            <motion.button
              className="icon-btn"
              onClick={toggle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ color: 'var(--accent)' }}
            >
              <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <motion.span
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    style={{ display: 'flex' }}
                  >
                    <Sun size={15} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    style={{ display: 'flex', color: 'var(--fg-muted)' }}
                  >
                    <Moon size={15} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
