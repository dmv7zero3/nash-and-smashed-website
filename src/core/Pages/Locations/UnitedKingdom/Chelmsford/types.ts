// src/core/Pages/Locations/UnitedKingdom/Chelmsford/types.ts
export interface ChelmsfordLocationData {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  status: "active" | "coming-soon";
  fullAddress: string;
  phone: string;
  email: string;
  googleMapsUrl?: string;
  socialMedia: {
    facebook: string;
    instagram: string;
    tiktok: string;
  };
  heroImage: string;
  posterImage: string;
  promoVideo: string;
}

export interface ContentSection {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  ctaText?: string;
  ctaLink?: string;
  image?: string;
}
