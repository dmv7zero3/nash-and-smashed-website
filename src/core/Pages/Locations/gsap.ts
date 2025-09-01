import { RefObject, useEffect, MutableRefObject } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface AnimationRefs {
  containerRef: RefObject<HTMLDivElement>;
  // Update this type to match what we're actually passing from index.tsx
  itemsRef: MutableRefObject<RefObject<HTMLDivElement>[]>;
}

export const useLocationAnimations = (refs: AnimationRefs): void => {
  const { containerRef, itemsRef } = refs;

  useEffect(() => {
    // Ensure elements exist before animating
    if (!containerRef.current || !itemsRef.current?.length) return;

    // Get the actual DOM elements from the refs
    const elements = itemsRef.current
      .map((ref) => ref.current)
      .filter((el): el is HTMLDivElement => el !== null);

    if (!elements.length) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    // Animate the location cards with a staggered effect
    tl.fromTo(
      elements,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
      }
    );

    // Clean up animations when component unmounts
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, [containerRef, itemsRef]);
};
