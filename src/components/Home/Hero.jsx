import React from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router';


const Hero = () => {
    return (
      <motion.section
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full bg-indigo-600 py-20 text-center"
      >
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-white">
            Learn Without Limits 🚀
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90 text-white">
            Explore courses, gain skills, and achieve your dreams — all in one
            platform.
          </p>
          <Link
            to={"/all-course"}
            className="bg-white text-indigo-600 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition"
          >
            Explore Courses
          </Link>
        </div>
      </motion.section>
    );
};

export default Hero;