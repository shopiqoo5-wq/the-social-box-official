import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroSequenceAnimation = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const textRef = useRef(null);
  const [images, setImages] = useState([]);
  const [loadProgress, setLoadProgress] = useState(0);
  const frameCount = 120; // Reduced for performance and memory stability
  const totalFrames = 240; // Total available frames in public folder

  // 🖼️ Preload sequence frames with decoding logic
  useEffect(() => {
    const loadedImages = [];
    let loadedCount = 0;
    let isMounted = true;

    // Use a smaller subset of frames for better performance
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      // Calculate correct frame index (1, 3, 5, ..., 239)
      const actualIndex = Math.min(totalFrames, (i * 2) - 1);
      const frameIndex = actualIndex.toString().padStart(3, '0');
      
      img.src = `/ezgif-frame-${frameIndex}.png`;
      img.onload = () => {
        if (!isMounted) return;
        loadedCount++;
        
        // Batch progress updates to avoid 240 re-renders
        if (loadedCount % 5 === 0 || loadedCount === frameCount) {
          setLoadProgress(Math.round((loadedCount / frameCount) * 100));
        }
        
        if (loadedCount === frameCount) {
          setImages(loadedImages);
        }
      };
      img.onerror = () => {
        if (!isMounted) return;
        console.warn(`Failed to load frame: ${frameIndex}`);
        loadedCount++;
        if (loadedCount === frameCount) {
          setImages(loadedImages);
        }
      };
      loadedImages.push(img);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (images.length === 0 || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d', { alpha: false }); // Performance optimization
    
    let currentFrameIndex = -1;

    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0); // Use setTransform instead of scale to avoid stacking
      renderFrame(currentFrameIndex >= 0 ? currentFrameIndex : 0);
    };

    const renderFrame = (index) => {
      const img = images[index];
      if (!img || !img.complete) return;
      
      currentFrameIndex = index;

      const w = window.innerWidth;
      const h = window.innerHeight;
      const canvasAspect = w / h;
      const imgAspect = img.width / img.height || 16/9;
      
      let drawWidth, drawHeight, offsetX, offsetY;

      if (canvasAspect > imgAspect) {
        drawWidth = w;
        drawHeight = w / imgAspect;
        offsetX = 0;
        offsetY = (h - drawHeight) / 2;
      } else {
        drawWidth = h * imgAspect;
        drawHeight = h;
        offsetX = (w - drawWidth) / 2;
        offsetY = 0;
      }

      context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5, // Faster scrub for better responsiveness
      }
    });

    const animationObj = { frame: 0 };
    timeline.to(animationObj, {
      frame: frameCount - 1,
      snap: 'frame',
      ease: 'none',
      onUpdate: () => {
        const index = Math.round(animationObj.frame);
        if (index !== currentFrameIndex) {
          renderFrame(index);
        }
      }
    }, 0);

    timeline.to(textRef.current, {
      opacity: 0,
      filter: 'blur(30px)',
      scale: 1.5,
      y: -30,
      ease: 'power2.inOut',
    }, 0.1); 

    timeline.set(textRef.current, { display: 'none' }, 0.8);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      timeline.kill();
    };
  }, [images]);

  return (
    <div ref={sectionRef} className="relative w-full h-[400vh] bg-black">
      {loadProgress < 100 && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black">
          <div className="text-[#E2FF00] font-black text-2xl tracking-[0.5em] uppercase mb-4 animate-pulse">
            INITIALIZING
          </div>
          <div className="w-64 h-1 bg-zinc-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#E2FF00] transition-all duration-300"
              style={{ width: `${loadProgress}%` }}
            ></div>
          </div>
          <div className="mt-4 text-white/40 font-mono text-[10px] uppercase tracking-widest">
            {loadProgress}% Synchronized
          </div>
        </div>
      )}

      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center bg-black">
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        <div 
          ref={textRef}
          className="relative z-10 flex items-center justify-center pointer-events-none w-full px-10 will-change-transform"
        >
          <div className="flex items-center gap-[0.5em] font-oswald text-[12vw] md:text-[8vw] font-black uppercase text-[#E2FF00] tracking-tighter">
            <span>THE S</span>
            <div className="relative flex items-center justify-center w-[1.2em] h-[1.2em]">
               <span className="absolute left-[-20%] text-[1.4em] font-light text-[#E2FF00] animate-pulse">(</span>
               <span className="absolute right-[-20%] text-[1.4em] font-light text-[#E2FF00] animate-pulse">)</span>
            </div>
            <span>CIAL BOX</span>
          </div>
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_70%,rgba(0,0,0,0.8)_100%)] pointer-events-none"></div>
      </div>
    </div>
  );
};

export default HeroSequenceAnimation;
