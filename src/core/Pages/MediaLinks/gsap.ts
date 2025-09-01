import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RefObject } from "react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface AnimationElements {
  containerRef: RefObject<HTMLDivElement>;
  titleRef: RefObject<HTMLHeadingElement>;
  descriptionRef: RefObject<HTMLParagraphElement>;
  mediaItemsRef: RefObject<HTMLDivElement>;
}

/**
 * Animates media links page elements using GSAP
 */
export const animateMediaLinks = (
  elements: AnimationElements
): gsap.Context => {
  const { containerRef, titleRef, descriptionRef, mediaItemsRef } = elements;

  // Create animation context
  return gsap.context(() => {
    // Animate heading and description with fade in from bottom
    if (titleRef.current && descriptionRef.current) {
      gsap.fromTo(
        [titleRef.current, descriptionRef.current],
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
        }
      );
    }

    // Animate media items with staggered entrance
    if (mediaItemsRef.current) {
      const mediaItems = mediaItemsRef.current.children;

      gsap.fromTo(
        mediaItems,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.4,
        }
      );
    }

    // Add scroll animations for items that appear later
    if (containerRef.current && mediaItemsRef.current) {
      const laterItems = Array.from(mediaItemsRef.current.children).slice(8);

      ScrollTrigger.batch(laterItems, {
        start: "top 85%",
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.5,
            ease: "power2.out",
          });
        },
        once: true,
      });
    }
  }, containerRef);
};
