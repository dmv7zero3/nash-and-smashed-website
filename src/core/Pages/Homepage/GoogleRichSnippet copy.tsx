// src/core/Pages/Homepage/GoogleRichSnippet.tsx
import React from "react";
import {
  BUSINESS_NAME,
  PHONE_NUMBER,
  EMAIL,
  BASE_URL,
} from "@/core/constants/business";
import {
  headquarters,
  locations,
  getActiveLocations,
} from "@/core/constants/locations";
import { SAME_AS } from "@/core/constants/GoogleRichSnippet/sameas";
import { MENU_ITEMS } from "@/core/constants/menuItems";

const ORGANIZATION_IMAGE =
  "https://nashandsmashed.com/images/og-images/nash-and-smashed-banner-og-image.jpg";

const GoogleRichSnippet: React.FC = () => {
  const activeLocations = getActiveLocations();

  const generateLocationData = () => {
    return activeLocations.map((location) => ({
      "@type": "Restaurant",
      name: `${BUSINESS_NAME} ${location.name}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: location.address,
        addressLocality: location.city,
        addressRegion: location.state,
        postalCode: location.zipCode,
        addressCountry: location.country === "UK" ? "GB" : location.country,
      },
      telephone: location.phone || PHONE_NUMBER,
      email: EMAIL,
      url: `https://${BASE_URL}/locations/${
        location.country.toLowerCase() === "uk" ? "uk" : "usa"
      }/${location.id}`,
      priceRange: "$$",
      servesCuisine: [
        "American",
        "Fried Chicken",
        "Nashville Hot Chicken",
        "Burgers",
      ],
      menu: `https://${BASE_URL}/menu`,
      openingHours: "Mo-Su 11:00-22:00",
      acceptsReservations: "Yes",
      hasMap: location.googleMapsUrl || "",
    }));
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Restaurant",
        "@id": `https://${BASE_URL}/#Restaurant`,
        name: BUSINESS_NAME,
        url: `https://${BASE_URL}`,
        logo: `https://${BASE_URL}/logo.png`,
        image: ORGANIZATION_IMAGE,
        email: EMAIL,
        telephone: PHONE_NUMBER,
        address: {
          "@type": "PostalAddress",
          streetAddress: headquarters.address,
          addressLocality: headquarters.city,
          addressRegion: headquarters.state,
          postalCode: headquarters.zipCode,
          addressCountry:
            headquarters.country === "UK" ? "GB" : headquarters.country,
        },
        sameAs: SAME_AS,
      },
      {
        "@type": "WebSite",
        "@id": `https://${BASE_URL}/#website`,
        url: `https://${BASE_URL}`,
        name: BUSINESS_NAME,
        description:
          "Fried Chicken, Nashville Style Sandwiches, Smashed Burgers and More",
        publisher: {
          "@id": `https://${BASE_URL}/#organization`,
        },
      },
      {
        "@type": "WebPage",
        "@id": `https://${BASE_URL}/#webpage`,
        url: `https://${BASE_URL}`,
        name: `${BUSINESS_NAME} | Fried Chicken, Nashville Style Sandwiches, Smashed Burgers`,
        isPartOf: {
          "@id": `https://${BASE_URL}/#website`,
        },
        about: {
          "@id": `https://${BASE_URL}/#organization`,
        },
      },
      // Add homepage breadcrumb schema
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `https://${BASE_URL}`,
          },
        ],
      },
      ...generateLocationData(),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export default GoogleRichSnippet;
