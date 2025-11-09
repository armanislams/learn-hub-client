// src/pages/AllCourses.jsx
import React, { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";
import useAxios from "../hooks/UseAxios";

const AllCourses = () => {
  const AxiosInstance = useAxios()
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const queries = category ? `?category=${encodeURIComponent(category)}` : "";
    setLoading(true);
    AxiosInstance.get("/course")
      .get(`/courses${queries}`)
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [category, AxiosInstance]);

  useEffect(() => {
    AxiosInstance.get("/course")
      .get("/courses/categories")
      .then((res) => setCategories(res.data || []))
      .catch(() => setCategories([]));
  }, [AxiosInstance]);

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">All Courses</h2>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {courses.map((c) => (
            <CourseCard key={c._id} course={c} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllCourses;
