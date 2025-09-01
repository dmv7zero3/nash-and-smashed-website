import { nutritionData } from "../data";

// Use 'export type' instead of just 'export' to avoid the isolatedModules error
export type { NutritionCategory } from "../data";

// Category card data
export const categoryCards = [
  {
    category: "Nashville Style Sandwiches",
    description:
      "Our signature Nashville hot chicken sandwiches, available in multiple heat levels.",
    imagePath:
      "/images/food/april-16-2025/chicken-sandwich-from-Nash-And-Smashed-Dumfries-Virginia.jpg",
    nutritionData: nutritionData[0],
  },
  {
    category: "Smashed Burgers",
    description:
      "Premium beef patties smashed to perfection with crispy edges and juicy centers.",
    imagePath: "/images/food/burger-stack-from-Nash-And-Smashed.png",
    nutritionData: nutritionData[1],
  },
  {
    category: "Fried Chicken",
    description:
      "Golden, juicy, and crispy fried chicken made with our special blend of spices.",
    imagePath:
      "/images/food/april-16-2025/fried-chicken-from-Nash-And-Smashed-Dumfries-Virginia.jpg",
    nutritionData: nutritionData[2],
  },
  {
    category: "Sides",
    description:
      "Delicious sides including waffle fries, mac & cheese, and more to complement your meal.",
    imagePath: "/images/svgs/fries-1.png",
    nutritionData: nutritionData[3],
  },
  {
    category: "Mocktails",
    description:
      "Refreshing alcohol-free craft beverages to complement your meal.",
    imagePath: "/images/food/two-mocktails-from-Nash-And-Smashed.png",
    nutritionData: nutritionData[4],
  },
];
