import React from 'react';

const CourseCard = () => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition">
    <img
      src="https://source.unsplash.com/400x250/?education,course"
      alt="Course"
      className="w-full h-48 object-cover"
    />
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">React for Beginners</h3>
      <p className="text-gray-600 text-sm mb-4">
        Learn the basics of React.js and build modern web apps.
      </p>
      <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
        View Details
      </button>
    </div>
  </div>
);

export default CourseCard;
