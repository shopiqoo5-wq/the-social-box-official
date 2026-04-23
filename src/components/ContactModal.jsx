import React, { useState, useEffect } from 'react';
import { Mail, Phone, User, MessageSquare, X, Zap, ArrowRight, CheckCircle } from 'lucide-react';
import { useContact } from '../context/ContactContext';

export default function ContactModal() {
  const { isOpen, closeContact } = useContact();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeContact();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [closeContact]);

  // Reset success state when modal re-opens
  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
    }
  }, [isOpen]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    // Always restore on unmount
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Wait for a few seconds and close
      setTimeout(() => {
        setIsSuccess(false);
        closeContact();
      }, 3000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center px-4 overflow-y-auto pt-10 pb-10">
      {/* Overlay - High-end backdrop blur */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xl transition-opacity duration-500" 
        onClick={closeContact}
      ></div>

      {/* Modal - Premium Card */}
      <div className="relative w-full max-w-4xl bg-[#F8F7F4] rounded-[3.5rem] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.3)] flex flex-col md:flex-row min-h-[500px] animate-in slide-in-from-bottom-10 duration-500">
        
        {/* Left Side: Branding/Success State */}
        <div className="w-full md:w-2/5 bg-[#111] p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
             <div className="w-12 h-12 bg-[#FFC107] rounded-2xl mb-8 flex items-center justify-center">
                <Zap className="w-6 h-6 text-black fill-current" />
             </div>
             <h2 className="font-space text-4xl md:text-5xl font-black uppercase tracking-tighter leading-tight mb-4">
                Let's Make <br/> <span className="text-[#FFC107]">History</span>.
             </h2>
             <p className="text-zinc-400 font-light italic leading-relaxed">
                Tell us about your brand vision, and our experts will craft a high-impact strategy tailored specifically for you.
             </p>
          </div>

          <div className="relative z-10 mt-12 grid gap-6">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
                   <Mail className="w-5 h-5 text-[#FFC107]" />
                </div>
                <p className="text-sm font-bold tracking-widest uppercase">hello@thesocialbox.in</p>
             </div>
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
                   <Phone className="w-5 h-5 text-[#FFC107]" />
                </div>
                <p className="text-sm font-bold tracking-widest uppercase">+91 97XXXX 4XXX</p>
             </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-[-10%] right-[-10%] font-space text-white/5 text-[15vw] font-black leading-none pointer-events-none select-none">
             SBX
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-3/5 p-10 md:p-16 relative bg-white flex flex-col justify-center">
          <button 
            onClick={closeContact}
            className="absolute top-8 right-8 w-12 h-12 rounded-full bg-zinc-100 hover:bg-[#FFC107] transition-colors flex items-center justify-center"
          >
            <X className="w-5 h-5 text-black" />
          </button>

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative group">
                     <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-2 ml-1">Your Name</p>
                     <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                        <input 
                           type="text" 
                           required
                           placeholder="John Doe"
                           className="w-full pl-12 pr-4 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#FFC107] focus:border-transparent outline-none transition-all placeholder:text-zinc-300"
                        />
                     </div>
                  </div>
                  <div className="relative group">
                     <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-2 ml-1">Email Address</p>
                     <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                        <input 
                           type="email" 
                           required
                           placeholder="john@example.com"
                           className="w-full pl-12 pr-4 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#FFC107] focus:border-transparent outline-none transition-all placeholder:text-zinc-300"
                        />
                     </div>
                  </div>
               </div>

               <div className="relative">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-2 ml-1">Project Type</p>
                  <select 
                     required
                     className="w-full px-4 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#FFC107] focus:border-transparent outline-none transition-all appearance-none cursor-pointer"
                  >
                     <option value="">Select Service</option>
                     <option value="smm">Social Media Management</option>
                     <option value="im">Influencer Marketing</option>
                     <option value="wd">Web Development</option>
                     <option value="orm">Online Reputation (ORM)</option>
                     <option value="other">Other / Consultancy</option>
                  </select>
               </div>

               <div className="relative group">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-2 ml-1">Tell us your vision</p>
                  <div className="relative">
                     <MessageSquare className="absolute left-4 top-5 w-4 h-4 text-zinc-400" />
                     <textarea 
                        rows="3"
                        required
                        placeholder="I want to scale my brand through..."
                        className="w-full pl-12 pr-4 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#FFC107] focus:border-transparent outline-none transition-all placeholder:text-zinc-300 resize-none"
                     ></textarea>
                  </div>
               </div>

               <button 
                  disabled={isSubmitting}
                  className="w-full py-6 bg-zinc-900 text-white rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#FFC107] hover:text-black transition-all duration-500 shadow-2xl flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed group"
               >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                       Launch Your Journey <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </>
                  )}
               </button>
               
               <p className="text-center text-[10px] font-bold uppercase tracking-widest text-zinc-400 pt-2 flex items-center justify-center gap-2">
                  <Globe className="w-3 h-3" /> Based in Mumbai • Serving Globally
               </p>
            </form>
          ) : (
            <div className="text-center py-20 px-8">
               <div className="w-24 h-24 bg-[#FFC107] rounded-[2.5rem] mx-auto mb-10 flex items-center justify-center shadow-glow animate-bounce">
                  <CheckCircle className="w-12 h-12 text-black" />
               </div>
               <h3 className="font-space text-5xl font-black uppercase mb-6 leading-tight">MOMENTUM<br/>STARTED.</h3>
               <p className="text-zinc-500 text-lg font-light leading-relaxed mb-6">
                  Thank you! Our strategists are analyzing your brand already. We'll be in touch within 24 hours.
               </p>
               <button 
                  onClick={closeContact}
                  className="px-12 py-5 border-2 border-zinc-100 font-bold uppercase tracking-widest text-xs rounded-full hover:bg-zinc-50 transition-all font-manrope"
               >
                  Close Window
               </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
