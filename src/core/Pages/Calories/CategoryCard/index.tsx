import React, { useRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { NutritionCategory } from "../data";
import { animateElements } from "../gsap";

interface CategoryCardProps {
  category: string;
  description: string;
  imagePath: string;
  nutritionData: NutritionCategory;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  description,
  imagePath,
  nutritionData,
}) => {
  // Animation refs
  const cardRef = useRef<HTMLDivElement>(null);

  // Intersection observer
  const { ref: cardInViewRef, inView: cardInView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  // Set up animations
  useEffect(() => {
    if (cardInView && cardRef.current) {
      animateElements(cardInView, { cardRef });
    }
  }, [cardInView]);

  // Safe way to handle refs
  const setCardElRef = (el: HTMLDivElement | null) => {
    if (el) {
      // Use the InView ref
      cardInViewRef(el);

      // For cardRef, use a workaround to avoid the readonly property error
      if (cardRef.current !== el) {
        Object.defineProperty(cardRef, "current", {
          value: el,
          writable: true,
        });
      }
    }
  };

  return (
    <div className="flex flex-col">
      <div
        ref={setCardElRef}
        className="overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-lg opacity-0 hover:shadow-xl"
      >
        <div className="relative h-56 md:h-64">
          <img
            src={imagePath}
            alt={category}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 bg-black bg-opacity-40 hover:bg-opacity-30">
            <h4 className="text-2xl text-white md:text-3xl american drop-shadow-md">
              {category}
            </h4>
          </div>
        </div>
        <div className="p-6">
          <p className="mb-4 text-base md:text-lg">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
