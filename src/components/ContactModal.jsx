import React, { useState, useEffect } from 'react';
import { Mail, Phone, User, MessageSquare, Send, X, Globe, Zap, CheckCircle } from 'lucide-react';
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
    <div className="modal-root" id="contact-modal">
      {/* Overlay - High-end backdrop blur */}
      <div 
        className="modal-overlay" 
        onClick={closeContact}
      ></div>

      {/* Modal - Premium Card */}
      <div className="modal-container">
        
        {/* Fixed Close Button for entire modal */}
        <button 
          onClick={closeContact}
          className="modal-close-btn"
          style={{ zIndex: 50 }}
          aria-label="Close modal"
        >
          <X className="close-icon" />
        </button>

        {/* Left Side: Branding/Success State */}
        <div className="modal-left">
          <div className="modal-branding">
             <div className="branding-icon-box">
                <Zap className="branding-icon" />
             </div>
             <h2 className="branding-title">
                RECHECK <br/> <span className="highlight-text">HISTORY</span>.
             </h2>
             <p className="branding-desc">
                Tell us about your brand vision, and our experts will craft a high-impact strategy tailored specifically for you.
             </p>
          </div>

          <div className="modal-info">
             <div className="info-item">
                <div className="info-icon-box">
                   <Mail className="info-icon" />
                </div>
                <p className="info-text">hello@thesocialbox.in</p>
             </div>
          </div>

          {/* Decorative Elements */}
          <div className="modal-bg-text">
             SBX
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="modal-right">

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="modal-form">
               <div className="form-row">
                  <div className="form-group">
                     <p className="input-label">Your Name</p>
                     <div className="input-wrapper">
                        <User className="input-icon" />
                        <input 
                           type="text" 
                           required
                           placeholder="John Doe"
                           className="modal-input"
                        />
                     </div>
                  </div>
                  <div className="form-group">
                     <p className="input-label">Email Address</p>
                     <div className="input-wrapper">
                        <Mail className="input-icon" />
                        <input 
                           type="email" 
                           required
                           placeholder="john@example.com"
                           className="modal-input"
                        />
                     </div>
                  </div>
               </div>

               <div className="form-group">
                  <p className="input-label">Project Type</p>
                  <select 
                     required
                     className="modal-select"
                  >
                     <option value="">Select Service</option>
                     <option value="smm">Social Media Management</option>
                     <option value="im">Influencer Marketing</option>
                     <option value="wd">Web Development</option>
                     <option value="orm">Online Reputation (ORM)</option>
                     <option value="other">Other / Consultancy</option>
                  </select>
               </div>

               <div className="form-group">
                  <p className="input-label">Tell us your vision</p>
                  <div className="input-wrapper">
                     <MessageSquare className="input-icon textarea-icon" />
                     <textarea 
                        rows="3"
                        required
                        placeholder="I want to scale my brand through..."
                        className="modal-textarea"
                     ></textarea>
                  </div>
               </div>

               <button 
                  disabled={isSubmitting}
                  className="modal-submit-btn"
               >
                  {isSubmitting ? (
                    <div className="loading-spinner"></div>
                  ) : (
                    <>
                       Drop the Brief
                    </>
                  )}
               </button>
               
               <p className="modal-footer-tag">
                  <Globe className="globe-icon" /> Based in Mumbai • Serving Globally
               </p>
            </form>
          ) : (
            <div className="modal-success">
               <div className="success-icon-box">
                  <CheckCircle className="success-icon" />
               </div>
               <h3 className="success-title">MOMENTUM<br/>STARTED.</h3>
               <p className="success-desc">
                  Thank you! Our strategists are analyzing your brand already. We'll be in touch within 24 hours.
               </p>
               <button 
                  onClick={closeContact}
                  className="success-close-btn"
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
