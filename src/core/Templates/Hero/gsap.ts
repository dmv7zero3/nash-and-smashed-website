import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

interface AnimateHeroProps {
  titleRef: React.RefObject<HTMLHeadingElement>;
  dividerRef: React.RefObject<HTMLDivElement>;
  subtitleRef: React.RefObject<HTMLParagraphElement>;
  leftBlobRef: React.RefObject<HTMLDivElement>;
  rightBlobRef: React.RefObject<HTMLDivElement>;
  containerRef: React.RefObject<HTMLDivElement>;
}

/**
 * Animate hero elements using GSAP
 */
export const animateHero = ({
  titleRef,
  dividerRef,
  subtitleRef,
  leftBlobRef,
  rightBlobRef,
  containerRef,
}: AnimateHeroProps) => {
  // Initialize a GSAP timeline
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  // Animate title
  if (titleRef.current) {
    tl.fromTo(
      titleRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 }
    );
  }

  // Animate divider
  if (dividerRef.current) {
    tl.fromTo(
      dividerRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.6 },
      "-=0.4"
    );
  }

  // Animate subtitle
  if (subtitleRef.current) {
    tl.fromTo(
      subtitleRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.4"
    );
  }

  // Animate left blob
  if (leftBlobRef.current) {
    tl.fromTo(
      leftBlobRef.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 0.2, duration: 1 },
      "-=0.6"
    );
  }

  // Animate right blob
  if (rightBlobRef.current) {
    tl.fromTo(
      rightBlobRef.current,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 0.2, duration: 1 },
      "-=0.8"
    );
  }

  // Add parallax effect to the container on scroll
  if (containerRef.current) {
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        if (containerRef.current) {
          const yOffset = progress * 100;
          gsap.set(containerRef.current.querySelector("img"), {
            y: yOffset,
          });
        }
      },
    });
  }

  return tl;
};
