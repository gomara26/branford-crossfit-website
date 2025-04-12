// Member Spotlights
export interface MemberSpotlight {
  id: string;
  name: string;
  memberSince: string;
  quote: string;
  recentAchievement: string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Upcoming Events
export interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  cost: string;
  who: string;
  description: string;
  image?: string;
  registrationLink?: string;
  promoCode?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Gallery Images
export interface GalleryImage {
  id: string;
  url: string;
  caption?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Coach Profile
export interface CoachProfile {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  certifications: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

// Program Type
export interface Program {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  image: string;
  price?: string;
  schedule?: string;
  createdAt?: Date;
  updatedAt?: Date;
} 