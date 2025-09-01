import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { FaExternalLinkAlt } from "react-icons/fa";
import { MEDIA_LINKS } from "@/core/constants/mediaLinks";
import SearchBar from "./SearchBar";
import { animateMediaLinks } from "./gsap";
import Hero from "./Hero";
import ArrowButton from "@/core/ui/Buttons/ArrowButton";

const MediaLinksPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredLinks, setFilteredLinks] = useState(MEDIA_LINKS);

  // Refs for animations
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const mediaItemsRef = useRef<HTMLDivElement>(null);

  // Filter media links based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredLinks(MEDIA_LINKS);
      return;
    }

    const filtered = MEDIA_LINKS.filter(
      (link) =>
        link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        link.source.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredLinks(filtered);
  }, [searchTerm]);

  // Initialize animations when component mounts
  useEffect(() => {
    const ctx = animateMediaLinks({
      containerRef,
      titleRef,
      descriptionRef,
      mediaItemsRef,
    });

    // Clean up animations on component unmount
    return () => ctx.revert();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <Helmet>
        <title>Media Coverage | Nash & Smashed</title>
        <meta
          name="description"
          content="Nash & Smashed in the news - check out our latest media coverage and press mentions"
        />
      </Helmet>

      <Hero />

      <div ref={containerRef} className="container px-4 py-16 mx-auto">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h2
            ref={titleRef}
            className="mb-4 text-3xl font-bold md:text-4xl halyard-display"
          >
            Press & Media Mentions
          </h2>
          <p ref={descriptionRef} className="text-lg text-gray-700">
            See what people are saying about Nash & Smashed in publications
            across the DMV area and beyond.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <SearchBar value={searchTerm} onChange={handleSearchChange} />

          {filteredLinks.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-xl text-gray-600">
                No media articles found matching your search.
              </p>
              <button
                className="mt-4 font-medium text-lightning-yellow-600 hover:text-lightning-yellow-700"
                onClick={() => setSearchTerm("")}
              >
                Clear search
              </button>
            </div>
          ) : (
            <div ref={mediaItemsRef} className="space-y-4">
              {filteredLinks.map((link, index) => (
                <div
                  key={index}
                  className="p-5 transition-shadow bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="mb-1 text-lg font-semibold">
                        {link.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Source: {link.source}
                      </p>
                    </div>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lightning-yellow-600 hover:text-lightning-yellow-700"
                      aria-label={`Read article: ${link.title}`}
                    >
                      <FaExternalLinkAlt />
                    </a>
                  </div>
                  <div className="mt-4 text-right">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-lightning-yellow-600 hover:text-lightning-yellow-700"
                    >
                      Read Article
                      <FaExternalLinkAlt className="w-3 h-3 ml-1" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredLinks.length > 0 && (
            <div className="mt-12 text-center">
              <ArrowButton
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                alignRight={false}
                className="!bg-dark-olive-bark hover:!bg-dark-olive-bark/90"
              >
                Back to Top
              </ArrowButton>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MediaLinksPage;
