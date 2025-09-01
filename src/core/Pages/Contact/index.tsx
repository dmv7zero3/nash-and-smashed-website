// src/core/Pages/Contact/index.tsx
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { FormData } from "./types";
import Hero from "@/core/Templates/Hero";
import ContactInformation from "./ContactInformation";
import ContactForm from "./ContactForm";
import MapSection from "./MapSection";
import { submitContactForm } from "./forms.actions";
import { EMAIL, PHONE_NUMBER } from "@/core/constants/business";
import Banner from "./Banner";

// Initial form state for resetting
const initialFormState: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  interestType: "",
  message: "",
};

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Scroll to top when submission is successful
  useEffect(() => {
    if (submitSuccess) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [submitSuccess]);

  const resetForm = () => {
    setFormData(initialFormState);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // In the handleSubmit function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    // Frontend validation - only check message length
    if (formData.message.trim().length < 10) {
      setSubmitError("Message must be at least 10 characters long.");
      setIsSubmitting(false);
      return;
    }

    try {
      console.log("Submitting form data:", formData);
      const response = await submitContactForm(formData);
      console.log("Response from API:", response);

      if (response && response.success) {
        resetForm();
        setSubmitSuccess(true);

        // Track the submission (if you have analytics)
        if (typeof window !== "undefined" && "gtag" in window) {
          // @ts-ignore
          window.gtag("event", "form_submission", {
            event_category: "Contact",
            event_label: formData.interestType,
          });
        }
      } else {
        setSubmitError(
          response.message || "Failed to submit your message. Please try again."
        );
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitError(
        "A network error occurred. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white">
      <Helmet>
        <title>Contact Us | Nash & Smashed</title>
        <meta
          name="description"
          content="Get in touch with Nash & Smashed. We'd love to hear from you about collaborations, inquiries, or feedback."
        />
      </Helmet>
      {/* Hero Section */}
      <Hero
        title="Contact Us"
        subtitle="Let's hear from you! For any inquiry, use the channel below."
        backgroundImage="/images/banner/smashed-burger-meal.jpg"
      />
      {/* Contact Information and Form */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col lg:flex-row lg:space-x-12">
            {/* Contact Information */}
            <ContactInformation
              phone={PHONE_NUMBER}
              email={EMAIL}
              address="5609 Sandy Lewis Drive, Unit G & H, Fairfax, VA 22032"
            />

            {/* Contact Form */}
            <ContactForm
              formData={formData}
              isSubmitting={isSubmitting}
              submitSuccess={submitSuccess}
              submitError={submitError}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </section>
      {/* Map Section */}
      {/* <MapSection mapEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3109.935465329254!2d-77.32099388431998!3d38.78996949530717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b64dec051157e3%3A0xd28c99a6c1b6c8bc!2s5609%20Sandy%20Lewis%20Dr%20Unit%20G%20%26%20H%2C%20Fairfax%2C%20VA%2022032!5e0!3m2!1sen!2sus!4v1710886234982!5m2!1sen!2sus" /> */}
      <Banner />
    </div>
  );
};

export default ContactPage;
