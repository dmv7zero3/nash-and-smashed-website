// src/core/Pages/Careers/types.ts
export interface CareerFormData {
  eligibleToWork: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: string;
  address: string;
  preferredLocation: string;
  locationId?: string; // Optional location ID for better matching
  weekendAvailability: string;
  position: string;
  startDate: string;
  terminated: string;
  terminationExplanation: string;
  workExperience: string;
  references: string;
  // Additional fields that might be mapped for backend
  interestType?: string;
  cityState?: string;
  // NEW: Only store owner emails from frontend (replaces notificationEmails)
  storeOwnerEmails?: string[];
  website?: string; // Honeypot field
}

export interface CareerFormResponse {
  success: boolean;
  message: string;
  formID?: string;
  errors?: string[]; // For validation errors
  retryAfter?: number; // ADD THIS - For rate limiting (seconds)
  fieldErrors?: string[]; // ADD THIS - For specific field errors
  showFieldErrors?: boolean; // ADD THIS - Flag to show field-specific errors
}

export interface CareerFormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
}

export interface CareerFormProps {
  formData: CareerFormData;
  formState: CareerFormState;
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

// Validation error type
export interface ValidationError {
  field: string;
  message: string;
}
