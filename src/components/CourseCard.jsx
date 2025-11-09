import { motion } from 'framer-motion';
import { div } from 'framer-motion/client';
import React from 'react';
import { Link } from 'react-router';

const CourseCard = ({ c }) => (
  <div>
    <motion.div
      key={c._id}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: c * 0.1 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
    >
      <img src={c.image} alt="Course" className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{c.title}</h3>
        <p className="text-gray-600 text-sm mb-3">{c.description}</p>
        <Link
          to={`/course-details/${c._id}`}
          className="bg-indigo-600 text-white py-2 w-full px-4 rounded-md hover:bg-indigo-700 transition text-sm"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  </div>
);

export default CourseCard;
