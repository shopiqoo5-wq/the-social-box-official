import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, MousePointer2, Sparkles, Box, Radio, Globe, Zap, Megaphone, Palette, Play, Info, ChevronDown } from 'lucide-react';
import Reveal from '../components/Reveal';
import { useContact } from '../context/ContactContext';
import HeroSequenceAnimation from '../components/HeroSequenceAnimation';
import Magnetic from '../components/Magnetic';
import LazyVideo from '../components/LazyVideo';

export default function HomePage() {
  const { openContact } = useContact();
  const trackRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const lightRef = useRef(null);
  
  // Physics State for the cinematic reel
  const physics = useRef({
    currentX: 0,
    targetX: 0,
    isDragging: false,
    startX: 0
  });

  const getPoint = (e) => e.touches ? e.touches[0].pageX : e.pageX;

  const handleDragStart = (e) => {
    physics.current.isDragging = true;
    physics.current.startX = getPoint(e) - physics.current.targetX;
    if (trackRef.current) trackRef.current.style.cursor = 'grabbing';
  };

  const handleDragMove = (e) => {
    if (!physics.current.isDragging) return;
    physics.current.targetX = getPoint(e) - physics.current.startX;
  };

  const handleDragEnd = () => {
    physics.current.isDragging = false;
    if (trackRef.current) trackRef.current.style.cursor = 'grab';
  };

  useEffect(() => {
    // Mouse follow light logic (Shader.se inspired)
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (lightRef.current) {
        const { x, y } = mouseRef.current;
        lightRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId;
    const updateAnimation = () => {
      if (!physics.current.isDragging) {
        physics.current.targetX -= 1.5; // Smooth slow auto-scroll
      }
      const prevX = physics.current.currentX;
      physics.current.currentX += (physics.current.targetX - physics.current.currentX) * 0.05;

      if (trackRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const halfWidth = trackWidth / 2;
        if (physics.current.currentX <= -halfWidth) {
          physics.current.currentX += halfWidth;
          physics.current.targetX += halfWidth;
          physics.current.startX += halfWidth; 
        } else if (physics.current.currentX > 0) {
          physics.current.currentX -= halfWidth;
          physics.current.targetX -= halfWidth;
          physics.current.startX -= halfWidth;
        }
        const velocity = physics.current.currentX - prevX;
        const tiltY = Math.max(-10, Math.min(10, velocity * 0.8)); 
        trackRef.current.style.transform = `translate3d(${physics.current.currentX}px, 0, 0) rotateY(${tiltY}deg)`;
      }
      animationFrameId = requestAnimationFrame(updateAnimation);
    };
    updateAnimation();
    // 🏎️ Cinematic Content Reveal (at the end of Hero Sequence)
    gsap.fromTo('#main-content', 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, y: 0,
        scrollTrigger: {
          trigger: '#main-content',
          start: 'top bottom', // Start revealing when the content reaches the bottom of viewport
          end: 'top center',
          scrub: true,
        }
      }
    );

    return () => {
       cancelAnimationFrame(animationFrameId);
       window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const services = [
    { num: "01", title: "SOCIAL STRATEGY", icon: <Radio className="w-8 h-8" />, desc: "Engineering viral culture from the ground up.", size: "col-span-1 md:col-span-2" },
    { num: "02", title: "CREATOR NETWORK", icon: <Megaphone className="w-8 h-8" />, desc: "Accessing 2M+ strategic voices globally.", size: "col-span-1" },
    { num: "03", title: "CRAFTING TECH", icon: <Globe className="w-8 h-8" />, desc: "Next-gen interactive 3D & AI deployment.", size: "col-span-1" },
    { num: "04", title: "CONTENT BLAST", icon: <Zap className="w-8 h-8" />, desc: "Meme-first campaigns that shift markets.", size: "col-span-1 md:col-span-2" },
    { num: "05", title: "EXECUTION", icon: <Palette className="w-8 h-8" />, desc: "360° production for brands that dare.", size: "col-span-1" },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-manrope selection:bg-[#E2FF00] selection:text-black overflow-x-hidden relative">
      
      {/* Follow Light Element */}
      <div ref={lightRef} className="fixed top-0 left-0 w-[40vw] h-[40vw] bg-[#E2FF00]/5 rounded-full blur-[150px] pointer-events-none -translate-x-1/2 -translate-y-1/2 z-0 mix-blend-screen overflow-hidden"></div>

      {/* 🎬 Narrative Animation Layer (Scroll-Controlled Sequence) */}
      <div className="relative z-20">
        <HeroSequenceAnimation />
      </div>

      {/* 🏗️ Real Website Content (Revealed at 90% scroll) */}
      <div id="main-content" className="relative z-30 -mt-[100vh]">
        {/* 🔮 Narrative Chapter: The Social Architecture */}
      <section className="relative min-h-screen w-full bg-[#080808] flex flex-col justify-center py-40 md:py-80 overflow-hidden border-t border-white/5">
        {/* Atmospheric Depth Layer */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(242,236,36,0.03),_transparent_70%)] pointer-events-none"></div>

        <div className="w-full max-w-screen-2xl mx-auto px-6 md:px-12 relative z-10">
          <Reveal delay={100} type="fade-3d" className="mb-40">
             <div className="flex flex-col md:flex-row gap-12 items-baseline justify-between border-b border-white/10 pb-20">
                <h2 className="font-space text-[15vw] md:text-[13vw] leading-[0.75] tracking-tighter uppercase max-w-5xl">
                   SOCIAL <br/>
                   <span className="text-[#E2FF00] italic drop-shadow-[0_0_80px_rgba(242,236,36,0.2)]">DEVELOPMENT</span>
                </h2>
                <div className="max-w-md text-[#E2FF00]/40 font-black text-sm md:text-base italic leading-relaxed uppercase tracking-[0.5em] text-right mb-6">
                   [ THE NEW DIGITAL PARADIGM ]
                </div>
             </div>
          </Reveal>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-start mt-20">
             <Reveal delay={200} type="fade-3d">
                <div className="space-y-12">
                   <p className="text-zinc-200 text-3xl md:text-6xl font-light leading-[1] max-w-3xl tracking-tighter italic">
                      Engineering <span className="text-white font-black">Viral Culture</span> through <span className="text-[#E2FF00] font-black underline decoration-[4px] underline-offset-[1.5rem]">Digital Architecture</span>.
                   </p>
                   <div className="h-px w-40 bg-[#E2FF00]/30"></div>
                </div>
             </Reveal>
             
             <div className="flex flex-col gap-16 pt-10">
                <Reveal delay={300} className="space-y-10">
                   <p className="text-zinc-500 text-xl md:text-2xl font-medium leading-relaxed max-w-xl">
                      We operate where high-end technology meets raw internet culture. A Social Development Studio bridging the gap between brand ambition and geometric reality.
                   </p>
                   <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-6 group cursor-default">
                         <span className="w-4 h-4 rounded-full border border-[#E2FF00] group-hover:bg-[#E2FF00] transition-colors"></span>
                         <span className="text-[10px] font-black tracking-[0.4em] uppercase text-zinc-600 group-hover:text-white transition-colors">2M+ Global Creators Integrated</span>
                      </div>
                      <div className="flex items-center gap-6 group cursor-default">
                         <span className="w-4 h-4 rounded-full border border-[#E2FF00] group-hover:bg-[#E2FF00] transition-colors"></span>
                         <span className="text-[10px] font-black tracking-[0.4em] uppercase text-zinc-600 group-hover:text-white transition-colors">State-of-the-art Narrative Tech</span>
                      </div>
                   </div>
                   <Magnetic>
                    <button 
                      onClick={openContact}
                      className="group relative inline-flex items-center gap-8 px-14 py-8 bg-[#E2FF00] text-black rounded-full font-black uppercase tracking-[0.4em] text-[10px] hover:scale-105 active:scale-95 transition-all shadow-[0_0_60px_rgba(242,236,36,0.2)] overflow-hidden"
                    >
                       <span className="relative z-10">Initialize Architecture</span>
                       <ArrowUpRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                   </Magnetic>
                </Reveal>
             </div>
          </div>
        </div>

        {/* Cinematic Reels Section - Full Screen Width */}
        <Reveal delay={400} className="relative w-full mt-40 pb-40 [perspective:2500px]">
          <div 
            className="w-full relative"
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
          >
            <div 
              ref={trackRef} 
              className="flex w-max will-change-transform transform-style-3d items-center cursor-grab active:cursor-grabbing px-20"
            >
              {[
                ...Array(2).fill([
                  "/videos/reel-1.mp4", "/videos/reel-2.mp4", "/videos/reel-3.mp4", "/videos/reel-4.mp4",
                  "/videos/reel-5.mp4", "/videos/reel-6.mp4", "/videos/reel-7.mp4", "/videos/reel-8.mp4"
                ]).flat()
              ].map((videoSrc, i) => (
                <div key={i} className="px-8">
                  <div className="portfolio-card w-[22rem] md:w-[28rem] h-[34rem] md:h-[42rem] rounded-[3.5rem] overflow-hidden relative bg-black border border-white/5 group hover:border-[#E2FF00]/50 transition-all duration-1000">
                    <LazyVideo src={videoSrc} className="w-full h-full object-cover scale-[1.05] group-hover:scale-100 transition-transform duration-[2s]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                       <div className="absolute bottom-16 left-16">
                          <p className="text-white font-space text-4xl font-black uppercase tracking-tighter italic">EDITION {i + 1}</p>
                       </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* 🏗️ Services Architecture: The Bento Blueprint */}
      <section id="services" className="py-40 md:py-80 px-6 md:px-12 relative overflow-hidden bg-[#050505]">
        {/* Cinematic Light Leaks */}
        <div className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-[#E2FF00]/5 rounded-full blur-[180px] pointer-events-none opacity-40 animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#E2FF00]/3 rounded-full blur-[150px] pointer-events-none opacity-20"></div>

        <div className="max-w-screen-2xl mx-auto relative z-10">
          <Reveal type="fade-3d">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-32 border-b border-white/5 pb-20">
               <h2 className="font-space text-[12vw] md:text-[9vw] leading-[0.8] tracking-[-0.05em] uppercase">
                  PROJECT<br/>
                  <span className="text-[#E2FF00] drop-shadow-[0_0_40px_rgba(242,236,36,0.15)]">CAPABILITIES</span>
               </h2>
               <div className="max-w-xs text-zinc-500 font-mono text-[10px] tracking-[0.6em] uppercase leading-relaxed pb-4">
                  [ Scaling digital influence through geometric precision ]
               </div>
            </div>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {services.map((service, index) => (
              <Reveal key={index} delay={index * 100} type="fade-3d" className={`${service.size} group`}>
                <div className="h-full bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[4rem] p-16 md:p-20 flex flex-col justify-between cursor-pointer overflow-hidden relative transition-all duration-700 hover:bg-[#E2FF00] hover:scale-[1.02] hover:-rotate-1 active:scale-95 group shadow-2xl">
                  {/* Glassmorphic Background Glow */}
                  <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#E2FF00]/10 rounded-full blur-[80px] group-hover:bg-black/10 transition-colors"></div>
                  
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                      <div className="mb-16 inline-flex p-8 bg-white/5 rounded-3xl text-[#E2FF00] group-hover:bg-black/5 group-hover:text-black transition-all transform group-hover:rotate-12 duration-700">
                        {service.icon}
                      </div>
                      <h3 className="font-space text-4xl md:text-6xl font-black uppercase mb-8 text-white group-hover:text-black transition-colors leading-none tracking-tighter">
                        {service.title}
                      </h3>
                    </div>
                    <div>
                      <p className="font-medium text-zinc-400 group-hover:text-black/70 text-2xl leading-tight max-w-sm transition-colors italic mb-4">
                        {service.desc}
                      </p>
                      <div className="text-[10px] font-black tracking-[0.4em] uppercase text-[#E2FF00]/40 group-hover:text-black/40 transition-colors">
                        Explore Methodology +
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 📊 Impact Vault: Strategic Proof */}
      <section id="impact" className="py-40 md:py-80 bg-white text-black relative z-10 rounded-t-[5rem] md:rounded-t-[10rem] shadow-[-20px_0_100px_rgba(0,0,0,0.5)]">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center mb-64">
             <Reveal type="fade-3d">
                <h2 className="font-space text-[16vw] md:text-[11vw] leading-[0.7] tracking-[-0.05em] uppercase">
                   QUANTIFIABLE<br/>
                   <span className="text-zinc-200">VELOCITY</span>
                </h2>
             </Reveal>
             <Reveal delay={200} className="space-y-12">
                <p className="text-zinc-900 text-3xl md:text-6xl font-light leading-[0.95] tracking-tighter italic max-w-2xl">
                   We engineer <span className="font-black border-b-[6px] border-[#E2FF00] shadow-[0_10px_0_rgba(242,236,36,0.1)]">Outsized Success</span> through structural alliances.
                </p>
                <div className="flex flex-wrap gap-12 font-black uppercase text-[10px] tracking-[0.5em] text-zinc-400">
                   <div className="flex items-center gap-4"><div className="w-2 h-2 rounded-full bg-[#E2FF00]"></div> Est. 2024</div>
                   <div className="flex items-center gap-4"><div className="w-2 h-2 rounded-full bg-[#E2FF00]"></div> Global Coverage</div>
                   <div className="flex items-center gap-4"><div className="w-2 h-2 rounded-full bg-[#E2FF00]"></div> Top 0.1% Talent</div>
                </div>
             </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {[
              { label: "Active Reach", val: "2.4B+" },
              { label: "Regions", val: "32+" },
              { label: "Viral Index", val: "Top Tier" },
              { label: "Project Gain", val: "720%+" }
            ].map((stat, i) => (
              <Reveal key={i} delay={i * 100} type="fade-3d" className="bg-[#080808] text-[#E2FF00] p-24 rounded-[5rem] flex flex-col items-center justify-center text-center hover:scale-105 hover:rotate-2 transition-all duration-700 active:scale-95 group relative overflow-hidden shadow-2xl">
                 <div className="absolute inset-0 bg-gradient-to-br from-[#E2FF00]/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <div className="font-space text-6xl md:text-8xl mb-6 font-black tracking-[-0.05em] group-hover:scale-110 transition-transform drop-shadow-[0_0_30px_rgba(242,236,36,0.3)]">{stat.val}</div>
                 <div className="text-[11px] tracking-[0.6em] font-black text-white uppercase opacity-40 group-hover:opacity-100 transition-opacity">{stat.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ⚡ Social Marquee: Energy Loop */}
      <div className="bg-[#E2FF00] py-20 border-y-[3px] border-black overflow-hidden flex whitespace-nowrap relative z-20 shadow-[0_0_80px_rgba(242,236,36,0.3)]">
        <div className="animate-marquee-fast inline-block font-space text-6xl md:text-[14vw] uppercase font-black text-black px-12 italic leading-none overflow-hidden select-none">
          • SOCIAL DEVELOPMENT • ENGINEERED RESULTS • VIRAL ARCHITECTURE • SOCIAL DEVELOPMENT • ENGINEERED RESULTS • 
        </div>
      </div>
      </div>
    </div>
  );
}
