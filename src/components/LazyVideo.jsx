import React, { useRef, useEffect, useState } from 'react';

const LazyVideo = ({ src, className, ...props }) => {
  const videoRef = useRef(null);
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
          observer.disconnect();
        }
      },
      { threshold: 0.01, rootMargin: '50px' } /* Pre-trigger video stream download 50px before entering viewport */
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Once source becomes available, trigger playback
  useEffect(() => {
    if (isIntersecting && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [isIntersecting]);

  return (
    <video
      ref={videoRef}
      className={className}
      autoPlay
      loop
      muted
      playsInline
      preload="none"
      {...props}
    >
      {isIntersecting && <source src={src} type="video/mp4" />}
    </video>
  );
};

export default LazyVideo;
