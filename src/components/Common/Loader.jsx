import React from 'react';
import { FaGraduationCap, FaSpinner } from "react-icons/fa";

const Loader = () => {
    return (
        <div className='min-h-screen w-full flex flex-col justify-center items-center bg-base-100'>
            <div className="relative flex justify-center items-center">
                {/* Outer spinning ring */}
                <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-indigo-600"></div>

                {/* Inner icon */}
                <div className="relative z-10 p-4 bg-white dark:bg-gray-800 rounded-full shadow-lg">
                    <FaGraduationCap className="text-4xl text-indigo-600 animate-bounce" />
                </div>
            </div>

            <div className="mt-8 text-center space-y-2">
                <h1 className='text-3xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent animate-pulse'>
                    LearnHub
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium tracking-wider">
                    PREPARING YOUR CLASSROOM...
                </p>
            </div>
        </div>
    );
};

export default Loader;