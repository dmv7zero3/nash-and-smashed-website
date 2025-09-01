import React from "react";
import { Helmet } from "react-helmet";
import { headquarters } from "@/core/constants/locations";
import { EMAIL, PHONE_NUMBER } from "@/core/constants/business";

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="bg-white">
      <Helmet>
        <title>Privacy Policy | Nash & Smashed</title>
        <meta
          name="description"
          content="Privacy Policy for Nash & Smashed. Learn how we collect, use, and protect your personal information."
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
              Privacy Policy
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
                  At Nash & Smashed, we value your privacy and are committed to
                  protecting your personal information. This Privacy Policy
                  explains how we collect, use, disclose, and safeguard your
                  information when you visit our website, use our mobile
                  application, or dine at our restaurants.
                </p>
                <p className="mb-6 text-gray-600 open-sans">
                  Please read this policy carefully. If you do not agree with
                  the terms of this privacy policy, please do not access our
                  website, use our app, or provide personal information to us.
                </p>

                <h2 className="mt-10 mb-4 text-2xl font-bold text-bronzetone-800 open-sans">
                  1. Information We Collect
                </h2>

                <h3 className="mt-6 mb-3 text-xl font-semibold text-bronzetone-700 open-sans">
                  Personal Information
                </h3>
                <p className="mb-6 text-gray-600 open-sans">
                  We may collect personal information that you provide directly
                  to us, including:
                </p>
                <ul className="mb-6 ml-6 font-bold text-gray-600 list-disc open-sans">
                  <li className="mb-2">
                    Contact information (name, email address, phone number,
                    mailing address)
                  </li>
                  <li className="mb-2">
                    Account information (username, password) if you create an
                    account
                  </li>
                  <li className="mb-2">Order history and preferences</li>
                  <li className="mb-2">
                    Payment information (processed through secure third-party
                    payment processors)
                  </li>
                  <li className="mb-2">Communications you send to us</li>
                </ul>

                <h3 className="mt-6 mb-3 text-xl font-semibold text-bronzetone-700 open-sans">
                  Automatically Collected Information
                </h3>
                <p className="mb-6 text-gray-600 open-sans">
                  When you access our website or use our mobile application, we
                  may automatically collect:
                </p>
                <ul className="mb-6 ml-6 font-bold text-gray-600 list-disc open-sans">
                  <li className="mb-2">
                    Log information (IP address, browser type, pages viewed,
                    time spent)
                  </li>
                  <li className="mb-2">
                    Device information (device type, operating system, unique
                    device identifiers)
                  </li>
                  <li className="mb-2">
                    Location information (if you permit this through your device
                    settings)
                  </li>
                  <li className="mb-2">
                    Usage details about your interactions with our website and
                    app
                  </li>
                </ul>

                <h3 className="mt-6 mb-3 text-xl font-semibold text-bronzetone-700 open-sans">
                  Cookies and Similar Technologies
                </h3>
                <p className="mb-6 text-gray-600 open-sans">
                  We use cookies, web beacons, and similar tracking technologies
                  to collect information about your interactions with our
                  website. These technologies help us analyze website traffic,
                  customize content, and improve your experience. You can set
                  your browser to refuse cookies, but this may limit your
                  ability to use some features of our website.
                </p>

                <h2 className="mt-10 mb-4 text-2xl font-bold text-bronzetone-800 open-sans">
                  2. How We Use Your Information
                </h2>
                <p className="mb-6 text-gray-600 open-sans">
                  We may use the information we collect for various purposes,
                  including:
                </p>
                <ul className="mb-6 ml-6 font-bold text-gray-600 list-disc open-sans">
                  <li className="mb-2">
                    Processing and fulfilling your orders
                  </li>
                  <li className="mb-2">Creating and managing your account</li>
                  <li className="mb-2">Providing customer support</li>
                  <li className="mb-2">
                    Sending you transactional and promotional communications
                  </li>
                  <li className="mb-2">
                    Personalizing your experience on our website and app
                  </li>
                  <li className="mb-2">
                    Improving our products, services, website, and app
                  </li>
                  <li className="mb-2">Analyzing usage patterns and trends</li>
                  <li className="mb-2">
                    Protecting against fraud and unauthorized transactions
                  </li>
                  <li className="mb-2">Complying with legal obligations</li>
                </ul>

                <h2 className="mt-10 mb-4 text-2xl font-bold text-bronzetone-800 open-sans">
                  3. Sharing Your Information
                </h2>
                <p className="mb-6 text-gray-600 open-sans">
                  We may share your personal information with:
                </p>
                <ul className="mb-6 ml-6 font-bold text-gray-600 list-disc open-sans">
                  <li className="mb-2">
                    Service providers who perform functions on our behalf
                    (payment processing, delivery services, data analysis, email
                    delivery, hosting services, customer service)
                  </li>
                  <li className="mb-2">
                    Business partners with whom we jointly offer products or
                    services
                  </li>
                  <li className="mb-2">
                    Affiliated companies within our corporate family
                  </li>
                  <li className="mb-2">
                    Professional advisors such as lawyers, accountants, and
                    insurers
                  </li>
                  <li className="mb-2">
                    Government bodies when required by law or to protect our
                    rights
                  </li>
                </ul>
                <p className="mb-6 text-gray-600 open-sans">
                  We may also share aggregated or de-identified information that
                  cannot reasonably be used to identify you.
                </p>

                <h2 className="mt-10 mb-4 text-2xl font-bold text-bronzetone-800 open-sans">
                  4. Your Choices
                </h2>
                <p className="mb-6 text-gray-600 open-sans">
                  You have several choices regarding your personal information:
                </p>
                <ul className="mb-6 ml-6 font-bold text-gray-600 list-disc open-sans">
                  <li className="mb-2">
                    Account Information: You can update your account information
                    by logging into your account or contacting us directly.
                  </li>
                  <li className="mb-2">
                    Marketing Communications: You can opt out of receiving
                    promotional emails by following the unsubscribe instructions
                    in these emails or contacting us. You may continue to
                    receive service-related communications.
                  </li>
                  <li className="mb-2">
                    Cookies: You can manage cookie preferences through your
                    browser settings.
                  </li>
                  <li className="mb-2">
                    Mobile App: You can stop collection of information through
                    our app by uninstalling the app.
                  </li>
                </ul>

                <h2 className="mt-10 mb-4 text-2xl font-bold text-bronzetone-800 open-sans">
                  5. Data Security
                </h2>
                <p className="mb-6 text-gray-600 open-sans">
                  We implement appropriate technical and organizational measures
                  to protect your personal information from accidental loss and
                  unauthorized access, use, alteration, and disclosure. However,
                  no method of transmission over the internet or electronic
                  storage is 100% secure, so we cannot guarantee absolute
                  security.
                </p>

                <h2 className="mt-10 mb-4 text-2xl font-bold text-bronzetone-800 open-sans">
                  6. Children's Privacy
                </h2>
                <p className="mb-6 text-gray-600 open-sans">
                  Our Services are not intended for children under 13 years of
                  age. We do not knowingly collect personal information from
                  children under 13. If you are a parent or guardian and believe
                  your child has provided us with personal information, please
                  contact us, and we will delete such information from our
                  files.
                </p>

                <h2 className="mt-10 mb-4 text-2xl font-bold text-bronzetone-800 open-sans">
                  7. Third-Party Links and Features
                </h2>
                <p className="mb-6 text-gray-600 open-sans">
                  Our website and app may contain links to third-party websites
                  and services. This Privacy Policy does not apply to those
                  third-party services, and we are not responsible for their
                  privacy practices. We encourage you to read the privacy
                  policies of any third-party services you access.
                </p>

                <h2 className="mt-10 mb-4 text-2xl font-bold text-bronzetone-800 open-sans">
                  8. California Privacy Rights
                </h2>
                <p className="mb-6 text-gray-600 open-sans">
                  California residents may have additional privacy rights
                  regarding their personal information. These rights may include
                  the right to request disclosure of personal information
                  collected, the right to request deletion of personal
                  information, and the right to opt out of the sale of personal
                  information. To exercise these rights, please contact us using
                  the information below.
                </p>

                <h2 className="mt-10 mb-4 text-2xl font-bold text-bronzetone-800 open-sans">
                  9. International Data Transfers
                </h2>
                <p className="mb-6 text-gray-600 open-sans">
                  We are based in the United States and process information on
                  servers located in the United States. If you are located
                  outside the United States, your information may be transferred
                  to, stored, and processed in the United States, where our
                  servers are located. By using our Services, you consent to the
                  transfer of your information to the United States.
                </p>

                <h2 className="mt-10 mb-4 text-2xl font-bold text-bronzetone-800 open-sans">
                  10. Changes to This Policy
                </h2>
                <p className="mb-6 text-gray-600 open-sans">
                  We may update this Privacy Policy from time to time. The
                  updated version will be indicated by an updated "Last Updated"
                  date. We encourage you to review this Privacy Policy
                  periodically to stay informed about how we collect, use, and
                  protect your information.
                </p>

                <h2 className="mt-10 mb-4 text-2xl font-bold text-bronzetone-800 open-sans">
                  11. Contact Us
                </h2>
                <p className="mb-6 text-gray-600 open-sans">
                  If you have any questions or concerns about this Privacy
                  Policy or our privacy practices, please contact us at:
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
            <h2 className="mb-4 text-2xl font-bold text-bronzetone-800 open-sans">
              Have Questions About Your Privacy?
            </h2>
            <p className="mb-6 text-gray-600 open-sans">
              We're committed to transparency about our data practices. If you
              have any questions or need assistance with privacy-related
              matters, our team is here to help.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/contact"
                className="px-6 py-3 font-bold text-white transition-colors rounded-md bg-bronzetone-700 hover:bg-bronzetone-800 focus:outline-none focus:ring-2 focus:ring-lightning-yellow-300 focus:ring-opacity-50"
              >
                Contact Us
              </a>
              <a
                href="/terms-of-service"
                className="px-6 py-3 font-bold transition-colors bg-white border rounded-md border-bronzetone-700 text-bronzetone-700 hover:bg-lightning-yellow-50 focus:outline-none focus:ring-2 focus:ring-lightning-yellow-300 focus:ring-opacity-50"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
