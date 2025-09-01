import React, { useRef, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import blogData from "./database_content.json";
import { Blog } from "./types";
import BlogMeta from "./BlogMeta";
import BlogHeader from "./BlogHeader";
import BlogContent from "./BlogContent";
import BlogSidebar from "./BlogSidebar";
import TagsSection from "./TagsSection";
import SocialShare from "./SocialShare";
import Hero from "./Hero";
import GoogleMapsDirection from "./GoogleMapsDirection";

// Type the imported data
const typedBlogData: Blog[] = blogData as unknown as Blog[];

const BlogPage: React.FC = () => {
  const location = useLocation();
  const contentRef = useRef<HTMLDivElement>(null);
  const [otherBlogs, setOtherBlogs] = useState<Blog[]>([]);

  // Extract the URL path without /blog/ prefix
  const urlPath = location.pathname.replace(/^\/(?:blog\/)?/, "");
  console.log("Looking for blog with URL:", urlPath);

  // Find the blog with matching URL
  const blog = typedBlogData.find((b) => b.url === urlPath);

  // For debugging, log all available URLs
  if (!blog) {
    console.log(
      "Available URLs:",
      typedBlogData.map((b) => b.url)
    );
    return <Navigate to="/blog" replace />;
  }

  // Parse location for SEO
  const locationParts = blog.location
    ? blog.location.split(",").map((part) => part.trim())
    : [];
  const city = blog.city || locationParts[0] || "";
  const state = blog.state || locationParts[1] || "";

  // Find other blogs
  useEffect(() => {
    const others = typedBlogData.filter((b) => b.url !== urlPath);
    setOtherBlogs(others);
  }, [urlPath]);

  // Add reading progress bar
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const progressBar = document.createElement("div");
    progressBar.className = "fixed top-0 left-0 z-50 h-1 bg-lightning-yellow";
    progressBar.style.width = "0%";
    document.body.appendChild(progressBar);

    const updateProgress = () => {
      const totalHeight = content.scrollHeight;
      const viewportHeight = window.innerHeight;
      const scrollTop = window.scrollY;
      const scrolled = (scrollTop / (totalHeight - viewportHeight)) * 100;
      progressBar.style.width = `${Math.min(scrolled, 100)}%`;
    };

    window.addEventListener("scroll", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      document.body.removeChild(progressBar);
    };
  }, []);

  return (
    <div ref={contentRef} className="min-h-screen bg-black">
      <BlogMeta
        title={blog.title}
        metaDescription={blog.metaDescription}
        keyword={blog.keyword || ""}
        location={blog.location || ""}
        url={blog.url}
      />

      <Hero title={blog.title} metaDescription={blog.metaDescription} />

      <article className="container px-4 py-12 mx-auto">
        <BlogHeader
          title={blog.title}
          location={blog.location}
          keyword={blog.keyword}
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <BlogContent
              introParagraph={blog.introParagraph}
              middleParagraph={blog.middleParagraph}
              conclusionParagraph={blog.conclusionParagraph}
              city={city}
            />

            <TagsSection
              subject={blog.keyword || "Nashville Hot Chicken"}
              city={city}
              state={state}
            />

            <SocialShare
              url={`https://nashandsmashed.com/${blog.url}`}
              title={blog.title}
            />

            {blog.location_status === "operational" && (
              <GoogleMapsDirection
                subject={blog.keyword || "Nashville Hot Chicken"}
                city={city}
                state={state}
              />
            )}
          </div>

          <div className="lg:col-span-4">
            <BlogSidebar currentBlog={blog} otherBlogs={otherBlogs} />
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPage;
