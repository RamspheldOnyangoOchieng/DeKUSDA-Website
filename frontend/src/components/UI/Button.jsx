import React from "react";

const base =
  "px-6 py-2 rounded-full font-bold shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

const variants = {
  primary:
    "bg-gradient-to-r from-yellow-400 via-red-500 to-green-900 text-white hover:from-yellow-500 hover:via-red-600 hover:to-green-800 focus:ring-yellow-400",
  secondary:
    "bg-white text-green-900 border-2 border-green-900 hover:bg-yellow-100 focus:ring-green-900",
  danger:
    "bg-red-700 text-white hover:bg-red-800 focus:ring-red-700",
};

export const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;