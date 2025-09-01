import React from "react";
import BlogBreadcrumbs from "./BlogBreadcrumbs";

interface BlogHeaderProps {
  title: string;
  location?: string;
  keyword?: string;
}

const BlogHeader: React.FC<BlogHeaderProps> = ({
  title,
  location,
  keyword,
}) => {
  return (
    <header className="flex flex-col items-center mb-8" id="content">
      <BlogBreadcrumbs title={title} subject={keyword || "Food"} />

      <div className="flex items-center mb-3 text-sm text-lightning-yellow">
        <span className="flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          {location}
        </span>
        {keyword && (
          <>
            <span className="mx-2">•</span>
            <span>{keyword}</span>
          </>
        )}
      </div>

      <h1 className="mb-1.5 text-3xl font-bold text-center capitalize text-lightning-yellow cosmic-lager">
        {title}
      </h1>
    </header>
  );
};

export default BlogHeader;
