export interface FoodCategory {
  title: string;
  imagePath: string;
  imagePathWebp: string; // Added WebP path
  description: string;
}

export const categories: FoodCategory[] = [
  {
    title: "Nashville Style Sandwiches",
    imagePath: "/images/food/chicken-sandwich-from-Nash-And-Smashed.png",
    imagePathWebp: "/images/food/chicken-sandwich-from-Nash-And-Smashed.webp",
    description:
      "Crispy, spicy, and bursting with flavor, our Nashville Style Sandwiches bring the heat with every bite.",
  },
  {
    title: "Smashed Burgers",
    imagePath: "/images/food/burger-stack-from-Nash-And-Smashed.png",
    imagePathWebp: "/images/food/burger-stack-from-Nash-And-Smashed.webp",
    description:
      "Perfectly smashed beef patties with crispy edges, melty cheese, and all your favorite toppings.",
  },
  {
    title: "Fried Chicken",
    imagePath: "/images/food/bucket-of-chicken-from-Nash-And-Smashed.png",
    imagePathWebp: "/images/food/bucket-of-chicken-from-Nash-And-Smashed.webp",
    description:
      "Golden, juicy, and irresistibly crunchy fried chicken made with our secret blend of spices.",
  },
  {
    title: "Mocktails",
    imagePath: "/images/food/two-mocktails-from-Nash-And-Smashed.png",
    imagePathWebp: "/images/food/two-mocktails-from-Nash-And-Smashed.webp",
    description:
      "Refreshing and vibrant alcohol-free drinks to perfectly complement your meal.",
  },
];
