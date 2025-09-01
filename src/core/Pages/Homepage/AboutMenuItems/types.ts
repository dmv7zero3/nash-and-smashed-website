export interface MenuItem {
  title: string;
  description: string;
  imagePath: string;
}

export interface MenuItemCardProps {
  item: MenuItem;
  index: number;
}

export const menuItems: MenuItem[] = [
  {
    title: "Fried Chicken",
    description:
      "Discover the hallmark of our menu: our signature fried chicken, available as bone-in pieces, wings, and tenders. Each cut is expertly prepared to achieve a perfectly crispy exterior while locking in juicy, flavorful meat. Whether you savor a platter of irresistible wings or enjoy our tender pieces, our fried chicken promises to delight and satisfy your cravings with every delicious bite.",
    imagePath:
      "/images/food/bucket-of-chicken-tilt-over-from-Nash-And-Smashed.webp",
  },
  {
    title: "Smashed Burgers",
    description:
      "Smashed Burgers are crafted with high-quality ingredients and come in a variety of sizes, ranging from 3 to 12 ounces, allowing you to tailor your selection to perfectly suit your appetite. Each burger boasts a delightful balance of flavor and texture, ensuring a satisfying experience with every delicious bite. Customize your order and indulge in a burger that truly caters to your cravings!",
    imagePath: "/images/food/burger-stack-from-Nash-And-Smashed-2.webp",
  },
  {
    title: "Nashville Hot",
    description:
      "Freshness and purity are at the heart of our Nashville Sandwiches, as we prioritize locally sourced ingredients whenever possible. This commitment not only supports local communities but also ensures that every bite is infused with authentic, vibrant flavors that elevate your dining experience. Enjoy a taste of Nashville that celebrates quality and community in every delicious sandwich.",
    imagePath: "/images/food/chicken-sandwich-from-Nash-And-Smashed-2.webp",
  },
];
