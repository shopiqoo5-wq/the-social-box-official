import React from 'react';
import Reveal from '../components/Reveal';
import Magnetic from '../components/Magnetic';
import { ArrowUpRight, Box, Zap, Sparkles, Globe, Cpu, Users } from 'lucide-react';
import { useContact } from '../context/ContactContext';

export default function AboutPage() {
  const { openContact } = useContact();
  
  const values = [
    { title: "CULTURAL FIRST", desc: "We don't follow trends, we build them through viral engineering.", icon: <Zap /> },
    { title: "DATA POWERED", desc: "Creative vision backed by 2M+ creator data points.", icon: <Box /> },
    { title: "GLOBAL REACH", desc: "Deploying narratives across 25+ strategic regions.", icon: <Globe /> },
  ];

  const manifestoPoints = [
    { label: "01", text: "STORYTELLING IS OUR CURRENCY" },
    { label: "02", text: "COMMUNITY IS OUR ARCHITECTURE" },
    { label: "03", text: "VIRALITY IS OUR REVENUE" },
    { label: "04", text: "FUTURE IS OUR PLAYGROUND" },
  ];

  return (
    <div className="min-h-screen bg-transparent pt-32 md:pt-64 px-6 md:px-14 relative z-10 selection:bg-[#E2FF00] selection:text-black">
      
      {/* SECTION 1: THE STUDIO MANIFESTO */}
      <section className="mb-64">
        <div className="max-w-screen-2xl mx-auto">
          <Reveal delay={100} type="fade-3d">
            <h1 className="font-space text-[18vw] md:text-[14vw] leading-[0.8] tracking-tighter uppercase mb-24">
               DEVELOPMENT <br/>
               <span className="text-[#E2FF00] italic">STUDIO</span>
            </h1>
          </Reveal>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
             <Reveal delay={200} type="fade-3d">
                <p className="text-zinc-400 text-3xl md:text-5xl font-light leading-[1.05] tracking-tighter italic max-w-2xl">
                   Helping bold brands stand out across <span className="text-white font-black underline decoration-[#E2FF00] decoration-2 underline-offset-8">every screen</span>.
                </p>
             </Reveal>
             <Reveal delay={300} className="space-y-12">
                <p className="text-zinc-500 text-xl md:text-2xl font-light leading-relaxed">
                   The Social Box is a creative development studio specialized in building interactive content and strategic narratives. While we are a compact team of creative engineers, we have a hand-picked network of 2M+ collaborators ready to plug in.
                </p>
                <p className="text-zinc-500 text-xl md:text-2xl font-light leading-relaxed">
                   We push digital mediums to places you haven’t seen before. Beyond code, we offer 3D design, UI/UX motion, Full-stack development, and Creative consulting.
                </p>
             </Reveal>
          </div>
        </div>
      </section>

      {/* SECTION 2: BENTO CORE VALUES */}
      <section className="mb-64">
        <div className="max-w-screen-2xl mx-auto">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((v, i) => (
                <Reveal key={i} delay={i * 100} type="fade-3d">
                   <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-16 h-full flex flex-col justify-between group hover:bg-[#E2FF00] transition-all duration-1000">
                      <div className="mb-12 text-[#E2FF00] group-hover:text-black transition-all transform group-hover:scale-125 origin-left duration-700">
                         {v.icon}
                      </div>
                      <div>
                        <h3 className="font-space text-4xl font-black uppercase mb-6 text-white group-hover:text-black tracking-tighter leading-none transition-colors">{v.title}</h3>
                        <p className="font-medium text-zinc-500 group-hover:text-black/60 text-xl italic transition-colors leading-relaxed">{v.desc}</p>
                      </div>
                   </div>
                </Reveal>
              ))}
           </div>
        </div>
      </section>

      {/* SECTION 3: THE TEAM MATRIX */}
      <section className="mb-64 py-32 border-y border-white/10">
         <div className="max-w-screen-2xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-32">
               <Reveal type="fade-3d">
                  <h2 className="font-space text-6xl md:text-[10vw] font-black uppercase leading-none tracking-tighter">
                     THE <span className="text-zinc-700 italic">MATRIX</span>
                  </h2>
               </Reveal>
               <Reveal className="max-w-md text-right">
                  <p className="text-zinc-500 text-xl font-light italic leading-tight uppercase tracking-widest">[ 12 Core Engineers + 2M Creators ]</p>
               </Reveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
               {[
                 { role: "CREATIVE TECH", icon: <Cpu />, team: "ENGINEERING" },
                 { role: "CULTURE STRATEGY", icon: <Users />, team: "DATA" },
                 { role: "VISUAL NARRATIVE", icon: <Sparkles />, team: "PRODUCTION" },
                 { role: "GLOBAL OPS", icon: <Globe />, team: "STRATEGY" },
               ].map((t, i) => (
                  <Reveal key={i} delay={i * 150} type="fade-3d">
                     <div className="px-12 py-16 rounded-[2.5rem] bg-zinc-900/50 border border-white/5 group hover:border-[#E2FF00]/50 transition-all duration-700">
                        <div className="text-[#E2FF00] mb-8">{t.icon}</div>
                        <h4 className="font-space text-2xl font-black text-white uppercase tracking-tighter mb-2">{t.role}</h4>
                        <div className="text-[10px] font-black tracking-[0.4em] text-zinc-600 uppercase">{t.team}</div>
                     </div>
                  </Reveal>
               ))}
            </div>
         </div>
      </section>

      {/* SECTION 4: MANIFESTO */}
      <section className="mb-64">
         <div className="max-w-screen-2xl mx-auto">
            <div className="divide-y divide-white/10">
               {manifestoPoints.map((p, i) => (
                  <div key={i} className="py-16 md:py-24 flex items-center justify-between group cursor-pointer transition-all hover:px-12">
                     <div className="flex items-center gap-12 md:gap-24">
                        <span className="text-[#E2FF00] font-space text-2xl md:text-3xl font-black opacity-20 group-hover:opacity-100 transition-opacity italic">{p.label}</span>
                        <h3 className="font-space text-4xl md:text-[8vw] font-black uppercase leading-none tracking-tighter text-zinc-800 group-hover:text-white transition-colors">
                           {p.text}
                        </h3>
                     </div>
                     <ArrowUpRight className="w-12 h-12 md:w-24 md:h-24 text-[#E2FF00] opacity-0 group-hover:opacity-100 transition-all transform scale-50 group-hover:scale-100" />
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* SECTION 5: INTERFACE CALL */}
      <section className="py-64 border-t border-white/10">
         <div className="max-w-screen-2xl mx-auto flex flex-col items-center justify-center text-center">
            <Reveal type="fade-3d">
               <h2 className="font-space text-7xl md:text-[14vw] leading-[0.85] tracking-tighter uppercase mb-20 italic">
                  LET’S <br/>
                  <span className="text-[#E2FF00] not-italic drop-shadow-[0_0_60px_rgba(242,236,36,0.3)]">INTERFACE</span>
               </h2>
            </Reveal>
            <Reveal delay={200}>
               <Magnetic>
                  <button 
                    onClick={openContact}
                    className="px-20 py-10 bg-[#E2FF00] text-black font-black uppercase tracking-[0.5em] text-[10px] rounded-full hover:scale-110 active:scale-95 transition-all shadow-2xl"
                  >
                     Interface Now
                  </button>
               </Magnetic>
            </Reveal>
         </div>
      </section>
    </div>
  );
}
