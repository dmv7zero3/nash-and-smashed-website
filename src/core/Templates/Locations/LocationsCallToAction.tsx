import React from "react";
import { Link } from "react-router-dom";

const LocationsCallToAction: React.FC = () => {
  return (
    <section className="py-16 text-white bg-black">
      <div className="container px-4 mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-lightning-yellow-400 american">
            Find Your Nearest Location
          </h1>
          <div className="w-24 h-1 mx-auto mt-4 mb-6 bg-lightning-yellow-400"></div>
          <p className="max-w-2xl mx-auto text-white/90 american">
            We're serving our delicious Nashville Style Chicken and Smashed
            Burgers in both the US and UK. Click below to find the nearest
            restaurant.
          </p>
        </div>
        {/* Location buttons - column on mobile, row on desktop */}
        <div className="flex flex-col space-y-8 md:flex-row md:space-y-0 md:space-x-12 md:justify-center md:items-stretch">
          {/* USA Button */}
          <div className="flex-1 max-w-sm mx-auto transition-transform duration-300 md:max-w-none md:mx-0 hover:scale-105">
            <Link to="/locations" className="flex flex-col h-full">
              <div className="relative flex-grow group">
                <div className="absolute inset-0 transition-all duration-300 rounded-full bg-lightning-yellow-400/30 blur-md group-hover:bg-lightning-yellow-400/50"></div>
                <picture>
                  <source
                    srcSet="/images/buttons/usa-button.webp"
                    type="image/webp"
                  />
                  <img
                    src="/images/buttons/usa-button.png"
                    alt="USA Locations"
                    className="relative w-full h-auto"
                    width="300"
                    height="300"
                    loading="lazy"
                  />
                </picture>
              </div>
              <p className="mt-4 text-xl text-center text-white cosmic-lager">
                United States
              </p>
            </Link>
          </div>

          {/* UK Button */}
          <div className="flex-1 max-w-sm mx-auto transition-transform duration-300 md:max-w-none md:mx-0 hover:scale-105">
            <Link
              to="/locations/uk/chelmsford"
              className="flex flex-col h-full"
            >
              <div className="relative flex-grow group">
                <div className="absolute inset-0 transition-all duration-300 rounded-full bg-lightning-yellow-400/30 blur-md group-hover:bg-lightning-yellow-400/50"></div>
                <picture>
                  <source
                    srcSet="/images/buttons/uk-button.webp"
                    type="image/webp"
                  />
                  <img
                    src="/images/buttons/uk-button.png"
                    alt="UK Locations"
                    className="relative w-full h-auto"
                    width="300"
                    height="300"
                    loading="lazy"
                  />
                </picture>
              </div>
              <p className="mt-4 text-xl text-center text-white cosmic-lager">
                United Kingdom
              </p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationsCallToAction;
