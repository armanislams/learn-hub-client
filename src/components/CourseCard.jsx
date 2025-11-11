import { motion } from 'framer-motion';
import React from 'react';
import { Link } from 'react-router';

const CourseCard = ({ course }) => (
  <div>
    <motion.div
      key={course._id}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
    >
      <img src={course.imageUrl} alt={course.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
        <p className="text-gray-600 text-sm mb-3">{course.description}</p>
        <Link
          to={`/course-details/${course._id}`}
          className="bg-indigo-600 text-white py-2 w-full px-4 rounded-md flex justify-center items-center hover:bg-indigo-700 transition text-sm"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  </div>
);

export default CourseCard;
