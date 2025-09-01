// src/core/Pages/Contact/types.ts
export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  interestType: string;
  message: string;
}

export interface NotificationState {
  isVisible: boolean;
  type: "success" | "error" | "info" | "warning";
  title: string;
  message: string;
}

export interface ContactFormProps {
  formData: FormData;
  isSubmitting: boolean;
  submitSuccess: boolean;
  submitError: string;
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
  notification?: NotificationState;
  closeNotification?: () => void;
}

export interface ContactInformationProps {
  phone: string;
  email: string;
  address: string;
}

export interface MapSectionProps {
  mapEmbedUrl: string;
}

export interface HeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
}

// Add this additional type if you decide to add form field validation
export interface FormValidationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  interestType?: string;
  message?: string;
}
