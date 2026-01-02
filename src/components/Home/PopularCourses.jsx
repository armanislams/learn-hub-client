import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxios from "../../hooks/UseAxios";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import CourseGridSkeleton from "../Loading Skeletons/CourseGridSkeleton";
import CourseCard from "../Cards/CourseCard";


const PopularCourses = () => {
  const axiosInstance = useAxios();
  const {data: courses, isLoading, error} = useQuery({
    queryKey: ["course"],
    queryFn: async () => {
        const result = await axiosInstance.get("/course");
        const course = result.data.filter((c) => c.isFeatured === true);
        return course
      },
  });
    
  return (
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {isLoading ? (
              <div className="col-span-4 text-center py-10">
                <CourseGridSkeleton count={8}/>
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
    
  );
};

export default PopularCourses;
