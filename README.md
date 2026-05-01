# CatalogHub — Dynamic Multi-Category Catalog

Frontend Developer Assignment built with React + Vite + Tailwind CSS + Framer Motion.

---

## 🚀 Getting Started

```bash
npm install
npm run dev       # dev server → http://localhost:5173
npm run build     # production build → /dist
npm run preview   # preview the production build
```

---

## 📁 Project Structure

```
src/
├── data/
│   └── products.json          # Bundled JSON data source
├── lib/
│   └── slugify.js             # URL slug helper + findBySlug
├── hooks/
│   └── useTheme.js            # Dark/light theme (localStorage)
├── components/
│   ├── Navbar.jsx             # Fixed navbar — search + theme toggle
│   ├── HeroSection.jsx        # Animated landing hero
│   ├── Controls.jsx           # Category pills + sort dropdown
│   ├── ProductCard.jsx        # Item card with hover effects
│   ├── CategorySection.jsx    # Grouped category section with header
│   ├── ScrollToTop.jsx        # Floating scroll-to-top button
│   └── Footer.jsx             # Site footer
├── pages/
│   ├── HomePage.jsx           # Catalog (search, filter, sort, grouped)
│   ├── DetailPage.jsx         # Item detail + dynamic specs + related
│   └── NotFoundPage.jsx       # 404 fallback
├── App.jsx                    # BrowserRouter + Routes + global state
├── main.jsx                   # ReactDOM entry point
└── index.css                  # CSS variables + Tailwind base layers
```

---

## ✅ Features

- **Dynamic rendering** — all `itemprops` rendered from JSON, zero hardcoded fields
- **Category filter** — All / Cars / Bikes / Phones / Computers
- **Search** — filters by name, category, label, or value
- **Sort** — Default / A→Z / Z→A
- **Dark / Light mode** — persisted to localStorage
- **Detail page** — full spec grid + related items
- **Responsive** — mobile, tablet, desktop
- **Framer Motion** — stagger cards, page transitions, hover effects
- **Image fallback** — graceful placeholder on broken images
- **Scroll to top** — appears after 400px scroll

---

## 🛠 Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| Vite 5 | Build tool |
| React Router v6 | SPA routing |
| Framer Motion | Animations |
| Tailwind CSS 3 | Utility styling |
| CSS Variables | Theming (dark/light) |
| Lucide React | Icons |
| Google Fonts | Instrument Serif + Outfit + JetBrains Mono |
