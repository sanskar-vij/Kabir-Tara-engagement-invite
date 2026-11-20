export interface WeddingConfig {
  groom: string;
  bride: string;
  initials: string;
  eventTitle: string;
  dateText: string;
  timeText: string;
  venueName: string;
  venueCity: string;
  isoDate: string;
}

export const WEDDING_CONFIG: WeddingConfig = {
  groom: 'Kabir',
  bride: 'Tara',
  initials: 'K & T',
  eventTitle: 'Engagement Ceremony',
  dateText: '20 NOVEMBER 2027',
  timeText: '7:00 PM Onwards',
  venueName: 'The Palm Pavilion',
  venueCity: 'Goa',
  isoDate: '2027-11-20T19:00:00+05:30',
};
