import React from "react";
import { NutritionCategory } from "../data";
import CategoryCard from "../CategoryCard";

interface MobileNutritionalInformationProps {
  categoryCards: Array<{
    category: string;
    description: string;
    imagePath: string;
    nutritionData: NutritionCategory;
  }>;
}

const MobileNutritionalInformation: React.FC<
  MobileNutritionalInformationProps
> = ({ categoryCards }) => {
  return (
    <div className="space-y-6">
      {categoryCards.map((card, index) => (
        <div
          key={index}
          className="pb-6 border-b border-lightning-yellow-200 last:border-b-0"
        >
          <CategoryCard
            category={card.category}
            description={card.description}
            imagePath={card.imagePath}
            nutritionData={card.nutritionData}
          />
        </div>
      ))}
    </div>
  );
};

export default MobileNutritionalInformation;
