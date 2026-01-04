/* eslint-disable no-unused-vars */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
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
import useRole from "../hooks/useRole";

const Dashboard = () => {
  useTitle("Dashboard");
  const { role } = useRole()
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();



  // Fetch courses (admin: all courses, instructor: their courses)
  const { data: courses = [] } = useQuery({
    queryKey: ["courses", role, user?.email],
    queryFn: async () => {
      if (role === "admin") {
        const res = await axiosSecure.get(`/course`);
        return Array.isArray(res.data) ? res.data : [];
      }
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/course?instructor=${user.email}`);
      return Array.isArray(res.data) ? res.data : [];
    },
    enabled: !!user?.email || role === "admin",
  });

  // Fetch enrollments (admin: all enrollments, instructor: their enrollments)
  const { data: enrollments = [] } = useQuery({
    queryKey: ["enrollments", role, user?.email],
    queryFn: async () => {
      if (role === "admin") {
        const res = await axiosSecure.get(`/enrollments`);
        return Array.isArray(res.data) ? res.data : [];
      }
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/enrollments?instructor=${user.email}`);
      return Array.isArray(res.data) ? res.data : [];
    },
    enabled: !!user?.email || role === "admin",
  });

  // Fetch user's enrolled courses (for regular users)
  const { data: userEnrolledCourses = [] } = useQuery({
    queryKey: ["userEnrolledCourses", user?.email],
    queryFn: async () => {
      if (!user?.email || role === "admin" || role === "instructor") return [];
      const res = await axiosSecure.get(`/enrollments?user=${user.email}`);
      const enrollments = res.data || [];
      const coursesData = await Promise.all(
        enrollments.map((enroll) =>
          axiosSecure.get(`/course/${enroll.courseId}`).then((r) => r.data)
        )
      );
      return coursesData;
    },
    enabled: !!user?.email && role === "user",
  });

  // Derive dynamic chart/table data from backend responses
  const getMonthKey = (date) => {
    try {
      const d = new Date(date);
      if (isNaN(d)) return "Unknown";
      return d.toLocaleString(undefined, { month: "short", year: "numeric" });
    } catch (err) {
      return "Unknown";
    }
  };

  const enrollmentCountsByMonth = (() => {
    const map = new Map();
    enrollments.forEach((en) => {
      const raw = en.createdAt ?? en.date ?? en.time ?? en.timestamp ?? en.addedAt;
      const key = getMonthKey(raw || en.updatedAt || Date.now());
      map.set(key, (map.get(key) || 0) + 1);
    });
    return Array.from(map.entries()).map(([month, enrollments]) => ({ month, enrollments }));
  })();

  const enrollmentData = enrollmentCountsByMonth.length
    ? enrollmentCountsByMonth
    : [
      { month: "Jan", enrollments: 0 },
      { month: "Feb", enrollments: 0 },
      { month: "Mar", enrollments: 0 },
      { month: "Apr", enrollments: 0 },
      { month: "May", enrollments: 0 },
      { month: "Jun", enrollments: 0 },
    ];

  const courseRatingsData = courses.map((c) => ({ name: c.title || "Untitled", rating: c.rating ?? c.avgRating ?? 0 })).slice(0, 8);

  const categoryData = (() => {
    const map = new Map();
    courses.forEach((c) => {
      const key = c.category || "Uncategorized";
      map.set(key, (map.get(key) || 0) + 1);
    });
    return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
  })();

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

      {(role === "admin" || role === "instructor") && (
        <>
          {/* Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-base-100 rounded-lg shadow p-6">
              <div className="text-sm text-gray-500">Total Courses</div>
              <div className="text-2xl font-bold">{courses.length}</div>
            </div>
            <div className="bg-base-100 rounded-lg shadow p-6">
              <div className="text-sm text-gray-500">Total Students</div>
              <div className="text-2xl font-bold">
                {
                  new Set(
                    enrollments.map(
                      (e) =>
                        e.studentEmail ??
                        e.userEmail ??
                        e.user?.email ??
                        e.email ??
                        e.student
                    )
                  ).size
                }
              </div>
            </div>
            <div className="bg-base-100 rounded-lg shadow p-6">
              <div className="text-sm text-gray-500">Total Revenue</div>
              <div className="text-2xl font-bold text-green-600">
                $
                {(() => {
                  const sum = enrollments.reduce((s, en) => {
                    const id =
                      en.courseId ??
                      en.course?._id ??
                      en.courseId?._id ??
                      en.courseId ??
                      en.course;
                    const course = courses.find(
                      (c) =>
                        c._id === id || c.id === id || c._id === en.course?._id
                    );
                    const price = course?.price ?? en.price ?? 0;
                    return s + (Number(price) || 0);
                  }, 0);
                  return sum.toFixed(2);
                })()}
              </div>
            </div>
            <div className="bg-base-100 rounded-lg shadow p-6">
              <div className="text-sm text-gray-500">Average Rating</div>
              <div className="text-2xl font-bold">
                {courses.length
                  ? (
                    courses.reduce(
                      (s, c) => s + (c.rating ?? c.avgRating ?? 0),
                      0
                    ) / courses.length
                  ).toFixed(2)
                  : "0.00"}
              </div>
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
                  <XAxis
                    dataKey="name"
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    interval={0}
                  />
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
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
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
                    $
                    {courses
                      .reduce(
                        (sum, c) => sum + c.price * (Math.random() * 50 + 10),
                        0
                      )
                      .toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="font-semibold">Average Course Price</span>
                  <span className="text-xl font-bold text-indigo-600">
                    $
                    {courses.length > 0
                      ? (
                        courses.reduce((sum, c) => sum + c.price, 0) /
                        courses.length
                      ).toFixed(2)
                      : "0.00"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total Enrollments</span>
                  <span className="text-xl font-bold text-blue-600">
                    {enrollments.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mb-6">
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
        </>
      )}

      {/* User Dashboard Section */}
      {role === "user" && (
        <>
          {/* User Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-base-100 rounded-lg shadow p-6">
              <div className="text-sm text-gray-500">Enrolled Courses</div>
              <div className="text-2xl font-bold">{userEnrolledCourses.length}</div>
            </div>
            <div className="bg-base-100 rounded-lg shadow p-6">
              <div className="text-sm text-gray-500">In Progress</div>
              <div className="text-2xl font-bold text-blue-600">
                {userEnrolledCourses.filter(c => !c.completed).length}
              </div>
            </div>
            <div className="bg-base-100 rounded-lg shadow p-6">
              <div className="text-sm text-gray-500">Completed</div>
              <div className="text-2xl font-bold text-green-600">
                {userEnrolledCourses.filter(c => c.completed).length}
              </div>
            </div>
            <div className="bg-base-100 rounded-lg shadow p-6">
              <div className="text-sm text-gray-500">Avg. Rating</div>
              <div className="text-2xl font-bold text-yellow-600">
                {userEnrolledCourses.length > 0
                  ? (
                    userEnrolledCourses.reduce(
                      (sum, c) => sum + (c.rating ?? c.avgRating ?? 0),
                      0
                    ) / userEnrolledCourses.length
                  ).toFixed(1)
                  : "0.0"}
                ⭐
              </div>
            </div>
          </div>

          {/* User Charts Section */}
          {userEnrolledCourses.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Enrollment Timeline */}
              <div className="bg-base-100 rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4">📅 My Enrollments Over Time</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={(() => {
                      const map = new Map();
                      userEnrolledCourses.forEach((course) => {
                        const date = course.enrolledAt || course.createdAt || new Date();
                        const key = getMonthKey(date);
                        map.set(key, (map.get(key) || 0) + 1);
                      });
                      return Array.from(map.entries()).map(([month, count]) => ({
                        month,
                        enrollments: count,
                      }));
                    })()}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="enrollments"
                      stroke="#10B981"
                      strokeWidth={2}
                      dot={{ fill: "#10B981", r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Course Categories Distribution */}
              <div className="bg-base-100 rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4">📚 My Courses by Category</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={(() => {
                        const map = new Map();
                        userEnrolledCourses.forEach((c) => {
                          const key = c.category || "Uncategorized";
                          map.set(key, (map.get(key) || 0) + 1);
                        });
                        return Array.from(map.entries()).map(([name, value]) => ({
                          name,
                          value,
                        }));
                      })()}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {userEnrolledCourses.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Course Ratings */}
              <div className="bg-base-100 rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4">⭐ My Course Ratings</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={userEnrolledCourses
                      .map((c) => ({
                        name: c.title?.substring(0, 20) || "Untitled",
                        rating: c.rating ?? c.avgRating ?? 0,
                      }))
                      .slice(0, 6)}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={100}
                      interval={0}
                    />
                    <YAxis domain={[0, 5]} />
                    <Tooltip />
                    <Bar dataKey="rating" fill="#F59E0B" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Learning Summary */}
              <div className="bg-base-100 rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4">📊 Learning Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="font-semibold">Total Courses</span>
                    <span className="text-2xl font-bold text-indigo-600">
                      {userEnrolledCourses.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="font-semibold">Total Investment</span>
                    <span className="text-xl font-bold text-green-600">
                      $
                      {userEnrolledCourses
                        .reduce((sum, c) => sum + (c.price || 0), 0)
                        .toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="font-semibold">Favorite Category</span>
                    <span className="text-lg font-bold text-blue-600">
                      {(() => {
                        const map = new Map();
                        userEnrolledCourses.forEach((c) => {
                          const key = c.category || "Uncategorized";
                          map.set(key, (map.get(key) || 0) + 1);
                        });
                        const sorted = Array.from(map.entries()).sort(
                          (a, b) => b[1] - a[1]
                        );
                        return sorted[0]?.[0] || "N/A";
                      })()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Completion Rate</span>
                    <span className="text-xl font-bold text-purple-600">
                      {userEnrolledCourses.length > 0
                        ? (
                          (userEnrolledCourses.filter((c) => c.completed).length /
                            userEnrolledCourses.length) *
                          100
                        ).toFixed(0)
                        : 0}
                      %
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Empty State for Users with No Enrollments */}
          {userEnrolledCourses.length === 0 && (
            <div className="bg-base-100 rounded-lg shadow-lg p-12 mb-6 text-center">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-2xl font-bold mb-2">Start Your Learning Journey!</h3>
              <p className="text-gray-600 mb-6">
                You haven't enrolled in any courses yet. Explore our catalog and find courses that interest you.
              </p>
              <button
                onClick={() => navigate("/all-course")}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition font-semibold"
              >
                Browse All Courses
              </button>
            </div>
          )}

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-4 mb-6">
            <button
              onClick={() => navigate("/all-course")}
              className="bg-base-200 text-base-content px-4 py-2 rounded hover:bg-base-300 transition font-medium"
            >
              Browse Courses
            </button>
            <button
              onClick={() => navigate("/dashboard/enrolled-course")}
              className="bg-base-200 text-base-content px-4 py-2 rounded hover:bg-base-300 transition font-medium"
            >
              My Enrolled Courses
            </button>
          </div>
        </>
      )}

      {/* Recent Courses Table */}
      <div className="bg-base-100 rounded shadow overflow-x-auto">
        <h3 className="text-center text-xl font-bold my-5">Recent Courses</h3>
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-base-300 bg-base-200">
              <th className="p-3 text-left text-base-content font-semibold">
                Title
              </th>
              <th className="p-3 text-left text-base-content font-semibold">
                Category
              </th>
              <th className="p-3 text-left text-base-content font-semibold">
                Price
              </th>
              <th className="p-3 text-left text-base-content font-semibold">
                Enrollments
              </th>
              <th className="p-3 text-left text-base-content font-semibold">
                Featured
              </th>
            </tr>
          </thead>
          <tbody>
            {courses.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center text-error font-semibold p-4"
                >
                  You Didn't Add Any Courses Yet
                </td>
              </tr>
            ) : (
              courses.map((c) => (
                <tr
                  key={c._id}
                  className="border-b border-base-300 hover:bg-base-200 transition"
                >
                  <td className="p-3">
                    <Link
                      to={`/course-details/${c._id}`}
                      className="text-indigo-600 hover:underline"
                    >
                      {c.title}
                    </Link>
                  </td>
                  <td className="p-3 text-base-content">{c.category}</td>
                  <td className="p-3 text-base-content">${c.price}</td>
                  <td className="p-3 text-base-content">
                    {(function () {
                      const id = c._id ?? c.id;
                      const count = enrollments.filter(
                        (en) =>
                          en.courseId === id ||
                          en.course?._id === id ||
                          en.course === id
                      ).length;
                      return count;
                    })()}
                  </td>
                  <td className="p-3 text-base-content">
                    {c.isFeatured ? "Yes" : "No"}
                  </td>
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
