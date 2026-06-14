export type RsvpEntry = {
  id: string;
  submittedAt: string;
  side: string;
  name: string;
  attendance: string;
  guestCount: string;
};

export type RsvpPayload = {
  side: string;
  name: string;
  attendance: string;
  guestCount?: string;
};

export type RsvpStore = {
  entries: RsvpEntry[];
};
