import { motion } from "framer-motion";
import useAxios from "../hooks/UseAxios";
import { useState, useEffect, use } from "react";
import { Link } from "react-router";
import CourseCard from "../components/CourseCard";
import useTitle from "../hooks/useTitle";
import { AuthContext } from "../Provider/AuthContext";

const Home = () => {
  useTitle("Home");
  const [courses, setCourses] = useState([]);
  const { loading, setLoading } = use(AuthContext);
  const [error, setError] = useState(null);
  const AxiosInstance = useAxios();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await AxiosInstance.get("/course");
        const featuredCourses = response.data.filter((c) => c.isFeatured);
        setCourses(featuredCourses.slice(0, 6));
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError(error.message);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [AxiosInstance, setLoading]);
  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* ---------------- HERO SECTION ---------------- */}
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

      {/* ---------------- POPULAR COURSES ---------------- */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="w-full py-16 px-4 bg-base-200"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-base-content">
            Popular Courses
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-3 text-center py-10">
                <div className="text-2xl text-base-content">Loading courses...</div>
              </div>
            ) : error ? (
              <div className="col-span-3 text-center py-10">
                <div className="text-2xl text-error">Error: {error}</div>
              </div>
            ) : courses.length === 0 ? (
              <div className="col-span-3 text-center py-10">
                <div className="text-2xl text-base-content">
                  No courses available
                </div>
              </div>
            ) : (
              courses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))
            )}
          </div>
        </div>
      </motion.section>

      {/* ---------------- WHY CHOOSE US ---------------- */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="w-full py-16 px-4 bg-base-100"
      >
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-base-content">Why Choose Us</h2>
          <p className="text-base-content/70 mb-10 max-w-2xl mx-auto">
            Our platform provides an easy-to-use interface, expert instructors,
            and affordable courses for learners of all levels.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {["Expert Mentors", "Flexible Learning", "Global Community"].map(
              (item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="bg-indigo-50 dark:bg-indigo-900 p-6 rounded-xl shadow-sm hover:shadow-md transition"
                >
                  <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300 mb-2">
                    {item}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
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
        className="w-full bg-base-200 py-16 px-4"
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-base-content">
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
                className="bg-base-100 p-6 rounded-2xl shadow-md hover:shadow-xl transition"
              >
                <img
                  src={`https://i.pravatar.cc/150?img=${i + 10}`}
                  alt="Instructor"
                  className="w-24 h-24 mx-auto rounded-full mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold text-base-content">
                  Instructor {i + 1}
                </h3>
                <p className="text-base-content/60 text-sm">
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
