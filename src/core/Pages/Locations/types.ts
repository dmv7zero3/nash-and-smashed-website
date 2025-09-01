import { Location } from "@/core/constants/locations";

export interface LocationFiltersProps {
  filter: "all" | "active" | "coming-soon";
  setFilter: (filter: "all" | "active" | "coming-soon") => void;
  countryFilter: string;
  setCountryFilter: (country: string) => void;
  countries: string[];
}

export interface LocationCardProps {
  location: Location;
}

export interface GroupedLocations {
  [country: string]: {
    [state: string]: Location[];
  };
}

export interface LocationPageData {
  id: string;
  path: string;
  name: string;
  country: string;
  city: string;
}
