import { useEffect, useRef, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { InteractiveSparkleCanvas } from './components/InteractiveSparkleCanvas';
import { CoverPanel, DetailsPanel, RsvpPanel } from './components/InvitationPanels';
import { RoyalEntryPage } from './components/RoyalEntryPage';
import { RoyalMusicPlayer } from './components/RoyalMusicPlayer';
import { ItineraryModal, RsvpModal, RsvpSubmission, VenueModal } from './components/RoyalModals';

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
      'PRODID:-//Kabir & Tara//Engagement Ceremony//EN',
      'BEGIN:VEVENT',
      'UID:kabir-tara-engagement-2027@royalpalacenight',
      'DTSTAMP:20260101T000000Z',
      'DTSTART;TZID=Asia/Kolkata:20271120T190000',
      'DTEND;TZID=Asia/Kolkata:20271120T233000',
      'SUMMARY:Kabir & Tara — Engagement Ceremony',
      'LOCATION:The Palm Pavilion, Goa, India',
      "DESCRIPTION:We cordially invite you to the Engagement Ceremony of Kabir & Tara. Let's celebrate our new journey together.",
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsLines], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Kabir-Tara-Engagement.ics';
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

      {/* Main Mobile-First Container (Primary View on Both Mobile & Desktop) */}
      <main className="relative z-10 w-full max-w-[430px] mx-auto flex flex-col gap-3 sm:py-5 pb-8 sm:pb-12">
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
