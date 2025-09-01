import React from "react";
import AuthorCard from "./AuthorCard";
import BlogNewsletter from "./BlogNewsletter";
import RelatedPosts from "./RelatedPosts";
import CTASection from "./CTA";
import { Blog } from "../types";

interface RelatedPost {
  title: string;
  url: string;
  location: string;
}

interface BlogSidebarProps {
  currentBlog: Blog;
  otherBlogs: Blog[];
}

const BlogSidebar: React.FC<BlogSidebarProps> = ({
  currentBlog,
  otherBlogs,
}) => {
  // Find related posts based on similar location or keyword
  const relatedPosts: RelatedPost[] = otherBlogs
    .filter(
      (blog) =>
        (blog.location === currentBlog.location ||
          blog.keyword === currentBlog.keyword) &&
        blog.url !== currentBlog.url
    )
    .slice(0, 4)
    .map((blog) => ({
      title: blog.title,
      url: blog.url,
      location: blog.location || "",
    }));

  return (
    <aside className="w-full lg:w-[340px] lg:min-w-[340px] xl:w-[380px] xl:min-w-[380px] space-y-8">
      <div className="p-6 rounded-lg shadow-md bg-gray-900/50 backdrop-blur">
        <AuthorCard />
        <BlogNewsletter />
        <CTASection />
        <RelatedPosts posts={relatedPosts} />
      </div>
    </aside>
  );
};

export default BlogSidebar;
