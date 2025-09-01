export interface Location {
  id: string;
  name: string;
  address?: string;
  city: string;
  state: string;
  zipCode?: string;
  country: string;
  status: "active" | "coming-soon";
  fullAddress?: string;
  googleMapsUrl?: string;
  phone?: string;
  email?: string;
  isHeadquarters?: boolean;
}

export const headquarters = {
  id: "headquarters",
  name: "Headquarters",
  address: "5609 Sandy Lewis Drive, Unit G & H",
  city: "Fairfax",
  state: "VA",
  zipCode: "22032",
  country: "USA",
  status: "active" as const,
  fullAddress: "5609 Sandy Lewis Drive, Unit G & H, Fairfax, VA 22032",
  isHeadquarters: true,
};

export const locations: Location[] = [
  // Virginia - Active Locations
  {
    id: "manassas",
    name: "Manassas",
    address: "12853 Galveston Ct",
    city: "Manassas",
    state: "VA",
    zipCode: "20112",
    country: "USA",
    status: "active",
    fullAddress: "12853 Galveston Ct, Manassas, VA 20112, USA",
    googleMapsUrl: "https://maps.app.goo.gl/rKVJHdrT8f1LUsSM9",
    phone: "571-762-2677",
    email: "kaziarif393@gmail.com",
  },
  {
    id: "dumfries",
    name: "Dumfries",
    address: "3934 Fettler Park Dr",
    city: "Dumfries",
    state: "VA",
    zipCode: "22025",
    country: "USA",
    status: "active",
    fullAddress: "3934 Fettler Park Dr, Dumfries, VA 22025",
    googleMapsUrl: "https://maps.app.goo.gl/A7P3FFjrgskU5Ap97",
    phone: "571-370-5177",
    email: "Shohrab61@yahoo.com",
  },
  {
    id: "hampton",
    name: "Hampton",
    address: "36 Coliseum Xing",
    city: "Hampton",
    state: "VA",
    zipCode: "23666",
    country: "USA",
    status: "active",
    fullAddress: "36 Coliseum Xing, Hampton, VA 23666",
    googleMapsUrl: "https://maps.app.goo.gl/AoCwAfsdgwk2BDkk9",
    phone: "757-347-0717",
    email: "talhamughal553@gmail.com",
  },
  // Virginia - Coming Soon

  {
    id: "alexandria",
    name: "Alexandria",
    address: "7609 Richmond Hwy",
    city: "Alexandria",
    state: "VA",
    zipCode: "22306",
    country: "USA",
    status: "coming-soon",
    email: "Farhan-mushtaq@hotmail.com",
  },
  {
    id: "arlington",
    name: "Arlington",
    address: "301 N Glebe Rd",
    city: "Arlington",
    state: "VA",
    zipCode: "22203",
    country: "USA",
    status: "coming-soon",
    email: "ahmedrajumd34@gmail.com",
  },
  {
    id: "norfolk",
    name: "Norfolk",
    address: "4820 Hampton Blvd",
    city: "Norfolk",
    state: "VA",
    zipCode: "23508",
    country: "USA",
    status: "active",
    phone: "571-242-5230",
    googleMapsUrl: "https://maps.app.goo.gl/b8bivDNQorJeyxYC6",
    email: "talhamughal553@gmail.com",
  },
  {
    id: "woodbridge",
    name: "Woodbridge",
    address: "",
    city: "Woodbridge",
    state: "VA",
    zipCode: "",
    country: "USA",
    status: "coming-soon",
    email: "ahmedrajumd34@gmail.com",
  },
  {
    id: "lorton",
    name: "Lorton",
    address: "7722 Gunston Plz",
    city: "Lorton",
    state: "VA",
    zipCode: "22079",
    country: "USA",
    status: "coming-soon",
    email: "Akramkhan1991@gmail.com",
  },
  {
    id: "glen-allen",
    name: "Glen Allen",
    address: "10174 W Broad St",
    city: "Glen Allen",
    state: "VA",
    zipCode: "23060",
    country: "USA",
    status: "coming-soon",
    email: "apanwer@hotmail.com",
  },
  {
    id: "reston",
    name: "Reston",
    address: "1675 Reston Pkwy, Suite N",
    city: "Reston",
    state: "VA",
    zipCode: "20194",
    country: "USA",
    status: "coming-soon",
    email: "nhassan@columbiataxservice.com",
  },
  {
    id: "manassas-park",
    name: "Manassas Park",
    address: "9153 Manassas Dr",
    city: "Manassas Park",
    state: "VA",
    zipCode: "20111",
    country: "USA",
    status: "coming-soon",
    email: "Mailtouddin@gmail.com",
  },
  {
    id: "warrenton",
    name: "Warrenton",
    address: "131-133 W Lee Hwy",
    city: "Warrenton",
    state: "VA",
    zipCode: "20186",
    country: "USA",
    status: "coming-soon",
    email: "Mailtouddin@gmail.com",
  },

  // Maryland - Active Locations
  {
    id: "silver-spring",
    name: "Silver Spring",
    address: "10121 Colesville Rd Unit #10",
    city: "Silver Spring",
    state: "MD",
    zipCode: "20901",
    country: "USA",
    status: "active",
    fullAddress: "10121 Colesville Rd, Unit #10, Silver Spring, MD 20901",
    googleMapsUrl: "https://maps.app.goo.gl/zQE3wEQaDT367m6D7",
    phone: "301-783-3907",
    email: "1833sa@gmail.com",
  },
  {
    id: "baltimore",
    name: "Baltimore",
    address: "1118 S Charles St",
    city: "Baltimore",
    state: "MD",
    zipCode: "21230",
    country: "USA",
    status: "active",
    fullAddress: "1118 S Charles St, Baltimore, MD 21230",
    googleMapsUrl: "https://maps.app.goo.gl/bN1Uq6yY6wxwf9SS7",
    phone: "410-774-6606",
    email: "farhanalina55@gmail.com",
  },

  // Maryland - Coming Soon
  {
    id: "abingdon",
    name: "Abingdon",
    address: "3456 Emmorton Rd",
    city: "Abingdon",
    state: "MD",
    zipCode: "21009",
    country: "USA",
    status: "coming-soon",
    email: "Emtiagrafi@gmail.com",
  },
  {
    id: "district-heights",
    name: "District Heights",
    address: "7704 Marlboro Pike",
    city: "District Heights",
    state: "MD",
    zipCode: "20747",
    country: "USA",
    status: "coming-soon",
    email: "Eshaan.murad@gmail.com",
  },
  {
    id: "temple-hills",
    name: "Temple Hills",
    address: "",
    city: "Temple Hills",
    state: "MD",
    zipCode: "",
    country: "USA",
    status: "coming-soon",
    email: "kaziarif393@gmail.com",
  },

  {
    id: "lanham",
    name: "Lanham",
    address: "9329 Annapolis Rd #3120",
    city: "Lanham",
    state: "MD",
    zipCode: "20706",
    country: "USA",
    status: "coming-soon",
    email: "Alpinaali@gmail.com",
  },

  // Washington D.C. - Active Locations
  {
    id: "connecticut-ave-nw",
    name: "Connecticut Ave NW",
    address: "5030 Connecticut Ave, NW",
    city: "Washington",
    state: "DC",
    zipCode: "20008",
    country: "USA",
    status: "active",
    fullAddress: "5030 Connecticut Ave, NW, Washington DC 20008",
    phone: "202-505-8405",
    googleMapsUrl: "https://maps.app.goo.gl/Jhstwh4Tt91EbtHi6",
    email: "Ahsanmughal0409@gmail.com",
  },
  // Washington D.C. - Coming Soon Locations
  {
    id: "h-st-ne",
    name: "H St NE",
    address: "901 H St NE",
    city: "Washington",
    state: "DC",
    zipCode: "20002",
    country: "USA",
    status: "coming-soon",
    email: "Islam100p@gmail.com",
  },
  {
    id: "michigan-ave-ne",
    name: "Michigan Ave NE",
    address: "655 Michigan Ave NE, Monroe St NE Market",
    city: "Washington",
    state: "DC",
    zipCode: "20017",
    country: "USA",
    status: "coming-soon",
    email: "basitraj77@gmail.com",
  },
  {
    id: "southeast",
    name: "Southeast",
    address: "1208 Maple View Pl SE",
    city: "Washington",
    state: "DC",
    zipCode: "20020",
    country: "USA",
    status: "coming-soon",
    email: "Patwary4975@icloud.com",
  },

  // United Kingdom - Active Locations (Updated from Coming Soon)
  {
    id: "chelmsford",
    name: "Chelmsford",
    address: "6b Baddow Rd",
    city: "Chelmsford",
    state: "Essex",
    zipCode: "CM2 0DG",
    country: "UK",
    status: "active",
    fullAddress: "6b Baddow Rd, Chelmsford, Essex, CM2 0DG",
    phone: "1245611468",
    email: "info@wms-trust.co.uk",
  },
];
export const getLocationsByStatus = (
  status: "active" | "coming-soon"
): Location[] => {
  return locations.filter((location) => location.status === status);
};

export const getLocationsByState = (state: string): Location[] => {
  return locations.filter((location) => location.state === state);
};

export const getLocationsByCountry = (country: string): Location[] => {
  return locations.filter((location) => location.country === country);
};

export const getActiveLocations = (): Location[] =>
  getLocationsByStatus("active");
export const getComingSoonLocations = (): Location[] =>
  getLocationsByStatus("coming-soon");

export const getLocationGroups = () => {
  // Get all locations except headquarters
  const allLocations = locations.filter((location) => !location.isHeadquarters);

  const groups: { [key: string]: Location[] } = {};

  allLocations.forEach((location) => {
    let groupKey = "";

    // Group by country/region and status
    if (location.country === "USA") {
      if (location.state === "VA") {
        groupKey = "Virginia";
      } else if (location.state === "MD") {
        groupKey = "Maryland";
      } else if (location.state === "DC") {
        groupKey = "Washington D.C.";
      } else {
        groupKey = `${location.state}, USA`;
      }
    } else if (location.country === "UK") {
      groupKey = "United Kingdom";
    } else {
      groupKey = location.country;
    }

    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(location);
  });

  return groups;
};

export const getLocationDisplayValue = (location: Location) => {
  const baseValue =
    location.country === "USA"
      ? `${location.city}, ${location.state}`
      : location.country === "UK"
      ? `${location.city}, ${location.state}`
      : `${location.city}, ${location.country}`;

  // Add status indicator for coming-soon locations
  return location.status === "coming-soon"
    ? `${baseValue} (Coming Soon)`
    : baseValue;
};

export const getLocationOptionText = (location: Location) => {
  const displayValue = getLocationDisplayValue(location);
  return location.name !== location.city && location.name
    ? `${displayValue} (${location.name})`
    : displayValue;
};
