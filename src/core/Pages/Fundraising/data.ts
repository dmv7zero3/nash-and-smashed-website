export interface FundraisingStep {
  id: number;
  title: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
  iconSrc?: string;
}

export interface FundraisingFAQ {
  id: number;
  question: string;
  answer: string;
}

export interface EligibilityCriterion {
  id: number;
  title: string;
  description: string;
  eligibleTypes: string[];
  nonEligibleTypes: string[];
}

export const fundraisingSteps: FundraisingStep[] = [
  {
    id: 1,
    title: "Apply",
    description:
      "Simply select the location and an available date to get the process started.",
    ctaText: "Find a Nash & Smashed",
    ctaLink: "/locations",
    iconSrc: "/icons/apply-icon.svg",
  },
  {
    id: 2,
    title: "Promote",
    description:
      "Receive custom flyers and a web page for your fundraiser to share with your supporters.",
    ctaText: "Get Started",
    ctaLink: "#fundraising-form",
    iconSrc: "/icons/promote-icon.svg",
  },
  {
    id: 3,
    title: "Get Paid",
    description:
      "After you've held your fundraiser, receive a donation check in the mail.",
    iconSrc: "/icons/payment-icon.svg",
  },
];

export const fundraisingCategories = [
  {
    id: 1,
    title: "Schools",
    description: "Raise funds for chess teams, field trips, and STEAM dreams.",
  },
  {
    id: 2,
    title: "Teams",
    description: "Tennis rackets, tournaments, and trophies - oh my!",
  },
  {
    id: 3,
    title: "Arts + Music",
    description:
      "Whatever the medium, Nash & Smashed fundraisers feed creativity.",
  },
  {
    id: 4,
    title: "Community",
    description:
      "We <3 partnering with our local communities for causes near and dear.",
  },
  {
    id: 5,
    title: "Non-profit",
    description:
      "Humane societies. Food security. Sustainability and recycling. We're here for it.",
  },
  {
    id: 6,
    title: "More...",
    description:
      "Check our eligibility list to see if your organization, class, or club is a good fit!",
  },
];

export const frequentlyAskedQuestions: FundraisingFAQ[] = [
  {
    id: 1,
    question: "How does the fundraising program work?",
    answer:
      "Nash & Smashed offers a 20% giveback on all qualifying sales during your fundraiser. Supporters can participate both online and in-store by mentioning your fundraiser. After your event, we calculate the donation amount and mail a check to your organization.",
  },
  {
    id: 2,
    question: "How much money can we raise?",
    answer:
      "The amount you can raise depends on your promotion efforts and number of supporters. Use our calculator to estimate potential earnings. On average, organizations raise between $150-$500 per fundraiser.",
  },
  {
    id: 3,
    question: "How long does it take to receive approval?",
    answer:
      "Applications are typically reviewed within 7 business days. Once approved, you'll receive confirmation via email with your unique fundraising page and promotional materials.",
  },
  {
    id: 4,
    question: "What organizations qualify for fundraisers?",
    answer:
      "We partner with K-12 schools, PTAs/PTOs, college student organizations, youth sports teams, and registered non-profit organizations with valid tax ID numbers. See our eligibility criteria for complete details.",
  },
  {
    id: 5,
    question: "When will we receive our donation?",
    answer:
      "Donation checks are processed within 3-4 weeks after your fundraiser date and sent via mail to the address provided in your application.",
  },
];

export const eligibilityCriteria: EligibilityCriterion = {
  id: 1,
  title: "Eligibility Criteria",
  description:
    "Nash & Smashed partners with many different types of organizations for fundraisers. To host a fundraiser, applying organizations must meet our eligibility criteria.",
  eligibleTypes: [
    "K-12 schools and related organizations (PTAs/PTOs, field trips, prom, graduation)",
    "College and University Groups (student organizations, Greek Life, intramural sports)",
    "Youth Sports Teams",
    "Non-Profit organizations / 501(c)(3) organizations",
  ],
  nonEligibleTypes: [
    "Organizations that are not eligible to receive tax-deductible contributions",
    "Organizations that do not have a United States federal tax ID number (other than United States public schools and districts)",
    "Organizations that discriminate against a person or a group on the basis of age, race, religion (creed), ethnicity, national origin, gender, gender identity, sexual orientation, disability, or political affiliation",
  ],
};
