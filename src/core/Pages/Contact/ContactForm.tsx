// src/core/Pages/Contact/ContactForm.tsx
import React from "react";
import { ContactFormProps } from "./types";
import {
  FaSpinner,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import NotificationPopUp from "@/core/Templates/NotificationPopUp";

const ContactForm: React.FC<ContactFormProps> = ({
  formData,
  isSubmitting,
  submitSuccess,
  submitError,
  handleInputChange,
  handleSubmit,
  notification = { isVisible: false, type: "success", title: "", message: "" },
  closeNotification,
}) => {
  return (
    <div className="lg:w-2/3">
      <div className="p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 american text-dark-olive-bark">
          Send Us a Message
        </h2>

        {submitSuccess ? (
          <div className="p-6 mb-6 text-center text-green-700 bg-green-100 border-l-4 border-green-500 rounded">
            <FaCheckCircle className="mx-auto mb-4 text-green-500" size={48} />
            <p className="mb-2 text-xl font-bold">
              Thank you for reaching out!
            </p>
            <p className="mb-4">
              We have received your message and will get back to you shortly.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 text-sm font-medium text-white transition-all bg-green-600 rounded hover:bg-green-700"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="block mb-2 font-bold text-bronzetone-800 open-sans"
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
                  className="w-full px-4 py-3 font-semibold tracking-wide border-2 rounded-md border-lightning-yellow-300 focus:border-lightning-yellow-500 focus:ring focus:ring-lightning-yellow-200 focus:ring-opacity-50 disabled:opacity-60"
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block mb-2 font-bold text-bronzetone-800 open-sans"
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
                  className="w-full px-4 py-3 font-semibold tracking-wide border-2 rounded-md border-lightning-yellow-300 focus:border-lightning-yellow-500 focus:ring focus:ring-lightning-yellow-200 focus:ring-opacity-50 disabled:opacity-60"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 font-bold text-bronzetone-800 open-sans"
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
                  className="w-full px-4 py-3 font-semibold tracking-wide border-2 rounded-md border-lightning-yellow-300 focus:border-lightning-yellow-500 focus:ring focus:ring-lightning-yellow-200 focus:ring-opacity-50 disabled:opacity-60"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 font-bold text-bronzetone-800 open-sans"
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
                  className="w-full px-4 py-3 font-semibold tracking-wide border-2 rounded-md border-lightning-yellow-300 focus:border-lightning-yellow-500 focus:ring focus:ring-lightning-yellow-200 focus:ring-opacity-50 disabled:opacity-60"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="interestType"
                className="block mb-2 font-bold text-bronzetone-800 open-sans"
              >
                Interested in:*
              </label>
              <select
                id="interestType"
                name="interestType"
                value={formData.interestType}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 font-semibold tracking-wide border-2 rounded-md border-lightning-yellow-300 focus:border-lightning-yellow-500 focus:ring focus:ring-lightning-yellow-200 focus:ring-opacity-50 disabled:opacity-60"
              >
                <option value="">Select an option</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Media">Media</option>
                <option value="Collaboration">Collaboration</option>
                <option value="Supplier">Supplier</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block mb-2 font-bold text-bronzetone-800 open-sans"
              >
                Message*
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                rows={6}
                className="w-full px-4 py-3 font-semibold tracking-wide border-2 rounded-md border-lightning-yellow-300 focus:border-lightning-yellow-500 focus:ring focus:ring-lightning-yellow-200 focus:ring-opacity-50 disabled:opacity-60"
                placeholder="How can we help you? (Please write at least 10 characters)"
              />
            </div>

            {submitError && submitError.trim() !== "" && (
              <div className="flex items-start p-4 mt-4 text-red-700 bg-red-100 border-l-4 border-red-500 rounded">
                <FaExclamationTriangle className="mt-1 mr-3 text-red-500" />
                <div>
                  <p className="font-bold">
                    There was a problem sending your message
                  </p>
                  <p>{submitError}</p>
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center justify-center px-8 py-3 font-bold text-white transition-all bg-lightning-yellow-500 rounded-md hover:bg-lightning-yellow-600 focus:outline-none focus:ring-2 focus:ring-lightning-yellow-300 min-w-[150px] ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
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
        )}
      </div>

      {/* Notification Popup */}
      {closeNotification && (
        <NotificationPopUp
          isVisible={notification.isVisible}
          type={notification.type}
          title={notification.title}
          message={notification.message}
          onClose={closeNotification}
          autoCloseDuration={5000}
        />
      )}
    </div>
  );
};

export default ContactForm;
