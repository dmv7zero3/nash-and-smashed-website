// src/core/Subscribe/form.actions.ts
import { SubscriberFormData, SubscriberFormResponse } from "./types";
import { api, ENDPOINTS } from "../api/apiClient";
import axios from "axios";

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

/**
 * Sends the subscriber form data to the API endpoint
 * @param formData The subscriber form data
 * @returns A promise that resolves to the API response
 */
export const submitSubscriberForm = async (
  formData: SubscriberFormData
): Promise<SubscriberFormResponse> => {
  try {
    console.log("Submitting subscriber form:", formData);

    // Submit to API with minimum request time
    const response = await withMinRequestTime(
      api.post<any>(ENDPOINTS.FORMS.SUBSCRIBER, formData)
    );

    console.log("API response:", response);

    // Validate response exists
    if (!response.data) {
      return {
        success: false,
        message: "Invalid response from server. Please try again.",
      };
    }

    // Handle response format - comprehensive parsing
    let parsedResponse: SubscriberFormResponse;

    // Check if this is a Lambda response format with body field (backwards compatibility)
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
    // Standard object response (this is what we expect now with the API Gateway fix)
    else {
      // Handle the case where API returns errors but success is false
      if (response.data.success === false && response.data.errors) {
        // Create user-friendly error message from validation errors
        const errorMessage =
          typeof response.data.errors === "object"
            ? Object.values(response.data.errors).join(". ")
            : Array.isArray(response.data.errors)
            ? response.data.errors.join(". ")
            : "Form submission failed. Please try again.";

        return {
          success: false,
          message: errorMessage,
        };
      }

      parsedResponse = {
        success: response.data.success === false ? false : true,
        message: response.data.message || "Subscription successful!",
        formID: response.data.formID,
      };
    }

    return parsedResponse;
  } catch (error) {
    console.error("Error submitting subscriber form:", error);

    if (axios.isAxiosError(error)) {
      if (error.response) {
        const status = error.response.status;
        const data = error.response.data;

        console.log("Error response:", error.response.data);

        // Handle different error status codes
        if (status === 400) {
          // Handle validation errors
          if (data.errors) {
            const errorMessage =
              typeof data.errors === "object"
                ? Object.values(data.errors).join(". ")
                : Array.isArray(data.errors)
                ? data.errors.join(". ")
                : "Please check your form data and try again.";

            return {
              success: false,
              message: errorMessage,
            };
          }

          return {
            success: false,
            message:
              data.message || "Please check your form data and try again.",
          };
        }
        // Handle rate limiting (429)
        else if (status === 429) {
          return {
            success: false,
            message:
              "You've reached the subscription limit. Please try again later.",
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
            data.message || "Failed to subscribe. Please try again later.",
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
