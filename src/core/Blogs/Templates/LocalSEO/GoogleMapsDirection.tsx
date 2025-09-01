import React from "react";
import { locations, Location } from "@/core/constants/locations";
import { GOOGLE_MAPS_API_KEY } from "@/core/env/env";

interface GoogleMapsDirectionProps {
  subject: string;
  city: string;
  state: string;
}

// Helper to calculate a simple "distance" between two locations (city/state match, fallback to state match)
function findNearestLocation(
  city: string,
  state: string
): Location | undefined {
  // Try to find an exact city/state match (case-insensitive)
  const exact = locations.find(
    (loc) =>
      loc.city.toLowerCase() === city.toLowerCase() &&
      loc.state.toLowerCase() === state.toLowerCase() &&
      loc.status === "active"
  );
  if (exact) return exact;

  // Fallback: find any active location in the same state
  const stateMatch = locations.find(
    (loc) =>
      loc.state.toLowerCase() === state.toLowerCase() && loc.status === "active"
  );
  if (stateMatch) return stateMatch;

  // Fallback: just return the first active location
  return locations.find((loc) => loc.status === "active");
}
export const GoogleMapsDirection: React.FC<GoogleMapsDirectionProps> = ({
  subject,
  city,
  state,
}) => {
  const nearest = findNearestLocation(city, state);

  if (!nearest) {
    return (
      <section className="flex flex-col items-center my-8 text-white">
        <div className="w-full">
          <h3 className="mb-4 text-xl font-bold text-center text-lightning-yellow lg:text-left cosmic-lager">
            Directions Unavailable
          </h3>
          <p className="text-center">No active store location found.</p>
        </div>
      </section>
    );
  }

  const destination = `${nearest.address}, ${nearest.city}, ${nearest.state} ${nearest.zipCode}`;
  const mapsUrl = nearest.googleMapsUrl
    ? nearest.googleMapsUrl
    : `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
        destination
      )}`;

  return (
    <section className="flex flex-col items-center my-8 text-white">
      <div className="w-full">
        {/* Map Title */}
        <h3 className="mb-4 text-xl font-bold text-center text-lightning-yellow lg:text-left cosmic-lager">
          Directions to {nearest.name}
        </h3>

        {/* Large Map */}
        <div className="w-full h-[400px] relative rounded-lg overflow-hidden">
          <iframe
            title={`Directions to ${nearest.name} from ${city}, ${state}`}
            className="w-full h-full"
            frameBorder="0"
            src={`https://www.google.com/maps/embed/v1/directions?key=${GOOGLE_MAPS_API_KEY}&destination=${encodeURIComponent(
              destination
            )}&origin=${encodeURIComponent(city + ", " + state)}&mode=driving`}
            allowFullScreen
          />
        </div>

        {/* Open in Maps Button */}
        <div className="flex justify-center mt-4 lg:justify-end">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-4 py-2 text-white transition-colors border-2 rounded-md shadow-md border-lightning-yellow/70 hover:bg-lightning-yellow hover:text-black"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
            Open in Google Maps
          </a>
        </div>
      </div>
    </section>
  );
};

export default GoogleMapsDirection;
