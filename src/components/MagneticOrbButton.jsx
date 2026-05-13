import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function MagneticOrbButton({ onClick, text = "INTERFACE NOW" }) {
  const containerRef = useRef(null);
  const orbContainerRef = useRef(null);
  const coreRef = useRef(null);
  const satelliteRef = useRef(null);
  const rotationRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !orbContainerRef.current) return;

    // 🏎️ Continuous Core Rotation (Always on)
    rotationRef.current = gsap.to(coreRef.current, {
      rotation: 360,
      duration: 8,
      repeat: -1,
      ease: "none"
    });

    // 🛰️ Satellite Orbit Animation
    gsap.to(satelliteRef.current, {
      rotation: -360,
      duration: 4,
      repeat: -1,
      ease: "none",
      transformOrigin: "-20px center" // Offset to orbit
    });

    // 🧲 Magnetic Physics (Weighted & Premium)
    const xTo = gsap.quickTo(containerRef.current, "x", { duration: 1.2, ease: "power4.out" });
    const yTo = gsap.quickTo(containerRef.current, "y", { duration: 1.2, ease: "power4.out" });
    
    const orbXTo = gsap.quickTo(orbContainerRef.current, "x", { duration: 1, ease: "power3.out" });
    const orbYTo = gsap.quickTo(orbContainerRef.current, "y", { duration: 1, ease: "power3.out" });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      // Subtle container magnetism
      const pullX = (clientX - centerX) * 0.2;
      const pullY = (clientY - centerY) * 0.2;

      // Reactive orb float
      const orbPullX = (clientX - (left + width - 40)) * 0.4;
      const orbPullY = (clientY - centerY) * 0.4;

      xTo(pullX);
      yTo(pullY);
      orbXTo(orbPullX);
      orbYTo(orbPullY);
      
      // Accelerate rotation on hover
      gsap.to(rotationRef.current, { timeScale: 4, duration: 1 });
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
      orbXTo(0);
      orbYTo(0);
      // Return to normal rotation speed
      gsap.to(rotationRef.current, { timeScale: 1, duration: 1 });
    };

    const container = containerRef.current;
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      onClick={onClick}
      className="group relative inline-flex items-center justify-center cursor-pointer select-none"
    >
      {/* 🌑 Futuristic Pill Body */}
      <div className="relative overflow-hidden px-16 py-5 rounded-full bg-[#050505] border border-white/[0.05] group-hover:border-[#FFC107]/20 transition-all duration-700 shadow-[0_40px_80px_rgba(0,0,0,0.9),inset_0_1px_2px_rgba(255,255,255,0.03)]">
        
        {/* Dynamic Light Scan */}
        <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1.5s] bg-gradient-to-r from-transparent via-white/[0.02] to-transparent" />
        
        {/* Typography */}
        <span className="relative z-10 block font-space text-[10px] font-black tracking-[0.7em] text-zinc-500 group-hover:text-white transition-all duration-500">
          {text}
        </span>

        {/* Interior Atmospheric Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFC107]/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>

      {/* 🔮 The Rotating Core & Satellite */}
      <div 
        ref={orbContainerRef}
        className="absolute right-6 flex items-center justify-center pointer-events-none"
      >
        {/* Volumetric Aura */}
        <div className="absolute w-16 h-16 rounded-full bg-[#FFC107]/10 blur-2xl opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-1000" />
        
        {/* 🛰️ Orbital Satellite */}
        <div ref={satelliteRef} className="absolute w-1.5 h-1.5 rounded-full bg-[#FFC107] blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* ⚛️ The Revolving Core */}
        <div 
          ref={coreRef}
          className="relative w-5 h-5 rounded-full bg-[#FFC107] shadow-[0_0_30px_rgba(255,193,7,0.4)] flex items-center justify-center overflow-hidden group-hover:scale-125 transition-transform duration-500"
        >
          {/* Internal Textures for rotation visibility */}
          <div className="absolute inset-0 bg-[conic-gradient(from_0deg,#FFC107,#FFD54F,#FFC107)] opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/40" />
          
          {/* Core Sparkle */}
          <div className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-white/60 blur-[0.5px]" />
        </div>

        {/* Floor Projection */}
        <div className="absolute top-8 w-12 h-4 bg-[#FFC107]/5 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Under-Button Ambient Shadow */}
      <div className="absolute -inset-2 bg-black/40 blur-[30px] -z-10 rounded-full group-hover:opacity-20 transition-opacity" />
    </div>
  );
}
