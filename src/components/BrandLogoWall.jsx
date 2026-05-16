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
    <div className="flex-shrink-0 min-w-[80px] md:min-w-[140px] h-16 md:h-24 flex items-center justify-center relative cursor-default transition-all duration-500 group">
      <img
        src={src}
        alt={brand.name}
        className="relative z-10 h-8 md:h-12 w-auto object-contain transition-all duration-500 opacity-90 group-hover:opacity-100 group-hover:scale-110"
        loading="lazy"
        draggable={false}
        onError={() => setFailed(true)}
      />
    </div>
  );
};

/* ─── Brand Data ──────────────────────────────────────────────────── */
const ALL_BRANDS = [
  { name: 'Glow & Lovely', domain: 'glowandlovely.in', manualUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/52/Glow_%26_Lovely_Logo.svg/1200px-Glow_%26_Lovely_Logo.svg.png' },
  { name: 'Ponds', domain: 'ponds.in' },
  { name: 'Lakme', domain: 'lakmeindia.com' },
  { name: 'Nykaa', domain: 'nykaa.com' },
  { name: 'Veet', domain: 'veet.co.in' },
  { name: 'Nivea', domain: 'nivea.com' },
  { name: 'Dabur', domain: 'dabur.com' },
  { name: 'Van Heusen', domain: 'vanheusenindia.com' },
  { name: 'Myntra', domain: 'myntra.com' },
  { name: 'Enamor', domain: 'enamor.co.in' },
  { name: 'Jockey', domain: 'jockey.in' },
  { name: 'Mochi', domain: 'mochishoes.com', manualUrl: 'https://cdn.brandfetch.io/idUQBW3WXI/w/250/h/74/theme/dark/logo.png?c=1bxid64Mup7aczewSAYMX&t=1777805870160' },
  { name: 'Alpenliebe', domain: 'perfettivanmelle.com' },
  { name: 'Burger King', domain: 'bk.com' },
  { name: 'Coca-Cola', domain: 'coca-cola.com' },
  { name: 'Britannia', domain: 'britannia.co.in' },
  { name: 'Mentos', domain: 'perfettivanmelle.com' },
  { name: 'Center Fresh', domain: 'perfettivanmelle.com' },
  { name: 'Tedhe Medhe', domain: 'itcportal.com' },
  { name: 'Ching\'s', domain: 'chingssecret.com' },
  { name: 'Instagram', domain: 'instagram.com' },
  { name: 'Snapchat', domain: 'snapchat.com' },
  { name: 'YouTube', domain: 'youtube.com' },
  { name: 'Sony Liv', domain: 'sonyliv.com' },
  { name: 'Prime Video', domain: 'primevideo.com' },
  { name: 'Netflix', domain: 'netflix.com' },
  { name: 'Tata Neu', domain: 'tataneu.com' },
  { name: 'Flipkart', domain: 'flipkart.com' },
  { name: 'Samsung', domain: 'samsung.com' },
  { name: 'Eureka Forbes', domain: 'eurekaforbes.com' },
  { name: 'Philips', domain: 'philips.com' },
  { name: 'Croma', domain: 'croma.com' },
  { name: 'Sony Music', domain: 'sonymusic.com' },
  { name: 'Warner Music India', domain: 'warnermusic.com' },
  { name: 'Canon', domain: 'canon.com' },
  { name: 'Skoda', domain: 'skoda-auto.com' },
  { name: 'Lego', domain: 'lego.com' },
  { name: 'P&G', domain: 'pg.com' },
  { name: 'Zomaland', domain: 'zomato.com' },
  { name: 'Huggies', domain: 'huggies.com' },
  { name: 'Sleepwell', domain: 'mysleepwell.com' },
];

const BRAND_ROWS = [
  { duration: 40, reverse: false, brands: ALL_BRANDS.slice(0, 10) },
  { duration: 55, reverse: true, brands: ALL_BRANDS.slice(10, 21) },
  { duration: 48, reverse: false, brands: ALL_BRANDS.slice(21, 31) },
  { duration: 60, reverse: true, brands: ALL_BRANDS.slice(31) },
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
            <div className="text-[#FFC107]/60 font-mono text-[12px] font-black tracking-[0.5em] uppercase pb-4">
              Brands We've Powered
            </div>
          </div>
        </Reveal>
      </div>

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
