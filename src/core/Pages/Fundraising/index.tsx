import React, { useRef, useEffect } from "react";
import { Helmet } from "react-helmet";
import { animatePageElements } from "./gsap";
import FundraisingSteps from "./FundraisingSteps";
import FundraisingFAQ from "./FundraisingFAQ";
import EligibilityCriteria from "./EligibilityCriteria";
import Hero from "./Hero";
import FundraisingForm from "./FundraisingForm";
import { getFundraisingMetadata } from "./meta";

const FundraisingPage: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const pageMeta = getFundraisingMetadata();

  useEffect(() => {
    if (heroRef.current && formRef.current) {
      animatePageElements({
        heroRef,
        formRef,
      });
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>{pageMeta.title}</title>
        <meta name="description" content={pageMeta.description} />
        <meta name="keywords" content={pageMeta.keywords?.join(", ")} />

        {/* Open Graph / Facebook */}
        <meta
          property="og:title"
          content={pageMeta.ogTitle || pageMeta.title}
        />
        <meta
          property="og:description"
          content={pageMeta.ogDescription || pageMeta.description}
        />
        <meta property="og:image" content={pageMeta.ogImage} />
        <meta property="og:url" content={pageMeta.canonical} />
        <meta property="og:type" content={pageMeta.ogType} />

        {/* Twitter */}
        <meta name="twitter:card" content={pageMeta.twitterCard} />
        <meta
          name="twitter:title"
          content={pageMeta.ogTitle || pageMeta.title}
        />
        <meta
          name="twitter:description"
          content={pageMeta.ogDescription || pageMeta.description}
        />
        <meta name="twitter:image" content={pageMeta.ogImage} />

        {/* Canonical */}
        <link rel="canonical" href={pageMeta.canonical} />

        {/* Structured Data */}
        {pageMeta.structuredData && (
          <script type="application/ld+json">
            {JSON.stringify(pageMeta.structuredData)}
          </script>
        )}
      </Helmet>

      {/* Hero Section */}
      <Hero heroRef={heroRef} />

      {/* Fundraising Steps */}
      <FundraisingSteps />

      {/* Eligibility Criteria */}
      <EligibilityCriteria />

      {/* Fundraising Form */}
      <FundraisingForm formRef={formRef} />

      {/* FAQ Section */}
      <FundraisingFAQ />

      {/* Footer CTA */}
      <section className="py-16 bg-lightning-yellow-100">
        <div className="container max-w-4xl px-4 mx-auto text-center">
          <h2 className="mb-6 text-4xl font-bold cosmic-lager text-bronzetone-800">
            Ready to Start Your Fundraiser?
          </h2>
          <p className="mb-8 text-xl american text-bronzetone-700">
            Join hundreds of organizations who've successfully raised funds with
            Nash & Smashed.
          </p>
          <a
            href="#fundraising-form"
            className="inline-block px-8 py-4 text-xl font-bold text-white transition-colors rounded-lg bg-lightning-yellow-500 cosmic-lager hover:bg-lightning-yellow-600"
          >
            Apply Today
          </a>
        </div>
      </section>
    </>
  );
};

export default FundraisingPage;
