import React from 'react';
import { Share2, Crown, Flame, Monitor, Aperture, Sparkles, Clapperboard, ArrowRight } from 'lucide-react';
import Reveal from '../components/Reveal';
import { useContact } from '../context/ContactContext';

export default function ServicesPage() {
  const { openContact } = useContact();
  const services = [
    { title: "Social Media", icon: <Share2 className="w-10 h-10" />, desc: "Strategy, content, and management designed to build a consistent, engaging brand presence." },
    { title: "Influencer Marketing", icon: <Crown className="w-10 h-10" />, desc: "End-to-end influencer collaborations that drive both reach and relevance." },
    { title: "Meme Marketing", icon: <Flame className="w-10 h-10" />, desc: "Culture-driven content that taps into trends and conversations in real time." },
    { title: "Web", icon: <Monitor className="w-10 h-10" />, desc: "Clean, functional, and design-forward websites that reflect your brand." },
    { title: "UGC", subtitle: "(User-Generated Content)", icon: <Aperture className="w-10 h-10" />, desc: "Authentic, creator-led content that builds trust and relatability." },
    { title: "Personal Brand Building", icon: <Sparkles className="w-10 h-10" />, desc: "Positioning individuals as strong, credible voices in their space." },
    { title: "Production", icon: <Clapperboard className="w-10 h-10" />, desc: "From ideation to execution— high-quality content built for digital-first platforms" },
  ];

  return (
    <div className="matte-surface min-h-[100dvh] pt-32 md:pt-64 px-6 md:px-14 pb-32 relative z-10 selection:bg-[var(--gold)] selection:text-black">
      
      {/* Ambient glow */}
      <div className="cinematic-glow -top-20 -left-20" />

      <div className="max-w-screen-2xl mx-auto mb-32 flex flex-col md:flex-row justify-between items-end gap-12 relative z-10">
        <Reveal type="fade-3d">
          <h1 className="font-space text-[12vw] md:text-[9vw] leading-[0.8] tracking-tighter uppercase break-words">
             OUR <br/>
             <span className="text-[var(--gold)] italic">CAPABILITIES</span>
          </h1>
        </Reveal>
        <Reveal delay={200} type="fade-3d">
           <div className="max-w-md text-zinc-500 font-light text-xl md:text-2xl italic leading-tight uppercase tracking-widest text-right mb-6">
              [ Plugged into every digital vertical ]
           </div>
        </Reveal>
      </div>

      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {services.map((service, index) => (
          <Reveal key={index} delay={index * 100} type="fade-3d">
            <div 
              onClick={openContact}
              className="h-[550px] bg-[#0A0A0A] border border-white/5 rounded-[2.5rem] p-12 group hover:border-[var(--gold)]/40 transition-all duration-700 cursor-pointer overflow-hidden relative shadow-2xl"
            >
              {/* Luxury Layers */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none"></div>
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[var(--gold)]/10 blur-[100px] rounded-full pointer-events-none group-hover:bg-[var(--gold)]/20 transition-all duration-700"></div>

              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center text-[var(--gold)] group-hover:scale-110 transition-transform duration-500 shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]">
                     {React.cloneElement(service.icon, { className: "w-6 h-6" })}
                  </div>
                </div>
                
                <div className="flex-grow flex flex-col justify-center">
                  <h3 className="font-space text-4xl md:text-5xl font-black uppercase text-white group-hover:text-[var(--gold)] transition-colors leading-[0.85] tracking-[-0.06em] italic mb-6">
                    {service.title}
                    {service.subtitle && (
                      <span className="block text-[0.4em] font-medium opacity-50 mt-3 tracking-wider normal-case not-italic">
                        {service.subtitle}
                      </span>
                    )}
                  </h3>
                  <p className="font-medium text-zinc-500 group-hover:text-zinc-300 text-lg md:text-xl leading-snug max-w-sm transition-colors italic">
                    {service.desc}
                  </p>
                </div>

                <div className="pt-8 border-t border-white/5">
                   <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black tracking-[0.4em] uppercase text-zinc-500 group-hover:text-[var(--gold)] transition-colors">
                         GET IN TOUCH
                      </span>
                      <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-500 group-hover:bg-[var(--gold)] group-hover:text-black group-hover:border-[var(--gold)] transition-all duration-500">
                         <ArrowRight className="w-5 h-5" />
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      
      <div className="mt-48 border-t border-white/10 pt-32 pb-48 text-center flex flex-col items-center relative z-10">
         <Reveal type="fade-3d">
            <h2 className="text-[var(--gold)] font-space text-4xl md:text-5xl font-black uppercase tracking-tighter max-w-4xl">
               Not Just an Agency, but <br/>
               <span className="italic text-white underline decoration-[var(--gold)]">an Extension of your brand</span>
            </h2>
         </Reveal>
      </div>
    </div>
  );
}
