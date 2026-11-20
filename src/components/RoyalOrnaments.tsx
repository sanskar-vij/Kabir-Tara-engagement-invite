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

export interface RoyalLogoProps {
  className?: string;
  initials?: string;
  groom?: string;
  bride?: string;
  onClick?: () => void;
}

export const RoyalLogo: React.FC<RoyalLogoProps> = ({
  className = 'w-20 h-20 sm:w-24 sm:h-24',
  initials,
  groom = 'Kabir',
  bride = 'Tara',
  onClick,
}) => {
  // Extract clean initials
  const groomInitial = groom.trim().charAt(0).toUpperCase() || 'K';
  const brideInitial = bride.trim().charAt(0).toUpperCase() || 'T';

  // Custom monogram check (e.g. if custom initials string passed)
  const customMonogram = initials?.trim();
  const isDefaultPair =
    !customMonogram ||
    customMonogram === `${groomInitial} & ${brideInitial}` ||
    customMonogram === `${groomInitial}&${brideInitial}`;

  return (
    <svg
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      className={`${className} filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer select-none`}
      aria-label={`${groom} & ${bride} Royal Wedding Crest`}
    >
      <defs>
        {/* 24K Liquid Gold Gradient - Highlights */}
        <linearGradient id="crestGoldBright" x1="20" y1="10" x2="120" y2="130" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFDF0" />
          <stop offset="20%" stopColor="#FDE68A" />
          <stop offset="45%" stopColor="#D4A042" />
          <stop offset="70%" stopColor="#FDF0BD" />
          <stop offset="100%" stopColor="#A46E19" />
        </linearGradient>

        {/* 24K Deep Burnished Gold Gradient */}
        <linearGradient id="crestGoldDeep" x1="120" y1="130" x2="20" y2="10" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#784C0F" />
          <stop offset="30%" stopColor="#B8822B" />
          <stop offset="65%" stopColor="#F9E29D" />
          <stop offset="100%" stopColor="#8A5814" />
        </linearGradient>

        {/* Midnight Royal Lapis Lacquer Core */}
        <radialGradient id="crestLacquer" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#142B5C" stopOpacity="0.95" />
          <stop offset="55%" stopColor="#081432" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#03081A" stopOpacity="0.88" />
        </radialGradient>

        {/* Inner Starlight Radiance */}
        <radialGradient id="crestGlow" cx="50%" cy="50%" r="48%">
          <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.32" />
          <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.1" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ======================================================== */}
      {/* 1. IMPERIAL CROWN APEX (Top: y = 5 to 33)                 */}
      {/* ======================================================== */}
      {/* Radiant Celestial Star on Pinnacle */}
      <path
        d="M70 5L71.5 10.5L77 12L71.5 13.5L70 19L68.5 13.5L63 12L68.5 10.5L70 5Z"
        fill="url(#crestGoldBright)"
      />
      <circle cx="70" cy="12" r="1.3" fill="#FFFFFF" />

      {/* Grand Imperial 5-Point Crown */}
      <path
        d="M48 29L52 19L61 23L70 13L79 23L88 19L92 29H48Z"
        fill="url(#crestGoldBright)"
        stroke="url(#crestGoldDeep)"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />

      {/* Crown Pearl Finials */}
      <circle cx="52" cy="18" r="1.8" fill="#FFFCE8" stroke="url(#crestGoldDeep)" strokeWidth="0.5" />
      <circle cx="61" cy="22" r="1.5" fill="#FFFCE8" stroke="url(#crestGoldDeep)" strokeWidth="0.5" />
      <circle cx="70" cy="12" r="2.2" fill="#FFFCE8" stroke="url(#crestGoldDeep)" strokeWidth="0.6" />
      <circle cx="79" cy="22" r="1.5" fill="#FFFCE8" stroke="url(#crestGoldDeep)" strokeWidth="0.5" />
      <circle cx="88" cy="18" r="1.8" fill="#FFFCE8" stroke="url(#crestGoldDeep)" strokeWidth="0.5" />

      {/* Crown Headband with embedded gems */}
      <rect x="47" y="29.5" width="46" height="3.5" rx="1.5" fill="url(#crestGoldDeep)" stroke="url(#crestGoldBright)" strokeWidth="0.6" />
      <circle cx="53" cy="31.2" r="1" fill="#FFFDF0" />
      <circle cx="61.5" cy="31.2" r="1" fill="#F87171" />
      <circle cx="70" cy="31.2" r="1.3" fill="#FFFDF0" />
      <circle cx="78.5" cy="31.2" r="1" fill="#34D399" />
      <circle cx="87" cy="31.2" r="1" fill="#FFFDF0" />

      {/* ======================================================== */}
      {/* 2. ORNATE HERALDIC LAUREL SCROLLS & FLOURISH WINGS        */}
      {/* ======================================================== */}
      {/* Left Wing & Laurel Branch */}
      <g stroke="url(#crestGoldBright)" fill="none" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M47 34C32 35 20 46 17 62C14 77 22 92 36 100C41 103 47 106 53 107" />
        <path d="M22 55C14 58 10 68 12 77C14 85 22 91 30 94" strokeWidth="0.75" opacity="0.8" />
        {/* Laurel Leaves along left curve */}
        <path d="M26 44C23 40 25 35 30 36C31 41 29 44 26 44Z" fill="url(#crestGoldBright)" />
        <path d="M19 55C15 52 16 46 22 47C23 52 21 55 19 55Z" fill="url(#crestGoldBright)" />
        <path d="M15 68C10 66 11 60 17 60C18 65 17 68 15 68Z" fill="url(#crestGoldBright)" />
        <path d="M16 82C12 82 11 76 17 74C19 79 18 82 16 82Z" fill="url(#crestGoldBright)" />
        <path d="M23 94C19 96 17 90 22 87C25 91 24 94 23 94Z" fill="url(#crestGoldBright)" />
        <path d="M34 103C30 106 27 101 32 97C35 100 35 103 34 103Z" fill="url(#crestGoldBright)" />
      </g>

      {/* Right Wing & Laurel Branch */}
      <g stroke="url(#crestGoldBright)" fill="none" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M93 34C108 35 120 46 123 62C126 77 118 92 104 100C99 103 93 106 87 107" />
        <path d="M118 55C126 58 130 68 128 77C126 85 118 91 110 94" strokeWidth="0.75" opacity="0.8" />
        {/* Laurel Leaves along right curve */}
        <path d="M114 44C117 40 115 35 110 36C109 41 111 44 114 44Z" fill="url(#crestGoldBright)" />
        <path d="M121 55C125 52 124 46 118 47C117 52 119 55 121 55Z" fill="url(#crestGoldBright)" />
        <path d="M125 68C130 66 129 60 123 60C122 65 123 68 125 68Z" fill="url(#crestGoldBright)" />
        <path d="M124 82C128 82 129 76 123 74C121 79 122 82 124 82Z" fill="url(#crestGoldBright)" />
        <path d="M117 94C121 96 123 90 118 87C115 91 116 94 117 94Z" fill="url(#crestGoldBright)" />
        <path d="M106 103C110 106 113 101 108 97C105 100 105 103 106 103Z" fill="url(#crestGoldBright)" />
      </g>

      {/* ======================================================== */}
      {/* 3. CENTRAL ROYAL MEDALLION / JHAROKHA CARTOUCHE           */}
      {/* ======================================================== */}
      {/* Outer 12-Foil Scalloped Halo */}
      <circle cx="70" cy="71" r="39" stroke="url(#crestGoldBright)" strokeWidth="0.7" strokeDasharray="3 2" opacity="0.6" />

      {/* Main Beveled 24K Gold Ring */}
      <circle cx="70" cy="71" r="36" fill="url(#crestGoldDeep)" stroke="url(#crestGoldBright)" strokeWidth="1.6" />
      {/* Inner Midnight Lacquer Depth */}
      <circle cx="70" cy="71" r="32.5" fill="url(#crestLacquer)" stroke="url(#crestGoldBright)" strokeWidth="0.9" />
      {/* Radiant Starlight Fill behind initials */}
      <circle cx="70" cy="71" r="32" fill="url(#crestGlow)" />
      {/* Fine Pearl Beading Ring inside medallion */}
      <circle cx="70" cy="71" r="29.5" stroke="#FFF0C2" strokeWidth="0.8" strokeDasharray="1.8 1.8" fill="none" opacity="0.75" />

      {/* Cardinal Star Accents on Ring (Top, Bottom, Left, Right) */}
      <circle cx="70" cy="38.5" r="1.3" fill="#FFFCE6" />
      <circle cx="70" cy="103.5" r="1.3" fill="#FFFCE6" />
      <circle cx="37.5" cy="71" r="1.3" fill="#FFFCE6" />
      <circle cx="102.5" cy="71" r="1.3" fill="#FFFCE6" />

      {/* Micro Filigree Flourish above Initials */}
      <path
        d="M58 54C62 51 66 53 70 49C74 53 78 51 82 54"
        stroke="url(#crestGoldBright)"
        strokeWidth="0.8"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="70" cy="51" r="1" fill="#FFF9E0" />

      {/* ======================================================== */}
      {/* 4. BESPOKE ROYAL MONOGRAM CENTERPIECE                     */}
      {/* ======================================================== */}
      {isDefaultPair ? (
        <g>
          {/* Groom Initial (Left) in Imperial Serif */}
          <text
            x="54"
            y="76"
            textAnchor="middle"
            fontFamily="'Cinzel', 'Cormorant Garamond', Georgia, serif"
            fontSize="23"
            fontWeight="700"
            fill="url(#crestGoldBright)"
            style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.95))' }}
          >
            {groomInitial}
          </text>

          {/* Central 24K Gold Jewel Connector (Ampersand & Diamond) */}
          <text
            x="70"
            y="74"
            textAnchor="middle"
            fontFamily="'Alex Brush', 'Great Vibes', cursive"
            fontSize="21"
            fontWeight="bold"
            fill="#FFF5D6"
            style={{ filter: 'drop-shadow(0 0 5px rgba(245,158,11,0.85))' }}
          >
            &amp;
          </text>

          {/* Bride Initial (Right) in Imperial Serif */}
          <text
            x="86"
            y="76"
            textAnchor="middle"
            fontFamily="'Cinzel', 'Cormorant Garamond', Georgia, serif"
            fontSize="23"
            fontWeight="700"
            fill="url(#crestGoldBright)"
            style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.95))' }}
          >
            {brideInitial}
          </text>
        </g>
      ) : (
        <text
          x="70"
          y="76"
          textAnchor="middle"
          fontFamily="'Cinzel', 'Cormorant Garamond', Georgia, serif"
          fontSize={customMonogram.length > 5 ? 16 : customMonogram.length > 3 ? 19 : 22}
          fontWeight="700"
          fill="url(#crestGoldBright)"
          letterSpacing="0.06em"
          style={{ filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.95))' }}
        >
          {customMonogram}
        </text>
      )}

      {/* Micro Filigree Flourish below Initials */}
      <path
        d="M58 84C62 87 66 85 70 89C74 85 78 87 82 84"
        stroke="url(#crestGoldBright)"
        strokeWidth="0.8"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="70" cy="87" r="1" fill="#FFF9E0" />

      {/* ======================================================== */}
      {/* 5. BASE PEDESTAL & JEWELED PEARL DROPS                    */}
      {/* ======================================================== */}
      {/* Central Royal Lotus Palmette at bottom */}
      <path
        d="M70 106L73 113L79 114L74 118L76 124L70 120L64 124L66 118L61 114L67 113L70 106Z"
        fill="url(#crestGoldBright)"
        stroke="url(#crestGoldDeep)"
        strokeWidth="0.6"
      />
      {/* Symmetrical scroll base accents */}
      <path
        d="M54 110C58 114 64 116 70 116C76 116 82 114 86 110"
        stroke="url(#crestGoldBright)"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
      />
      {/* Hanging Pearl Drops */}
      <circle cx="58" cy="118" r="1.5" fill="#FFFBE6" stroke="url(#crestGoldDeep)" strokeWidth="0.4" />
      <circle cx="70" cy="128" r="2.2" fill="#FFFBE6" stroke="url(#crestGoldDeep)" strokeWidth="0.5" />
      <circle cx="82" cy="118" r="1.5" fill="#FFFBE6" stroke="url(#crestGoldDeep)" strokeWidth="0.4" />
    </svg>
  );
};

export type RoyalWaxSealProps = RoyalLogoProps;

export const RoyalWaxSeal: React.FC<RoyalWaxSealProps> = ({
  className = 'w-16 h-16 sm:w-20 sm:h-20',
  ...props
}) => (
  <RoyalLogo className={className} {...props} />
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



