import React from "react";

interface TagsSectionProps {
  subject: string;
  city: string;
  state: string;
}

const TagsSection: React.FC<TagsSectionProps> = ({ subject, city, state }) => {
  return (
    <div className="flex flex-wrap gap-2 mt-8 mb-4">
      <span className="mr-2 text-sm text-white/70">Topics:</span>
      <span className="px-3 py-1 text-xs font-medium text-red-200 rounded-full bg-red-900/80">
        {subject}
      </span>
      <span className="px-3 py-1 text-xs font-medium rounded-full bg-lightning-yellow-900/80 text-lightning-yellow-200">
        {city}
      </span>
      <span className="px-3 py-1 text-xs font-medium text-gray-200 rounded-full bg-gray-700/80">
        {state}
      </span>
    </div>
  );
};

export default TagsSection;
