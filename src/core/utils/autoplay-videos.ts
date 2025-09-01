import { useEffect, RefObject } from "react";

/**
 * Custom hook to ensure videos autoplay properly across all browsers and devices
 * This handles Safari's strict autoplay policy, low power mode, and mobile limitations
 */
export const useAutoplayVideo = (
  videoRef: RefObject<HTMLVideoElement>,
  options = { muted: true, playbackRate: 1, retryInterval: 500 }
): void => {
  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    let playAttemptTimer: number | undefined;

    // Always mute videos to ensure autoplay works
    video.muted = options.muted;

    // Set volume to 0 for extra compatibility
    video.volume = 0.0;

    // Set playback rate
    video.playbackRate = options.playbackRate;

    // Set up attributes for better autoplay
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", ""); // For older iOS versions
    video.setAttribute("preload", "auto");

    // Check if video is in viewport
    const isInViewport = () => {
      const rect = video.getBoundingClientRect();
      return (
        rect.top >= -rect.height &&
        rect.bottom <= window.innerHeight + rect.height
      );
    };

    // Function to attempt playback with error handling
    const attemptPlay = async () => {
      if (video.readyState >= 2 && video.paused && isInViewport()) {
        video.play().catch(() => {
          // Silent catch
        });
      }
      try {
        // Only attempt to play if the video is paused and has loaded enough data
        if (video.paused && video.readyState >= 2) {
          await video.play();
          console.log("Video playback started successfully");
        }
      } catch (error) {
        console.warn("Autoplay was prevented:", error);

        // Schedule another attempt if still in viewport
        if (isInViewport()) {
          clearTimeout(playAttemptTimer);
          playAttemptTimer = window.setTimeout(
            attemptPlay,
            options.retryInterval
          );
        }
      }
    };

    // Continuous play checking with timeout
    const ensureVideoPlays = () => {
      if (video.readyState >= 4 && video.paused && isInViewport()) {
        video.play().catch(() => {
          // Silent catch, already handled by retry mechanism
        });
      }

      clearTimeout(playAttemptTimer);
      playAttemptTimer = window.setTimeout(
        ensureVideoPlays,
        options.retryInterval
      );
    };

    // Try to play when metadata is loaded
    const onLoadedMetadata = () => {
      attemptPlay();
    };

    // Try to play when enough data is buffered to start playback
    const onCanPlay = () => {
      attemptPlay();
    };

    // Try again if paused
    const onPause = () => {
      if (isInViewport()) {
        attemptPlay();
      }
    };

    // Create an intersection observer to play/pause based on visibility
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            attemptPlay();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(video);

    // Add event listeners
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("suspend", attemptPlay); // Handle suspended loading
    video.addEventListener("stalled", attemptPlay); // Handle stalled loading

    // Handle visibility change (tab switches, etc)
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) {
        attemptPlay();
      }
    });

    // Mobile-specific events
    document.addEventListener("touchstart", attemptPlay, { once: true });
    document.addEventListener(
      "scroll",
      () => {
        if (isInViewport()) {
          attemptPlay();
        }
      },
      { passive: true }
    );

    // Start the continuous check
    ensureVideoPlays();

    // Clean up
    return () => {
      clearTimeout(playAttemptTimer);
      observer.unobserve(video);

      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("suspend", attemptPlay);
      video.removeEventListener("stalled", attemptPlay);

      document.removeEventListener("visibilitychange", attemptPlay);
    };
  }, [videoRef, options.muted, options.playbackRate, options.retryInterval]);
};

/**
 * Standalone function to autoplay videos with a specific class
 * For use with non-React code
 */
export function autoplayVideos(selector = ".autoplay-video") {
  document.addEventListener("DOMContentLoaded", function () {
    const videoElements = document.querySelectorAll<HTMLVideoElement>(selector);

    videoElements.forEach((video) => {
      if (!(video instanceof HTMLVideoElement)) return;

      // Configure video for autoplay
      video.muted = true;
      video.volume = 0.0;
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");
      video.setAttribute("preload", "auto");

      const isInViewport = () => {
        const rect = video.getBoundingClientRect();
        return (
          rect.top >= -rect.height &&
          rect.bottom <= window.innerHeight + rect.height
        );
      };

      function attemptPlay() {
        if (video.readyState >= 2 && video.paused && isInViewport()) {
          video.play().catch(() => {
            // Silent catch
          });
        }
      }

      function ensureVideoPlays() {
        attemptPlay();
        setTimeout(ensureVideoPlays, 500);
      }

      // Set up event listeners
      video.addEventListener("loadedmetadata", attemptPlay);
      video.addEventListener("canplay", attemptPlay);
      video.addEventListener("pause", attemptPlay);

      // Create intersection observer for visibility
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              attemptPlay();
            }
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(video);

      // Start continuous attempts
      ensureVideoPlays();
    });

    // Mobile-specific event
    document.addEventListener(
      "touchstart",
      () => {
        videoElements.forEach((element) => {
          if (!(element instanceof HTMLVideoElement)) return;
          if (isElementInViewport(element)) {
            element.play().catch(() => {});
          }
        });
      },
      { once: true }
    );

    function isElementInViewport(el: HTMLElement) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= -rect.height &&
        rect.bottom <= window.innerHeight + rect.height
      );
    }
  });
}
