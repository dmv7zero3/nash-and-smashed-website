// src/core/Pages/Locations/UnitedKingdom/Chelmsford/ContactForm/types.ts
export type NotificationType = "success" | "error" | "info" | "warning";

export interface NotificationState {
  isVisible: boolean;
  type: NotificationType;
  title: string;
  message: string;
}

// Main form data interface (matches what the component expects)
export interface ChelmsfordFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  interestType: string;
}

// Response interface
export interface ChelmsfordFormResponse {
  success: boolean;
  message: string;
  formID?: string;
}

// Lambda proxy response type
export interface LambdaProxyResponse {
  statusCode?: number;
  body?: string | any;
  headers?: Record<string, string>;
  success?: boolean;
  message?: string;
  formID?: string;
}
