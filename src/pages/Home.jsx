"use client";
import { motion } from "framer-motion";
import useAxios from "../hooks/UseAxios";
import { useState } from "react";
import { Link } from "react-router";

const Home = () => {
    const [course, setCourse] = useState([])
    const AxiosInstance = useAxios()
    AxiosInstance.get('/course')
        .then(data => {
            setCourse(data.data)
    })
  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* ---------------- HERO SECTION ---------------- */}
      <motion.section
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full bg-indigo-600 text-white py-20 text-center"
      >
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            Learn Without Limits 🚀
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Explore courses, gain skills, and achieve your dreams — all in one
            platform.
          </p>
          <button className="bg-white text-indigo-600 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition">
            Explore Courses
          </button>
        </div>
      </motion.section>

      {/* ---------------- POPULAR COURSES ---------------- */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="w-full py-16 px-4 bg-gray-50"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
            Popular Courses
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {course.map((c) => (
              <motion.div
                key={c._id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: c * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
              >
                <img
                  src={c.image}
                  alt="Course"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{c.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{c.description}</p>
                  <Link
                    to={`/course-details/${_id}`}
                    className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition text-sm"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ---------------- WHY CHOOSE US ---------------- */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="w-full py-16 px-4"
      >
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose Us</h2>
          <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
            Our platform provides an easy-to-use interface, expert instructors,
            and affordable courses for learners of all levels.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {["Expert Mentors", "Flexible Learning", "Global Community"].map(
              (item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="bg-indigo-50 p-6 rounded-xl shadow-sm hover:shadow-md transition"
                >
                  <h3 className="text-lg font-semibold text-indigo-700 mb-2">
                    {item}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Learn from the best with resources that fit your schedule.
                  </p>
                </motion.div>
              )
            )}
          </div>
        </div>
      </motion.section>

      {/* ---------------- TOP INSTRUCTORS ---------------- */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="w-full bg-gray-100 py-16 px-4"
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">
            Top Instructors
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition"
              >
                <img
                  src={`https://i.pravatar.cc/150?img=${i + 10}`}
                  alt="Instructor"
                  className="w-24 h-24 mx-auto rounded-full mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  Instructor {i + 1}
                </h3>
                <p className="text-gray-500 text-sm">
                  Expert in Web Development
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
