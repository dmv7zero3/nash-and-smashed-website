import React, { lazy, Suspense } from "react";
import { Helmet } from "react-helmet";
import Banner from "./Banner/index";
import { usePreloadAssets } from "./preloadAssets";
import homepageMetadata from "./meta";

// Lazy load components that are below the fold
const FoodCategories = lazy(() => import("@/core/Templates/FoodCategories"));
const AboutMenuItems = lazy(() => import("./AboutMenuItems/index"));
const LocationsCallToAction = lazy(
  () => import("@/core/Templates/Locations/LocationsCallToAction")
);
const FullWidthBannerSection = lazy(
  () => import("@/core/Templates/FullWidthBannerSection")
);
const GoogleRichSnippet = lazy(() => import("./GoogleRichSnippet"));

const LoadingFallback = () => <div className="min-h-[20vh]"></div>;

const HomePage: React.FC = () => {
  // Preload critical assets
  usePreloadAssets();

  return (
    <>
      <Helmet>
        <title>{homepageMetadata.title}</title>
        <meta name="description" content={homepageMetadata.description} />
        <meta name="keywords" content={homepageMetadata.keywords.join(", ")} />
        <link rel="canonical" href={homepageMetadata.canonical} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content={homepageMetadata.openGraph.type} />
        <meta property="og:url" content={homepageMetadata.openGraph.url} />
        <meta property="og:title" content={homepageMetadata.openGraph.title} />
        <meta
          property="og:description"
          content={homepageMetadata.openGraph.description}
        />
        <meta property="og:image" content={homepageMetadata.openGraph.image} />
        <meta
          property="og:site_name"
          content={homepageMetadata.openGraph.siteName}
        />

        {/* Twitter */}
        <meta name="twitter:card" content={homepageMetadata.twitter.card} />
        <meta name="twitter:title" content={homepageMetadata.twitter.title} />
        <meta
          name="twitter:description"
          content={homepageMetadata.twitter.description}
        />
        <meta name="twitter:image" content={homepageMetadata.twitter.image} />
      </Helmet>

      <div className="bg-lightning-yellow">
        {/* Above the fold - render immediately */}
        <Banner />

        {/* Below the fold - lazy load */}
        <Suspense fallback={<LoadingFallback />}>
          <GoogleRichSnippet />
          <AboutMenuItems />
          <FullWidthBannerSection
            imagePath="/images/banner/nash-and-smashed-banner-2.jpg"
            altText="Nash and Smashed"
            maxWidthClass="max-w-[1920px]"
          />
          <LocationsCallToAction />
        </Suspense>
      </div>
    </>
  );
};

export default HomePage;
