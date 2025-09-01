import { useEffect } from "react";
import { categories } from "@/core/Templates/FoodCategories/data";

/**
 * Preloads critical assets for the Homepage
 * This helps improve page performance by loading key images before they're needed
 */
export const usePreloadAssets = (): void => {
  useEffect(() => {
    // Above-the-fold critical assets that must load first
    const criticalAssets = [
      {
        url: "/images/food/chicken-bucket.webp",
        as: "image",
        type: "image/webp",
        fetchPriority: "high",
      },
      // Logo is usually critical
      {
        url: "/images/logos/nash-and-smashed-logo.webp",
        as: "image",
        type: "image/webp",
        fetchPriority: "high",
      },
    ];

    // Create an array of all other assets to be preloaded after critical ones
    const assetsToPreload = [
      // Menu items images from AboutMenuItems (below the fold)
      "/images/food/bucket-of-chicken-tilt-over-from-Nash-And-Smashed.png",
      "/images/food/burger-stack-from-Nash-And-Smashed-2.png",
      "/images/food/chicken-sandwich-from-Nash-And-Smashed-2.png",

      // Banner image (below the fold)
      "/images/banner/nash-and-smashed-banner-2.jpg",

      // Food categories images (below the fold)
      ...categories.flatMap((category) => [
        category.imagePath,
        category.imagePathWebp,
      ]),
    ];

    // Preload critical assets with link rel="preload"
    const preloadLinks: HTMLLinkElement[] = [];

    criticalAssets.forEach((asset) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = asset.as;
      link.href = asset.url;
      if (asset.type) {
        link.type = asset.type;
      }
      link.setAttribute("fetchpriority", asset.fetchPriority);
      document.head.appendChild(link);
      preloadLinks.push(link);
    });

    // Preload other assets with lower priority after a slight delay
    setTimeout(() => {
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
    }, 200); // Small delay to prioritize critical resources

    // Clean up preload links on unmount
    return () => {
      preloadLinks.forEach((link) => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      });
    };
  }, []);
};
