import React, { useRef, useState } from 'react';

interface ParallaxCardProps {
  children: React.ReactNode;
  className?: string;
}

export const ParallaxCard: React.FC<ParallaxCardProps> = ({ children, className = '' }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [transform, setTransform] = useState<string>('');
  const [sheen, setSheen] = useState<{ x: number; y: number; opacity: number }>({
    x: 50,
    y: 50,
    opacity: 0,
  });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Gentle, luxurious tilt angle (max 3.2 degrees)
    const rotateX = ((y - centerY) / centerY) * -3.2;
    const rotateY = ((x - centerX) / centerX) * 3.2;

    setTransform(
      `perspective(1100px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`
    );

    setSheen({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.18,
    });
  };

  const handlePointerLeave = () => {
    setTransform('perspective(1100px) rotateX(0deg) rotateY(0deg)');
    setSheen((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`transition-transform duration-300 ease-out will-change-transform relative ${className}`}
      style={{ transform }}
    >
      {children}

      {/* Dynamic Specular Gold Foil Reflection Sheen */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 z-20 mix-blend-color-dodge"
        style={{
          opacity: sheen.opacity,
          background: `radial-gradient(circle 240px at ${sheen.x}% ${sheen.y}%, rgba(255, 235, 170, 0.45) 0%, rgba(217, 177, 102, 0.15) 45%, transparent 75%)`,
        }}
        aria-hidden="true"
      />
    </div>
  );
};
