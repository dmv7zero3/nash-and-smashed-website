// src/core/Pages/Franchise/FranchiseFeatures.tsx
import React from "react";
import { IconType } from "react-icons";

interface FeatureItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface FranchiseFeaturesProps {
  franchiseFeatures: FeatureItem[];
}

const FranchiseFeatures: React.FC<FranchiseFeaturesProps> = ({
  franchiseFeatures,
}) => {
  return (
    <section className="py-16 bg-white">
      <div className="container px-4 mx-auto american text-dark-olive-bark">
        <h2 className="mb-12 text-center american ">
          Why Choose Nash & Smashed
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {franchiseFeatures.map((feature, index) => (
            <div
              key={index}
              className="p-6 text-center transition-all bg-white border-2 rounded-lg shadow-md border-dark-olive-bark hover:shadow-xl"
            >
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-dark-olive-bark">
                {React.cloneElement(feature.icon as React.ReactElement, {
                  className: "text-lightning-yellow-500 w-6 h-6",
                })}
              </div>
              <h2 className="mb-2.5 american-xs">{feature.title}</h2>
              <p className="text-lg font-bold open-sans">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FranchiseFeatures;
