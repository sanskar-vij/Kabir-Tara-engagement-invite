import React from 'react';

export const CrownIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-6' }) => (
  <svg
    viewBox="0 0 64 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="crownGold" x1="0" y1="0" x2="0" y2="44" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFF0BC" />
        <stop offset="50%" stopColor="#EBC474" />
        <stop offset="100%" stopColor="#B88332" />
      </linearGradient>
    </defs>
    {/* Crown base */}
    <path
      d="M11 35H53L56 15L42 25L32 10L22 25L8 15L11 35Z"
      fill="url(#crownGold)"
      stroke="#FFF4CC"
      strokeWidth="0.9"
      strokeLinejoin="round"
    />
    {/* Base band */}
    <rect x="10.5" y="36.5" width="43" height="3.2" rx="1.5" fill="url(#crownGold)" />
    {/* Crown jewels / pearls */}
    <circle cx="8" cy="12" r="2.3" fill="#FFF1C2" />
    <circle cx="21" cy="18" r="1.7" fill="#FFF1C2" />
    <circle cx="32" cy="7" r="2.6" fill="#FFF1C2" />
    <circle cx="43" cy="18" r="1.7" fill="#FFF1C2" />
    <circle cx="56" cy="12" r="2.3" fill="#FFF1C2" />
  </svg>
);

export const FiligreeDivider: React.FC<{ className?: string; width?: string }> = ({
  className = '',
  width = 'w-56',
}) => (
  <div className={`flex items-center justify-center gap-2 ${width} mx-auto ${className}`}>
    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#E5BE70]/75 to-[#F4D58D]" />
    <svg
      viewBox="0 0 48 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-4 shrink-0"
      aria-hidden="true"
    >
      <path
        d="M24 2L28.5 11L24 20L19.5 11L24 2Z"
        fill="#F3D285"
        stroke="#FFF0C4"
        strokeWidth="0.7"
      />
      <path
        d="M18 11C14 11 12 7 8 9.5C11 11.5 11 12.5 8 14.5C12 16 14 11 18 11Z"
        fill="#E5BE70"
      />
      <path
        d="M30 11C34 11 36 7 40 9.5C37 11.5 37 12.5 40 14.5C36 16 34 11 30 11Z"
        fill="#E5BE70"
      />
      <circle cx="4" cy="11" r="1.2" fill="#F3D285" />
      <circle cx="44" cy="11" r="1.2" fill="#F3D285" />
    </svg>
    <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#E5BE70]/75 to-[#F4D58D]" />
  </div>
);

export const StarburstDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center w-52 mx-auto ${className}`}>
    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#D9B166]/65 to-[#F5D68B]" />
    <svg viewBox="0 0 28 28" className="w-5 h-5 mx-1.5 shrink-0" fill="none" aria-hidden="true">
      <path
        d="M14 2L16.4 11.6L26 14L16.4 16.4L14 26L11.6 16.4L2 14L11.6 11.6L14 2Z"
        fill="#FFEAB0"
      />
      <circle cx="14" cy="14" r="2.2" fill="#FFFFFF" />
    </svg>
    <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#D9B166]/65 to-[#F5D68B]" />
  </div>
);

export const CalendarRoyalIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <rect x="3" y="5" width="18" height="16" rx="2" stroke="#F0CC7F" strokeWidth="1.5" />
    <path d="M3 9.5H21" stroke="#F0CC7F" strokeWidth="1.4" />
    <path d="M8 3V6.5M16 3V6.5" stroke="#F0CC7F" strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="8" cy="13.5" r="1" fill="#F0CC7F" />
    <circle cx="12" cy="13.5" r="1" fill="#F0CC7F" />
    <circle cx="16" cy="13.5" r="1" fill="#F0CC7F" />
    <circle cx="8" cy="17" r="1" fill="#F0CC7F" />
    <circle cx="12" cy="17" r="1" fill="#F0CC7F" />
    <circle cx="16" cy="17" r="1" fill="#F0CC7F" />
  </svg>
);

export const ClockRoyalIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="#F0CC7F" strokeWidth="1.5" />
    <path d="M12 7V12.2L15.4 14.2" stroke="#F0CC7F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const PinRoyalIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path
      d="M12 21C12 21 18.5 14.8 18.5 9.8C18.5 6.04 15.59 3 12 3C8.41 3 5.5 6.04 5.5 9.8C5.5 14.8 12 21 12 21Z"
      stroke="#F0CC7F"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="9.6" r="2.4" fill="#F0CC7F" />
  </svg>
);

/**
 * Unified luxury gold card border with corner flourishes for all invitation panels
 */
export const RoyalCardBorder: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
    {/* Outer Gold Border with Subtle Radiance */}
    <div className="absolute inset-2 sm:inset-2.5 rounded-xl border border-[#D9B166]/75 shadow-[inset_0_0_10px_rgba(217,177,102,0.12)]" />

    {/* Inner Hairline Gold Border */}
    <div className="absolute inset-3 sm:inset-3.5 rounded-lg border border-[#D9B166]/35" />

    {/* Top-Left Corner Flourish */}
    <svg viewBox="0 0 24 24" fill="none" className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 w-4 h-4 text-[#E8C479]" aria-hidden="true">
      <path d="M2 14V6C2 3.79086 3.79086 2 6 2H14" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="6" cy="6" r="1.5" fill="currentColor" />
    </svg>

    {/* Top-Right Corner Flourish */}
    <svg viewBox="0 0 24 24" fill="none" className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 w-4 h-4 text-[#E8C479]" aria-hidden="true">
      <path d="M22 14V6C22 3.79086 20.2091 2 18 2H10" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="18" cy="6" r="1.5" fill="currentColor" />
    </svg>

    {/* Bottom-Left Corner Flourish */}
    <svg viewBox="0 0 24 24" fill="none" className="absolute bottom-2 left-2 sm:bottom-2.5 sm:left-2.5 w-4 h-4 text-[#E8C479]" aria-hidden="true">
      <path d="M2 10V18C2 20.2091 3.79086 22 6 22H14" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="6" cy="18" r="1.5" fill="currentColor" />
    </svg>

    {/* Bottom-Right Corner Flourish */}
    <svg viewBox="0 0 24 24" fill="none" className="absolute bottom-2 right-2 sm:bottom-2.5 sm:right-2.5 w-4 h-4 text-[#E8C479]" aria-hidden="true">
      <path d="M22 10V18C22 20.2091 20.2091 22 18 22H10" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="18" cy="18" r="1.5" fill="currentColor" />
    </svg>
  </div>
);

export const Panel3ArchFrame: React.FC = () => <RoyalCardBorder />;

export const RsvpCartouche: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="group relative inline-flex flex-col items-center justify-center px-9 py-3.5 cursor-pointer transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98] focus:outline-none"
    aria-label="Open RSVP form — RSVP by 15 November 2027"
  >
    {/* Ornate dark-navy gold-trimmed scalloped cartouche SVG background */}
    <svg
      viewBox="0 0 260 92"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full drop-shadow-[0_6px_18px_rgba(2,8,24,0.85)]"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="cartoucheBg" x1="0" y1="0" x2="0" y2="92" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#091736" stopOpacity="0.96" />
          <stop offset="100%" stopColor="#061026" stopOpacity="0.98" />
        </linearGradient>
        <linearGradient id="cartoucheGold" x1="0" y1="0" x2="260" y2="92" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F5D78E" />
          <stop offset="50%" stopColor="#C89844" />
          <stop offset="100%" stopColor="#F6DA93" />
        </linearGradient>
      </defs>
      {/* Outer scalloped shield */}
      <path
        d="M 28 10 Q 82 10 130 3 Q 178 10 232 10 Q 248 24 256 46 Q 248 68 232 82 Q 178 82 130 89 Q 82 82 28 82 Q 12 68 4 46 Q 12 24 28 10 Z"
        fill="url(#cartoucheBg)"
        stroke="url(#cartoucheGold)"
        strokeWidth="1.7"
      />
      {/* Inner hairline */}
      <path
        d="M 32 14 Q 82 14 130 8 Q 178 14 228 14 Q 242 26 249 46 Q 242 66 228 78 Q 178 78 130 84 Q 82 78 32 78 Q 18 66 11 46 Q 18 26 32 14 Z"
        stroke="url(#cartoucheGold)"
        strokeWidth="0.7"
        strokeOpacity="0.65"
        fill="none"
      />
      {/* Top & bottom center fleur accents */}
      <path d="M130 2L133 6L130 10L127 6L130 2Z" fill="#F5D78E" />
      <path d="M130 82L133 86L130 90L127 86L130 82Z" fill="#F5D78E" />
    </svg>

    {/* Subtle hover shimmer */}
    <span className="relative z-10 font-cinzel text-[21px] sm:text-[22px] tracking-[0.14em] gold-text font-semibold leading-tight group-hover:brightness-110 transition-all">
      RSVP
    </span>
    <span className="relative z-10 font-serif-royal text-[12.5px] sm:text-[13px] tracking-[0.04em] text-[#F7EBD0] mt-0.5">
      by 15 November 2027
    </span>
  </button>
);

const STARS = [
  { top: '12%', left: '22%', delay: '0s', size: 2 },
  { top: '16%', left: '76%', delay: '1.1s', size: 2.5 },
  { top: '24%', left: '34%', delay: '0.6s', size: 1.8 },
  { top: '21%', left: '62%', delay: '2.1s', size: 2 },
  { top: '31%', left: '72%', delay: '1.7s', size: 2.2 },
  { top: '29%', left: '24%', delay: '2.8s', size: 1.6 },
  { top: '39%', left: '50%', delay: '0.9s', size: 2 },
];

export const TwinklingStars: React.FC = () => (
  <div className="absolute inset-x-0 top-0 h-[55%] pointer-events-none overflow-hidden z-[5]" aria-hidden="true">
    {STARS.map((star, idx) => (
      <span
        key={idx}
        className="animate-twinkle absolute rounded-full bg-[#FFF5D6] shadow-[0_0_8px_#FFE8A3]"
        style={{
          top: star.top,
          left: star.left,
          width: `${star.size}px`,
          height: `${star.size}px`,
          animationDelay: star.delay,
        }}
      />
    ))}
  </div>
);

export const RoyalWaxSeal: React.FC<{
  onClick?: () => void;
  className?: string;
}> = ({ onClick, className = '' }) => (
  <button
    type="button"
    onClick={onClick}
    className={`group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 select-none ${className}`}
    title="Royal Seal of Kabir & Tara — Tap to RSVP"
    aria-label="Royal Seal of Kabir & Tara — Tap to RSVP"
  >
    {/* Ambient breathing halo */}
    <span className="absolute inset-0 rounded-full bg-[#F4D58D]/25 blur-md group-hover:bg-[#F4D58D]/45 transition-colors pointer-events-none" />

    {/* 3D Gold-rimmed Wax Medallion */}
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full drop-shadow-[0_6px_18px_rgba(0,0,0,0.85)]"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="sealLacquer" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#142B5C" />
          <stop offset="65%" stopColor="#081432" />
          <stop offset="100%" stopColor="#04091A" />
        </radialGradient>
        <linearGradient id="sealGoldRim" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF1C4" />
          <stop offset="35%" stopColor="#D9B166" />
          <stop offset="70%" stopColor="#966C24" />
          <stop offset="100%" stopColor="#F7DF9E" />
        </linearGradient>
      </defs>

      {/* Scalloped wax edge */}
      <circle cx="40" cy="40" r="38" fill="url(#sealGoldRim)" />
      <circle cx="40" cy="40" r="35" fill="url(#sealLacquer)" stroke="url(#sealGoldRim)" strokeWidth="1.2" />

      {/* Decorative Beaded Ring */}
      <circle
        cx="40"
        cy="40"
        r="31"
        stroke="#E7C67C"
        strokeWidth="0.8"
        strokeDasharray="2.2 2.2"
        fill="none"
        opacity="0.8"
      />

      {/* Miniature Royal Crown at Top */}
      <path
        d="M33 28L35 32L40 26L45 32L47 28L46 35H34L33 28Z"
        fill="url(#sealGoldRim)"
        stroke="#FFF2CD"
        strokeWidth="0.4"
      />

      {/* Monogram KT text */}
      <text
        x="40"
        y="50"
        textAnchor="middle"
        fontFamily="'Alex Brush', cursive"
        fontSize="17"
        fontWeight="bold"
        fill="url(#sealGoldRim)"
        letterSpacing="0.05em"
      >
        K &amp; T
      </text>

      {/* Lower star flourish */}
      <circle cx="40" cy="58" r="1.2" fill="#FFF1C4" />
    </svg>
  </button>
);

