import React from "react";
import {
  BUSINESS_NAME,
  PHONE_NUMBER,
  EMAIL,
  BASE_URL,
} from "@/core/constants/business";
import { headquarters, locations } from "@/core/constants/locations";
import { SAME_AS } from "@/core/constants/GoogleRichSnippet/sameas";
import { MENU_ITEMS } from "@/core/constants/menuItems";

const ORGANIZATION_IMAGE =
  "https://nashandsmashed.com/images/og-images/nash-and-smashed-banner-og-image.jpg";
const ORGANIZATION_LOGO =
  "https://nashandsmashed.com/images/logos/nash-and-smashed-logo.png";

// Helper to build MenuSection schema from a menu category
const buildMenuSection = (
  category: typeof MENU_ITEMS | typeof MENU_ITEMS.sandwiches
) => ({
  "@type": "MenuSection",
  name: category.menuCategory,
  description: category.categoryDescription,
  hasMenuItem: category.items.map((item) => {
    let offers: any[] = [];
    if (item.sizes) {
      offers = item.sizes.map((size) => ({
        "@type": "Offer",
        name: size.name,
        price: size.price,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      }));
    } else if (item.options) {
      offers = item.options.map((option) => ({
        "@type": "Offer",
        name: option.name,
        price: option.price,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      }));
    } else if (item.price) {
      offers = [
        {
          "@type": "Offer",
          price: item.price,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
      ];
    }

    return {
      "@type": "MenuItem",
      name: item.name,
      description: item.description,
      ...(item.image && {
        image: `https://nashandsmashed.com/images/menu/${item.image}`,
      }),
      ...(offers.length > 0 && { offers: offers }),
    };
  }),
});

const menuSections = [
  buildMenuSection(MENU_ITEMS),
  buildMenuSection(MENU_ITEMS.sandwiches),
  buildMenuSection(MENU_ITEMS.sides),
  buildMenuSection(MENU_ITEMS.friedGoodness),
  buildMenuSection(MENU_ITEMS.familyBuckets),
  buildMenuSection(MENU_ITEMS.kidsMeal),
  buildMenuSection(MENU_ITEMS.dippingSauce),
  buildMenuSection(MENU_ITEMS.cakes),
];

const menuSchema = {
  "@type": "Menu",
  name: "Nash & Smashed Menu",
  hasMenuSection: menuSections,
};

// Build Restaurant schema for each active location
const locationSchemas = locations
  ? locations
      .filter((loc) => loc.status === "active")
      .map((loc) => ({
        "@type": "Restaurant",
        name: `${BUSINESS_NAME} ${loc.name}`,
        url: `https://${BASE_URL}/locations/${
          loc.country.toLowerCase() === "uk" ? "uk" : "usa"
        }/${loc.id}`,
        image: ORGANIZATION_IMAGE,
        logo: ORGANIZATION_LOGO,
        telephone: loc.phone || PHONE_NUMBER,
        email: loc.email || EMAIL,
        address: {
          "@type": "PostalAddress",
          streetAddress: loc.address,
          addressLocality: loc.city,
          addressRegion: loc.state,
          postalCode: loc.zipCode,
          addressCountry: loc.country === "UK" ? "GB" : loc.country,
        },
        servesCuisine: ["American", "Southern", "Halal"],
        priceRange: "$$",
        hasMenu: menuSchema,
        sameAs: SAME_AS,
        ...(loc.googleMapsUrl && { hasMap: loc.googleMapsUrl }),
      }))
  : [];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    // Organization schema
    {
      "@type": "Organization",
      name: BUSINESS_NAME,
      url: `https://${BASE_URL}`,
      logo: ORGANIZATION_LOGO,
      image: ORGANIZATION_IMAGE,
      email: EMAIL,
      telephone: PHONE_NUMBER,
      sameAs: SAME_AS,
    },
    // LocalBusiness schema
    {
      "@type": "LocalBusiness",
      name: BUSINESS_NAME,
      url: `https://${BASE_URL}`,
      logo: ORGANIZATION_LOGO,
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
      priceRange: "$$",
    },
    // Main Restaurant schema (HQ)
    {
      "@type": "Restaurant",
      name: BUSINESS_NAME,
      description:
        "Restaurant specializing in Nashville hot chicken and smashed burgers",
      url: `https://${BASE_URL}`,
      logo: ORGANIZATION_LOGO,
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
      servesCuisine: ["American", "Southern", "Halal"],
      priceRange: "$$",
      hasMenu: menuSchema,
      sameAs: SAME_AS,
    },
    // All active locations as Restaurant schemas
    ...locationSchemas,
  ],
};

const GoogleRichSnippet: React.FC = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
  />
);

export default GoogleRichSnippet;
