import React from "react";
import { useNavigate } from "react-router-dom";
import { FaShieldAlt, FaHome, FaArrowLeft, FaSignInAlt } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const Forbidden = () => {
    const navigate = useNavigate();
    const { user, logOut } = useAuth();

    const handleLogout = async () => {
        try {
            await logOut();
            navigate("/login");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 px-4">
            <div className="max-w-2xl w-full">
                {/* Main Card */}
                <div className="bg-base-100 rounded-2xl shadow-2xl p-8 md:p-12 text-center">
                    {/* Shield Icon with Animation */}
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <div className="absolute inset-0 bg-purple-500 opacity-20 rounded-full blur-xl animate-pulse"></div>
                            <div className="relative bg-purple-100 p-6 rounded-full">
                                <FaShieldAlt className="text-6xl text-purple-600" />
                            </div>
                        </div>
                    </div>

                    {/* Error Code */}
                    <h1 className="text-8xl font-bold text-purple-600 mb-4">401</h1>

                    {/* Title */}
                    <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-4">
                        Forbidden
                    </h2>

                    {/* Description */}
                    <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                        You don't have the necessary permissions to access this resource.
                        Please check your credentials or contact an administrator.
                    </p>

                    {/* User Info (if logged in) */}
                    {user && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                            <p className="text-sm text-gray-700">
                                Logged in as:{" "}
                                <span className="font-semibold text-blue-600">
                                    {user.email}
                                </span>
                            </p>
                        </div>
                    )}

                    {/* Possible Reasons */}
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-8 text-left">
                        <h3 className="font-semibold text-base-content mb-3 flex items-center gap-2">
                            <span className="text-purple-600">ℹ️</span>
                            Why am I seeing this?
                        </h3>
                        <ul className="space-y-2 text-gray-700">
                            <li className="flex items-start gap-2">
                                <span className="text-purple-500 mt-1">•</span>
                                <span>Your account doesn't have the required role</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-purple-500 mt-1">•</span>
                                <span>This feature is restricted to administrators or instructors</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-purple-500 mt-1">•</span>
                                <span>Your permissions may have been revoked</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-purple-500 mt-1">•</span>
                                <span>You may need to log in with a different account</span>
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
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
                        >
                            <FaHome />
                            Go to Home
                        </button>
                        {user && (
                            <button
                                onClick={handleLogout}
                                className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 font-semibold"
                            >
                                <FaSignInAlt />
                                Switch Account
                            </button>
                        )}
                    </div>

                    {/* Help Text */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <p className="text-sm text-gray-500">
                            Need access?{" "}
                            <button
                                onClick={() => navigate("/contact-us")}
                                className="text-purple-600 hover:text-purple-700 font-semibold underline"
                            >
                                Request Permissions
                            </button>
                        </p>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        If you believe you should have access, please contact your administrator
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Forbidden;
