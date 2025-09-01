import React from "react";
import Blockquote from "./Blockquote";
import BlogGallery from "./BlogGallery";

interface BlogContentProps {
  introParagraph: string;
  middleParagraph: string;
  conclusionParagraph: string;
  city: string;
}

const BlogContent: React.FC<BlogContentProps> = ({
  introParagraph,
  middleParagraph,
  conclusionParagraph,
  city,
}) => {
  const formatParagraphs = (text: string) => {
    return text.split("\n").map((paragraph, idx) =>
      paragraph ? (
        <p key={idx} className="mb-4 text-white/90 open-sans">
          {paragraph}
        </p>
      ) : null
    );
  };

  return (
    <div className="leading-loose prose text-white max-w-none">
      {/* Intro paragraphs */}
      <div className="mb-6">{formatParagraphs(introParagraph)}</div>

      {/* Blockquote after intro section */}
      <Blockquote city={city} />

      {/* Gallery after blockquote */}
      <BlogGallery />

      {/* Middle paragraphs */}
      <div className="mb-6">{formatParagraphs(middleParagraph)}</div>

      {/* Conclusion paragraphs */}
      <div className="mb-6">{formatParagraphs(conclusionParagraph)}</div>
    </div>
  );
};

export default BlogContent;
