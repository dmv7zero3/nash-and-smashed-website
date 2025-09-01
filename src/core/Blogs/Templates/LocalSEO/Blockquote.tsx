import React from "react";

interface BlockquoteProps {
  city: string;
  quote?: string;
}

const Blockquote: React.FC<BlockquoteProps> = ({
  city,
  quote = "Our goal is to provide our customers with the most authentic Nashville Hot Chicken and delicious smashed burgers in",
}) => {
  return (
    <blockquote className="p-5 my-8 border-l-4 bg-gray-900/50 border-lightning-yellow">
      <p className="text-xl italic text-white cosmic-lager">
        "{quote} {city}."
      </p>
      <footer className="mt-3 text-sm text-lightning-yellow">
        ~ Chef John, Nash & Smashed
      </footer>
    </blockquote>
  );
};

export default Blockquote;
