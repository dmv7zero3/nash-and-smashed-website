import React from "react";

interface SearchBarProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search media articles...",
}) => {
  return (
    <div className="w-full mx-auto mb-8">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-3 transition-colors border rounded-md shadow-sm border-lightning-yellow-500 focus:outline-none focus:ring-2 focus:ring-lightning-yellow-300"
        aria-label="Search media articles"
      />
    </div>
  );
};

export default SearchBar;
