// src/core/Pages/Locations/UnitedKingdom/Chelmsford/ContactForm/index.tsx
import React, { useState } from "react";
import { ChelmsfordLocationData } from "../types";
import {
  FaFacebookSquare,
  FaInstagram,
  FaTiktok,
  FaSpinner,
} from "react-icons/fa";
import {
  ChelmsfordFormData,
  NotificationType,
  NotificationState,
} from "./types";
import { submitChelmsfordContactForm } from "./form.actions";
import NotificationPopUp from "@/core/Templates/NotificationPopUp";
import { headquarters } from "@/core/constants/locations";
import {
  EMAIL,
  UK_FRANCHISING_EMAIL,
  PHONE_NUMBER,
} from "@/core/constants/business";

interface ContactFormProps {
  locationData: ChelmsfordLocationData;
}

const ContactForm: React.FC<ContactFormProps> = ({ locationData }) => {
  // Initial form state
  const initialFormState: ChelmsfordFormData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    interestType: "General Inquiry",
  };

  const [formState, setFormState] =
    useState<ChelmsfordFormData>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<NotificationState>({
    isVisible: false,
    type: "success" as NotificationType,
    title: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormState((prev: ChelmsfordFormData) => ({ ...prev, [name]: value }));
  };

  const closeNotification = () => {
    setNotification((prev) => ({ ...prev, isVisible: false }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic frontend validation
    if (formState.message.trim().length < 10) {
      setNotification({
        isVisible: true,
        type: "error",
        title: "Validation Error",
        message: "Message must be at least 10 characters long.",
      });
      setIsSubmitting(false);
      return;
    }

    if (!formState.firstName.trim()) {
      setNotification({
        isVisible: true,
        type: "error",
        title: "Validation Error",
        message: "Please enter your first name.",
      });
      setIsSubmitting(false);
      return;
    }

    if (!formState.lastName.trim()) {
      setNotification({
        isVisible: true,
        type: "error",
        title: "Validation Error",
        message: "Please enter your last name.",
      });
      setIsSubmitting(false);
      return;
    }

    if (!formState.email.trim() || !formState.email.includes("@")) {
      setNotification({
        isVisible: true,
        type: "error",
        title: "Validation Error",
        message: "Please enter a valid email address.",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Use the actual API submission
      const response = await submitChelmsfordContactForm(formState);

      if (response.success) {
        // Show success notification
        setNotification({
          isVisible: true,
          type: "success",
          title: "Message Sent!",
          message:
            "Thank you for contacting Nash & Smashed Chelmsford. We'll be in touch soon!",
        });

        // Reset form on success
        setFormState(initialFormState);

        // Optional: Track the submission (if you have analytics)
        if (typeof window !== "undefined" && "gtag" in window) {
          // @ts-ignore
          window.gtag("event", "uk_contact_form_submission", {
            event_category: "UK_Contact",
            event_label: formState.interestType,
            location: "Chelmsford",
          });
        }
      } else {
        // Show error notification
        setNotification({
          isVisible: true,
          type: "error",
          title: "Submission Failed",
          message: response.message || "Please try again later.",
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);

      // Show error notification for exceptions
      setNotification({
        isVisible: true,
        type: "error",
        title: "Error",
        message: "An unexpected error occurred. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-form" className="py-16 text-white bg-dark-olive-bark">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto">
          <h2 className="mb-4 text-4xl text-center cosmic-lager">
            Contact Our UK Team
          </h2>
          <div className="mb-2 text-center">
            <span className="px-3 py-1 text-sm text-white bg-red-600 rounded-full">
              🇬🇧 United Kingdom Operations
            </span>
          </div>
          <p className="mb-8 text-center proxima">
            Get in touch with our UK team at Nash & Smashed Chelmsford!
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="interestType" className="block mb-2 proxima">
                Interested in:*
              </label>
              <select
                id="interestType"
                name="interestType"
                value={formState.interestType}
                onChange={handleChange}
                className="w-full p-3 text-gray-900 border rounded-md bg-dark-olive-bark-800 border-lightning-yellow-400 focus:ring-2 focus:ring-lightning-yellow-300 proxima"
                required
                disabled={isSubmitting}
              >
                <option value="">Select an option</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Media">Media</option>
                <option value="Collaboration">Collaboration</option>
                <option value="Franchise">Franchise Opportunity</option>
                <option value="Supplier">Supplier</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="block mb-2 proxima">
                  First Name*
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formState.firstName}
                  onChange={handleChange}
                  className="w-full p-3 text-gray-900 border rounded-md bg-dark-olive-bark-800 border-lightning-yellow-400 focus:ring-2 focus:ring-lightning-yellow-300 proxima"
                  required
                  disabled={isSubmitting}
                  placeholder="Your first name"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block mb-2 proxima">
                  Last Name*
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formState.lastName}
                  onChange={handleChange}
                  className="w-full p-3 text-gray-900 border rounded-md bg-dark-olive-bark-800 border-lightning-yellow-400 focus:ring-2 focus:ring-lightning-yellow-300 proxima"
                  required
                  disabled={isSubmitting}
                  placeholder="Your last name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="email" className="block mb-2 proxima">
                  Email*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  className="w-full p-3 text-gray-900 border rounded-md bg-dark-olive-bark-800 border-lightning-yellow-400 focus:ring-2 focus:ring-lightning-yellow-300 proxima"
                  required
                  disabled={isSubmitting}
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block mb-2 proxima">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formState.phone}
                  onChange={handleChange}
                  className="w-full p-3 text-gray-900 border rounded-md bg-dark-olive-bark-800 border-lightning-yellow-400 focus:ring-2 focus:ring-lightning-yellow-300 proxima"
                  disabled={isSubmitting}
                  placeholder="Your phone number (optional)"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block mb-2 proxima">
                Message*
              </label>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                rows={5}
                className="w-full p-3 text-gray-900 border rounded-md bg-dark-olive-bark-800 border-lightning-yellow-400 focus:ring-2 focus:ring-lightning-yellow-300 proxima"
                required
                disabled={isSubmitting}
                placeholder="How can we help you? (Please write at least 10 characters)"
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center px-8 py-3 mx-auto font-bold transition-colors rounded-md bg-lightning-yellow-400 text-dark-olive-bark hover:bg-lightning-yellow-500 proxima disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className="mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </div>
          </form>

          <div className="flex flex-col items-center justify-between mt-12 space-y-6 md:flex-row md:space-y-0">
            <div>
              <h3 className="mb-2 text-xl cosmic-lager">Contact Details</h3>
              <p className="proxima">
                {headquarters.fullAddress}
                <br />
                <a
                  href={`tel:+1${PHONE_NUMBER.replace(/\D/g, "")}`}
                  className="hover:text-lightning-yellow-300"
                >
                  +1{" "}
                  {PHONE_NUMBER.replace(/\D/g, "").replace(
                    /(\d{3})(\d{3})(\d{4})/,
                    "($1) $2-$3"
                  )}
                </a>
                <br />
                <a
                  href={`mailto:${EMAIL}`}
                  className="hover:text-lightning-yellow-300"
                >
                  {EMAIL}
                </a>
                <br />
                <a
                  href={`mailto:${UK_FRANCHISING_EMAIL}`}
                  className="hover:text-lightning-yellow-300"
                >
                  {UK_FRANCHISING_EMAIL}
                </a>
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-xl cosmic-lager">Connect With Us</h3>
              <div className="flex space-x-6">
                {locationData.socialMedia.facebook && (
                  <a
                    href={locationData.socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-lightning-yellow-300"
                    aria-label="Facebook"
                  >
                    <FaFacebookSquare size={30} />
                  </a>
                )}
                {locationData.socialMedia.instagram && (
                  <a
                    href={locationData.socialMedia.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-lightning-yellow-300"
                    aria-label="Instagram"
                  >
                    <FaInstagram size={30} />
                  </a>
                )}
                {locationData.socialMedia.tiktok && (
                  <a
                    href={locationData.socialMedia.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-lightning-yellow-300"
                    aria-label="TikTok"
                  >
                    <FaTiktok size={30} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Popup */}
      <NotificationPopUp
        isVisible={notification.isVisible}
        type={notification.type}
        title={notification.title}
        message={notification.message}
        onClose={closeNotification}
        autoCloseDuration={6000}
        actionText={notification.type === "success" ? "Close" : undefined}
        onAction={closeNotification}
      />
    </section>
  );
};

export default ContactForm;
