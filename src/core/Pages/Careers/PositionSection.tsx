// src/core/Pages/Careers/PositionSection.tsx
import React from "react";

const PositionSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container px-4 mx-auto">
        <h2 className="mb-10 text-center american text-dark-olive-bark">
          Current Opportunities
        </h2>

        <div className="max-w-4xl mx-auto mb-12 overflow-hidden border rounded-lg shadow-md">
          <div className="px-6 py-4 text-lg font-bold text-white bg-bronzetone-800">
            Available Positions
          </div>
          <div className="divide-y divide-gray-200">
            <div className="flex flex-col p-6 sm:flex-row sm:justify-between sm:items-center">
              <div>
                <h3 className="text-xl font-bold text-bronzetone-700">
                  Cashier
                </h3>
                <p className="mt-1 text-gray-600">Positions available</p>
              </div>
              <div className="mt-4 sm:mt-0">
                <a
                  href="#application-form"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium transition-all rounded-md text-dark-olive-bark bg-lightning-yellow-400 hover:bg-lightning-yellow-500"
                >
                  Apply Now
                </a>
              </div>
            </div>

            <div className="flex flex-col p-6 sm:flex-row sm:justify-between sm:items-center">
              <div>
                <h3 className="text-xl font-bold text-bronzetone-700">
                  Line Cook
                </h3>
                <p className="mt-1 text-gray-600">Positions available</p>
              </div>
              <div className="mt-4 sm:mt-0">
                <a
                  href="#application-form"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium transition-all rounded-md text-dark-olive-bark bg-lightning-yellow-400 hover:bg-lightning-yellow-500"
                >
                  Apply Now
                </a>
              </div>
            </div>

            <div className="flex flex-col p-6 sm:flex-row sm:justify-between sm:items-center">
              <div>
                <h3 className="text-xl font-bold text-bronzetone-700">
                  Grill Cook
                </h3>
                <p className="mt-1 text-gray-600">Positions available</p>
              </div>
              <div className="mt-4 sm:mt-0">
                <a
                  href="#application-form"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium transition-all rounded-md text-dark-olive-bark bg-lightning-yellow-400 hover:bg-lightning-yellow-500"
                >
                  Apply Now
                </a>
              </div>
            </div>

            <div className="flex flex-col p-6 sm:flex-row sm:justify-between sm:items-center">
              <div>
                <h3 className="text-xl font-bold text-bronzetone-700">
                  Dishwasher/Prep
                </h3>
                <p className="mt-1 text-gray-600">Positions available</p>
              </div>
              <div className="mt-4 sm:mt-0">
                <a
                  href="#application-form"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium transition-all rounded-md text-dark-olive-bark bg-lightning-yellow-400 hover:bg-lightning-yellow-500"
                >
                  Apply Now
                </a>
              </div>
            </div>

            <div className="flex flex-col p-6 sm:flex-row sm:justify-between sm:items-center">
              <div>
                <h3 className="text-xl font-bold text-bronzetone-700">
                  Assistant Manager
                </h3>
                <p className="mt-1 text-gray-600">Positions available</p>
              </div>
              <div className="mt-4 sm:mt-0">
                <a
                  href="#application-form"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium transition-all rounded-md text-dark-olive-bark bg-lightning-yellow-400 hover:bg-lightning-yellow-500"
                >
                  Apply Now
                </a>
              </div>
            </div>

            <div className="flex flex-col p-6 sm:flex-row sm:justify-between sm:items-center">
              <div>
                <h3 className="text-xl font-bold text-bronzetone-700">
                  General Manager
                </h3>
                <p className="mt-1 text-gray-600">Positions available</p>
              </div>
              <div className="mt-4 sm:mt-0">
                <a
                  href="#application-form"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium transition-all rounded-md text-dark-olive-bark bg-lightning-yellow-400 hover:bg-lightning-yellow-500"
                >
                  Apply Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PositionSection;
