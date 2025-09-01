import React, { useRef, useEffect } from "react";

interface NutritionItem {
  name: string;
  calories: number;
  totalFat: number;
  saturatedFat: number;
  transFat: number;
  cholesterol: number;
  sodium: number;
  carbs: number;
  fiber: number;
  sugar: number;
  protein: number;
}

interface NutritionTableProps {
  category: string;
  items: NutritionItem[];
  tableRef?: React.RefObject<HTMLTableElement>;
}

const NutritionTable: React.FC<NutritionTableProps> = ({
  category,
  items,
  tableRef: externalTableRef,
}) => {
  const internalTableRef = useRef<HTMLTableElement>(null);
  const tableRef = externalTableRef || internalTableRef;

  // Make sure the table is visible and styled correctly
  useEffect(() => {
    if (tableRef?.current) {
      // Ensure table displays correctly
      tableRef.current.style.display = "table";
      tableRef.current.style.width = "100%";
    }
  }, [tableRef]);

  return (
    <div className="mt-8">
      <div className="flex flex-col items-start mb-6 md:flex-row md:items-center md:justify-between">
        <h3 className="mb-2 text-2xl md:mb-0 american text-dark-olive-bark">
          {category} Nutrition Facts
        </h3>
        <div className="text-sm text-right text-gray-600">
          <p>Values based on standard serving size</p>
        </div>
      </div>

      {/* Desktop version - hidden on mobile */}
      <div className="hidden md:block">
        <div className="overflow-x-auto rounded-lg shadow">
          <table
            ref={tableRef}
            className="min-w-full bg-white border-separate border-spacing-0"
          >
            <thead>
              <tr>
                <th className="sticky left-0 z-10 px-4 py-4 text-left border-b bg-lightning-yellow-100 border-lightning-yellow-200">
                  <span className="text-sm font-bold uppercase text-dark-olive-bark">
                    Menu Item
                  </span>
                </th>
                <th className="px-4 py-3 text-center border-b bg-lightning-yellow-50 border-lightning-yellow-200">
                  <span className="text-sm font-bold uppercase text-dark-olive-bark">
                    Calories
                  </span>
                </th>
                <th className="px-4 py-3 text-center border-b bg-lightning-yellow-50 border-lightning-yellow-200">
                  <span className="text-sm font-bold uppercase text-dark-olive-bark">
                    Total Fat (g)
                  </span>
                </th>
                <th className="px-4 py-3 text-center border-b bg-lightning-yellow-50 border-lightning-yellow-200">
                  <span className="text-sm font-bold uppercase text-dark-olive-bark">
                    Sat Fat (g)
                  </span>
                </th>
                <th className="px-4 py-3 text-center border-b bg-lightning-yellow-50 border-lightning-yellow-200">
                  <span className="text-sm font-bold uppercase text-dark-olive-bark">
                    Trans Fat (g)
                  </span>
                </th>
                <th className="px-4 py-3 text-center border-b bg-lightning-yellow-50 border-lightning-yellow-200">
                  <span className="text-sm font-bold uppercase text-dark-olive-bark">
                    Cholesterol (mg)
                  </span>
                </th>
                <th className="px-4 py-3 text-center border-b bg-lightning-yellow-50 border-lightning-yellow-200">
                  <span className="text-sm font-bold uppercase text-dark-olive-bark">
                    Sodium (mg)
                  </span>
                </th>
                <th className="px-4 py-3 text-center border-b bg-lightning-yellow-50 border-lightning-yellow-200">
                  <span className="text-sm font-bold uppercase text-dark-olive-bark">
                    Carbs (g)
                  </span>
                </th>
                <th className="px-4 py-3 text-center border-b bg-lightning-yellow-50 border-lightning-yellow-200">
                  <span className="text-sm font-bold uppercase text-dark-olive-bark">
                    Fiber (g)
                  </span>
                </th>
                <th className="px-4 py-3 text-center border-b bg-lightning-yellow-50 border-lightning-yellow-200">
                  <span className="text-sm font-bold uppercase text-dark-olive-bark">
                    Sugar (g)
                  </span>
                </th>
                <th className="px-4 py-3 text-center border-b bg-lightning-yellow-50 border-lightning-yellow-200">
                  <span className="text-sm font-bold uppercase text-dark-olive-bark">
                    Protein (g)
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {items && items.length > 0 ? (
                items.map((item, index) => (
                  <tr
                    key={index}
                    className={
                      index % 2 === 0
                        ? "bg-white"
                        : "bg-gray-50 hover:bg-lightning-yellow-50"
                    }
                  >
                    <td className="sticky left-0 z-10 px-4 py-4 font-medium border-b bg-inherit">
                      {item.name}
                    </td>
                    <td className="px-4 py-3 text-center border-b">
                      <span className="font-medium">{item.calories}</span>
                    </td>
                    <td className="px-4 py-3 text-center border-b">
                      {item.totalFat}
                    </td>
                    <td className="px-4 py-3 text-center border-b">
                      {item.saturatedFat}
                    </td>
                    <td className="px-4 py-3 text-center border-b">
                      {item.transFat}
                    </td>
                    <td className="px-4 py-3 text-center border-b">
                      {item.cholesterol}
                    </td>
                    <td className="px-4 py-3 text-center border-b">
                      {item.sodium}
                    </td>
                    <td className="px-4 py-3 text-center border-b">
                      {item.carbs}
                    </td>
                    <td className="px-4 py-3 text-center border-b">
                      {item.fiber}
                    </td>
                    <td className="px-4 py-3 text-center border-b">
                      {item.sugar}
                    </td>
                    <td className="px-4 py-3 text-center border-b">
                      {item.protein}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={11} className="px-4 py-3 text-center border-b">
                    No nutrition data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile version - card-based layout for each item */}
      <div className="md:hidden">
        {items && items.length > 0 ? (
          items.map((item, index) => (
            <div key={index} className="p-4 mb-4 bg-white rounded-lg shadow">
              <h4 className="mb-3 text-lg font-medium">{item.name}</h4>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 rounded bg-lightning-yellow-50">
                  <p className="text-xs font-medium text-center text-gray-600">
                    Calories
                  </p>
                  <p className="font-bold text-center">{item.calories}</p>
                </div>
                <div className="p-2 rounded bg-lightning-yellow-50">
                  <p className="text-xs font-medium text-center text-gray-600">
                    Total Fat
                  </p>
                  <p className="text-center">{item.totalFat}g</p>
                </div>
                <div className="p-2 rounded bg-lightning-yellow-50">
                  <p className="text-xs font-medium text-center text-gray-600">
                    Sat Fat
                  </p>
                  <p className="text-center">{item.saturatedFat}g</p>
                </div>
                <div className="p-2 rounded bg-lightning-yellow-50">
                  <p className="text-xs font-medium text-center text-gray-600">
                    Trans Fat
                  </p>
                  <p className="text-center">{item.transFat}g</p>
                </div>
                <div className="p-2 rounded bg-lightning-yellow-50">
                  <p className="text-xs font-medium text-center text-gray-600">
                    Cholesterol
                  </p>
                  <p className="text-center">{item.cholesterol}mg</p>
                </div>
                <div className="p-2 rounded bg-lightning-yellow-50">
                  <p className="text-xs font-medium text-center text-gray-600">
                    Sodium
                  </p>
                  <p className="text-center">{item.sodium}mg</p>
                </div>
                <div className="p-2 rounded bg-lightning-yellow-50">
                  <p className="text-xs font-medium text-center text-gray-600">
                    Carbs
                  </p>
                  <p className="text-center">{item.carbs}g</p>
                </div>
                <div className="p-2 rounded bg-lightning-yellow-50">
                  <p className="text-xs font-medium text-center text-gray-600">
                    Fiber
                  </p>
                  <p className="text-center">{item.fiber}g</p>
                </div>
                <div className="p-2 rounded bg-lightning-yellow-50">
                  <p className="text-xs font-medium text-center text-gray-600">
                    Sugar
                  </p>
                  <p className="text-center">{item.sugar}g</p>
                </div>
                <div className="p-2 rounded bg-lightning-yellow-50">
                  <p className="text-xs font-medium text-center text-gray-600">
                    Protein
                  </p>
                  <p className="text-center">{item.protein}g</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center bg-white rounded-lg shadow">
            <p>No nutrition data available</p>
          </div>
        )}
      </div>

      <div className="mt-5 text-sm text-gray-600">
        <div className="p-4 mt-4 text-sm rounded-md bg-gray-50">
          <p className="mb-2">
            <span className="font-medium">Daily Values:</span> The % Daily Value
            (DV) tells you how much a nutrient in a serving of food contributes
            to a daily diet. 2,000 calories a day is used for general nutrition
            advice.
          </p>
          <p>
            <span className="font-medium">Note:</span> Nutrition information is
            calculated based on our standardized recipes. Variations may occur
            due to differences in ingredient suppliers, recipe preparation, and
            rounding.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NutritionTable;
