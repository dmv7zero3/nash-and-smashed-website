// src/core/Pages/Locations/UnitedKingdom/Chelmsford/index.tsx
import React, { useRef } from "react";
import { Helmet } from "react-helmet";
import { locationData, contentSections } from "./data";
import { getPageMetadata } from "@/core/metadata/page-metadata";
import { useLocationAnimations } from "./gsap";
// src/core/Pages/Locations/UnitedKingdom/Chelmsford/index.tsx
import { usePreloadAssets } from "./preloadAssets";
import ImageGridGallery from "./ImageGridGallery";
import Hero from "@/core/Templates/Hero";

// Import components
import ContentSection from "./ContentSection";
import ContactForm from "./ContactForm";
import LocationMap from "./LocationMap";

const ChelmsfordLocation: React.FC = () => {
  // Create refs for animations
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRefs = contentSections.map(() => useRef<HTMLElement>(null));

  // Get metadata from the centralized metadata store
  const pageMeta = getPageMetadata("/locations/uk/chelmsford");

  // Initialize animations
  useLocationAnimations({ sectionRefs, videoRef });

  // Preload critical assets
  usePreloadAssets();

  return (
    <>
      <Helmet>
        <title>{pageMeta.title}</title>
        <meta name="description" content={pageMeta.description} />
        <meta property="og:title" content={pageMeta.title} />
        <meta property="og:description" content={pageMeta.description} />
        <meta property="og:image" content={pageMeta.ogImage} />
        <meta property="og:type" content={pageMeta.ogType} />
        <link
          rel="canonical"
          href={`https://nashandsmashed.com/locations/uk/chelmsford`}
        />
      </Helmet>

      <Hero
        title="Nash & Smashed Chelmsford"
        subtitle="Authentic Nashville Hot Chicken in the Heart of Essex"
        backgroundImage="/images/banner/nash-and-smashed-banner-6.jpg"
      />

      {/* Add ImageGridGallery component here, right after the Hero */}
      <ImageGridGallery />

      {/* Content Sections */}
      {contentSections.map((section, index) => (
        <ContentSection
          key={section.id}
          section={section}
          ref={sectionRefs[index]}
          isAlternate={index % 2 === 1}
        />
      ))}

      {/* Location Map */}
      <LocationMap locationData={locationData} />

      {/* Contact Form */}
      <ContactForm locationData={locationData} />
    </>
  );
};

export default ChelmsfordLocation;
