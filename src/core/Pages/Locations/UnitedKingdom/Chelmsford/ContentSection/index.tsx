// ContentSection component update
import React, { forwardRef } from "react";
import { ContentSection as ContentSectionType } from "../types";

interface ContentSectionProps {
  section: ContentSectionType;
  isAlternate?: boolean;
}

/**
 * Generates a WebP version path from a standard image path
 * @param imagePath Original image path (jpg, png, etc.)
 * @returns Path to the WebP version of the image
 */
const getWebPPath = (imagePath: string): string => {
  if (!imagePath) return "";
  const lastDotIndex = imagePath.lastIndexOf(".");
  if (lastDotIndex !== -1) {
    return imagePath.substring(0, lastDotIndex) + ".webp";
  }
  return imagePath + ".webp"; // Fallback if no extension found
};

const ContentSection = forwardRef<HTMLElement, ContentSectionProps>(
  ({ section, isAlternate = false }, ref) => {
    const { id, title, subtitle, content, ctaText, ctaLink, image } = section;

    // Generate WebP path from the provided image path
    const webpImagePath = image ? getWebPPath(image) : "";

    return (
      <section
        id={id}
        ref={ref}
        className={`py-16 ${
          isAlternate ? "bg-lightning-yellow bg-opacity-10" : "bg-white"
        }`}
      >
        <div className="container px-4 mx-auto">
          <div
            className={`flex flex-col ${
              image ? "lg:flex-row" : ""
            } items-center gap-12`}
          >
            {image && !isAlternate && (
              <div className="lg:w-1/2 animate-in">
                <picture>
                  <source srcSet={webpImagePath} type="image/webp" />
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-auto rounded-lg shadow-lg"
                    width="800"
                    height="600"
                    loading="lazy"
                  />
                </picture>
              </div>
            )}

            <div
              className={`${
                image ? "lg:w-1/2" : "max-w-3xl mx-auto text-center"
              }`}
            >
              <div className="animate-in">
                <div className="w-20 h-1 mb-6 bg-lightning-yellow-400"></div>
                <h2 className="mb-2 text-2xl font-bold cosmic-lager text-dark-olive-bark">
                  {title}
                </h2>
                <h3 className="mb-6 text-4xl cosmic-lager text-dark-olive-bark">
                  {subtitle}
                </h3>
              </div>

              <div className="animate-in">
                <div className="space-y-4 proxima text-dark-olive-bark">
                  {content.split("\n\n").map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {ctaText && ctaLink && (
                <div className="mt-8 animate-in">
                  <a
                    href={ctaLink}
                    className="inline-block px-6 py-3 font-bold transition-colors rounded-md bg-lightning-yellow-400 text-dark-olive-bark hover:bg-lightning-yellow-500 proxima"
                  >
                    {ctaText}
                  </a>
                </div>
              )}
            </div>

            {image && isAlternate && (
              <div className="lg:w-1/2 animate-in">
                <picture>
                  <source srcSet={webpImagePath} type="image/webp" />
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-auto rounded-lg shadow-lg"
                    width="800"
                    height="600"
                    loading="lazy"
                  />
                </picture>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }
);

ContentSection.displayName = "ContentSection";

export default ContentSection;
