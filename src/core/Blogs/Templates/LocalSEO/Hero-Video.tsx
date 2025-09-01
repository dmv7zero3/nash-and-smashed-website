import React, { RefObject } from "react";

interface HeroProps {
  videoRef: RefObject<HTMLVideoElement>;
  title: string;
  metaDescription: string;
}

const Hero: React.FC<HeroProps> = ({ videoRef, title, metaDescription }) => {
  return (
    <div className="relative">
      <video
        ref={videoRef}
        autoPlay
        loop
        playsInline
        muted
        className="object-cover w-full max-w-[120rem] mx-auto rounded-lg h-[26rem] lg:h-[30rem] drop-shadow-lg"
        poster="/videos/nash-and-smashed-hot-chicken-poster.webp"
      >
        <source
          src="/videos/nash-and-smashed-hot-chicken.mp4"
          type="video/mp4"
        />
        {/* Fallback image if video fails */}
        <img
          src="/videos/nash-and-smashed-hot-chicken-poster.jpg"
          alt="Nash & Smashed Hot Chicken and Burgers"
          className="object-cover w-full h-full"
        />
      </video>
      <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-gradient-to-b from-black/50 to-black/20">
        <div className="px-6 text-center md:max-w-4xl">
          <h1 className="mt-4 mb-4 text-4xl md:text-5xl pt-[12vh] lg:text-6xl font-bold text-white drop-shadow-lg">
            {title}
          </h1>
          <p className="max-w-3xl mx-auto mb-6 text-xl leading-relaxed md:text-2xl text-white/90">
            {metaDescription.substring(0, 100)}...
          </p>
          <a
            href="#content"
            className="inline-block text-white transition-colors hover:text-cannabis-green-300"
          >
            <svg
              className="w-10 h-10 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
