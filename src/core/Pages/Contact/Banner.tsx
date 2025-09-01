// src/core/Pages/Contact/Banner.tsx
import React from "react";

interface BannerProps {
  className?: string;
}

const Banner: React.FC<BannerProps> = ({ className = "" }) => {
  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <div className="relative">
        {/* Image container with aspect ratio preservation */}
        <div className="w-full relative pb-[40%] md:pb-[30%] lg:pb-[25%]">
          <picture>
            <source
              srcSet="/images/banner/nash-and-smashed-banner-1.webp"
              type="image/webp"
            />
            <img
              src="/images/banner/nash-and-smashed-banner-1.jpg"
              alt="Nash & Smashed"
              className="absolute inset-0 object-cover w-full h-full"
              loading="eager"
            />
          </picture>
        </div>
      </div>
    </div>
  );
};

export default Banner;
