import React from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import { getActiveLocations } from "@/core/constants/locations";

const LocationsCallToAction: React.FC = () => {
  // Get the number of active locations to display
  const activeLocationsCount = getActiveLocations().length;

  return (
    <section className="py-16 bg-white">
      <div className="container px-4 mx-auto">
        <div className="overflow-hidden bg-bronzetone-800 rounded-xl">
          <div className="flex flex-col md:flex-row">
            {/* Image Side */}
            <div className="relative md:w-1/2">
              <div className="absolute inset-0 z-10 bg-black/30"></div>
              <div
                className="h-64 bg-center bg-cover md:h-full"
                style={{ backgroundImage: "url('/images/storefront.jpg')" }}
              ></div>
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-white rounded-full text-bronzetone-800">
                  <FaMapMarkerAlt
                    size={28}
                    className="text-lightning-yellow-500"
                  />
                </div>
                <h3 className="mb-2 text-2xl font-bold text-white thismonster-default">
                  {activeLocationsCount} Locations
                </h3>
                <p className="text-white/80 proxima-regular">...and growing!</p>
              </div>
            </div>

            {/* Content Side */}
            <div className="p-8 md:p-12 md:w-1/2">
              <h2 className="mb-4 text-3xl font-bold text-white thismonster-default">
                Find a Nash & Smashed Near You
              </h2>
              <div className="w-16 h-1 mb-6 bg-lightning-yellow-400"></div>
              <p className="mb-8 text-lg text-white/90 source-sans-regular">
                Craving our Nashville-style chicken or smashed burgers? We're
                expanding quickly across the country with new locations opening
                every month. Use our location finder to discover the nearest
                Nash & Smashed restaurant.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/locations"
                  className="inline-flex items-center px-6 py-3 font-bold transition-all rounded-md bg-lightning-yellow-500 hover:bg-lightning-yellow-400 text-bronzetone-900 group"
                >
                  <span>View All Locations</span>
                  <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  to="/locations?filter=coming-soon"
                  className="inline-flex items-center px-6 py-3 font-bold transition-all border border-white rounded-md text-lightning-yellow-400 hover:bg-white/10"
                >
                  Coming Soon
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationsCallToAction;
