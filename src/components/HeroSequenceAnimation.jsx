import React, { useRef, useEffect, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** 
 * Viewport-relative clip tailored for the laptop bezel.
 * We use dynamic percentages so it centers correctly on all aspect ratios.
 */
const getClipPath = (isMobile) => {
  if (isMobile) {
    // Aggressive "Full Screen" feel for mobile
    return 'inset(18dvh 4vw 34dvh 4vw round 0px)';
  }
  return 'inset(23vh 29vw 41vh 29vw round 0px)';
};

const CLIP_FULL = 'inset(0vh 0vw 0vh 0vw round 0px)';

const HeroSequenceAnimation = ({ bridgeContentRef, bridgeClipRef, portalBezelRef }) => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const cinematicRef = useRef(null);
  const [images, setImages] = useState([]);
  const [loadProgress, setLoadProgress] = useState(0);
  const [loadDone, setLoadDone] = useState(false);
  const [useCanvasSequence, setUseCanvasSequence] = useState(true);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const frameCount = isMobile ? 80 : 120;
  const totalFrames = 240;
  const CLIP_SCREEN = getClipPath(isMobile);

  const bumpProgress = React.useCallback((loadedCount) => {
    if (loadedCount % 5 === 0 || loadedCount === frameCount) {
      setLoadProgress(Math.round((loadedCount / frameCount) * 100));
    }
  }, [frameCount]);

  const finishLoad = React.useCallback((loadedImages) => {
    setLoadProgress(100);
    const ok = loadedImages.filter((img) => {
      if (!img) return false;
      const isBitmap = (typeof ImageBitmap !== 'undefined') && (img instanceof ImageBitmap);
      if (isBitmap) return img.width > 0;
      return img.complete && img.naturalWidth > 0;
    });
    
    if (ok.length === 0) {
      setUseCanvasSequence(false);
      setImages([]);
    } else {
      setUseCanvasSequence(true);
      setImages(loadedImages);
    }
    setLoadDone(true);
  }, []);

  // 🖼️ Optimized sequence preloading with priority batching
  useEffect(() => {
    const loadedImages = new Array(frameCount).fill(null);
    let loadedCount = 0;
    let isMounted = true;

    // Helper: priority load a specific frame
    const loadFrame = async (i) => {
      if (!isMounted) return;
      
      const step = Math.floor(totalFrames / frameCount);
      const actualIndex = Math.min(totalFrames, (i * step) - (step - 1));
      const frameIndex = actualIndex.toString().padStart(3, '0');
      const src = `/ezgif-frame-${frameIndex}.jpg`;

      try {
        const img = new Image();
        img.src = src;
        
        // Use .decode() to ensure the image is ready for painting without blocking main thread
        await img.decode();
        
        let resource = img;
        if (typeof createImageBitmap !== 'undefined') {
          try {
            resource = await createImageBitmap(img);
          } catch (e) {
            // Fallback to HTMLImageElement
          }
        }

        if (!isMounted) {
          if (resource.close) resource.close();
          return;
        }

        loadedImages[i-1] = resource;
        loadedCount++;
        bumpProgress(loadedCount);

        if (loadedCount === frameCount) {
          finishLoad(loadedImages);
        }
      } catch (err) {
        loadedCount++;
        bumpProgress(loadedCount);
        if (loadedCount === frameCount) finishLoad(loadedImages);
      }
    };

    const runLoader = async () => {
      // 1. Load priority chunk (first 40 frames)
      const priorityCount = Math.min(frameCount, 40);
      const priorityTasks = [];
      for (let i = 1; i <= priorityCount; i++) {
        priorityTasks.push(loadFrame(i));
      }
      await Promise.all(priorityTasks);

      // 2. Load remaining in background when idle
      if (isMounted && frameCount > 40) {
        const remainingFrames = [];
        for (let i = 41; i <= frameCount; i++) {
          remainingFrames.push(i);
        }

        const loadNextBatch = () => {
          if (!isMounted) return;
          const batch = remainingFrames.splice(0, 10);
          if (batch.length > 0) {
            Promise.all(batch.map(loadFrame)).then(() => {
              if (window.requestIdleCallback) {
                window.requestIdleCallback(loadNextBatch);
              } else {
                setTimeout(loadNextBatch, 50);
              }
            });
          }
        };

        if (window.requestIdleCallback) {
          window.requestIdleCallback(loadNextBatch);
        } else {
          setTimeout(loadNextBatch, 100);
        }
      }
    };


    runLoader();

    return () => {
      isMounted = false;
      loadedImages.forEach(item => {
        if (item && item.close) item.close();
      });
    };
  }, [frameCount, totalFrames, bumpProgress, finishLoad]);

  useLayoutEffect(() => {
    if (!loadDone || !sectionRef.current) return;

    if (!useCanvasSequence) {
      // Fallback: images failed to load – just reveal content immediately.
      const bridgeEl = bridgeContentRef?.current;
      const clipEl = bridgeClipRef?.current;
      const bezelEl = portalBezelRef?.current;

      if (clipEl) gsap.set(clipEl, { clipPath: CLIP_FULL });
      if (bridgeEl) gsap.set(bridgeEl, { opacity: 1, y: 0, pointerEvents: 'auto' });
      if (bezelEl) gsap.set(bezelEl, { opacity: 0 });

      return;
    }

    if (images.length === 0 || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d', { alpha: false }); // Performance optimization

    // Fill canvas with black immediately to avoid white/transparent flash
    context.fillStyle = '#000000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    let currentFrameIndex = -1;

    const renderFrame = (index) => {
      if (index < 0 || index >= images.length) return;
      const img = images[index];
      if (!img) return;

      const isBitmap = (typeof ImageBitmap !== 'undefined') && (img instanceof ImageBitmap);
      if (!isBitmap && (!img.complete || img.naturalWidth < 1)) return;
      
      currentFrameIndex = index;

      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      const canvasAspect = w / h;
      
      const imgW = isBitmap ? img.width : img.naturalWidth;
      const imgH = isBitmap ? img.height : img.naturalHeight;
      const imgAspect = imgW / imgH || 16 / 9;

      let drawWidth, drawHeight, offsetX, offsetY;

      const scaleMode = 'cover';

        if (canvasAspect > imgAspect) {
          drawWidth = w;
          drawHeight = w / imgAspect;
          offsetX = 0;
          offsetY = (h - drawHeight) * 0.5;
        } else {
          drawWidth = h * imgAspect;
          drawHeight = h;
          offsetX = (w - drawWidth) * 0.5;
          offsetY = 0;
        }

      context.imageSmoothingEnabled = true;
      context.clearRect(0, 0, w, h);
      context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    const updateCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      context.resetTransform();
      context.scale(dpr, dpr);

      if (currentFrameIndex >= 0) {
        renderFrame(currentFrameIndex);
      } else {
        renderFrame(0);
      }
    };

    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=300%',
        scrub: 0.6, // Tighter scrub for "direct" feel
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
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

    // Initial Hint Animation: Fade out as we start the sequence
    const scrollHint = document.getElementById('scroll-hint');
    if (scrollHint) {
      timeline.to(scrollHint, {
        opacity: 0,
        y: 20,
        duration: 0.1,
        ease: 'power2.inOut'
      }, 0.02);
    }

    // Force render frame 0 immediately after load
    renderFrame(0);

    const bridgeEl = bridgeContentRef?.current;
    const clipEl = bridgeClipRef?.current;
    const bezelEl = portalBezelRef?.current;

    if (clipEl) gsap.set(clipEl, { clipPath: CLIP_SCREEN });
    if (bridgeEl) gsap.set(bridgeEl, { opacity: 0, scale: 0.8, y: 0, pointerEvents: 'none' });
    if (bezelEl) gsap.set(bezelEl, { opacity: 0 });

    if (bridgeEl) {
      timeline.fromTo(
        bridgeEl,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: 'power2.out',
        },
        0.75 // Start revealing content *during* the zoom
      );
      timeline.set(bridgeEl, { pointerEvents: 'auto' }, 0.85);
    }

    if (clipEl) {
      timeline.to(
        clipEl,
        {
          clipPath: CLIP_FULL,
          ease: 'power2.inOut',
        },
        0.8
      );
    }

    if (cinematicRef.current) {
      timeline.to(
        cinematicRef.current,
        {
          scale: 4,
          opacity: 0,
          ease: 'power2.in',
        },
        0.82
      );
    }

    // Add a transition "void" text to fill the black gap
    const voidText = document.getElementById('void-text');
    if (voidText) {
      timeline.fromTo(voidText, {
        opacity: 0,
        scale: 0.9,
        letterSpacing: "0.2em"
      }, {
        opacity: 0.4,
        scale: 1.25,
        duration: 0.3,
        ease: "power2.out"
      }, 0.85);
      timeline.to(voidText, { opacity: 0, duration: 0.1 }, 0.98);
    }

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      timeline.kill();
    };
  }, [loadDone, useCanvasSequence, images, bridgeContentRef, bridgeClipRef, portalBezelRef]);

  useEffect(() => {
    if (!loadDone || !bridgeContentRef?.current) return;
    const el = bridgeContentRef.current;
    const reveal = () => {
      const o = parseFloat(window.getComputedStyle(el).opacity);
      if (o < 0.05 && window.scrollY > window.innerHeight * 3) {
        gsap.set(el, { opacity: 1, y: 0, pointerEvents: 'auto' });
        const clip = bridgeClipRef?.current;
        if (clip) gsap.set(clip, { clipPath: CLIP_FULL });
        const bezel = portalBezelRef?.current;
        if (bezel) gsap.set(bezel, { opacity: 0 });
      }
    };
    window.addEventListener('scroll', reveal, { passive: true });
    return () => window.removeEventListener('scroll', reveal);
  }, [loadDone, bridgeContentRef, bridgeClipRef, portalBezelRef, CLIP_FULL]);

  const sectionScrollHeight = useCanvasSequence ? 'min-h-[420vh]' : 'min-h-[320vh]';

  return (
    <div ref={sectionRef} className={`relative w-full ${sectionScrollHeight} bg-black`}>
      {!loadDone && (
        <div className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black">
          <div className="text-[#FFC107] font-black text-2xl tracking-[0.5em] uppercase mb-4">
            INITIALIZING
          </div>
          <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#FFC107] transition-all duration-300"
              style={{ width: `${loadProgress}%` }}
            ></div>
          </div>
          <div className="mt-4 text-white/40 font-mono text-[10px] uppercase tracking-widest">
            {loadProgress}% Synchronized
          </div>
        </div>
      )}

      <div className="relative flex h-[100dvh] w-full flex-col items-center justify-start overflow-hidden bg-black">
        <div
          ref={cinematicRef}
          className="absolute inset-0 z-0 will-change-transform bg-black"
        >
          {useCanvasSequence ? (
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full pointer-events-none"
            />
          ) : (
            <div className="pointer-events-none absolute inset-0" aria-hidden>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_52%,rgba(255,193,7,0.14)_0%,transparent_58%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_45%,rgba(255,193,7,0.1)_0%,transparent_38%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_45%,rgba(255,193,7,0.1)_0%,transparent_38%)]" />
            </div>
          )}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.35)_72%,rgba(0,0,0,0.85)_100%)] pointer-events-none" />
        </div>

        {/* Transitional Void Text */}
        <div 
          id="void-text"
          className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none opacity-0"
        >
          <div className="font-space text-[2.5vw] md:text-[0.9vw] font-black uppercase tracking-[2.5em] text-[#FFC107] opacity-60">
            STAY RELEVANT, NOT JUST VISIBLE
          </div>
        </div>

        {/* Tactical Scroll Hint */}
        <div 
          id="scroll-hint"
          className="absolute bottom-12 md:bottom-20 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4 transition-all duration-700"
        >
          <div className="w-px h-12 bg-gradient-to-b from-[#FFC107]/0 via-[#FFC107] to-[#FFC107]/0 animate-bounce duration-[2s]"></div>
          <div className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.6em] text-[#FFC107]/60 whitespace-nowrap">
            {isMobile ? 'Swipe to Interface' : 'Scroll to Explore'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSequenceAnimation;
