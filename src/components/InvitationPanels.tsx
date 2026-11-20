import React, { useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { CountdownTimer } from './CountdownTimer';
import { ParallaxCard } from './ParallaxCard';
import {
  CalendarRoyalIcon,
  ClockRoyalIcon,
  CrownIcon,
  FiligreeDivider,
  PinRoyalIcon,
  RoyalCardBorder,
  RoyalLogo,
  RoyalWaxSeal,
  RsvpCartouche,
  StarburstDivider,
  TwinklingStars,
} from './RoyalOrnaments';
import { WEDDING_CONFIG } from '../config/weddingConfig';

export interface PanelProps {
  onNextSection?: () => void;
  onAddCalendar?: () => void;
  onOpenVenue?: () => void;
  onOpenRsvp?: () => void;
  onOpenItinerary?: () => void;
  couple?: {
    groom?: string;
    bride?: string;
    initials?: string;
  };
}

// 5 Lamp Pairs: Glow centered IN THE LAMP with a little light spilling OUT
const WALKWAY_LAMPS = [
  {
    step: 1,
    left: { bottom: '16.9%', left: '16.4%', flameW: 16, flameH: 22, haloSize: 38 },
    right: { bottom: '16.9%', right: '15.6%', flameW: 16, flameH: 22, haloSize: 38 },
  },
  {
    step: 2,
    left: { bottom: '20.2%', left: '19.0%', flameW: 14, flameH: 19, haloSize: 32 },
    right: { bottom: '20.0%', right: '18.5%', flameW: 14, flameH: 19, haloSize: 32 },
  },
  {
    step: 3,
    left: { bottom: '24.9%', left: '27.9%', flameW: 12, flameH: 16, haloSize: 26 },
    right: { bottom: '25.2%', right: '25.5%', flameW: 12, flameH: 16, haloSize: 26 },
  },
  {
    step: 4,
    left: { bottom: '27.8%', left: '35.3%', flameW: 10, flameH: 13, haloSize: 22 },
    right: { bottom: '27.4%', right: '31.3%', flameW: 10, flameH: 13, haloSize: 22 },
  },
  {
    step: 5,
    left: { bottom: '29.8%', left: '41.2%', flameW: 8, flameH: 11, haloSize: 18 },
    right: { bottom: '29.8%', right: '39.5%', flameW: 8, flameH: 11, haloSize: 18 },
  },
];

export const CoverPanel: React.FC<PanelProps> = ({ onNextSection, couple }) => {
  const groom = couple?.groom ?? WEDDING_CONFIG.groom;
  const bride = couple?.bride ?? WEDDING_CONFIG.bride;
  const initials = couple?.initials ?? WEDDING_CONFIG.initials;

  // litStep: 0 = completely unlit (no light until user clicks), 1..7 = sequential lamp pairs, 8 = full palace illumination
  const [litStep, setLitStep] = useState<number>(0);
  // Only play the sequential lighting animation ONCE until the page is reloaded
  const [hasTriggered, setHasTriggered] = useState<boolean>(false);

  const handleLightSequentialLamps = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    // Prevent any re-triggering once clicked until page is reloaded
    if (hasTriggered) return;
    setHasTriggered(true);

    if (navigator.vibrate) {
      navigator.vibrate([35, 45, 35]);
    }

    // Step 1: Immediate foreground pair lights up
    setLitStep(1);

    // Cascading sequential lighting all the way to the palace entrance (runs strictly once)
    for (let s = 2; s <= 6; s++) {
      window.setTimeout(() => {
        setLitStep(s);
      }, (s - 1) * 160);
    }
  };

  return (
    <ParallaxCard>
      <section
        id="panel-cover"
        className="relative w-full aspect-[9/16] overflow-hidden rounded-2xl bg-[#06122B] select-none border border-[#D9B166]/65 shadow-[0_0_0_1px_rgba(217,177,102,0.25),0_20px_60px_rgba(0,0,0,0.85)] sm:shadow-[0_0_0_1px_rgba(217,177,102,0.35),0_25px_80px_rgba(0,0,0,0.92),0_0_40px_rgba(217,177,102,0.12)]"
        aria-label="Kabir and Tara Engagement Ceremony Cover"
      >
        {/* Layer 1: Night Sky & Lake Reflection Background */}
        <img
          src="/assets/4.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        />

        {/* Layer 2: Illuminated Grand Palace Horizon with Warm Ambient Aura */}
        <img
          src="/assets/5.png"
          alt="Illuminated royal palace"
          className={`absolute inset-0 w-full h-full object-cover object-center pointer-events-none transition-all duration-1000 ${
            litStep >= 6
              ? 'brightness-120'
              : litStep >= 3
              ? 'brightness-110'
              : 'animate-palace-aura'
          }`}
        />

        {/* Layer 3a: Left Palm Tree (Static, crystal clean cutout) */}
        <img
          src="/assets/tree-left.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        />

        {/* Layer 3b: Right Palm Tree (Static, crystal clean cutout) */}
        <img
          src="/assets/tree-right.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        />

        {/* Layer 4: Walkway Blooming Shrubs & Rose Hedges */}
        <img
          src="/assets/walkway-shrubs.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        />

        {/* Layer 5: Carved Golden Mughal Archway & Reflective Marble Walkway */}
        <img
          src="/assets/3.png"
          alt="Carved golden Mughal archway and marble walkway"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        />

        {/* ========================================================================= */}
        {/* SEQUENTIAL WALKWAY LAMPS: GLOW IN THE LAMP + LITTLE LIGHT OUT             */}
        {/* ========================================================================= */}

        {/* 7 Pairs of Walkway Lanterns */}
        {WALKWAY_LAMPS.map((pair, idx) => {
          const isLit = litStep >= pair.step;
          const isJustLit = litStep === pair.step;

          if (!isLit) return null; // ZERO LIGHT BEFORE CLICK!

          return (
            <React.Fragment key={idx}>
              {/* --- LEFT LAMP --- */}
              {/* Little soft ambient light radiating slightly out */}
              <div
                className="absolute rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-opacity duration-600 animate-lamp-halo"
                style={{
                  width: `${pair.left.haloSize}px`,
                  height: `${pair.left.haloSize}px`,
                  bottom: pair.left.bottom,
                  left: pair.left.left,
                  background:
                    'radial-gradient(circle, rgba(255, 215, 100, 0.42) 0%, rgba(245, 160, 40, 0.14) 45%, transparent 72%)',
                }}
              />
              {/* Glowing flame core/globe INSIDE the lamp */}
              <div
                className={`absolute rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-all duration-300 animate-candle-flame ${
                  isJustLit ? 'scale-130' : 'scale-100'
                }`}
                style={{
                  width: `${pair.left.flameW}px`,
                  height: `${pair.left.flameH}px`,
                  bottom: pair.left.bottom,
                  left: pair.left.left,
                  background:
                    'radial-gradient(ellipse at 50% 60%, #FFFFFF 0%, #FFF2A8 28%, #F59E0B 72%, rgba(217, 119, 6, 0.25) 95%)',
                  boxShadow:
                    '0 0 10px rgba(255, 225, 110, 0.95), 0 0 20px rgba(245, 160, 40, 0.6)',
                }}
              />

              {/* --- RIGHT LAMP --- */}
              {/* Little soft ambient light radiating slightly out */}
              <div
                className="absolute rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-opacity duration-600 animate-lamp-halo"
                style={{
                  width: `${pair.right.haloSize}px`,
                  height: `${pair.right.haloSize}px`,
                  bottom: pair.right.bottom,
                  right: pair.right.right,
                  background:
                    'radial-gradient(circle, rgba(255, 215, 100, 0.42) 0%, rgba(245, 160, 40, 0.14) 45%, transparent 72%)',
                }}
              />
              {/* Glowing flame core/globe INSIDE the lamp */}
              <div
                className={`absolute rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-all duration-300 animate-candle-flame ${
                  isJustLit ? 'scale-130' : 'scale-100'
                }`}
                style={{
                  width: `${pair.right.flameW}px`,
                  height: `${pair.right.flameH}px`,
                  bottom: pair.right.bottom,
                  right: pair.right.right,
                  background:
                    'radial-gradient(ellipse at 50% 60%, #FFFFFF 0%, #FFF2A8 28%, #F59E0B 72%, rgba(217, 119, 6, 0.25) 95%)',
                  boxShadow:
                    '0 0 10px rgba(255, 225, 110, 0.95), 0 0 20px rgba(245, 160, 40, 0.6)',
                }}
              />
            </React.Fragment>
          );
        })}

        {/* Gentle Palace Horizon Warm Aura (Step 6 Finale) */}
        {litStep >= 6 && (
          <div
            className="absolute bottom-[28%] left-1/2 -translate-x-1/2 w-44 h-24 rounded-full pointer-events-none animate-pulse"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(255, 235, 150, 0.6) 0%, rgba(255, 190, 60, 0.25) 50%, transparent 75%)',
              mixBlendMode: 'screen',
            }}
          />
        )}

        {/* Walkway Lantern Image Layer: Unlit before click, richly illuminated when lit */}
        <img
          src="/assets/1.png"
          alt="Lanterns along the palace walkway"
          onClick={hasTriggered ? undefined : handleLightSequentialLamps}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ${
            hasTriggered ? 'pointer-events-none' : 'pointer-events-auto cursor-pointer'
          } ${
            litStep >= 1
              ? 'brightness-115 contrast-105 opacity-100'
              : 'brightness-[0.55] saturate-[0.35] opacity-80'
          }`}
          title={hasTriggered ? undefined : 'Tap to illuminate the royal walkway'}
        />

        {/* Pulsing Touch Target Rings on First Lamps (Visible ONLY until user clicks) */}
        {litStep === 0 && !hasTriggered && (
          <>
            <div
              onClick={handleLightSequentialLamps}
              className="absolute bottom-[14%] left-[13.5%] w-14 h-14 rounded-full cursor-pointer z-30 flex items-center justify-center pointer-events-auto"
              title="Tap to light the royal lamps"
            >
              <span className="w-7 h-7 rounded-full border-2 border-[#F4D58D]/80 animate-ping pointer-events-none" />
              <span className="absolute w-3.5 h-3.5 rounded-full bg-[#F4D58D]/70 animate-pulse pointer-events-none" />
            </div>

            <div
              onClick={handleLightSequentialLamps}
              className="absolute bottom-[14%] right-[13%] w-14 h-14 rounded-full cursor-pointer z-30 flex items-center justify-center pointer-events-auto"
              title="Tap to light the royal lamps"
            >
              <span className="w-7 h-7 rounded-full border-2 border-[#F4D58D]/80 animate-ping pointer-events-none" />
              <span className="absolute w-3.5 h-3.5 rounded-full bg-[#F4D58D]/70 animate-pulse pointer-events-none" />
            </div>

            {/* High-Contrast Interactive Cue Button */}
            <div
              onClick={handleLightSequentialLamps}
              className="absolute bottom-[3%] left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#05112B]/95 border border-[#F4D58D]/85 text-[#FFF5DC] font-cinzel text-[10px] sm:text-[11px] tracking-[0.18em] uppercase font-semibold whitespace-nowrap cursor-pointer hover:scale-105 active:scale-95 transition-all shadow-[0_4px_22px_rgba(244,213,141,0.45),0_0_15px_rgba(217,177,102,0.3)] animate-pulse"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F4D58D]" />
              <span>Tap Lamp to Light Walkway</span>
            </div>
          </>
        )}

        {/* Subtle top sky gradient for text clarity */}
        <div
          className="absolute inset-x-0 top-0 h-[48%] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 35%, rgba(5, 16, 42, 0.55) 0%, rgba(5, 16, 42, 0.15) 65%, transparent 100%)',
          }}
        />

        {/* Subtle twinkling starlight */}
        <TwinklingStars />

        {/* Unified Luxury Gold Card Border */}
        <RoyalCardBorder />

        {/* Clean Text & Royal Logo Overlay inside the Arch */}
        <div className="relative z-10 flex flex-col items-center text-center pt-[11%] px-[8%]">
          <RoyalLogo
            className="w-20 h-20 sm:w-24 sm:h-24 mb-1 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
            initials={initials}
            groom={groom}
            bride={bride}
          />

          <FiligreeDivider width="w-44 sm:w-48" className="mb-2" />

          {/* SINGLE LINE COUPLE NAME WITH 24K GOLD GLEAM ANIMATION */}
          <h1
            className="font-script text-[40px] min-[360px]:text-[44px] min-[400px]:text-[50px] leading-[1.08] gold-gleam-text tracking-[0.01em] whitespace-nowrap py-0.5 select-none hover:scale-[1.02] active:scale-[0.98] transition-transform cursor-pointer"
            title={`${groom} & ${bride}`}
          >
            {groom} &amp; {bride}
          </h1>

          <FiligreeDivider width="w-44 sm:w-48" className="mt-2" />
        </div>

        {/* Gentle Mobile Scroll Cue */}
        {onNextSection && (
          <button
            type="button"
            onClick={onNextSection}
            className="absolute bottom-3.5 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-0.5 px-3 py-1 rounded-full bg-[#06122B]/65 border border-[#D9B166]/45 backdrop-blur-xs text-[#F4D58D] hover:bg-[#06122B]/85 transition-all cursor-pointer"
            aria-label="Scroll to invitation details"
          >
            <span className="font-cinzel text-[9px] tracking-[0.2em] uppercase">Invitation</span>
            <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
          </button>
        )}
      </section>
    </ParallaxCard>
  );
};

export const DetailsPanel: React.FC<PanelProps> = ({
  onAddCalendar,
  onOpenVenue,
  couple,
}) => {
  const groom = couple?.groom ?? WEDDING_CONFIG.groom;
  const bride = couple?.bride ?? WEDDING_CONFIG.bride;

  return (
    <ParallaxCard>
      <section
        id="panel-details"
        className="relative w-full aspect-[9/16] overflow-hidden rounded-2xl bg-[#06122B] select-none border border-[#D9B166]/65 shadow-[0_0_0_1px_rgba(217,177,102,0.25),0_20px_60px_rgba(0,0,0,0.85)] sm:shadow-[0_0_0_1px_rgba(217,177,102,0.35),0_25px_80px_rgba(0,0,0,0.92),0_0_40px_rgba(217,177,102,0.12)]"
        aria-label={`${groom} & ${bride} ${WEDDING_CONFIG.eventTitle} Details — 20 November 2027 at The Palm Pavilion Goa`}
      >
        {/* Layer 1: Royal Pavilion Courtyard with Floral Urns & Twilight Horizon */}
        <img
          src="/assets/6.png"
          alt="Royal Mughal archway with white floral urns and marble courtyard"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        />

        {/* Warm ambient chandelier glow */}
        <div
          className="absolute top-[16%] left-1/2 -translate-x-1/2 w-48 h-28 rounded-full pointer-events-none animate-lamp-halo"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(255, 220, 120, 0.3) 0%, rgba(240, 190, 80, 0.1) 60%, transparent 80%)',
          }}
        />

        {/* Layer 2: Triple Crystal Chandeliers (Each animating independently with distinct rhythm & phase) */}
        <img
          src="/assets/chandelier-left.png"
          alt=""
          aria-hidden="true"
          style={{ transformOrigin: '19.0% 0%' }}
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none animate-chandelier-left"
        />
        <img
          src="/assets/chandelier-center.png"
          alt="Crystal chandeliers"
          style={{ transformOrigin: '50% 0%' }}
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none animate-chandelier-center"
        />
        <img
          src="/assets/chandelier-right.png"
          alt=""
          aria-hidden="true"
          style={{ transformOrigin: '81.0% 0%' }}
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none animate-chandelier-right"
        />

        {/* Seamless central dark-navy glow behind text */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 58% 46% at 50% 55%, rgba(5, 14, 38, 0.78) 0%, rgba(5, 14, 38, 0.45) 60%, transparent 100%)',
          }}
        />

        <TwinklingStars />

        {/* Unified Luxury Gold Card Border */}
        <RoyalCardBorder />

        {/* Central Invitation Typography positioned cleanly below chandeliers & between floral urns */}
        <div className="relative z-10 flex flex-col items-center text-center pt-[31%] px-[14%]">
          <p className="font-serif-royal text-[14.5px] sm:text-[16px] leading-[1.24] ivory-text-shadow tracking-[0.02em]">
            We cordially invite you to
            <br />
            the Engagement Ceremony of
          </p>

          {/* SINGLE LINE COUPLE NAME WITH 24K GOLD GLEAM ANIMATION */}
          <h2
            className="font-script text-[32px] min-[360px]:text-[36px] min-[400px]:text-[41px] leading-[1.08] gold-gleam-text mt-1 whitespace-nowrap py-0.5 select-none hover:scale-[1.02] active:scale-[0.98] transition-transform cursor-pointer"
            title={`${groom} & ${bride}`}
          >
            {groom} &amp; {bride}
          </h2>

          {/* Interactive Event Date / Time / Venue */}
          <div className="mt-2 flex flex-col items-center gap-1.5 w-full max-w-[240px]">
            <button
              type="button"
              onClick={onAddCalendar}
              className="group flex items-center justify-center gap-2 text-left hover:scale-[1.03] active:scale-[0.98] transition-transform cursor-pointer"
              title="Tap to save to calendar"
            >
              <CalendarRoyalIcon className="w-[17px] h-[17px] shrink-0 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]" />
              <span className="font-cinzel text-[12px] sm:text-[13px] tracking-[0.08em] ivory-text-shadow font-medium group-hover:text-[#F4D58D] transition-colors">
                20 NOVEMBER 2027
              </span>
            </button>

            <div className="flex items-center justify-center gap-2">
              <ClockRoyalIcon className="w-[17px] h-[17px] shrink-0 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]" />
              <span className="font-serif-royal text-[15px] sm:text-[16px] tracking-[0.03em] ivory-text-shadow">
                7:00 PM Onwards
              </span>
            </div>

            <button
              type="button"
              onClick={onOpenVenue}
              className="group flex items-start justify-center gap-1.5 text-center hover:scale-[1.03] active:scale-[0.98] transition-transform cursor-pointer"
              title="Tap for venue details & directions"
            >
              <PinRoyalIcon className="w-[17px] h-[17px] shrink-0 mt-0.5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]" />
              <span className="font-serif-royal text-[15px] sm:text-[16px] leading-[1.18] ivory-text-shadow group-hover:text-[#F4D58D] transition-colors">
                The Palm Pavilion, Goa
              </span>
            </button>
          </div>

          {/* Live Royal Countdown Timer */}
          <CountdownTimer className="mt-3 mb-1" />

          <FiligreeDivider width="w-40 sm:w-44" className="mt-2.5" />

          <p className="font-serif-royal italic text-[14px] sm:text-[15px] leading-[1.24] ivory-text-shadow mt-2">
            Let&apos;s celebrate our new journey together.
          </p>
        </div>
      </section>
    </ParallaxCard>
  );
};

export const RsvpPanel: React.FC<PanelProps> = ({ onOpenRsvp, couple }) => {
  const groom = couple?.groom ?? WEDDING_CONFIG.groom;
  const bride = couple?.bride ?? WEDDING_CONFIG.bride;
  const initials = couple?.initials ?? WEDDING_CONFIG.initials;
  return (
    <ParallaxCard>
      <section
        id="panel-rsvp"
        className="relative w-full aspect-[9/16] overflow-hidden rounded-2xl bg-[#06122B] select-none border border-[#D9B166]/65 shadow-[0_0_0_1px_rgba(217,177,102,0.25),0_20px_60px_rgba(0,0,0,0.85)] sm:shadow-[0_0_0_1px_rgba(217,177,102,0.35),0_25px_80px_rgba(0,0,0,0.92),0_0_40px_rgba(217,177,102,0.12)]"
        aria-label="Join Us and RSVP by 15 November 2027"
      >
        {/* Layer 1: Waterfront Palace & Starry Night Sky */}
        <img
          src="/assets/9.png"
          alt="Starry night sky over illuminated lake palace"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        />

        {/* Layer 2: White Blossoms & Golden Foliage Corners with gentle breeze */}
        <img
          src="/assets/10.png"
          alt="Golden leaves and white blossoms floral frame"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none animate-floral-breeze"
        />

        {/* Ambient warm glow halo for left hanging lantern */}
        <div
          className="absolute top-[34%] left-[6.5%] w-12 h-16 rounded-full pointer-events-none animate-lamp-halo"
          style={{
            background:
              'radial-gradient(circle, rgba(255, 205, 95, 0.5) 0%, rgba(245, 175, 50, 0.18) 55%, transparent 75%)',
          }}
        />

        {/* Layer 3: Hanging Gold Lantern Top-Left with Gentle Sway */}
        <img
          src="/assets/12.png"
          alt=""
          aria-hidden="true"
          style={{ transformOrigin: '8.7% 0%' }}
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none animate-lamp-sway-left"
        />

        {/* Ambient warm glow halo for right hanging lantern */}
        <div
          className="absolute top-[20%] right-[5.5%] w-12 h-16 rounded-full pointer-events-none animate-lamp-halo"
          style={{
            background:
              'radial-gradient(circle, rgba(255, 205, 95, 0.5) 0%, rgba(245, 175, 50, 0.18) 55%, transparent 75%)',
            animationDelay: '2.1s',
          }}
        />

        {/* Layer 4: Hanging Gold Lantern Top-Right with Gentle Sway */}
        <img
          src="/assets/8.png"
          alt=""
          aria-hidden="true"
          style={{ transformOrigin: '92.6% 0%' }}
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none animate-lamp-sway-right"
        />

        {/* Ambient warm marble terrace pool of light for standing floor lantern */}
        <div
          className="absolute bottom-[13%] right-[7%] w-24 h-16 rounded-full pointer-events-none animate-lamp-halo"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(255, 205, 90, 0.48) 0%, rgba(255, 175, 50, 0.16) 55%, transparent 75%)',
            animationDelay: '1.2s',
          }}
        />

        {/* Layer 5: Standing Filigree Floor Lantern Bottom-Right */}
        <img
          src="/assets/11.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        />

        {/* Realistic candle flame core inside standing floor lantern */}
        <div
          className="absolute bottom-[18.2%] right-[12.7%] -translate-x-1/2 -translate-y-1/2 w-3 h-4 rounded-full pointer-events-none animate-candle-flame"
          style={{
            background:
              'radial-gradient(ellipse at 50% 60%, #FFFFFF 0%, #FFF2A8 28%, #F59E0B 72%, transparent 100%)',
            boxShadow: '0 0 10px rgba(255, 225, 110, 0.9), 0 0 18px rgba(245, 160, 40, 0.6)',
          }}
        />

        {/* Subtle navy glow for upper arch text legibility */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 56% 42% at 50% 35%, rgba(5, 14, 36, 0.52) 0%, rgba(5, 14, 36, 0.18) 65%, transparent 100%)',
          }}
        />

        <TwinklingStars />

        {/* Unified Luxury Gold Card Border */}
        <RoyalCardBorder />

        {/* Upper & Center Arch Content */}
        <div className="relative z-10 flex flex-col items-center text-center pt-[15%] px-[16%]">
          <p className="font-serif-royal italic text-[16px] sm:text-[17.5px] leading-[1.3] ivory-text-shadow">
            Your presence
            <br />
            will make our celebration
            <br />
            more special.
          </p>

          <StarburstDivider className="mt-2.5 mb-2" />

          <h2 className="font-script text-[50px] sm:text-[58px] leading-[0.95] gold-text py-0.5">
            Join Us
          </h2>

          <p className="font-serif-royal italic text-[15px] sm:text-[16px] ivory-text-shadow mt-0.5">
            With Love,
          </p>

          {/* SINGLE LINE COUPLE NAME WITH 24K GOLD GLEAM */}
          <p className="font-script text-[35px] min-[360px]:text-[38px] sm:text-[42px] leading-[1.08] gold-gleam-text mt-0.5 whitespace-nowrap">
            {groom} &amp; {bride}
          </p>

          {/* Interactive Royal Crest Logo with Dynamic Initials and Tap to RSVP action */}
          <div className="mt-1 flex flex-col items-center">
            <RoyalLogo
              className="w-16 h-16 sm:w-20 sm:h-20 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
              initials={initials}
              groom={groom}
              bride={bride}
              onClick={() => onOpenRsvp?.()}
            />
            <button
              type="button"
              onClick={() => onOpenRsvp?.()}
              className="font-cinzel text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-semibold text-[#FFF5DC] drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] mt-1 px-3 py-0.5 rounded-full bg-[#040C20]/85 border border-[#D9B166]/65 shadow-md hover:border-[#F4D58D] hover:bg-[#061433] transition-all cursor-pointer"
            >
              ✨ Tap Crest to RSVP ✨
            </button>
          </div>
        </div>

        {/* Bottom Scalloped RSVP Cartouche Button */}
        <div className="absolute bottom-[5.5%] inset-x-0 z-20 flex justify-center px-4">
          <RsvpCartouche onClick={() => onOpenRsvp?.()} />
        </div>
      </section>
    </ParallaxCard>
  );
};
