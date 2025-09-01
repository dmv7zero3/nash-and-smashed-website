import React from "react";
import { Link } from "react-router-dom";

interface BlogBreadcrumbsProps {
  title: string;
  subject: string;
}

const BlogBreadcrumbs: React.FC<BlogBreadcrumbsProps> = ({
  title,
  subject,
}) => {
  return (
    <nav className="mb-8 text-sm" aria-label="Breadcrumb">
      <ol
        className="flex flex-wrap items-center text-lightning-yellow/90"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        <li
          className="flex items-center"
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <Link
            to="/"
            className="transition-colors hover:text-white open-sans"
            itemProp="item"
          >
            <span itemProp="name">Home</span>
          </Link>
          <svg
            className="w-4 h-4 mx-2 text-white/50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
          <meta itemProp="position" content="1" />
        </li>
        <li
          className="flex items-center"
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <Link
            to="/blog"
            className="transition-colors hover:text-white open-sans"
            itemProp="item"
          >
            <span itemProp="name">Blog</span>
          </Link>
          <svg
            className="w-4 h-4 mx-2 text-white/50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
          <meta itemProp="position" content="2" />
        </li>
        <li
          className="text-white truncate max-w-[180px] md:max-w-xs open-sans"
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <span itemProp="name">{title}</span>
          <meta itemProp="position" content="3" />
        </li>
      </ol>
    </nav>
  );
};

export default BlogBreadcrumbs;
