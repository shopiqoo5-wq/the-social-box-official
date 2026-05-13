import React, { Suspense, lazy, useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import ContactModal from './components/ContactModal';
import CustomCursor from './components/CustomCursor';
import GlobalScene from './components/GlobalScene';
import Footer from './components/Footer';
import { ContactProvider } from './context/ContactContext';

// High-fidelity page lazy loading
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const CaseStudyPage = lazy(() => import('./pages/CaseStudyPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const navbarRef = useRef(null);

  // Manual scroll restoration
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <ContactProvider>
      <div className="bg-black text-white selection:bg-[#FFC107] selection:text-black min-h-screen relative">
        <ScrollToTop />
        <CustomCursor />
        
        {/* Navigation is persistent and globally standardized */}
        <Navigation ref={navbarRef} />
        
        <ContactModal />
        
        {/* Persistent Cinematic Backdrop */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <GlobalScene />
        </div>

        <main className="relative z-10">
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<HomePage navbarRef={navbarRef} />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/case-studies" element={<CaseStudyPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
      </div>
    </ContactProvider>
  );
}
