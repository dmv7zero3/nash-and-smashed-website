//src/core/ui/SearchBar/index.tsx

import React from "react";

interface SearchBarProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="w-full mx-auto mb-8 font-semibold text-black ">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search blogs..."
        className="w-full p-3 border rounded-md shadow-sm border-sossOrange focus:outline-none focus:ring-2 focus:ring-sossOrange"
      />
    </div>
  );
};

export default SearchBar;
