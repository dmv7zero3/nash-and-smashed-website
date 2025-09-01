import React from "react";

const BenefitsSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 mx-auto">
        <h2 className="mb-10 text-center american text-dark-olive-bark">
          Why Work With Us
        </h2>

        <div className="grid grid-cols-1 gap-8 text-lg md:grid-cols-3">
          <div className="p-6 text-center bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-2xl font-bold text-white rounded-full bg-lightning-yellow-500">
              1
            </div>
            <h3 className="mb-3 text-xl font-bold text-bronzetone-800 open-sans">
              Competitive Pay
            </h3>
            <p className="text-base leading-normal text-dark-olive-bark">
              We value your skills and experience with wages that reflect your
              contributions.
            </p>
          </div>

          <div className="p-6 text-center bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-2xl font-bold text-white rounded-full bg-lightning-yellow-500">
              2
            </div>
            <h3 className="mb-3 text-xl font-bold text-bronzetone-800 open-sans">
              Growth Opportunities
            </h3>
            <p className="text-base leading-normal text-dark-olive-bark">
              We believe in promoting from within and helping you develop your
              career path.
            </p>
          </div>

          <div className="p-6 text-center bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-2xl font-bold text-white rounded-full bg-lightning-yellow-500">
              3
            </div>
            <h3 className="mb-3 text-xl font-bold text-bronzetone-800 open-sans">
              Team Environment
            </h3>
            <p className="text-base leading-normal text-dark-olive-bark">
              Join a passionate team that feels like family, working together to
              create amazing food experiences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
