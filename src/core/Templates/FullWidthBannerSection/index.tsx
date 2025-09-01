import React, { useState, useEffect } from "react";

interface FullWidthBannerSectionProps {
  /**
   * Path to the image file
   */
  imagePath: string;

  /**
   * Alt text for accessibility
   */
  altText?: string;

  /**
   * Optional overlay color with opacity (e.g., "bg-black/40" for 40% opacity black)
   */
  overlayClass?: string;

  /**
   * Optional classname for additional styling
   */
  className?: string;

  /**
   * Optional priority loading for LCP images
   */
  priority?: boolean;

  /**
   * Optional children to render over the banner
   */
  children?: React.ReactNode;

  /**
   * Optional object-position CSS value
   */
  objectPosition?: string;

  /**
   * Optional max-width class for container (defaults to max-w-6xl)
   */
  maxWidthClass?: string;
}

/**
 * FullWidthBannerSection - A responsive banner component that adapts to image dimensions
 *
 * @example
 * <FullWidthBannerSection
 *   imagePath="/images/banner/example-banner.jpg"
 *   altText="Example Banner"
 * />
 */
const FullWidthBannerSection: React.FC<FullWidthBannerSectionProps> = ({
  imagePath,
  altText = "Banner Image",
  overlayClass = "",
  className = "",
  priority = false,
  children,
  objectPosition = "center",
  maxWidthClass = "max-w-6xl",
}) => {
  return (
    <div className={`w-full mx-auto ${className}`}>
      <div className={`mx-auto ${maxWidthClass}`}>
        {/* Simple responsive container - no forced aspect ratio */}
        <div className="relative w-full overflow-hidden">
          <img
            src={imagePath}
            alt={altText}
            className="w-full h-auto scale-[1.01]"
            style={{ objectPosition }}
            loading={priority ? "eager" : "lazy"}
          />

          {/* Optional overlay */}
          {overlayClass && (
            <div
              className="absolute inset-0 top-0 bottom-0 left-0 right-0 w-full h-full"
              style={{ background: overlayClass }}
            ></div>
          )}

          {/* Content container - only rendered if children are provided */}
          {children && (
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <div className="w-full">{children}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FullWidthBannerSection;
