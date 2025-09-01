import React, { useState } from "react";
import { Link } from "react-router-dom";
import MobileMenuOverlay from "./MobileMenuOverlay";
import { ORDER_ONLINE_URL } from "../../../constants/business";

const MobileHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="block lg:hidden">
      <div className="bg-black my-3.5 rounded-full mx-4 py-2 px-4 flex items-center justify-between text-white">
        {/* Mobile menu toggle button */}

        <div className="flex flex-row">
          <button
            onClick={toggleMenu}
            className="p-2 text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div className="flex items-center justify-center min-w-[40px] ">
            <svg
              id="halal-icon"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              viewBox="0 0 25 13.4"
              className="h-auto w-9 min-w-[36px] flex-shrink-0"
              aria-label="Halal Certified"
            >
              <title>Halal Certified Food</title>
              <path
                d="M5.9,0c-.2,0-.4.2-.5.3-.2.4-.4.9-.5,1.3.5,2.3,1.4,4.9.9,7.3s-1.8,3.1-3.8,2.3-1.2-2.3-1.1-3.5,0-.3,0-.4c-.1.2-.2.4-.3.6-.8,1.7-1.3,4.5,1.1,5.3,2.4.8,4.4-.7,5.1-2.6s0-2,0-3.2-.2-2.3,0-3.5,0-1.2.3-1.8c-.5-.7-1-1.3-1.1-2.1ZM14.7.7c-.6,0-1.1-.1-1.7-.4.2,4.6-.4,10.6-5.6,12.1s-1,.2-1.5.3-.3,0-.3,0c2.1.5,4.8.9,6.4-1s1.4-3.8,1.6-5.6h0v.7c0,1.5,0,4,1.5,4.9s3.1.3,4.3,0,2.7-1.3,4.2-1.2c.3-.7.7-1.2,1.3-1.7-1.2,0-2.4-.5-3.5-.9s-1.4-.7-2.1-1c-2.1-.8-3.2,1-3.4,2.8l.5-.5c1.4-1.2,2.6-.5,4,.2s0,0,0,0c0,.2-1.2.6-1.4.7-1.4.4-3.5.7-4.1-1s-.7-5.1-.5-7,.1-.9.2-1.3h0ZM11.5,8.8c.2-.8.3-1.7,0-2.5-.4-1.6-1.6-2.6-3.1-3.2s-.7-.3-1.1-.4c-.3.8-.4,1.8,0,2.7,0,0,.9.2,1,.2,1.4.3,2.6,1,3,2.5l.2.7h.1Z"
                fill="#fff"
              />
            </svg>
          </div>
        </div>
        {/* Logo in center */}
        <div className="absolute transform -translate-x-1/2 left-1/2">
          <Link to="/" className="block">
            <picture>
              <source
                srcSet="/images/logos/nash-and-smashed-logo.webp"
                type="image/webp"
              />
              <img
                src="/images/logos/nash-and-smashed-logo.png"
                alt="Nash and Smashed Logo"
                className="h-10"
              />
            </picture>
          </Link>
        </div>

        {/* Order Now button */}
        <a
          href={ORDER_ONLINE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-1 text-sm rounded-full text-dark-olive-bark bg-lightning-yellow cosmic-lager"
        >
          ORDER
        </a>
      </div>

      {/* Mobile Menu Overlay */}
      <MobileMenuOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </header>
  );
};

export default MobileHeader;
