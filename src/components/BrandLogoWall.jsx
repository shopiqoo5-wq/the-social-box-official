import React, { useRef, useCallback } from 'react';
import Reveal from './Reveal';

/* ─── Brand Logo Icon ────────────────────────────────────────────────
   Loads SVG from Simple Icons CDN (white).
   Falls back to styled initial if slug is missing or image fails.
──────────────────────────────────────────────────────────────────── */
const BrandLogo = ({ brand }) => {
  const [failed, setFailed] = useState(false);

  if (!brand.slug || failed) {
    return (
      <span className="relative z-10 font-space font-bold text-[11px] md:text-xs text-white/70 group-hover:text-black/80 transition-colors duration-500 select-none uppercase tracking-tight">
        {brand.initial}
      </span>
    );
  }

  return (
    <img
      src={`https://cdn.simpleicons.org/${brand.slug}/ffffff`}
      alt={brand.name}
      width={28}
      height={28}
      className="relative z-10 w-6 h-6 md:w-7 md:h-7 object-contain transition-all duration-500 group-hover:brightness-0"
      loading="lazy"
      draggable={false}
      onError={() => setFailed(true)}
    />
  );
};

/* ─── Brand Data ──────────────────────────────────────────────────── */
const ALL_BRANDS = [
  { name: 'Netflix', slug: 'netflix', color: '#E50914', initial: 'N' },
  { name: 'Google', slug: 'google', color: '#4285F4', initial: 'G' },
  { name: 'Spotify', slug: 'spotify', color: '#1DB954', initial: 'S' },
  { name: 'Snapchat', slug: 'snapchat', color: '#FFFC00', initial: 'Sc' },
  { name: 'Tinder', slug: 'tinder', color: '#FF6B6B', initial: 'T' },
  { name: 'Audible', slug: 'audible', color: '#F8991D', initial: 'Au' },
  { name: 'Bumble', slug: 'bumble', color: '#FFC629', initial: 'Bb' },
  { name: 'Nike', slug: 'nike', color: '#F5F5F5', initial: 'Nk' },
  { name: 'Krafton', slug: 'krafton', color: '#F7C948', initial: 'BK' },
  { name: 'Lego', slug: 'lego', color: '#D01012', initial: 'LG' },
  { name: 'Instagram', slug: 'instagram', color: '#E4405F', initial: 'Ig' },
  { name: 'Swiggy', slug: 'swiggy', color: '#FC8019', initial: 'Sw' },
  { name: 'Disney+', slug: 'disneyplus', color: '#1F80E0', initial: 'D+' },
  { name: 'OnePlus', slug: 'oneplus', color: '#EB0028', initial: '1+' },
  { name: 'Air India', slug: null, color: '#E31837', initial: 'AI' },
  { name: 'Flipkart', slug: 'flipkart', color: '#2874F0', initial: 'Fk' },
  { name: 'Red Bull', slug: 'redbull', color: '#DB0A40', initial: 'RB' },
  { name: 'Puma', slug: 'puma', color: '#86B049', initial: 'Pm' },
  { name: 'Amazon', slug: 'amazon', color: '#FF9900', initial: 'Az' },
  { name: 'ZEE5', slug: 'zee5', color: '#8230C6', initial: 'Z5' },
  { name: 'Adidas', slug: 'adidas', color: '#FFFFFF', initial: 'Ad' },
  { name: 'Lollapalooza', slug: null, color: '#00B4D8', initial: 'LL' },
  { name: 'Reliance', slug: null, color: '#003DA5', initial: 'RL' },
];

// Build 4 rows by slicing & shuffling brands — each row has plenty of cards
const BRAND_ROWS = [
  {
    duration: 30,
    reverse: false,
    brands: [ALL_BRANDS[0], ALL_BRANDS[1], ALL_BRANDS[2], ALL_BRANDS[3], ALL_BRANDS[4], ALL_BRANDS[5], ALL_BRANDS[6], ALL_BRANDS[7], ALL_BRANDS[8], ALL_BRANDS[9], ALL_BRANDS[10], ALL_BRANDS[11], ALL_BRANDS[12], ALL_BRANDS[13]],
  },
  {
    duration: 38,
    reverse: true,
    brands: [ALL_BRANDS[14], ALL_BRANDS[15], ALL_BRANDS[16], ALL_BRANDS[17], ALL_BRANDS[18], ALL_BRANDS[19], ALL_BRANDS[20], ALL_BRANDS[21], ALL_BRANDS[22], ALL_BRANDS[0], ALL_BRANDS[3], ALL_BRANDS[6], ALL_BRANDS[9], ALL_BRANDS[12]],
  },
  {
    duration: 34,
    reverse: false,
    brands: [ALL_BRANDS[2], ALL_BRANDS[5], ALL_BRANDS[8], ALL_BRANDS[11], ALL_BRANDS[14], ALL_BRANDS[17], ALL_BRANDS[20], ALL_BRANDS[1], ALL_BRANDS[4], ALL_BRANDS[7], ALL_BRANDS[10], ALL_BRANDS[13], ALL_BRANDS[16], ALL_BRANDS[19]],
  },
  {
    duration: 42,
    reverse: true,
    brands: [ALL_BRANDS[6], ALL_BRANDS[0], ALL_BRANDS[18], ALL_BRANDS[3], ALL_BRANDS[15], ALL_BRANDS[9], ALL_BRANDS[21], ALL_BRANDS[1], ALL_BRANDS[12], ALL_BRANDS[7], ALL_BRANDS[20], ALL_BRANDS[4], ALL_BRANDS[17], ALL_BRANDS[10]],
  },
];

export default function BrandLogoWall() {
  const sectionRef = useRef(null);

  // Update CSS custom properties directly on the DOM — no React re-renders
  const handleMouseMove = useCallback((e) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-24 md:py-40 bg-[#050505] relative overflow-hidden group/wall"
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic Cursor Spotlight */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-700 opacity-0 group-hover/wall:opacity-100"
        style={{
          background: 'radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(255,193,7,0.08), transparent 40%)'
        }}
      />
      {/* Section Header */}
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 mb-16 md:mb-24">
        <Reveal type="fade-3d">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-16">
            <h2 className="font-space text-[10vw] md:text-[6vw] leading-[0.85] tracking-[-0.04em] uppercase font-black">
              TRUSTED<br />
              <span className="text-[#FFC107] italic">PARTNERS</span>
            </h2>
            <div className="text-zinc-600 font-mono text-[10px] tracking-[0.6em] uppercase pb-4">
              [ Brands We've Powered ]
            </div>
          </div>
        </Reveal>
      </div>

      {/* Horizontal Scrolling Logo Card Rows */}
      <div className="space-y-3 md:space-y-4 relative">

        {BRAND_ROWS.map((row, rowIndex) => (
          <div key={rowIndex} className="overflow-hidden brand-row-wrapper">
            <div
              className="brand-row flex flex-nowrap items-center gap-3 md:gap-4 w-max"
              style={{
                animation: `brand-marquee ${row.duration}s linear infinite`,
                animationDirection: row.reverse ? 'reverse' : 'normal',
              }}
            >
              {/* Duplicate 2× for seamless infinite horizontal scroll */}
              {[...row.brands, ...row.brands].map((brand, i) => (
                <div
                  key={`${rowIndex}-${i}`}
                  className="brand-card group flex-shrink-0 w-14 h-14 md:w-[4.5rem] md:h-[4.5rem] rounded-2xl md:rounded-[1.2rem] flex items-center justify-center relative overflow-hidden cursor-default"
                  style={{
                    '--brand-color': brand.color,
                    '--brand-glow': `${brand.color}50`,
                  }}
                  title={brand.name}
                >
                  {/* Brand-color fill layer (revealed on hover) */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-[600ms] ease-[cubic-bezier(0.19,1,0.22,1)] z-0"
                    style={{ backgroundColor: brand.color }}
                  />

                  {/* Logo */}
                  <BrandLogo brand={brand} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Gradient fade edges - adjusted z-index so they sit above cards but below interaction */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-40 bg-gradient-to-r from-[#050505] to-transparent z-[60] pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-40 bg-gradient-to-l from-[#050505] to-transparent z-[60] pointer-events-none" />
    </section>
  );
}
