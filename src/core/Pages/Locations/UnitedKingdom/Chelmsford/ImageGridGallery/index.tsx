import React, { useRef, useState, useEffect, useCallback } from "react";
import { galleryItems } from "./data";
import { VideoRefs, EventListenerRefs, VideoPlayingState } from "./types";
import {
  animateGridItems,
  animateHeading,
  cleanupScrollTriggers,
} from "./gsap";

const ImageGridGallery: React.FC = () => {
  // Refs for animations and elements
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<VideoRefs>({});

  // State for tracking video and image loading
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoading, setImageLoading] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>(
    {}
  );

  // Initialize refs and loading states
  useEffect(() => {
    itemRefs.current = new Array(galleryItems.length).fill(null);

    // Initialize loading states for images
    const loadingState: { [key: string]: boolean } = {};
    galleryItems.forEach((item) => {
      if (item.type === "image") {
        loadingState[item.id] = true;
      }
    });
    setImageLoading(loadingState);
  }, []);

  // Set up GSAP animations
  useEffect(() => {
    const animationTimeout = setTimeout(() => {
      if (sectionRef.current) {
        const validRefs = itemRefs.current.filter(Boolean);
        if (validRefs.length > 0) {
          animateGridItems({ current: sectionRef.current }, validRefs);
        }

        if (headingRef.current) {
          animateHeading(
            { current: sectionRef.current },
            { current: headingRef.current }
          );
        }
      }
    }, 300);

    return () => {
      clearTimeout(animationTimeout);
      cleanupScrollTriggers();
    };
  }, []);

  // Intersection Observer to detect when gallery is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Setup video playback for all videos when the component becomes visible
  useEffect(() => {
    if (!isVisible) return;

    // Handle all videos with proper playback settings
    Object.values(videoRefs.current).forEach((videoElement) => {
      if (videoElement) {
        // Apply playback settings
        videoElement.muted = true;
        videoElement.playbackRate = 1;
        videoElement.setAttribute("playsinline", "");
        videoElement.setAttribute("preload", "auto");

        // Prevent right-click menu
        videoElement.addEventListener("contextmenu", (e) => e.preventDefault());

        // Attempt playback
        const attemptPlay = async () => {
          try {
            if (videoElement.paused) {
              await videoElement.play();
            }
          } catch (error) {
            console.warn("Autoplay was prevented:", error);
          }
        };

        // Try to play when possible
        if (videoElement.readyState >= 2) {
          attemptPlay();
        } else {
          videoElement.addEventListener("canplay", attemptPlay);
        }
      }
    });

    // Cleanup function
    return () => {
      Object.values(videoRefs.current).forEach((videoElement) => {
        if (videoElement) {
          videoElement.removeEventListener("contextmenu", (e) =>
            e.preventDefault()
          );
          videoElement.removeEventListener("canplay", () => {});
        }
      });
    };
  }, [isVisible]);

  // Set up video refs callback - WITHOUT using the hook inside
  const setVideoRef = useCallback(
    (id: string, element: HTMLVideoElement | null) => {
      if (element) {
        videoRefs.current[id] = element;
      }
    },
    []
  );

  // Handle image load
  const handleImageLoad = useCallback((itemId: string) => {
    setImageLoading((prev) => ({ ...prev, [itemId]: false }));
    setImageErrors((prev) => ({ ...prev, [itemId]: false }));
  }, []);

  // Handle image error
  const handleImageError = useCallback((itemId: string) => {
    setImageLoading((prev) => ({ ...prev, [itemId]: false }));
    setImageErrors((prev) => ({ ...prev, [itemId]: true }));
  }, []);

  // Render image with loading indicator
  const renderImage = (item: (typeof galleryItems)[0], index: number) => {
    return (
      <>
        {imageLoading[item.id] && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-100">
            <div className="w-8 h-8 border-4 rounded-full border-lightning-yellow-500 border-t-transparent animate-spin"></div>
          </div>
        )}

        <picture>
          {item.srcWebp && <source srcSet={item.srcWebp} type="image/webp" />}
          <img
            src={item.src}
            alt={item.alt}
            className="object-cover w-full h-full transition-all duration-500 group-hover:scale-105"
            onLoad={() => handleImageLoad(item.id)}
            onError={() => handleImageError(item.id)}
            loading="lazy"
            width="800"
            height="800"
          />
        </picture>
      </>
    );
  };

  // Render video with poster
  const renderVideo = (item: (typeof galleryItems)[0], index: number) => {
    if (!isVisible) {
      // Return poster image when video is not yet visible
      return (
        <picture>
          {item.posterWebp && (
            <source srcSet={item.posterWebp} type="image/webp" />
          )}
          <img
            src={item.poster || ""}
            alt={item.alt}
            className="object-cover w-full h-full"
            loading="lazy"
            width="800"
            height="800"
          />
        </picture>
      );
    }

    return (
      <video
        id={`video-${item.id}`}
        ref={(el) => setVideoRef(item.id, el)}
        className="object-cover w-full h-full"
        muted
        loop
        playsInline
        poster={item.poster || ""}
      >
        <source src={item.src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  };

  // Find the vertical video for special layout
  const verticalVideoItem = galleryItems.find(
    (item) => item.type === "video" && item.aspectRatio === "vertical"
  );

  // All other items for the grid
  const gridItems = galleryItems.filter(
    (item) => !(item.type === "video" && item.aspectRatio === "vertical")
  );

  return (
    <section ref={sectionRef} className="py-16 bg-white">
      <div className="container px-4 mx-auto">
        <h2
          ref={headingRef}
          className="mb-12 text-3xl font-bold text-center md:text-4xl americana text-dark-olive-bark"
        >
          Gallery
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {/* Vertical video takes 2 rows and 1 column on desktop */}
          {verticalVideoItem && (
            <div
              ref={(el) => (itemRefs.current[0] = el)}
              className="aspect-[9/16] md:row-span-2 overflow-hidden rounded-lg shadow-lg bg-gray-100 relative group"
            >
              {renderVideo(verticalVideoItem, 0)}
              <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-black/20 group-hover:opacity-100"></div>
            </div>
          )}

          {/* Grid of square images */}
          {gridItems.map((item, index) => (
            <div
              key={item.id}
              ref={(el) =>
                (itemRefs.current[index + (verticalVideoItem ? 1 : 0)] = el)
              }
              className="relative overflow-hidden bg-gray-100 rounded-lg shadow-lg aspect-square group"
            >
              {item.type === "image"
                ? renderImage(item, index)
                : renderVideo(item, index)}
              <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-black/20 group-hover:opacity-100"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageGridGallery;
