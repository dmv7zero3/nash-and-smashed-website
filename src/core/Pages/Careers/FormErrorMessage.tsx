import React from "react";
import { FaExclamationTriangle, FaRedo } from "react-icons/fa";

interface FormErrorMessageProps {
  error: string;
  onRetry?: () => void;
  className?: string;
}

const FormErrorMessage: React.FC<FormErrorMessageProps> = ({
  error,
  onRetry,
  className = "",
}) => {
  return (
    <div
      className={`flex items-start p-4 text-red-700 bg-red-100 border-l-4 border-red-500 rounded-lg ${className}`}
    >
      <FaExclamationTriangle
        className="flex-shrink-0 mt-1 mr-3 text-red-500"
        size={20}
      />
      <div className="flex-1">
        <p className="font-bold text-red-800">
          There was a problem submitting your application
        </p>
        <p className="mb-3 text-red-700">{error}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-700 transition-colors bg-red-200 border border-red-300 rounded-md hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            <FaRedo className="mr-2" size={12} />
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default FormErrorMessage;
