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
      <span className="relative z-10 font-space font-bold text-sm md:text-base text-white/70 group-hover:text-black/80 transition-colors duration-500 select-none uppercase tracking-tight">
        {brand.initial}
      </span>
    );
  }

  return (
    <img
      src={`https://cdn.simpleicons.org/${brand.slug}/ffffff`}
      alt={brand.name}
      width={40}
      height={40}
      className="relative z-10 w-8 h-8 md:w-10 md:h-10 object-contain transition-all duration-500 group-hover:brightness-0"
      loading="lazy"
      draggable={false}
      onError={() => setFailed(true)}
    />
  );
};

/* ─── Brand Data ──────────────────────────────────────────────────── */
const ALL_BRANDS = [
  // Row 1 — Beauty & Personal Care
  { name: 'WOW Skin Science', slug: null, color: '#2C2C2C', initial: 'WOW' },
  { name: "Pond's", slug: null, color: '#003087', initial: "PD" },
  { name: 'Lakme', slug: null, color: '#000000', initial: 'LK' },
  { name: 'Nykaa', slug: null, color: '#FC2779', initial: 'NK' },
  { name: 'Glow & Lovely', slug: null, color: '#D4A5D8', initial: 'GL' },
  { name: 'Veet', slug: null, color: '#00A651', initial: 'VT' },
  { name: 'Nivea', slug: null, color: '#003DA5', initial: 'NV' },
  { name: 'Epigamia', slug: null, color: '#E84393', initial: 'EP' },
  { name: 'Dabur', slug: null, color: '#007A33', initial: 'DB' },
  { name: 'Emami', slug: null, color: '#D4AF37', initial: 'EM' },

  // Row 2 — Fashion & Lifestyle
  { name: 'Go Colors', slug: null, color: '#FF6B6B', initial: 'GC' },
  { name: 'Lifestyle', slug: null, color: '#E31837', initial: 'LS' },
  { name: 'Van Heusen', slug: null, color: '#1A1A1A', initial: 'VH' },
  { name: 'Myntra', slug: null, color: '#FF3F6C', initial: 'MY' },
  { name: 'Enamor', slug: null, color: '#C71585', initial: 'EN' },
  { name: 'Soktas', slug: null, color: '#1C3F60', initial: 'SK' },
  { name: 'Jockey', slug: null, color: '#003DA5', initial: 'JK' },
  { name: 'Mochi', slug: null, color: '#FF9900', initial: 'MC' },

  // Row 3 — Food & Beverage
  { name: 'Alpenliebe', slug: null, color: '#FFD700', initial: 'AL' },
  { name: 'Burger King', slug: 'burgerking', color: '#D62300', initial: 'BK' },
  { name: 'Coca-Cola', slug: 'cocacola', color: '#E61A27', initial: 'CC' },
  { name: 'Kingfisher', slug: null, color: '#E31837', initial: 'KF' },
  { name: 'Britannia', slug: null, color: '#003DA5', initial: 'BR' },
  { name: 'Mentos', slug: null, color: '#00A651', initial: 'MT' },
  { name: 'Center Fresh', slug: null, color: '#00B4D8', initial: 'CF' },
  { name: 'Tedhe Medhe', slug: null, color: '#FF6B00', initial: 'TM' },

  // Row 4 — Digital & Entertainment
  { name: 'Instagram', slug: 'instagram', color: '#E4405F', initial: 'Ig' },
  { name: 'Snapchat', slug: 'snapchat', color: '#FFFC00', initial: 'Sc' },
  { name: 'YouTube', slug: 'youtube', color: '#FF0000', initial: 'YT' },
  { name: 'SonyLIV', slug: null, color: '#1A1A1A', initial: 'SL' },
  { name: 'Prime Video', slug: 'primevideo', color: '#00A8E1', initial: 'PV' },
  { name: 'Amazon MiniTV', slug: null, color: '#FF9900', initial: 'mTV' },
  { name: 'Netflix', slug: 'netflix', color: '#E50914', initial: 'N' },
  { name: 'Tata Neu', slug: null, color: '#5C2D91', initial: 'TN' },
  { name: 'Flipkart', slug: 'flipkart', color: '#2874F0', initial: 'Fk' },

  // Row 5 — Tech & Electronics
  { name: 'Samsung', slug: 'samsung', color: '#1428A0', initial: 'SM' },
  { name: 'Eureka Forbes', slug: null, color: '#003DA5', initial: 'EF' },
  { name: 'Philips', slug: null, color: '#0B5ED7', initial: 'PH' },
  { name: 'Croma', slug: null, color: '#00A651', initial: 'CR' },
  { name: 'Imagine Apple', slug: null, color: '#555555', initial: 'IA' },
  { name: 'Sony Music', slug: null, color: '#E31837', initial: 'SoM' },
  { name: 'Warner Music India', slug: null, color: '#1A1A1A', initial: 'WM' },
  { name: 'Canon', slug: 'canon', color: '#BC0024', initial: 'Ca' },

  // Row 6 — Others
  { name: 'Skoda', slug: 'skoda', color: '#4BA82E', initial: 'ŠK' },
  { name: 'Lego', slug: 'lego', color: '#D01012', initial: 'LG' },
  { name: 'P&G', slug: null, color: '#003DA5', initial: 'P&G' },
  { name: 'Kamiliant', slug: null, color: '#FF6B00', initial: 'KM' },
  { name: 'Zomato', slug: 'zomato', color: '#E23744', initial: 'Zm' },
  { name: 'Huggies', slug: null, color: '#E31837', initial: 'HG' },
  { name: 'Sleepwell', slug: null, color: '#0066B2', initial: 'Sw' },
];

// Build 4 rows — distribute brands across rows for variety
const BRAND_ROWS = [
  {
    duration: 35,
    reverse: false,
    brands: [ALL_BRANDS[0], ALL_BRANDS[1], ALL_BRANDS[2], ALL_BRANDS[3], ALL_BRANDS[4], ALL_BRANDS[5], ALL_BRANDS[6], ALL_BRANDS[7], ALL_BRANDS[8], ALL_BRANDS[9], ALL_BRANDS[18], ALL_BRANDS[19], ALL_BRANDS[20]],
  },
  {
    duration: 40,
    reverse: true,
    brands: [ALL_BRANDS[10], ALL_BRANDS[11], ALL_BRANDS[12], ALL_BRANDS[13], ALL_BRANDS[14], ALL_BRANDS[15], ALL_BRANDS[16], ALL_BRANDS[17], ALL_BRANDS[21], ALL_BRANDS[22], ALL_BRANDS[23], ALL_BRANDS[24], ALL_BRANDS[25]],
  },
  {
    duration: 38,
    reverse: false,
    brands: [ALL_BRANDS[26], ALL_BRANDS[27], ALL_BRANDS[28], ALL_BRANDS[29], ALL_BRANDS[30], ALL_BRANDS[31], ALL_BRANDS[32], ALL_BRANDS[33], ALL_BRANDS[34], ALL_BRANDS[35], ALL_BRANDS[36], ALL_BRANDS[37], ALL_BRANDS[38]],
  },
  {
    duration: 42,
    reverse: true,
    brands: [ALL_BRANDS[39], ALL_BRANDS[40], ALL_BRANDS[41], ALL_BRANDS[42], ALL_BRANDS[43], ALL_BRANDS[44], ALL_BRANDS[45], ALL_BRANDS[46], ALL_BRANDS[47], ALL_BRANDS[48], ALL_BRANDS[49], ALL_BRANDS[0], ALL_BRANDS[32]],
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
                  className="brand-card group flex-shrink-0 w-[4.5rem] h-[4.5rem] md:w-24 md:h-24 rounded-2xl md:rounded-[1.4rem] flex items-center justify-center relative overflow-hidden cursor-default"
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
