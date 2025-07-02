import React from "react";

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const getPages = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <nav className="flex justify-center items-center my-8">
            <ul className="inline-flex items-center space-x-1">
                <li>
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-3 py-2 rounded-l-lg font-bold transition ${
                            currentPage === 1
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                : "bg-green-900 text-yellow-300 hover:bg-yellow-600 hover:text-green-900"
                        }`}
                    >
                        Prev
                    </button>
                </li>
                {getPages().map((page) => (
                    <li key={page}>
                        <button
                            onClick={() => onPageChange(page)}
                            className={`px-3 py-2 font-bold transition ${
                                page === currentPage
                                    ? "bg-gradient-to-r from-yellow-400 via-red-500 to-green-900 text-white shadow"
                                    : "bg-white text-green-900 hover:bg-yellow-100"
                            }`}
                        >
                            {page}
                        </button>
                    </li>
                ))}
                <li>
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-2 rounded-r-lg font-bold transition ${
                            currentPage === totalPages
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                : "bg-green-900 text-yellow-300 hover:bg-yellow-600 hover:text-green-900"
                        }`}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;