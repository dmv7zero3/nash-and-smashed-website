// LocationMap component update
import React from "react";
import { ChelmsfordLocationData } from "../types";
import { FaMapMarkerAlt } from "react-icons/fa";

interface LocationMapProps {
  locationData: ChelmsfordLocationData;
}

const LocationMap: React.FC<LocationMapProps> = ({ locationData }) => {
  // Using a publicly accessible map approach instead of the API key method
  // This uses Google Maps' embed URL that doesn't require an API key
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2468.1808884553543!2d0.47041101095121003!3d51.73222470948534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8e81dd6883fc5%3A0xcf2db3427a95a88!2s6b%20Baddow%20Rd%2C%20Chelmsford%20CM2%200DG%2C%20UK!5e0!3m2!1sen!2sus!4v1684298347304!5m2!1sen!2sus`;

  return (
    <section id="location" className="py-16 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="max-w-5xl mx-auto">
          <h2 className="mb-6 text-4xl text-center cosmic-lager text-dark-olive-bark">
            Find Us
          </h2>
          <p className="mb-8 text-center proxima text-dark-olive-bark">
            Visit our Chelmsford location to experience authentic Nashville hot
            chicken and smashed burgers
          </p>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="flex items-center mb-4 text-xl cosmic-lager text-dark-olive-bark">
                <FaMapMarkerAlt className="mr-2 text-lightning-yellow-500" />
                Address
              </h3>
              <p className="mb-4 proxima">{locationData.fullAddress}</p>

              <h3 className="flex items-center mt-6 mb-4 text-xl cosmic-lager text-dark-olive-bark">
                <FaMapMarkerAlt className="mr-2 text-lightning-yellow-500" />
                Opening Hours
              </h3>
              <ul className="space-y-2 proxima">
                <li>Monday - Thursday: 11:00 AM - 10:00 PM</li>
                <li>Friday - Saturday: 11:00 AM - 11:00 PM</li>
                <li>Sunday: 12:00 PM - 9:00 PM</li>
              </ul>

              <div className="mt-6">
                <a
                  href={locationData.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 font-bold transition-colors rounded-md bg-lightning-yellow-400 text-dark-olive-bark hover:bg-lightning-yellow-500 proxima"
                >
                  Get Directions
                </a>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg shadow-lg">
              <iframe
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "350px" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Nash & Smashed ${locationData.city} Location Map`}
                aria-label={`Google Map showing Nash & Smashed location at ${locationData.fullAddress}`}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;
