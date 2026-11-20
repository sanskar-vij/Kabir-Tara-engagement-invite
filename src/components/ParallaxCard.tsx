import React, { useRef } from 'react';

interface ParallaxCardProps {
  children: React.ReactNode;
  className?: string;
}

export const ParallaxCard: React.FC<ParallaxCardProps> = ({ children, className = '' }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const sheenRef = useRef<HTMLDivElement | null>(null);
  const rafId = useRef<number | null>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only apply tilt on mouse/fine pointer, skip touch drag to keep mobile scrolling buttery
    if (e.pointerType === 'touch') return;

    const card = cardRef.current;
    if (!card) return;

    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
    }

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    rafId.current = requestAnimationFrame(() => {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -2.4;
      const rotateY = ((x - centerX) / centerX) * 2.4;

      if (cardRef.current) {
        cardRef.current.style.transform = `perspective(1100px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
      }
      if (sheenRef.current) {
        const sheenX = ((x / rect.width) * 100).toFixed(1);
        const sheenY = ((y / rect.height) * 100).toFixed(1);
        sheenRef.current.style.background = `radial-gradient(circle 240px at ${sheenX}% ${sheenY}%, rgba(255, 235, 170, 0.45) 0%, rgba(217, 177, 102, 0.15) 45%, transparent 75%)`;
        sheenRef.current.style.opacity = '0.35';
      }
    });
  };

  const handlePointerLeave = () => {
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
    }
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg)';
    }
    if (sheenRef.current) {
      sheenRef.current.style.opacity = '0';
    }
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`transition-transform duration-300 ease-out will-change-transform relative ${className}`}
    >
      {children}

      {/* Dynamic Specular Gold Foil Reflection Sheen */}
      <div
        ref={sheenRef}
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 z-20 mix-blend-color-dodge opacity-0"
        aria-hidden="true"
      />
    </div>
  );
};
