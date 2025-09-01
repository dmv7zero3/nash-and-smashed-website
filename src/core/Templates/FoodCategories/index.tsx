import React, { useRef } from "react";
import { useInView } from "react-intersection-observer";
import { categories, FoodCategory } from "./data";
import { useAnimateOnView } from "./gsap";

interface FoodCategoryCardProps {
  category: FoodCategory;
  index: number;
}

const FoodCategoryCard: React.FC<FoodCategoryCardProps> = ({
  category,
  index,
}) => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useAnimateOnView(inView, { imageRef, textRef });

  // Alternate the layout for even/odd indexes
  const isReversed = index % 2 === 1;

  return (
    <div
      ref={ref}
      className={`flex flex-col ${
        isReversed ? "md:flex-row-reverse" : "md:flex-row"
      } items-center bg-white rounded-lg overflow-hidden`}
    >
      <div
        ref={imageRef}
        className="relative w-full transition-all duration-700 transform translate-y-10 opacity-0 md:w-1/2"
      >
        {/* Increased height on mobile from h-64 to h-80, and md:h-80 to md:h-96 */}
        <div className="flex items-center justify-center">
          <picture>
            <source srcSet={category.imagePathWebp} type="image/webp" />
            <img
              src={category.imagePath}
              alt={category.title}
              className="object-contain w-full h-auto max-h-full transition-transform duration-500 transform hover:scale-105"
              loading="lazy"
            />
          </picture>
        </div>
      </div>

      <div
        ref={textRef}
        className={`w-full p-6 transition-all duration-700 delay-200 transform opacity-0 translate-y-10 md:w-1/2 ${
          isReversed ? "md:text-right" : "md:text-left"
        }`}
      >
        <h2 className="mb-3 text-5xl text-dark-olive-bark cosmic-lager">
          {category.title}
        </h2>
        <div
          className={`w-16 h-1 mb-4 bg-lightning-yellow-400 ${
            isReversed ? "md:ml-auto" : ""
          }`}
        ></div>
        <p className="mb-6 text-xl proxima-nova">{category.description}</p>
      </div>
    </div>
  );
};

const FoodCategories: React.FC = () => {
  return (
    <section className="py-16 bg-white text-dark-olive-bark">
      <div className="container px-4 mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-6xl cosmic-lager">Our Menu Highlights</h2>
          <div className="w-24 h-1 mx-auto mt-4 mb-6 bg-lightning-yellow-400"></div>
          <p className="max-w-2xl mx-auto text-xl proxima-nova">
            Discover our signature dishes crafted with locally sourced, halal,
            and antibiotic-free ingredients
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {categories.map((category, index) => (
            <FoodCategoryCard key={index} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoodCategories;
