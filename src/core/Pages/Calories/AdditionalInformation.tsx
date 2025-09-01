import React from "react";

const AdditionalInformation: React.FC = () => {
  return (
    <section className="py-16 bg-lightning-yellow-50">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-6 american text-dark-olive-bark">
            Need More Information?
          </h2>
          <p className="mb-8 text-dark-olive-bark">
            If you have questions about ingredients, preparation methods, or
            nutritional content not addressed here, our team is happy to help.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 font-bold transition-colors rounded-md bg-lightning-yellow-400 hover:bg-lightning-yellow-500 text-dark-olive-bark"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default AdditionalInformation;
