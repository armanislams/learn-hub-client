// src/pages/MyCourses.jsx
import React, { useEffect, useState } from "react";
import api from "../api/api";
import CourseCard from "../components/CourseCard";

const MyCourses = ({ user }) => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    if (!user?.email) return;
    api
      .get(`/courses?owner=${encodeURIComponent(user.email)}`)
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));
  }, [user]);

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-semibold mb-4">My Added Courses</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {courses.map((c) => (
          <CourseCard key={c._id} course={c} />
        ))}
      </div>
    </div>
  );
};

export default MyCourses;
