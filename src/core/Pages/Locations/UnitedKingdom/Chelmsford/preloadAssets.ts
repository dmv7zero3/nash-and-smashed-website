import { useEffect } from "react";
import { locationData, contentSections } from "./data";

/**
 * Preloads critical assets for the Chelmsford location page
 * This helps improve page performance by loading key images and videos before they're needed
 */
export const usePreloadAssets = (): void => {
  useEffect(() => {
    // Create an array of all assets that should be preloaded
    const assetsToPreload = [
      // Banner image for hero section
      "/images/banner/nash-and-smashed-banner-5.jpg",

      // Content section images
      ...contentSections
        .filter((section) => section.image)
        .map((section) => section.image as string),

      // Location data images
      locationData.heroImage,
      locationData.posterImage,
    ];

    // Preload images
    assetsToPreload.forEach((asset) => {
      if (
        asset.endsWith(".jpg") ||
        asset.endsWith(".png") ||
        asset.endsWith(".webp")
      ) {
        const img = new Image();
        img.src = asset;
      }
    });

    // Preload video with low priority
    if (locationData.promoVideo) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "video";
      link.href = locationData.promoVideo;
      link.setAttribute("fetchpriority", "low");
      document.head.appendChild(link);

      return () => {
        document.head.removeChild(link);
      };
    }
  }, []);
};
