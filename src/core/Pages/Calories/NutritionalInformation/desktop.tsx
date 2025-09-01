import React from "react";
import { NutritionCategory } from "../data";
import CategoryCard from "../CategoryCard";

interface DesktopNutritionalInformationProps {
  categoryCards: Array<{
    category: string;
    description: string;
    imagePath: string;
    nutritionData: NutritionCategory;
  }>;
}

const DesktopNutritionalInformation: React.FC<
  DesktopNutritionalInformationProps
> = ({ categoryCards }) => {
  return (
    <div className="grid grid-cols-2 gap-8 lg:grid-cols-3">
      {categoryCards.map((card, index) => (
        <CategoryCard
          key={index}
          category={card.category}
          description={card.description}
          imagePath={card.imagePath}
          nutritionData={card.nutritionData}
        />
      ))}
    </div>
  );
};

export default DesktopNutritionalInformation;
