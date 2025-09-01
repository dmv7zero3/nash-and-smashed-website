import React from "react";
import { FaChevronRight } from "react-icons/fa";

interface ArrowButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  alignRight?: boolean;
}

const ArrowButton: React.FC<ArrowButtonProps> = ({
  children,
  onClick,
  className = "",
  icon = <FaChevronRight className="w-4 h-4 ml-2" />,
  type = "button",
  disabled = false,
  alignRight = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center px-5 py-2 font-bold text-white transition-colors bg-lightning-yellow-500 rounded-md hover:bg-lightning-yellow-600 focus:outline-none focus:ring-2 focus:ring-lightning-yellow-300 ${
        alignRight ? "md:ml-auto" : ""
      } ${disabled ? "opacity-60 cursor-not-allowed" : ""} ${className}`}
    >
      <span>{children}</span>
      {icon}
    </button>
  );
};

export default ArrowButton;
