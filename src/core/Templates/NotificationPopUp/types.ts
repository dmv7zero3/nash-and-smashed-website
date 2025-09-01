export type NotificationType = "success" | "error" | "info" | "warning";

export interface NotificationProps {
  /**
   * Whether the notification is visible
   */
  isVisible: boolean;
  /**
   * The type of notification
   */
  type: NotificationType;
  /**
   * The title of the notification
   */
  title: string;
  /**
   * The message of the notification
   */
  message: string;
  /**
   * Optional action button text
   */
  actionText?: string;
  /**
   * Optional action button callback
   */
  onAction?: () => void;
  /**
   * Callback to close the notification
   */
  onClose: () => void;
  /**
   * Optional duration in ms before auto-closing (0 = no auto-close)
   */
  autoCloseDuration?: number;
}

export interface NotificationStyleProps {
  type: NotificationType;
}
