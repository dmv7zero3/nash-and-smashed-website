import React, { useState } from "react";
import { submitSubscriberForm } from "./form.actions";
import { SubscriberFormData, SubscriberFormState } from "./types";

interface SubscribeFormProps {
  className?: string;
}

const SubscribeForm: React.FC<SubscribeFormProps> = ({ className = "" }) => {
  // Form data state
  const [formData, setFormData] = useState<SubscriberFormData>({
    email: "",
    firstName: "",
    lastName: "",
  });

  // Form submission state
  const [formState, setFormState] = useState<SubscriberFormState>({
    isSubmitting: false,
    isSuccess: false,
    error: null,
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email) {
      setFormState({
        isSubmitting: false,
        isSuccess: false,
        error: "Please enter your email address.",
      });
      return;
    }

    // Update state to show loading
    setFormState({
      isSubmitting: true,
      isSuccess: false,
      error: null,
    });

    try {
      const response = await submitSubscriberForm(formData);

      if (response.success) {
        // Success state
        setFormState({
          isSubmitting: false,
          isSuccess: true,
          error: null,
        });

        // Clear form
        setFormData({
          email: "",
          firstName: "",
          lastName: "",
        });
      } else {
        // Error state
        setFormState({
          isSubmitting: false,
          isSuccess: false,
          error: response.message,
        });
      }
    } catch (error) {
      // Error state
      setFormState({
        isSubmitting: false,
        isSuccess: false,
        error: "An unexpected error occurred. Please try again later.",
      });
    }
  };

  return (
    <div className={`subscribe-form ${className}`}>
      {formState.isSuccess ? (
        <div className="p-4 mb-4 text-green-700 bg-green-100 border-l-4 border-green-500 rounded">
          <p className="font-bold">Thank you for subscribing!</p>
          <p>You'll receive updates from Nash & Smashed soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="firstName"
                className="block mb-1 font-medium text-bronzetone-800 source-sans-semibold"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-lightning-yellow-400"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block mb-1 font-medium text-bronzetone-800 source-sans-semibold"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-lightning-yellow-400"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-1 font-medium text-bronzetone-800 source-sans-semibold"
            >
              Email Address*
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-lightning-yellow-400"
            />
          </div>

          {formState.error && (
            <div className="p-3 text-red-700 bg-red-100 border-l-4 border-red-500 rounded">
              {formState.error}
            </div>
          )}

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={formState.isSubmitting}
              className={`px-6 py-2 font-medium text-white transition-colors rounded bg-bronzetone-600 hover:bg-bronzetone-700 focus:outline-none focus:ring-2 focus:ring-bronzetone-500 focus:ring-offset-2 ${
                formState.isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {formState.isSubmitting ? "Subscribing..." : "Subscribe Now"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SubscribeForm;
