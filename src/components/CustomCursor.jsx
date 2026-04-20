import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const textRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState("");

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    
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

  return (
    <>
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-12 h-12 border border-[#FFC107] rounded-full pointer-events-none z-[9999] flex items-center justify-center transition-all duration-500 will-change-transform mix-blend-difference"
        style={{ 
          transform: `scale(${isHovering ? 2.5 : 1})`,
          backgroundColor: isHovering ? 'white' : 'transparent',
          borderColor: isHovering ? 'white' : '#FFC107'
        }}
      >
        <span 
          ref={textRef}
          className="text-black text-[8px] font-black tracking-widest opacity-0 scale-50 transition-all duration-300"
          style={{ 
            opacity: isHovering && cursorText ? 1 : 0,
            transform: `scale(${isHovering && cursorText ? 1 : 0.5})`
          }}
        >
          {cursorText}
        </span>
      </div>
      <div 
        ref={dotRef}
        className="fixed top-0 left-0 w-1 h-1 bg-[#FFC107] rounded-full pointer-events-none z-[10000] mix-blend-difference"
      />
    </>
  );
}
