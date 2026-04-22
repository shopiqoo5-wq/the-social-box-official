import React from 'react';
import Reveal from '../components/Reveal';
import { ArrowUpRight, Zap, Globe, Target, TrendingUp } from 'lucide-react';

export default function ImpactPage() {
  const stats = [
    { label: "COLLECTIVE REACH", val: "2M+" },
    { label: "GLOBAL ACCESS", val: "25+ Regions" },
    { label: "ANNUAL IMPRESSIONS", val: "1B+" },
    { label: "AVERAGE ROI", val: "500%" }
  ];

  const brandMarquee = [
    "RELIANCE", "RED BULL", "ZEE5", "NETFLIX", "AMAZON", "PUMA", "NIKE", "ADIDAS", "RELIANCE", "RED BULL", "ZEE5", "NETFLIX"
  ];

  return (
    <div className="min-h-[100dvh] pt-32 md:pt-64 px-6 md:px-14 relative z-10 selection:bg-[#FFC107] selection:text-black pb-32">
      
      {/* SECTION 1: THE DATA HEADLINE */}
      <section className="mb-64">
        <div className="max-w-screen-2xl mx-auto">
          <Reveal type="fade-3d">
            <h1 className="font-space text-[14vw] md:text-[10vw] leading-[0.75] tracking-tighter uppercase mb-24 break-words">
               MASSIVE <br/>
               <span className="text-[#FFC107] italic">IMPACT</span>
            </h1>
          </Reveal>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
             <Reveal delay={200} type="fade-3d">
                <p className="text-zinc-400 text-3xl md:text-5xl font-light leading-[1.05] tracking-tighter italic max-w-3xl">
                   We leverage a global network of <span className="text-white font-black underline decoration-[#FFC107] decoration-2 underline-offset-8">2 Million+ creators</span> to move audiences, not just reach them.
                </p>
             </Reveal>
             <div className="grid grid-cols-2 gap-8">
               {stats.map((stat, i) => (
                  <Reveal key={i} delay={i * 100} type="fade-3d" className="bg-white/5 border border-white/10 rounded-[3rem] p-12 transition-all hover:bg-[#FFC107] group cursor-pointer overflow-hidden relative shadow-xl will-change-transform">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-100 transition-opacity">
                       <TrendingUp className="w-8 h-8 text-[#FFC107] group-hover:text-black" />
                    </div>
                    <div className="font-space text-4xl md:text-6xl font-black text-[#FFC107] group-hover:text-black mb-2 leading-none">{stat.val}</div>
                    <div className="text-[10px] tracking-[0.4em] font-black text-zinc-500 group-hover:text-black/60 uppercase">{stat.label}</div>
                  </Reveal>
               ))}
             </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE NETWORK MARQUEE */}
      <section className="mb-64 py-24 bg-white/5 backdrop-blur-3xl overflow-hidden -mx-6 md:-mx-14">
         <div className="flex animate-marquee whitespace-nowrap">
            {brandMarquee.map((brand, i) => (
               <div key={i} className="mx-12 md:mx-24 font-space text-6xl md:text-[10vw] font-black uppercase text-white/5 hover:text-[#FFC107] transition-colors cursor-default">
                  {brand}
               </div>
            ))}
         </div>
      </section>

      {/* SECTION 3: THE STRATEGY GRID */}
      <section className="mb-64">
         <div className="max-w-screen-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
               <Reveal type="fade-3d" className="bg-zinc-900 rounded-[4rem] p-20 border border-white/5 hover:border-[#FFC107]/50 transition-all duration-700">
                  <Target className="w-16 h-16 text-[#FFC107] mb-12" />
                  <h3 className="font-space text-5xl font-black uppercase text-white mb-8 italic">VIRAL <br/> ENGINEERING</h3>
                  <p className="text-zinc-500 text-2xl font-light leading-relaxed italic">
                     Building content that bypasses algorithms and lands directly in the cultural zeitgeist. We don't guess; we engineer.
                  </p>
               </Reveal>

               <Reveal delay={200} type="fade-3d" className="bg-zinc-900 rounded-[4rem] p-20 border border-white/5 hover:border-[#FFC107]/50 transition-all duration-700">
                  <Globe className="w-16 h-16 text-[#FFC107] mb-12" />
                  <h3 className="font-space text-5xl font-black uppercase text-white mb-8 italic">GLOBAL <br/> ALLIANCES</h3>
                  <p className="text-zinc-500 text-2xl font-light leading-relaxed italic">
                     Plugging brands into hand-picked creator nodes across North America, Europe, and Asia-Pacific. A single interface for world-wide reach.
                  </p>
               </Reveal>
            </div>
         </div>
      </section>

      {/* SECTION 4: REAL NUMBERS CLOSER */}
      <section className="py-64 border-t border-white/10">
         <div className="max-w-screen-2xl mx-auto flex flex-col items-center">
            <Reveal type="fade-3d">
               <h2 className="font-space text-6xl md:text-[12vw] leading-none tracking-tighter uppercase text-center italic mb-20">
                  DATA <br/>
                  <span className="text-[#FFC107] not-italic drop-shadow-[0_0_60px_rgba(255,193,7,0.3)]">DRIVEN</span>
               </h2>
            </Reveal>
            <div className="h-1 w-full max-w-sm bg-gradient-to-r from-transparent via-[#FFC107] to-transparent"></div>
         </div>
      </section>

    </div>
  );
}
