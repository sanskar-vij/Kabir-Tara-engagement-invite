import React, { useEffect, useRef, useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotSpeed: number;
  oscillation: number;
  oscSpeed: number;
  color: string;
  type: 'rose' | 'petal-pink' | 'gold-sparkle';
  opacity: number;
}

const STORAGE_KEY = 'kabir_tara_blessings_count_2027';
const BASE_BLESSINGS = 1420;

export const FlowerShower: React.FC<{
  triggerShower: boolean;
  onShowerEnd?: () => void;
}> = ({ triggerShower, onShowerEnd }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const petalsRef = useRef<Petal[]>([]);
  const animRef = useRef<number | null>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!triggerShower) return;

    setIsActive(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    // Spawn 55 petals and gold specks
    const colors = [
      '#C0262D', // Deep Royal Crimson Rose
      '#991B1B', // Velvet Maroon Rose
      '#E11D48', // Vibrant Rose Pink
      '#F472B6', // Soft Blush Petal
      '#F4D58D', // 24K Gold Foil Sparkle
      '#FBBF24', // Amber Gold Sparkle
    ];

    const newPetals: Petal[] = [];
    for (let i = 0; i < 55; i++) {
      const isGold = Math.random() < 0.22;
      const isBlush = Math.random() < 0.35;
      newPetals.push({
        x: Math.random() * width,
        y: -30 - Math.random() * (height * 0.4),
        size: isGold ? 4 + Math.random() * 5 : 12 + Math.random() * 16,
        speedY: 1.8 + Math.random() * 2.6,
        speedX: -1 + Math.random() * 2,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.05,
        oscillation: Math.random() * Math.PI * 2,
        oscSpeed: 0.02 + Math.random() * 0.03,
        color: isGold
          ? '#F4D58D'
          : isBlush
          ? '#F472B6'
          : colors[Math.floor(Math.random() * 3)],
        type: isGold ? 'gold-sparkle' : isBlush ? 'petal-pink' : 'rose',
        opacity: 0.95,
      });
    }

    petalsRef.current = newPetals;
    const startTime = performance.now();
    const duration = 4000; // 4 seconds of celebratory shower

    const render = (now: number) => {
      const elapsed = now - startTime;
      ctx.clearRect(0, 0, width, height);

      let aliveCount = 0;

      for (const p of petalsRef.current) {
        p.oscillation += p.oscSpeed;
        p.y += p.speedY;
        p.x += Math.sin(p.oscillation) * 1.5 + p.speedX;
        p.rotation += p.rotSpeed;

        if (p.y < height + 40) {
          aliveCount++;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;

        if (p.type === 'gold-sparkle') {
          // 4-pointed golden sparkle
          ctx.fillStyle = p.color;
          ctx.beginPath();
          const s = p.size;
          ctx.moveTo(0, -s);
          ctx.quadraticCurveTo(0, 0, s, 0);
          ctx.quadraticCurveTo(0, 0, 0, s);
          ctx.quadraticCurveTo(0, 0, -s, 0);
          ctx.quadraticCurveTo(0, 0, 0, -s);
          ctx.fill();
        } else {
          // Curving Organic Rose Petal Shape
          ctx.fillStyle = p.color;
          ctx.beginPath();
          const w = p.size * 0.85;
          const h = p.size * 1.25;
          ctx.moveTo(0, -h / 2);
          ctx.bezierCurveTo(w, -h / 3, w, h / 2, 0, h / 2);
          ctx.bezierCurveTo(-w, h / 2, -w, -h / 3, 0, -h / 2);
          ctx.fill();

          // Subtle petal vein highlight
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(0, -h / 2.5);
          ctx.lineTo(0, h / 2.5);
          ctx.stroke();
        }

        ctx.restore();
      }

      if (elapsed < duration && aliveCount > 0) {
        animRef.current = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, width, height);
        setIsActive(false);
        if (onShowerEnd) onShowerEnd();
      }
    };

    animRef.current = requestAnimationFrame(render);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [triggerShower, onShowerEnd]);

  if (!isActive && !triggerShower) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-50 pointer-events-none w-full h-full"
    />
  );
};

export const BlessingButton: React.FC<{
  onBless: () => void;
  className?: string;
}> = ({ onBless, className = '' }) => {
  const [count, setCount] = useState<number>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? parseInt(stored, 10) : BASE_BLESSINGS;
    } catch {
      return BASE_BLESSINGS;
    }
  });

  const [floatText, setFloatText] = useState<{ id: number; text: string }[]>([]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newCount = count + 1;
    setCount(newCount);
    try {
      localStorage.setItem(STORAGE_KEY, newCount.toString());
    } catch {
      // storage quota
    }

    if (navigator.vibrate) {
      navigator.vibrate(40);
    }

    const newId = Date.now();
    setFloatText((prev) => [...prev, { id: newId, text: '+1 🌸' }]);
    window.setTimeout(() => {
      setFloatText((prev) => prev.filter((item) => item.id !== newId));
    }, 1200);

    onBless();
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Floating "+1 🌸" indicators */}
      {floatText.map((item) => (
        <span
          key={item.id}
          className="absolute -top-6 pointer-events-none font-serif-royal font-bold text-sm text-[#FFDF80] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] animate-bounce"
        >
          {item.text}
        </span>
      ))}

      <button
        type="button"
        onClick={handleClick}
        className="group relative flex items-center justify-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-gradient-to-r from-[#8E1C24]/85 via-[#B92B34]/90 to-[#8E1C24]/85 hover:from-[#A3222B] hover:to-[#A3222B] border border-[#F4D58D]/70 text-[#FFF2D0] font-cinzel text-[11px] sm:text-[12px] tracking-[0.12em] uppercase font-semibold shadow-[0_4px_16px_rgba(185,43,52,0.45),0_0_12px_rgba(244,213,141,0.25)] hover:shadow-[0_6px_22px_rgba(244,213,141,0.4)] active:scale-95 transition-all cursor-pointer"
        title="Tap to shower flower blessings on Kabir & Tara"
      >
        <Heart className="w-3.5 h-3.5 text-[#FAD2E1] fill-[#E11D48] group-hover:scale-125 transition-transform" />
        <span>Shower Blessings</span>
        <span className="px-1.5 py-0.5 rounded-full bg-[#05112B]/60 border border-[#F4D58D]/40 text-[#FCE788] text-[10px] font-bold tracking-tight">
          {count.toLocaleString()}
        </span>
        <Sparkles className="w-3.5 h-3.5 text-[#F4D58D] group-hover:rotate-12 transition-transform" />
      </button>
    </div>
  );
};
