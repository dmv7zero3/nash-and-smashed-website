// src/core/Pages/Contact/MapSection.tsx
import React from "react";
import { MapSectionProps } from "./types";
import { headquarters } from "@/core/constants/locations";

const MapSection: React.FC<MapSectionProps> = ({ mapEmbedUrl }) => {
  // Generate a Google Maps embed URL based on the headquarters address if none is provided
  const embedUrl =
    mapEmbedUrl ||
    `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(
      headquarters.fullAddress
    )}`;

  return (
    <section className="py-12 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto">
          <h2 className="mb-8 text-center text-dark-olive-bark american">
            Find Us
          </h2>

          <div className="mb-4 text-center">
            <p className="text-lg american">{headquarters.fullAddress}</p>
          </div>

          <div className="overflow-hidden rounded-lg shadow-lg h-[400px]">
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title={`Nash & Smashed Headquarters - ${headquarters.fullAddress}`}
            ></iframe>
          </div>

          <div className="mt-6 text-center">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                headquarters.fullAddress
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 text-base font-medium transition-all rounded-md text-dark-olive-bark border-lightning-yellow-500 bg-lightning-yellow-400 hover:bg-lightning-yellow-500"
            >
              Get Directions
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
