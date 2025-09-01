import React, { useRef, useEffect, useState } from "react";
import { frequentlyAskedQuestions } from "./data";
import { animateFundraisingFAQ } from "./gsap";

const FundraisingFAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const questionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current && titleRef.current && questionsRef.current) {
      animateFundraisingFAQ({
        sectionRef,
        titleRef,
        questionsRef,
      });
    }
  }, []);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section ref={sectionRef} id="fundraising-faq" className="py-16 bg-white">
      <div className="container max-w-4xl px-4 mx-auto">
        <div className="mb-10 text-center">
          <h2
            ref={titleRef}
            className="mb-6 text-4xl font-bold cosmic-lager text-bronzetone-800"
          >
            Frequently Asked Questions
          </h2>
          <p className="text-xl american text-bronzetone-700">
            Everything you need to know about our fundraising program
          </p>
        </div>

        <div ref={questionsRef} className="space-y-4">
          {frequentlyAskedQuestions.map((faq, index) => (
            <div
              key={faq.id}
              className="overflow-hidden border border-gray-200 rounded-lg"
            >
              <button
                className="flex items-center justify-between w-full p-5 transition-colors bg-gray-50 hover:bg-gray-100"
                onClick={() => toggleAccordion(index)}
                aria-expanded={activeIndex === index}
              >
                <h3 className="text-left faq-title text-bronzetone-800">
                  {faq.question}
                </h3>
                <span className="transition-transform duration-300 transform accordion-icon-faq">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6 transform transition-transform duration-300 ${
                      activeIndex === index ? "rotate-45" : "rotate-0"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </span>
              </button>
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  activeIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="p-5 american faq-paragraph text-bronzetone-700">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="mb-4 text-lg american text-bronzetone-700">
            Still have questions about our fundraising program?
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-3 text-lg font-bold text-white transition-colors rounded-lg bg-lightning-yellow-500 cosmic-lager hover:bg-lightning-yellow-600"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default FundraisingFAQ;
