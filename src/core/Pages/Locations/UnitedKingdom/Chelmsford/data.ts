// src/core/Pages/Locations/UnitedKingdom/Chelmsford/data.ts
import { ChelmsfordLocationData, ContentSection } from "./types";
import { ORDER_ONLINE_URL } from "@/core/constants/business";

export const locationData: ChelmsfordLocationData = {
  id: "chelmsford",
  name: "Chelmsford",
  address: "6b Baddow Rd",
  city: "Chelmsford",
  state: "Essex",
  zipCode: "CM2 0DG",
  country: "UK",
  status: "active",
  fullAddress: "6b Baddow Rd, Chelmsford, Essex, CM2 0DG",
  phone: "+442081239063",
  email: "contact@nashandsmashed.co.uk", // Changed from franchise email to general contact
  googleMapsUrl:
    "https://maps.google.com/?q=6b+Baddow+Rd,+Chelmsford,+Essex,+CM2+0DG",
  socialMedia: {
    facebook: "https://www.facebook.com/nash.smashed",
    instagram: "https://www.instagram.com/nashandsmasheduk",
    tiktok: "https://www.tiktok.com/@nash.smashed",
  },
  heroImage: "/images/locations/uk/chelmsford/hero.jpg",
  posterImage: "/images/locations/uk/chelmsford/poster.jpg",
  promoVideo: "/videos/locations/uk/chelmsford/promo.mp4",
};

export const contentSections: ContentSection[] = [
  {
    id: "intro",
    title: "FROM UNITED STATES",
    subtitle: "Authentic Nashville Flavors, Right Here in the UK!",
    content:
      "Nash & Smashed is bringing the bold, fiery flavors of Nashville straight to your plate! Known for our signature Nashville Hot Chicken and juicy smashed burgers, we're excited to welcome you to our Chelmsford location. Get ready to experience a taste sensation like no other—crispy, spicy, and packed with flavor.\n\nOur journey began in the heart of Virginia, where we perfected our recipe using the finest ingredients and traditional Southern techniques. Now, we're thrilled to share that same authentic experience with the UK. Whether you're a fan of fiery heat or crave something savory and juicy, Nash & Smashed delivers a taste you won't forget.",
    image:
      "/images/food/april-16-2025/chicken-sandwich-from-Nash-And-Smashed-Dumfries-Virginia.jpg",
  },
  {
    id: "features",
    title: "Southern Hospitality in Essex",
    subtitle: "Real, authentic hot chicken and smashed burgers.",
    content:
      "Signature Nashville Hot: Our secret spice blend gives our chicken that authentic Nashville heat.\n\nSmashed to Perfection: Our burgers are smashed on the grill for maximum flavor and the perfect crispy edges.\n\nHandcrafted Sides: From loaded fries to Southern-style sides, we've got all the fixings.",

    image: "/images/food/nash-and-smashed-smashed-burger.jpg",
  },
  {
    id: "usa-success",
    title: "Born in United States, Now in Chelmsford",
    subtitle: "Bringing a True Taste of the South to Essex",
    content:
      "Since day one, Nash & Smashed has been serving up bold, authentic Nashville Hot Chicken and juicy smashed burgers to rave reviews. From our home base in Virginia, we've perfected our recipes, and now we're bringing that success and passion for great food to the UK.\n\nOur Chelmsford location features the same commitment to quality and flavor that made us famous. From our crispy, spicy chicken to our perfectly smashed burgers, we're proud to bring our award-winning flavors and Southern hospitality to Essex!",
    image: "/images/lifestyle/bikers-enjoying-nash-and-smashed-burgers.jpg",
  },
  {
    id: "franchise",
    title: "Bring Nash & Smashed to Your Area",
    subtitle: "Franchise Opportunities Available",
    content:
      "Love what you're tasting at Nash & Smashed Chelmsford? We're looking to grow our family across the UK! If you're passionate about great food and creating exceptional dining experiences, we'd love to talk about bringing Nashville's favorite flavors to your area. Visit our franchise page to learn more about investment opportunities and how you can become part of our growing brand.",
    ctaText: "Learn About Franchising",
    ctaLink: "/franchise",
    image: "/images/lifestyle/kitchen-at-nash-and-smashed.jpg",
  },
  {
    id: "contact",
    title: "We're Here for Y'all",
    subtitle: "Let's Talk",
    content:
      "Got questions about our menu? Planning a party? Want to tell us how much you enjoyed your visit? We'd love to chat! Our Chelmsford team is here to help and make your experience with us the best it can be.\n\nNo automated systems, no long waits—just real, friendly people ready to talk you through everything you need to know. At Nash & Smashed, we pride ourselves on good ol' Southern hospitality, so give us a shout!",
    image: "/images/lifestyle/meal-at-nash-and-smashed.jpg",
  },
];
