import React from 'react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import { useContact } from '../context/ContactContext';
import Magnetic from './Magnetic';
import { ArrowUpRight, Globe } from 'lucide-react';

export default function Footer() {
  const { openContact } = useContact();
  
  const footMarquee = [
    "THE SOCIAL BOX", "CRAFTING IMPACT", "DATA POWERED", "CULTURE DRIVEN", "THE SOCIAL BOX"
  ];

  return (
    <footer className="bg-[#FFC107] text-black py-32 md:py-64 px-6 md:px-12 mt-40 rounded-t-[5rem] md:rounded-t-[10rem] relative overflow-hidden shadow-[0_-50px_100px_rgba(0,0,0,0.2)]">
      
      {/* 🔮 Background Atmospheric Effects */}
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none opacity-50"></div>
      <div className="absolute -top-40 -right-40 w-[60vw] h-[60vw] border-[1px] border-black/5 rounded-full pointer-events-none"></div>

      <div className="max-w-screen-2xl mx-auto relative z-10">
        {/* SECTION 1: THE MISSION CALL */}
        <div className="flex flex-col items-center text-center mb-64">
          <Reveal type="fade-3d">
             <div className="flex items-center gap-6 mb-16">
               <div className="h-px w-12 bg-black/20"></div>
               <p className="text-[11px] font-black tracking-[0.8em] uppercase opacity-60">Ready to Interface?</p>
               <div className="h-px w-12 bg-black/20"></div>
             </div>
          </Reveal>
          
          <Reveal delay={200} type="fade-3d">
            <Magnetic>
              <h2 
                onClick={openContact}
                className="font-space text-[18vw] md:text-[15vw] leading-[0.7] tracking-[-0.05em] uppercase hover:scale-[1.02] transition-all duration-1000 cursor-pointer italic font-black group relative"
              >
                <span className="block text-black/10 group-hover:text-black transition-colors">LET'S</span>
                <span className="relative inline-block">
                  TALK
                  <div className="absolute -right-20 md:-right-40 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-700">
                     <ArrowUpRight className="w-16 h-16 md:w-32 md:h-32 text-black" strokeWidth={2.5} />
                  </div>
                </span>
              </h2>
            </Magnetic>
          </Reveal>
        </div>


        
        {/* SECTION 3: DEEP FOOTPRINT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 py-20 border-y border-black/5 mb-20 animate-in fade-in duration-1000">
          <div className="space-y-10">
            <Link 
              to="/" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="font-space text-4xl tracking-tighter font-black flex items-center gap-3 text-black hover:italic transition-all"
            >
              TSB <span className="text-[10px] bg-black text-[#FFC107] px-3 py-1.5 rounded-lg">v2.0</span>
            </Link>
            <p className="text-sm md:text-base font-medium leading-relaxed max-w-xs opacity-70 italic">
              Engineering the future of social culture through high-performance digital architecture and narrative technology.
            </p>
          </div>

          <div className="space-y-10">
            <h4 className="text-[10px] font-black tracking-[0.5em] uppercase opacity-30 flex items-center gap-4">
              <Globe className="w-3 h-3 text-black" /> Mumbai Coordinate
            </h4>
            <div className="space-y-4">
              <p className="text-sm font-bold uppercase tracking-widest leading-relaxed">
                104, Mittal Estate, Bldg 2,<br/>
                Andheri East, Mumbai,<br/>
                MH 400059, India
              </p>
              <div className="text-[10px] font-black tracking-widest bg-black/5 px-4 py-2 rounded-full inline-block">NODE 01 // MAIN HQ</div>
            </div>
          </div>

          <div className="space-y-10">
            <h4 className="text-[10px] font-black tracking-[0.5em] uppercase opacity-30 flex items-center gap-4">
              <Globe className="w-3 h-3 text-black" /> Dubai Coordinate
            </h4>
            <div className="space-y-4">
              <p className="text-sm font-bold uppercase tracking-widest leading-relaxed">
                Level 12, Business Bay,<br/>
                Dubai, United Arab Emirates
              </p>
              <div className="text-[10px] font-black tracking-widest bg-black/5 px-4 py-2 rounded-full inline-block">NODE 02 // UAE HUB</div>
            </div>
          </div>

          <div className="space-y-10">
            <h4 className="text-[10px] font-black tracking-[0.5em] uppercase opacity-30">Connect Pipeline</h4>
            <div className="flex flex-col gap-6 text-sm font-bold uppercase tracking-widest">
              <a href="https://instagram.com/thesocialbox.in" className="group flex items-center gap-2 hover:line-through transition-all">
                Instagram <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100" />
              </a>
              <a href="https://linkedin.com/company/the-social-boxin" className="group flex items-center gap-2 hover:line-through transition-all">
                LinkedIn <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100" />
              </a>
              <a href="mailto:hello@thesocialbox.in" className="group flex items-center gap-2 hover:line-through transition-all">
                Email Ops <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black tracking-[0.5em] uppercase opacity-30">
          <span>ALL RIGHTS RESERVED — 2026</span>
          <span className="hidden md:block">///</span>
          <span>ESTABLISHED IN THE VIRTUAL PARADIGM</span>
        </div>
      </div>
    </footer>
  );
}
