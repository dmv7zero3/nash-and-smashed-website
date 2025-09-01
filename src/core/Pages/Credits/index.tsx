import React from "react";
import { Helmet } from "react-helmet";

const CreditsPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Credits | Nash & Smashed</title>
        <meta
          name="description"
          content="Website design and development credits for Nash & Smashed."
        />
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="pt-24 pb-16 bg-white">
        <div className="container max-w-4xl px-4 mx-auto">
          <h1 className="mb-8 text-4xl font-bold text-center text-bronzetone-800 cosmic-lager">
            Website Credits
          </h1>

          <div className="p-8 rounded-lg shadow-md bg-gray-50">
            <div className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-bronzetone-800 cosmic-lager">
                Website Design & Development
              </h2>
              <div className="flex flex-col items-center md:flex-row md:items-start">
                <div className="mb-6 md:mb-0 md:mr-8">
                  <img
                    src="/images/credits/marketbrewer-logo.png"
                    alt="MarketBrewer LLC Logo"
                    className="w-64 h-auto"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src =
                        "https://www.marketbrewer.com/images/logo.png";
                    }}
                  />
                </div>
                <div className="flex-1">
                  <p className="mb-4 text-lg text-bronzetone-700 american">
                    This website was designed and developed by{" "}
                    <span className="font-bold">MarketBrewer LLC</span>, a
                    digital marketing agency specialized in creating custom
                    websites, digital marketing strategies, and brand
                    experiences for restaurants and food service businesses.
                  </p>
                  <p className="mb-6 text-lg text-bronzetone-700 american">
                    MarketBrewer combines technical expertise with industry
                    knowledge to deliver high-performing websites and digital
                    solutions that drive business growth.
                  </p>
                  <div className="grid gap-2">
                    <a
                      href="https://www.marketbrewer.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-lightning-yellow-600 hover:text-lightning-yellow-700"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                      </svg>
                      www.marketbrewer.com
                    </a>
                    <a
                      href="mailto:webdev@marketbrewer.com"
                      className="inline-flex items-center text-lightning-yellow-600 hover:text-lightning-yellow-700"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                      </svg>
                      webdev@marketbrewer.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <hr className="my-8 border-gray-300" />

            <div className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-bronzetone-800 cosmic-lager">
                Technologies Used
              </h2>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-4 bg-white border border-gray-200 rounded-lg">
                  <h3 className="mb-2 font-bold text-lightning-yellow-600">
                    Frontend
                  </h3>
                  <ul className="pl-5 space-y-1 list-disc text-bronzetone-700">
                    <li>React</li>
                    <li>TypeScript</li>
                    <li>TailwindCSS</li>
                    <li>GSAP Animations</li>
                    <li>Responsive Design</li>
                  </ul>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg">
                  <h3 className="mb-2 font-bold text-lightning-yellow-600">
                    Backend
                  </h3>
                  <ul className="pl-5 space-y-1 list-disc text-bronzetone-700">
                    <li>AWS Lambda</li>
                    <li>Python</li>
                    <li>DynamoDB</li>
                    <li>Amazon SES</li>
                    <li>API Gateway</li>
                  </ul>
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg">
                  <h3 className="mb-2 font-bold text-lightning-yellow-600">
                    DevOps
                  </h3>
                  <ul className="pl-5 space-y-1 list-disc text-bronzetone-700">
                    <li>AWS CloudFront</li>
                    <li>AWS S3</li>
                    <li>CI/CD Pipeline</li>
                    <li>Webpack</li>
                    <li>Git Version Control</li>
                  </ul>
                </div>
              </div>
            </div>

            <hr className="my-8 border-gray-300" />

            <div>
              <h2 className="mb-4 text-2xl font-bold text-bronzetone-800 cosmic-lager">
                Copyright Information
              </h2>
              <p className="mb-4 text-lg text-bronzetone-700 american">
                © {new Date().getFullYear()} Nash & Smashed. Website design and
                development by MarketBrewer LLC. All rights reserved.
              </p>
              <p className="text-lg text-bronzetone-700 american">
                For questions about this website, please contact{" "}
                <a
                  href="mailto:webdev@marketbrewer.com"
                  className="text-lightning-yellow-600 hover:text-lightning-yellow-700 hover:underline"
                >
                  webdev@marketbrewer.com
                </a>
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <a
              href="/"
              className="inline-flex items-center text-lightning-yellow-600 hover:text-lightning-yellow-700"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Return to Homepage
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreditsPage;
