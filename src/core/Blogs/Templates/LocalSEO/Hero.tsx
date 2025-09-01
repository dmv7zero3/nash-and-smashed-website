import React from "react";

interface HeroProps {
  title: string;
  metaDescription: string;
}

const Hero: React.FC<HeroProps> = ({ title, metaDescription }) => {
  return (
    <div className="relative">
      <div className="w-full max-w-[120rem] mx-auto rounded-lg h-[32vh] sm:h-[26rem] lg:h-[30rem] drop-shadow-lg overflow-hidden">
        <picture>
          <source
            srcSet="/images/banner/nash-and-smashed-combo.webp"
            type="image/webp"
          />
          <img
            src="/images/banner/nash-and-smashed-combo.jpg"
            alt="Nash & Smashed Chicken Sandwich Meal"
            className="object-cover w-full h-[32vh] sm:h-[26rem] lg:h-[30rem]"
            width="1920"
            height="1080"
            loading="eager"
          />
        </picture>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center px-2 rounded-lg bg-gradient-to-b from-black/80 to-black/50">
        <div className="text-center md:max-w-4xl">
          <h1 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl drop-shadow-lg cosmic-lager">
            {title}
          </h1>
          <a
            href="#content"
            className="inline-block mt-4 text-white transition-colors hover:text-lightning-yellow"
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
