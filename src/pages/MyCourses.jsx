import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthContext";
import CourseCard from "../components/Cards/CourseCard";
import useTitle from "../hooks/useTitle";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/Common/Loader";

const MyCourses = () => {
  useTitle("My Courses");
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data = [], isLoading, isError } = useQuery({
    queryKey: ["myCourses", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/course");
      return Array.isArray(res.data)
        ? res.data.filter((course) => course.instructorEmail === user?.email)
        : [];
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <Loader />;
  if (isError) return <p>Failed to load your courses.</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="heading text-center">My Added Courses</h1>

      {data.length === 0 ? (
        <p className="text-center">You haven't added any courses yet.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {data.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;
