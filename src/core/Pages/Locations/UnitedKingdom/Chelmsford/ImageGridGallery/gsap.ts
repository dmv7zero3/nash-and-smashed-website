import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimationTarget } from "./types";

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

/**
 * Animates grid items with a scale and fade-in effect
 */
export const animateGridItems = (
  sectionRef: AnimationTarget,
  itemRefs: (HTMLDivElement | null)[]
): void => {
  if (!sectionRef.current || !itemRefs.length) return;

  // Filter out null refs and ensure we have valid elements
  const validRefs = itemRefs.filter(
    (ref): ref is HTMLDivElement => ref !== null
  );

  if (validRefs.length === 0) {
    console.warn("No valid refs found for gallery animation");
    return;
  }

  // Set initial state
  gsap.set(validRefs, {
    opacity: 0,
    scale: 0.95,
    y: 20,
  });

  // Animate items in with stagger
  gsap.to(validRefs, {
    opacity: 1,
    scale: 1,
    y: 0,
    duration: 0.7,
    stagger: 0.1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top 85%",
      toggleActions: "play none none none",
      id: "gallery-items",
    },
  });
};

/**
 * Animates the gallery heading with a fade-in
 */
export const animateHeading = (
  sectionRef: AnimationTarget,
  headingRef: AnimationTarget
): void => {
  if (!sectionRef.current || !headingRef.current) return;

  gsap.fromTo(
    headingRef.current,
    {
      opacity: 0,
      y: -20,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
        id: "gallery-heading",
      },
    }
  );
};

/**
 * Cleans up all ScrollTrigger instances
 */
export const cleanupScrollTriggers = (): void => {
  ScrollTrigger.getAll().forEach((trigger) => {
    if (trigger.vars?.id?.includes("gallery")) {
      trigger.kill();
    }
  });
};
