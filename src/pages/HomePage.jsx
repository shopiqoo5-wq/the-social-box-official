import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Radio, Globe, Zap, Users, Video, Palette } from 'lucide-react';
import Reveal from '../components/Reveal';
import { useContact } from '../context/ContactContext';
import LazyVideo from '../components/LazyVideo';
import BrandLogoWall from '../components/BrandLogoWall';
import Footer from '../components/Footer';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSequenceAnimation from '../components/HeroSequenceAnimation';

gsap.registerPlugin(ScrollTrigger);

// Responsive mobile detection hook
const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = (e) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [breakpoint]);
  return isMobile;
};

const RollingDigit = ({ value, delay = 0 }) => {
  const containerRef = useRef(null);
  const [inView, setInView] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="h-[1em] overflow-hidden inline-flex flex-col leading-none">
      <div 
        className="flex flex-col will-change-transform"
        style={{
          transform: inView ? `translateY(-${value}em)` : 'translateY(0)',
          filter: inView ? 'blur(0px)' : 'blur(4px)',
          transition: `transform 3s cubic-bezier(0.19, 1, 0.22, 1) ${delay + 0.2}s, filter 3s cubic-bezier(0.19, 1, 0.22, 1) ${delay + 0.2}s`
        }}
      >
        {[0,1,2,3,4,5,6,7,8,9].map(n => (
          <span key={n} className="h-[1em] w-full flex items-center justify-center">{n}</span>
        ))}
      </div>
    </div>
  );
};

const RollingNumber = ({ end, suffix = "" }) => {
  const digits = end.toString().split("");
  return (
    <span className="inline-flex items-baseline leading-none">
      {digits.map((d, i) => (
        <RollingDigit key={i} value={parseInt(d)} delay={i * 0.15} />
      ))}
      <span className="ml-1">{suffix}</span>
    </span>
  );
};

export default function HomePage({ navbarRef }) {
  const { openContact } = useContact();
  const trackRef = useRef(null);
  const isMobile = useIsMobile();

  // Refs for Hero Animation
  const bridgeContentRef = useRef(null);
  const bridgeClipRef = useRef(null);
  const portalBezelRef = useRef(null);

  // Services horizontal scroll
  const servicesWrapperRef = useRef(null);
  const servicesRef = useRef(null);
  const servicesPhysics = useRef({
    currentX: 0,
    targetX: 0,
    isDragging: false,
    startX: 0,
    startScrollLeft: 0,
  });
  
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

  // ── Services drag / wheel helpers ──────────────────────────────────────
  const getServicePoint = (e) => e.touches ? e.touches[0].pageX : e.pageX;

  const onServicesDragStart = (e) => {
    const sp = servicesPhysics.current;
    sp.isDragging = true;
    sp.startX = getServicePoint(e);
    sp.startScrollLeft = sp.targetX;
    if (servicesRef.current) servicesRef.current.style.cursor = 'grabbing';
  };

  const onServicesDragMove = (e) => {
    const sp = servicesPhysics.current;
    if (!sp.isDragging) return;
    const delta = getServicePoint(e) - sp.startX;
    sp.targetX = sp.startScrollLeft + delta;
  };

  const onServicesDragEnd = () => {
    servicesPhysics.current.isDragging = false;
    if (servicesRef.current) servicesRef.current.style.cursor = 'grab';
  };

  const onServicesWheel = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    servicesPhysics.current.targetX -= delta * 1.5;
  };

  useEffect(() => {
    // ── Reel RAF loop ────────────────────────────────────────────────────
    let reelRaf;
    const updateReel = () => {
      if (!trackRef.current) return;
      if (!physics.current.isDragging) {
        physics.current.targetX -= 1.5;
      }
      const prevX = physics.current.currentX;
      physics.current.currentX += (physics.current.targetX - physics.current.currentX) * 0.08;
      const trackWidth = trackRef.current.scrollWidth;
      const halfWidth = trackWidth / 2;
      if (physics.current.currentX <= -halfWidth) {
        physics.current.currentX += halfWidth;
        physics.current.targetX += halfWidth;
      } else if (physics.current.currentX > 0) {
        physics.current.currentX -= halfWidth;
        physics.current.targetX -= halfWidth;
      }
      const velocity = physics.current.currentX - prevX;
      const tilt = Math.max(-15, Math.min(15, velocity * 1.5));
      const blur = window.innerWidth > 1024 ? Math.min(8, Math.abs(velocity) * 0.5) : 0;
      trackRef.current.style.transform = `translate3d(${physics.current.currentX}px, 0, 0) skewX(${tilt}deg)`;
      trackRef.current.style.filter = blur > 0 ? `blur(${blur}px)` : 'none';
      reelRaf = requestAnimationFrame(updateReel);
    };
    updateReel();

    // ── Services RAF loop ────────────────────────────────────────────────
    let servicesRaf;
    const updateServices = () => {
      const sp = servicesPhysics.current;
      const el = servicesRef.current;
      if (!el) { servicesRaf = requestAnimationFrame(updateServices); return; }

      const maxScroll = -(el.scrollWidth - el.parentElement.clientWidth);
      sp.targetX = Math.min(0, Math.max(maxScroll, sp.targetX));
      sp.currentX += (sp.targetX - sp.currentX) * 0.1;

      el.style.transform = `translate3d(${sp.currentX}px, 0, 0)`;
      servicesRaf = requestAnimationFrame(updateServices);
    };
    updateServices();

    // wheel listener (passive: false so we can preventDefault)
    const wheelEl = servicesWrapperRef.current;
    if (wheelEl) wheelEl.addEventListener('wheel', onServicesWheel, { passive: false });

    return () => {
      cancelAnimationFrame(reelRaf);
      cancelAnimationFrame(servicesRaf);
      if (wheelEl) wheelEl.removeEventListener('wheel', onServicesWheel);
    };
  }, []);

  const services = [
    { title: "Social Media", icon: <Radio className="w-6 h-6" />, desc: "Strategy, content, and management designed to build a consistent, engaging brand presence." },
    { title: "Influencer Marketing", icon: <Users className="w-6 h-6" />, desc: "End-to-end influencer collaborations that drive both reach and relevance." },
    { title: "Meme Marketing", icon: <Zap className="w-6 h-6" />, desc: "Culture-driven content that taps into trends and conversations in real time." },
    { title: "Web", icon: <Globe className="w-6 h-6" />, desc: "Clean, functional, and design-forward websites that reflect your brand." },
    { title: "UGC (User-Generated Content)", icon: <Video className="w-6 h-6" />, desc: "Authentic, creator-led content that builds trust and relatability." },
    { title: "Personal Brand Building", icon: <Sparkles className="w-6 h-6" />, desc: "Positioning individuals as strong, credible voices in their space." },
    { title: "Production", icon: <Palette className="w-6 h-6" />, desc: "From ideation to execution— high-quality content built for digital-first platforms" },
  ];

  return (
    <div className="min-h-[100dvh] bg-[#0A0A0A] text-white font-manrope selection:bg-[#FFC107] selection:text-black overflow-x-hidden relative">
      <HeroSequenceAnimation 
        bridgeContentRef={bridgeContentRef}
        bridgeClipRef={bridgeClipRef}
        portalBezelRef={portalBezelRef}
        navbarRef={navbarRef}
      />

      <div 
        ref={bridgeClipRef}
        className="relative w-full overflow-hidden"
        style={{ clipPath: 'inset(100% 0% 0% 0%)' }}
      >
        <div 
          ref={bridgeContentRef}
          id="main-content" 
          className="relative group/main will-change-transform"
        >

          {/* ── HERO SECTION ── */}
          <section className="relative min-h-[100dvh] w-full matte-surface flex flex-col justify-center items-center text-center px-6">

            {/* Ambient glow layers */}
            <div className="cinematic-glow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--gold)]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--gold)]/10 to-transparent" />
            </div>

            {/* Noise grain overlay */}
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: '200px 200px' }}
            />


            {/* Main tagline */}
            <h1 className="relative z-10 font-space font-black uppercase leading-[0.85] tracking-[-0.04em] text-[13vw] sm:text-[11vw] md:text-[9vw] lg:text-[8vw] max-w-6xl">
              <span
                className="block text-white"
                style={{ textShadow: '0 0 120px rgba(255,193,7,0.06)' }}
              >
                We Make
              </span>
              <span
                className="block text-[#FFC107] italic"
                style={{ textShadow: '0 0 120px rgba(255,193,7,0.25)' }}
              >
                Brands Loud.
              </span>
            </h1>



            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10">
              <span className="text-zinc-600 font-mono text-[9px] tracking-[0.4em] uppercase">Scroll</span>
              <div className="w-px h-12 bg-gradient-to-b from-[#FFC107]/40 to-transparent animate-pulse" />
            </div>

          </section>

          {/* 🔮 Narrative Chapter: The Social Architecture */}
          <section id="about" className="relative min-h-[100dvh] w-full bg-[#080808] flex flex-col justify-center py-32 md:py-48 overflow-hidden border-t border-white/5">
            {/* Atmospheric Depth Layer */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,193,7,0.03),_transparent_70%)] pointer-events-none"></div>

            <div className="w-full max-w-screen-2xl mx-auto px-6 md:px-12 relative z-10">
              <Reveal delay={100} type="fade-3d" className="mb-32">
                 <div className="flex flex-col md:flex-row gap-12 items-baseline justify-between border-b border-white/10 pb-20">
                    <h2 className="font-space text-[11vw] md:text-[8vw] lg:text-[7vw] leading-[0.85] tracking-tighter uppercase max-w-5xl break-words">
                       DEVELOPMENT STUDIO <br/>
                       <span className="text-[#FFC107] italic drop-shadow-[0_0_80px_rgba(255,193,7,0.2)]">THE CREATIVE KIDS WHO GREW UP</span>
                    </h2>
                    <div className="max-w-md text-[#FFC107]/40 font-black text-sm md:text-base italic leading-relaxed uppercase tracking-[0.5em] text-right mb-6">
                       THE NEW DIGITAL PARADIGM
                    </div>
                 </div>
              </Reveal>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-start mt-20">
                 <Reveal delay={200} type="fade-3d">
                    <div className="space-y-12">
                       <p className="text-zinc-200 text-3xl md:text-6xl font-light leading-[1] max-w-3xl tracking-tighter italic">
                          Engineering <span className="text-white font-black">Viral Culture</span> through <span className="text-[#FFC107] font-black underline decoration-[4px] underline-offset-[1.5rem]">Digital Architecture</span>.
                       </p>
                       <div className="h-px w-40 bg-[#FFC107]/30"></div>
                    </div>
                 </Reveal>
                 
                 <div className="flex flex-col gap-16 pt-10">
                    <Reveal delay={300} className="space-y-10">
                       <p className="text-zinc-500 text-xl md:text-2xl font-medium leading-relaxed max-w-xl">
                          Not Just an Agency, but an Extension of your brand. Operating where high-end technology meets raw internet culture.
                       </p>
                       <div className="flex flex-col gap-4">
                          <div className="flex items-center gap-6 group cursor-default">
                             <span className="w-4 h-4 rounded-full border border-[#FFC107] group-hover:bg-[#FFC107] transition-colors"></span>
                              <span className="flex flex-col gap-1 transition-all">
                                <span className="text-3xl md:text-5xl font-black text-[#FFC107] drop-shadow-[0_0_20px_rgba(255,193,7,0.3)]">
                                  <RollingNumber end={100} suffix="+" />
                                </span>
                                <span className="text-[9px] font-black tracking-[0.4em] uppercase text-zinc-600 group-hover:text-zinc-400 transition-colors">Influencers Integrated</span>
                              </span>
                          </div>
                          <div className="flex items-center gap-6 group cursor-default">
                             <span className="w-4 h-4 rounded-full border border-[#FFC107] group-hover:bg-[#FFC107] transition-colors"></span>
                              <span className="flex flex-col gap-1 transition-all">
                                <span className="text-3xl md:text-5xl font-black text-[#FFC107] drop-shadow-[0_0_20px_rgba(255,193,7,0.3)]">
                                  <RollingNumber end={20} suffix="+" />
                                </span>
                                <span className="text-[9px] font-black tracking-[0.4em] uppercase text-zinc-600 group-hover:text-zinc-400 transition-colors">Global Brands Partnered</span>
                              </span>
                          </div>
                       </div>
                    </Reveal>
                 </div>
              </div>
            </div>

            {/* Cinematic Reels Section - Full Screen Width */}
            <Reveal delay={400} className="relative w-full mt-24 pb-32 [perspective:2500px]">
              <div 
                className="w-full relative"
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
                data-cursor="drag"
              >
                <div 
                  ref={trackRef} 
                  className="flex w-max will-change-transform items-end cursor-grab active:cursor-grabbing px-12 gap-4"
                >
                  {[
                    { src: "/videos/reel-1.mp4", brand: "Red Bull", reach: "4.2M Reach" },
                    { src: "/videos/reel-2.mp4", brand: "Nike", reach: "7.1M Views" },
                    { src: "/videos/reel-3.mp4", brand: "Puma", reach: "2.8M Reach" },
                    { src: "/videos/reel-4.mp4", brand: "Netflix", reach: "11M Views" },
                    { src: "/videos/reel-5.mp4", brand: "Amazon", reach: "5.5M Reach" },
                    { src: "/videos/reel-6.mp4", brand: "ZEE5", reach: "3.3M Views" },
                    { src: "/videos/reel-7.mp4", brand: "Adidas", reach: "6.7M Reach" },
                    { src: "/videos/reel-8.mp4", brand: "Reliance", reach: "9.1M Views" },
                    { src: "/videos/reel-1.mp4", brand: "Red Bull", reach: "4.2M Reach" },
                    { src: "/videos/reel-2.mp4", brand: "Nike", reach: "7.1M Views" },
                    { src: "/videos/reel-3.mp4", brand: "Puma", reach: "2.8M Reach" },
                    { src: "/videos/reel-4.mp4", brand: "Netflix", reach: "11M Views" },
                  ].map((reel, i) => (
                    <div key={i} className="px-2 flex-shrink-0">
                      <Link 
                        to="/case-study"
                        className="relative block overflow-hidden bg-black border border-white/5 group hover:border-[var(--gold)]/60 transition-all duration-700 will-change-transform"
                        data-cursor="view"
                        style={{
                          width: '175px',
                          height: '310px',
                          borderRadius: '16px',
                          // Alternate heights for staggered look
                          marginTop: i % 2 === 0 ? '0px' : '40px'
                        }}
                      >
                        <LazyVideo src={reel.src} className="w-full h-full object-cover scale-[1.06] group-hover:scale-[1.01] transition-transform duration-[2.5s]" />

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-5">
                          <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <p className="text-white font-space text-base font-black uppercase tracking-tight leading-none mb-2">{reel.brand}</p>
                            <div className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#FFC107]"></span>
                              <p className="text-[#FFC107] font-mono text-[10px] font-black tracking-[0.2em] uppercase">{reel.reach}</p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </section>

          {/* 🏗️ Services Architecture: The Bento Blueprint */}
          <section id="services" className="py-32 md:py-48 px-6 md:px-12 relative overflow-hidden bg-[#050505]">
            {/* Cinematic Light Leaks */}
            <div className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-[#FFC107]/5 rounded-full blur-[180px] pointer-events-none opacity-40 animate-pulse"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#FFC107]/3 rounded-full blur-[150px] pointer-events-none opacity-20"></div>

            <div className="max-w-screen-2xl mx-auto relative z-10">
              <Reveal type="fade-3d">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-32 border-b border-white/5 pb-20">
                   <h2 className="font-space text-[10vw] md:text-[7.5vw] lg:text-[6.5vw] leading-[0.75] tracking-[-0.05em] uppercase break-words">
                      PROJECT<br/>
                      <span className="text-[#FFC107] drop-shadow-[0_0_40px_rgba(255,193,7,0.15)] inline-block -mt-2 md:-mt-4">CAPABILITIES</span>
                   </h2>
                   <div className="max-w-xs text-zinc-500 font-mono text-[10px] tracking-[0.6em] uppercase leading-relaxed pb-4">
                      Scaling digital influence through geometric precision
                   </div>
                </div>
              </Reveal>
              
              {/* Draggable horizontal scroll track */}
              <div
                ref={servicesWrapperRef}
                data-lenis-prevent
                className="overflow-hidden -mx-6 md:-mx-12 py-10 select-none"
                onMouseDown={onServicesDragStart}
                onMouseMove={onServicesDragMove}
                onMouseUp={onServicesDragEnd}
                onMouseLeave={onServicesDragEnd}
                onTouchStart={onServicesDragStart}
                onTouchMove={onServicesDragMove}
                onTouchEnd={onServicesDragEnd}
              >
                <div
                  ref={servicesRef}
                  className="flex flex-nowrap items-stretch gap-6 md:gap-8 w-max will-change-transform px-6 md:px-12 cursor-grab active:cursor-grabbing"
                >
                  {services.map((service, index) => (
                    <Link key={index} to="/services" className="w-[85vw] md:w-[380px] flex-shrink-0 group block">
                      <div className="h-[480px] bg-[#0A0A0A] border border-white/5 rounded-[2.5rem] p-10 flex flex-col justify-between cursor-pointer overflow-hidden relative transition-all duration-700 ease-out hover:border-[#FFC107]/30 hover:scale-[1.01] shadow-2xl">
                        
                        {/* 🎨 Luxury Layers: Reflections & Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none"></div>
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
                        
                        {/* Bottom Right Amber Glow */}
                        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#FFC107]/10 blur-[100px] rounded-full pointer-events-none group-hover:bg-[#FFC107]/20 transition-all duration-700"></div>

                        {/* Top Header: Glass Icon */}
                        <div className="relative z-10 flex justify-between items-start">
                          <div className="w-20 h-20 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-xl flex items-center justify-center text-[#FFC107] group-hover:scale-110 transition-transform duration-500 shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]">
                             <div className="w-12 h-12 flex items-center justify-center">
                               {React.cloneElement(service.icon, { className: "w-10 h-10" })}
                             </div>
                          </div>
                        </div>

                        {/* Main Typography: Centered & Bold */}
                        <div className="relative z-10 flex-grow flex items-center">
                          <h3 className="font-space text-5xl md:text-6xl font-black uppercase text-white group-hover:text-[#FFC107] transition-all duration-500 leading-[0.85] tracking-[-0.06em] italic drop-shadow-2xl">
                            {service.title}
                          </h3>
                        </div>
                        
                        {/* Bottom Metadata: Divider & Methodology */}
                        <div className="relative z-10 space-y-6">
                          <div className="w-full h-px bg-white/5 group-hover:bg-[#FFC107]/20 transition-colors"></div>
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-black tracking-[0.5em] uppercase text-zinc-500 group-hover:text-[#FFC107] transition-colors">
                              METHODOLOGY +
                            </span>
                            <div className="w-1 h-1 rounded-full bg-zinc-800 group-hover:bg-[#FFC107] transition-colors"></div>
                          </div>
                        </div>

                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 🏆 Brand Logo Wall: Social Proof */}
          <div id="work">
            <BrandLogoWall />
          </div>

          {/* 🏁 Footer: The Final Impression */}
          <Footer />
        </div>
      </div>
    </div>
  );
}
