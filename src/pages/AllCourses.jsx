import React, { useState } from "react";
import useAxios from "../hooks/UseAxios";
import CourseCard from "../components/Cards/CourseCard";
import useTitle from "../hooks/useTitle";
import { useQuery } from "@tanstack/react-query";
import CourseGridSkeleton from "../components/Loading Skeletons/CourseGridSkeleton";
import CategorySkeleton from "../components/Loading Skeletons/CategorySkeleton";

const AllCourses = () => {
  useTitle('All Course')
  const AxiosInstance = useAxios();
  const [category, setCategory] = useState(""); // selected category
  
  const {data = [], isLoading} = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const result = await AxiosInstance.get('/course')
      return result.data
    },
  })
  
  // Derive unique categories from course data
  const categories = data && data.length > 0 
    ? [...new Set(data.map((c) => c.category))]
    : [];

  
  // filtered courses based on selected category
  const filteredCourses = category
    ? data.filter((c) => c.category === category)
    : data;


  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="heading">All Courses</h1>

      {/* Category filter */}
      <div className="mb-6 flex flex-wrap gap-4">
        <button
          onClick={() => setCategory("")}
          className={`px-4 py-2 rounded-lg text-white font-semibold ${
            category === "" ? "bg-indigo-500 text-" : "bg-gray-600"
          }`}
        >
          All
        </button>
        {isLoading ? (
          <CategorySkeleton />
        ) : (
          categories.map((course) => (
            <button
              key={course}
              onClick={() => setCategory(course)}
              className={`px-4 py-2 rounded-lg text-white font-semibold ${
                category === course ? "bg-blue-500 " : "bg-gray-600"
              }`}
            >
              {course}
            </button>
          ))
        )}
      </div>

      {/* Courses grid */}
      {isLoading ? (
        <CourseGridSkeleton count={8} />
      ) : filteredCourses.length === 0 ? (
        <div className="grid md:grid-cols-4 gap-6">
          {data.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllCourses;
