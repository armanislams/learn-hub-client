/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import {
  useParams,
  useNavigate,
  Link,
  useLocation,
  Navigate,
} from "react-router";
import useAxios from "../hooks/UseAxios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthContext";
import useTitle from "../hooks/useTitle";
import Loader from "../components/Common/Loader";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const CourseDetails = () => {
  useTitle("Course Details");
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const AxiosInstance = useAxios();
  const queryClient = useQueryClient();
  console.log(location);

  // Fetch course details
  const {
    data: course,
    isLoading: courseLoading,
    error: courseError,
  } = useQuery({
    queryKey: ["course", id],
    queryFn: async () => {
      const res = await AxiosInstance.get(`/course/${id}`);
      return res.data;
    },
    // { enabled: !!id }
  });

  // Fetch enrollment status for current user
  const { data: enrollmentData, isLoading: enrollmentLoading } = useQuery({
    queryKey: ["enrollment", id, user?.email],
    queryFn: async () => {
      if (!user?.email) return { enrolled: false };
      const res = await AxiosInstance.get(`/enrollments/${id}`, {
        params: { email: user.email },
      });
      return res.data;
    },
    // { enabled: !!user?.email && !!id }
  });

  const isEnrolled = Boolean(enrollmentData?.enrolled);

  // Mutation: enroll
  const enrollMutation = useMutation({
    mutationFn: async () => {
      return AxiosInstance.post("/enrollments", {
        courseId: id,
        email: user.email,
      });
    },

    onSuccess: (data) => {
      toast.success("Enrolled successfully!");
      queryClient.invalidateQueries(["enrollment", id, user?.email]);
    },
    onError: () => {
      toast.error("Failed to enroll.");
    },
  });

  // Mutation: delete course
  const deleteMutation = useMutation({
    mutationFn: async () => {
      return AxiosInstance.delete(`/course/${id}`);
    },
    onSuccess: () => {
      toast.success("Course deleted successfully!");
      queryClient.invalidateQueries(["courses"]);
      navigate("/all-course");
    },
    onError: () => {
      toast.error("Failed to delete course.");
    },
  });

  // Enroll button
  const handleEnroll = async () => {
    // if (!user) {
    //   <Navigate to={"/login"} state={location.pathname}></Navigate>;
    //   return
    // }
    if (!course?._id) {
      toast.info("Enrollment is disabled for this course.");
      return;
    }

    enrollMutation.mutate();
  };

  // Delete course
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the course.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      if (!course?._id) {
        toast.info("Cannot delete this course.");
        return;
      }

      deleteMutation.mutate();
    }
  };

  // Update course
  const handleUpdate = () => {
    navigate(`/update-course/${id}`);
  };
  //

  if (loading || courseLoading || enrollmentLoading) return <Loader />;
  if (courseError)
    return (
      <div className="container mx-auto py-10">Failed to load course.</div>
    );
  if (!course)
    return <div className="container mx-auto py-10">Course not found.</div>;

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Left side */}
        <div className="md:col-span-2 bg-base-100 p-6 rounded shadow">
          <div className="relative">
            <img
              src={course.image || course.imageUrl}
              alt={course.title}
              className="w-full h-64 object-cover rounded"
            />
            {course.isFeatured && (
              <span className="absolute top-3 left-3 bg-yellow-400 text-black px-3 py-1 rounded-full font-semibold">
                Featured
              </span>
            )}
          </div>

          <div className="mt-4 flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-base-content">
                {course.title}
              </h1>
              <p className="text-sm text-base-content/70 mt-1">
                by{" "}
                <span className="font-semibold">
                  {course.instructor || "Instructor"}
                </span>
              </p>
            </div>

            <div className="text-right">
              <div className="text-lg font-bold text-indigo-600">
                ${course.price}
              </div>
              <div className="text-sm text-base-content/70">
                {course.duration}
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="font-semibold">Rating:</div>
              <div className="text-yellow-400 font-bold">{course.rating} ★</div>
            </div>
            <div className="text-sm text-base-content/70">
              • {course.students} students
            </div>
            <div className="text-sm text-base-content/70">
              • {course.lessons} lessons
            </div>
            <div className="ml-auto text-sm px-2 py-1 bg-gray-100 rounded-full text-base-content">
              {course.level}
            </div>
          </div>

          <p className="text-base-content/70 mt-4">{course.description}</p>
        </div>

        {/* Right side */}
        <aside className="p-6 bg-base-100 rounded shadow mx-auto flex flex-col justify-center">
          <h2 className="text-lg font-semibold text-base-content">
            Course Details
          </h2>
          <div className="mt-3 text-base-content/80">
            <p>
              <strong>Duration:</strong> {course.duration}
            </p>
            <p className="mt-2">
              <strong>Category:</strong> {course.category}
            </p>
            <p className="mt-2">
              <strong>Level:</strong> {course.level}
            </p>
            <p className="mt-2">
              <strong>Instructor:</strong> {course.instructor}
            </p>
            <p className="mt-2">
              <strong>Lessons:</strong> {course.lessons}
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-6 space-y-3">
            {!user ? (
              <Link
                to={"/login"}
                state={location.pathname}
                className="w-full btn py-2 rounded transition text-white font-medium bg-indigo-600 hover:bg-indigo-700"
              >
                Login to Enroll
              </Link>
            ) : (
              <>
                <button
                  onClick={handleEnroll}
                  disabled={
                    isEnrolled || enrollMutation.isLoading || !course?._id
                  }
                  className={`w-full py-2 rounded transition text-white font-medium ${
                    !course?._id
                      ? "bg-gray-400 cursor-not-allowed"
                      : isEnrolled
                      ? "bg-green-500 cursor-not-allowed"
                      : enrollMutation.isLoading
                      ? "bg-indigo-400 cursor-wait"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
                >
                  {isEnrolled
                    ? "✓ Enrolled"
                    : enrollMutation.isLoading
                    ? "Enrolling..."
                    : "Enroll Now"}
                </button>

                <button
                  onClick={handleUpdate}
                  disabled={!course?._id}
                  className={`w-full text-white py-2 rounded transition font-medium ${
                    !course?._id
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-yellow-500 hover:bg-yellow-600"
                  }`}
                >
                  Edit Course
                </button>

                <button
                  onClick={handleDelete}
                  disabled={!course?._id}
                  className={`w-full text-white py-2 rounded transition font-medium ${
                    !course?._id
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  Delete Course
                </button>
              </>
            )}
          </div>
        </aside>
      </div>

      {/* Charts */}
      <div className="mt-10 grid md:grid-cols-2 gap-6">
        <div className="bg-base-100 rounded shadow p-4">
          <h3 className="text-lg font-semibold mb-3">
            Enrollment Trend (sample)
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart
              data={(() => {
                const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
                const total = Math.max(0, Number(course.students) || 0);
                const base = Math.max(5, Math.round(total / months.length));
                return months.map((m) => ({
                  month: m,
                  enrollments: Math.max(
                    0,
                    Math.round(base * (0.6 + Math.random() * 0.9))
                  ),
                }));
              })()}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="enrollments"
                stroke="#4F46E5"
                strokeWidth={2}
                dot
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-base-100 rounded shadow p-4">
          <h3 className="text-lg font-semibold mb-3">Course Composition</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={[
                  { name: "Students", value: Number(course.students) || 0 },
                  { name: "Lessons", value: Number(course.lessons) || 0 },
                ]}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                <Cell fill="#4F46E5" />
                <Cell fill="#10B981" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
