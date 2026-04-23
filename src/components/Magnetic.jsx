import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function Magnetic({ children }) {
    const magnetic = useRef(null);

    useEffect( () => {
        if (!magnetic.current) return;

        // "Buttery Smooth" quickTo animators with Studio-grade easing
        const xTo = gsap.quickTo(magnetic.current, "x", {duration: 1.2, ease: "power4.out"})
        const yTo = gsap.quickTo(magnetic.current, "y", {duration: 1.2, ease: "power4.out"})

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            if (!magnetic.current) return;
            const {height, width, left, top} = magnetic.current.getBoundingClientRect();
            
            // Subtle magnetic pull (reduced intensity for premium feel)
            const x = (clientX - (left + width/2)) * 0.35;
            const y = (clientY - (top + height/2)) * 0.35;
            
            xTo(x);
            yTo(y);
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        const currentRef = magnetic.current;
        currentRef.addEventListener("mousemove", handleMouseMove);
        currentRef.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            currentRef.removeEventListener("mousemove", handleMouseMove);
            currentRef.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    // Wrap in a div so the ref is always attachable (cloneElement may
    // silently drop ref on function components that don't forwardRef)
    return (
        <div ref={magnetic} className="inline-block">
            {children}
        </div>
    );
}
