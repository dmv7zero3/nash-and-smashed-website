// src/core/Pages/Franchise/index.tsx
import React from "react";
import { Helmet } from "react-helmet";
import {
  FaCheckCircle,
  FaMoneyBillWave,
  FaGraduationCap,
  FaHandshake,
} from "react-icons/fa";
import FranchiseForm from "./FranchiseForm";
import BusinessConcept from "./BusinessConcept";
import FranchiseFeatures from "./FranchiseFeatures";
import TrainingAndSupport from "./TrainingAndSupport";
import FranchiseFAQs from "./FranchiseFAQs";
import FranchiseVideo from "./FranchiseVideo";
import FullWidthBannerSection from "@/core/Templates/FullWidthBannerSection";
import Hero from "./Hero";

const FranchisePage: React.FC = () => {
  // Content sections from your provided text
  const introText =
    "Thank you for your interest in franchising with Nash & Smashed! Founded in Manassas, VA, delivering the vibrant flavors of Nashville with its signature fried chicken sandwiches and Smashed burgers crafted from high-quality, locally sourced, halal, and antibiotic-free ingredients. With a focus on quality, community, and customer care, Nash & Smashed has quickly become a favorite destination for food lovers, drawing from Nashville's culinary traditions and Southern hospitality. Franchisees will be entering into a strategic entry into the thriving fast-casual industry, which is projected to exceed $301.6 billion globally by 2032 as consumers increasingly seek quick, high-quality dining options. By joining the team, entrepreneurs can benefit from a proven business model, extensive support, and a brand dedicated to exceptional food and service. Franchisees will receive comprehensive training, operational guidance, and marketing support, ensuring they are well-equipped to bring this unique dining experience to their communities while capitalizing on a profitable and expanding industry.";

  const conceptText =
    "With a mission to bring the vibrant flavors of Nashville-style fried chicken and Smashed burgers to local communities through a unique dining experience, Nash and Smashed are combining Southern culinary traditions with modern dining. The concept offers signature fried chicken sandwiches and expertly crafted Smashed burgers, made from locally sourced, halal, and antibiotic-free ingredients, ensuring the highest quality. Customers can enjoy a fully customizable meal with various toppings and sauces, accompanied by delectable mocktails and desserts. Committed to community and quality, Nash & Smashed actively engages with local events, supports nearby farmers, and prioritizes exceptional customer service, fostering a welcoming atmosphere that keeps guests coming back. This dedication to authenticity, quality, and community connection sets Nash & Smashed apart, making it a go-to destination for food lovers and a promising franchise opportunity for entrepreneurs.";

  const offeringText =
    "Franchising with Nash & Smashed offers entrepreneurs an exciting opportunity to join the fast-casual restaurant industry, which is experiencing rapid growth. With consumers increasingly favoring high-quality, quick-service dining options, the fast-casual market is projected to surpass $301.6 billion globally by 2032, highlighting significant demand for distinctive and flavorful dining experiences. Standing out with its unique blend of Nashville-style fried chicken sandwiches and customizable Smashed burgers, the brand's commitment to exceptional quality, community engagement, and customer service has earned it a loyal customer base and a strong reputation. For entrepreneurs, the minimum investment to franchise with Nash & Smashed ranges from $264,500 to $779,500, with an initial franchise fee of $37,500, making it an accessible and financially sound choice in a booming industry. Franchisees will benefit from a proven business model, comprehensive training, and ongoing support, ensuring they have the tools to succeed while bringing this unique concept to their own communities.";

  const trainingText =
    "Franchisees will receive extensive training to ensure a successful start. The program includes 6 hours of classroom training, where franchisees learn essential aspects of the business, such as food preparation, menu customization, customer service, inventory management, and operational best practices. This foundational knowledge is followed by 34 hours of on-the-job training, providing hands-on experience in a real Nash & Smashed location under the guidance of experienced team members. This blend of classroom and practical training equips franchisees with the skills and confidence to deliver the high-quality, vibrant dining experience that defines Nash & Smashed, ensuring consistency and excellence across all locations.";

  // Key benefits/features of the franchise opportunity
  const franchiseFeatures = [
    {
      title: "Proven Business Model",
      description:
        "Join a fast-growing restaurant concept with demonstrated success and operational excellence.",
      icon: <FaCheckCircle className="text-lightning-yellow-500" size={24} />,
    },
    {
      title: "Comprehensive Training",
      description:
        "Receive 40 hours of combined classroom and on-the-job training from experienced professionals.",
      icon: <FaGraduationCap className="text-lightning-yellow-500" size={24} />,
    },
    {
      title: "Marketing Support",
      description:
        "Access proven marketing strategies and materials to drive traffic to your location.",
      icon: <FaHandshake className="text-lightning-yellow-500" size={24} />,
    },
    {
      title: "Attractive ROI Potential",
      description:
        "Benefit from multiple revenue streams with a concept positioned in the growing fast-casual market.",
      icon: <FaMoneyBillWave className="text-lightning-yellow-500" size={24} />,
    },
  ];

  // Financial information table data
  const financialInfo = [
    { item: "Initial Franchise Fee", value: "$37,500" },
    { item: "Total Initial Investment", value: "$264,500 - $779,500" },
    { item: "Royalty Fee", value: "6% of Gross Sales" },
    { item: "Marketing Fee", value: "2% of Gross Sales" },
    { item: "Term of Agreement", value: "10 Years with Renewal Option" },
  ];

  return (
    <div className="bg-white">
      <Helmet>
        <title>Franchise Opportunities | Nash & Smashed</title>
        <meta
          name="description"
          content="Explore franchise opportunities with Nash & Smashed. Join our growing family of Nashville-style fried chicken and smashed burger restaurants."
        />
      </Helmet>

      {/* Hero Section */}
      <Hero />
      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="w-11/12 max-w-6xl px-4 mx-auto">
          <div className="text-center text-dark-olive-bark">
            <h2 className="mb-6 text-3xl font-bold american">
              Be Part of Our Growth
            </h2>
            <div className="mb-8 ">
              <p className="mb-4 text-lg font-bold open-sans">{introText}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Business Concept Section */}
      <BusinessConcept />

      {/* Franchise Video Section - Add this section */}
      <FranchiseVideo />

      {/* Franchise Features */}
      <FranchiseFeatures franchiseFeatures={franchiseFeatures} />

      {/* Training & Support */}
      <TrainingAndSupport trainingText={trainingText} />

      {/* FAQs Section */}
      <FranchiseFAQs />

      {/* Franchise Request Form */}
      <section id="franchise-form" className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="mb-10 text-center text-dark-olive-bark american">
              Take The Next Step
            </h2>
            <p className="mb-10 text-center american text-dark-olive-bark">
              Ready to explore the Nash & Smashed franchise opportunity?
              Complete the form below to receive detailed information about our
              franchise program and begin the conversation.
            </p>
            <FranchiseForm />
          </div>
        </div>
      </section>

      {/* Banner image section */}
      <div className="mt-16">
        <FullWidthBannerSection
          imagePath="/images/banner/nash-and-smashed-banner-4.jpg"
          altText="Nash & Smashed Franchise Opportunity"
          maxWidthClass="max-w-[1920px]"
        />
      </div>
    </div>
  );
};

export default FranchisePage;
