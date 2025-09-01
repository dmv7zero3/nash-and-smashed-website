import React, { forwardRef } from "react";
import { LocationCardProps } from "./types";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaExternalLinkAlt,
  FaShoppingBag,
  FaStore,
} from "react-icons/fa";
import { ORDER_ONLINE_URL } from "@/core/constants/business";

const LocationCard = forwardRef<HTMLDivElement, LocationCardProps>(
  ({ location }, ref) => {
    // Function to determine if this location has a dedicated page
    const hasDetailPage = () => {
      if (location.country === "UK" && location.city === "Chelmsford") {
        return true;
      }
      return false;
    };

    // Function to generate the location detail page URL
    const getLocationUrl = () => {
      if (location.country === "UK" && location.city === "Chelmsford") {
        return "/locations/uk/chelmsford";
      }
      return "#";
    };

    // Check if location is in the UK
    const isUKLocation = location.country === "UK";

    return (
      <div
        ref={ref}
        className="overflow-hidden transition duration-300 transform bg-white rounded-lg shadow-lg source-sans-semibold hover:scale-105"
      >
        <div className="relative p-6">
          {/* Status badge moved to top right with improved contrast */}
          <div className="absolute top-4 right-4">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                location.status === "active"
                  ? "bg-green-500 text-white"
                  : "bg-yellow-500 text-white"
              }`}
            >
              {location.status === "active" ? "Now Open" : "Coming Soon"}
            </span>
          </div>

          <h3 className="mb-2 text-lg font-bold open-sans">{location.name}</h3>
          {location.status === "active" ? (
            <div className="space-y-3">
              <div>
                <p className="text-gray-700">
                  <FaMapMarkerAlt className="inline mr-2 text-lightning-yellow-500" />
                  {location.fullAddress ||
                    `${location.address}, ${location.city}, ${location.state} ${location.zipCode}`}
                </p>
              </div>

              {location.phone && (
                <p className="text-gray-700">
                  <FaPhone className="inline mr-2 text-lightning-yellow-500" />
                  <a
                    href={`tel:${location.phone}`}
                    className="hover:text-lightning-yellow-500"
                  >
                    {location.phone}
                  </a>
                </p>
              )}

              <div className="flex flex-wrap gap-2 mt-4">
                {location.googleMapsUrl && (
                  <a
                    href={location.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md bg-lightning-yellow-100 text-bronzetone-700 hover:bg-lightning-yellow-200"
                  >
                    <FaMapMarkerAlt className="mr-1.5" />
                    Directions
                  </a>
                )}

                {/* Order Online button - only show for non-UK locations */}
                {!isUKLocation && (
                  <a
                    href={ORDER_ONLINE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-white transition-colors duration-200 rounded-md bg-bronzetone-700 hover:bg-bronzetone-600"
                  >
                    <FaShoppingBag className="mr-1.5" />
                    Order Online
                  </a>
                )}

                {hasDetailPage() && (
                  <Link
                    to={getLocationUrl()}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-white transition-colors duration-200 rounded-md bg-dark-olive-bark hover:bg-dark-olive-bark/80"
                  >
                    <FaStore className="mr-1.5" />
                    View Location
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <div>
              <p className="mb-3 italic font-normal text-gray-700">
                Coming soon to {location.city}
              </p>

              {/* Add Google Maps link if available */}
              {location.googleMapsUrl && (
                <div className="flex flex-wrap gap-2 mt-4">
                  <a
                    href={location.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md bg-lightning-yellow-100 text-bronzetone-700 hover:bg-lightning-yellow-200"
                  >
                    <FaMapMarkerAlt className="mr-1.5" />
                    View on Map
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);

LocationCard.displayName = "LocationCard";

export default LocationCard;
