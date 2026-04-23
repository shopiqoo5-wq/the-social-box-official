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
    <div className="min-h-[100dvh] bg-transparent pt-32 md:pt-64 px-6 md:px-14 relative z-10 selection:bg-[#FFC107] selection:text-black">
      
      {/* SECTION 1: THE STUDIO MANIFESTO */}
      <section className="mb-64">
        <div className="max-w-screen-2xl mx-auto">
          <Reveal delay={100} type="fade-3d">
            <h1 className="font-space text-[11vw] md:text-[9vw] leading-[0.8] tracking-tighter uppercase mb-24 break-words">
               DEVELOPMENT <br/>
               <span className="text-[#FFC107] italic">STUDIO</span>
            </h1>
          </Reveal>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
              <Reveal delay={200} type="fade-3d">
                <p className="text-zinc-300 text-3xl md:text-5xl font-light leading-[1.05] tracking-tighter italic max-w-2xl">
                   Helping brands stay <span className="text-white font-black underline decoration-[#FFC107] decoration-2 underline-offset-8">Relevant</span>, not just visible.
                </p>
              </Reveal>
              <Reveal delay={300} className="space-y-12">
                <p className="text-zinc-500 text-xl md:text-2xl font-light leading-relaxed">
                   The Social Box is a social-first marketing agency built for brands that want to stay relevant, not just visible. We operate at the intersection of culture, creativity, and strategy — helping brands show up in ways that people actually care about.
                </p>
                <p className="text-zinc-500 text-xl md:text-2xl font-light leading-relaxed">
                   With a strong focus on creative brand building and influencer-led ecosystems, we craft narratives that move seamlessly across platforms and communities, reaching audiences across India. Our approach is simple: if it doesn’t feel native to the feed, it doesn’t belong there.
                </p>
                <p className="text-zinc-500 text-xl md:text-2xl font-light leading-relaxed font-bold italic border-l-4 border-[#FFC107] pl-8">
                   We don’t just market brands — we shape how they’re perceived, shared, and talked about.
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
                   <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-16 h-full flex flex-col justify-between group hover:bg-[#FFC107] transition-all duration-1000">
                      <div className="mb-12 text-[#FFC107] group-hover:text-black transition-all transform group-hover:scale-125 origin-left duration-700">
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

      {/* SECTION 4: MANIFESTO */}
      <section className="mb-64">
         <div className="max-w-screen-2xl mx-auto">
            <div className="divide-y divide-white/10">
               {manifestoPoints.map((p, i) => (
                  <div key={i} className="py-16 md:py-24 flex items-center justify-between group cursor-pointer transition-all hover:px-12">
                     <div className="flex items-center gap-12 md:gap-24">
                        <span className="text-[#FFC107] font-space text-2xl md:text-3xl font-black opacity-20 group-hover:opacity-100 transition-opacity italic">{p.label}</span>
                        <h3 className="font-space text-4xl md:text-[5vw] lg:text-[4vw] font-black uppercase leading-none tracking-tighter text-zinc-800 group-hover:text-white transition-colors break-words max-w-[80vw]">
                           {p.text}
                        </h3>
                     </div>

                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* SECTION 5: INTERFACE CALL */}
      <section className="py-64 border-t border-white/10">
         <div className="max-w-screen-2xl mx-auto flex flex-col items-center justify-center text-center">
            <Reveal type="fade-3d">
               <h2 className="font-space text-[14vw] md:text-[10vw] leading-[0.85] tracking-tighter uppercase mb-20 italic break-words">
                  LET’S <br/>
                  <span className="text-[#FFC107] not-italic drop-shadow-[0_0_60px_rgba(255,193,7,0.3)]">INTERFACE</span>
               </h2>
            </Reveal>
            <Reveal delay={200}>
               <Magnetic>
                  <button 
                    onClick={openContact}
                    className="px-20 py-10 bg-[#FFC107] text-black font-black uppercase tracking-[0.5em] text-[10px] rounded-full hover:scale-110 active:scale-95 transition-all shadow-2xl"
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
