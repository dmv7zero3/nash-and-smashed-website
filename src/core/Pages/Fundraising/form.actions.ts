// src/core/Pages/Fundraising/form.actions.ts
import axios, { AxiosResponse } from "axios";
import { api, ENDPOINTS } from "../../api/apiClient";

export interface FundraisingFormData {
  organizationName: string;
  orgType: string;
  contactName: string;
  email: string;
  phone: string;
  taxId?: string;
  location: string;
  preferredDate: string;
  description?: string;
}

export interface FundraisingFormResponse {
  success: boolean;
  message: string;
  formID?: string;
  errors?: string[];
  retryAfter?: number;
  fieldErrors?: string[];
  showFieldErrors?: boolean;
}

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
 * Sends the fundraising form data to the API endpoint
 * @param formData The fundraising form data
 * @returns A promise that resolves to the API response
 */
export const submitFundraisingForm = async (
  formData: FundraisingFormData
): Promise<FundraisingFormResponse> => {
  try {
    // Submit to API with minimum request time
    const response = await withMinRequestTime(
      api.post<any>(ENDPOINTS.FORMS.FUNDRAISING, formData)
    );

    // Validate response exists
    if (!response.data) {
      return {
        success: false,
        message: "Invalid response from server. Please try again.",
      };
    }

    // Handle response format - comprehensive parsing
    let parsedResponse: FundraisingFormResponse;

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
          errors: bodyContent.errors,
          retryAfter: bodyContent.retryAfter,
          fieldErrors: bodyContent.fieldErrors,
          showFieldErrors: bodyContent.showFieldErrors,
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
          errors: parsedData.errors,
          retryAfter: parsedData.retryAfter,
          fieldErrors: parsedData.fieldErrors,
          showFieldErrors: parsedData.showFieldErrors,
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
          errors: response.data.errors,
          fieldErrors: response.data.fieldErrors,
          showFieldErrors: response.data.showFieldErrors,
        };
      }

      parsedResponse = {
        success: response.data.success === false ? false : true,
        message:
          response.data.message ||
          "Your fundraising request has been successfully submitted.",
        formID: response.data.formID,
        errors: response.data.errors,
        retryAfter: response.data.retryAfter,
        fieldErrors: response.data.fieldErrors,
        showFieldErrors: response.data.showFieldErrors,
      };
    }

    return parsedResponse;
  } catch (error: any) {
    console.error("Error submitting fundraising form:", error);

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
            errors: Array.isArray(data.errors) ? data.errors : [],
            fieldErrors: Array.isArray(data.errors) ? data.errors : [],
            showFieldErrors: true,
          };
        }
        // Handle rate limiting (429)
        else if (status === 429) {
          const retryAfter = error.response.headers["retry-after"] || 3600;
          const retryTime = Math.ceil(retryAfter / 60);

          return {
            success: false,
            message: `You've reached the submission limit. Please try again in ${retryTime} minutes.`,
            retryAfter: retryAfter,
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
            "Failed to submit fundraising request. Please try again later.",
          errors: Array.isArray(data.errors) ? data.errors : [],
          fieldErrors: Array.isArray(data.errors) ? data.errors : [],
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
