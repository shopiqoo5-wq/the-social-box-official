import React, { useState } from 'react';
import Reveal from './Reveal';

/* ─── Brand Logo Icon ────────────────────────────────────────────────
   Loads SVG from Simple Icons CDN (white).
   Falls back to styled initial if slug is missing or image fails.
──────────────────────────────────────────────────────────────────── */
const BrandLogo = ({ brand }) => {
  const [failed, setFailed] = useState(false);

  if (!brand.slug || failed) {
    return (
      <span className="relative z-10 font-space font-black text-[10px] md:text-[13px] text-white group-hover:text-black transition-colors duration-500 select-none uppercase tracking-[0.1em] whitespace-nowrap px-4 text-center leading-tight">
        {brand.name}
      </span>
    );
  }

  return (
    <img
      src={`https://cdn.simpleicons.org/${brand.slug}/ffffff`}
      alt={brand.name}
      width={48}
      height={48}
      className="relative z-10 w-10 h-10 md:w-12 md:h-12 object-contain transition-all duration-500 group-hover:brightness-0"
      loading="lazy"
      draggable={false}
      onError={() => setFailed(true)}
    />
  );
};

/* ─── Brand Data ──────────────────────────────────────────────────── */
const ALL_BRANDS = [
  { name: 'WOW Skin Science', slug: null, color: '#000000', initial: 'WOW' },
  { name: 'Ponds', slug: null, color: '#2D2D2D', initial: 'PND' },
  { name: 'Lakme', slug: null, color: '#000000', initial: 'LKM' },
  { name: 'Nykaa', slug: null, color: '#E80071', initial: 'NYK' },
  { name: 'Glow & Lovely', slug: null, color: '#C92127', initial: 'G&L' },
  { name: 'Veet', slug: null, color: '#D6005E', initial: 'VT' },
  { name: 'Nivea', slug: 'nivea', color: '#003399', initial: 'NV' },
  { name: 'Dabur', slug: null, color: '#006B3F', initial: 'DBR' },
  { name: 'Myntra', slug: 'myntra', color: '#FF3F6C', initial: 'M' },
  { name: 'Van Heusen', slug: null, color: '#000000', initial: 'VH' },
  { name: 'Jockey', slug: null, color: '#000000', initial: 'JKY' },
  { name: 'Mochi', slug: null, color: '#00B4D8', initial: 'MCH' },
  { name: 'Burger King', slug: 'burgerking', color: '#DA291C', initial: 'BK' },
  { name: 'Coca-Cola', slug: 'cocacola', color: '#F40009', initial: 'CC' },
  { name: 'Britannia', slug: null, color: '#E31837', initial: 'BTN' },
  { name: 'Center Fresh', slug: null, color: '#00A1DE', initial: 'CF' },
  { name: 'Netflix', slug: 'netflix', color: '#E50914', initial: 'N' },
  { name: 'Prime Video', slug: 'amazonprime', color: '#00A8E1', initial: 'PV' },
  { name: 'YouTube', slug: 'youtube', color: '#FF0000', initial: 'YT' },
  { name: 'Snapchat', slug: 'snapchat', color: '#FFFC00', initial: 'Sc' },
  { name: 'Instagram', slug: 'instagram', color: '#E4405F', initial: 'Ig' },
  { name: 'Samsung', slug: 'samsung', color: '#1428A0', initial: 'SS' },
  { name: 'Philips', slug: 'philips', color: '#0066A1', initial: 'PH' },
  { name: 'Flipkart', slug: 'flipkart', color: '#2874F0', initial: 'Fk' },
  { name: 'Skoda', slug: 'skoda', color: '#006B3F', initial: 'SK' },
  { name: 'Lego', slug: 'lego', color: '#D01012', initial: 'LG' },
  { name: 'Huggies', slug: null, color: '#E31E24', initial: 'HG' },
  { name: 'Tata Neu', slug: null, color: '#542E91', initial: 'TN' },
];

// Build 4 rows by slicing & shuffling brands — each row has plenty of cards
const BRAND_ROWS = [
  {
    duration: 30,
    reverse: false,
    brands: [ALL_BRANDS[0], ALL_BRANDS[1], ALL_BRANDS[2], ALL_BRANDS[3], ALL_BRANDS[4], ALL_BRANDS[5], ALL_BRANDS[6], ALL_BRANDS[7], ALL_BRANDS[8]],
  },
  {
    duration: 38,
    reverse: true,
    brands: [ALL_BRANDS[9], ALL_BRANDS[10], ALL_BRANDS[11], ALL_BRANDS[12], ALL_BRANDS[13], ALL_BRANDS[14], ALL_BRANDS[15], ALL_BRANDS[16], ALL_BRANDS[17]],
  },
  {
    duration: 34,
    reverse: false,
    brands: [ALL_BRANDS[18], ALL_BRANDS[19], ALL_BRANDS[20], ALL_BRANDS[21], ALL_BRANDS[22], ALL_BRANDS[23], ALL_BRANDS[24], ALL_BRANDS[25], ALL_BRANDS[26], ALL_BRANDS[27]],
  },
  {
    duration: 42,
    reverse: true,
    brands: [ALL_BRANDS[0], ALL_BRANDS[4], ALL_BRANDS[8], ALL_BRANDS[12], ALL_BRANDS[16], ALL_BRANDS[20], ALL_BRANDS[24], ALL_BRANDS[2], ALL_BRANDS[6], ALL_BRANDS[10]],
  },
];

export default function BrandLogoWall() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section 
      className="py-24 md:py-40 bg-[#050505] relative overflow-hidden group/wall"
      onMouseMove={handleMouseMove}
      style={{
        '--mouse-x': `${mousePos.x}px`,
        '--mouse-y': `${mousePos.y}px`
      }}
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
              Brands We've Powered
            </div>
          </div>
        </Reveal>
      </div>

      {/* Horizontal Scrolling Logo Card Rows */}
      <div className="space-y-3 md:space-y-4 relative">

        {BRAND_ROWS.map((row, rowIndex) => (
          <div key={rowIndex} className="overflow-hidden brand-row-wrapper">
            <div
              className="brand-row flex flex-nowrap items-center gap-6 md:gap-8 w-max"
              style={{
                animation: `brand-marquee ${row.duration}s linear infinite`,
                animationDirection: row.reverse ? 'reverse' : 'normal',
              }}
            >
              {/* Duplicate 2× for seamless infinite horizontal scroll */}
              {[...row.brands, ...row.brands].map((brand, i) => (
                <div
                  key={`${rowIndex}-${i}`}
                  className="brand-card group flex-shrink-0 min-w-[100px] md:min-w-[160px] h-16 md:h-24 rounded-xl md:rounded-[1.5rem] flex items-center justify-center relative overflow-hidden cursor-default border border-white/5 px-6"
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
