import { BUSINESS_NAME } from "@/core/constants/business";

export const homepageMetadata = {
  title: `${BUSINESS_NAME} | Fried Chicken, Nashville Style Sandwiches & Smashed Burgers`,
  description:
    "Savor our signature fried chicken, Nashville hot sandwiches & smashed burgers made with halal, locally-sourced ingredients. Visit Nash & Smashed today!",
  keywords: [
    "fried chicken",
    "Nashville hot chicken",
    "smashed burgers",
    "halal fried chicken",
    "Nashville style sandwiches",
    "fresh local ingredients",
    "Nash & Smashed",
    "American comfort food",
  ],
  canonical: "https://nashandsmashed.com/",
  openGraph: {
    title: `${BUSINESS_NAME} | Fried Chicken & Smashed Burgers`,
    description:
      "Fresh, pure, local ingredients. Savor our signature fried chicken, Nashville hot sandwiches & smashed burgers at Nash & Smashed.",
    type: "website",
    url: "https://nashandsmashed.com/",
    image:
      "https://nashandsmashed.com/images/social/nash-and-smashed-og-image.jpg",
    siteName: BUSINESS_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: `${BUSINESS_NAME} | Fried Chicken & Smashed Burgers`,
    description:
      "Fresh, pure, local ingredients. Savor our signature fried chicken, Nashville hot sandwiches & smashed burgers.",
    image:
      "https://nashandsmashed.com/images/social/nash-and-smashed-twitter-image.jpg",
  },
};

export default homepageMetadata;
