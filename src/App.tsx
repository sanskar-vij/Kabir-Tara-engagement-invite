import { useEffect, useRef, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { InteractiveSparkleCanvas } from './components/InteractiveSparkleCanvas';
import { CoverPanel, DetailsPanel, RsvpPanel } from './components/InvitationPanels';
import { RoyalEntryPage } from './components/RoyalEntryPage';
import { RoyalMusicPlayer } from './components/RoyalMusicPlayer';
import { ItineraryModal, RsvpModal, RsvpSubmission, VenueModal } from './components/RoyalModals';
import { WEDDING_CONFIG } from './config/weddingConfig';

const RSVP_STORAGE_KEY = 'kabir_tara_rsvp_2027';

export function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [venueOpen, setVenueOpen] = useState(false);
  const [itineraryOpen, setItineraryOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [savedRsvp, setSavedRsvp] = useState<RsvpSubmission | null>(() => {
    try {
      const raw = localStorage.getItem(RSVP_STORAGE_KEY);
      return raw ? (JSON.parse(raw) as RsvpSubmission) : null;
    } catch {
      return null;
    }
  });

  const [activeSection, setActiveSection] = useState<'panel-cover' | 'panel-details' | 'panel-rsvp'>('panel-cover');

  useEffect(() => {
    const handleScroll = () => {
      const panels = ['panel-cover', 'panel-details', 'panel-rsvp'] as const;
      const scrollMid = window.scrollY + window.innerHeight * 0.45;
      for (const id of panels) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          if (scrollMid >= top && scrollMid < bottom) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Desktop keyboard navigation (Up / Down arrows & PageUp / PageDown)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (rsvpOpen || venueOpen || itineraryOpen) return;
      const panels: Array<'panel-cover' | 'panel-details' | 'panel-rsvp'> = [
        'panel-cover',
        'panel-details',
        'panel-rsvp',
      ];
      const idx = panels.indexOf(activeSection);

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        if (idx < panels.length - 1) {
          e.preventDefault();
          scrollToPanel(panels[idx + 1]);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (idx > 0) {
          e.preventDefault();
          scrollToPanel(panels[idx - 1]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection, rsvpOpen, venueOpen, itineraryOpen]);

  useEffect(() => {
    const audio = new Audio('/audio/background.mp3');
    audio.loop = true;
    audio.preload = 'auto';
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const handleStartMusic = () => {
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log('Audio autoplay prevented:', err));
    }
  };

  const handleEntryComplete = () => {
    setHasEntered(true);
  };

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log('Audio play error:', err));
    }
  };

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => {
      setToast((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const scrollToPanel = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleDownloadCalendar = () => {
    const icsLines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      `PRODID:-//${WEDDING_CONFIG.groom} & ${WEDDING_CONFIG.bride}//${WEDDING_CONFIG.eventTitle}//EN`,
      'BEGIN:VEVENT',
      `UID:wedding-${Date.now()}@royalpalacenight`,
      'DTSTAMP:20260101T000000Z',
      'DTSTART;TZID=Asia/Kolkata:20271120T190000',
      'DTEND;TZID=Asia/Kolkata:20271120T233000',
      `SUMMARY:${WEDDING_CONFIG.groom} & ${WEDDING_CONFIG.bride} — ${WEDDING_CONFIG.eventTitle}`,
      `LOCATION:${WEDDING_CONFIG.venueName}, ${WEDDING_CONFIG.venueCity}, India`,
      `DESCRIPTION:We cordially invite you to the ${WEDDING_CONFIG.eventTitle} of ${WEDDING_CONFIG.groom} & ${WEDDING_CONFIG.bride}. Let's celebrate our new journey together.`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsLines], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${WEDDING_CONFIG.groom}-${WEDDING_CONFIG.bride}-${WEDDING_CONFIG.eventTitle.replace(/\s+/g, '-')}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Saved event to calendar (.ics)');
  };

  const handleRsvpSubmit = (data: RsvpSubmission) => {
    setSavedRsvp(data);
    try {
      localStorage.setItem(RSVP_STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Ignore storage quota errors
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#030917] relative flex flex-col items-center">
      {/* Ambient Royal Midnight Glow framing the Main View */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 25%, rgba(28, 56, 114, 0.28) 0%, rgba(7, 17, 40, 0.7) 48%, #020713 100%)',
        }}
        aria-hidden="true"
      />

      {/* Interactive Stardust Sparkle Canvas (Pure Gold, No Flowers) */}
      {hasEntered && <InteractiveSparkleCanvas />}

      {/* Floating Royal Music Player */}
      <RoyalMusicPlayer isPlaying={isPlaying} onToggle={toggleAudio} />

      {/* Unique Royal Entry Experience */}
      {!hasEntered && (
        <RoyalEntryPage
          onStartMusic={handleStartMusic}
          onComplete={handleEntryComplete}
        />
      )}

      {/* Main Container (Responsive Mobile & Desktop Card Sizing) */}
      <main className="relative z-10 w-full max-w-[430px] sm:max-w-[460px] md:max-w-[490px] mx-auto flex flex-col gap-3.5 sm:gap-6 sm:py-6 pb-8 sm:pb-14 transition-all duration-300">
        {/* Panel 1: Royal Palace Night Cover */}
        <CoverPanel onNextSection={() => scrollToPanel('panel-details')} />

        {/* Panel 2: Engagement Ceremony Details */}
        <DetailsPanel
          onAddCalendar={handleDownloadCalendar}
          onOpenVenue={() => setVenueOpen(true)}
          onOpenItinerary={() => setItineraryOpen(true)}
        />

        {/* Panel 3: Join Us & RSVP */}
        <RsvpPanel onOpenRsvp={() => setRsvpOpen(true)} />

        {/* Studio Footer with Regal Themed Background Cartouche */}
        <footer className="relative z-10 pt-5 pb-3 flex justify-center text-center">
          <a
            href="https://patrikastudio.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#061433]/90 via-[#0A1F4D]/90 to-[#061433]/90 border border-[#D9B166]/65 backdrop-blur-md shadow-[0_4px_22px_rgba(0,0,0,0.75),0_0_15px_rgba(217,177,102,0.22)] hover:border-[#F4D58D] hover:shadow-[0_6px_28px_rgba(244,213,141,0.35)] active:scale-95 transition-all cursor-pointer select-none"
            title="Visit Patrika Studio"
          >
            {/* Subtle inner hairline gold accent */}
            <span className="absolute inset-[2px] rounded-full border border-[#D9B166]/25 pointer-events-none" />

            <Sparkles className="w-3.5 h-3.5 text-[#F4D58D] group-hover:rotate-12 transition-transform" />
            <span className="font-cinzel text-[10.5px] sm:text-[11px] tracking-[0.2em] text-[#E7D3A3] uppercase">
              Designed by{' '}
              <span className="font-semibold text-[#FFF1C4] group-hover:text-[#F4D58D] transition-colors underline-offset-4 group-hover:underline">
                Patrika Studio
              </span>
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#F4D58D] group-hover:-rotate-12 transition-transform" />
          </a>
        </footer>
      </main>

      {/* Desktop / Tablet Section Quick-Jump Floating Dock */}
      {hasEntered && (
        <aside
          aria-label="Section navigation"
          className="hidden lg:flex fixed right-6 xl:right-10 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-2.5 p-2 rounded-full bg-[#061433]/85 border border-[#D9B166]/45 backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.85)]"
        >
          {[
            { id: 'panel-cover', label: 'Cover', step: 'I' },
            { id: 'panel-details', label: 'Invitation', step: 'II' },
            { id: 'panel-rsvp', label: 'RSVP', step: 'III' },
          ].map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => scrollToPanel(sec.id)}
                title={`Jump to ${sec.label}`}
                aria-label={`Jump to ${sec.label}`}
                className={`group relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-br from-[#E7C67C] to-[#C89844] text-[#061026] shadow-[0_0_15px_rgba(244,213,141,0.5)] font-bold scale-105'
                    : 'text-[#E5BE70]/70 hover:text-[#FFF5DC] hover:bg-[#D9B166]/15 hover:scale-105'
                }`}
              >
                <span className="font-cinzel text-[11px] tracking-wider">{sec.step}</span>

                {/* Desktop hover tooltip */}
                <span className="absolute right-full mr-3.5 px-3 py-1 rounded-md bg-[#05112B]/95 border border-[#D9B166]/60 text-[#F5E6C4] font-cinzel text-[10px] tracking-[0.14em] uppercase whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
                  {sec.label}
                </span>
              </button>
            );
          })}
        </aside>
      )}

      {/* Desktop Royal Left Watermark & Event Crest Framing */}
      <aside
        aria-hidden="true"
        className="hidden xl:flex fixed left-8 2xl:left-14 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-3 text-center pointer-events-none select-none max-w-[210px] opacity-75"
      >
        <span className="font-cinzel text-[10px] tracking-[0.3em] uppercase text-[#D9B166]/80">
          Royal Ceremony
        </span>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#D9B166]/70 to-transparent" />
        <h2 className="font-script text-[32px] gold-text leading-tight">
          {WEDDING_CONFIG.groom} &amp; {WEDDING_CONFIG.bride}
        </h2>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#D9B166]/70 to-transparent" />
        <span className="font-cinzel text-[9.5px] tracking-[0.2em] uppercase text-[#F2E4C2]/70">
          {WEDDING_CONFIG.eventDateFormatted}
        </span>
        <span className="font-serif-royal text-[12px] italic text-[#E5BE70]/80">
          The Palm Pavilion, Goa
        </span>
      </aside>

      {/* Subtle Toast Notification */}
      {toast && (
        <div
          role="status"
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-[#071534]/95 border border-[#D9B166]/75 text-[#FFF1C4] font-serif-royal text-sm shadow-[0_8px_30px_rgba(0,0,0,0.8)]"
        >
          {toast}
        </div>
      )}

      {/* Interactive Modals */}
      <RsvpModal
        isOpen={rsvpOpen}
        onClose={() => setRsvpOpen(false)}
        existingRsvp={savedRsvp}
        onSubmit={handleRsvpSubmit}
      />

      <VenueModal
        isOpen={venueOpen}
        onClose={() => setVenueOpen(false)}
        onDownloadCalendar={handleDownloadCalendar}
      />

      <ItineraryModal
        isOpen={itineraryOpen}
        onClose={() => setItineraryOpen(false)}
      />
    </div>
  );
}

export default App;
