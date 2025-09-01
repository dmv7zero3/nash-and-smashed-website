import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebook, FaApple, FaGooglePlay } from "react-icons/fa";
import {
  ORDER_ONLINE_URL,
  INSTAGRAM_URL,
  FACEBOOK_URL,
  APPLE_APP_STORE_URL,
  GOOGLE_PLAY_STORE_URL,
} from "../../../constants/business";
import { animateMenuOpen } from "./gsap";

interface MobileMenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenuOverlay: React.FC<MobileMenuOverlayProps> = ({
  isOpen,
  onClose,
}) => {
  // Refs for animation
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLElement>(null);
  const socialIconsRef = useRef<HTMLDivElement>(null);
  const orderButtonRef = useRef<HTMLAnchorElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close menu when pressing escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Apply GSAP animations
  useEffect(() => {
    if (isOpen) {
      const ctx = animateMenuOpen(
        {
          menuContainer: menuContainerRef,
          navItems: navItemsRef,
          socialIcons: socialIconsRef,
          orderButton: orderButtonRef,
          closeButton: closeButtonRef,
        },
        isOpen
      );

      // Cleanup function
      return () => {
        ctx?.revert();
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuContainerRef}
      className="fixed inset-0 z-50 bg-black bg-opacity-95"
    >
      <div className="flex flex-col items-center justify-center h-full p-6">
        {/* Close button */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute p-2 text-white top-4 right-4"
          aria-label="Close menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Menu items */}
        <nav
          ref={navItemsRef}
          className="flex flex-col items-center space-y-6 text-2xl text-white"
        >
          <Link
            to="/"
            className="transition-colors cosmic-lager hover:text-gray-300"
            onClick={onClose}
          >
            Home
          </Link>
          <Link
            to="/contact"
            className="transition-colors cosmic-lager hover:text-gray-300"
            onClick={onClose}
          >
            Contact
          </Link>
          <Link
            to="/locations"
            className="transition-colors cosmic-lager hover:text-gray-300"
            onClick={onClose}
          >
            Locations
          </Link>
          <Link
            to="/fundraising"
            className="transition-colors cosmic-lager hover:text-gray-300"
            onClick={onClose}
          >
            Fundraising
          </Link>
          <Link
            to="/careers"
            className="transition-colors cosmic-lager hover:text-gray-300"
            onClick={onClose}
          >
            Careers
          </Link>
          <Link
            to="/franchise"
            className="transition-colors cosmic-lager hover:text-gray-300"
            onClick={onClose}
          >
            Franchise
          </Link>
        </nav>

        {/* Social Media Icons */}
        <div ref={socialIconsRef} className="flex items-center mt-8 space-x-6">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white transition-colors hover:text-lightning-yellow"
          >
            <FaInstagram size={32} />
          </a>
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white transition-colors hover:text-lightning-yellow"
          >
            <FaFacebook size={32} />
          </a>
          <a
            href={APPLE_APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white transition-colors hover:text-lightning-yellow"
          >
            <FaApple size={32} />
          </a>
          <a
            href={GOOGLE_PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white transition-colors hover:text-lightning-yellow"
          >
            <FaGooglePlay size={32} />
          </a>
        </div>

        {/* Order Now button */}
        <a
          ref={orderButtonRef}
          href={ORDER_ONLINE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3 mt-8 text-xl text-black rounded-full bg-lightning-yellow cosmic-lager hover:bg-opacity-90"
          onClick={onClose}
        >
          ORDER NOW
        </a>
      </div>
    </div>
  );
};

export default MobileMenuOverlay;
