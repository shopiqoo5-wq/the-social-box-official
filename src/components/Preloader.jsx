import React, { useState, useEffect } from 'react';
import { Instagram, Youtube, Facebook, Linkedin } from 'lucide-react';

const XLogo = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.007 4.25H5.078z" />
  </svg>
);

const icons = [Instagram, Youtube, XLogo, Facebook, Linkedin];

const Preloader = ({ tvFading }) => {
  const [iconIndex, setIconIndex] = useState(0);

  useEffect(() => {
    if (tvFading) return;
    
    // Cycle through icons every 120ms for a rapid-fire, high-energy effect
    const interval = setInterval(() => {
      setIconIndex((prev) => (prev + 1) % icons.length);
    }, 120);
    
    return () => clearInterval(interval);
  }, [tvFading]);

  return (
    <div id="preloader" className="transition-colors duration-1000">
      <div className="animation-wrapper relative flex justify-center items-center">
        {icons.map((Icon, index) => (
          <Icon 
            key={index}
            strokeWidth={1.5}
            className={`absolute w-24 h-24 md:w-32 md:h-32 text-[#FFC107] drop-shadow-[0_0_40px_rgba(255,193,7,0.8)] will-change-transform
              ${index === iconIndex && !tvFading ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-90 blur-sm'}
              ${tvFading ? 'scale-[2.5] opacity-0 blur-xl duration-700 ease-out' : 'duration-[100ms]'} transition-all
            `}
          />
        ))}
      </div>
    </div>
  );
};

export default Preloader;
