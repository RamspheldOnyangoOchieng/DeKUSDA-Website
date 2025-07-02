import React from "react";

export const Card = ({
  title,
  subtitle,
  children,
  className = "",
  ...props
}) => {
  return (
    <div
      className={`bg-gradient-to-br from-yellow-100 via-red-50 to-green-50 border-2 border-yellow-600 rounded-2xl shadow-xl p-6 max-w-md mx-auto ${className}`}
      {...props}
    >
      {title && (
        <h3 className="text-2xl font-extrabold text-transparent bg-gradient-to-r from-yellow-600 via-red-600 to-green-900 bg-clip-text mb-2">
          {title}
        </h3>
      )}
      {subtitle && (
        <h4 className="text-lg font-semibold text-green-900 mb-4">{subtitle}</h4>
      )}
      <div className="text-green-900">{children}</div>
    </div>
  );
};

export default Card;