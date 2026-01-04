import React from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaHome, FaArrowLeft } from "react-icons/fa";

const Unauthorized = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 px-4">
            <div className="max-w-2xl w-full">
                {/* Main Card */}
                <div className="bg-base-100 rounded-2xl shadow-2xl p-8 md:p-12 text-center">
                    {/* Lock Icon with Animation */}
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <div className="absolute inset-0 bg-red-500 opacity-20 rounded-full blur-xl animate-pulse"></div>
                            <div className="relative bg-red-100 p-6 rounded-full">
                                <FaLock className="text-6xl text-red-600" />
                            </div>
                        </div>
                    </div>

                    {/* Error Code */}
                    <h1 className="text-8xl font-bold text-red-600 mb-4">403</h1>

                    {/* Title */}
                    <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-4">
                        Access Denied
                    </h2>

                    {/* Description */}
                    <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                        Sorry, you don't have permission to access this page. This area is
                        restricted to authorized users only.
                    </p>

                    {/* Possible Reasons */}
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8 text-left">
                        <h3 className="font-semibold text-base-content mb-3 flex items-center gap-2">
                            <span className="text-red-600">⚠️</span>
                            Possible reasons:
                        </h3>
                        <ul className="space-y-2 text-gray-700">
                            <li className="flex items-start gap-2">
                                <span className="text-red-500 mt-1">•</span>
                                <span>You don't have the required role or permissions</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-red-500 mt-1">•</span>
                                <span>Your session may have expired</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-red-500 mt-1">•</span>
                                <span>This page is restricted to administrators or instructors</span>
                            </li>
                        </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-base-200 text-base-content rounded-lg hover:bg-base-300 transition-all duration-200 font-semibold"
                        >
                            <FaArrowLeft />
                            Go Back
                        </button>
                        <button
                            onClick={() => navigate("/")}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
                        >
                            <FaHome />
                            Go to Home
                        </button>
                    </div>

                    {/* Help Text */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <p className="text-sm text-gray-500">
                            Need help?{" "}
                            <button
                                onClick={() => navigate("/contact")}
                                className="text-indigo-600 hover:text-indigo-700 font-semibold underline"
                            >
                                Contact Support
                            </button>
                        </p>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        If you believe this is an error, please contact your administrator
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Unauthorized;
