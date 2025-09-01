import { RouteObject } from "react-router-dom";
import HomePage from "@/core/Pages/Homepage/index";
import NotFoundPage from "@/error/NotFoundPage";
import LocationsPage from "@/core/Pages/Locations/index";
import CareersPage from "@/core/Pages/Careers/index";
import FranchisePage from "@/core/Pages/Franchise/index";
import ContactPage from "@/core/Pages/Contact/index";
import TermsOfServicesPage from "@/core/Pages/TermsOfServices/index";
import PrivacyPolicyPage from "@/core/Pages/PrivacyPolicy/index";
import CaloriesPage from "@/core/Pages/Calories/index";
import ChelmsfordLocation from "@/core/Pages/Locations/UnitedKingdom/Chelmsford";
import MediaLinksPage from "@/core/Pages/MediaLinks/index";
import FundraisingPage from "@/core/Pages/Fundraising/index";
// Blog imports
import AllBlogs from "@/core/Blogs/AllBlogs";
import BlogPage from "@/core/Blogs/Templates/LocalSEO/BlogPage";
import blogData from "@/core/Blogs/Templates/LocalSEO/database_content.json";
import { Blog } from "@/core/Blogs/Templates/LocalSEO/types";

// Type the imported blog data
const typedBlogData: Blog[] = blogData as unknown as Blog[];

// Generate blog routes dynamically
const blogRoutes: RouteObject[] = typedBlogData
  .filter((blog) => blog.url && blog.title) // Only include complete blog entries
  .map((blog) => ({
    path: `/${blog.url}`,
    element: <BlogPage />,
  }));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/locations",
    element: <LocationsPage />,
  },
  {
    path: "/franchise",
    element: <FranchisePage />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },
  {
    path: "/calories",
    element: <CaloriesPage />,
  },
  {
    path: "/careers",
    element: <CareersPage />,
  },
  {
    path: "/media",
    element: <MediaLinksPage />,
  },
  {
    path: "/fundraising",
    element: <FundraisingPage />,
  },
  {
    path: "/terms-of-service",
    element: <TermsOfServicesPage />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicyPage />,
  },
  {
    path: "/locations/uk/chelmsford",
    element: <ChelmsfordLocation />,
  },

  // Blog routes
  {
    path: "/blog",
    element: <AllBlogs />,
  },

  // Dynamic blog post routes
  ...blogRoutes,

  // Catch-all 404 route (should be last)
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

export default routes;
