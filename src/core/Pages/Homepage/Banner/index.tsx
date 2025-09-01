import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Banner: React.FC = () => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bucketRef = useRef<HTMLImageElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: bannerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    // Animations start after image is loaded to prevent layout shifts
    const startAnimations = () => {
      // Animate the text elements
      tl.from(
        textRef.current?.children || [],
        {
          y: 50,
          opacity: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
        },
        0
      );

      // Animate the bucket
      tl.from(
        bucketRef.current,
        {
          x: 200,
          opacity: 0,
          rotation: -25,
          duration: 1,
          ease: "back.out(1.7)",
        },
        0.3
      );

      // Animate the description text
      tl.from(
        descriptionRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        0.6
      );

      // Create constant rotation animation for the bucket
      if (bucketRef.current) {
        gsap.to(bucketRef.current, {
          rotation: "-15deg",
          duration: 2,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
          repeatDelay: 0.5,
        });
      }
    };

    // Delay animations to ensure content is loaded
    if (bucketRef.current && bucketRef.current.complete) {
      startAnimations();
    } else if (bucketRef.current) {
      bucketRef.current.onload = startAnimations;
    }

    // Cleanup
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      gsap.killTweensOf(bucketRef.current);
    };
  }, []);

  return (
    <div
      ref={bannerRef}
      className="relative pt-12 pb-16 overflow-hidden bg-lightning-yellow lg:pb-24 lg:pt-16"
    >
      <div className="relative flex flex-col items-center w-11/12 px-4 mx-auto lg:w-9/12 md:px-6 lg:flex-row lg:justify-between">
        {/* Left side with text */}
        <div className="z-10 mb-12 text-center lg:text-left lg:mb-0 lg:w-[45%]">
          <div ref={textRef} className="mb-6 ">
            <h2 className="font-black text-dark-olive-bark text-7xl copyduck md:text-8xl lg:text-9xl">
              {" "}
              <div className="mb-2 transition-transform duration-300 transform hover:scale-105">
                FRESH
              </div>
              <div className="mb-2 transition-transform duration-300 transform hover:scale-105">
                PURE
              </div>
              <div className="transition-transform duration-300 transform hover:scale-105">
                LOCAL
              </div>
            </h2>
          </div>

          <div
            ref={descriptionRef}
            className="max-w-md mx-auto text-lg font-semibold leading-relaxed tracking-wide text-black uppercase lg:mt-0 lg:mx-0 lg:max-w-lg"
          >
            <p className="text-xl open-sans">
              FRIED CHICKEN, NASHVILLE STYLE SANDWICHES, SMASHED BURGERS AND
              MORE.
            </p>
          </div>
        </div>

        {/* Right side with chicken bucket - optimized for performance */}
        <div className="relative flex items-center justify-center lg:w-[55%]">
          <picture className="w-full">
            <source
              srcSet="/images/food/chicken-bucket.webp"
              type="image/webp"
            />
            <img
              ref={bucketRef}
              src="/images/food/chicken-bucket.png"
              alt="Bucket of Chicken"
              className="w-[100%] md:w-[550%] lg:w-[100%] lg:scale-110 max-w-[1650px] transform"
              style={{ width: "100%", maxWidth: "100%" }}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              width="1650"
              height="1650"
            />
          </picture>
        </div>
      </div>
    </div>
  );
};

export default Banner;
