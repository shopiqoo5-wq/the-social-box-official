import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroPortal = () => {
  const containerRef = useRef();
  const [progress, setProgress] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // 🖱️ Magnetic Mouse Effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 2;
      const y = (clientY / window.innerHeight - 0.5) * 2;
      setMouse({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Cinematic Portal Scroll Zoom
      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=150%', // Snappier scroll length
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => setProgress(self.progress)
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative font-oswald overflow-x-hidden min-h-screen bg-black">
      {/* Cinematic Overlays */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.08] z-[9999] bg-repeat" 
           style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }}></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#F2EC24]/5 via-transparent to-transparent pointer-events-none"></div>

      {/* Hero Section Container */}
      <section 
        ref={containerRef} 
        className="relative h-screen w-full bg-black flex items-center justify-center overflow-hidden z-20"
      >
        {/* 🏆 Pure High-Fidelity Master Lockup */}
        <div 
          className="relative flex items-center justify-center z-30 px-4 will-change-transform transform-gpu"
          style={{ 
            opacity: 1 - Math.pow(progress, 2) * 1.8,
            transform: `scale(${1 + progress * 2.5}) translate3d(${mouse.x * 25}px, ${mouse.y * 25}px, 0)`,
          }}
        >
          <img 
            src="/hero-lockup.png" 
            alt="The Social Box" 
            className="w-full h-auto max-w-[90vw] md:max-w-[85vw] lg:max-w-screen-xl object-contain drop-shadow-[0_0_120px_rgba(242,236,36,0.25)]"
            style={{ 
               imageRendering: 'high-quality',
               WebkitBackfaceVisibility: 'hidden'
            }}
          />
        </div>

        {/* Cinematic Background Glow - Seamless Handover */}
        <div 
          className="absolute inset-0 bg-radial-gradient from-[#F2EC24]/15 to-transparent pointer-events-none mix-blend-screen transition-opacity duration-1000"
          style={{ opacity: 1 - Math.pow(progress, 3) }}
        ></div>
      </section>
    </div>
  );
};


export default HeroPortal;
