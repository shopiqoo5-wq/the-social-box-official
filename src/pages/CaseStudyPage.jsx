import React from 'react';
import Reveal from '../components/Reveal';
import LazyVideo from '../components/LazyVideo';
import { Play, ArrowUpRight, Zap, Box, Globe, ChevronRight } from 'lucide-react';

export default function CaseStudyPage() {
  const cases = [
    { id: "01", category: "Social Strategy", title: "THE GOLDEN HOUR", video: "/videos/reel-1.mp4", metric: "2.4M+", label: "Reach" },
    { id: "02", category: "Influencer Network", title: "CULTURAL SYNERGY", video: "/videos/reel-2.mp4", metric: "150K+", label: "Growth" },
    { id: "03", category: "Interactive 3D", title: "VIRTUAL PORTAL", video: "/videos/reel-3.mp4", metric: "50+", label: "Conversions" },
    { id: "04", category: "Content Blast", title: "VIRAL ENGINE", video: "/videos/reel-4.mp4", metric: "10M+", label: "Impressions" },
  ];

  return (
    <div className="min-h-screen pt-32 md:pt-64 px-6 md:px-14 pb-32 relative z-10 selection:bg-[#E2FF00] selection:text-black">
      
      {/* Header Narrative */}
      <div className="max-w-screen-2xl mx-auto mb-64 flex flex-col md:flex-row justify-between items-end gap-16 border-b border-white/10 pb-24">
        <Reveal type="fade-3d">
          <h1 className="font-space text-[18vw] md:text-[12vw] leading-[0.8] tracking-tighter uppercase">
             SELECTED <br/>
             <span className="text-[#E2FF00] italic">WORK</span>
          </h1>
        </Reveal>
        <Reveal delay={200} type="fade-3d">
           <div className="max-w-md text-zinc-500 font-light text-xl md:text-2xl italic leading-tight uppercase tracking-widest text-right mb-6">
              [ High performance, executive-level execution ]
           </div>
        </Reveal>
      </div>

      {/* Case Studies Grid - Shader.se Style Large Perspective */}
      <div className="max-w-screen-2xl mx-auto space-y-40 md:space-y-64 pb-64">
        {cases.map((cs, i) => (
          <Reveal key={i} delay={i * 100} type="fade-3d">
             <div className="group relative grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24 items-center">
                
                {/* Visual Section - Large Video/Image */}
                <div className="lg:col-span-7 relative h-[30rem] md:h-[45rem] rounded-[4rem] overflow-hidden bg-zinc-900 border border-white/5 transition-all duration-1000 group-hover:scale-[1.02] active:scale-95 shadow-2xl group-hover:border-[#E2FF00]/50">
                    <LazyVideo 
                      src={cs.video} 
                      className="w-full h-full object-cover scale-[1.05] group-hover:scale-100 transition-transform duration-[2s] opacity-60 group-hover:opacity-100 transition-opacity" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40 group-hover:opacity-0 transition-opacity"></div>
                    <div className="absolute top-12 left-12 inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-black/40 backdrop-blur-xl text-[10px] font-black tracking-widest uppercase text-white transition-all transform group-hover:scale-110">
                      <span className="w-2 h-2 rounded-full bg-[#E2FF00]"></span>
                      {cs.category}
                    </div>
                </div>

                {/* Content Section - Bold Typography */}
                <div className="lg:col-span-5 flex flex-col justify-center space-y-10 px-4 md:px-0">
                   <div className="font-space text-[12vw] md:text-[6vw] font-black leading-none tracking-tighter uppercase grayscale group-hover:grayscale-0 transition-all duration-1000">
                      {cs.title}
                   </div>
                   
                   <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-10">
                      <div className="space-y-2">
                        <div className="text-[#E2FF00] font-space text-5xl md:text-6xl font-black italic">{cs.metric}</div>
                        <div className="text-zinc-500 font-black uppercase text-[10px] tracking-[0.4em]">{cs.label}</div>
                      </div>
                      <div className="flex items-end justify-end">
                         <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#E2FF00] group-hover:text-black transition-all duration-700 hover:scale-110 active:scale-90 shadow-xl cursor-none">
                            <ArrowUpRight className="w-8 h-8" />
                         </div>
                      </div>
                   </div>

                   <p className="text-zinc-500 text-xl font-light italic leading-snug">
                      We engineered a seamless cross-platform narrative that drove authentic brand sentiment and measurable growth in under 30 days.
                   </p>
                </div>

                {/* Numbering Overlay */}
                <div className="absolute -left-12 top-1/2 -translate-y-1/2 text-white/5 font-space text-[20vw] font-black select-none pointer-events-none group-hover:text-[#E2FF00]/10 transition-colors hidden lg:block">
                   {cs.id}
                </div>
             </div>
          </Reveal>
        ))}
      </div>

      {/* Narrative Footer */}
      <div className="mt-32 pt-32 border-t border-white/10 text-center">
         <Reveal delay={200} type="fade-3d">
            <h2 className="font-space text-[10vw] md:text-[7vw] font-black text-[#E2FF00] uppercase tracking-tighter shadow-2xl hover:italic transition-all duration-500 leading-none">
               READY TO <br/>
               <span className="text-white underline decoration-[#E2FF00]">Synergize?</span>
            </h2>
         </Reveal>
      </div>

    </div>
  );
}
