// Hero component update
import React, { useEffect, useRef } from "react";
import { ChelmsfordLocationData } from "../types";

interface HeroProps {
  locationData: ChelmsfordLocationData;
}

const Hero: React.FC<HeroProps> = ({ locationData }) => {
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
          {/* Video background */}
          <video
            ref={videoRef}
            className="object-cover w-full h-full"
            muted
            playsInline
            loop
            poster="/images/banner/nash-and-smashed-banner-6.jpg" // Fallback image
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
                alt="Nash & Smashed Chelmsford"
                className="object-cover w-full h-full max-w-none"
                width="1920"
                height="1080"
              />
            </picture>
          </video>
          <div className="absolute inset-0 bg-dark-olive-bark bg-opacity-40"></div>
        </div>
      </div>

      <div className="container relative z-10 flex flex-col items-center justify-center h-full px-4 mx-auto text-center">
        <div className="max-w-3xl mx-auto text-white hero-content">
          <h1 className="mb-4 text-6xl md:text-7xl cosmic-lager">
            Chelmsford, UK
          </h1>
          <p className="mb-8 text-xl md:text-2xl cosmic-lager">
            Our First Official UK Location
          </p>

          <div className="flex justify-center space-x-4">
            <a
              href={locationData.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 font-bold transition-colors rounded-md bg-lightning-yellow-400 text-dark-olive-bark hover:bg-lightning-yellow-500 proxima"
            >
              Get Directions
            </a>
            <a
              href="#contact-form"
              className="px-6 py-3 font-bold text-white transition-colors border-2 border-white rounded-md hover:bg-white hover:bg-opacity-10 proxima"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
