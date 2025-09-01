import React from "react";
import { Link } from "react-router-dom";

const CTASection: React.FC = () => {
  return (
    <div className="p-6 mb-8 rounded-lg shadow-lg bg-gradient-to-br from-red-900/90 to-red-950/90">
      <h3 className="mb-4 text-xl font-bold text-lightning-yellow cosmic-lager">
        Ready to Try Our Food?
      </h3>

      <p className="mb-4 text-white/90">
        Experience Nashville's famous hot chicken and smashed burgers right
        here. Our recipes combine traditional methods with local flavors.
      </p>

      <div className="space-y-3">
        <Link
          to="/locations"
          className="block w-full py-2 font-medium text-center text-black transition duration-150 rounded-md bg-lightning-yellow hover:bg-lightning-yellow-600"
        >
          Find a Location
        </Link>

        <Link
          to="/contact"
          className="block w-full py-2 font-medium text-center text-white transition duration-150 border rounded-md border-white/30 hover:bg-white/10"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
};

export default CTASection;
