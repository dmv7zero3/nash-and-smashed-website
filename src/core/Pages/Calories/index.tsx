import React, { useRef, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useInView } from "react-intersection-observer";
import Hero from "@/core/Templates/Hero";
import { nutritionData } from "./data";
import { animateElements } from "./gsap";
import Introduction from "./Introduction";
import NutritionalInformation from "./NutritionalInformation";
import AllergenInformation from "./AllergenInformation";
import AdditionalInformation from "./AdditionalInformation";

const CaloriesPage: React.FC = () => {
  // Animation refs
  const introRef = useRef<HTMLDivElement>(null);
  const nutritionInfoRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Intersection observers
  const { ref: introInViewRef, inView: introInView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const { ref: nutritionInViewRef, inView: nutritionInView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  // Set up animations
  useEffect(() => {
    if (introInView && introRef.current) {
      animateElements(introInView, { cardRef: introRef });
    }
  }, [introInView]);

  useEffect(() => {
    if (nutritionInView) {
      animateElements(nutritionInView, {
        cardRef: nutritionInfoRef,
        imageRef,
        contentRef,
      });
    }
  }, [nutritionInView]);

  // Connect refs for intersection observer and animation - fixed to avoid read-only property error
  const setIntroRefs = (el: HTMLDivElement | null) => {
    if (el) {
      // Instead of directly assigning to current, use the callback ref function from useInView
      introInViewRef(el);

      // Store a reference for animations - using DOM methods instead of direct assignment
      if (introRef.current !== el) {
        // Store the element for other purposes without direct assignment
        // This uses the Object.defineProperty method to work around the readonly limitation
        Object.defineProperty(introRef, "current", {
          value: el,
          writable: true,
        });
      }
    }
  };

  const setNutritionRefs = (el: HTMLDivElement | null) => {
    if (el) {
      // Instead of directly assigning to current, use the callback ref function from useInView
      nutritionInViewRef(el);

      // Store a reference for animations - using DOM methods instead of direct assignment
      if (nutritionInfoRef.current !== el) {
        // Store the element for other purposes without direct assignment
        Object.defineProperty(nutritionInfoRef, "current", {
          value: el,
          writable: true,
        });
      }
    }
  };

  // Category card data
  const categoryCards = [
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
      imagePath: "/images/svgs/fries.svg",
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

  return (
    <div className="bg-white">
      <Helmet>
        <title>Nutritional Information | Nash & Smashed</title>
        <meta
          name="description"
          content="View nutritional information and calorie content for all Nash & Smashed menu items. Make informed dining choices with our transparent nutritional facts."
        />
      </Helmet>

      {/* Hero Section */}
      <Hero
        title="Nutritional Information"
        subtitle="Making Informed Choices"
        backgroundImage="/images/banner/nash-and-smashed-combo-4.jpg"
      />

      {/* Introduction Component */}
      <Introduction setIntroRefs={setIntroRefs} />

      {/* Nutritional Information Component */}
      <NutritionalInformation
        setNutritionRefs={setNutritionRefs}
        imageRef={imageRef}
        contentRef={contentRef}
        categoryCards={categoryCards}
      />

      {/* Allergen Information Component */}
      {/* <AllergenInformation /> */}

      {/* Additional Information Component */}
      <AdditionalInformation />
    </div>
  );
};

export default CaloriesPage;
