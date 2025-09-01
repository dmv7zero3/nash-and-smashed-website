// src/core/Pages/Franchise/Hero/index.tsx
import React, { useEffect, useRef } from "react";

const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle video playback when component mounts
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    // Configure video for autoplay
    videoElement.muted = true;
    videoElement.playsInline = true;
    videoElement.loop = true;

    // Attempt to play the video
    const playVideo = () => {
      videoElement.play().catch((error) => {
        console.warn("Autoplay prevented:", error);
        // Try again after user interaction
        document.addEventListener(
          "click",
          () => {
            videoElement
              .play()
              .catch((e) => console.warn("Still can't play video:", e));
          },
          { once: true }
        );
      });
    };

    // Play when ready
    if (videoElement.readyState >= 2) {
      playVideo();
    } else {
      videoElement.addEventListener("loadeddata", playVideo);
    }

    return () => {
      videoElement.removeEventListener("loadeddata", playVideo);
    };
  }, []);

  return (
    <section className="relative h-[85vh] min-h-[600px] overflow-hidden bg-dark-olive-bark">
      <div className="absolute inset-0 z-0 w-full h-full">
        <div className="absolute inset-0 w-full h-full">
          {/* Video background with blur effect */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <video
              ref={videoRef}
              className="object-cover w-full h-full scale-105 blur-sm"
              muted
              playsInline
              loop
              poster="/images/banner/nash-and-smashed-banner-6.webp"
            >
              <source
                src="/videos/customers-standing-line-at-nash-and-smashed.mp4"
                type="video/mp4"
              />
              {/* Fallback for browsers that don't support video */}
              <picture className="w-full h-full">
                <source
                  srcSet="/images/banner/nash-and-smashed-banner-6.webp"
                  type="image/webp"
                />
                <img
                  src="/images/banner/nash-and-smashed-banner-6.jpg"
                  alt="Nash & Smashed Franchise Opportunity"
                  className="object-cover w-full h-full scale-105 max-w-none blur-sm"
                  width="1920"
                  height="1080"
                />
              </picture>
            </video>
          </div>
          {/* Additional overlay for better text contrast */}
          <div className="absolute inset-0 bg-dark-olive-bark bg-opacity-40"></div>
        </div>
      </div>

      {/* Content with improved contrast for readability */}
      <div className="container relative z-10 flex flex-col items-center justify-center h-full px-4 mx-auto text-center">
        <div className="max-w-3xl p-6 mx-auto text-white bg-black bg-opacity-20 backdrop-blur-sm rounded-xl hero-content">
          <h1 className="mb-4 text-6xl md:text-7xl cosmic-lager">
            Franchise with <br></br> Nash & Smashed
          </h1>
          <p className="mb-8 text-xl md:text-2xl cosmic-lager">
            Join Our Growing Family of Restaurants
          </p>

          <div className="flex flex-col justify-center space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <a
              href="/pdfs/nash-and-smashed-franchise-brouchure.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 font-bold transition-colors rounded-md bg-lightning-yellow-400 text-dark-olive-bark hover:bg-lightning-yellow-500 proxima"
            >
              Download Brochure
            </a>
            <a
              href="#franchise-form"
              className="px-6 py-3 font-bold text-white transition-colors border-2 border-white rounded-md hover:bg-white hover:bg-opacity-10 proxima"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
