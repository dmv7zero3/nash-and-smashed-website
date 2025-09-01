// src/core/Pages/Contact/ContactInformation.tsx
import React from "react";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaApple,
  FaGooglePlay,
} from "react-icons/fa";
import { ContactInformationProps } from "./types";
import {
  FACEBOOK_URL,
  INSTAGRAM_URL,
  APPLE_APP_STORE_URL,
  GOOGLE_PLAY_STORE_URL,
  PHONE_NUMBER,
} from "@/core/constants/business";

const ContactInformation: React.FC<ContactInformationProps> = ({
  phone,
  email,
  address,
}) => {
  return (
    <div className="mb-12 lg:mb-0 lg:w-1/3 text-dark-olive-bark">
      <h2 className="mb-6 american">Get In Touch</h2>
      <p className="mb-8 text-lg">
        We'd love to hear from you. Whether you have a question about our
        locations, products, or anything else, our team is ready to answer all
        your questions.
      </p>

      <div className="space-y-6">
        <div className="flex items-start">
          <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mr-4 rounded-full bg-lightning-yellow-100">
            <FaMapMarkerAlt className="text-lightning-yellow-500" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-bronzetone-700 open-sans">
              Headquarter
            </h3>
            <p className="text-gray-600">{address}</p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mr-4 rounded-full bg-lightning-yellow-100">
            <FaPhone className="text-lightning-yellow-500" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-bronzetone-700 open-sans">
              Phone
            </h3>
            <p className="text-gray-600">{phone}</p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mr-4 rounded-full bg-lightning-yellow-100">
            <FaEnvelope className="text-lightning-yellow-500" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-bronzetone-700 open-sans">
              Email
            </h3>
            <p className="text-gray-600">{email}</p>
          </div>
        </div>
      </div>

      <div className="p-6 mt-10 border border-gray-200 rounded-lg bg-gray-50">
        <h3 className="mb-4 text-xl font-bold text-bronzetone-800 open-sans">
          Follow Us
        </h3>
        <div className="flex flex-wrap gap-4">
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 text-gray-600 transition-colors rounded-full hover:text-lightning-yellow-500 hover:bg-lightning-yellow-100"
          >
            <FaFacebook className="w-5 h-5" />
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 text-gray-600 transition-colors rounded-full hover:text-lightning-yellow-500 hover:bg-lightning-yellow-100"
          >
            <FaInstagram className="w-5 h-5" />
          </a>
          <a
            href={APPLE_APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 text-gray-600 transition-colors rounded-full hover:text-lightning-yellow-500 hover:bg-lightning-yellow-100"
          >
            <FaApple className="w-5 h-5" />
          </a>
          <a
            href={GOOGLE_PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 text-gray-600 transition-colors rounded-full hover:text-lightning-yellow-500 hover:bg-lightning-yellow-100"
          >
            <FaGooglePlay className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
