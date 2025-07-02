import React from "react";
import { Link } from "react-router-dom";

const Leaders2024 = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-yellow-400 via-red-500 to-green-900">
            <h1 className="mb-4 text-4xl font-bold text-white">Leaders 2024</h1>
            <p className="mb-8 text-lg text-white">Welcome to the Leaders 2024 page! Here, you can find a collection of beautiful hymns sung by our talented choir members.</p>
            <Link to="/DCM" className="px-4 py-2 text-black transition duration-300 bg-white rounded shadow hover:bg-gray-200">DCM</Link>
        </div>
    );
};

export default Leaders2024;