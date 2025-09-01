// src/core/Pages/Franchise/BusinessConcept.tsx
import React from "react";

const BusinessConcept: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-10">
          <div className="mb-10 md:w-1/2 md:mb-0">
            <div className="rounded-lg">
              <picture className="scale-110">
                <source
                  srcSet="/images/food/nash-and-smashed-burgers.webp"
                  type="image/webp"
                />
                <img
                  src="/images/food/nash-and-smashed-burgers.png"
                  alt="Nash & Smashed Concept"
                  className="w-full h-auto"
                  width="800"
                  height="600"
                  loading="eager"
                />
              </picture>
            </div>
          </div>
          <div className="md:w-1/2 text-dark-olive-bark">
            <h2 className="mb-6 american faq-title">Our Concept</h2>
            <div className="">
              <p className="mb-4 text-lg font-bold open-sans">
                At Nash & Smashed, we are dedicated to delivering the vibrant
                flavors of Nashville Sandwiches, Smashed Burgers, and Fried
                Chicken, all within a unique and refined dining experience. By
                harmoniously blending Southern culinary traditions with
                contemporary dining, we offer signature fried chicken sandwiches
                and expertly crafted smashed burgers made from locally sourced,
                halal, and antibiotic-free ingredients to ensure the highest
                quality.
              </p>

              <p className="mb-4 text-lg font-bold open-sans">
                Guests can savor fully customizable meals with a variety of
                toppings and sauces, complemented by exquisite mocktails and
                desserts. Committed to community engagement and quality, Nash &
                Smashed actively participates in local events, supports nearby
                farmers, and prioritizes exceptional customer service, creating
                a welcoming atmosphere that encourages repeat visits.
              </p>

              <p className="mb-4 text-lg font-bold open-sans">
                This unwavering dedication to authenticity, quality, and
                community connection distinguishes Nash & Smashed as a premier
                destination for food enthusiasts and presents an exciting
                franchise opportunity for aspiring entrepreneurs.
              </p>

              <div className="flex mt-6 space-x-4">
                <a
                  href="/pdfs/nash-and-smashed-franchise-brouchure.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 font-bold transition-all rounded-md open-sans text-dark-olive-bark bg-lightning-yellow-400 hover:bg-lightning-yellow-500 focus:ring-2 focus:ring-lightning-yellow-300"
                >
                  Download Franchise USA Brochure
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessConcept;
