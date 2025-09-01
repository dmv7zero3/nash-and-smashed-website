// src/core/Pages/Careers/CareerForm.tsx
import React from "react";
import { Helmet } from "react-helmet";
import CareerForm from "./CareerForm";
import PositionSection from "./PositionSection";
import Introduction from "./Introduction";
import BenefitsSection from "./BenefitsSection";
import Hero from "@/core/Templates/Hero";

const CareersPage: React.FC = () => {
  return (
    <div className="bg-white">
      <Helmet>
        <title>Careers | Nash & Smashed</title>
        <meta
          name="description"
          content="Join the Nash & Smashed team! We're hiring passionate individuals who love food and creating great experiences."
        />
      </Helmet>

      {/* Hero Section */}
      <Hero
        title="Careers at Nash & Smashed"
        subtitle="Join Our Team of Food Lovers"
        backgroundImage="/images/banner/nash-and-smashed-banner.jpg"
      />

      {/* Introduction */}
      <Introduction />

      {/* Benefits Section */}
      <BenefitsSection />

      {/* Positions Section */}
      <PositionSection />

      {/* Application Form */}
      <section id="application-form" className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-dark-olive-bark">
            <h2 className="mb-10 text-center american ">Apply Today</h2>
            <p className="mb-10 text-center american">
              Ready to join our team? Fill out the application form below, and
              we'll be in touch soon.
            </p>
            <CareerForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;
