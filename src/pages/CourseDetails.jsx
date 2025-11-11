import React, { useState, useEffect, use } from "react";
import { useParams, useNavigate } from "react-router";
import useAxios from "../hooks/UseAxios";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthContext";
import useTitle from "../hooks/useTitle";

const CourseDetails = () => {
    useTitle('Course Details')
  const { user,loading, setLoading } = use(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const AxiosInstance = useAxios();

  const [course, setCourse] = useState(null);
  const [enrolling, setEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    const fetchCourseAndEnrollment = async () => {
      try {
        const courseRes = await AxiosInstance.get(`/course/${id}`);
        setCourse(courseRes.data);

        if (user?.email) {
          const enrollRes = await AxiosInstance.get(`/enrollments/${id}`, {
            params: { email: user.email },
          });
          setIsEnrolled(enrollRes.data.enrolled);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load course data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourseAndEnrollment();
  }, [AxiosInstance, id, user?.email,setLoading]);

  // Enroll button
  const handleEnroll = async () => {
    if (!user) return toast.error("Login to enroll.");

    setEnrolling(true);

    try {
      const res = await AxiosInstance.post("/enrollments", {
        courseId: id,
        email: user.email,
      });

      if (res.data.message === "Already Enrolled") {
        setIsEnrolled(true);
        toast.info("You are already enrolled in this course.");
      } else {
        setIsEnrolled(true);
        toast.success("Enrolled successfully!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to enroll.");
    } finally {
      setEnrolling(false);
    }
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
      try {
        await AxiosInstance.delete(`/course/${id}`);
        toast.success("Course deleted successfully!");
        navigate("/all-courses");
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete course.");
      }
    }
  };

  // Update course
  const handleUpdate = () => {
    navigate(`/update-course/${id}`);
  };

  if (loading) return <Loader />;
  if (!course) return <div className="text-center py-10 text-base-content">Course not found</div>;

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Left side */}
        <div className="md:col-span-2 bg-base-100 p-6 rounded shadow">
          <img
            src={course.image || course.imageUrl}
            alt={course.title}
            className="w-full h-64 object-cover rounded"
          />
          <h1 className="text-2xl font-bold mt-4 text-base-content">{course.title}</h1>
          <p className="text-base-content/70 mt-2">{course.description}</p>
        </div>

        {/* Right side */}
        <aside className="p-6 bg-base-100 rounded shadow mx-auto flex flex-col justify-center">
          <h1 className="text-xl font-bold mt-4 text-base-content">
            Duration: <br /> {course.duration}
          </h1>
          <h1 className="text-xl font-bold mt-4 text-base-content">
            Category: <br /> {course.category}
          </h1>
          <div className="font-semibold mt-5 text-base-content">Price: $ {course.price}</div>

          {/* Buttons */}
          <div className="mt-6 space-y-3">
            <button
              onClick={handleEnroll}
              disabled={isEnrolled || enrolling || !user}
              className={`w-full py-2 rounded transition text-white font-medium ${
                !user
                  ? "bg-gray-400 cursor-not-allowed"
                  : isEnrolled
                  ? "bg-green-500 cursor-not-allowed"
                  : enrolling
                  ? "bg-indigo-400 cursor-wait"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {!user
                ? "Login to Enroll"
                : isEnrolled
                ? "✓ Enrolled"
                : enrolling
                ? "Enrolling..."
                : "Enroll Now"}
            </button>

            <button
              onClick={handleUpdate}
              className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition font-medium"
            >
              Edit Course
            </button>

            <button
              onClick={handleDelete}
              className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition font-medium"
            >
              Delete Course
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CourseDetails;
