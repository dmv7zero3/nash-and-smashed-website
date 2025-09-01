// src/core/Pages/Careers/CareerForm.tsx
import React, { useState, useEffect, useCallback } from "react";
import {
  FaSpinner,
  FaCheckCircle,
  FaExclamationTriangle,
  FaPaperPlane,
} from "react-icons/fa";
import { CareerFormData, CareerFormState } from "./types";
import { submitCareerForm } from "./form.actions";
import {
  getLocationGroups,
  getLocationDisplayValue,
  getLocationOptionText,
} from "../../constants/locations";

const CareerForm: React.FC = () => {
  const [formData, setFormData] = useState<CareerFormData>({
    eligibleToWork: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    address: "",
    preferredLocation: "",
    weekendAvailability: "",
    position: "",
    startDate: "",
    terminated: "",
    terminationExplanation: "",
    workExperience: "",
    references: "",
    website: "", // Honeypot field
  });

  const [formState, setFormState] = useState<CareerFormState>({
    isSubmitting: false,
    isSuccess: false,
    error: null,
  });

  // Separate state for start date components
  const [startDateMonth, setStartDateMonth] = useState("");
  const [startDateDay, setStartDateDay] = useState("");
  const [startDateYear, setStartDateYear] = useState("");

  // Mobile detection
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  // Get location groups for dynamic dropdown
  const locationGroups = getLocationGroups();

  // Improved scroll to top function with mobile-specific handling
  const scrollToForm = useCallback(() => {
    const element = document.getElementById("application-form");
    if (element) {
      if (isMobile) {
        // Mobile-specific scroll behavior
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      } else {
        // Desktop scroll
        window.scrollTo({
          top: element.offsetTop - 20,
          behavior: "smooth",
        });
      }
    } else {
      // Fallback: scroll to top
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [isMobile]);

  // Auto-scroll when success state changes - with mobile delay
  useEffect(() => {
    if (formState.isSuccess) {
      if (isMobile) {
        // Add slight delay for mobile to ensure state has fully updated
        setTimeout(() => {
          scrollToForm();
        }, 300);
      } else {
        setTimeout(() => {
          scrollToForm();
        }, 100);
      }
    }
  }, [formState.isSuccess, scrollToForm, isMobile]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStartDateChange = (
    type: "month" | "day" | "year",
    value: string
  ) => {
    if (type === "month") setStartDateMonth(value);
    else if (type === "day") setStartDateDay(value);
    else if (type === "year") setStartDateYear(value);

    // Update the combined start date
    const month = type === "month" ? value : startDateMonth;
    const day = type === "day" ? value : startDateDay;
    const year = type === "year" ? value : startDateYear;

    if (month && day && year) {
      setFormData((prev) => ({
        ...prev,
        startDate: `${month}/${day}/${year}`,
      }));
    }
  };

  const resetForm = useCallback(() => {
    setFormData({
      eligibleToWork: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      age: "",
      address: "",
      preferredLocation: "",
      weekendAvailability: "",
      position: "",
      startDate: "",
      terminated: "",
      terminationExplanation: "",
      workExperience: "",
      references: "",
      website: "",
    });
    setStartDateMonth("");
    setStartDateDay("");
    setStartDateYear("");
  }, []);

  // Mobile-optimized success state setter
  const setSuccessState = useCallback(() => {
    console.log("✅ Setting success state - Mobile:", isMobile);

    if (isMobile) {
      // Mobile-specific success state handling
      // Use multiple state updates to ensure mobile browsers pick it up
      setFormState({
        isSubmitting: false,
        isSuccess: false, // Start with false
        error: null,
      });

      // Small delay, then set success
      setTimeout(() => {
        setFormState({
          isSubmitting: false,
          isSuccess: true,
          error: null,
        });
      }, 50);

      // Force additional re-render for stubborn mobile browsers
      setTimeout(() => {
        setFormState((prev) => ({
          ...prev,
          isSuccess: true,
        }));
      }, 150);
    } else {
      // Desktop - standard approach
      setFormState({
        isSubmitting: false,
        isSuccess: true,
        error: null,
      });
    }
  }, [isMobile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("📱 Starting form submission - Mobile:", isMobile);

    setFormState({
      isSubmitting: true,
      isSuccess: false,
      error: null,
    });
    await new Promise((resolve) => setTimeout(resolve, 50));

    // Prepare form data for submission - map to expected backend fields
    const formDataToSubmit = {
      ...formData,
      // Map frontend fields to backend expected fields
      interestType: formData.position, // Backend expects interestType
      cityState: formData.preferredLocation, // Backend expects cityState
    };

    try {
      console.log("📤 Submitting form data...");
      const response = await submitCareerForm(formDataToSubmit);

      console.log("📥 Received response:", response);
      console.log("✅ Response success:", response.success);

      if (response.success) {
        console.log("🎉 SUCCESS: Starting success flow for mobile:", isMobile);

        // Reset form first
        resetForm();

        // Set success state with mobile-specific handling
        setSuccessState();

        // Optional: Track successful submission
        if (typeof window !== "undefined" && "gtag" in window) {
          // @ts-ignore
          window.gtag("event", "career_application_submitted", {
            event_category: "Careers",
            event_label: formData.position,
            value: 1,
          });
        }

        // Optional: Show browser notification if permission granted
        if (Notification.permission === "granted") {
          new Notification("Application Submitted!", {
            body: "Your job application has been successfully submitted.",
            icon: "/favicon.ico",
          });
        }

        console.log("✅ SUCCESS: Success flow completed");
      } else {
        console.log("❌ FAILED: API returned success: false");
        setFormState({
          isSubmitting: false,
          isSuccess: false,
          error: response.message,
        });
      }
    } catch (error) {
      console.error("💥 EXCEPTION: Career form submission error:", error);
      setFormState({
        isSubmitting: false,
        isSuccess: false,
        error: "An unexpected error occurred. Please try again later.",
      });
    }
  };

  const handleRetrySubmit = () => {
    setFormState({
      isSubmitting: false,
      isSuccess: false,
      error: null,
    });
  };

  const handleStartNewApplication = () => {
    setFormState({
      isSubmitting: false,
      isSuccess: false,
      error: null,
    });
    resetForm();
  };

  // Success State Component with mobile optimization
  if (formState.isSuccess) {
    console.log("🎊 RENDERING SUCCESS STATE");
    return (
      <div id="application-form" className="p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          {/* Success Animation - simplified for mobile */}
          <div className="relative">
            <FaCheckCircle
              className={`mx-auto mb-4 text-green-500 ${
                isMobile ? "animate-pulse" : "animate-bounce"
              }`}
              size={isMobile ? 48 : 64}
            />
            {!isMobile && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 border-4 border-green-200 rounded-full animate-ping"></div>
              </div>
            )}
          </div>

          <h2 className="mb-4 text-2xl font-bold text-green-700 md:text-3xl">
            Application Submitted Successfully!
          </h2>

          <div className="max-w-md mx-auto mb-6">
            <p className="mb-4 text-base text-gray-700 md:text-lg">
              Thank you for your interest in joining the Nash & Smashed team!
            </p>
            <p className="mb-4 text-sm text-gray-600 md:text-base">
              We have received your application and will review it carefully
              within the next 3-5 business days.
            </p>
          </div>

          {/* What happens next */}
          <div className="max-w-lg p-4 mx-auto mb-6 border border-green-200 rounded-lg md:p-6 md:mb-8 bg-green-50">
            <h3 className="mb-4 text-base font-bold text-green-800 md:text-lg">
              What happens next?
            </h3>
            <div className="space-y-3 text-left">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                  1
                </div>
                <p className="text-sm text-green-700">
                  Our HR team will review your application
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                  2
                </div>
                <p className="text-sm text-green-700">
                  If you're a good fit, we'll contact you for an interview
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                  3
                </div>
                <p className="text-sm text-green-700">
                  Check your email for updates on your application status
                </p>
              </div>
            </div>
          </div>

          {/* Action buttons - mobile optimized */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <button
              onClick={handleStartNewApplication}
              className="w-full px-6 py-3 font-medium text-white transition-all bg-green-600 rounded-lg sm:w-auto hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-200"
            >
              Submit Another Application
            </button>
            <a
              href="/contact"
              className="w-full px-6 py-3 font-medium text-center text-green-700 transition-all bg-green-100 border border-green-300 rounded-lg sm:w-auto hover:bg-green-200 focus:outline-none focus:ring-4 focus:ring-green-200"
            >
              Contact Us
            </a>
          </div>

          {/* Additional helpful info */}
          <div className="p-4 mt-6 rounded-lg md:mt-8 bg-gray-50">
            <p className="text-sm text-gray-600">
              <strong>Questions about your application?</strong>
              <br />
              Email us at{" "}
              <a
                href="mailto:accounting@nashandsmashed.com"
                className="text-green-600 break-all hover:text-green-700"
              >
                accounting@nashandsmashed.com
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  console.log(
    "📝 RENDERING FORM STATE - isSubmitting:",
    formState.isSubmitting,
    "isSuccess:",
    formState.isSuccess
  );

  return (
    <div
      id="application-form"
      className="p-6 bg-white rounded-lg shadow-lg md:p-8"
    >
      <h2 className="mb-6 text-2xl text-center md:text-3xl cosmic-lager text-dark-olive-bark">
        Job Application Form
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Work Eligibility */}
        <div>
          <label className="block mb-2 font-medium text-bronzetone-800">
            Are you eligible to work in the United States?*
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="eligibleToWork"
                value="yes"
                checked={formData.eligibleToWork === "yes"}
                onChange={handleInputChange}
                required
                disabled={formState.isSubmitting}
                className="mr-2"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="eligibleToWork"
                value="no"
                checked={formData.eligibleToWork === "no"}
                onChange={handleInputChange}
                required
                disabled={formState.isSubmitting}
                className="mr-2"
              />
              No
            </label>
          </div>
        </div>

        {/* Personal Information */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block mb-2 font-medium text-bronzetone-800">
              First Name*
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              disabled={formState.isSubmitting}
              className="w-full px-4 py-3 border-2 rounded-md border-lightning-yellow-300 focus:border-lightning-yellow-500 focus:ring focus:ring-lightning-yellow-200 focus:ring-opacity-50 disabled:opacity-60"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-bronzetone-800">
              Last Name*
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              disabled={formState.isSubmitting}
              className="w-full px-4 py-3 border-2 rounded-md border-lightning-yellow-300 focus:border-lightning-yellow-500 focus:ring focus:ring-lightning-yellow-200 focus:ring-opacity-50 disabled:opacity-60"
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block mb-2 font-medium text-bronzetone-800">
              Email*
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              disabled={formState.isSubmitting}
              className="w-full px-4 py-3 border-2 rounded-md border-lightning-yellow-300 focus:border-lightning-yellow-500 focus:ring focus:ring-lightning-yellow-200 focus:ring-opacity-50 disabled:opacity-60"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-bronzetone-800">
              Phone Number*
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              disabled={formState.isSubmitting}
              className="w-full px-4 py-3 border-2 rounded-md border-lightning-yellow-300 focus:border-lightning-yellow-500 focus:ring focus:ring-lightning-yellow-200 focus:ring-opacity-50 disabled:opacity-60"
            />
          </div>
        </div>

        {/* Hidden honeypot field */}
        <input
          type="text"
          name="website"
          style={{ display: "none" }}
          tabIndex={-1}
          autoComplete="off"
          value={formData.website || ""}
          onChange={handleInputChange}
        />

        {/* Age */}
        <div>
          <label className="block mb-2 font-medium text-bronzetone-800">
            Age*
          </label>
          <select
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            required
            disabled={formState.isSubmitting}
            className="w-full px-4 py-3 border-2 rounded-md border-lightning-yellow-300 focus:border-lightning-yellow-500 focus:ring focus:ring-lightning-yellow-200 focus:ring-opacity-50 disabled:opacity-60"
          >
            <option value="">Select Age Range</option>
            <option value="16-17">16-17</option>
            <option value="18-25">18-25</option>
            <option value="26-35">26-35</option>
            <option value="36-45">36-45</option>
            <option value="46-55">46-55</option>
            <option value="55+">55+</option>
          </select>
        </div>

        {/* Address */}
        <div>
          <label className="block mb-2 font-medium text-bronzetone-800">
            Address*
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
            disabled={formState.isSubmitting}
            className="w-full px-4 py-3 border-2 rounded-md border-lightning-yellow-300 focus:border-lightning-yellow-500 focus:ring focus:ring-lightning-yellow-200 focus:ring-opacity-50 disabled:opacity-60"
            placeholder="Street Address, City, State, ZIP"
          />
        </div>

        {/* Job Preferences */}
        <div>
          <label className="block mb-2 font-medium text-bronzetone-800">
            Preferred Location*
          </label>
          <select
            name="preferredLocation"
            value={formData.preferredLocation}
            onChange={handleInputChange}
            required
            disabled={formState.isSubmitting}
            className="w-full px-4 py-3 border-2 rounded-md border-lightning-yellow-300 focus:border-lightning-yellow-500 focus:ring focus:ring-lightning-yellow-200 focus:ring-opacity-50 disabled:opacity-60"
          >
            <option value="">Select Location</option>

            {/* Dynamic location groups */}
            {Object.entries(locationGroups).map(
              ([groupName, groupLocations]) => (
                <optgroup key={groupName} label={groupName}>
                  {groupLocations.map((location) => (
                    <option
                      key={location.id}
                      value={getLocationDisplayValue(location)}
                    >
                      {getLocationOptionText(location)}
                    </option>
                  ))}
                </optgroup>
              )
            )}

            {/* Static options for flexibility */}
            <optgroup label="Other">
              <option value="Any Location">Any Location</option>
              <option value="Future Locations">Future Locations</option>
              <option value="Remote/Corporate">Remote/Corporate</option>
            </optgroup>
          </select>
        </div>

        {/* Weekend Availability */}
        <div>
          <label className="block mb-2 font-medium text-bronzetone-800">
            Weekend Availability*
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="weekendAvailability"
                value="yes"
                checked={formData.weekendAvailability === "yes"}
                onChange={handleInputChange}
                required
                disabled={formState.isSubmitting}
                className="mr-2"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="weekendAvailability"
                value="no"
                checked={formData.weekendAvailability === "no"}
                onChange={handleInputChange}
                required
                disabled={formState.isSubmitting}
                className="mr-2"
              />
              No
            </label>
          </div>
        </div>

        {/* Position Interested In */}
        <div>
          <label className="block mb-2 font-medium text-bronzetone-800">
            Position Interested In*
          </label>
          <select
            name="position"
            value={formData.position}
            onChange={handleInputChange}
            required
            disabled={formState.isSubmitting}
            className="w-full px-4 py-3 border-2 rounded-md border-lightning-yellow-300 focus:border-lightning-yellow-500 focus:ring focus:ring-lightning-yellow-200 focus:ring-opacity-50 disabled:opacity-60"
          >
            <option value="">Select Position</option>
            <option value="Team Member">Team Member</option>
            <option value="Shift Leader">Shift Leader</option>
            <option value="Assistant Manager">Assistant Manager</option>
            <option value="Manager">Manager</option>
            <option value="Kitchen Staff">Kitchen Staff</option>
            <option value="Cashier">Cashier</option>
            <option value="Line Cook">Line Cook</option>
            <option value="Grill Cook">Grill Cook</option>
            <option value="Dishwasher/Prep">Dishwasher/Prep</option>
            <option value="General Manager">General Manager</option>
          </select>
        </div>

        {/* Start Date */}
        <div>
          <label className="block mb-2 font-medium text-bronzetone-800">
            Earliest Start Date*
          </label>
          <div className="grid grid-cols-3 gap-2">
            <select
              value={startDateMonth}
              onChange={(e) => handleStartDateChange("month", e.target.value)}
              required
              disabled={formState.isSubmitting}
              className="px-4 py-3 border-2 rounded-md border-lightning-yellow-300 focus:border-lightning-yellow-500 focus:ring focus:ring-lightning-yellow-200 focus:ring-opacity-50 disabled:opacity-60"
            >
              <option value="">Month</option>
              {Array.from({ length: 12 }, (_, i) => {
                const month = String(i + 1).padStart(2, "0");
                const monthName = new Date(2023, i, 1).toLocaleString(
                  "default",
                  { month: "long" }
                );
                return (
                  <option key={month} value={month}>
                    {monthName}
                  </option>
                );
              })}
            </select>

            <select
              value={startDateDay}
              onChange={(e) => handleStartDateChange("day", e.target.value)}
              required
              disabled={formState.isSubmitting}
              className="px-4 py-3 border-2 rounded-md border-lightning-yellow-300 focus:border-lightning-yellow-500 focus:ring focus:ring-lightning-yellow-200 focus:ring-opacity-50 disabled:opacity-60"
            >
              <option value="">Day</option>
              {Array.from({ length: 31 }, (_, i) => {
                const day = String(i + 1).padStart(2, "0");
                return (
                  <option key={day} value={day}>
                    {day}
                  </option>
                );
              })}
            </select>

            <select
              value={startDateYear}
              onChange={(e) => handleStartDateChange("year", e.target.value)}
              required
              disabled={formState.isSubmitting}
              className="px-4 py-3 border-2 rounded-md border-lightning-yellow-300 focus:border-lightning-yellow-500 focus:ring focus:ring-lightning-yellow-200 focus:ring-opacity-50 disabled:opacity-60"
            >
              <option value="">Year</option>
              {Array.from({ length: 3 }, (_, i) => {
                const year = new Date().getFullYear() + i;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {/* Employment History */}
        <div>
          <label className="block mb-2 font-medium text-bronzetone-800">
            Have you ever been terminated from a job?*
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="terminated"
                value="yes"
                checked={formData.terminated === "yes"}
                onChange={handleInputChange}
                required
                disabled={formState.isSubmitting}
                className="mr-2"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="terminated"
                value="no"
                checked={formData.terminated === "no"}
                onChange={handleInputChange}
                required
                disabled={formState.isSubmitting}
                className="mr-2"
              />
              No
            </label>
          </div>
        </div>

        {/* Explain termination if yes */}
        {formData.terminated === "yes" && (
          <div>
            <label className="block mb-2 font-medium text-bronzetone-800">
              Please explain the circumstances:*
            </label>
            <textarea
              name="terminationExplanation"
              value={formData.terminationExplanation}
              onChange={handleInputChange}
              required
              disabled={formState.isSubmitting}
              rows={3}
              className="w-full px-4 py-3 border-2 rounded-md border-lightning-yellow-300 focus:border-lightning-yellow-500 focus:ring focus:ring-lightning-yellow-200 focus:ring-opacity-50 disabled:opacity-60"
            />
          </div>
        )}

        {/* Work Experience */}
        <div>
          <label className="block mb-2 font-medium text-bronzetone-800">
            Work Experience*
          </label>
          <textarea
            name="workExperience"
            value={formData.workExperience}
            onChange={handleInputChange}
            required
            disabled={formState.isSubmitting}
            rows={5}
            placeholder="Please describe your work experience, including job titles, companies, dates of employment, and key responsibilities..."
            className="w-full px-4 py-3 border-2 rounded-md border-lightning-yellow-300 focus:border-lightning-yellow-500 focus:ring focus:ring-lightning-yellow-200 focus:ring-opacity-50 disabled:opacity-60"
          />
        </div>

        {/* References */}
        <div>
          <label className="block mb-2 font-medium text-bronzetone-800">
            References*
          </label>
          <textarea
            name="references"
            value={formData.references}
            onChange={handleInputChange}
            required
            disabled={formState.isSubmitting}
            rows={4}
            placeholder="Please provide at least 2 references with their name, relationship, and contact information..."
            className="w-full px-4 py-3 border-2 rounded-md border-lightning-yellow-300 focus:border-lightning-yellow-500 focus:ring focus:ring-lightning-yellow-200 focus:ring-opacity-50 disabled:opacity-60"
          />
        </div>

        {/* Error Display */}
        {formState.error && (
          <div className="flex items-start p-4 text-red-700 bg-red-100 border-l-4 border-red-500 rounded">
            <FaExclamationTriangle className="mt-1 mr-3 text-red-500" />
            <div className="flex-1">
              <p className="font-bold">
                There was a problem submitting your application
              </p>
              <p className="mb-3">{formState.error}</p>
              <button
                onClick={handleRetrySubmit}
                className="px-4 py-2 text-sm font-medium text-red-700 transition-colors bg-red-200 rounded hover:bg-red-300"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={formState.isSubmitting}
            className={`flex items-center justify-center px-8 py-3 font-bold text-white transition-all bg-lightning-yellow-500 rounded-md hover:bg-lightning-yellow-600 focus:outline-none focus:ring-4 focus:ring-lightning-yellow-200 min-w-[180px] ${
              formState.isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {formState.isSubmitting ? (
              <>
                <FaSpinner className="mr-2 animate-spin" />
                Submitting Application...
              </>
            ) : (
              <>
                <FaPaperPlane className="mr-2" />
                Submit Application
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CareerForm;
