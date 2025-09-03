// src/pages/Resources/TithesOfferings.jsx
import React from "react";
import { HeartHandshake } from "lucide-react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";

export default function TithesOfferings() {
  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-6 text-center border border-green-200">
          {/* Verse Section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-green-700 mb-2">
              "And my God will meet all your needs according to the riches of his glory in Christ Jesus."
            </h2>
            <p className="text-sm text-gray-600 italic">— Philippians 4:19</p>
            <p className="text-sm text-gray-700 mt-2">
              When we give generously, we are not losing something; we are simply putting our faith into action, trusting that God's supply will always exceed our needs.
            </p>
          </div>

          {/* Icon */}
          <div className="flex justify-center mb-4">
            <HeartHandshake className="w-12 h-12 text-green-600" />
          </div>

          {/* M-Pesa Giving Info */}
          <div className="space-y-2">
            <p className="text-lg font-bold text-gray-800">Church Tithes & Offerings</p>
            <div className="bg-green-100 rounded-xl p-3">
              <p className="text-sm text-gray-600">M-Pesa Number (use <span className="font-semibold">Send Money</span>):</p>
              <p className="text-2xl font-extrabold text-green-700">0748260864</p>
              <p className="text-sm text-gray-600"> Name:</p>
              <p className="text-lg font-semibold text-gray-800">Erick Ocharo</p>
            </div>
          </div>

          {/* Optional Note */}
          <div className="mt-6 text-xs text-gray-500">
            Thank you for your faithful giving that furthers God’s work 🙏
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
