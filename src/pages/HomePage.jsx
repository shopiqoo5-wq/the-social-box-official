import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Share2, Monitor, Flame, Crown, Aperture, Clapperboard, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Reveal from '../components/Reveal';
import { useContact } from '../context/ContactContext';
import LazyVideo from '../components/LazyVideo';
import BrandLogoWall from '../components/BrandLogoWall';
import Footer from '../components/Footer';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TypewriterText = ({ text, delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [text, started]);

  return <span>{displayedText}<span className="animate-pulse opacity-70">|</span></span>;
};

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
        setInView(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Create a sequence of digits for the slot machine effect (3 sets of 0-9)
  const digitsSequence = [...Array(30)].map((_, i) => i % 10);
  // Target index in the last set
  const targetIndex = 20 + value;

  return (
    <div ref={containerRef} className="h-[1em] overflow-hidden inline-flex flex-col leading-none">
      <div
        className="flex flex-col will-change-transform"
        style={{
          transform: inView ? `translateY(-${targetIndex}em)` : 'translateY(0)',
          filter: inView ? 'blur(0px)' : 'blur(8px)',
          transition: `transform 4.5s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, filter 4.5s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`
        }}
      >
        {digitsSequence.map((n, i) => (
          <span key={i} className="h-[1em] w-full flex items-center justify-center font-black">{n}</span>
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
        isNaN(parseInt(d)) ? <span key={i}>{d}</span> : <RollingDigit key={i} value={parseInt(d)} delay={i * 0.15} />
      ))}
      <span className="ml-1">{suffix}</span>
    </span>
  );
};

export default function HomePage() {
  const { openContact } = useContact();
  const trackRef = useRef(null);
  const isMobile = useIsMobile();

  const scrollServices = (direction) => {
    if (isMobile && servicesWrapperRef.current) {
      const wrapper = servicesWrapperRef.current;
      const cardWidth = window.innerWidth * 0.85 + 24; // 85vw + 6rem gap
      
      // Use scrollBy so CSS scroll-snap handles the perfect center alignment
      wrapper.scrollBy({
        left: direction === 'left' ? -cardWidth : cardWidth,
        behavior: 'smooth'
      });
    } else {
      const sp = servicesPhysics.current;
      const el = servicesRef.current;
      if (!el) return;
      
      const scrollAmount = window.innerWidth * 0.4;
      const maxScroll = -(el.scrollWidth - el.parentElement.clientWidth);
      
      if (direction === 'left') {
        sp.targetX = Math.min(0, sp.targetX + scrollAmount);
      } else {
        sp.targetX = Math.max(maxScroll, sp.targetX - scrollAmount);
      }
    }
  };

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

      if (isMobile) {
        el.style.transform = 'none';
        servicesRaf = requestAnimationFrame(updateServices);
        return;
      }

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
    { title: "Social Media", icon: <Share2 className="w-6 h-6" />, desc: "Strategy, content, and management designed to build a consistent, engaging brand presence." },
    { title: "Influencer Marketing", icon: <Crown className="w-6 h-6" />, desc: "End-to-end influencer collaborations that drive both reach and relevance." },
    { title: "Meme Marketing", icon: <Flame className="w-6 h-6" />, desc: "Culture-driven content that taps into trends and conversations in real time." },
    { title: "Web", icon: <Monitor className="w-6 h-6" />, desc: "Clean, functional, and design-forward websites that reflect your brand." },
    { title: "UGC", subtitle: "(User-Generated Content)", icon: <Aperture className="w-6 h-6" />, desc: "Authentic, creator-led content that builds trust and relatability." },
    { title: "Personal Brand Building", icon: <Sparkles className="w-6 h-6" />, desc: "Positioning individuals as strong, credible voices in their space." },
    { title: "Production", icon: <Clapperboard className="w-6 h-6" />, desc: "From ideation to execution— high-quality content built for digital-first platforms" },
  ];

  return (
    <div className="min-h-[100dvh] bg-[#0A0A0A] text-white font-manrope selection:bg-[#FFC107] selection:text-black overflow-x-hidden relative">
      <div id="main-content" className="relative group/main">
        {/* ── HERO SECTION ── */}
        <section className="relative min-h-[100dvh] w-full bg-[#0d0d0d] flex flex-col justify-center items-center text-center px-6 overflow-hidden">
          
          {/* Animated Aurora / Gradient Mesh Background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] bg-[#FFB800]/20 rounded-full blur-[140px] animate-mesh-1" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] bg-[#b85b0b]/20 rounded-full blur-[150px] animate-mesh-2" />
            <div className="absolute top-[40%] left-[30%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-[#0047FF]/15 rounded-full blur-[120px] animate-mesh-3" />
          </div>

          {/* Floating Golden Particles (Embers) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
            {Array.from({ length: 25 }).map((_, i) => (
              <div
                key={i}
                className="particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 4 + 2}px`,
                  height: `${Math.random() * 4 + 2}px`,
                  animationDuration: `${Math.random() * 5 + 5}s`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              />
            ))}
          </div>

          {/* CSS Noise / Grain Texture Overlay & Vignette */}
          <div
            className="absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-overlay z-20"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: '200px 200px' }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0d0d0d_100%)] z-20 opacity-90 pointer-events-none" />

          {/* Main Content (Centered vertically & horizontally, maintaining minimum padding) */}
          <div className="relative z-30 flex flex-col items-center justify-center w-full min-h-[100dvh] pt-[72px] pb-[100px] px-[5vw]">
            
            {/* Top Spacing Container - ensures ample breathing room below navbar */}
            <div className="flex-grow flex flex-col items-center justify-center mt-[80px] md:mt-[140px]">
              {/* Main Title Group */}
              <div className="flex flex-col items-center justify-center cursor-default group text-center w-full leading-[1.05]">
                <span 
                  className="block text-white font-space font-bold text-[36px] lg:text-[80px] tracking-widest leading-[1.05] animate-fade-up z-10" 
                  style={{ animationDelay: '0.15s', opacity: 0 }}
                >
                  THE
                </span>
                <h1 
                  className="font-space font-black uppercase italic text-[#FFB800] text-[52px] md:text-[72px] lg:text-[140px] leading-[1.05] tracking-[-0.04em] w-full animate-fade-up transition-all duration-700 group-hover:drop-shadow-[0_0_40px_rgba(255,184,0,0.6)]" 
                  style={{ animationDelay: '0.3s', opacity: 0 }}
                >
                  Social Box
                </h1>
              </div>

              {/* Tagline */}
              <div className="mt-[20px] md:mt-[28px] text-[#999] opacity-90 font-light text-[16px] md:text-[22px] italic tracking-wide text-center min-h-[40px] flex justify-center animate-fade-up w-full" style={{ animationDelay: '0.45s', opacity: 0, animationFillMode: 'forwards' }}>
                <TypewriterText text="Make every tap count." delay={800} />
              </div>

              {/* CTA Buttons */}
              <div className="mt-[32px] md:mt-[48px] flex flex-col sm:flex-row items-center justify-center gap-[12px] md:gap-[16px] animate-fade-up w-[90%] sm:w-auto mx-auto" style={{ animationDelay: '0.6s', opacity: 0, animationFillMode: 'forwards' }}>
                <Link to="/contact" className="group relative w-full sm:w-auto h-[56px] min-w-[200px] bg-white text-[#0d0d0d] font-space font-bold uppercase tracking-[0.2em] text-[12px] md:text-[13px] overflow-hidden rounded-full transition-all duration-200 ease-in hover:bg-[#FFB800] hover:scale-[1.03] flex justify-center items-center text-center">
                  {/* Shimmer Sweep Animation */}
                  <div className="absolute top-0 bottom-0 w-[50px] bg-white/40 skew-x-[-20deg] group-hover:animate-[sweep_1.5s_ease-in-out_infinite]" style={{ left: '-100%' }} />
                  <span className="relative z-10 flex items-center gap-3">
                    Start a Project <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                
                <Link to="/case-study" className="group w-full sm:w-auto h-[56px] min-w-[200px] bg-[#050505] border border-[#444] text-white font-space font-bold uppercase tracking-[0.2em] text-[12px] md:text-[13px] rounded-full transition-all duration-200 ease-in hover:border-[#FFB800] hover:text-[#FFB800] hover:scale-[1.03] flex justify-center text-center items-center gap-3">
                  Case Studies
                </Link>
              </div>

              {/* Social Proof */}
              <div className="mt-[42px] md:mt-[64px] animate-fade-up flex flex-col items-center opacity-80 hover:opacity-100 transition-opacity w-full" style={{ animationDelay: '0.75s', opacity: 0, animationFillMode: 'forwards' }}>
                 <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#666] mb-[12px]">Trusted By</span>
                 <div className="flex flex-wrap justify-center items-center gap-[24px] md:gap-[40px] text-[14px] md:text-[18px] uppercase font-mono tracking-[0.15em] text-[#888]">
                    <span>Marico</span>
                    <span>Lakmé</span>
                    <span>Nykaa</span>
                    <span>Sacred Grove</span>
                    <span>Olay</span>
                 </div>
              </div>
            </div>

            {/* Scroll indicator - Forced spacing below social proof */}
            <div className="mt-[48px] flex flex-col items-center gap-4 z-10 animate-fade-in pb-[24px]" style={{ animationDelay: '1.2s', opacity: 0, animationFillMode: 'forwards' }}>
              <span className="text-zinc-500 font-space font-bold text-[10px] tracking-[0.4em] uppercase">Scroll to explore</span>
              <div className="w-px h-[60px] bg-gradient-to-b from-[#FFB800]/80 to-transparent animate-pulse" />
            </div>

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
                  <span className="text-[#FFC107] italic drop-shadow-[0_0_80px_rgba(255,193,7,0.2)]">THE CREATIVE KIDS WHO GREW UP</span>
                </h2>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-start mt-20">
              <Reveal delay={200} type="fade-3d">
                <div className="space-y-12">
                  <p className="text-zinc-200 text-3xl md:text-6xl font-light leading-[1] max-w-3xl tracking-tighter italic">
                    Helping brands <span className="text-white font-black">Go Viral</span> through <span className="text-[#FFC107] font-black underline decoration-[4px] underline-offset-[0.2em]">Creative Strategy</span>.
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
                          <RollingNumber end={"10,000"} suffix="+" />
                        </span>
                        <span className="text-[9px] font-black tracking-[0.4em] uppercase text-zinc-600 group-hover:text-zinc-400 transition-colors">Influencers</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-6 group cursor-default">
                      <span className="w-4 h-4 rounded-full border border-[#FFC107] group-hover:bg-[#FFC107] transition-colors"></span>
                      <span className="flex flex-col gap-1 transition-all">
                        <span className="text-3xl md:text-5xl font-black text-[#FFC107] drop-shadow-[0_0_20px_rgba(255,193,7,0.3)]">
                          <RollingNumber end={30} suffix="+" />
                        </span>
                        <span className="text-[9px] font-black tracking-[0.4em] uppercase text-zinc-600 group-hover:text-zinc-400 transition-colors">Brand Partners</span>
                      </span>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>

          {/* Cinematic Reels Section - Full Screen Width */}
          <Reveal delay={400} className="relative w-full mt-24 pb-12 [perspective:2500px]">
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
                  { src: "/videos/reel-2.mp4", brand: "Bengaluru Strikers", reach: "Ecosystem" },
                  { src: "/videos/lions_case_study.mp4", brand: "Ahmedabad Lions", reach: "End-to-End" },
                  { src: "/videos/reel-3.mp4", brand: "Puma", reach: "2.8M Reach" },
                  { src: "/videos/reel-4.mp4", brand: "Netflix", reach: "11M Views" },
                  { src: "/videos/nykaa_case_study.mp4", brand: "Nykaa", reach: "Gen Z Content" },
                  { src: "/videos/sacred_grove_case_study.mp4", brand: "Sacred Grove", reach: "Full-Funnel" },
                  { src: "/videos/lakme_case_study.mp4", brand: "Lakmé", reach: "360° Campaign" },
                  { src: "/videos/eureka_forbes_case_study.mov", brand: "Eureka Forbes", reach: "6M+ Reach" },
                  { src: "/videos/olay_case_study.mov", brand: "Olay", reach: "278M+ Views" },
                  { src: "/videos/marico_case_study.mov", brand: "Marico", reach: "1M+ Views" },
                  { src: "/videos/reel-5.mp4", brand: "Amazon", reach: "5.5M Reach" },
                  { src: "/videos/reel-6.mp4", brand: "ZEE5", reach: "3.3M Views" },
                  { src: "/videos/reel-7.mp4", brand: "Adidas", reach: "6.7M Reach" },
                  { src: "/videos/reel-8.mp4", brand: "Reliance", reach: "9.1M Views" },
                  { src: "/videos/reel-1.mp4", brand: "Red Bull", reach: "4.2M Reach" },
                  { src: "/videos/reel-2.mp4", brand: "Bengaluru Strikers", reach: "Ecosystem" },
                  { src: "/videos/lions_case_study.mp4", brand: "Ahmedabad Lions", reach: "End-to-End" },
                  { src: "/videos/reel-3.mp4", brand: "Puma", reach: "2.8M Reach" },
                  { src: "/videos/reel-4.mp4", brand: "Netflix", reach: "11M Views" },
                  { src: "/videos/nykaa_case_study.mp4", brand: "Nykaa", reach: "Gen Z Content" },
                  { src: "/videos/sacred_grove_case_study.mp4", brand: "Sacred Grove", reach: "Full-Funnel" },
                  { src: "/videos/lakme_case_study.mp4", brand: "Lakmé", reach: "360° Campaign" },
                  { src: "/videos/eureka_forbes_case_study.mov", brand: "Eureka Forbes", reach: "6M+ Reach" },
                  { src: "/videos/olay_case_study.mov", brand: "Olay", reach: "278M+ Views" },
                  { src: "/videos/marico_case_study.mov", brand: "Marico", reach: "1M+ Views" },
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
        <section id="services" className="pt-12 pb-24 md:pt-16 md:pb-28 px-6 md:px-12 relative overflow-hidden bg-[#050505]">
          {/* Cinematic Light Leaks */}
          <div className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-[#FFC107]/5 rounded-full blur-[180px] pointer-events-none opacity-40 animate-pulse"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#FFC107]/3 rounded-full blur-[150px] pointer-events-none opacity-20"></div>

          <div className="max-w-screen-2xl mx-auto relative z-10">
            <Reveal type="fade-3d">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20 border-b border-white/5 pb-16">
                <div className="flex flex-col gap-10">
                  <h2 className="font-space text-[10vw] md:text-[7.5vw] lg:text-[6.5vw] leading-[0.75] tracking-[-0.05em] uppercase break-words">
                    PROJECT<br />
                    <span className="text-[#FFC107] drop-shadow-[0_0_40px_rgba(255,193,7,0.15)] inline-block -mt-2 md:-mt-4">CAPABILITIES</span>
                  </h2>
                </div>
                <div className="flex flex-col md:items-end gap-8">
                  <div className="max-w-xs text-zinc-500 font-mono text-[10px] tracking-[0.6em] uppercase leading-relaxed md:text-right pb-2">
                    Scaling digital influence through geometric precision
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Draggable horizontal scroll track */}
            <div className="relative group/services-nav">
              {/* Responsive Navigation Buttons - Added more bottom space on mobile */}
              <div className="absolute -bottom-16 md:bottom-auto md:top-1/2 left-1/2 md:left-0 w-max md:w-full -translate-x-1/2 md:translate-x-0 md:-translate-y-1/2 flex items-center justify-center md:justify-between gap-6 md:gap-0 z-40 pointer-events-none">
                <button
                  onClick={() => scrollServices('left')}
                  className="pointer-events-auto flex w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/10 items-center justify-center text-[#FFC107] bg-[#0A0A0A]/90 backdrop-blur-xl hover:bg-[#FFC107] hover:text-black hover:scale-110 active:scale-90 transition-all duration-500 shadow-[0_0_30px_rgba(0,0,0,0.8)] md:-ml-8"
                  aria-label="Previous services"
                >
                  <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                </button>
                <button
                  onClick={() => scrollServices('right')}
                  className="pointer-events-auto flex w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/10 items-center justify-center text-[#FFC107] bg-[#0A0A0A]/90 backdrop-blur-xl hover:bg-[#FFC107] hover:text-black hover:scale-110 active:scale-90 transition-all duration-500 shadow-[0_0_30px_rgba(0,0,0,0.8)] md:-mr-8"
                  aria-label="Next services"
                >
                  <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                </button>
              </div>

              <div
                ref={servicesWrapperRef}
                data-lenis-prevent={!isMobile ? true : undefined}
                className={`overflow-hidden -mx-6 md:-mx-12 py-10 select-none no-scrollbar ${isMobile ? 'overflow-x-auto snap-x snap-mandatory scroll-smooth' : ''}`}
                style={isMobile ? { touchAction: 'pan-y' } : {}}
                onMouseDown={!isMobile ? onServicesDragStart : undefined}
                onMouseMove={!isMobile ? onServicesDragMove : undefined}
                onMouseUp={!isMobile ? onServicesDragEnd : undefined}
                onMouseLeave={!isMobile ? onServicesDragEnd : undefined}
                onTouchStart={!isMobile ? onServicesDragStart : undefined}
                onTouchMove={!isMobile ? onServicesDragMove : undefined}
                onTouchEnd={!isMobile ? onServicesDragEnd : undefined}
              >
                <div
                  ref={servicesRef}
                  className={`flex flex-nowrap items-stretch gap-6 md:gap-8 w-max px-6 md:px-12 ${!isMobile ? 'will-change-transform cursor-grab active:cursor-grabbing' : ''}`}
                >
                  {services.map((service, index) => (
                    <div key={index} onClick={openContact} className="w-[85vw] md:w-[380px] flex-shrink-0 group block cursor-pointer snap-center">
                      <div className="h-[480px] bg-[#0A0A0A] border border-white/5 rounded-[2.5rem] p-10 flex flex-col justify-between cursor-pointer overflow-hidden relative transition-all duration-700 ease-out hover:border-[#FFC107]/30 hover:scale-[1.01] shadow-2xl">

                        {/* 🎨 Luxury Layers: Reflections & Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none"></div>
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

                        {/* Bottom Right Amber Glow */}
                        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#FFC107]/10 blur-[100px] rounded-full pointer-events-none group-hover:bg-[#FFC107]/20 transition-all duration-700"></div>

                        {/* Top Header: Glass Icon */}
                        <div className="relative z-10 flex justify-between items-start">
                          <div className="w-16 h-16 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-xl flex items-center justify-center text-[#FFC107] group-hover:scale-110 transition-transform duration-500 shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]">
                            <div className="w-8 h-8 flex items-center justify-center">
                              {React.cloneElement(service.icon, { className: "w-6 h-6" })}
                            </div>
                          </div>
                        </div>

                        {/* Main Content: Title & Description */}
                        <div className="relative z-10 flex-grow flex flex-col justify-center">
                          <h3 className="font-space text-5xl md:text-6xl font-black uppercase text-white group-hover:text-[#FFC107] transition-all duration-500 leading-[0.85] tracking-[-0.06em] italic drop-shadow-2xl">
                            {service.title}
                            {service.subtitle && (
                              <span className="block text-[0.4em] font-medium opacity-50 mt-4 tracking-wider normal-case not-italic">
                                {service.subtitle}
                              </span>
                            )}
                          </h3>
                          <p className="mt-8 text-zinc-500 font-medium text-sm md:text-base leading-relaxed max-w-[280px] opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                            {service.desc}
                          </p>
                        </div>

                        {/* Bottom CTA: Luxury Footer */}
                        <div className="relative z-10 pt-8 border-t border-white/5">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-zinc-500 group-hover:text-[#FFC107] transition-colors">
                              GET IN TOUCH
                            </span>
                            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-500 group-hover:bg-[#FFC107] group-hover:text-black group-hover:border-[#FFC107] transition-all duration-500">
                              <ArrowRight className="w-5 h-5" />
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Footer */}
            <div className="flex items-center justify-end mt-12 border-t border-white/5 pt-12">
              <div className="text-[10px] font-mono uppercase tracking-[0.5em] text-zinc-500 flex items-center gap-4">
                <span className="w-12 h-px bg-white/10"></span>
                EXPLORE CAPABILITIES
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
  );
}
