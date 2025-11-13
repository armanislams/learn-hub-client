// src/pages/EnrolledCourses.jsx
import React, { use, useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";
import useAxios from "../hooks/UseAxios";
import { AuthContext } from "../Provider/AuthContext";
import Loader from "../components/Loader";
import useTitle from "../hooks/useTitle";
import { Link } from "react-router";

const EnrolledCourses = () => {
  useTitle('Enrolled Courses')
  const AxiosInstance = useAxios();
  const { user, loading,setLoading } = use(AuthContext);
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const email = user.email;
        const res = await AxiosInstance.get(`/enrollments?user=${email}`);
        const enrollments = res.data;
        const coursesData = await Promise.all(
          enrollments.map((enroll) =>
            AxiosInstance.get(`/course/${enroll.courseId}`).then(
              (res) => res.data
            )
          )
        );

        setCourses(coursesData);
        
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEnrolledCourses();
  }, [AxiosInstance, user?.email,setLoading]);

  return (
    <div className="container mx-auto py-10">
      <h2 className="heading">My Enrolled Courses</h2>

      {loading ? (
        <Loader />
      ) : courses.length === 0 ? (
        <div className="flex flex-col justify-center items-center">
          <h1 className="heading">
            You May Not Enrolled to any Courses Yet. Check Out Our Courses or refresh again.
          </h1>
          <Link to={"/all-course"}>
            <button className="bg-indigo-600 text-base-content px-4 py-2 rounded-lg hover:bg-indigo-700">
              All Courses
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {courses.map((course, i) => (
            <CourseCard key={course._id + i} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
