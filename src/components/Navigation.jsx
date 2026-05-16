import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation = ({ isVisible, isHome, isScrolled: parentScrolled }) => {
  const [localScrolled, setLocalScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const onHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setLocalScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
    document.body.style.overflow = 'auto';
  }, [location]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    document.body.style.overflow = !menuOpen ? 'hidden' : 'auto';
  };

  const scrolledState = parentScrolled !== undefined ? parentScrolled : localScrolled;
  const visible = !onHome || isVisible;

  return (
    <header
      id="site-header"
      className={`${visible ? 'visible' : ''} ${scrolledState ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}
    >
      <div className="header-container">
        {/* Mobile Menu Toggle */}
        <button className="mobile-menu-toggle" onClick={toggleMenu} aria-label="Toggle Menu">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Brand Icon - Left Anchor (Standalone) */}
        <Link 
          to="/about" 
          className="nav-brand-logo group/brand flex items-center no-underline"
        >
          <img src="/assets/abou_us_imagepng.png" alt="The Social Box" className="nav-box-icon" />
          <span className="max-w-0 opacity-0 overflow-hidden group-hover/brand:max-w-[120px] group-hover/brand:opacity-100 group-hover/brand:ml-4 transition-all duration-700 ease-in-out font-heading font-black text-[10px] tracking-[0.3em] text-[var(--gold)] whitespace-nowrap">
            ABOUT US
          </span>
        </Link>

        {/* Center Logo - Center Anchor */}
        <div className="header-center">
          <Link to="/" className="nav-logo-static">
            <img src="/assets/logo.png" alt="THE SOCIAL BOX" />
          </Link>
        </div>

        {/* Navigation Wrapper - Links Only */}
        <nav className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <div className="nav-section left">
            <Link to="/about" className="nav-link desktop-about-hide">
              <span className="nav-text">ABOUT</span>
            </Link>
            <Link to="/services" className="nav-link">
              <span className="nav-text">SERVICES</span>
            </Link>
          </div>

          <div className="nav-section right">
            <Link to="/case-study" className="nav-link">
              <span className="nav-text">CASE STUDY</span>
            </Link>
            <Link to="/contact" className="nav-link">
              <span className="nav-text">CONTACT</span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
