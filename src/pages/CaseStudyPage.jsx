import React from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import LazyVideo from '../components/LazyVideo';
import { Play, Zap, Box, Globe, ChevronRight } from 'lucide-react';

export default function CaseStudyPage() {
  const cases = [
    { id: "01", category: "Marketing Ecosystem", title: "BENGALURU STRIKERS", video: "/videos/reel-2.mp4", metric: "360°", label: "Execution", desc: "Successfully rolled out the complete marketing ecosystem for Bengaluru Strikers, taking the brand from conceptualization to implementation. The process included the creation of the brand identity, which involved logo and apparel design, as well as digital presence and social media marketing, among others, done through consolidated and strategic leadership." },
    { id: "02", category: "Influencer Campaign", title: "EUREKA FORBES", video: "/videos/eureka_forbes_case_study.mov", metric: "6M+", label: "Reach", desc: "Directed a comprehensive influencer campaign for the Aquaguard Nanopore Filter, involving 26 influencers (including MrMiko 2.0, Naman Kapoor, Noopur Karla, and Avinash Dagar) focusing on water purification. Achieving over 6 million combined reach." },
    { id: "03", category: "Skincare Content", title: "OLAY", video: "/videos/olay_case_study.mov", metric: "500+", label: "Creators", desc: "Executed influencer campaign for Olay’s newly launched Super Collagen Peptide Moisturizer and 7-in-1 Serum for women who are in their 30s. Working with influencers like Mansi Rajani, Himani Rose, Sanchi Jain, Tanvi, Darshna, and Akanksha Jindal while working with 93 mid-tier influencers and 300 micro influencers and 260 nano influencers. Focused on relatable skincare content and product awareness delivering 278M+ views and 15M+ reach." },
    { id: "04", category: "Regional Campaign", title: "MARICO", video: "/videos/marico_case_study.mov", metric: "1M+", label: "Views", desc: "Conducted regional influencer marketing campaign for Nihar Almond Coconut Oil in Bengal by creating content strategy and implementing the entire campaign to ensure creation of culturally relevant stories and reach 1 million views with creator like Saachi Basine." },
    { id: "05", category: "Influencer Campaigns", title: "NYKAA", video: "/videos/nykaa_case_study.mp4", metric: "100+", label: "Creators", desc: "Managed campaigns for the launch of Nykaa makeup products through beauty and lifestyle influencers to create trendy Gen Z content for lip oils, blushes, lipsticks, and palettes, while managing full campaign execution across platforms." },
    { id: "06", category: "End-To-End Marketing", title: "AHMEDABAD LIONS", video: "/videos/lions_case_study.mp4", metric: "End-to-End", label: "Marketing", desc: "Carried out the end-to-end marketing process for Ahmedabad Lions, handling the entire process right from conceptualization to implementation. The project encompassed brand identity creation, which includes the creation of the logo, mascot, and kit designs, along with website development and social media marketing." },
    { id: "07", category: "Full-Funnel Campaign", title: "SACRED GROVE", video: "/videos/sacred_grove_case_study.mp4", metric: "Campaign", label: "Execution", desc: "Led a full-funnel influencer campaign for Sacred Grove’s hair mask and hair perfume by recruiting aligned creators and crafting culturally relevant scripts and content ideas, and executing campaigns." },
    { id: "08", category: "360° Campaign", title: "LAKMÉ", video: "/videos/lakme_case_study.mp4", metric: "360°", label: "Campaign", desc: "For the launch of Lakmé’s Body Shimmer Lotion and Skin Tint, we undertook a 360 influencer campaign involving an exclusive event with five of the best beauty influencers along with a second phase with 25 beauty and lifestyle influencers. Creators created walkthrough videos for the event, explanations for the formulations, wear tests, and GRWM videos to highlight the texture, finish, and ingredients of the products. The campaign positioned the range as aspirational yet everyday, delivering strong awareness, credibility, and engagement across social platforms." },
  ];

  return (
    <div className="min-h-[100dvh] pt-32 md:pt-64 px-6 md:px-14 pb-32 relative z-10 selection:bg-[#FFC107] selection:text-black">
      
      {/* Header Narrative */}
      <div className="max-w-screen-2xl mx-auto mb-64 flex flex-col md:flex-row justify-between items-end gap-16 border-b border-white/10 pb-24">
        <Reveal type="fade-3d">
          <h1 className="font-space text-[18vw] md:text-[12vw] leading-[0.8] tracking-tighter uppercase">
             SELECTED <br/>
             <span className="text-[#FFC107] italic">WORK</span>
          </h1>
        </Reveal>
        <Reveal delay={200} type="fade-3d">
           <div className="max-w-md text-zinc-500 font-light text-xl md:text-2xl italic leading-tight uppercase tracking-widest text-right mb-6">
              [ High performance, executive-level execution ]
           </div>
        </Reveal>
      </div>

      {/* Case Studies Grid - Shader.se Style Large Perspective */}
      <div className="max-w-screen-2xl mx-auto space-y-40 md:space-y-64 pb-12 md:pb-24">
        {cases.map((cs, i) => (
          <Reveal key={i} delay={i * 100} type="fade-3d">
             <div className="group relative grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24 items-center">
                
                {/* Visual Section - Large Video/Image */}
                <div className="lg:col-span-7 relative h-[30rem] md:h-[45rem] rounded-[4rem] overflow-hidden bg-zinc-900 border border-white/5 transition-all duration-1000 group-hover:scale-[1.02] active:scale-95 shadow-2xl group-hover:border-[#FFC107]/50 will-change-transform">
                    <LazyVideo 
                      src={cs.video} 
                      className="w-full h-full object-cover scale-[1.05] group-hover:scale-100 group-hover:opacity-100 transition-all duration-[2s] opacity-60" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40 group-hover:opacity-0 transition-opacity"></div>
                </div>

                {/* Content Section - Bold Typography */}
                <div className="lg:col-span-5 flex flex-col justify-center space-y-10 px-4 md:px-0">
                   <div className="font-space text-[12vw] md:text-[6vw] font-black leading-none tracking-tighter uppercase grayscale group-hover:grayscale-0 transition-all duration-1000">
                      {cs.title}
                   </div>
                   
                   <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-10">
                      <div className="space-y-2">
                        <div className="text-[#FFC107] font-space text-4xl md:text-5xl lg:text-6xl font-black italic whitespace-nowrap">{cs.metric}</div>
                        <div className="text-[#FFC107] font-black uppercase text-[10px] tracking-[0.4em]">{cs.label}</div>
                      </div>

                   </div>

                   <p className="text-zinc-500 text-xl font-light italic leading-snug">
                      {cs.desc}
                   </p>
                </div>
             </div>
          </Reveal>
        ))}
      </div>

      {/* Narrative Footer */}
      <div className="mt-12 pt-16 md:mt-24 md:pt-24 border-t border-white/10 text-center pb-12">
         <div className="flex flex-col items-center justify-center space-y-8">
            <h2 className="font-space text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-tight">
               Ready to scale <br/>
               <span className="text-[#FFC107] italic">your brand?</span>
            </h2>
            <Link 
               to="/contact" 
               className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-[#FFC107] text-black font-black uppercase tracking-widest text-sm hover:scale-105 active:scale-95 transition-transform duration-300 shadow-[0_0_40px_rgba(255,193,7,0.3)]"
            >
               Let's Talk <ChevronRight className="w-5 h-5" />
            </Link>
         </div>
      </div>

    </div>
  );
}
