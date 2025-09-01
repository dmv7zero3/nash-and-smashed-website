// src/core/Blogs/Templates/LocalSEO/BlogSidebar/BlogNewsletter.tsx
import React, { useState } from "react";
import {
  SubscriberFormData,
  SubscriberFormState,
} from "../../../../Subscribe/types";
import { submitSubscriberForm } from "../../../../Subscribe/form.actions";

const BlogNewsletter: React.FC = () => {
  // Form data state
  const [formData, setFormData] = useState<SubscriberFormData>({
    email: "",
  });

  // Form submission state
  const [formState, setFormState] = useState<SubscriberFormState>({
    isSubmitting: false,
    isSuccess: false,
    error: null,
  });

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (formState.error) {
      setFormState((prev) => ({ ...prev, error: null }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email || !formData.email.includes("@")) {
      setFormState((prev) => ({
        ...prev,
        error: "Please enter a valid email address.",
      }));
      return;
    }

    setFormState((prev) => ({
      ...prev,
      isSubmitting: true,
      error: null,
    }));

    try {
      const response = await submitSubscriberForm(formData);

      if (response.success) {
        setFormState({
          isSubmitting: false,
          isSuccess: true,
          error: null,
        });

        // Reset form data
        setFormData({ email: "" });
      } else {
        setFormState((prev) => ({
          ...prev,
          isSubmitting: false,
          error: response.message,
        }));
      }
    } catch (error) {
      setFormState((prev) => ({
        ...prev,
        isSubmitting: false,
        error: "An unexpected error occurred. Please try again.",
      }));
    }
  };

  return (
    <div className="p-6 mb-8 border rounded-lg border-white/10 bg-gradient-to-br from-red-900/40 to-black/40">
      <h3 className="mb-4 text-xl font-bold text-lightning-yellow cosmic-lager">
        Get Our Newsletter
      </h3>

      <p className="mb-4 text-white/90">
        Subscribe to receive special offers, events, and insider tips for the
        best hot chicken experience!
      </p>

      {formState.isSuccess ? (
        <div className="p-4 text-center rounded-lg bg-lightning-yellow/20">
          <p className="text-lightning-yellow">
            Thanks for subscribing! Check your email for confirmation.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="blog-email"
              className="block mb-1 text-sm text-white/70"
            >
              Email Address
            </label>
            <input
              id="blog-email"
              name="email"
              type="email"
              placeholder="your@email.com"
              className="w-full px-4 py-2 text-white border rounded-md bg-black/30 border-white/10 focus:outline-none focus:ring-2 focus:ring-lightning-yellow/50"
              value={formData.email}
              onChange={handleInputChange}
              disabled={formState.isSubmitting}
            />
            {formState.error && (
              <div className="mt-1 text-sm text-red-400">{formState.error}</div>
            )}
          </div>
          <button
            type="submit"
            disabled={formState.isSubmitting}
            className="w-full py-2 font-medium text-black transition-colors duration-300 rounded-md bg-lightning-yellow hover:bg-lightning-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {formState.isSubmitting ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      )}
    </div>
  );
};

export default BlogNewsletter;
