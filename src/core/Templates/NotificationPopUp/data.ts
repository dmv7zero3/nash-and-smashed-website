import { NotificationType } from "./types";

/**
 * Map of notification types to their respective styling classes
 */
export const notificationStyles: Record<
  NotificationType,
  {
    container: string;
    border: string;
    icon: string;
    title: string;
  }
> = {
  success: {
    container: "bg-green-100",
    border: "border-l-4 border-green-500",
    icon: "text-green-500",
    title: "text-green-700",
  },
  error: {
    container: "bg-red-100",
    border: "border-l-4 border-red-500",
    icon: "text-red-500",
    title: "text-red-700",
  },
  warning: {
    container: "bg-amber-100",
    border: "border-l-4 border-amber-500",
    icon: "text-amber-500",
    title: "text-amber-700",
  },
  info: {
    container: "bg-blue-100",
    border: "border-l-4 border-blue-500",
    icon: "text-blue-500",
    title: "text-blue-700",
  },
};

/**
 * Icons for each notification type
 */
export const NOTIFICATION_ICONS = {
  success: "FaCheckCircle",
  error: "FaExclamationTriangle",
  warning: "FaExclamationCircle",
  info: "FaInfoCircle",
};
