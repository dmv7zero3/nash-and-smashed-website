// src/core/Pages/Locations/UnitedKingdom/Chelmsford/ContactForm/form.actions.ts
import axios, { AxiosResponse } from "axios";
import {
  ChelmsfordFormData,
  ChelmsfordFormResponse,
  LambdaProxyResponse,
} from "./types";
import { api, ENDPOINTS } from "@/core/api/apiClient";

// Helper to create a minimum request time for better UX
const withMinRequestTime = <T>(
  promise: Promise<T>,
  minTime = 1000
): Promise<T> => {
  const timeoutPromise = new Promise<void>((resolve) => {
    setTimeout(() => resolve(), minTime);
  });

  return Promise.all([promise, timeoutPromise]).then(([result]) => result);
};

export const submitChelmsfordContactForm = async (
  formData: ChelmsfordFormData
): Promise<ChelmsfordFormResponse> => {
  try {
    // Map the Chelmsford form fields to UK endpoint format
    const mappedFormData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone || "", // Don't send "Not provided" - let backend handle optional
      inquiryType: formData.interestType, // UK uses 'inquiryType' not 'interestType'
      message: `Location: Chelmsford, UK\n\n${formData.message}`,
      location: "Chelmsford, UK",
    };

    console.log("Submitting UK form data:", mappedFormData);

    // 🔥 FIXED: Use UK endpoint instead of US endpoint
    const response = await withMinRequestTime<AxiosResponse<any>>(
      api.post(ENDPOINTS.FORMS.CONTACT_UK, mappedFormData) // ✅ Now using UK endpoint
    );

    console.log("API response:", response);

    // Validate response exists
    if (!response.data) {
      return {
        success: false,
        message: "Invalid response from server. Please try again.",
      };
    }

    // Handle response format - same logic as other forms
    let parsedResponse: ChelmsfordFormResponse;

    // Check if this is a Lambda response format with body field
    if (
      response.data &&
      typeof response.data === "object" &&
      "body" in response.data
    ) {
      try {
        // Parse the body string into JSON
        const bodyContent =
          typeof response.data.body === "string"
            ? JSON.parse(response.data.body)
            : response.data.body;

        parsedResponse = {
          success: bodyContent.success || false,
          message: bodyContent.message || "Unknown response",
          formID: bodyContent.formID,
        };
      } catch (parseError) {
        return {
          success: false,
          message: "Invalid response format from server.",
        };
      }
    }
    // Check if response.data is a JSON string that needs parsing
    else if (typeof response.data === "string") {
      try {
        const parsedData = JSON.parse(response.data);

        parsedResponse = {
          success: parsedData.success || false,
          message: parsedData.message || "Unknown response",
          formID: parsedData.formID,
        };
      } catch (parseError) {
        return {
          success: false,
          message: "Invalid response format from server.",
        };
      }
    }
    // Standard object response
    else {
      // Handle the case where API returns errors array but success is false
      if (
        response.data.success === false &&
        response.data.errors &&
        Array.isArray(response.data.errors)
      ) {
        // Create user-friendly error message from validation errors
        const errorMessage =
          response.data.errors.length > 0
            ? response.data.errors.join(". ")
            : "Form submission failed. Please try again.";

        return {
          success: false,
          message: errorMessage,
        };
      }

      parsedResponse = {
        success: response.data.success === false ? false : true,
        message:
          response.data.message ||
          "Your message has been successfully submitted to our UK team.",
        formID: response.data.formID,
      };
    }

    return parsedResponse;
  } catch (error) {
    console.error("Error submitting UK contact form:", error);

    if (axios.isAxiosError(error)) {
      if (error.response) {
        const status = error.response.status;
        const data = error.response.data;

        console.log("Error response:", error.response.data);

        // Handle different error status codes
        if (status === 400) {
          return {
            success: false,
            message: "Please check your form data and try again.",
          };
        }
        // Handle rate limiting (429)
        else if (status === 429) {
          const retryAfter = error.response.headers["retry-after"] || 3600;
          const retryTime = Math.ceil(retryAfter / 60);

          return {
            success: false,
            message: `You've reached the submission limit. Please try again in ${retryTime} minutes.`,
          };
        }
        // Handle server errors (500+)
        else if (status >= 500) {
          return {
            success: false,
            message:
              "Server error occurred. Please try again in a few minutes.",
          };
        }
        // Handle forbidden (403)
        else if (status === 403) {
          return {
            success: false,
            message: "Access denied. Please refresh the page and try again.",
          };
        }

        // Return the error message from the API if available
        return {
          success: false,
          message:
            data.message ||
            "Failed to submit your message. Please try again later.",
        };
      }

      // Network errors
      else if (error.request) {
        return {
          success: false,
          message:
            "Network connection issue. Please check your internet and try again.",
        };
      }
    }

    // Generic error message
    return {
      success: false,
      message:
        "An unexpected error occurred. Please try again in a few minutes.",
    };
  }
};
