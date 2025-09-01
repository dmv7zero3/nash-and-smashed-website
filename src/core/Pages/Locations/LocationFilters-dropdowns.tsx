import React from "react";
import { LocationFiltersProps } from "./types";
import { FaFilter, FaGlobeAmericas } from "react-icons/fa";

const LocationFilters: React.FC<LocationFiltersProps> = ({
  filter,
  setFilter,
  countryFilter,
  setCountryFilter,
  countries,
}) => {
  return (
    <div className="flex flex-wrap justify-center max-w-4xl gap-6 mx-auto mb-12">
      <div className="w-full sm:w-auto min-w-[240px]">
        <label
          htmlFor="status-filter"
          className="flex items-center mb-2 text-base font-medium proxima-bold text-bronzetone-800"
        >
          <FaFilter className="mr-2 text-lightning-yellow-500" />
          Filter by Status
        </label>
        <div className="relative">
          <select
            id="status-filter"
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value as "all" | "active" | "coming-soon")
            }
            className="block w-full px-4 py-3 bg-white border-2 rounded-md shadow-sm appearance-none text-bronzetone-900 border-lightning-yellow-400 focus:outline-none focus:ring-2 focus:ring-lightning-yellow-500 focus:border-transparent source-sans-semibold"
          >
            <option value="all">All Locations</option>
            <option value="active">Open Locations</option>
            <option value="coming-soon">Coming Soon</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-lightning-yellow-500">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="w-full sm:w-auto min-w-[240px]">
        <label
          htmlFor="country-filter"
          className="flex items-center mb-2 text-base font-medium proxima-bold text-bronzetone-800"
        >
          <FaGlobeAmericas className="mr-2 text-lightning-yellow-500" />
          Filter by Country
        </label>
        <div className="relative">
          <select
            id="country-filter"
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
            className="block w-full px-4 py-3 bg-white border-2 rounded-md shadow-sm appearance-none text-bronzetone-900 border-lightning-yellow-400 focus:outline-none focus:ring-2 focus:ring-lightning-yellow-500 focus:border-transparent source-sans-semibold"
          >
            <option value="all">All Countries</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-lightning-yellow-500">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex justify-center w-full mt-3">
        <div className="inline-flex items-center px-3 py-1 text-sm rounded-full bg-lightning-yellow-100 text-bronzetone-700 source-sans-regular">
          <span className="mr-2">💡</span>
          <span>Select filters to narrow down locations</span>
        </div>
      </div>
    </div>
  );
};

export default LocationFilters;
