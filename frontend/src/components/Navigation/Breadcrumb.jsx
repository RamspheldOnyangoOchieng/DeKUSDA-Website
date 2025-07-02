import React from "react";
import { Link, useLocation } from "react-router-dom";

const capitalize = (s) => s && s.charAt(0).toUpperCase() + s.slice(1);

export const Breadcrumb = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

    return (
        <nav className="flex items-center px-6 py-3 bg-gradient-to-r from-yellow-400 via-red-500 to-green-900 rounded shadow-lg mt-4 mb-6" aria-label="Breadcrumb">
            <Link to="/" className="text-yellow-900 font-bold hover:underline hover:text-yellow-600 transition">Home</Link>
            {pathnames.map((value, index) => {
                const to = `/${pathnames.slice(0, index + 1).join("/")}`;
                const isLast = index === pathnames.length - 1;
                return (
                    <span key={to} className="flex items-center">
                        <svg className="mx-2 w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M7.05 4.05a1 1 0 011.414 0l5.5 5.5a1 1 0 010 1.414l-5.5 5.5a1 1 0 01-1.414-1.414L11.086 11H3a1 1 0 110-2h8.086l-4.036-4.036a1 1 0 010-1.414z" />
                        </svg>
                        {isLast ? (
                            <span className="text-white font-semibold">{capitalize(value.replace(/-/g, " "))}</span>
                        ) : (
                            <Link to={to} className="text-yellow-100 hover:underline hover:text-yellow-400 transition">
                                {capitalize(value.replace(/-/g, " "))}
                            </Link>
                        )}
                    </span>
                );
            })}
        </nav>
    );
};

export default Breadcrumb;