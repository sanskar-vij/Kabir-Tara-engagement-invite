import React, { useEffect, useRef, useState } from 'react';
import { Music, Sparkles } from 'lucide-react';

interface RoyalEntryPageProps {
  onStartMusic: () => void;
  onComplete: () => void;
}

export const RoyalEntryPage: React.FC<RoyalEntryPageProps> = ({
  onStartMusic,
  onComplete,
}) => {
  const [stage, setStage] = useState<'idle' | 'opening' | 'done'>('idle');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const handleOpen = () => {
    if (stage !== 'idle') return;

    // 1. Immediately play audio in direct user interaction context
    onStartMusic();

    // 2. Start realistic cloth simulation
    setStage('opening');
    startTimeRef.current = performance.now();
  };

  const handleSkip = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    onStartMusic();
    setStage('done');
    onComplete();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const updateSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    // Ultra-smooth mesh and majestic unhurried timing
    const FOLDS = 24;
    const SEGS = 12;
    const DURATION = 2300;

    const render = (now: number) => {
      ctx.clearRect(0, 0, width, height);

      let progress = 0;
      if (startTimeRef.current !== null) {
        const elapsed = now - startTimeRef.current;
        progress = Math.min(elapsed / DURATION, 1);

        if (progress >= 1 && stage === 'opening') {
          setStage('done');
          onComplete();
          return;
        }
      }

      // Smooth sinusoidal ease-in-out for silky, unhurried fabric movement
      const ease = -(Math.cos(Math.PI * progress) - 1) / 2;

      // Gentle fade out at the very end of gathering into the wings
      const fadeAlpha = progress > 0.88 ? (1 - progress) / 0.12 : 1;
      ctx.globalAlpha = Math.max(0, Math.min(1, fadeAlpha));

      const halfW = width / 2;
      const waveTime = now * 0.0018;

      // Draw curtain helper: isLeft true for left curtain, false for right
      const drawCurtainSide = (isLeft: boolean) => {
        const grid: { x: number; y: number }[][] = [];

        for (let c = 0; c <= FOLDS; c++) {
          const colPoints: { x: number; y: number }[] = [];
          const colRatio = c / FOLDS;

          for (let r = 0; r <= SEGS; r++) {
            const rowRatio = r / SEGS;

            if (isLeft) {
              const initialX = colRatio * (halfW + 4);
              const gatheredX = colRatio * (halfW * 0.08);

              const rowLag = Math.pow(rowRatio, 1.25) * 0.22;
              const effectiveEase = Math.max(0, Math.min(1, ease - rowLag));

              let x = initialX + (gatheredX - initialX) * effectiveEase;

              const drapeSway =
                Math.sin(effectiveEase * Math.PI) * rowRatio * (halfW * 0.14);
              x -= drapeSway;

              if (progress === 0) {
                x += Math.sin(colRatio * 10 + waveTime) * 1.2;
              }

              let y = rowRatio * height;
              const lift =
                Math.sin(effectiveEase * Math.PI * 0.85) * rowRatio * 30;
              y -= lift;

              colPoints.push({ x, y });
            } else {
              const initialX = halfW - 4 + colRatio * (halfW + 4);
              const targetBunchStart = width - halfW * 0.08;
              const gatheredX = targetBunchStart + colRatio * (halfW * 0.08);

              const rowLag = Math.pow(rowRatio, 1.25) * 0.22;
              const effectiveEase = Math.max(0, Math.min(1, ease - rowLag));

              let x = initialX + (gatheredX - initialX) * effectiveEase;

              const drapeSway =
                Math.sin(effectiveEase * Math.PI) * rowRatio * (halfW * 0.14);
              x += drapeSway;

              if (progress === 0) {
                x += Math.sin(colRatio * 10 + waveTime + 1.2) * 1.2;
              }

              let y = rowRatio * height;
              const lift =
                Math.sin(effectiveEase * Math.PI * 0.85) * rowRatio * 30;
              y -= lift;

              colPoints.push({ x, y });
            }
          }
          grid.push(colPoints);
        }

        // Render each vertical pleat flute between col c and col c+1
        for (let c = 0; c < FOLDS; c++) {
          const isHighlight = c % 2 === 0;

          for (let r = 0; r < SEGS; r++) {
            const p0 = grid[c][r];
            const p1 = grid[c + 1][r];
            const p2 = grid[c + 1][r + 1];
            const p3 = grid[c][r + 1];

            ctx.beginPath();
            ctx.moveTo(p0.x, p0.y);
            ctx.lineTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.lineTo(p3.x, p3.y);
            ctx.closePath();

            const foldW = Math.abs(p1.x - p0.x);
            const compression = Math.max(0.18, Math.min(1, foldW / 20));

            // Velvet color grading with dynamic lighting
            if (isHighlight) {
              const grad = ctx.createLinearGradient(p0.x, p0.y, p1.x, p0.y);
              grad.addColorStop(0, '#051436');
              grad.addColorStop(0.45, '#11367d');
              grad.addColorStop(0.75, '#1a4c9e');
              grad.addColorStop(1, '#071b44');
              ctx.fillStyle = grad;
            } else {
              const grad = ctx.createLinearGradient(p0.x, p0.y, p1.x, p0.y);
              const shadowAlpha = 0.95 - compression * 0.15;
              grad.addColorStop(0, `rgba(2, 6, 18, ${shadowAlpha})`);
              grad.addColorStop(0.5, `rgba(3, 10, 30, ${shadowAlpha})`);
              grad.addColorStop(1, `rgba(2, 6, 18, ${shadowAlpha})`);
              ctx.fillStyle = grad;
            }

            ctx.fill();
          }
        }

        // Draw Leading Edge 24K Gold Brocade Ribbon
        const leadCol = isLeft ? FOLDS : 0;
        const leadPoints = grid[leadCol];

        ctx.beginPath();
        ctx.moveTo(leadPoints[0].x, leadPoints[0].y);
        for (let r = 1; r <= SEGS; r++) {
          const prev = leadPoints[r - 1];
          const curr = leadPoints[r];
          const midX = (prev.x + curr.x) / 2;
          const midY = (prev.y + curr.y) / 2;
          ctx.quadraticCurveTo(prev.x, prev.y, midX, midY);
        }
        ctx.lineTo(leadPoints[SEGS].x, leadPoints[SEGS].y);

        ctx.lineWidth = 3.5;
        ctx.strokeStyle = '#F4D58D';
        ctx.shadowColor = 'rgba(244, 213, 141, 0.6)';
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.shadowBlur = 0;
      };

      // Draw Left Curtain
      drawCurtainSide(true);
      // Draw Right Curtain
      drawCurtainSide(false);

      if (stage !== 'done') {
        animFrameRef.current = requestAnimationFrame(render);
      }
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', updateSize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [stage, onComplete]);

  const isCurtainsOpening = stage !== 'idle';

  if (stage === 'done') return null;

  return (
    <div
      onClick={handleOpen}
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden select-none bg-transparent cursor-pointer ${
        isCurtainsOpening ? 'pointer-events-none' : 'pointer-events-auto'
      }`}
      aria-label="Royal Engagement Celebration Entry — Tap to Open"
    >
      {/* Real Cloth Velvet Curtain Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Skip Button in Top Right */}
      <button
        type="button"
        onClick={handleSkip}
        className="fixed top-4 right-4 z-50 px-3.5 py-1.5 rounded-full bg-[#06122B]/85 border border-[#D9B166]/60 text-[#E7D3A3] text-xs font-cinzel tracking-widest hover:text-[#FFF] hover:border-[#D9B166] transition-all cursor-pointer shadow-lg"
      >
        SKIP &rsaquo;
      </button>

      {/* ======================================================== */}
      {/* CENTER TAP TO OPEN BUTTON WITH SMOOTH BREATHING RIPPLE  */}
      {/* ======================================================== */}
      <div
        className={`relative z-30 flex flex-col items-center justify-center transition-all duration-500 ease-out cursor-pointer ${
          isCurtainsOpening
            ? 'opacity-0 scale-110 pointer-events-none'
            : 'opacity-100 scale-100 pointer-events-auto'
        }`}
        onClick={(e) => {
          e.stopPropagation();
          handleOpen();
        }}
      >
        {/* Breathing Outer Golden Light Waves */}
        <span className="absolute -inset-3 rounded-full border border-[#F4D58D]/35 animate-ping pointer-events-none" />
        <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#D9B166]/30 via-[#FFF2CD]/50 to-[#D9B166]/30 blur-md pointer-events-none animate-pulse" />

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleOpen();
          }}
          className="group relative px-9 py-3.5 sm:px-11 sm:py-4 rounded-full bg-gradient-to-r from-[#BF8C34] via-[#F4D58D] to-[#BF8C34] text-[#050F26] font-cinzel text-[13px] sm:text-[14px] tracking-[0.25em] uppercase font-bold shadow-[0_12px_40px_rgba(244,213,141,0.55),0_0_30px_rgba(217,177,102,0.4)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-[#06122C] group-hover:rotate-12 transition-transform" />
          <span>TAP TO OPEN</span>
          <Music className="w-4 h-4 text-[#06122C] group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </div>
  );
};
