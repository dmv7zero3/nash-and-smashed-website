import React, { useState, useMemo, useRef, createRef } from "react";
import {
  getActiveLocations,
  getComingSoonLocations,
  Location,
} from "@/core/constants/locations";
import LocationCard from "./LocationCard";
import LocationFilters from "./LocationFilters";
import { GroupedLocations } from "./types";
import { useLocationAnimations } from "./gsap";
import { Link } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";

import { FaMapMarkedAlt } from "react-icons/fa";
import FullWidthBannerSection from "@/core/Templates/FullWidthBannerSection";
import Hero from "@/core/Templates/Hero";

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

const LocationsPage: React.FC = () => {
  const [filter, setFilter] = useState<"all" | "active" | "coming-soon">("all");
  const [countryFilter, setCountryFilter] = useState<string>("all");

  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch locations data
  const activeLocations = useMemo(() => getActiveLocations(), []);
  const comingSoonLocations = useMemo(() => getComingSoonLocations(), []);
  const allLocations = useMemo(
    () => [...activeLocations, ...comingSoonLocations],
    [activeLocations, comingSoonLocations]
  );

  // Get unique countries for filter dropdown
  const countries = useMemo(() => {
    const uniqueCountries = new Set(
      allLocations.map((location) => location.country)
    );
    return Array.from(uniqueCountries);
  }, [allLocations]);

  // Apply filters
  const filteredLocations = useMemo(() => {
    let locations = allLocations;

    // Filter by status
    if (filter === "active") {
      locations = activeLocations;
    } else if (filter === "coming-soon") {
      locations = comingSoonLocations;
    }

    // Filter by country
    if (countryFilter !== "all") {
      locations = locations.filter(
        (location) => location.country === countryFilter
      );
    }

    return locations;
  }, [
    allLocations,
    activeLocations,
    comingSoonLocations,
    filter,
    countryFilter,
  ]);

  // Create refs for animation - Fix type to be an array of RefObject<HTMLDivElement>
  const locationCardRefs = useRef<React.RefObject<HTMLDivElement>[]>([]);

  // Update refs array when filtered locations change
  useMemo(() => {
    // Create a new array of refs based on the filtered locations
    locationCardRefs.current = filteredLocations.map(
      (_, i) => locationCardRefs.current[i] || createRef<HTMLDivElement>()
    );
  }, [filteredLocations]);

  // Use animations
  useLocationAnimations({
    containerRef,
    itemsRef: locationCardRefs,
  });

  // Group locations by country and state for organized display
  const groupedLocations = useMemo<GroupedLocations>(() => {
    const grouped: GroupedLocations = {};

    filteredLocations.forEach((location) => {
      if (!grouped[location.country]) {
        grouped[location.country] = {};
      }

      const stateKey = location.state || "Other";
      if (!grouped[location.country][stateKey]) {
        grouped[location.country][stateKey] = [];
      }

      grouped[location.country][stateKey].push(location);
    });

    return grouped;
  }, [filteredLocations]);

  // Track index for assigning refs
  let locationIndex = 0;

  // Check if we have UK locations to highlight the UK page
  const hasUKLocations = useMemo(() => {
    return allLocations.some((location) => location.country === "UK");
  }, [allLocations]);

  return (
    <>
      <Hero
        title={
          <>
            Find a <br />
            Nash & Smashed <br /> Location Near You
          </>
        }
        subtitle="Discover our locations across the globe"
        backgroundImage="/images/banner/meal-at-nash-and-smashed-1.jpg"
      />

      <div
        className="py-16 bg-lightning-yellow bg-opacity-10"
        ref={containerRef}
      >
        <div className="container px-4 mx-auto">
          <div className="mb-12 text-center">
            <div className="w-24 h-1 mx-auto mb-6 bg-lightning-yellow-400"></div>
            <p className="max-w-3xl mx-auto text-4xl cosmic-lager">
              Find a Nash & Smashed location near you. We're expanding quickly
              with new locations opening soon!
            </p>
          </div>

          {/* Featured UK location callout */}
          {hasUKLocations && (
            <div className="p-6 mb-12 bg-white rounded-lg shadow-lg">
              <div className="flex flex-col items-center md:flex-row">
                <div className="w-full mb-6 mr-0 md:mb-0 md:w-1/3 md:mr-8">
                  <img
                    src="/images/banner/nash-and-smashed-banner-5.jpg"
                    alt="Nash & Smashed UK"
                    className="object-cover w-full h-48 rounded-lg"
                  />
                </div>
                <div className="w-full md:w-2/3">
                  <h2 className="mb-2 text-2xl font-bold american text-bronzetone-900">
                    Now Open in the United Kingdom !
                  </h2>
                  <p className="mb-4 text-gray-700">
                    We're excited to offer our delicious Nashville Style
                    Sandwiches, Fried Chicken, and Smashed Burgers at various
                    locations, with new spots opening soon! Click below to
                    locate the nearest restaurant and experience our tasty
                    offerings today!
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      to="/locations/uk/chelmsford"
                      className="inline-flex items-center px-4 py-2 font-medium text-white transition-colors duration-200 rounded-md bg-dark-olive-bark hover:bg-dark-olive-bark/80"
                    >
                      <FaMapMarkedAlt className="mr-2" />
                      Visit UK Location Page
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          <LocationFilters
            filter={filter}
            setFilter={setFilter}
            countryFilter={countryFilter}
            setCountryFilter={setCountryFilter}
            countries={countries}
          />

          {Object.keys(groupedLocations).length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-lg text-gray-500">
                No locations match your filters.
              </p>
            </div>
          ) : (
            Object.entries(groupedLocations).map(([country, stateGroups]) => (
              <div key={country} className="mb-16 ">
                <div className="flex flex-row items-center justify-center mb-8 w-fit">
                  <h2 className="mr-3.5 text-6xl leading-none tracking-wide cosmic-lager">
                    {country}
                  </h2>
                  <ReactCountryFlag
                    countryCode={getCountryCode(country)}
                    style={{
                      fontSize: "3em",
                      verticalAlign: "middle",
                    }}
                    svg
                  />
                </div>
                {Object.entries(stateGroups).map(([state, locations]) => (
                  <div key={state} className="mb-10">
                    <h2 className="mb-6 text-5xl cosmic-lager">{state}</h2>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                      {locations.map((location) => {
                        const currentRef =
                          locationCardRefs.current[locationIndex];
                        locationIndex += 1;
                        return (
                          <LocationCard
                            key={location.id}
                            location={location}
                            ref={currentRef}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
      <FullWidthBannerSection
        imagePath="/images/banner/nash-and-smashed-banner-3.jpg"
        altText="Nash and Smashed"
        maxWidthClass="max-w-[1920px]"
        className="overflow-hidden"
      />
    </>
  );
};

export default LocationsPage;
