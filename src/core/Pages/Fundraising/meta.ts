import { MetaData } from "@/core/metadata/types";

/**
 * Metadata for the Fundraising page
 */
export const getFundraisingMetadata = (): MetaData => {
  return {
    title: "Fundraising - Host a Fundraiser | Nash & Smashed",
    description:
      "Host a fundraiser at Nash & Smashed and earn 20% back for your organization. Easy to apply, promote, and receive your donation. Perfect for schools, sports teams, and non-profits.",
    keywords: [
      "Nash & Smashed fundraising",
      "restaurant fundraiser",
      "school fundraising",
      "sports team fundraiser",
      "non-profit fundraiser",
      "earn 20 percent",
      "fundraising events",
      "fundraising opportunities",
      "host a fundraiser",
    ],
    ogTitle: "Host a Fundraiser - 20% Give Back | Nash & Smashed",
    ogDescription:
      "Raise money for your organization with a Nash & Smashed fundraiser. 20% of sales go back to your cause. No minimum purchase required.",
    ogImage: "/images/banner/nash-and-smashed-combo-3.jpg",
    ogType: "website",
    twitterCard: "summary_large_image",
    canonical: "https://nashandsmashed.com/fundraising",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Fundraising - Nash & Smashed",
      description:
        "Host a fundraiser at Nash & Smashed and earn 20% back for your organization.",
      url: "https://nashandsmashed.com/fundraising",
      image:
        "https://nashandsmashed.com/images/banner/nash-and-smashed-combo-3.jpg",
      mainEntity: {
        "@type": "Service",
        name: "Nash & Smashed Fundraising Program",
        description:
          "Restaurant fundraising program that gives back 20% to organizations",
        provider: {
          "@type": "Restaurant",
          name: "Nash & Smashed",
          image:
            "https://nashandsmashed.com/images/logo/nash-and-smashed-logo.png",
          url: "https://nashandsmashed.com",
          priceRange: "$$",
          servesCuisine: "Nashville Hot Chicken, Smashed Burgers",
        },
        offers: {
          "@type": "Offer",
          description: "20% of sales donated back to your organization",
          eligibleCustomerType:
            "Non-profit organizations, schools, sports teams, community groups",
        },
      },
    },
  };
};
