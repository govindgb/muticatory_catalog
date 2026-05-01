import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import HomePage from './pages/HomePage.jsx';
import DetailPage from './pages/DetailPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

function AppRoutes({ searchQuery, setSearchQuery }) {
  const location = useLocation();

  return (
    <>
      <Navbar onSearch={setSearchQuery} searchQuery={searchQuery} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage searchQuery={searchQuery} />} />
          <Route path="/item/:slug" element={<DetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
      <ScrollToTop />
    </>
  );
}

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <BrowserRouter>
      <AppRoutes searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
    </BrowserRouter>
  );
}
