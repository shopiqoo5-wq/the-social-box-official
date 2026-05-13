import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Preloader from './components/Preloader';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import CaseStudyPage from './pages/CaseStudyPage';
import ContactPage from './pages/ContactPage';
import ContactModal from './components/ContactModal';
import { ContactProvider } from './context/ContactContext';

function AppContent() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  // preloader states — only run on home
  const [tvFading, setTvFading]         = useState(false);
  const [preloaderHidden, setPreloaderHidden] = useState(!isHome);
  const [logoState, setLogoState]       = useState('');
  const [isScrolled, setIsScrolled]     = useState(false);
  const [mountHomePage, setMountHomePage] = useState(!isHome);
  const [contentVisible, setContentVisible] = useState(!isHome);

  useEffect(() => {
    if (!isHome) return;

    const timers = [
      setTimeout(() => setTvFading(true),         1800),
      setTimeout(() => setLogoState('reveal'),     2200),
      setTimeout(() => setPreloaderHidden(true),   2400),
      setTimeout(() => setLogoState('move-up'),    3200),
      setTimeout(() => setMountHomePage(true),     3600),
      setTimeout(() => setContentVisible(true),    3900),
    ];
    return () => timers.forEach(clearTimeout);
  }, [isHome]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      {/* Preloader — only on home */}
      {isHome && !preloaderHidden && <Preloader tvFading={tvFading} />}

      {/* Floating logo — only on home, hide when content revealed */}
      {isHome && !contentVisible && (
        <a
          href="/"
          id="main-logo"
          className={`${logoState} ${isScrolled ? 'scrolled' : ''}`}
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        >
          <img src="/assets/logo.png" alt="THE SOCIAL BOX" />
        </a>
      )}

      {/* Navigation — always visible on sub-pages, animated on home */}
      <Navigation isVisible={contentVisible} isHome={isHome} isScrolled={isScrolled} />

      {/* Page routes */}
      <div
        style={{
          opacity: contentVisible ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}
      >
        <Routes>
          <Route path="/" element={mountHomePage ? <HomePage /> : null} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/case-study" element={<CaseStudyPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>

      {/* Contact Modal */}
      <ContactModal />
    </div>
  );
}

function App() {
  return (
    <ContactProvider>
      <AppContent />
    </ContactProvider>
  );
}

export default App;
