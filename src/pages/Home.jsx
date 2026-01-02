import useTitle from "../hooks/useTitle";
import Hero from "../components/Home/Hero";
import PopularCourses from "../components/Home/PopularCourses";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Features from "../components/Home/Features";
import FaqCta from "../components/Home/FaqCta";


const Home = () => {
  useTitle("Home");
  return (
    <div className="max-w-7xl mx-auto">
      {/* ---------------- HERO SECTION ---------------- */}
      <Hero />

      {/* ---------------- POPULAR COURSES ---------------- */}
      <PopularCourses />

      {/* ---------------- WHY CHOOSE US ---------------- */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="w-full py-16 px-4 bg-base-100"
      >
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-base-content">
            Why Choose Us
          </h2>
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
      {/* ---------------- Features ---------------- */}
      <Features />

      {/* ---------------- FAQ CTA SECTION ---------------- */}
      <FaqCta />
    </div>
  );
};

export default Home;
