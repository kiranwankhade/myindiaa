import React from "react";

const Alert = ({ type, message,onClose }) => {
  const alertClass = () => {
    switch (type) {
      case "success":
        return "bg-green-100 border-green-400 text-green-700";
      case "error":
        return "bg-red-100 border-red-400 text-red-700";
      case "warning":
        return "bg-yellow-100 border-yellow-400 text-yellow-700";
      default:
        return "bg-blue-100 border-blue-400 text-blue-700";
    }
  };

  return (
    <div className={`px-4 py-3 rounded-md mb-4 border ${alertClass()}`} onClick={onClose}>
      <div className="flex items-center">
        <div className="flex-shrink-0">
          {type === "success" && (
            <svg
              className="h-5 w-5 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.293 7.293a1 1 0 011.414-1.414L10 10.586l4.293-4.293a1 1 0 111.414 1.414L11.414 12l4.293 4.293a1 1 0 01-1.414 1.414L10 13.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 12 4.293 7.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          )}
          {type === "error" && (
            <svg
              className="h-5 w-5 text-red-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.707 5.293a1 1 0 011.414-1.414L10 8.586l2.879-2.88a1 1 0 111.414 1.414L11.414 10l2.88 2.879a1 1 0 01-1.414 1.414L10 11.414l-2.879 2.88a1 1 0 01-1.414-1.414L8.586 10 5.707 7.121a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          )}
          {type === "warning" && (
            <svg
              className="h-5 w-5 text-yellow-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM11 9a1 1 0 00-1-1H9a1 1 0 100 2h1a1 1 0 001-1zm0 4a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Alert;
