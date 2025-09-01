import React, { useState } from "react";
import { FAQItem } from "./types";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
}

const FAQAccordion: React.FC<FAQAccordionProps> = ({
  items,
  className = "",
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item, index) => (
        <div
          key={index}
          className="overflow-hidden bg-white rounded-lg shadow-sm"
        >
          <button
            className="flex items-center justify-between w-full px-4 py-5 text-left transition-colors focus:outline-none"
            onClick={() => toggleItem(index)}
          >
            <span className="text-xl font-medium halyard-micro-bold text-secondary">
              {item.question}
            </span>
            <span className="text-primary">
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </span>
          </button>
          <div
            className={`px-4 overflow-hidden transition-all duration-300 ease-in-out ${
              openIndex === index ? "max-h-96 pb-6" : "max-h-0"
            }`}
          >
            <p className="text-gray-700 space-mono">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;
