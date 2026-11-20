import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface RoyalMusicPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export const RoyalMusicPlayer: React.FC<RoyalMusicPlayerProps> = ({ isPlaying, onToggle }) => {
  return (
    <div className="fixed top-3.5 right-3.5 sm:top-5 sm:right-6 z-40 select-none">
      {/* Animated Golden Soundwave Ripples when playing Mast Magan */}
      {isPlaying && (
        <>
          <span className="absolute inset-0 rounded-full border border-[#F4D58D]/45 animate-sound-ring pointer-events-none" />
          <span
            className="absolute inset-0 rounded-full border border-[#F4D58D]/30 animate-sound-ring pointer-events-none"
            style={{ animationDelay: '0.9s' }}
          />

          {/* Floating musical notes */}
          <span className="absolute -top-1 -left-2 pointer-events-none font-serif text-[11px] text-[#FDE68A] animate-note-1">
            ♪
          </span>
          <span className="absolute -top-2 left-2 pointer-events-none font-serif text-[13px] text-[#FDE68A] animate-note-2">
            ♫
          </span>
        </>
      )}

      <button
        type="button"
        onClick={onToggle}
        className={`group relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#06122B]/85 border border-[#D9B166]/75 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.7)] cursor-pointer transition-all duration-300 hover:scale-105 hover:border-[#F4D58D] ${
          isPlaying
            ? 'shadow-[0_0_15px_rgba(241,205,123,0.35)]'
            : 'opacity-80 hover:opacity-100'
        }`}
        title={isPlaying ? 'Mute Background Music (Mast Magan)' : 'Play Background Music (Mast Magan)'}
        aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
      >
        {/* Subtle spinning gold ring while playing */}
        {isPlaying && (
          <span className="absolute inset-0 rounded-full border-t border-[#F4D58D]/70 animate-spin pointer-events-none" />
        )}

        {/* Volume icon */}
        {isPlaying ? (
          <div className="flex items-center justify-center text-[#F4D58D]">
            <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform animate-pulse" />
          </div>
        ) : (
          <div className="flex items-center justify-center text-[#E7D3A3]/75">
            <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
          </div>
        )}
      </button>
    </div>
  );
};
