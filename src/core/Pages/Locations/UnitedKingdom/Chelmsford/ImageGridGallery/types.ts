export interface GalleryItem {
  id: string;
  type: "image" | "video";
  src: string;
  srcWebp?: string;
  alt: string;
  poster?: string;
  posterWebp?: string;
  aspectRatio?: "vertical" | "square";
}

export interface AnimationTarget {
  current: HTMLElement | null;
}

export interface VideoRefs {
  [key: string]: HTMLVideoElement;
}

export interface EventListenerRefs {
  [key: string]: EventListener;
}

export interface VideoPlayingState {
  [key: string]: boolean;
}
