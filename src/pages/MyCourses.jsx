import React, { useState, useEffect, use } from "react";
import useAxios from "../hooks/UseAxios";
import { AuthContext } from "../Provider/AuthContext";
import CourseCard from "../components/CourseCard";
import useTitle from "../hooks/useTitle";

const MyCourses = () => {
  useTitle('My Courses')
  const [courses, setCourses] = useState([]);
  const { user, loading, setLoading } = use(AuthContext);
  const AxiosInstance = useAxios()

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const res = await AxiosInstance.get("/course");
        const myCourses = res.data.filter(
          (course) => course.instructorEmail === user.email
        );
        setCourses(myCourses);
      } catch (err) {
        console.error("Failed to load your courses:");
      } finally {
        setLoading(false);
      }
    };

    fetchMyCourses();
  }, [user?.email, AxiosInstance, setLoading]);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="heading">My Added Courses</h1>

      {loading ? (
        <p>Loading your courses...</p>
      ) : courses.length === 0 ? (
        <p>You haven't added any courses yet.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;
