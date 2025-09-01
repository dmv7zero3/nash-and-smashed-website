import React from "react";

interface IntroductionProps {
  setIntroRefs: (el: HTMLDivElement | null) => void;
}

const Introduction: React.FC<IntroductionProps> = ({ setIntroRefs }) => {
  return (
    <section className="py-16 bg-white">
      <div className="container px-4 mx-auto">
        <div
          ref={setIntroRefs}
          className="max-w-4xl mx-auto text-center opacity-0 text-dark-olive-bark"
        >
          <h2 className="mb-6 american">Nutrition You Can Trust</h2>
          <p className="mb-8">
            At Nash & Smashed, we believe in transparency about what goes into
            our food. Our commitment to using high-quality, halal, and
            antibiotic-free ingredients means you can feel good about what
            you're eating. Browse our nutritional information below to make
            choices that align with your dietary preferences.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
