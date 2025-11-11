// src/pages/EnrolledCourses.jsx
import React, { use, useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";
import useAxios from "../hooks/UseAxios";
import { AuthContext } from "../Provider/AuthContext";
import Loader from "../components/Loader";

const EnrolledCourses = () => {
  const AxiosInstance = useAxios();
  const { user, loading } = use(AuthContext);
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
      }
    };

    if (user?.email) fetchEnrolledCourses();
  }, [AxiosInstance, user?.email]);

  return (
    <div className="container mx-auto py-10">
      <h2 className="heading">My Enrolled Courses</h2>

      {loading ? (
        <Loader />
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
