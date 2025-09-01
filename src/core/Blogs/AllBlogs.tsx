import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import blogData from "./Templates/LocalSEO/database_content.json";
import { Blog } from "./Templates/LocalSEO/types";

// Explicitly type the blogData import
const typedBlogData: Blog[] = blogData as Blog[];

const AllBlogs: React.FC = () => {
  const [blogs] = useState<Blog[]>(typedBlogData);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>(typedBlogData);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const blogsPerPage = 100;

  useEffect(() => {
    const filtered = blogs.filter(
      (blog) =>
        blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.keyword?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBlogs(filtered);
    setCurrentPage(1); // Reset to first page on search
  }, [searchTerm, blogs]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const capitalizeWords = (str: string) =>
    str.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
    );

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  return (
    <>
      <Helmet>
        <title>All Blogs | Nash & Smashed Restaurant</title>
        <meta
          name="description"
          content="Browse all our blog posts on products, industry news, and more."
        />
      </Helmet>

      <section className="pt-8 pb-16">
        <div className="container px-4 mx-auto">
          <h1 className="mb-6 text-6xl font-bold cosmic-lager text-bronzetone">
            Our Blog
          </h1>

          <div className="mb-8">
            <input
              type="text"
              placeholder="Search blogs by title, location or product..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 font-semibold tracking-wide border rounded-lg md:w-1/2 text-bronzetone"
            />
          </div>

          <p className="mb-4 text-lg text-bronzetone open-sans">
            Showing {currentBlogs.length} of {filteredBlogs.length} posts
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {currentBlogs.map((blog) => (
              <div
                key={blog.id}
                className="overflow-hidden transition-shadow border rounded-lg shadow-sm hover:shadow-md"
              >
                <div className="p-5 transition-shadow bg-white rounded-lg shadow-sm hover:shadow-md">
                  <h2 className="mb-2 text-xl font-semibold capitalize text-bronzetone line-clamp-2">
                    {blog.title}
                  </h2>
                  <p className="mb-4 text-gray-700 line-clamp-3">
                    {blog.metaDescription}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center text-sm text-gray-600">
                      <svg
                        className="w-4 h-4 mr-1 text-red-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {blog.location &&
                        blog.state &&
                        (() => {
                          // Remove state from location if present, uppercase city, and format as "CITY, STATE"
                          const state = blog.state.trim().toUpperCase();
                          let city = blog.location.trim();
                          // Remove trailing state from city if present (case-insensitive)
                          const regex = new RegExp(`\\s*${state}$`, "i");
                          city = city.replace(regex, "");
                          return `${capitalizeWords(city)}, ${state}`;
                        })()}
                    </span>
                    <Link
                      to={`/${blog.url}`}
                      className="flex items-center font-medium text-red-700 transition-colors hover:text-red-900"
                    >
                      Read More
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <nav aria-label="Page navigation">
                <ul className="flex space-x-1">
                  {/* Previous Button */}
                  <li>
                    <button
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1}
                      className={`px-3 py-1 rounded border ${
                        currentPage === 1
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      &laquo;
                    </button>
                  </li>

                  {/* Page Numbers - Show limited amount of page numbers */}
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    // Calculate page numbers to display around current page
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    return (
                      <li key={pageNum}>
                        <button
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-3 py-1 rounded border ${
                            currentPage === pageNum
                              ? "bg-primary text-white"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          {pageNum}
                        </button>
                      </li>
                    );
                  })}

                  {/* Next Button */}
                  <li>
                    <button
                      onClick={() =>
                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1 rounded border ${
                        currentPage === totalPages
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      &raquo;
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default AllBlogs;
