import React, { use, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthContext";
import useAxios from "../hooks/UseAxios";
import Loader from "../components/Loader";
import useTitle from "../hooks/useTitle";

const Dashboard = () => {
    useTitle('Dashboard')
  const { user, loading, setLoading } = use(AuthContext);
  const AxiosInstance = useAxios();
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [totalEnrollments, setTotalEnrollments] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const coursesRes = await AxiosInstance.get(
          `/course?instructor=${user.email}`
        );
        setCourses(coursesRes.data);

        const enrollmentsRes = await AxiosInstance.get(
          `/enrollments?instructor=${user.email}`
        );
        setTotalEnrollments(enrollmentsRes.data.length);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [AxiosInstance, user.email, setLoading]);

  if (loading) {
    return <Loader></Loader>
  }

  return (
    <div className="container mx-auto py-10">
      {/* Instructor Info */}
      <div className="flex items-center gap-4 mb-6 p-4 bg-base-100 rounded-lg shadow">
        <img
          src={user.photoURL}
          alt={user.displayName}
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h2 className="text-xl font-semibold text-base-content">{user.displayName}</h2>
          <p className="text-base-content/70">{user.email}</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-base-100 p-4 rounded shadow hover:shadow-md transition">
          <h3 className="text-base-content/70 text-sm font-medium">My Courses</h3>
          <p className="text-3xl font-bold text-base-content mt-2">{courses.length}</p>
        </div>
        <div className="bg-base-100 p-4 rounded shadow hover:shadow-md transition">
          <h3 className="text-base-content/70 text-sm font-medium">Featured Courses</h3>
          <p className="text-3xl font-bold text-base-content mt-2">
            {courses.filter((c) => c.isFeatured).length}
          </p>
        </div>
        <div className="bg-base-100 p-4 rounded shadow hover:shadow-md transition">
          <h3 className="text-base-content/70 text-sm font-medium">Total Enrollments</h3>
          <p className="text-3xl font-bold text-base-content mt-2">{totalEnrollments}</p>
        </div>
      </div>

      {/* Quick Actions */}
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
