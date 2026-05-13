import React, { useState, useEffect, useRef } from 'react';

// Custom Hook for Scroll Reveal Animation
const useScrollReveal = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -100px 0px' }
    );

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return [ref, isVisible];
};

// Reusable Reveal Component - Optimized for "Buttery Smooth" transitions
const Reveal = ({ children, delay = 0, className = "", type = "fade-up" }) => {
  const [ref, isVisible] = useScrollReveal();
  
  // High-End Studio Easing (ExpoOut)
  const baseClasses = "transition-all duration-[1.4s] transform-gpu will-change-transform";
  
  const getVariantStyles = () => {
    switch (type) {
      case "fade-up":
        return isVisible ? "opacity-100 translate-y-0 blur-none" : "opacity-0 translate-y-16 blur-sm";
      case "fade-in":
        return isVisible ? "opacity-100" : "opacity-0";
      case "scale-up":
        return isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90";
      case "fade-3d":
        return isVisible 
          ? "opacity-100 translate-y-0 [transform:rotateX(0deg)] blur-none" 
          : "opacity-0 translate-y-24 [transform:rotateX(-45deg)] blur-md";
      default:
        return isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16";
    }
  };

  return (
    <div 
      ref={ref} 
      className={`${baseClasses} ${getVariantStyles()} ${className}`}
      style={{ 
        transitionDelay: `${delay}ms`,
        perspective: '2000px',
        transitionTimingFunction: 'cubic-bezier(0.19, 1, 0.22, 1)'
      }}
    >
      {children}
    </div>
  );
};

export default Reveal;
