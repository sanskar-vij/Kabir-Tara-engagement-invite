import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle2, Clock, MapPin, Sparkles, Users, X } from 'lucide-react';
import { CrownIcon, FiligreeDivider } from './RoyalOrnaments';

export interface RsvpSubmission {
  name: string;
  contact: string;
  attending: 'yes' | 'no';
  guests: number;
  message: string;
  submittedAt: string;
}

interface RsvpModalProps {
  isOpen: boolean;
  onClose: () => void;
  existingRsvp: RsvpSubmission | null;
  onSubmit: (data: RsvpSubmission) => void;
}

export const RsvpModal: React.FC<RsvpModalProps> = ({
  isOpen,
  onClose,
  existingRsvp,
  onSubmit,
}) => {
  const [name, setName] = useState(existingRsvp?.name ?? '');
  const [contact, setContact] = useState(existingRsvp?.contact ?? '');
  const [attending, setAttending] = useState<'yes' | 'no'>(existingRsvp?.attending ?? 'yes');
  const [guests, setGuests] = useState<number>(existingRsvp?.guests ?? 2);
  const [message, setMessage] = useState(existingRsvp?.message ?? '');
  const [justSubmitted, setJustSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setJustSubmitted(false);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit({
      name: name.trim(),
      contact: contact.trim(),
      attending,
      guests: attending === 'yes' ? guests : 0,
      message: message.trim(),
      submittedAt: new Date().toISOString(),
    });
    setJustSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#020816]/85 backdrop-blur-md cursor-pointer select-none"
      role="dialog"
      aria-modal="true"
      aria-labelledby="rsvp-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[390px] bg-gradient-to-b from-[#0A193B] to-[#061027] border border-[#D9B166]/80 shadow-[0_24px_80px_rgba(0,0,0,0.9)] p-6 text-[#FBF6EA] cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Inner hairline frame */}
        <div className="absolute inset-[5px] border border-[#D9B166]/35 pointer-events-none" />

        {/* Big, accessible Close X Button with generous touch hit target */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-2.5 right-2.5 z-30 w-11 h-11 flex items-center justify-center rounded-full text-[#E8C87E] hover:text-[#FFF] hover:bg-[#D9B166]/20 active:scale-90 transition-all cursor-pointer"
          aria-label="Close RSVP dialog"
          title="Close dialog"
        >
          <X className="w-6 h-6 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]" />
        </button>

        {justSubmitted ? (
          <div className="relative z-10 py-6 text-center flex flex-col items-center">
            <CrownIcon className="w-9 h-7 mb-2" />
            <CheckCircle2 className="w-11 h-11 text-[#F2CF84] mb-3" />
            <h3 id="rsvp-modal-title" className="font-script text-[42px] leading-none gold-text">
              Thank You
            </h3>
            <p className="font-cinzel text-xs tracking-[0.18em] text-[#E9C97E] uppercase mt-2">
              {attending === 'yes' ? 'We Look Forward to Celebrating With You' : 'Your Wishes Mean the World'}
            </p>
            <FiligreeDivider width="w-40" className="my-4" />
            <p className="font-serif-royal text-base text-[#F7EBD0]/90 leading-relaxed max-w-[280px]">
              {attending === 'yes'
                ? `Your RSVP for ${guests} ${guests === 1 ? 'guest' : 'guests'} has been recorded for Kabir & Tara's Engagement Ceremony on 20 November 2027.`
                : 'Thank you for letting us know. We will keep you in our thoughts during our celebration.'}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 px-7 py-2.5 border border-[#D9B166] bg-[#D9B166]/15 hover:bg-[#D9B166]/25 font-cinzel text-xs tracking-[0.2em] text-[#FFF1C4] uppercase transition-colors cursor-pointer"
            >
              Return to Invitation
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-3.5">
            <div className="text-center pt-1">
              <CrownIcon className="w-8 h-6 mx-auto mb-1" />
              <h3 id="rsvp-modal-title" className="font-cinzel text-lg tracking-[0.18em] gold-text font-semibold">
                ROYAL RSVP
              </h3>
              <p className="font-serif-royal italic text-sm text-[#EADBB8]">
                Kindly respond by 15 November 2027
              </p>
              <FiligreeDivider width="w-40" className="mt-2" />
            </div>

            <div>
              <label className="block font-cinzel text-[10px] tracking-[0.16em] text-[#E7C67C] uppercase mb-1">
                Guest Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Kabir & Tara Sharma"
                className="w-full px-3 py-2 bg-[#040C20]/80 border border-[#D9B166]/45 focus:border-[#F4D58D] focus:outline-none text-sm font-serif-royal text-[#FFF6E3] placeholder:text-[#98A6C7]/60"
              />
            </div>

            <div>
              <label className="block font-cinzel text-[10px] tracking-[0.16em] text-[#E7C67C] uppercase mb-1">
                Phone or Email
              </label>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="+91 98XXX XXXXX or email"
                className="w-full px-3 py-2 bg-[#040C20]/80 border border-[#D9B166]/45 focus:border-[#F4D58D] focus:outline-none text-sm font-serif-royal text-[#FFF6E3] placeholder:text-[#98A6C7]/60"
              />
            </div>

            <div>
              <label className="block font-cinzel text-[10px] tracking-[0.16em] text-[#E7C67C] uppercase mb-1.5">
                Will You Join Us?
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setAttending('yes')}
                  className={`py-2 px-2 border text-xs font-cinzel tracking-[0.08em] transition-all cursor-pointer ${
                    attending === 'yes'
                      ? 'border-[#F4D58D] bg-[#D9B166]/25 text-[#FFF2CA]'
                      : 'border-[#D9B166]/35 bg-[#040C20]/50 text-[#C9D2E6]'
                  }`}
                >
                  Joyfully Accepts
                </button>
                <button
                  type="button"
                  onClick={() => setAttending('no')}
                  className={`py-2 px-2 border text-xs font-cinzel tracking-[0.08em] transition-all cursor-pointer ${
                    attending === 'no'
                      ? 'border-[#F4D58D] bg-[#D9B166]/25 text-[#FFF2CA]'
                      : 'border-[#D9B166]/35 bg-[#040C20]/50 text-[#C9D2E6]'
                  }`}
                >
                  Regretfully Declines
                </button>
              </div>
            </div>

            {attending === 'yes' && (
              <div>
                <label className="flex items-center gap-1.5 font-cinzel text-[10px] tracking-[0.16em] text-[#E7C67C] uppercase mb-1">
                  <Users className="w-3.5 h-3.5" /> Number of Guests
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setGuests(num)}
                      className={`flex-1 py-1.5 border font-cinzel text-xs transition-all cursor-pointer ${
                        guests === num
                          ? 'border-[#F4D58D] bg-[#D9B166]/30 text-[#FFF2CA]'
                          : 'border-[#D9B166]/35 bg-[#040C20]/50 text-[#C9D2E6]'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="block font-cinzel text-[10px] tracking-[0.16em] text-[#E7C67C] uppercase mb-1">
                Blessings &amp; Note for the Couple
              </label>
              <textarea
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your warm wishes for Kabir & Tara..."
                className="w-full px-3 py-2 bg-[#040C20]/80 border border-[#D9B166]/45 focus:border-[#F4D58D] focus:outline-none text-sm font-serif-royal text-[#FFF6E3] placeholder:text-[#98A6C7]/60 resize-none"
              />
            </div>

            <div className="flex gap-2.5 mt-1">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 px-4 border border-[#D9B166]/45 bg-[#040C20]/70 text-[#C9D2E6] hover:text-[#FFF] font-cinzel text-xs tracking-[0.15em] uppercase transition-all cursor-pointer"
              >
                Close
              </button>
              <button
                type="submit"
                className="flex-[2] py-2.5 px-6 bg-gradient-to-r from-[#C6933E] via-[#F1CD7B] to-[#C6933E] text-[#071128] font-cinzel font-semibold text-xs tracking-[0.2em] uppercase shadow-[0_4px_18px_rgba(241,205,123,0.3)] hover:brightness-105 active:scale-[0.99] transition-all cursor-pointer"
              >
                Confirm RSVP
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

interface VenueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownloadCalendar: () => void;
}

export const VenueModal: React.FC<VenueModalProps> = ({
  isOpen,
  onClose,
  onDownloadCalendar,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=The+Palm+Pavilion+Goa';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#020816]/85 backdrop-blur-md cursor-pointer select-none"
      role="dialog"
      aria-modal="true"
      aria-labelledby="venue-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[380px] bg-gradient-to-b from-[#0A193B] to-[#061027] border border-[#D9B166]/80 shadow-[0_24px_80px_rgba(0,0,0,0.9)] p-6 text-center text-[#FBF6EA] cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-[5px] border border-[#D9B166]/35 pointer-events-none" />

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-2.5 right-2.5 z-30 w-11 h-11 flex items-center justify-center rounded-full text-[#E8C87E] hover:text-[#FFF] hover:bg-[#D9B166]/20 active:scale-90 transition-all cursor-pointer"
          aria-label="Close venue modal"
          title="Close dialog"
        >
          <X className="w-6 h-6 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]" />
        </button>

        <div className="relative z-10 flex flex-col items-center">
          <MapPin className="w-7 h-7 text-[#F2CF84] mb-2" />
          <h3 id="venue-modal-title" className="font-cinzel text-lg tracking-[0.16em] gold-text font-semibold">
            THE PALM PAVILION
          </h3>
          <p className="font-serif-royal italic text-base text-[#EADBB8] mt-0.5">Goa, India</p>
          <FiligreeDivider width="w-40" className="my-3.5" />

          <p className="font-serif-royal text-sm text-[#F7EBD0]/90 leading-relaxed mb-4">
            An enchanting imperial waterfront pavilion nestled amidst swaying palms and the tranquil twilight shores of Goa.
          </p>

          <div className="w-full flex flex-col gap-2.5">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 bg-gradient-to-r from-[#C6933E] via-[#F1CD7B] to-[#C6933E] text-[#071128] font-cinzel font-semibold text-xs tracking-[0.2em] uppercase shadow-[0_4px_18px_rgba(241,205,123,0.3)] hover:brightness-105 transition-all text-center"
            >
              Open in Google Maps
            </a>
            <button
              type="button"
              onClick={onDownloadCalendar}
              className="w-full py-2 px-4 border border-[#D9B166]/60 bg-[#D9B166]/10 text-[#F4D58D] font-cinzel text-xs tracking-[0.16em] uppercase hover:bg-[#D9B166]/20 transition-all cursor-pointer"
            >
              Add to Calendar (.ics)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ItineraryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ItineraryModal: React.FC<ItineraryModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const events = [
    {
      time: '7:00 PM',
      title: 'Royal Welcome & Shehnai',
      desc: 'Arrival of esteemed guests with traditional welcome drinks and live classical melodies.',
    },
    {
      time: '8:00 PM',
      title: 'Engagement Ring Ceremony',
      desc: 'The auspicious ring exchange and varmala ritual of Kabir & Tara.',
    },
    {
      time: '9:00 PM',
      title: 'Imperial Dinner Banquet',
      desc: 'An opulent royal feast featuring coastal and festive delicacies.',
    },
    {
      time: '10:30 PM',
      title: 'Music, Sangeet & Celebration',
      desc: 'Celebratory dance and musical performances under the starlit sky.',
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#020816]/85 backdrop-blur-md cursor-pointer select-none"
      role="dialog"
      aria-modal="true"
      aria-labelledby="itinerary-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[390px] bg-gradient-to-b from-[#0A193B] to-[#061027] border border-[#D9B166]/80 shadow-[0_24px_80px_rgba(0,0,0,0.9)] p-6 text-center text-[#FBF6EA] cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-[5px] border border-[#D9B166]/35 pointer-events-none" />

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-2.5 right-2.5 z-30 w-11 h-11 flex items-center justify-center rounded-full text-[#E8C87E] hover:text-[#FFF] hover:bg-[#D9B166]/20 active:scale-90 transition-all cursor-pointer"
          aria-label="Close itinerary modal"
          title="Close dialog"
        >
          <X className="w-6 h-6 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]" />
        </button>

        <div className="relative z-10 flex flex-col items-center">
          <Clock className="w-7 h-7 text-[#F2CF84] mb-1.5" />
          <h3 id="itinerary-modal-title" className="font-cinzel text-lg tracking-[0.16em] gold-text font-semibold">
            EVENT ITINERARY
          </h3>
          <p className="font-serif-royal italic text-sm text-[#EADBB8] mt-0.5">Saturday, 20 November 2027</p>
          <FiligreeDivider width="w-40" className="my-3" />

          <div className="w-full space-y-3.5 text-left my-2">
            {events.map((evt, idx) => (
              <div key={idx} className="flex gap-3 items-start border-b border-[#D9B166]/20 pb-2.5 last:border-b-0">
                <div className="px-2 py-1 rounded bg-[#D9B166]/15 border border-[#D9B166]/40 text-[#F4D58D] font-cinzel text-[11px] font-semibold tracking-wider shrink-0 mt-0.5">
                  {evt.time}
                </div>
                <div>
                  <h4 className="font-cinzel text-xs font-semibold text-[#FFF1C4] tracking-wide">
                    {evt.title}
                  </h4>
                  <p className="font-serif-royal text-xs text-[#EADBB8]/85 mt-0.5 leading-relaxed">
                    {evt.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="mt-4 w-full py-2.5 px-6 bg-gradient-to-r from-[#C6933E] via-[#F1CD7B] to-[#C6933E] text-[#071128] font-cinzel font-semibold text-xs tracking-[0.2em] uppercase shadow-[0_4px_18px_rgba(241,205,123,0.3)] hover:brightness-105 transition-all cursor-pointer"
          >
            Close Itinerary
          </button>
        </div>
      </div>
    </div>
  );
};
