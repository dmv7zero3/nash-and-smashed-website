// src/core/Subscribe/types.ts
export interface SubscriberFormData {
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface SubscriberFormResponse {
  success: boolean;
  message: string;
  formID?: string;
}

export interface SubscriberFormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
}
