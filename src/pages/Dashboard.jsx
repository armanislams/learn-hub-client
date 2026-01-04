import React from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useTitle from "../hooks/useTitle";
import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  useTitle("Dashboard");
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Fetch user profile data (experience, certifications, etc)
  const { data: profileData = {} } = useQuery({
    queryKey: ["userProfile", user?.email],
    queryFn: async () => {
      if (!user?.email) return {};
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Fetch instructor courses
  const { data: courses = [] } = useQuery({
    queryKey: ["instructorCourses", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/course?instructor=${user.email}`);
      return Array.isArray(res.data) ? res.data : [];
    },
    enabled: !!user?.email,
  });

  // Fetch enrollments
  const { data: enrollments = [] } = useQuery({
    queryKey: ["enrollments", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/enrollments?instructor=${user.email}`);
      return Array.isArray(res.data) ? res.data : [];
    },
    enabled: !!user?.email,
  });

  // Sample chart data
  const enrollmentData = [
    { month: "Jan", enrollments: 65 },
    { month: "Feb", enrollments: 78 },
    { month: "Mar", enrollments: 92 },
    { month: "Apr", enrollments: 81 },
    { month: "May", enrollments: 105 },
    { month: "Jun", enrollments: 118 },
  ];

  const courseRatingsData = [
    { name: courses[0]?.title || "Course 1", rating: 4.8 },
    { name: courses[1]?.title || "Course 2", rating: 4.5 },
    { name: courses[2]?.title || "Course 3", rating: 4.9 },
    { name: courses[3]?.title || "Course 4", rating: 4.6 },
  ];

  const categoryData = [
    { name: "Web Development", value: courses.filter(c => c.category === "Web Development").length },
    { name: "Mobile", value: courses.filter(c => c.category === "Mobile").length },
    { name: "Data Science", value: courses.filter(c => c.category === "Data Science").length },
    { name: "UI/UX", value: courses.filter(c => c.category === "UI/UX").length },
  ];

  const COLORS = ["#4F46E5", "#2563EB", "#10B981", "#F59E0B"];

  return (
    <div className="container mx-auto py-10">
      {/* Instructor Header */}
      <div className="bg-linear-to-r from-indigo-600 to-blue-600 text-white rounded-lg shadow-lg p-8 mb-6">
        <div className="flex items-center gap-6">
          <img
            src={user?.photoURL || "https://via.placeholder.com/120"}
            alt={user?.displayName}
            className="w-24 h-24 rounded-full border-4 border-white"
          />
          <div>
            <h1 className="text-4xl font-bold mb-2">{user?.displayName}</h1>
            <p className="text-indigo-100 text-lg">{user?.email}</p>
          </div>
        </div>
      </div>

      

      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-indigo-50 dark:bg-indigo-900 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-indigo-600">
            {profileData?.enrolledCourses || 0}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Enrolled Courses
          </p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">{courses.length}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">My Courses</p>
        </div>
        <div className="bg-green-50 dark:bg-green-900 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-green-600">
            {courses.filter((c) => c.isFeatured).length}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Featured Courses
          </p>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-purple-600">
            {profileData?.learningHours || 0}h
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Learning Hours
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Enrollment Trends */}
        <div className="bg-base-100 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">📈 Enrollment Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={enrollmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="enrollments"
                stroke="#4F46E5"
                strokeWidth={2}
                dot={{ fill: "#4F46E5", r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Course Ratings */}
        <div className="bg-base-100 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">⭐ Course Ratings</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={courseRatingsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} interval={0} />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Bar dataKey="rating" fill="#2563EB" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Course Distribution by Category */}
        <div className="bg-base-100 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">📊 Courses by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Overview */}
        <div className="bg-base-100 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">💰 Revenue Overview</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="font-semibold">Total Revenue</span>
              <span className="text-2xl font-bold text-green-600">
                ${courses.reduce((sum, c) => sum + (c.price * (Math.random() * 50 + 10)), 0).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="font-semibold">Average Course Price</span>
              <span className="text-xl font-bold text-indigo-600">
                ${courses.length > 0 ? (courses.reduce((sum, c) => sum + c.price, 0) / courses.length).toFixed(2) : "0.00"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total Enrollments</span>
              <span className="text-xl font-bold text-blue-600">{enrollments.length}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 mb-6">
        <button
          onClick={() => navigate("/add-course")}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition font-medium"
        >
          Add Course
        </button>
        <button
          onClick={() => navigate("/all-course")}
          className="bg-base-200 text-base-content px-4 py-2 rounded hover:bg-base-300 transition font-medium"
        >
          All Courses
        </button>
        <button
          onClick={() => navigate("/enrolled-course")}
          className="bg-base-200 text-base-content px-4 py-2 rounded hover:bg-base-300 transition font-medium"
        >
          Enrolled Courses
        </button>
      </div>

      {/* Recent Courses Table */}
      <div className="bg-base-100 rounded shadow overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-base-300 bg-base-200">
              <th className="p-3 text-left text-base-content font-semibold">Title</th>
              <th className="p-3 text-left text-base-content font-semibold">Category</th>
              <th className="p-3 text-left text-base-content font-semibold">Price</th>
              <th className="p-3 text-left text-base-content font-semibold">Featured</th>
            </tr>
          </thead>
          <tbody>
            {courses.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center text-error font-semibold p-4">
                  You Didn't Add Any Courses Yet
                </td>
              </tr>
            ) : (
              courses.map((c) => (
                <tr key={c._id} className="border-b border-base-300 hover:bg-base-200 transition">
                  <td className="p-3">
                    <Link to={`/course-details/${c._id}`} className="text-indigo-600 hover:underline">
                      {c.title}
                    </Link>
                  </td>
                  <td className="p-3 text-base-content">{c.category}</td>
                  <td className="p-3 text-base-content">${c.price}</td>
                  <td className="p-3 text-base-content">{c.isFeatured ? "Yes" : "No"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
