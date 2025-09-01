// src/core/Pages/Careers/form.actions.ts
import axios from "axios";
import { CareerFormData, CareerFormResponse } from "./types";
import { api, ENDPOINTS } from "../../api/apiClient";
import { locations, getLocationDisplayValue } from "../../constants/locations";

// Helper to create a minimum request time for better UX
const withMinRequestTime = <T>(
  promise: Promise<T>,
  minTime = 1500
): Promise<T> => {
  const timeoutPromise = new Promise<void>((resolve) => {
    setTimeout(() => resolve(), minTime);
  });

  return Promise.all([promise, timeoutPromise]).then(([result]) => result);
};

export const submitCareerForm = async (
  formData: CareerFormData
): Promise<CareerFormResponse> => {
  try {
    // 1. VALIDATE HONEYPOT FIRST (bot detection)
    if (formData.website && formData.website.trim()) {
      return {
        success: false,
        message: "Invalid submission detected.",
      };
    }

    // 2. Validate required fields before sending
    const requiredFields: (keyof CareerFormData)[] = [
      "eligibleToWork",
      "firstName",
      "lastName",
      "email",
      "phone",
      "age",
      "address",
      "preferredLocation",
      "weekendAvailability",
      "position",
      "startDate",
      "terminated",
      "workExperience",
      "references",
    ];

    const missingFields = requiredFields.filter((field) => {
      const value = formData[field];
      return !value || (typeof value === "string" && !value.trim());
    });

    if (missingFields.length > 0) {
      return {
        success: false,
        message: `Please fill in all required fields: ${missingFields.join(
          ", "
        )}`,
      };
    }

    // 3. Additional validation for conditional fields
    if (
      formData.terminated === "yes" &&
      !formData.terminationExplanation?.trim()
    ) {
      return {
        success: false,
        message: "Please explain the circumstances of your termination.",
      };
    }

    // 4. Find location by ID first, then fall back to display value
    let selectedLocation;

    if (formData.locationId) {
      // Primary method: use location ID if available
      selectedLocation = locations.find(
        (location) => location.id === formData.locationId
      );
    } else {
      // Fallback method: use display value matching
      selectedLocation = locations.find((location) => {
        const displayValue = getLocationDisplayValue(location);
        return displayValue === formData.preferredLocation;
      });
    }

    // 5. Collect store owner emails
    const storeOwnerEmails: string[] = [];

    if (selectedLocation?.email) {
      storeOwnerEmails.push(selectedLocation.email);
    }

    // 6. Prepare form data for submission
    const formDataToSubmit = {
      ...formData,
      // Map frontend fields to backend expected fields
      interestType: formData.position,
      cityState: formData.preferredLocation,
      // Only send store owner emails - let Lambda add accounting email
      storeOwnerEmails: storeOwnerEmails,
    };

    // 7. Submit to API
    const response = await withMinRequestTime(
      api.post<any>(ENDPOINTS.FORMS.JOB_APPLICATION, formDataToSubmit)
    );

    // 8. Validate response exists
    if (!response.data) {
      return {
        success: false,
        message: "Invalid response from server. Please try again.",
      };
    }

    // 9. Handle response format
    let parsedResponse: CareerFormResponse;

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
    // Standard object response
    else {
      parsedResponse = response.data as CareerFormResponse;
    }

    return parsedResponse;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const status = error.response.status;
        const data = error.response.data;

        // Handle different error status codes
        if (status === 400) {
          return {
            success: false,
            message: "Please check your form data and try again.",
            errors: Array.isArray(data.errors) ? data.errors : [],
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

        // Default error handling
        return {
          success: false,
          message: "Failed to submit your application. Please try again.",
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

    // Unexpected errors
    return {
      success: false,
      message:
        "An unexpected error occurred. Please try again in a few minutes.",
    };
  }
};

// Utility function to test store owner email configuration
export const testStoreOwnerEmails = () => {
  const activeLocations = locations.filter(
    (location) => location.status === "active"
  );
  const locationsWithEmails = activeLocations.filter(
    (location) => location.email
  );
  const locationsWithoutEmails = activeLocations.filter(
    (location) => !location.email
  );

  return {
    activeLocationsWithEmails: locationsWithEmails,
    activeLocationsWithoutEmails: locationsWithoutEmails,
    summary: {
      totalActive: activeLocations.length,
      withEmails: locationsWithEmails.length,
      withoutEmails: locationsWithoutEmails.length,
    },
  };
};
