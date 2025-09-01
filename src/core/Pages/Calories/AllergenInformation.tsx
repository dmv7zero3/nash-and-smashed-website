import React from "react";

const AllergenInformation: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="mb-4 american text-dark-olive-bark">
              Allergen Information
            </h2>
            <p className="text-dark-olive-bark">
              We understand the importance of knowing what's in your food. Below
              is information about common allergens present in our menu items.
            </p>
          </div>

          <div className="p-6 mb-8 rounded-lg shadow-md bg-lightning-yellow-50">
            <h3 className="mb-4 text-xl american text-dark-olive-bark">
              Common Allergens in Our Menu
            </h3>
            <p className="mb-4 text-dark-olive-bark">
              Our products may contain or come into contact with:
            </p>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              <div className="p-3 text-center bg-white rounded shadow">
                <p className="font-bold">Wheat/Gluten</p>
              </div>
              <div className="p-3 text-center bg-white rounded shadow">
                <p className="font-bold">Milk</p>
              </div>
              <div className="p-3 text-center bg-white rounded shadow">
                <p className="font-bold">Eggs</p>
              </div>
              <div className="p-3 text-center bg-white rounded shadow">
                <p className="font-bold">Soy</p>
              </div>
              <div className="p-3 text-center bg-white rounded shadow">
                <p className="font-bold">Tree Nuts</p>
              </div>
              <div className="p-3 text-center bg-white rounded shadow">
                <p className="font-bold">Peanuts</p>
              </div>
              <div className="p-3 text-center bg-white rounded shadow">
                <p className="font-bold">Fish</p>
              </div>
              <div className="p-3 text-center bg-white rounded shadow">
                <p className="font-bold">Shellfish</p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white border border-gray-200 rounded-lg">
            <h3 className="mb-4 text-xl american text-dark-olive-bark">
              Food Allergy Notice
            </h3>
            <p className="mb-4 text-dark-olive-bark">
              Please be advised that food prepared here may contain or come into
              contact with these ingredients:
            </p>
            <ul className="mb-4 space-y-2 list-disc list-inside text-dark-olive-bark">
              <li>Milk</li>
              <li>Eggs</li>
              <li>Wheat</li>
              <li>Soy</li>
              <li>Peanuts</li>
              <li>Tree nuts</li>
              <li>Fish</li>
              <li>Shellfish</li>
            </ul>
            <p className="font-bold text-dark-olive-bark">
              If you have specific food allergies or sensitivities, please
              inform our staff before ordering.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllergenInformation;
