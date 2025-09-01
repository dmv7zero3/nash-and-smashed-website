import React, { useEffect, useRef } from "react";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaExclamationCircle,
  FaInfoCircle,
  FaTimes,
} from "react-icons/fa";
import { animateNotificationEntry, animateNotificationExit } from "./gsap";
import { NotificationProps } from "./types";
import { notificationStyles } from "./data";

const NotificationPopUp: React.FC<NotificationProps> = ({
  isVisible,
  type = "success",
  title,
  message,
  actionText,
  onAction,
  onClose,
  autoCloseDuration = 5000,
}) => {
  const notificationRef = useRef<HTMLDivElement>(null);
  const entryAnimationRef = useRef<gsap.Context | null>(null);
  const exitAnimationRef = useRef<gsap.Context | null>(null);
  const autoCloseTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Handle icon based on type
  const renderIcon = () => {
    switch (type) {
      case "success":
        return (
          <FaCheckCircle size={24} className={notificationStyles[type].icon} />
        );
      case "error":
        return (
          <FaExclamationTriangle
            size={24}
            className={notificationStyles[type].icon}
          />
        );
      case "warning":
        return (
          <FaExclamationCircle
            size={24}
            className={notificationStyles[type].icon}
          />
        );
      case "info":
        return (
          <FaInfoCircle size={24} className={notificationStyles[type].icon} />
        );
      default:
        return (
          <FaInfoCircle size={24} className={notificationStyles.info.icon} />
        );
    }
  };

  // Setup auto-close timer
  useEffect(() => {
    if (isVisible && autoCloseDuration > 0) {
      // Clear any existing timers
      if (autoCloseTimerRef.current) {
        clearTimeout(autoCloseTimerRef.current);
      }

      // Set new timer
      autoCloseTimerRef.current = setTimeout(() => {
        handleClose();
      }, autoCloseDuration);
    }

    return () => {
      if (autoCloseTimerRef.current) {
        clearTimeout(autoCloseTimerRef.current);
      }
    };
  }, [isVisible, autoCloseDuration]);

  // Handle animation when visibility changes
  useEffect(() => {
    // Clean up any existing animations
    if (entryAnimationRef.current) {
      entryAnimationRef.current.revert();
      entryAnimationRef.current = null;
    }

    if (exitAnimationRef.current) {
      exitAnimationRef.current.revert();
      exitAnimationRef.current = null;
    }

    if (isVisible) {
      // Animate entry
      entryAnimationRef.current = animateNotificationEntry(notificationRef);
    }

    return () => {
      // Clean up animations on unmount
      if (entryAnimationRef.current) {
        entryAnimationRef.current.revert();
      }
      if (exitAnimationRef.current) {
        exitAnimationRef.current.revert();
      }
    };
  }, [isVisible]);

  // Handle closing with animation
  const handleClose = () => {
    if (autoCloseTimerRef.current) {
      clearTimeout(autoCloseTimerRef.current);
    }

    exitAnimationRef.current = animateNotificationExit(
      notificationRef,
      onClose
    );
  };

  if (!isVisible) {
    return null;
  }

  const styles = notificationStyles[type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Semi-transparent overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-30"
        onClick={handleClose}
      ></div>

      {/* Notification content */}
      <div
        ref={notificationRef}
        className={`relative shadow-xl rounded-lg overflow-hidden p-6 max-w-md w-11/12 ${styles.container} ${styles.border} flex`}
        role="alert"
      >
        <div className="flex-shrink-0 mr-4">{renderIcon()}</div>
        <div className="flex-grow">
          <div className={`font-bold mb-1 ${styles.title}`}>{title}</div>
          <div className="text-sm text-gray-700">{message}</div>
          {actionText && onAction && (
            <button
              className="px-4 py-2 mt-4 text-white transition-colors rounded bg-lightning-yellow-500 hover:bg-lightning-yellow-600 focus:outline-none focus:ring-2 focus:ring-lightning-yellow-300"
              onClick={onAction}
            >
              {actionText}
            </button>
          )}
        </div>
        <button
          onClick={handleClose}
          className="flex-shrink-0 ml-4 text-gray-400 hover:text-gray-600 focus:outline-none"
          aria-label="Close notification"
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

export default NotificationPopUp;
