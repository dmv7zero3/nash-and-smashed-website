import React from "react";
import { NutritionCategory } from "../data";
import DesktopNutritionalInformation from "./desktop";
import MobileNutritionalInformation from "./mobile";

interface NutritionalInformationProps {
  setNutritionRefs: (el: HTMLDivElement | null) => void;
  imageRef: React.RefObject<HTMLDivElement>;
  contentRef: React.RefObject<HTMLDivElement>;
  categoryCards: Array<{
    category: string;
    description: string;
    imagePath: string;
    nutritionData: NutritionCategory;
  }>;
}

const NutritionalInformation: React.FC<NutritionalInformationProps> = (
  props
) => {
  return (
    <section className="py-12 bg-lightning-yellow-50">
      <div className="container px-4 mx-auto">
        {/* Introduction part */}
        <div
          ref={props.setNutritionRefs}
          className="flex flex-col mb-12 opacity-0 md:flex-row"
        >
          <div
            ref={props.imageRef}
            className="flex items-center justify-center mb-8 md:w-1/2 md:mb-0"
          >
            <picture>
              <source
                srcSet="/images/food/nash-and-smashed-burgers.webp"
                type="image/webp"
              />
              <img
                src="/images/food/nash-and-smashed-burgers.png"
                alt="Nash & Smashed Burgers and Chicken Bucket"
                className="w-full h-auto max-w-4xl "
                width="800"
                height="600"
                loading="eager"
              />
            </picture>
          </div>
          <div
            ref={props.contentRef}
            className="flex flex-col justify-center md:w-1/2"
          >
            <h2 className="mb-4 text-4xl cosmic-lager text-dark-olive-bark">
              Understanding Our Nutrition Facts
            </h2>
            <p className="mb-4 text-dark-olive-bark">
              Our nutrition information is calculated based on our standardized
              recipes. Minor variations may occur due to natural differences in
              ingredient sizes and preparation methods between locations.
            </p>
            <p className="mb-4 text-dark-olive-bark">
              If you have specific dietary concerns or food allergies, please
              speak with a manager at your local Nash & Smashed restaurant
              before ordering.
            </p>
            <div className="mt-4">
              <h4 className="mb-2 font-bold text-dark-olive-bark">
                We provide information for:
              </h4>
              <ul className="space-y-1 list-disc list-inside text-dark-olive-bark">
                <li>Calories</li>
                <li>Total fat, saturated fat, and trans fat</li>
                <li>Cholesterol</li>
                <li>Sodium</li>
                <li>Total carbohydrates, fiber, and sugar</li>
                <li>Protein</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Food Categories - Responsive layout */}
        <div className="mt-16 mb-16">
          <h3 className="mb-10 text-4xl tracking-wide text-center cosmic-lager text-dark-olive-bark">
            Menu Categories
          </h3>

          {/* Desktop version - hidden on mobile */}
          <div className="hidden md:block">
            <DesktopNutritionalInformation
              categoryCards={props.categoryCards}
            />
          </div>

          {/* Mobile version - hidden on desktop */}
          <div className="block md:hidden">
            <MobileNutritionalInformation categoryCards={props.categoryCards} />
          </div>

          {/* Coming soon message */}
        </div>
        <div className="max-w-2xl p-6 mx-auto text-center bg-white rounded-lg shadow-md">
          <h4 className="mb-3 text-xl font-bold text-dark-olive-bark">
            Detailed Nutritional Information Coming Soon
          </h4>
          <p className="text-gray-700">
            We're currently finalizing our detailed nutritional facts for each
            menu item. Please check back soon for complete nutrition information
            including calories, fats, proteins, carbohydrates, and more.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NutritionalInformation;
