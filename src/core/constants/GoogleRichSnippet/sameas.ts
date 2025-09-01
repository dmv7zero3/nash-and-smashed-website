import {
  INSTAGRAM_URL,
  FACEBOOK_URL,
  TIKTOK_URL,
  APPLE_APP_STORE_URL,
  GOOGLE_PLAY_STORE_URL,
  ORDER_ONLINE_URL,
} from "@/core/constants/business";
import { MEDIA_LINKS } from "@/core/constants/mediaLinks";
import { BACKLINKS } from "@/core/constants/GoogleRichSnippet/backlinks";

// Social and app store links
const SOCIAL_LINKS = [
  INSTAGRAM_URL,
  FACEBOOK_URL,
  TIKTOK_URL,
  APPLE_APP_STORE_URL,
  GOOGLE_PLAY_STORE_URL,
  ORDER_ONLINE_URL,
];

// Media links (just the URLs)
const MEDIA_URLS = MEDIA_LINKS.map((link) => link.url);

// Export a single array for sameAs, including supplemental backlinks
export const SAME_AS: string[] = [...SOCIAL_LINKS, ...MEDIA_URLS, ...BACKLINKS];
