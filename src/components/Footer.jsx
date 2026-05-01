import React from 'react';

export default function Footer({ totalItems }) {
  return (
    <footer className="mt-24 py-10 px-4 sm:px-6 lg:px-8" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold"
            style={{ background: 'var(--accent)', color: 'var(--accent-fg)', fontFamily: '"JetBrains Mono", monospace' }}
          >
            CH
          </div>
          <span style={{ fontFamily: '"Instrument Serif", serif', fontSize: 18, color: 'var(--fg)' }}>
            CatalogHub
          </span>
        </div>
        <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 12, color: 'var(--fg-muted)' }}>
          {totalItems} items · 4 categories · Frontend Assignment
        </p>
      </div>
    </footer>
  );
}
