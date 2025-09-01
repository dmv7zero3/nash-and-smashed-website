import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebook, FaApple, FaGooglePlay } from "react-icons/fa";
import {
  ORDER_ONLINE_URL,
  INSTAGRAM_URL,
  FACEBOOK_URL,
  APPLE_APP_STORE_URL,
  GOOGLE_PLAY_STORE_URL,
} from "../../../constants/business";

const DesktopHeader: React.FC = () => {
  return (
    <header className="hidden lg:block">
      <div className="bg-black my-3.5 rounded-full w-11/12 max-w-7xl mx-auto py-2 px-8 flex flex-wrap items-center justify-center gap-4 text-white">
        {" "}
        {/* Logo on the left */}
        <div className="flex-shrink-0">
          <Link to="/" className="block">
            <picture>
              <source
                srcSet="/images/logos/nash-and-smashed-logo.webp"
                type="image/webp"
              />
              <img
                src="/images/logos/nash-and-smashed-logo.png"
                alt="Nash and Smashed Logo"
                className="h-12"
              />
            </picture>
          </Link>
        </div>
        {/* Navigation Links */}
        <nav className="flex items-center space-x-8 text-lg cosmic-lager">
          <Link to="/" className="transition-colors hover:text-gray-300 ">
            Home
          </Link>
          <Link
            to="/contact"
            className="transition-colors hover:text-gray-300 "
          >
            Contact
          </Link>
          <Link
            to="/locations"
            className="transition-colors hover:text-gray-300 "
          >
            Locations
          </Link>
          <Link
            to="/careers"
            className="transition-colors hover:text-gray-300 "
          >
            Careers
          </Link>
          <Link
            to="/franchise"
            className="transition-colors hover:text-gray-300 "
          >
            Franchise
          </Link>
        </nav>
        {/* Social Media Icons */}
        <div className="flex flex-row gap-2">
          <div className="flex items-center mr-4 space-x-2">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center min-w-[40px] min-h-[40px] text-white transition-colors hover:text-lightning-yellow hover:scale-110"
              aria-label="Follow us on Instagram"
            >
              <FaInstagram size={24} className="flex-shrink-0" />
            </a>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center min-w-[40px] min-h-[40px] text-white transition-colors hover:text-lightning-yellow hover:scale-110"
              aria-label="Follow us on Facebook"
            >
              <FaFacebook size={24} className="flex-shrink-0" />
            </a>
            <a
              href={APPLE_APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center min-w-[40px] min-h-[40px] text-white transition-colors hover:text-lightning-yellow hover:scale-110"
              aria-label="Download on App Store"
            >
              <FaApple size={24} className="flex-shrink-0" />
            </a>
            <a
              href={GOOGLE_PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center min-w-[40px] min-h-[40px] text-white transition-colors hover:text-lightning-yellow hover:scale-110"
              aria-label="Get it on Google Play"
            >
              <FaGooglePlay size={24} className="flex-shrink-0" />
            </a>
          </div>

          <div className="flex items-center justify-center min-w-[40px] mr-4">
            <svg
              id="halal-icon"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              viewBox="0 0 25 13.4"
              className="h-auto w-9 min-w-[36px] flex-shrink-0"
              aria-label="Halal Certified"
            >
              <path
                d="M5.9,0c-.2,0-.4.2-.5.3-.2.4-.4.9-.5,1.3.5,2.3,1.4,4.9.9,7.3s-1.8,3.1-3.8,2.3-1.2-2.3-1.1-3.5,0-.3,0-.4c-.1.2-.2.4-.3.6-.8,1.7-1.3,4.5,1.1,5.3,2.4.8,4.4-.7,5.1-2.6s0-2,0-3.2-.2-2.3,0-3.5,0-1.2.3-1.8c-.5-.7-1-1.3-1.1-2.1ZM14.7.7c-.6,0-1.1-.1-1.7-.4.2,4.6-.4,10.6-5.6,12.1s-1,.2-1.5.3-.3,0-.3,0c2.1.5,4.8.9,6.4-1s1.4-3.8,1.6-5.6h0v.7c0,1.5,0,4,1.5,4.9s3.1.3,4.3,0,2.7-1.3,4.2-1.2c.3-.7.7-1.2,1.3-1.7-1.2,0-2.4-.5-3.5-.9s-1.4-.7-2.1-1c-2.1-.8-3.2,1-3.4,2.8l.5-.5c1.4-1.2,2.6-.5,4,.2s0,0,0,0c0,.2-1.2.6-1.4.7-1.4.4-3.5.7-4.1-1s-.7-5.1-.5-7,.1-.9.2-1.3h0ZM11.5,8.8c.2-.8.3-1.7,0-2.5-.4-1.6-1.6-2.6-3.1-3.2s-.7-.3-1.1-.4c-.3.8-.4,1.8,0,2.7,0,0,.9.2,1,.2,1.4.3,2.6,1,3,2.5l.2.7h.1Z"
                fill="#fff"
              />
            </svg>
          </div>

          <a
            href={ORDER_ONLINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 text-lg text-black transition-all transform rounded-full bg-lightning-yellow cosmic-lager hover:bg-opacity-90 hover:scale-105"
          >
            ORDER NOW
          </a>
        </div>
      </div>
    </header>
  );
};

export default DesktopHeader;
