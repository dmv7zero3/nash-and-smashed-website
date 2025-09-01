import { gsap } from "gsap";
import { RefObject } from "react";

/**
 * Animate notification entry with scale-in and fade-in effects
 */
export const animateNotificationEntry = (
  notificationRef: RefObject<HTMLDivElement>
): gsap.Context | null => {
  if (!notificationRef.current) return null;

  // Create and return the animation context
  return gsap.context(() => {
    // Set initial state
    gsap.set(notificationRef.current, {
      opacity: 0,
      scale: 0.8,
    });

    // Create the animation timeline with a slight bounce effect
    gsap.timeline().to(notificationRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: "back.out(1.2)",
    });
  });
};

/**
 * Animate notification exit with fade-out and scale-down
 */
export const animateNotificationExit = (
  notificationRef: RefObject<HTMLDivElement>,
  onCompleteCallback: () => void
): gsap.Context | null => {
  if (!notificationRef.current) {
    onCompleteCallback();
    return null;
  }

  // Create and return the animation context
  return gsap.context(() => {
    gsap.to(notificationRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      ease: "power2.in",
      onComplete: onCompleteCallback,
    });
  });
};
