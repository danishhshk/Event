import React from "react";

export default function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`bg-black text-white px-4 py-2 rounded-md font-medium hover:bg-gray-800 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
