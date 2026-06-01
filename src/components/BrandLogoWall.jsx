import React, { useState } from 'react';
import Reveal from './Reveal';

/* ─── Brand Card Component ────────────────────────────────────────── */
const BrandCard = ({ brand }) => {
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  const src = brand.manualUrl
    ? brand.manualUrl
    : (brand.domain 
        ? `https://cdn.brandfetch.io/domain/${brand.domain}?c=1id4i7oH6cQLKD82x3G&theme=dark`
        : `https://cdn.simpleicons.org/${brand.slug}`
      );

  return (
    <div className="flex-shrink-0 min-w-[85px] md:min-w-[150px] h-16 md:h-24 flex items-center justify-center relative cursor-default transition-all duration-500 group">
      <img
        src={src}
        alt={brand.name}
        className={`relative z-10 w-24 h-8 md:w-40 md:h-14 object-contain transition-all duration-500 opacity-90 group-hover:opacity-100 ${brand.scaleUp ? 'scale-150 md:scale-[1.8] group-hover:scale-[1.6] md:group-hover:scale-[1.9]' : 'group-hover:scale-110'}`}
        style={{
          ...(brand.invert ? { filter: 'brightness(0) invert(1)' } : {}),
          ...(brand.shadow ? { filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.8))' } : {}),
          ...(brand.bgWhite ? { backgroundColor: 'white', borderRadius: '50%' } : {})
        }}
        loading="lazy"
        draggable={false}
        onError={() => setFailed(true)}
      />
    </div>
  );
};

/* ─── Brand Data ──────────────────────────────────────────────────── */
const ALL_BRANDS = [
  { name: 'Sleepwell', manualUrl: '/images/client-logos/sleepwell.png' },
  { name: 'Zomaland', manualUrl: '/images/client-logos/zomaland.png' },
  { name: 'Skoda Auto', manualUrl: '/images/client-logos/skoda.png' },
  { name: 'LEGO', manualUrl: '/images/client-logos/lego.png' },
  { name: 'P&G', manualUrl: '/images/client-logos/pandg.png' },
  { name: 'Kamiliant', manualUrl: '/images/client-logos/kamiliant.png', invert: true },
  { name: 'Huggies', manualUrl: '/images/client-logos/huggies.png' },
  { name: 'Imagine', manualUrl: '/images/client-logos/imagine.png', invert: true },
  { name: 'Canon', manualUrl: '/images/client-logos/canon.png' },
  { name: 'Warner Music Group', manualUrl: '/images/client-logos/wmg.png' },
  { name: 'Sony', manualUrl: '/images/client-logos/sony.png' },
  { name: 'Croma', manualUrl: '/images/client-logos/croma.png' },
  { name: 'Philips', manualUrl: '/images/client-logos/philips.png' },
  { name: 'Ponds', manualUrl: '/images/client-logos/logo1.png', invert: true },
  { name: 'WOW Skin Science', manualUrl: '/images/client-logos/logo2.png', invert: true },
  { name: 'Lakme', manualUrl: '/images/client-logos/logo3.png', invert: true },
  { name: 'Nykaa', manualUrl: '/images/client-logos/logo4.png' },
  { name: 'Glow & Lovely', manualUrl: '/images/client-logos/logo5.png' },
  { name: 'Veet', manualUrl: '/images/client-logos/logo6.png' },
  { name: 'NIVEA', manualUrl: '/images/client-logos/logo7.png' },
  { name: 'Episoft', manualUrl: '/images/client-logos/logo8.png' },
  { name: 'Dabur', manualUrl: '/images/client-logos/logo9.png', scaleUp: true },
  { name: 'Fair and Handsome', manualUrl: '/images/client-logos/logo10.png', invert: true },
  { name: 'Lifestyle', manualUrl: '/images/client-logos/logo11.png', invert: true },
  { name: 'GO COLORS', manualUrl: '/images/client-logos/logo12.png', invert: true },
  { name: 'VanHeusen', manualUrl: '/images/client-logos/logo13.png', invert: true },
  { name: 'Enamor', manualUrl: '/images/client-logos/logo14.png' },
  { name: 'Myntra', manualUrl: '/images/client-logos/logo15.png' },
  { name: 'SOKTAS', manualUrl: '/images/client-logos/logo16.png' },
  { name: 'JOCKEY', manualUrl: '/images/client-logos/logo17.png', invert: true },
  { name: 'MOCHI', manualUrl: '/images/client-logos/logo18_cropped.png' },
  { name: 'Burger King', manualUrl: '/images/client-logos/logo19.png' },
  { name: 'Coca-Cola', manualUrl: '/images/client-logos/logo20.png' },
  { name: 'Britannia', manualUrl: '/images/client-logos/logo21.png' },
  { name: 'Alpenliebe', manualUrl: '/images/client-logos/logo22.png' },
  { name: 'mentos', manualUrl: '/images/client-logos/logo23.png' },
  { name: 'Kingfisher', manualUrl: '/images/client-logos/logo24.png' },
  { name: 'Bingo', manualUrl: '/images/client-logos/logo25.png' },
  { name: 'Chings Secret', manualUrl: '/images/client-logos/logo26.png', invert: true },
  { name: 'Center fresh', manualUrl: '/images/client-logos/logo27.png' },
  { name: 'Instagram', manualUrl: '/images/client-logos/logo28.png' },
  { name: 'Snapchat', manualUrl: '/images/client-logos/logo29.png' },
  { name: 'YouTube', manualUrl: '/images/client-logos/logo30.png' },
  { name: 'Sony LIV', manualUrl: '/images/client-logos/logo31.png' },
  { name: 'Prime Video', manualUrl: '/images/client-logos/prime-video-new.png', shadow: true },
  { name: 'Amazon miniTV', manualUrl: '/images/client-logos/amazon-minitv-new.png' },
  { name: 'Netflix', manualUrl: '/images/client-logos/logo34.png' },
  { name: 'Tata Neu', manualUrl: '/images/client-logos/tata-neu-new.png' },
  { name: 'Flipkart', manualUrl: '/images/client-logos/logo36.png' },
  { name: 'Samsung', manualUrl: '/images/client-logos/logo37.png' },
  { name: 'Eureka Forbes', manualUrl: '/images/client-logos/logo38.png', scaleUp: true },
];

const BRAND_ROWS = [
  { duration: 15, reverse: false, brands: ALL_BRANDS.slice(0, 16) },
  { duration: 22, reverse: true, brands: ALL_BRANDS.slice(16, 32) },
  { duration: 18, reverse: false, brands: ALL_BRANDS.slice(32) },
];

export default function BrandLogoWall() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <section 
      className="py-12 md:py-20 bg-[#050505] relative overflow-hidden group/wall"
      onMouseMove={handleMouseMove}
      style={{ '--mouse-x': `${mousePos.x}px`, '--mouse-y': `${mousePos.y}px` }}
    >
      <div 
        className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-700 opacity-0 group-hover/wall:opacity-100"
        style={{ background: 'radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(255,193,7,0.08), transparent 40%)' }}
      />
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 mb-16 md:mb-24 relative z-[70]">
        <Reveal type="fade-3d">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-16">
            <h2 className="font-space text-[10vw] md:text-[6vw] leading-[0.85] tracking-[-0.04em] uppercase font-black">
              TRUSTED<br />
              <span className="text-[#FFC107] italic">PARTNERS</span>
            </h2>
            <div className="text-white hover:text-[#FFC107] transition-colors duration-300 cursor-pointer font-mono text-[12px] font-black tracking-[0.5em] uppercase pb-4">
              Brands We've Powered
            </div>
          </div>
        </Reveal>
      </div>

      <div className="space-y-6 md:space-y-8 relative pt-6 pb-6">
        {BRAND_ROWS.map((row, rowIndex) => (
          <div key={rowIndex} className="overflow-hidden brand-row-wrapper py-2">
            <div
              className="brand-row flex flex-nowrap items-center gap-12 md:gap-20 px-6 md:px-12 w-max"
              style={{
                animation: `brand-marquee ${row.duration}s linear infinite`,
                animationDirection: row.reverse ? 'reverse' : 'normal',
              }}
            >
              {[...row.brands, ...row.brands].map((brand, i) => (
                <BrandCard key={`${brand.name}-${i}`} brand={brand} />
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
