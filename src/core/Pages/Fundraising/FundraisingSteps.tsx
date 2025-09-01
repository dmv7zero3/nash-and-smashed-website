import React, { useRef, useEffect } from "react";
import { fundraisingSteps, fundraisingCategories } from "./data";
import { animateFundraisingSteps, animateFundraisingCategories } from "./gsap";

const FundraisingSteps: React.FC = () => {
  const stepsRef = useRef<HTMLDivElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const categoriesTitleRef = useRef<HTMLHeadingElement>(null);
  const categoriesContainerRef = useRef<HTMLDivElement>(null);
  const calculatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (stepsRef.current && stepsContainerRef.current) {
      animateFundraisingSteps({
        sectionRef: stepsRef,
        contentRef: stepsContainerRef,
      });
    }

    if (
      categoriesRef.current &&
      categoriesTitleRef.current &&
      categoriesContainerRef.current
    ) {
      animateFundraisingCategories({
        sectionRef: categoriesRef,
        titleRef: categoriesTitleRef,
        contentRef: categoriesContainerRef,
      });
    }
  }, []);

  // Fundraiser calculator logic
  const [peopleCount, setPeopleCount] = React.useState(60);
  const [estimatedAmount, setEstimatedAmount] = React.useState(180);

  const handlePeopleCountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const count = parseInt(event.target.value);
    setPeopleCount(count);
    // Calculate 20% of $15 per person (average order)
    setEstimatedAmount(Math.round(count * 15 * 0.2));
  };

  return (
    <>
      {/* Steps Section */}
      <section ref={stepsRef} className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <h2 className="mb-4 text-4xl font-bold text-center cosmic-lager text-bronzetone-800">
            Raise In Three Steps
          </h2>

          <div
            ref={stepsContainerRef}
            className="grid gap-8 mt-10 md:grid-cols-3"
          >
            {fundraisingSteps.map((step) => (
              <div
                key={step.id}
                className="p-6 text-center transition-transform duration-300 rounded-lg bg-gray-50 hover:transform hover:scale-105"
              >
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-3xl font-bold text-white rounded-full bg-lightning-yellow-500">
                  {step.id}
                </div>
                <h3 className="mb-3 text-2xl font-bold cosmic-lager text-bronzetone-800">
                  {step.title}
                </h3>
                <p className="mb-4 text-bronzetone-700 american">
                  {step.description}
                </p>
                <a
                  href={step.ctaLink}
                  className="inline-block font-bold text-lightning-yellow-600 hover:underline"
                >
                  {step.ctaText}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Participation Options */}
      <section className="py-12 bg-gray-50">
        <div className="container max-w-4xl px-4 mx-auto">
          <h2 className="mb-8 text-3xl font-bold text-center cosmic-lager text-bronzetone-800">
            Participate In Person or Online
          </h2>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="p-6 bg-white border-t-4 rounded-lg shadow-md border-lightning-yellow-500">
              <h3 className="mb-4 text-2xl font-bold cosmic-lager text-bronzetone-800">
                Digital Coupons
              </h3>
              <p className="text-bronzetone-700 american">
                Get a digital coupon friends and family can use with the Nash &
                Smashed app.
              </p>
            </div>

            <div className="p-6 bg-white border-t-4 rounded-lg shadow-md border-lightning-yellow-500">
              <h3 className="mb-4 text-2xl font-bold cosmic-lager text-bronzetone-800">
                In-store Events
              </h3>
              <p className="text-bronzetone-700 american">
                Host your fundraiser with an event at your nearest Nash &
                Smashed location.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section ref={categoriesRef} className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <h2
            ref={categoriesTitleRef}
            className="mb-12 text-4xl font-bold text-center cosmic-lager text-bronzetone-800"
          >
            Supporting Your Community
          </h2>

          <div
            ref={categoriesContainerRef}
            className="grid gap-6 md:grid-cols-3"
          >
            {fundraisingCategories.map((category) => (
              <div
                key={category.id}
                className="p-6 transition-shadow duration-300 border rounded-lg bg-lightning-yellow-50 border-lightning-yellow-200 hover:shadow-md"
              >
                <h3 className="mb-3 text-2xl font-bold cosmic-lager text-bronzetone-800">
                  {category.title}
                </h3>
                <p className="text-bronzetone-700 american">
                  {category.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="#fundraising-form"
              className="inline-block px-8 py-4 text-xl font-bold text-white transition-colors rounded-lg bg-lightning-yellow-500 cosmic-lager hover:bg-lightning-yellow-600"
            >
              Start a new fundraiser.
              <span className="block mt-1 text-lg">Apply today</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default FundraisingSteps;
