import React, { useState } from 'react';
import { Mail, Phone, User, MessageSquare, Send, Globe, CheckCircle, MapPin, Instagram, Zap } from 'lucide-react';
import Reveal from '../components/Reveal';
import Magnetic from '../components/Magnetic';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const contacts = [
    { icon: <Mail size={20} />, label: 'EMAIL', value: 'hello@thesocialbox.in', href: 'mailto:hello@thesocialbox.in' },
    { icon: <Phone size={20} />, label: 'PHONE', value: '+91 97XXXX 4XXX', href: 'tel:+919700004000' },
    { 
      icon: <MapPin size={20} />, 
      label: 'MUMBAI OFFICE', 
      value: "Plot 95 - Kala Niketan, Rm 13,\n3rd Flr, Maharshi Karve Rd,\nMarine Lines, Mumbai 400020",
      href: 'https://maps.google.com/?q=Maharshi+Karve+Road+Marine+Lines+Mumbai' 
    },
    { 
      icon: <MapPin size={20} />, 
      label: 'JAIPUR OFFICE', 
      value: "TSB Creatives Pvt Ltd,\n401 Alokik Heights, Subhash Marg,\nAshok Nagar, Jaipur 302001",
      href: 'https://maps.google.com/?q=Ashok+Nagar+Jaipur' 
    },
  ];

  return (
    <div className="matte-surface min-h-[100dvh] pt-32 md:pt-40 px-6 md:px-14 pb-32 relative z-10 selection:bg-[var(--gold)] selection:text-black">
      
      {/* Ambient glow */}
      <div className="cinematic-glow -top-20 -left-20" />

      <div className="max-w-screen-2xl mx-auto relative z-10">

        {/* Hero heading */}
        <section className="mb-24 md:mb-32">
          <Reveal type="fade-3d">
            <p className="text-technical text-[var(--gold)] mb-6">
              [ GET IN TOUCH ]
            </p>
            <h1 className="font-space text-[14vw] md:text-[10vw] leading-[0.85] tracking-tighter uppercase mb-8 break-words">
              RECHECK<br />
              <span className="text-[var(--gold)] italic">HISTORY.</span>
            </h1>
            <p className="text-zinc-500 text-xl md:text-2xl font-light max-w-2xl leading-relaxed italic">
              Tell us about your brand vision. Our strategists will craft a high-impact plan tailored for you.
            </p>
          </Reveal>
        </section>

        {/* Main grid: form + info */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* LEFT — Form */}
          <Reveal type="fade-3d" delay={100}>
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="contact-page-form bg-white/[0.02] border border-white/10 p-8 md:p-12 rounded-[2.5rem] backdrop-blur-3xl shadow-2xl">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div className="contact-field">
                    <label className="text-technical mb-3 block text-zinc-500">Your Name</label>
                    <div className="contact-input-wrap group">
                      <User size={16} className="contact-input-icon group-focus-within:text-[var(--gold)] transition-colors" />
                      <input type="text" required placeholder="John Doe" className="contact-input focus:border-[var(--gold)]/50 transition-all" />
                    </div>
                  </div>
                  <div className="contact-field">
                    <label className="text-technical mb-3 block text-zinc-500">Email Address</label>
                    <div className="contact-input-wrap group">
                      <Mail size={16} className="contact-input-icon group-focus-within:text-[var(--gold)] transition-colors" />
                      <input type="email" required placeholder="john@example.com" className="contact-input focus:border-[var(--gold)]/50 transition-all" />
                    </div>
                  </div>
                </div>

                <div className="contact-field mb-6">
                  <label className="text-technical mb-3 block text-zinc-500">Brand / Company</label>
                  <div className="contact-input-wrap group">
                    <Zap size={16} className="contact-input-icon group-focus-within:text-[var(--gold)] transition-colors" />
                    <input type="text" placeholder="Your brand name" className="contact-input focus:border-[var(--gold)]/50 transition-all" />
                  </div>
                </div>

                <div className="contact-field mb-6">
                  <label className="text-technical mb-3 block text-zinc-500">Service Interested In</label>
                  <select required className="contact-select focus:border-[var(--gold)]/50 transition-all">
                    <option value="">Select a service…</option>
                    <option value="smm">Social Media Management</option>
                    <option value="im">Influencer Marketing</option>
                    <option value="wd">Web Development</option>
                    <option value="orm">Online Reputation (ORM)</option>
                    <option value="other">Other / Consultancy</option>
                  </select>
                </div>

                <div className="contact-field mb-10">
                  <label className="text-technical mb-3 block text-zinc-500">Tell us your vision</label>
                  <div className="contact-input-wrap contact-textarea-wrap group">
                    <MessageSquare size={16} className="contact-input-icon contact-textarea-icon group-focus-within:text-[var(--gold)] transition-colors" />
                    <textarea
                      rows="5"
                      required
                      placeholder="I want to scale my brand through…"
                      className="contact-textarea focus:border-[var(--gold)]/50 transition-all"
                    />
                  </div>
                </div>

                <Magnetic>
                  <button 
                    disabled={isSubmitting} 
                    className="contact-submit-btn bg-[var(--gold)] text-black hover:bg-white transition-colors"
                    data-cursor="send"
                  >
                    {isSubmitting ? (
                      <div className="contact-spinner border-black/20 border-t-black" />
                    ) : (
                      <>
                        <Send size={16} />
                        Drop the Brief
                      </>
                    )}
                  </button>
                </Magnetic>

                <p className="text-technical text-zinc-600 mt-8 flex items-center gap-3">
                  <Globe size={12} /> BA:MUMBAI // SRV:GLOBAL
                </p>
              </form>
            ) : (
              <div className="contact-success bg-white/[0.02] border border-[var(--gold)]/30 p-12 md:p-20 rounded-[3rem] backdrop-blur-3xl text-center flex flex-col items-center">
                <div className="contact-success-icon bg-[var(--gold)] text-black p-6 rounded-full mb-10 shadow-[0_0_50px_rgba(255,193,7,0.4)]">
                  <CheckCircle size={48} />
                </div>
                <h3 className="font-space text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-6">
                  MOMENTUM<br /><span className="text-[var(--gold)] italic">STARTED.</span>
                </h3>
                <p className="text-zinc-400 text-lg font-medium leading-relaxed max-w-md italic">
                  Thank you. Our strategists are already analyzing your brand specs. We'll be in touch within 24 hours.
                </p>
                <div className="mt-12 text-technical text-[var(--gold)]">
                  [ HANDSHAKE COMPLETE ]
                </div>
              </div>
            )}
          </Reveal>

          {/* RIGHT — Contact info + decorative */}
          <Reveal type="fade-3d" delay={200}>
            <div className="space-y-6">
              {contacts.map((c, i) => (
                <div 
                  key={i} 
                  className="contact-info-card group bg-white/[0.02] border border-white/5 p-8 rounded-3xl hover:border-[var(--gold)]/30 transition-all duration-500 cursor-pointer"
                  data-cursor="view"
                >
                  <div className="contact-info-icon bg-white/5 text-[var(--gold)] group-hover:bg-[var(--gold)] group-hover:text-black transition-all duration-500">{c.icon}</div>
                  <div>
                    <p className="text-technical text-[var(--gold)] mb-1">{c.label}</p>
                    {c.href ? (
                      <a href={c.href} className="text-white text-xl md:text-2xl font-bold hover:text-white transition-colors tracking-tight whitespace-pre-line">
                        {c.value}
                      </a>
                    ) : (
                      <p className="text-white text-xl md:text-2xl font-bold tracking-tight whitespace-pre-line">{c.value}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* Decorative manifesto */}
              <div className="mt-16 pt-16 border-t border-white/10">
                <p className="font-space text-7xl md:text-8xl font-black uppercase leading-[0.8] tracking-tighter text-white/[0.15] select-none">
                  WE BUILD<br />
                  <span className="text-[var(--gold)] opacity-90">BRANDS</span><br />
                  THAT LIVE<br />
                  IN CULTURE.
                </p>
              </div>
            </div>
          </Reveal>

        </section>
      </div>
    </div>
  );
}
