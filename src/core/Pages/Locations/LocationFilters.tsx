import React from "react";
import { LocationFiltersProps } from "./types";
import { FaFilter, FaGlobeAmericas } from "react-icons/fa";
import ReactCountryFlag from "react-country-flag";

const LocationFilters: React.FC<LocationFiltersProps> = ({
  filter,
  setFilter,
  countryFilter,
  setCountryFilter,
  countries,
}) => {
  // Get country code for flag
  const getCountryCode = (country: string): string => {
    switch (country) {
      case "UK":
        return "GB";
      case "USA":
        return "US";
      default:
        return country;
    }
  };

  return (
    <div className="flex flex-wrap justify-center max-w-5xl gap-6 mx-auto mb-12">
      {/* Mobile tabs for switching between filter types */}
      <div className="w-full sm:hidden">
        <div className="flex max-w-xs mx-auto mb-6 overflow-hidden border-2 rounded-lg border-lightning-yellow-300">
          <button
            className={`flex-1 py-2 px-3 text-center text-sm font-medium transition-colors ${
              filter !== "all" || countryFilter !== "all"
                ? ""
                : "bg-lightning-yellow-100"
            }`}
            onClick={() => {
              setFilter("all");
              setCountryFilter("all");
            }}
          >
            All
          </button>
          <button
            className={`flex-1 py-2 px-3 text-center text-sm font-medium transition-colors ${
              filter === "active" && countryFilter === "all"
                ? "bg-lightning-yellow-100"
                : ""
            }`}
            onClick={() => {
              setFilter("active");
              setCountryFilter("all");
            }}
          >
            Open
          </button>
          <button
            className={`flex-1 py-2 px-3 text-center text-sm font-medium transition-colors ${
              filter === "coming-soon" && countryFilter === "all"
                ? "bg-lightning-yellow-100"
                : ""
            }`}
            onClick={() => {
              setFilter("coming-soon");
              setCountryFilter("all");
            }}
          >
            Coming Soon
          </button>
        </div>
      </div>

      {/* Container for both filter sections */}
      <div className="flex flex-col justify-center w-full gap-8 lg:flex-row">
        {/* Status Filter Section - Hidden on small mobile screens, visible on sm and up */}
        <div className="hidden w-full sm:block lg:w-1/2">
          <div className="flex items-center justify-center mb-4">
            <FaFilter className="mr-2 text-lightning-yellow-500" />
            <h3 className="text-base font-semibold open-sans text-bronzetone-900">
              Filter by Status
            </h3>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <label
              className={`flex items-center px-4 py-2 border-2 rounded-lg cursor-pointer transition-all ${
                filter === "all"
                  ? "bg-lightning-yellow-100 border-lightning-yellow-500 text-bronzetone-900 shadow-md"
                  : "bg-transparent border-lightning-yellow-200 text-bronzetone-900 hover:border-lightning-yellow-300"
              }`}
            >
              <input
                type="radio"
                name="status-filter"
                value="all"
                checked={filter === "all"}
                onChange={() => setFilter("all")}
                className="hidden"
              />
              <span className="font-medium source-sans-semibold">
                All Locations
              </span>
            </label>

            <label
              className={`flex items-center px-4 py-2 border-2 rounded-lg cursor-pointer transition-all ${
                filter === "active"
                  ? "bg-lightning-yellow-100 border-lightning-yellow-500 text-bronzetone-900 shadow-md"
                  : "bg-transparent border-lightning-yellow-200 text-bronzetone-900 hover:border-lightning-yellow-300"
              }`}
            >
              <input
                type="radio"
                name="status-filter"
                value="active"
                checked={filter === "active"}
                onChange={() => setFilter("active")}
                className="hidden"
              />
              <span className="font-medium source-sans-semibold">
                Open Locations
              </span>
            </label>

            <label
              className={`flex items-center px-4 py-2 border-2 rounded-lg cursor-pointer transition-all ${
                filter === "coming-soon"
                  ? "bg-lightning-yellow-100 border-lightning-yellow-500 text-bronzetone-900 shadow-md"
                  : "bg-transparent border-lightning-yellow-200 text-bronzetone-900 hover:border-lightning-yellow-300"
              }`}
            >
              <input
                type="radio"
                name="status-filter"
                value="coming-soon"
                checked={filter === "coming-soon"}
                onChange={() => setFilter("coming-soon")}
                className="hidden"
              />
              <span className="font-medium source-sans-semibold">
                Coming Soon
              </span>
            </label>
          </div>
        </div>

        {/* Country Filter Section */}
        <div className="w-full mt-6 lg:w-1/2 lg:mt-0">
          <div className="flex items-center justify-center mb-4">
            <FaGlobeAmericas className="mr-2 text-lightning-yellow-500" />
            <h3 className="text-base font-semibold open-sans text-bronzetone-900">
              {countries.length <= 2 ? "Country" : "Filter by Country"}
            </h3>
          </div>

          {/* Country selection as buttons on mobile */}
          <div className={`flex flex-wrap justify-center gap-4`}>
            {countries.length <= 2 ? (
              // Simplified layout for when there are only 2 or fewer countries
              <div className="flex justify-center w-full gap-3">
                {countries.map((country) => (
                  <label
                    key={country}
                    className={`flex-1 flex items-center justify-center px-4 py-3 border-2 rounded-lg cursor-pointer transition-all max-w-[120px] ${
                      countryFilter === country
                        ? "bg-lightning-yellow-100 font-bold border-lightning-yellow-500 text-bronzetone-900 shadow-md"
                        : "bg-transparent font-normal border-lightning-yellow-200 text-bronzetone-900 hover:border-lightning-yellow-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="country-filter"
                      value={country}
                      checked={countryFilter === country}
                      onChange={() => setCountryFilter(country)}
                      className="hidden"
                    />
                    <ReactCountryFlag
                      countryCode={getCountryCode(country)}
                      style={{
                        fontSize: "1.5em",
                        marginRight: "8px",
                      }}
                      svg
                    />
                    <span className="open-sans">{country}</span>
                  </label>
                ))}
                <label
                  className={`flex-1 flex items-center justify-center px-4 py-3 border-2 rounded-lg cursor-pointer transition-all max-w-[120px] ${
                    countryFilter === "all"
                      ? "bg-lightning-yellow-100 border-lightning-yellow-500 text-bronzetone-900 shadow-md"
                      : "bg-transparent border-lightning-yellow-200 text-bronzetone-900 hover:border-lightning-yellow-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="country-filter"
                    value="all"
                    checked={countryFilter === "all"}
                    onChange={() => setCountryFilter("all")}
                    className="hidden"
                  />
                  <span className="open-sans">All</span>
                </label>
              </div>
            ) : (
              // Original design for more countries
              <>
                <label
                  className={`flex items-center px-4 py-2 border-2 rounded-lg cursor-pointer transition-all ${
                    countryFilter === "all"
                      ? "bg-lightning-yellow-100 border-lightning-yellow-500 text-bronzetone-900 shadow-md"
                      : "bg-transparent border-lightning-yellow-200 text-bronzetone-900 hover:border-lightning-yellow-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="country-filter"
                    value="all"
                    checked={countryFilter === "all"}
                    onChange={() => setCountryFilter("all")}
                    className="hidden"
                  />
                  <span className="open-sans">All Countries</span>
                </label>

                {countries.map((country) => (
                  <label
                    key={country}
                    className={`flex items-center px-4 py-2 border-2 rounded-lg cursor-pointer transition-all ${
                      countryFilter === country
                        ? "bg-lightning-yellow-100 font-bold border-lightning-yellow-500 text-bronzetone-900 shadow-md"
                        : "bg-transparent font-normal border-lightning-yellow-200 text-bronzetone-900 hover:border-lightning-yellow-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="country-filter"
                      value={country}
                      checked={countryFilter === country}
                      onChange={() => setCountryFilter(country)}
                      className="hidden"
                    />
                    <ReactCountryFlag
                      countryCode={getCountryCode(country)}
                      style={{
                        fontSize: "1.5em",
                        marginRight: "8px",
                      }}
                      svg
                    />
                    <span className="open-sans">{country}</span>
                  </label>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationFilters;
