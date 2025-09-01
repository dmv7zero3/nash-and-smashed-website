// src/core/Pages/Franchise/FranchiseForm.tsx
import React, { useState } from "react";
import { FranchiseFormData, submitFranchiseForm } from "./form.actions";
import NotificationPopUp from "@/core/Templates/NotificationPopUp";

// Add this type to properly type the notification state
type NotificationType = "success" | "error" | "info" | "warning";

const FranchiseForm: React.FC = () => {
  const [formData, setFormData] = useState<FranchiseFormData>({
    firstName: "",
    lastName: "",
    homeAddress: "",
    areaOfInterest: "",
    stateCountryOfInterest: "",
    cityOfInterest: "",
    stateOfResidence: "",
    cityOfResidence: "",
    phone: "",
    email: "",
    liquidCapital: "",
    businessExperience: "",
    referralSource: "",
    website: "", // Honeypot field
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  // Update the notification state to use the NotificationType
  const [notification, setNotification] = useState({
    isVisible: false,
    type: "success" as NotificationType,
    title: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Frontend validation - check business experience length
    if (formData.businessExperience.trim().length < 10) {
      setNotification({
        isVisible: true,
        type: "error",
        title: "Business Experience Too Short",
        message: "Business experience must be at least 10 characters long.",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await submitFranchiseForm(formData);

      if (response.success) {
        // Show success notification
        setNotification({
          isVisible: true,
          type: "success",
          title: "Franchise Inquiry Submitted!",
          message:
            "Thank you for your interest! 🎉 We'll contact you shortly with more information about our franchise opportunity.",
        });

        // Reset form after successful submission
        setFormData({
          firstName: "",
          lastName: "",
          homeAddress: "",
          areaOfInterest: "",
          stateCountryOfInterest: "",
          cityOfInterest: "",
          stateOfResidence: "",
          cityOfResidence: "",
          phone: "",
          email: "",
          liquidCapital: "",
          businessExperience: "",
          referralSource: "",
          website: "", // Reset honeypot field
        });
      } else {
        // Handle rate limiting specifically
        if (response.retryAfter) {
          const retryMinutes = Math.ceil(response.retryAfter / 60);
          setNotification({
            isVisible: true,
            type: "warning",
            title: "Submission Limit Reached",
            message: `You've submitted too many requests. Please wait ${retryMinutes} minutes before trying again.`,
          });
        } else {
          // Show error notification with detailed message
          setNotification({
            isVisible: true,
            type: "error",
            title: "Submission Failed",
            message: response.message || "Please try again later.",
          });
        }
      }
    } catch (error: any) {
      // Show detailed error notification
      setNotification({
        isVisible: true,
        type: "error",
        title: "Error",
        message: `An unexpected error occurred: ${
          error.message || "Please try again later."
        }`,
      });
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeNotification = () => {
    setNotification((prev) => ({ ...prev, isVisible: false }));
  };

  // Rest of your component remains the same
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      {/* Your existing JSX here */}
      <h2 className="mb-6 text-center american-sml text-bronzetone-800">
        Franchise Inquiry Form
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot field - hidden from users */}
        <input
          type="text"
          name="website"
          style={{ display: "none" }}
          tabIndex={-1}
          autoComplete="off"
          value={formData.website || ""}
          onChange={handleInputChange}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="firstName"
              className="block mb-1 font-medium text-bronzetone-800 source-sans-semibold"
            >
              First Name*
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
              className="w-full px-4 py-2 border-2 rounded-md border-lightning-yellow-300 focus:border-lightning-yellow-500 focus:ring focus:ring-lightning-yellow-200 focus:ring-opacity-50 disabled:opacity-60"
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block mb-1 font-medium text-bronzetone-800 source-sans-semibold"
            >
              Last Name*
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
              className="w-full px-4 py-2 border-2 rounded-md border-lightning-yellow-300 focus:border-lightning-yellow-500 focus:ring focus:ring-lightning-yellow-200 focus:ring-opacity-50 disabled:opacity-60"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="homeAddress"
            className="block mb-1 font-medium text-bronzetone-800 source-sans-semibold"
          >
            Home Address*
          </label>
          <input
            type="text"
            id="homeAddress"
            name="homeAddress"
            value={formData.homeAddress}
            onChange={handleInputChange}
            required
            disabled={isSubmitting}
            className="w-full px-4 py-2 border-2 rounded-md border-lightning-yellow-300 focus:border-lightning-yellow-500 focus:ring focus:ring-lightning-yellow-200 focus:ring-opacity-50 disabled:opacity-60"
          />
        </div>

        <div>
          <label
            htmlFor="areaOfInterest"
            className="block mb-1 font-medium text-bronzetone-800 source-sans-semibold"
          >
            Area of Interest*
          </label>
          <select
            id="areaOfInterest"
            name="areaOfInterest"
            value={formData.areaOfInterest}
            onChange={handleInputChange}
            required
            disabled={isSubmitting}
            className="w-full px-4 py-2 border-2 rounded-md border-lightning-yellow-300 focus:border-lightning-yellow-500 focus:ring focus:ring-lightning-yellow-200 focus:ring-opacity-50 disabled:opacity-60"
          >
            <option value="">Select an option</option>
            <option value="Full Restaurant">Full Restaurant</option>
            <option value="Express Unit">
              Express unit (Add-on to an Existing Business)
            </option>
            <option value="Food Truck">Food Truck</option>
            <option value="International">International</option>
          </select>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="stateCountryOfInterest"
              className="block mb-1 font-medium text-bronzetone-800 source-sans-semibold"
            >
              State/Country of Interest*
            </label>
            <input
              type="text"
              id="stateCountryOfInterest"
              name="stateCountryOfInterest"
              value={formData.stateCountryOfInterest}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
              className="w-full px-4 py-2 border-2 rounded-md border-lightning-yellow-300 focus:border-lightning-yellow-500 focus:ring focus:ring-lightning-yellow-200 focus:ring-opacity-50 disabled:opacity-60"
            />
          </div>

          <div>
            <label
              htmlFor="cityOfInterest"
              className="block mb-1 font-medium text-bronzetone-800 source-sans-semibold"
            >
              City of Interest*
            </label>
            <input
              type="text"
              id="cityOfInterest"
              name="cityOfInterest"
              value={formData.cityOfInterest}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
              className="w-full px-4 py-2 border-2 rounded-md border-lightning-yellow-300 focus:border-lightning-yellow-500 focus:ring focus:ring-lightning-yellow-200 focus:ring-opacity-50 disabled:opacity-60"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="stateOfResidence"
              className="block mb-1 font-medium text-bronzetone-800 source-sans-semibold"
            >
              State of Residence*
            </label>
            <input
              type="text"
              id="stateOfResidence"
              name="stateOfResidence"
              value={formData.stateOfResidence}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
              className="w-full px-4 py-2 border-2 rounded-md border-lightning-yellow-300 focus:border-lightning-yellow-500 focus:ring focus:ring-lightning-yellow-200 focus:ring-opacity-50 disabled:opacity-60"
            />
          </div>

          <div>
            <label
              htmlFor="cityOfResidence"
              className="block mb-1 font-medium text-bronzetone-800 source-sans-semibold"
            >
              City of Residence*
            </label>
            <input
              type="text"
              id="cityOfResidence"
              name="cityOfResidence"
              value={formData.cityOfResidence}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
              className="w-full px-4 py-2 border-2 rounded-md border-lightning-yellow-300 focus:border-lightning-yellow-500 focus:ring focus:ring-lightning-yellow-200 focus:ring-opacity-50 disabled:opacity-60"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="phone"
              className="block mb-1 font-medium text-bronzetone-800 source-sans-semibold"
            >
              Phone*
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
              className="w-full px-4 py-2 border-2 rounded-md border-lightning-yellow-300 focus:border-lightning-yellow-500 focus:ring focus:ring-lightning-yellow-200 focus:ring-opacity-50 disabled:opacity-60"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-1 font-medium text-bronzetone-800 source-sans-semibold"
            >
              Email*
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
              className="w-full px-4 py-2 border-2 rounded-md border-lightning-yellow-300 focus:border-lightning-yellow-500 focus:ring focus:ring-lightning-yellow-200 focus:ring-opacity-50 disabled:opacity-60"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="liquidCapital"
            className="block mb-1 font-medium text-bronzetone-800 source-sans-semibold"
          >
            Available Liquid Capital*
          </label>
          <select
            id="liquidCapital"
            name="liquidCapital"
            value={formData.liquidCapital}
            onChange={handleInputChange}
            required
            disabled={isSubmitting}
            className="w-full px-4 py-2 border-2 rounded-md border-lightning-yellow-300 focus:border-lightning-yellow-500 focus:ring focus:ring-lightning-yellow-200 focus:ring-opacity-50 disabled:opacity-60"
          >
            <option value="">Select an option</option>
            <option value="$50,000 - $100,000">$50,000 - $100,000</option>
            <option value="$100,000 - $250,000">$100,000 - $250,000</option>
            <option value="$250,000 - $500,000">$250,000 - $500,000</option>
            <option value="$500,000+">$500,000+</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="businessExperience"
            className="block mb-1 font-medium text-bronzetone-800 source-sans-semibold"
          >
            Business Experience*
          </label>
          <textarea
            id="businessExperience"
            name="businessExperience"
            value={formData.businessExperience}
            onChange={handleInputChange}
            required
            disabled={isSubmitting}
            rows={4}
            className="w-full px-4 py-2 border-2 rounded-md border-lightning-yellow-300 focus:border-lightning-yellow-500 focus:ring focus:ring-lightning-yellow-200 focus:ring-opacity-50 disabled:opacity-60"
            placeholder="Please describe your business background and experience (minimum 10 characters)"
          ></textarea>
        </div>

        <div>
          <label
            htmlFor="referralSource"
            className="block mb-1 font-medium text-bronzetone-800 source-sans-semibold"
          >
            How did you hear about us?
          </label>
          <select
            id="referralSource"
            name="referralSource"
            value={formData.referralSource}
            onChange={handleInputChange}
            disabled={isSubmitting}
            className="w-full px-4 py-2 border-2 rounded-md border-lightning-yellow-300 focus:border-lightning-yellow-500 focus:ring focus:ring-lightning-yellow-200 focus:ring-opacity-50 disabled:opacity-60"
          >
            <option value="">Select an option</option>
            <option value="Search Engine">Search Engine</option>
            <option value="Social Media">Social Media</option>
            <option value="Franchise Website">Franchise Website</option>
            <option value="Restaurant Visit">Restaurant Visit</option>
            <option value="Referral">Referral</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="p-4 mt-4 bg-gray-100 border-l-4 rounded border-lightning-yellow-500">
          <p className="text-sm text-gray-700">
            This information is not intended as an offer to sell, or the
            solicitation of an offer to buy, a franchise. It is for information
            purposes only. The franchisor, N&S Franchising Corp is located at
            5609 Sandy Lewis Drive, Unit G & H, Fairfax VA 22032 United States.
            Currently, the following states regulate the offer and sale of
            franchises: California, Hawaii, Illinois, Indiana, Maryland,
            Michigan, Minnesota, New York, North Dakota, Oregon, Rhode Island,
            South Dakota, Virginia, Washington, and Wisconsin. If you are a
            resident of or want to locate a franchise in one of these states, we
            will not offer you a franchise unless and until we have complied
            with applicable pre-sale registration and disclosure requirements in
            your state. Franchise offerings are made by Franchise Disclosure
            Document only.
          </p>
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-8 py-3 font-bold text-white transition-all bg-lightning-yellow-500 rounded-md hover:bg-lightning-yellow-600 focus:outline-none focus:ring-2 focus:ring-lightning-yellow-300 ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit Franchise Inquiry"}
          </button>
        </div>
      </form>

      {/* Notification Popup */}
      <NotificationPopUp
        isVisible={notification.isVisible}
        type={notification.type}
        title={notification.title}
        message={notification.message}
        onClose={closeNotification}
        autoCloseDuration={8000} // Slightly longer for franchise inquiries
        actionText={notification.type === "success" ? "Close" : undefined}
        onAction={closeNotification}
      />
    </div>
  );
};

export default FranchiseForm;
