import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import GlobalScene from './components/GlobalScene';
import { ContactProvider } from './context/ContactContext';
import ContactModal from './components/ContactModal';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Manual scroll restoration
if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual';
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// High-fidelity page lazy loading
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ImpactPage = lazy(() => import('./pages/ImpactPage'));
const CaseStudyPage = lazy(() => import('./pages/CaseStudyPage'));

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Initialize Lenis Smooth Scroll for "Butter Smooth" momentum
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.body.style.transform ? "transform" : "fixed"
    });

    // Sync with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const gsapTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(gsapTicker);

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      lenis.destroy();
      gsap.ticker.remove(gsapTicker);
      ScrollTrigger.getAll().forEach(t => t.kill());
      ScrollTrigger.clearScrollMemory();
    };
  }, []);

  return (
    <ContactProvider>
      <div className="bg-black text-white selection:bg-[#FFC107] selection:text-black min-h-screen relative">
        <ScrollToTop />
        <CustomCursor />
        <Navigation />
        <ContactModal />
        
        {/* Persistent Cinematic Backdrop */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <GlobalScene />
        </div>

        {/* Cinematic Grain Overlay */}
        <div className="grain-overlay pointer-events-none opacity-5"></div>

        {/* Narratives Layer */}
        <main className="relative z-10">

          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/impact" element={<ImpactPage />} />
              <Route path="/case-studies" element={<CaseStudyPage />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
      </div>
    </ContactProvider>
  );
}
