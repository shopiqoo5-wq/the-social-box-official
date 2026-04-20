import React, { memo } from 'react';

/**
 * Fixed overlay: glowing code-brackets + laptop chassis with a transparent
 * “screen” cutout so the site can show through underneath (clip-path on content).
 */
const LaptopPortalBezel = memo(function LaptopPortalBezel() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const holeX = isMobile ? 4 : 31;
  const holeW = isMobile ? 92 : 38;
  const holeY = isMobile ? 18 : 24;
  const holeH = isMobile ? 48 : 30;

  return (
    <svg
      className="h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="lp-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="0.35" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="lp-chassis" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3f3f46" />
          <stop offset="45%" stopColor="#27272a" />
          <stop offset="100%" stopColor="#18181b" />
        </linearGradient>
        <linearGradient id="lp-screen-rim" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#52525b" />
          <stop offset="100%" stopColor="#18181b" />
        </linearGradient>
        <mask id="lp-screen-hole">
          <rect width="100" height="100" fill="white" />
          <rect x={holeX} y={holeY} width={holeW} height={holeH} rx="1.8" ry="1.8" fill="black" />
        </mask>
      </defs>

      {/* Brackets — large neon arcs framing the laptop */}
      <path
        d="M 10 14 Q 1 50 10 86"
        fill="none"
        stroke="#FFC107"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.92"
        filter="url(#lp-glow)"
      />
      <path
        d="M 90 14 Q 99 50 90 86"
        fill="none"
        stroke="#FFC107"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.92"
        filter="url(#lp-glow)"
      />
      <path
        d="M 10 14 Q 1 50 10 86"
        fill="none"
        stroke="#F5FF8A"
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.65"
      />
      <path
        d="M 90 14 Q 99 50 90 86"
        fill="none"
        stroke="#F5FF8A"
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.65"
      />

      {/* Horizontal flare */}
      <line
        x1="6"
        y1="39"
        x2="94"
        y2="39"
        stroke="#FFC107"
        strokeWidth="0.12"
        opacity="0.35"
      />

      <g mask="url(#lp-screen-hole)">
        {/* Screen surround + bezel (opaque); center is punched out */}
        <rect x={holeX - 3} y={holeY - 3} width={holeW + 6} height={holeH + 6} rx="2.2" fill="url(#lp-screen-rim)" />
        <rect x={holeX - 2} y={holeY - 2} width={holeW + 4} height={holeH + 4} rx="1.9" fill="#0a0a0a" opacity="0.85" />
        {/* Lid / hinge bar */}
        <rect x={holeX - 5} y={holeY + holeH} width={holeW + 10} height="3.2" rx="0.8" fill="#3f3f46" />
        {/* Keyboard deck */}
        <path
          d={`M ${holeX - 9} ${holeH + holeY + 3.5} L ${holeX - 5} ${holeH + holeY + 2.5} L ${holeX + holeW + 5} ${holeH + holeY + 2.5} L ${holeX + holeW + 9} ${holeH + holeY + 3.5} L ${holeX + holeW + 11} 95 L ${holeX - 11} 95 Z`}
          fill="url(#lp-chassis)"
        />
        <rect x={holeX - 7} y={holeY + holeH + 6} width={holeW + 14} height="32" rx="1.5" fill="#0c0c0e" opacity="0.92" />
        <rect y="86" width={holeW/2} x={50 - holeW/4} height="3" rx="0.9" fill="#27272a" />
      </g>
    </svg>
  );
});

export default LaptopPortalBezel;
