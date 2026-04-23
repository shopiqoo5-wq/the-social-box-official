import React from 'react';
import { Radio, Users, Zap, Globe, Video, Sparkles, Palette, ArrowUpRight } from 'lucide-react';
import Reveal from '../components/Reveal';

export default function ServicesPage() {
  const services = [
    { num: "01", title: "Web", icon: <Globe className="w-10 h-10" />, desc: "Clean, functional, and design-forward websites that reflect your brand." },
    { num: "02", title: "Social Media", icon: <Radio className="w-10 h-10" />, desc: "Strategy, content, and management designed to build a consistent, engaging brand presence." },
    { num: "03", title: "Influencer Marketing", icon: <Users className="w-10 h-10" />, desc: "End-to-end influencer collaborations that drive both reach and relevance." },
    { num: "04", title: "Meme Marketing", icon: <Zap className="w-10 h-10" />, desc: "Culture-driven content that taps into trends and conversations in real time." },
    { num: "05", title: "UGC", icon: <Video className="w-10 h-10" />, desc: "Authentic, creator-led content that builds trust and relatability." },
    { num: "06", title: "Personal Branding", icon: <Sparkles className="w-10 h-10" />, desc: "Positioning individuals as strong, credible voices in their space." },
    { num: "07", title: "Production", icon: <Palette className="w-10 h-10" />, desc: "From ideation to execution — high-quality content built for digital-first platforms." },
  ];

  return (
    <div className="min-h-[100dvh] pt-32 md:pt-64 px-6 md:px-14 pb-32 relative z-10 selection:bg-[#FFC107] selection:text-black">
      
      <div className="max-w-screen-2xl mx-auto mb-56 flex flex-col md:flex-row justify-between items-end gap-12">
        <Reveal type="fade-3d">
          <h1 className="font-space text-[12vw] md:text-[9vw] leading-[0.8] tracking-tighter uppercase break-words">
             OUR <br/>
             <span className="text-[#FFC107] italic">CAPABILITIES</span>
          </h1>
        </Reveal>
        <Reveal delay={200} type="fade-3d">
           <div className="max-w-md text-zinc-500 font-light text-xl md:text-2xl italic leading-tight uppercase tracking-widest text-right mb-6">
              [ Plugged into every digital vertical ]
           </div>
        </Reveal>
      </div>

      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <Reveal key={index} delay={index * 100} type="fade-3d">
            <div className="h-full bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[4rem] p-16 group hover:bg-[#FFC107] transition-all duration-[1.2s] cursor-pointer overflow-hidden relative shadow-2xl will-change-transform">
              <div className="absolute top-10 right-10 text-white/5 group-hover:text-black/10 font-space text-[15vw] md:text-[10vw] font-black leading-none transition-colors select-none pointer-events-none">
                {service.num}
              </div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="mb-14 text-[#FFC107] group-hover:text-black transition-all transform group-hover:scale-125 origin-left duration-700 ease-expo">
                    {service.icon}
                  </div>
                  <h3 className="font-space text-4xl md:text-5xl font-black uppercase mb-8 text-white group-hover:text-black transition-colors leading-none tracking-tighter italic">
                    {service.title}
                  </h3>
                </div>
                <p className="font-medium text-zinc-500 group-hover:text-black/70 text-2xl leading-snug max-w-sm transition-colors">
                  {service.desc}
                </p>
                <div className="mt-8 transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 flex items-center gap-4 font-black uppercase text-[10px] tracking-[0.4em] text-black">
                   LEARN ARCHITECTURE <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      
      <div className="mt-64 border-t border-white/10 pt-32 text-center flex flex-col items-center">
         <Reveal type="fade-3d">
            <h2 className="text-[#FFC107] font-space text-4xl md:text-6xl font-black uppercase tracking-tighter mb-12">
               NOT YOUR REGULAR <br/>
               <span className="italic text-white underline decoration-[#FFC107]">AGENCY DEPARTMENT</span>
            </h2>
         </Reveal>
         <Reveal delay={200}>
            <p className="text-zinc-500 mb-20 text-xl font-light tracking-[0.05em]">We don't troubleshoot printers. We build legends.</p>
         </Reveal>
      </div>
    </div>
  );
}
