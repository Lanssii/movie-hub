export type Format = {
  id: number;
  name: string;
};

export type PreferredVenue = {
  id: number;
  slug: string;
  name: string;
  city: string;
  formats: Format[];
};

export type User = {
  id: number;
  username: string;
  email: string;
  avatar: string | null;
  fullName: string | null;
  mobileNumber: string | null;
  dateOfBirth: string | null;
  age: number | null;
  preferredVenue: PreferredVenue | null;
  profileComplete: boolean;
};

export type HeroMovie = {
  id: number;
  title: string;
  category: string;
  ageRating: string;
  duration: string;
  formats: string[];
  description: string;
  backdropUrl: string;
};
