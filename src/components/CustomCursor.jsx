import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const textRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch-only devices and hide custom cursor
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    if (hasTouch && hasCoarsePointer) {
      setIsTouchDevice(true);
      return;
    }

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    
    if (!cursor || !dot) return;
    
    gsap.set([cursor, dot], { xPercent: -50, yPercent: -50 });

    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      
      gsap.to(cursor, {
        x: clientX,
        y: clientY,
        duration: 0.8,
        ease: 'power4.out'
      });
      
      gsap.to(dot, {
        x: clientX,
        y: clientY,
        duration: 0.15,
        ease: 'power2.out'
      });

      const target = e.target;
      const isInteractive = target.closest('a, button, .portfolio-card, video, .group, .cursor-pointer');
      
      if (target.closest('.portfolio-card')) {
        setCursorText("VIEW");
      } else if (target.closest('a, button')) {
        setCursorText("CLICK");
      } else {
        setCursorText("");
      }

      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  // Don't render anything on touch devices
  if (isTouchDevice) return null;

  return (
    <>
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-12 h-12 border border-[#FFC107] rounded-full pointer-events-none z-[9999] flex items-center justify-center will-change-transform mix-blend-difference hidden md:flex"
        style={{ 
          transform: `scale(${isHovering ? 2.5 : 1})`,
          transition: 'transform 0.5s, background-color 0.5s, border-color 0.5s',
          backgroundColor: isHovering ? 'white' : 'transparent',
          borderColor: isHovering ? 'white' : '#FFC107'
        }}
      >
        <span 
          ref={textRef}
          className="text-black text-[8px] font-black tracking-widest"
          style={{ 
            opacity: isHovering && cursorText ? 1 : 0,
            transform: `scale(${isHovering && cursorText ? 1 : 0.5})`,
            transition: 'opacity 0.3s, transform 0.3s'
          }}
        >
          {cursorText}
        </span>
      </div>
      <div 
        ref={dotRef}
        className="fixed top-0 left-0 w-1 h-1 bg-[#FFC107] rounded-full pointer-events-none z-[10000] mix-blend-difference hidden md:block"
      />
    </>
  );
}
