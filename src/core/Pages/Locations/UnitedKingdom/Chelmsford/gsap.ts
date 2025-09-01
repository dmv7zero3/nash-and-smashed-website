import { useEffect, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimationProps {
  sectionRefs: RefObject<HTMLElement>[];
  videoRef: RefObject<HTMLVideoElement>;
}

export const useLocationAnimations = ({
  sectionRefs,
  videoRef,
}: AnimationProps) => {
  useEffect(() => {
    // Hero section animation
    gsap.fromTo(
      ".hero-content",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    // Video container animation
    if (videoRef.current) {
      gsap.fromTo(
        ".video-container",
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1, delay: 0.3, ease: "power2.out" }
      );
    }

    // Content sections animations
    sectionRefs.forEach((ref, index) => {
      if (ref.current) {
        gsap.fromTo(
          ref.current.querySelectorAll(".animate-in"),
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });

    // Clean up ScrollTriggers on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [sectionRefs, videoRef]);
};
