import React, { useEffect, useRef } from "react";
import { animateHero } from "./gsap";

export interface HeroProps {
  /**
   * The main title displayed in the hero
   */
  title: React.ReactNode;

  /**
   * Subtitle text displayed below the title
   */
  subtitle?: string;

  /**
   * Path to the background image
   */
  backgroundImage?: string;

  /**
   * Alt text for the background image
   */
  imageAlt?: string;

  /**
   * Optional custom height class for the hero container
   */
  heightClass?: string;

  /**
   * Optional additional classes for styling
   */
  className?: string;

  /**
   * Enable or disable animations (default: true)
   */
  animate?: boolean;
}

/**
 * Generates a WebP version path from a standard image path
 * @param imagePath Original image path (jpg, png, etc.)
 * @returns Path to the WebP version of the image
 */
const getWebPPath = (imagePath: string): string => {
  const lastDotIndex = imagePath.lastIndexOf(".");
  if (lastDotIndex !== -1) {
    return imagePath.substring(0, lastDotIndex) + ".webp";
  }
  return imagePath + ".webp"; // Fallback if no extension found
};

/**
 * A flexible hero component with animation capabilities
 */
const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  backgroundImage = "/images/banner/nash-and-smashed-banner.jpg",
  imageAlt = "Banner Image",
  heightClass = "h-[400px] sm:h-[500px] md:h-[550px]",
  className = "tracking-wider",
  animate = true,
}) => {
  // Refs for animation targets
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const leftBlobRef = useRef<HTMLDivElement>(null);
  const rightBlobRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Generate WebP path from the provided image path
  const webpImagePath = getWebPPath(backgroundImage);

  // Initialize animations when component mounts
  useEffect(() => {
    if (animate) {
      animateHero({
        titleRef,
        dividerRef,
        subtitleRef,
        leftBlobRef,
        rightBlobRef,
        containerRef,
      });
    }
  }, [animate]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Background image container with reduced opacity overlay */}
      <div className={`relative ${heightClass}`}>
        <picture>
          <source srcSet={webpImagePath} type="image/webp" />
          <img
            ref={imageRef}
            src={backgroundImage}
            alt={imageAlt}
            className="absolute inset-0 object-cover w-full h-full"
            width="1920"
            height="1080"
          />
        </picture>
        {/* Semi-transparent gradient overlay to enhance text visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40"></div>
      </div>

      {/* Content positioned to center vertically and avoid covering important image text */}
      <div className="absolute inset-0 z-20 flex items-center justify-center px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl p-4 mx-auto text-center sm:p-6 backdrop-blur-sm bg-black/30 rounded-xl">
            <h1
              ref={titleRef}
              className="mb-4 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl cosmic-lager"
            >
              {title}
            </h1>
            <div
              ref={dividerRef}
              className="w-16 h-1 mx-auto mb-4 sm:w-24 bg-lightning-yellow-400"
            ></div>
            {subtitle && (
              <p
                ref={subtitleRef}
                className="text-base text-white sm:text-lg md:text-xl american"
              >
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div
        ref={leftBlobRef}
        className="absolute top-0 left-0 hidden w-64 h-64 md:block"
      >
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-lightning-yellow-400 opacity-20"
        >
          <path
            fill="currentColor"
            d="M45.7,-77.8C58.9,-69.5,69,-55.1,76.3,-39.9C83.5,-24.8,87.9,-8.9,85.6,5.9C83.4,20.8,74.4,34.5,64.3,47.3C54.2,60,43,71.9,29.1,77C15.2,82.2,-1.5,80.7,-18.2,77.5C-35,74.3,-51.7,69.4,-63.8,59.1C-75.8,48.7,-83.2,32.9,-86.7,15.7C-90.1,-1.5,-89.7,-20,-83,-35.2C-76.4,-50.3,-63.6,-62.1,-49,-71.3C-34.3,-80.4,-17.1,-87,-0.2,-86.6C16.8,-86.3,33.5,-79.1,45.7,-77.8Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      <div
        ref={rightBlobRef}
        className="absolute bottom-0 right-0 hidden w-64 h-64 md:block"
      >
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-lightning-yellow-400 opacity-20"
        >
          <path
            fill="currentColor"
            d="M39.9,-68.3C51.1,-62.2,59.5,-49.6,68.2,-36.2C76.8,-22.8,85.6,-8.5,85.1,5.3C84.5,19.2,74.5,32.8,65.3,47.4C56.2,62.1,47.9,77.8,35.4,82.8C22.8,87.8,6,82,-9,76.9C-23.9,71.7,-36.9,67,-45.9,57.9C-54.8,48.8,-59.7,35.2,-66.3,21.3C-73,7.4,-81.5,-6.8,-80.3,-20C-79.1,-33.2,-68.2,-45.5,-55.5,-51.1C-42.8,-56.7,-28.3,-55.6,-15.7,-58.8C-3.1,-62.1,7.5,-69.7,19.3,-69.7C31.1,-69.8,44.1,-62.3,39.9,-68.3Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>
    </div>
  );
};

export default Hero;
