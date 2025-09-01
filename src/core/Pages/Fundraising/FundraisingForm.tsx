import React, { useState, useRef, FormEvent, useEffect } from "react";
import { submitFundraisingForm, FundraisingFormData } from "./form.actions";
import NotificationPopUp from "@/core/Templates/NotificationPopUp";
import {
  getActiveLocations,
  getLocationGroups,
  getLocationDisplayValue,
} from "@/core/constants/locations";

type NotificationType = "success" | "error" | "info" | "warning";

interface FundraisingFormProps {
  formRef: React.RefObject<HTMLFormElement>;
}

const FundraisingForm: React.FC<FundraisingFormProps> = ({ formRef }) => {
  const [formData, setFormData] = useState<FundraisingFormData>({
    organizationName: "",
    orgType: "",
    contactName: "",
    email: "",
    phone: "",
    taxId: "",
    location: "",
    preferredDate: "",
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [locationGroups, setLocationGroups] = useState<Record<string, any>>({});

  // Replace submitStatus with notification state
  const [notification, setNotification] = useState({
    isVisible: false,
    type: "success" as NotificationType,
    title: "",
    message: "",
  });

  useEffect(() => {
    // Group locations by country/region
    setLocationGroups(getLocationGroups());
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setFormData((prev) => ({ ...prev, [id]: checked }));
  };

  const closeNotification = () => {
    setNotification((prev) => ({ ...prev, isVisible: false }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Transform form data to match expected API format
      const submissionData: FundraisingFormData = {
        ...formData,
      };

      const response = await submitFundraisingForm(submissionData);

      if (response.success) {
        // Show success notification
        setNotification({
          isVisible: true,
          type: "success",
          title: "Fundraising Request Submitted!",
          message:
            response.message ||
            "Thank you for your fundraising request. We'll be in touch soon!",
        });

        // Reset form on success
        setFormData({
          organizationName: "",
          orgType: "",
          contactName: "",
          email: "",
          phone: "",
          taxId: "",
          location: "",
          preferredDate: "",
          description: "",
        });

        // Optional: Track form submission with analytics
        if (typeof window !== "undefined" && "gtag" in window) {
          // @ts-ignore
          window.gtag("event", "fundraising_form_submitted", {
            event_category: "Fundraising",
            event_label: formData.orgType,
          });
        }
      } else {
        // Show error notification
        setNotification({
          isVisible: true,
          type: "error",
          title: "Submission Failed",
          message: response.message || "Please check your form and try again.",
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
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
    <section id="fundraising-form" className="py-16 bg-white">
      <div className="container max-w-3xl px-4 mx-auto">
        <div className="mb-10 text-center">
          <h2 className="mb-6 text-4xl font-bold cosmic-lager text-bronzetone-800">
            Apply for a Fundraiser
          </h2>
          <p className="text-xl american text-bronzetone-700">
            Ready to raise some funds? Complete the form below to get started.
          </p>
        </div>

        <form
          ref={formRef}
          className="p-8 rounded-lg shadow-md bg-gray-50"
          onSubmit={handleSubmit}
        >
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="organizationName"
                  className="block mb-2 font-bold text-bronzetone-800"
                >
                  Organization Name *
                </label>
                <input
                  type="text"
                  id="organizationName"
                  value={formData.organizationName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lightning-yellow-300 focus:border-lightning-yellow-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="orgType"
                  className="block mb-2 font-bold text-bronzetone-800"
                >
                  Organization Type *
                </label>
                <select
                  id="orgType"
                  value={formData.orgType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lightning-yellow-300 focus:border-lightning-yellow-500"
                  required
                >
                  <option value="">Select an option</option>
                  <option value="school">K-12 School</option>
                  <option value="pta">PTA/PTO</option>
                  <option value="college">College/University Group</option>
                  <option value="sports">Youth Sports Team</option>
                  <option value="nonprofit">Non-Profit Organization</option>
                </select>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="contactName"
                  className="block mb-2 font-bold text-bronzetone-800"
                >
                  Contact Name *
                </label>
                <input
                  type="text"
                  id="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lightning-yellow-300 focus:border-lightning-yellow-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 font-bold text-bronzetone-800"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lightning-yellow-300 focus:border-lightning-yellow-500"
                  required
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 font-bold text-bronzetone-800"
                >
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lightning-yellow-300 focus:border-lightning-yellow-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="taxId"
                  className="block mb-2 font-bold text-bronzetone-800"
                >
                  Tax ID Number (if applicable)
                </label>
                <input
                  type="text"
                  id="taxId"
                  value={formData.taxId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lightning-yellow-300 focus:border-lightning-yellow-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="location"
                className="block mb-2 font-bold text-bronzetone-800"
              >
                Preferred Location *
              </label>
              <select
                id="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lightning-yellow-300 focus:border-lightning-yellow-500"
                required
              >
                <option value="">Select a location</option>

                {/* Group locations by country/region */}
                {Object.entries(locationGroups).map(
                  ([groupName, groupLocations]) => (
                    <optgroup key={groupName} label={groupName}>
                      {groupLocations
                        .filter((location: any) => location.status === "active")
                        .map((location: any) => (
                          <option key={location.id} value={location.id}>
                            {location.name}{" "}
                            {location.city !== location.name
                              ? `- ${location.city}`
                              : ""}
                          </option>
                        ))}
                    </optgroup>
                  )
                )}

                {/* Future locations option */}
                <option value="future">Future Locations (Coming Soon)</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="preferredDate"
                className="block mb-2 font-bold text-bronzetone-800"
              >
                Preferred Date *
              </label>
              <input
                type="date"
                id="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lightning-yellow-300 focus:border-lightning-yellow-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block mb-2 font-bold text-bronzetone-800"
              >
                Tell us about your organization and fundraising goals
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lightning-yellow-300 focus:border-lightning-yellow-500"
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-block px-8 py-4 text-xl font-bold text-white transition-colors rounded-lg cosmic-lager flex items-center justify-center min-w-[250px] mx-auto ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-lightning-yellow-500 hover:bg-lightning-yellow-600"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Notification Popup */}
      <NotificationPopUp
        isVisible={notification.isVisible}
        type={notification.type}
        title={notification.title}
        message={notification.message}
        onClose={closeNotification}
        autoCloseDuration={notification.type === "success" ? 8000 : 6000} // Longer duration for success messages
        actionText={notification.type === "success" ? "Close" : undefined}
        onAction={closeNotification}
      />
    </section>
  );
};

export default FundraisingForm;
