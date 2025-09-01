// src/core/Pages/Franchise/FranchiseFAQs.tsx
import React from "react";

const FranchiseFAQs: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50 american text-dark-olive-bark">
      <div className="container px-4 mx-auto">
        <h2 className="mb-10 text-3xl font-bold text-center american ">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <h2 className="mb-3 faq-title text-dark-olive-bark ">
              What makes Nash & Smashed different from other fast-casual
              concepts?
            </h2>
            <p className="american faq-paragraph">
              Nash & Smashed stands out from other fast-casual concepts by
              seamlessly combining Nashville Sandwiches, premium Smashed
              Burgers, and Fried Chicken in a unique, customizable menu format.
              The commitment to using halal, locally sourced, and
              antibiotic-free ingredients sets the brand apart, ensuring
              exceptional quality in every dish.
            </p>
            <p className="american faq-paragraph">
              Additionally, the array of signature sauces enhances the flavor
              experience, allowing guests to tailor their meals to suit
              individual tastes. A strong focus on community engagement further
              distinguishes Nash & Smashed, as it actively supports local
              initiatives and fosters connections within the neighborhoods it
              serves.
            </p>
          </div>
          <div className="mb-6">
            <h2 className="mb-3 faq-title text-dark-olive-bark ">
              What is the typical timeline from signing to opening a location?
            </h2>
            <p className="american faq-paragraph">
              The average timeline from signing a franchise agreement to the
              opening day is around 6-9 months. However, it's important to note
              that this process can take up to 6-8 months after site selection
              due to factors such as lease negotiations, permitting,
              construction, and training schedules.
            </p>
          </div>
          <div className="mb-6">
            <h2 className="mb-3 faq-title text-dark-olive-bark ">
              Do I need restaurant experience to be a franchise owner?
            </h2>
            <p className="american faq-paragraph">
              While restaurant experience is beneficial, it's not required.
              We're looking for passionate entrepreneurs with strong business
              acumen, leadership skills, and dedication to customer service. Our
              comprehensive training program will teach you all aspects of
              operating a Nash & Smashed restaurant.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FranchiseFAQs;
