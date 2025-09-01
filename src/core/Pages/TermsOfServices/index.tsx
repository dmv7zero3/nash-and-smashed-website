import React from "react";
import { Helmet } from "react-helmet";
import { headquarters } from "@/core/constants/locations";
import { EMAIL, PHONE_NUMBER } from "@/core/constants/business";

const TermsOfServicesPage: React.FC = () => {
  return (
    <div className="bg-white">
      <Helmet>
        <title>Terms of Service | Nash & Smashed</title>
        <meta
          name="description"
          content="Terms of Service for Nash & Smashed. Please read these terms carefully before using our website and services."
        />
      </Helmet>

      {/* Header Section */}
      <div className="relative">
        <div className="absolute inset-0 z-10 bg-black/50"></div>
        <div
          className="h-[250px] bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/banner/banner.jpg')",
          }}
        ></div>
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="container px-4 mx-auto text-center text-white">
            <h1 className="mb-4 text-4xl font-bold tracking-wide md:text-5xl cosmic-lager">
              Terms of Service
            </h1>
            <p className="text-lg proxima-regular">
              Last Updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="p-8 bg-white rounded-lg shadow-md">
              <div className="prose max-w-none">
                <p className="mb-6 text-gray-600 open-sans">
                  These Terms of Service ("Terms") govern your access to and use
                  of the Nash & Smashed website, services, and mobile
                  applications (collectively, the "Services"). Please read these
                  Terms carefully, and contact us if you have any questions.
                </p>

                <h2 className="mt-10 mb-4 text-2xl font-bold text-bronzetone-800 proxima-bold">
                  1. Acceptance of Terms
                </h2>
                <p className="mb-6 text-gray-600 open-sans">
                  By accessing or using our Services, you agree to be bound by
                  these Terms and our Privacy Policy. If you do not agree to
                  these Terms, please do not use our Services.
                </p>

                <h2 className="mt-10 mb-4 text-2xl font-bold text-bronzetone-800 proxima-bold">
                  2. Eligibility
                </h2>
                <p className="mb-6 text-gray-600 open-sans">
                  You must be at least 13 years old to use our Services. By
                  using our Services, you represent and warrant that you meet
                  all eligibility requirements.
                </p>

                <h2 className="mt-10 mb-4 text-2xl font-bold text-bronzetone-800 proxima-bold">
                  3. User Accounts
                </h2>
                <p className="mb-6 text-gray-600 open-sans">
                  When creating an account, you guarantee that the information
                  provided is accurate, complete, and current at all times.
                  Inaccurate or outdated information may result in the
                  termination of your account.
                </p>
                <p className="mb-6 text-gray-600 open-sans">
                  You are responsible for maintaining the confidentiality of
                  your account and password, including but not limited to the
                  restriction of access to your computer and/or account. You
                  agree to accept responsibility for any and all activities or
                  actions that occur under your account and/or password.
                </p>

                <h2 className="mt-10 mb-4 text-2xl font-bold text-bronzetone-800 proxima-bold">
                  4. Ordering and Payment
                </h2>
                <p className="mb-6 text-gray-600 open-sans">
                  When placing an order through our Services, you agree to
                  provide current, complete, and accurate information. All
                  payments must be made through the approved payment methods we
                  offer. Prices for our products are subject to change without
                  notice, and we reserve the right to refuse any order.
                </p>

                <h2 className="mt-10 mb-4 text-2xl font-bold text-bronzetone-800 proxima-bold">
                  5. Intellectual Property
                </h2>
                <p className="mb-6 text-gray-600 open-sans">
                  The Services, including their original content, features, and
                  functionality, are the exclusive property of Nash & Smashed
                  and its licensors. The Services are protected by copyright,
                  trademark, and other laws. Our trademarks and trade dress may
                  not be used in connection with any product or service without
                  prior written consent.
                </p>

                <h2 className="mt-10 mb-4 text-2xl font-bold text-bronzetone-800 proxima-bold">
                  6. User Content
                </h2>
                <p className="mb-6 text-gray-600 open-sans">
                  Our Services may allow you to post or share content. By
                  providing such material, you grant us the right to use,
                  modify, publicly display, reproduce, and distribute this
                  content through our Services.
                </p>

                <h2 className="mt-10 mb-4 text-2xl font-bold text-bronzetone-800 proxima-bold">
                  7. Prohibited Uses
                </h2>
                <p className="mb-6 text-gray-600 open-sans">
                  You may use our Services only for lawful purposes and in
                  accordance with these Terms. You agree not to use our
                  Services:
                </p>
                <ul className="mb-6 ml-6 font-bold text-gray-600 list-disc open-sans">
                  <li className="mb-2">
                    ⁠In any way that violates applicable laws or regulations
                  </li>
                  <li className="mb-2">
                    To transmit unsolicited advertising or promotional material,
                    including "spam."
                  </li>
                  <li className="mb-2">
                    ⁠To impersonate Nash & Smashed, its employees, or any other
                    person or entity.
                  </li>
                  <li className="mb-2">
                    To engage in conduct that restricts or inhibits anyone’s use
                    or enjoyment of the Services.
                  </li>
                </ul>

                <h2 className="mt-10 mb-4 text-2xl font-bold text-bronzetone-800 proxima-bold">
                  8. Termination
                </h2>
                <p className="mb-6 text-gray-600 open-sans">
                  We may terminate or suspend your account and bar access to the
                  Services immediately, without prior notice, under our sole
                  discretion, for any reason, including breaches of these Terms.
                </p>

                <h2 className="mt-10 mb-4 text-2xl font-bold text-bronzetone-800 proxima-bold">
                  9. Limitation of Liability
                </h2>
                <p className="mb-6 text-gray-600 open-sans">
                  In no event shall Nash & Smashed, its directors, employees, or
                  affiliates be liable for any indirect, incidental, special,
                  consequential, or punitive damages, including, without
                  limitation, loss of profits, data, or goodwill, resulting from
                  your access to or use of our Services.
                </p>

                <h2 className="mt-10 mb-4 text-2xl font-bold text-bronzetone-800 proxima-bold">
                  10. Disclaimer
                </h2>
                <p className="mb-6 text-gray-600 open-sans">
                  Your use of the Services is at your sole risk. The Services
                  are provided on an "AS IS" and "AS AVAILABLE" basis, without
                  warranties of any kind, either express or implied.
                </p>

                <h2 className="mt-10 mb-4 text-2xl font-bold text-bronzetone-800 proxima-bold">
                  11. Governing Law
                </h2>
                <p className="mb-6 text-gray-600 open-sans">
                  These Terms shall be governed by the laws of the United States
                  and the State of Virginia, without regard to its conflict of
                  law provisions.
                </p>

                <h2 className="mt-10 mb-4 text-2xl font-bold text-bronzetone-800 proxima-bold">
                  12. Changes to Terms
                </h2>
                <p className="mb-6 text-gray-600 open-sans">
                  We reserve the right to modify these Terms at any time. If a
                  revision is significant, we will provide at least 30 days'
                  notice prior to the new terms taking effect.
                </p>

                <h2 className="mt-10 mb-4 text-2xl font-bold text-bronzetone-800 proxima-bold">
                  13. Contact Us
                </h2>
                <p className="text-gray-600 open-sans">
                  If you have any questions about these Terms, please contact us
                  at:
                </p>
                <address className="mt-4 not-italic text-gray-600 open-sans">
                  <p>Nash & Smashed</p>
                  <p>{headquarters.address}</p>
                  <p>
                    {headquarters.city}, {headquarters.state}{" "}
                    {headquarters.zipCode}
                  </p>
                  <p>Email: {EMAIL}</p>
                  <p>Phone: {PHONE_NUMBER}</p>
                </address>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-12 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl p-8 mx-auto text-center bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-2xl font-bold text-bronzetone-800 proxima-bold">
              Have Questions About Our Terms?
            </h2>
            <p className="mb-6 text-gray-600 open-sans">
              Our customer service team is here to help you understand our
              policies and address any concerns you might have.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/contact"
                className="px-6 py-3 font-bold text-white transition-colors rounded-md bg-bronzetone-700 hover:bg-bronzetone-800 focus:outline-none focus:ring-2 focus:ring-bronzetone-500 focus:ring-opacity-50"
              >
                Contact Us
              </a>
              <a
                href="/privacy-policy"
                className="px-6 py-3 font-bold transition-colors bg-white border rounded-md border-bronzetone-700 text-bronzetone-700 hover:bg-bronzetone-50 focus:outline-none focus:ring-2 focus:ring-bronzetone-500 focus:ring-opacity-50"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfServicesPage;
