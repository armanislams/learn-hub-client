import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthContext";
import useTitle from "../hooks/useTitle";
import { Link } from "react-router";
import Loader from "../components/Common/Loader";
import CourseCard from "../components/Cards/CourseCard";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import CourseGridSkeleton from "../components/Loading Skeletons/CourseGridSkeleton";

const EnrolledCourses = () => {
  useTitle("Enrolled Courses");
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);

  const {
    data: enrolledCourses = [],
    isLoading: enrolledLoading,
    error,
  } = useQuery({
    queryKey: ["enrolledCourses", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      // fetch enrollments then fetch course details for each enrollment
      const res = await axiosSecure.get(`/enrollments?user=${user.email}`);
      const enrollments = res.data || [];
      const coursesData = await Promise.all(
        enrollments.map((enroll) =>
          axiosSecure.get(`/course/${enroll.courseId}`).then((r) => r.data)
        )
      );
      return coursesData;
    },
    enabled: !!user?.email,
  });

  const isBusy = loading || enrolledLoading;

  return (
    <div className="container mx-auto py-10">
      <h2 className="heading mb-6">My Enrolled Courses</h2>

      {isBusy ? (
        <CourseGridSkeleton count={4} />
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-lg text-red-500">Failed to load enrolled courses.</p>
        </div>
      ) : enrolledCourses.length === 0 ? (
        <div className="flex flex-col justify-center items-center gap-6">
          <h3 className="text-2xl font-semibold">You have not enrolled in any courses yet.</h3>
          <p className="text-gray-600">Explore our catalog and enroll in courses you like.</p>
          <Link to={"/all-course"}>
            <button className="btn btn-indigo">Browse All Courses</button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {enrolledCourses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
