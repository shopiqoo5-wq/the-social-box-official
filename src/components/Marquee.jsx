import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Marquee = ({ text, speed = 50, reverse = false, className = "" }) => {
  const marqueeRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const items = track.children;
    const totalWidth = track.scrollWidth / 2;

    gsap.to(track, {
      x: reverse ? totalWidth : -totalWidth,
      duration: speed,
      repeat: -1,
      ease: "none",
    });
  }, [speed, reverse]);

  return (
    <div 
      ref={marqueeRef} 
      className={`overflow-hidden whitespace-nowrap w-full ${className}`}
    >
      <div ref={trackRef} className="inline-block">
        <span className="inline-block mr-8">{text}</span>
        <span className="inline-block mr-8">{text}</span>
        <span className="inline-block mr-8">{text}</span>
        <span className="inline-block mr-8">{text}</span>
      </div>
    </div>
  );
};

export default Marquee;
