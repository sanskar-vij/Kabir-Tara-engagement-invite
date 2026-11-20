import React, { useEffect, useRef } from 'react';

interface SparkleParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  rotation: number;
  rotSpeed: number;
  type: 'sparkle' | 'ember';
  color: string;
}

export const InteractiveSparkleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<SparkleParticle[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const lastAmbientRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Pure 24K Gold Stardust & Ember Sparkles — NO FLOWERS
    const GOLD_COLORS = ['#FFF5D6', '#FDE68A', '#F4D58D', '#E5BE70', '#D9A74A'];

    const spawnSparkleBurst = (x: number, y: number, count = 10) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.0 + Math.random() * 3.0;
        const isEmber = Math.random() < 0.35;

        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.6,
          size: isEmber ? 2.5 + Math.random() * 4.5 : 3.5 + Math.random() * 5,
          alpha: 1,
          decay: 0.022 + Math.random() * 0.02,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.1,
          type: isEmber ? 'ember' : 'sparkle',
          color: GOLD_COLORS[Math.floor(Math.random() * GOLD_COLORS.length)],
        });
      }
    };

    // Ambient floating golden stardust
    const spawnAmbientStardust = () => {
      if (particlesRef.current.length > 35) return;
      particlesRef.current.push({
        x: Math.random() * width,
        y: -10,
        vx: -0.5 + Math.random() * 1.0,
        vy: 0.7 + Math.random() * 1.2,
        size: 2.5 + Math.random() * 4.5,
        alpha: 0.8,
        decay: 0.0035,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.04,
        type: 'sparkle',
        color: GOLD_COLORS[Math.floor(Math.random() * GOLD_COLORS.length)],
      });
    };

    let lastMoveTime = 0;
    const handlePointerMove = (e: PointerEvent) => {
      const now = performance.now();
      if (now - lastMoveTime < 50) return;
      lastMoveTime = now;
      spawnSparkleBurst(e.clientX, e.clientY, 3);
    };

    const handlePointerDown = (e: PointerEvent) => {
      spawnSparkleBurst(e.clientX, e.clientY, 12);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });

    const render = (now: number) => {
      ctx.clearRect(0, 0, width, height);

      if (now - lastAmbientRef.current > 850) {
        lastAmbientRef.current = now;
        spawnAmbientStardust();
      }

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;
        p.alpha -= p.decay;

        p.vy += 0.035; // gentle gravity
        p.vx *= 0.985;

        if (p.alpha <= 0 || p.y > height + 20) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = Math.max(0, p.alpha);

        if (p.type === 'sparkle') {
          // Radiant 4-pointed diamond star
          ctx.fillStyle = p.color;
          ctx.shadowColor = '#F4D58D';
          ctx.shadowBlur = 6;
          ctx.beginPath();
          const s = p.size;
          ctx.moveTo(0, -s);
          ctx.quadraticCurveTo(0, 0, s, 0);
          ctx.quadraticCurveTo(0, 0, 0, s);
          ctx.quadraticCurveTo(0, 0, -s, 0);
          ctx.quadraticCurveTo(0, 0, 0, -s);
          ctx.fill();
        } else {
          // Soft glowing golden ember orb
          const radGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
          radGrad.addColorStop(0, '#FFFBEB');
          radGrad.addColorStop(0.5, p.color);
          radGrad.addColorStop(1, 'rgba(217, 177, 102, 0)');
          ctx.fillStyle = radGrad;
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30 w-full h-full"
      aria-hidden="true"
    />
  );
};
