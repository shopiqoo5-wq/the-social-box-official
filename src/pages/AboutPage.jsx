import React from 'react';
import Reveal from '../components/Reveal';
import Magnetic from '../components/Magnetic';
import { Box, Zap, Sparkles, Globe, Cpu, Users } from 'lucide-react';
import { useContact } from '../context/ContactContext';
import MagneticOrbButton from '../components/MagneticOrbButton';

export default function AboutPage() {
  const { openContact } = useContact();
  
  const values = [
    { title: "Culture is Kind of Our Thing", desc: "We don't follow trends, we build them through viral engineering.", icon: <Zap /> },
    { title: "The Data Said So", desc: "Creative vision backed by 2M+ creator data points.", icon: <Box /> },
    { title: "We Think in Every Time Zone", desc: "Deploying narratives across 25+ strategic regions.", icon: <Globe /> },
  ];

  const manifestoPoints = [
    { label: "01", text: "Storytelling is Our Instinct" },
    { label: "02", text: "We Make People and Brand Stay" },
    { label: "03", text: "We Don't Chase Trends. We Start Them" },
    { label: "04", text: "Obsessed With What's Next" },
  ];

  return (
    <div className="matte-surface min-h-[100dvh] pt-32 md:pt-64 px-6 md:px-14 pb-32 relative z-10 selection:bg-[var(--gold)] selection:text-black">
      
      {/* Ambient glow */}
      <div className="cinematic-glow -top-20 -right-20" />

      {/* SECTION 1: THE STUDIO MANIFESTO */}
      <section className="mb-48 relative z-10">
        <div className="max-w-screen-2xl mx-auto">
          <Reveal delay={100} type="fade-3d">
            <h1 className="font-space text-[11vw] md:text-[9vw] leading-[0.8] tracking-tighter uppercase mb-24 break-words">
               <span className="text-[var(--gold)] italic">THE CREATIVE KIDS WHO GREW UP</span>
            </h1>
          </Reveal>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
              <Reveal delay={200} type="fade-3d">
                <p className="text-zinc-300 text-3xl md:text-5xl font-light leading-[1.05] tracking-tighter italic max-w-2xl">
                   Helping brands stay <span className="text-white font-black underline decoration-[var(--gold)] decoration-2 underline-offset-8">Relevant</span>, not just visible.
                </p>
              </Reveal>
              <Reveal delay={300} className="space-y-12">
                <p className="text-zinc-500 text-xl md:text-2xl font-light leading-relaxed">
                   The Social Box is Not Just an Agency, but an Extension of your brand. Built for partners that want to stay relevant, not just visible. We operate at the intersection of culture, creativity, and strategy — helping brands show up in ways that people actually care about.
                </p>
                <p className="text-zinc-500 text-xl md:text-2xl font-light leading-relaxed">
                   With a strong focus on creative brand building and influencer-led ecosystems, we craft narratives that move seamlessly across platforms and communities, reaching audiences across India. Our approach is simple: if it doesn’t feel native to the feed, it doesn’t belong there.
                </p>
                <div className="pt-8 border-l-4 border-[var(--gold)] pl-8">
                   <p className="text-zinc-200 text-xl md:text-2xl font-bold italic uppercase tracking-tighter leading-tight">
                      We are Not Just an Agency, but an Extension of your brand.
                   </p>
                   <span className="text-technical mt-4 block">STATION SPEC // EST 2024</span>
                </div>
              </Reveal>
          </div>
        </div>
      </section>

      {/* SECTION 2: BENTO CORE VALUES */}
      <section className="mb-48 relative z-10">
        <div className="max-w-screen-2xl mx-auto">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((v, i) => (
                <Reveal key={i} delay={i * 100} type="fade-3d">
                   <div 
                    className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[3rem] p-12 h-[450px] flex flex-col justify-between group hover:bg-[#121212] hover:border-[var(--gold)]/40 transition-all duration-700 cursor-pointer overflow-hidden relative shadow-2xl"
                    data-cursor="plus"
                   >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none"></div>
                      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[var(--gold)]/10 blur-[100px] rounded-full pointer-events-none group-hover:bg-[var(--gold)]/20 transition-all duration-700"></div>

                      <div className="relative z-10 h-full flex flex-col justify-between">
                        <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-[var(--gold)] group-hover:bg-[var(--gold)] group-hover:text-black transition-all duration-500 shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]">
                           {React.cloneElement(v.icon, { className: "w-8 h-8" })}
                        </div>
                        
                        <div>
                          <h3 className="font-space text-4xl font-black uppercase mb-6 text-white group-hover:text-[var(--gold)] tracking-tighter leading-none transition-colors">{v.title}</h3>
                          <p className="font-medium text-zinc-500 group-hover:text-zinc-300 text-xl italic transition-colors leading-relaxed">{v.desc}</p>
                        </div>
                      </div>
                   </div>
                </Reveal>
              ))}
           </div>
        </div>
      </section>


      {/* SECTION 4: MANIFESTO */}
      <section className="mb-48 relative z-10">
         <div className="max-w-screen-2xl mx-auto">
            <div className="divide-y divide-white/10">
               {manifestoPoints.map((p, i) => (
                  <div 
                    key={i} 
                    className="py-16 md:py-24 flex items-center justify-between group cursor-pointer transition-all hover:px-12"
                    data-cursor="view"
                  >
                     <div className="flex items-center gap-12 md:gap-24">
                        <span className="text-[var(--gold)] font-space text-2xl md:text-3xl font-black opacity-20 group-hover:opacity-100 transition-opacity italic">{p.label}</span>
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
      <section className="py-48 border-t border-white/10 relative z-10">
         <div className="max-w-screen-2xl mx-auto flex flex-col items-center justify-center text-center">
            <Reveal type="fade-3d">
               <h2 className="font-space text-[11vw] md:text-[7.5vw] leading-[0.85] tracking-tighter uppercase mb-24 italic break-words max-w-6xl">
                  Drop the Brief, <br/>
                  <span className="text-[var(--gold)] not-italic drop-shadow-[0_0_60px_rgba(255,193,7,0.3)]">We'll Handle the Rest</span>
               </h2>
            </Reveal>
            <Reveal delay={200}>
               <MagneticOrbButton onClick={openContact} text="INTERFACE NOW" />
            </Reveal>
         </div>
      </section>
    </div>
  );
}
