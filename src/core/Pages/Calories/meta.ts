// Define Menu enum directly if the import isn't available
enum Menu {
  mainMenu = "mainMenu",
  infoMenu = "infoMenu",
  footerMenu = "footerMenu",
  legalMenu = "legalMenu",
  socialMenu = "socialMenu",
}

export const meta = {
  title: "Nutritional Information | Nash & Smashed",
  description:
    "View nutritional information and calorie content for all Nash & Smashed menu items. Make informed dining choices with our transparent nutritional facts.",
  keywords: [
    "Nash and Smashed calories",
    "Nashville hot chicken nutrition",
    "smashed burger nutritional information",
    "halal fried chicken calories",
    "fast food nutrition facts",
    "Nashville hot chicken allergens",
    "healthy food choices",
    "restaurant calorie information",
    "Dumfries VA restaurant nutrition",
    "fast casual dining nutrition",
  ],
  canonicalUrl: "https://nashandsmashed.com/calories",
  openGraph: {
    title: "Nutritional Information & Calories | Nash & Smashed",
    description:
      "Make informed dining choices with our transparent nutritional information. View calories, allergens, and nutrition facts for our Nashville hot chicken, smashed burgers, and more.",
    siteName: "Nash & Smashed",
    locale: "en_US",
    type: "website",
    image: {
      url: "https://nashandsmashed.com/images/banner/calories-info-banner.jpg",
      width: 1200,
      height: 630,
      alt: "Nash & Smashed Nutritional Information",
    },
  },
  menu: {
    name: "Nutritional Info",
    url: "/calories",
    order: 5, // Adjust based on your current menu structure
    type: Menu.infoMenu,
    icon: "allergies-2",
    children: [],
    showInFooter: true,
    showInNavigation: true,
  },
};

export default meta;
