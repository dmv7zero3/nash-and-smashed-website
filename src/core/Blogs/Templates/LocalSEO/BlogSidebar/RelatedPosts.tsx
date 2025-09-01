import React from "react";
import { Link } from "react-router-dom";

interface RelatedPost {
  title: string;
  url: string;
  location: string;
}

interface RelatedPostsProps {
  posts: RelatedPost[];
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ posts }) => {
  if (posts.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h3 className="mb-4 text-xl font-bold text-lightning-yellow cosmic-lager">
        Related Articles
      </h3>

      <ul className="space-y-4">
        {posts.map((post, index) => (
          <li
            key={index}
            className="pb-3 border-b border-white/10 last:border-0"
          >
            <Link
              to={`/${post.url}`}
              className="flex items-center p-2 -mx-2 transition-colors rounded-lg hover:bg-red-900/30 group"
            >
              <div className="w-12 h-12 mr-4 overflow-hidden bg-gray-800 rounded-md">
                <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-red-800 to-red-900 text-lightning-yellow">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h4 className="mb-1 text-sm font-medium text-white transition-colors group-hover:text-lightning-yellow">
                  {post.title}
                </h4>
                <p className="text-xs text-gray-400">{post.location}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <Link
        to="/blog"
        className="inline-flex items-center mt-4 text-sm font-medium transition-colors text-lightning-yellow hover:text-lightning-yellow-300"
      >
        View all articles
        <svg
          className="w-4 h-4 ml-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          ></path>
        </svg>
      </Link>
    </div>
  );
};

export default RelatedPosts;
