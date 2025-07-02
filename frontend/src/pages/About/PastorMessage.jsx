import React from "react";
import { Link } from "react-router-dom";

const PastorMessage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 bg-white rounded-lg shadow-lg">
                <h1 className="mb-4 text-2xl font-bold">Pastor's Message</h1>
                <p className="mb-4 text-lg">
                    Welcome to the Dekusda page! Here, you can find a collection of beautiful hymns sung by our talented choir members.
                </p>
                <p className="mb-4 text-lg">
                    We are excited to share our music with you and hope it brings you joy and inspiration.
                </p>
                <p className="mb-4 text-lg">
                    Thank you for visiting our page, and we look forward to sharing more with you soon!
                </p>
            </div>
        </div>
    );
};

export default PastorMessage;