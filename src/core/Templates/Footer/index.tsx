import React from "react";
import { Link } from "react-router-dom";
import {
  EMAIL,
  BUSINESS_NAME,
  PHONE_NUMBER,
  APPLE_APP_STORE_URL,
  GOOGLE_PLAY_STORE_URL,
  ORDER_ONLINE_URL,
} from "@/core/constants/business";
import { FaApple, FaGooglePlay, FaShoppingBag } from "react-icons/fa";
import SocialMedia from "./SocialMedia";

export default function Footer() {
  return (
    <footer
      id="footer"
      className="py-10 font-semibold text-white bg-black open-sans"
    >
      <div className="container px-4 mx-auto">
        {/* Logo and main content */}
        <div className="flex flex-col items-center justify-center mb-8 md:flex-row md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link to="/">
              <picture>
                <source
                  srcSet="/images/logos/nash-and-smashed-logo-symbol.webp"
                  type="image/webp"
                />
                <img
                  src="/images/logos/nash-and-smashed-logo-symbol.png"
                  alt={`${BUSINESS_NAME} Logo`}
                  className="h-auto w-[7.5rem]"
                  width="120"
                />
              </picture>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3 md:text-left md:gap-12">
            <div>
              <p className="mb-4 text-lg font-bold open-sans">Contact</p>
              <ul className="space-y-2 ">
                <li>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="transition-colors hover:text-gray-300"
                  >
                    {EMAIL}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${PHONE_NUMBER.replace(/[\s()-]/g, "")}`}
                    className="transition-colors hover:text-gray-300"
                  >
                    + 1 (202) 751-0731
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="mb-4 text-lg font-bold open-sans">Quick Links</p>
              <div className="grid grid-cols-2 gap-x-4">
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/"
                      className="transition-colors hover:text-gray-300"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/locations"
                      className="transition-colors hover:text-gray-300"
                    >
                      Locations
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/media"
                      className="transition-colors hover:text-gray-300"
                    >
                      Media
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/blog"
                      className="transition-colors hover:text-gray-300"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/careers"
                      className="transition-colors hover:text-gray-300"
                    >
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className="transition-colors hover:text-gray-300"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/fundraising"
                      className="transition-colors hover:text-gray-300"
                    >
                      Fundraising
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/franchise"
                      className="transition-colors hover:text-gray-300"
                    >
                      Franchise
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/calories"
                      className="transition-colors hover:text-gray-300"
                    >
                      Calories
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/privacy-policy"
                      className="transition-colors hover:text-gray-300"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/terms-of-service"
                      className="transition-colors hover:text-gray-300"
                    >
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Use SocialMedia component */}
            <SocialMedia />
          </div>
        </div>

        {/* App links and order online section */}
        <div className="flex flex-col items-center justify-center py-6 mt-8 border-t border-gray-800 md:flex-row md:justify-between">
          <div className="flex flex-wrap items-center justify-center mb-6 space-x-4 md:mb-0">
            <a
              href={APPLE_APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 mb-2 transition-colors rounded-md md:mb-0 hover:bg-gray-800 proxima"
              aria-label="Download on App Store"
            >
              <FaApple className="mr-2" />
              <span>App Store</span>
            </a>
            <a
              href={GOOGLE_PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 mb-2 transition-colors rounded-md md:mb-0 hover:bg-gray-800 proxima"
              aria-label="Get it on Google Play"
            >
              <FaGooglePlay className="mr-2" />
              <span>Google Play</span>
            </a>
            <a
              href={ORDER_ONLINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 mb-2 text-black transition-colors rounded-md bg-lightning-yellow-400 md:mb-0 hover:bg-lightning-yellow-500 proxima"
            >
              <FaShoppingBag className="mr-2" />
              <span>Order Online</span>
            </a>
          </div>
          <p className="text-sm text-gray-400 proxima">
            &copy; {new Date().getFullYear()} {BUSINESS_NAME}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
