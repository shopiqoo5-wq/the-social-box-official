import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Magnetic from './Magnetic';
import { useContact } from '../context/ContactContext';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { openContact } = useContact();

  useEffect(() => {
    const handleScroll = () => {
      // Adjusted for smooth transition after Hero Section
      setScrolled(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Impact", path: "/impact" },
    { name: "Archive", path: "/case-studies" },
  ];

  return (
    <nav className={`fixed w-full top-0 z-[100] transition-all duration-1000 ease-out
      ${scrolled ? 'py-4 translate-y-0 opacity-100' : 'py-10 translate-y-[-100%] opacity-0 pointer-events-none'}`}>
      
      <div className={`mx-4 md:mx-14 px-8 md:px-12 py-5 rounded-full border transition-all duration-1000 flex justify-between items-center max-w-screen-2xl xl:mx-auto relative overflow-hidden group/nav
        ${scrolled ? 'bg-black/40 backdrop-blur-3xl border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.5)] scale-[1.02]' : 'bg-transparent border-transparent'}`}>
        
        {/* Cinematic Backdrop Glow (Visible on Scroll) */}
        <div className={`absolute inset-0 bg-gradient-to-r from-[#E2FF00]/5 via-transparent to-transparent opacity-0 group-hover/nav:opacity-100 transition-opacity duration-1000 ${scrolled ? 'block' : 'hidden'}`}></div>

        <Link 
          to="/" 
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setIsMobileMenuOpen(false);
          }}
          className="font-space text-2xl md:text-3xl tracking-tighter font-black flex items-center gap-3 relative z-50 group/logo"
        >
          <div className="w-8 h-8 rounded-full border-2 border-[#E2FF00] flex items-center justify-center group-hover/logo:bg-[#E2FF00] transition-all">
            <div className="w-2 h-2 bg-[#E2FF00] rounded-full group-hover/logo:bg-black"></div>
          </div>
          <span className="text-white uppercase group-hover/logo:tracking-widest transition-all duration-700">THE SOCIAL BOX</span>
        </Link>
        
        {/* Desktop Menu - High Fidelity Architecture */}
        <div className="hidden lg:flex gap-16 text-[10px] font-black tracking-[0.5em] uppercase relative z-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`transition-all duration-500 relative py-2 group/link
                ${location.pathname === link.path ? 'text-[#E2FF00]' : 'text-zinc-500 hover:text-white'}`}
            >
              <span className="flex items-center gap-2">
                <span className={`w-1 h-1 rounded-full bg-[#E2FF00] transition-all duration-500 ${location.pathname === link.path ? 'scale-100 opacity-100' : 'scale-0 opacity-0 group-hover/link:scale-100 group-hover/link:opacity-100'}`}></span>
                {link.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Global Access Interface */}
        <div className="hidden lg:block relative z-10">
          <Magnetic>
             <button 
              onClick={openContact}
              className="group relative px-10 py-3.5 bg-white text-black rounded-full font-black text-[10px] uppercase tracking-[0.4em] transition-all overflow-hidden active:scale-95"
             >
                <div className="absolute inset-0 bg-[#E2FF00] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                <span className="relative z-10 flex items-center gap-4">
                  SOCIAL ACCESS 
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
            </button>
          </Magnetic>
        </div>

        {/* Mobile Command Toggle */}
        <button 
          className="lg:hidden relative z-50 p-2 text-[#E2FF00] hover:scale-110 active:scale-90 transition-all"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-8 h-8" strokeWidth={3} /> : <Menu className="w-8 h-8" strokeWidth={3} />}
        </button>
      </div>

      {/* Narrative Portal: Full-Screen Overlay */}
      <div className={`fixed inset-0 bg-black/98 backdrop-blur-[100px] ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'} transition-all duration-[1.2s] ease-[cubic-bezier(0.85,0,0.15,1)] flex flex-col justify-center items-center h-screen z-40`}>
         <div className="flex flex-col gap-16 text-center text-6xl md:text-9xl font-space tracking-tighter uppercase font-black italic">
          {navLinks.map((link, i) => (
            <Link 
              key={link.name} 
              to={link.path} 
              onClick={() => setIsMobileMenuOpen(false)} 
              className={`group/mob relative hover:text-[#E2FF00] transition-all duration-700 hover:scale-110 px-8 ${location.pathname === link.path ? 'text-[#E2FF00]' : 'text-zinc-800'}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className="relative z-10">{link.name}</span>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] opacity-0 group-hover/mob:opacity-[0.03] pointer-events-none transition-opacity duration-700">
                {link.name}
              </div>
            </Link>
          ))}
        </div>
        <div className="absolute bottom-20 flex gap-12 text-[10px] font-black tracking-[0.6em] uppercase text-zinc-600">
           <span>Engineered for Impact</span>
           <span className="text-[#E2FF00] animate-pulse">•</span>
           <span>Mumbai — Global</span>
        </div>
      </div>
    </nav>
  );
}
