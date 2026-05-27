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

const icons = [
  { Component: Instagram, color: '#E1306C', shadow: 'rgba(225,48,108,0.8)' },
  { Component: Youtube, color: '#FF0000', shadow: 'rgba(255,0,0,0.8)' },
  { Component: XLogo, color: '#FFFFFF', shadow: 'rgba(255,255,255,0.8)' },
  { Component: Facebook, color: '#1877F2', shadow: 'rgba(24,119,242,0.8)' },
  { Component: Linkedin, color: '#0A66C2', shadow: 'rgba(10,102,194,0.8)' }
];

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
        {icons.map(({ Component, color, shadow }, index) => (
          <Component 
            key={index}
            strokeWidth={1.5}
            style={{ 
              color: color, 
              filter: `drop-shadow(0 0 40px ${shadow})` 
            }}
            className={`absolute w-24 h-24 md:w-32 md:h-32 will-change-transform
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
