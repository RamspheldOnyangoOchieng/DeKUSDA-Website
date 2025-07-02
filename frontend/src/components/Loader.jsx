import React from "react";

export const Loader = ({ text = "Loading..." }) => (
  <div className="flex flex-col items-center justify-center min-h-[150px]">
    <svg
      className="animate-spin h-16 w-16 text-yellow-500"
      viewBox="0 0 50 50"
    >
      <circle
        className="opacity-20"
        cx="25"
        cy="25"
        r="20"
        stroke="url(#loader-gradient)"
        strokeWidth="6"
        fill="none"
      />
      <circle
        className="opacity-90"
        cx="25"
        cy="25"
        r="20"
        stroke="url(#loader-gradient)"
        strokeWidth="6"
        strokeDasharray="90"
        strokeDashoffset="30"
        fill="none"
      />
      <defs>
        <linearGradient id="loader-gradient" x1="0" y1="0" x2="50" y2="50" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFD700" /> {/* Gold */}
          <stop offset="0.5" stopColor="#B22222" /> {/* Red */}
          <stop offset="1" stopColor="#014421" /> {/* Dark Green */}
        </linearGradient>
      </defs>
    </svg>
    <span className="mt-4 text-lg font-bold text-transparent bg-gradient-to-r from-yellow-600 via-red-600 to-green-900 bg-clip-text">
      {text}
    </span>
  </div>
);

export default Loader;