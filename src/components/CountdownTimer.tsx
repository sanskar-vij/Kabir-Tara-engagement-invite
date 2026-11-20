import React, { useEffect, useState } from 'react';

// Ceremony date: Saturday, 20 November 2027 at 7:00 PM IST
const EVENT_DATE = new Date('2027-11-20T19:00:00+05:30').getTime();

export const CountdownTimer: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const update = () => {
      const now = Date.now();
      const diff = Math.max(0, EVENT_DATE - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const items = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: String(timeLeft.hours).padStart(2, '0') },
    { label: 'MINS', value: String(timeLeft.minutes).padStart(2, '0') },
    { label: 'SECS', value: String(timeLeft.seconds).padStart(2, '0') },
  ];

  return (
    <div className={`flex flex-col items-center w-full max-w-[270px] select-none ${className}`}>
      <span className="font-cinzel text-[9.5px] sm:text-[10px] tracking-[0.24em] text-[#EADBB8]/85 uppercase mb-1.5 font-medium">
        Countdown to Celebration
      </span>

      <div className="grid grid-cols-4 gap-1.5 w-full">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center py-1 px-1 rounded-md bg-gradient-to-b from-[#081738]/90 to-[#040C20]/90 border border-[#D9B166]/50 shadow-[0_2px_8px_rgba(0,0,0,0.6)] backdrop-blur-xs"
          >
            <span className="font-serif-royal text-[16px] sm:text-[18px] leading-tight font-bold gold-text">
              {item.value}
            </span>
            <span className="font-cinzel text-[7.5px] sm:text-[8px] tracking-[0.16em] text-[#E0CFAB]/80 uppercase mt-0.5">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
