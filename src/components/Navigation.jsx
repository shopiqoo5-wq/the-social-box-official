import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import Magnetic from './Magnetic';

const Navigation = React.forwardRef((props, ref) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'auto';
  }, [location]);

  const navLinks = [
    { name: 'ABOUT', path: '/about' },
    { name: 'SERVICES', path: '/services' },
    { name: 'CASE STUDIES', path: '/case-studies' },
    { name: 'CONTACT', path: '/contact' },
  ];

  return (
    <header
      ref={ref}
      id="site-header"
      className={`fixed w-full top-0 z-[100] transition-all duration-700 ${scrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'menu-open' : ''}`}
    >
      <div className="header-container">
        {/* Mobile Command Toggle */}
        <button 
          className="lg:hidden relative z-[110] p-2 text-[#FFC107] transition-all"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>

        {/* Brand Icon - Left Anchor */}
        <Link to="/" className="nav-brand-logo">
          <img src="/assets/abou_us_imagepng.png" alt="The Social Box" className="nav-box-icon" />
        </Link>

        {/* Center Logo - Always Visible & Persistent */}
        <div className="header-center">
          <Link to="/" className="nav-logo-static">
            <img src="/assets/logo.png" alt="THE SOCIAL BOX" />
          </Link>
        </div>

        {/* Desktop Menu - High Fidelity Links */}
        <nav className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <div className="nav-section left">
            <Link to="/about" className="nav-link">
              <span className="nav-text">ABOUT</span>
            </Link>
            <Link to="/services" className="nav-link">
              <span className="nav-text">SERVICES</span>
            </Link>
          </div>

          <div className="nav-section right">
            <Link to="/case-studies" className="nav-link">
              <span className="nav-text">CASE STUDIES</span>
            </Link>
            <Link to="/contact" className="nav-link">
              <span className="nav-text">CONTACT</span>
            </Link>
            
            {/* CTA Button from Redesign */}
            <div className="hidden lg:block ml-8">
              <Magnetic>
                <button className="group relative px-8 py-2.5 bg-white text-black rounded-full font-black text-[10px] uppercase tracking-[0.2em] transition-all overflow-hidden active:scale-95">
                  <div className="absolute inset-0 bg-[#FFC107] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                  <span className="relative z-10 flex items-center gap-2">
                    ACCESS <ArrowRight size={14} />
                  </span>
                </button>
              </Magnetic>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
});

export default Navigation;
