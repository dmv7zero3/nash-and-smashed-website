import React, { useRef } from "react";

interface HeroProps {
  heroRef: React.RefObject<HTMLDivElement>;
}

const Hero: React.FC<HeroProps> = ({ heroRef }) => {
  return (
    <section
      ref={heroRef}
      className="relative py-20 overflow-hidden bg-lightning-yellow-500"
    >
      <div className="absolute inset-0 opacity-20">
        <img
          src="/images/banner/nash-and-smashed-combo-3.webp"
          alt="Background Pattern"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="container relative z-10 px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="mb-6 text-6xl font-bold text-white cosmic-lager">
            Fundraisers
          </h1>
          <div className="mb-8">
            <span className="inline-block px-4 py-2 text-2xl font-bold bg-white rounded-lg text-lightning-yellow-500 cosmic-lager">
              20% Give Back!
            </span>
          </div>
          <h2 className="mb-6 text-4xl font-bold text-white cosmic-lager">
            Make Fundraising Delicious
          </h2>
          <p className="mb-8 text-xl text-white american">
            Eat at Nash & Smashed to raise funds for your organization. It's
            easy to apply and host an event. You'll receive a 20% donation of
            all online and in-store fundraiser sales.
          </p>
          <a
            href="#fundraising-form"
            className="inline-block px-8 py-4 text-xl font-bold transition-colors bg-white rounded-lg text-lightning-yellow-600 cosmic-lager hover:bg-gray-100"
          >
            GET STARTED
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
