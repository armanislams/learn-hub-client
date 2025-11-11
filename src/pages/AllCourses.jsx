import React, { useState, useEffect, use } from "react";
import useAxios from "../hooks/UseAxios";
import CourseCard from "../components/CourseCard";
import useTitle from "../hooks/useTitle";
import { AuthContext } from "../Provider/AuthContext";

const AllCourses = () => {
  useTitle('All Course')
  const AxiosInstance = useAxios();
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(""); // selected category
  const {loading, setLoading} = use(AuthContext);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const res = await AxiosInstance.get("/course"); // fetch all courses
        setCourses(res.data);

        // derive unique categories from course data
        const uniqueCategories = [...new Set(res.data.map((c) => c.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Failed to load courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [AxiosInstance]);

  // filtered courses based on selected category
  const filteredCourses = category
    ? courses.filter((c) => c.category === category)
    : courses;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="heading">All Courses</h1>

      {/* Category filter */}
      <div className="mb-6 flex gap-4">
        <button
          onClick={() => setCategory("")}
          className={`px-4 py-2 rounded ${
            category === "" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          All
        </button>
        {categories.map((course) => (
          <button
            key={course}
            onClick={() => setCategory(course)}
            className={`px-4 py-2 rounded ${
              category === course ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {course}
          </button>
        ))}
      </div>

      {/* Courses grid */}
      {loading ? (
        <p>Loading courses...</p>
      ) : filteredCourses.length === 0 ? (
        <div className="grid md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllCourses;
