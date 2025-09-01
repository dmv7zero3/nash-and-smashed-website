// src/core/Pages/Franchise/TrainingAndSupport.tsx
import React from "react";

interface TrainingAndSupportProps {
  trainingText: string;
}

const TrainingAndSupport: React.FC<TrainingAndSupportProps> = ({
  trainingText,
}) => {
  return (
    <section className="py-16 bg-white">
      <div className="w-11/12 px-4 mx-auto">
        <div className="flex flex-col-reverse md:flex-row md:items-center md:space-x-10">
          <div className="mt-10 md:w-1/2 md:mt-0 text-dark-olive-bark">
            <h2 className="mb-6 american">Comprehensive Training</h2>
            <div className="">
              <p className="mb-4 text-lg font-bold open-sanstext-lg open-sans">
                {trainingText}
              </p>
              <ul className="pl-6 mt-4 space-y-2 text-lg font-bold list-disc open-sans">
                <li>Food preparation and menu knowledge</li>
                <li>Customer service excellence</li>
                <li>Inventory management systems</li>
                <li>Financial management and reporting</li>
                <li>Marketing strategies and implementation</li>
                <li>Staff hiring and training</li>
              </ul>
            </div>
          </div>
          <div className="md:w-1/2">
            <img
              src="/images/food/april-16-2025/burger-from-Nash-And-Smashed-Dumfries-Virginia.jpg"
              alt="Nash & Smashed Training"
              className="object-cover w-full rounded-lg shadow-lg h-96"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainingAndSupport;
