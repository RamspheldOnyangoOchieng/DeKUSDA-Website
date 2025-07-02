import React from "react";
import { Link } from "react-router-dom";

export const Sidebar = () => {
    return (
        <aside className="w-64 min-h-screen bg-gradient-to-b from-yellow-600 via-red-700 to-green-900 shadow-2xl flex flex-col p-6">
            <h2 className="text-2xl font-extrabold text-white mb-8 tracking-wide border-b-2 border-yellow-400 pb-2">
                Quick Links
            </h2>
            <nav className="flex flex-col space-y-4">
                <Link to="/" className="text-yellow-200 hover:text-yellow-400 font-semibold transition">Home</Link>
                <Link to="/Aboutdekusda" className="text-yellow-200 hover:text-yellow-400 font-semibold transition">About DeKUSDA</Link>
                <Link to="/Personalministries" className="text-yellow-200 hover:text-yellow-400 font-semibold transition">Personal Ministries</Link>
                <Link to="/PCM" className="text-yellow-200 hover:text-yellow-400 font-semibold transition">Public Campus Ministries</Link>
                <Link to="/Churchchoir" className="text-yellow-200 hover:text-yellow-400 font-semibold transition">Church Choir</Link>
                <Link to="/Announcements" className="text-yellow-200 hover:text-yellow-400 font-semibold transition">Announcements</Link>
            </nav>
            <div className="mt-12 bg-white bg-opacity-10 rounded-lg p-4 border-l-4 border-yellow-400 shadow-lg">
                <h3 className="text-lg font-bold text-yellow-300 mb-2">Announcement</h3>
                <p className="text-white">Join us for Sabbath worship every Saturday at 9:00 AM!</p>
            </div>
        </aside>
    );
};