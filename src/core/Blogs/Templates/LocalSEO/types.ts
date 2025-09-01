export interface Blog {
  id?: string | number;
  title: string;
  url: string;
  metaDescription: string;
  introParagraph: string;
  middleParagraph: string;
  conclusionParagraph: string;
  location?: string;
  city?: string;
  state?: string;
  keyword?: string;
  created_at?: string;
  updated_at?: string;
  location_status?: string; // <-- Add this line
}

export interface RelatedPost {
  title: string;
  slug: string;
  imageUrl?: string;
}

export interface DataItem {
  subject: string;
  city: string;
  state: string;
}

export interface GalleryItem {
  id: string;
  type: "image" | "video";
  src: string;
  poster?: string;
  posterWebp?: string;
  alt: string;
}
