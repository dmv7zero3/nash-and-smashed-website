import React, { useRef, useEffect } from "react";
import { eligibilityCriteria } from "./data";
import { animateEligibilityCriteria } from "./gsap";

const EligibilityCriteria: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current && titleRef.current && contentRef.current) {
      animateEligibilityCriteria({
        sectionRef,
        titleRef,
        contentRef,
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="eligibility-criteria"
      className="py-16 bg-lightning-yellow-50"
    >
      <div className="container max-w-6xl px-4 mx-auto">
        <div className="mb-10 text-center">
          <h2
            ref={titleRef}
            className="mb-6 text-4xl font-bold cosmic-lager text-bronzetone-800"
          >
            {eligibilityCriteria.title}
          </h2>
          <p className="max-w-3xl mx-auto text-xl american text-bronzetone-700">
            {eligibilityCriteria.description}
          </p>
        </div>

        <div ref={contentRef} className="grid gap-8 md:grid-cols-2">
          <div className="p-8 bg-white rounded-lg shadow-md">
            <h3 className="mb-4 text-2xl font-bold text-green-600 cosmic-lager">
              Organizations We Support
            </h3>
            <ul className="space-y-3">
              {eligibilityCriteria.eligibleTypes.map((type, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 mt-1 mr-2 text-green-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="text-lg american text-bronzetone-700">
                    {type}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-8 bg-white rounded-lg shadow-md">
            <h3 className="mb-4 text-2xl font-bold text-red-600 cosmic-lager">
              Organizations We Cannot Support
            </h3>
            <ul className="space-y-3">
              {eligibilityCriteria.nonEligibleTypes.map((type, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 mt-1 mr-2 text-red-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="text-lg american text-bronzetone-700">
                    {type}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="mb-4 text-lg american text-bronzetone-700">
            Organizations that do not fit the eligibility criteria may be
            rejected or have their fundraiser canceled at any point in the
            process.
          </p>
          <a
            href="#fundraising-form"
            className="inline-block px-6 py-3 text-lg font-bold text-white transition-colors rounded-lg bg-lightning-yellow-500 cosmic-lager hover:bg-lightning-yellow-600"
          >
            Check Your Eligibility
          </a>
        </div>
      </div>
    </section>
  );
};

export default EligibilityCriteria;
