import React from 'react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import { useContact } from '../context/ContactContext';
import Magnetic from './Magnetic';
import MagneticOrbButton from './MagneticOrbButton';
import { Globe } from 'lucide-react';

export default function Footer() {
  const { openContact } = useContact();

  return (
    <footer id="site-footer">
      <div className="footer-overlay">
        <div className="footer-container">
          {/* SECTION 1: THE MISSION CALL */}
          <div className="footer-mission">

              <div className="footer-mission-main">
                <h2 onClick={openContact} className="footer-mission-title group">
                  <span className="title-lets">DROP THE BRIEF</span>
                  <span className="title-talk whitespace-nowrap">WE'LL HANDLE THE REST</span>
                </h2>
              </div>
          </div>

          {/* SECTION 2: DEEP FOOTPRINT */}
          <div className="footer-grid">
            <div className="footer-col">
              <Link
                to="/"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="footer-logo"
              >
                TSB
              </Link>
              <p>
                Engineering the future of social culture through high-performance digital architecture and narrative technology.
              </p>
            </div>

            <div className="footer-col">
              <h4><Globe className="inline-icon" /> Mumbai Coordinate</h4>
              <div className="footer-address">
                Plot 95 - Kala Niketan, Rm 13,<br />
                3rd Flr, Maharshi Karve Rd,<br />
                Marine Lines, Mumbai 400020
              </div>
            </div>

            <div className="footer-col">
              <h4><Globe className="inline-icon" /> Jaipur Coordinate</h4>
              <div className="footer-address">
                TSB Creatives Pvt Ltd,<br />
                401 Alokik Heights, Subhash Marg,<br />
                Ashok Nagar, Jaipur 302001
              </div>
            </div>

            <div className="footer-col">
              <h4>Connect Pipeline</h4>
              <nav className="footer-links">
                <a href="https://instagram.com/thesocialbox.in" target="_blank" rel="noopener noreferrer" className="hover-underline">
                  Instagram
                </a>
                <a href="https://linkedin.com/company/the-social-boxin" target="_blank" rel="noopener noreferrer" className="hover-underline">
                  LinkedIn
                </a>
                <a href="mailto:bd@thesocialbox.in" className="hover-underline">
                  Email Ops
                </a>
              </nav>
            </div>
          </div>

          <div className="footer-bottom">
            <span>ALL RIGHTS RESERVED 2026</span>
            <span className="footer-divider">///</span>

          </div>
        </div>
      </div>
    </footer>
  );
}
