import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import useAxios from "../hooks/UseAxios";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthContext";

const CourseDetails = () => {
    const { user } = useContext(AuthContext);
    const [isEnrolled, setIsEnrolled] = useState(false)
    console.log(isEnrolled);
    
  const AxiosInstance = useAxios();
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch course data once
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await AxiosInstance.get(`/course/${id}`);
        setCourse(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load course.");
      } 
    };
    fetchCourse();
  }, [AxiosInstance, id]);

  // ✅ Enroll function (includes user email)
  const enroll = async () => {
      try {
        await AxiosInstance.post(`/enrollments`, {
          courseId: id,
          email: user.email, // ✅ send email with enrollment
        });
        toast.success("Enrolled successfully!");
      } catch (err) {
        toast.error("Enrollment failed.");
        console.error(err);
    } finally {
        window.location.reload();
      }
    };
     useEffect(() => {

       const checkEnrollment = async () => {
         try {
           const res = await AxiosInstance.get("/enrollments/check", {
             params: { courseId: id, email: user.email },
           });
           setIsEnrolled(res.data.enrolled);
         } catch (err) {
           console.error("Failed to check enrollment", err);
         }
       };

       checkEnrollment();
     }, [AxiosInstance, id, user?.email]);

  // ✅ Delete function (with confirmation)
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
        await Swal.fire("Deleted!", "Course has been deleted.", "success");
        toast.success("Course deleted successfully!");
        navigate("/my-courses");
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete course.");
      }
    }
  };

  // ✅ Navigate to Update Page
  const handleUpdate = () => {
    navigate(`/update-course/${id}`);
  };

  if (loading) return <Loader />;
  if (!course) return <div>Course not found</div>;

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="grid md:grid-cols-3 gap-6">
        {/* --- Left side (course info) --- */}
        <div className="md:col-span-2 bg-white p-6 rounded shadow">
          <img
            src={course.imageUrl}
            alt={course.title}
            className="w-full h-64 object-cover rounded"
          />
          <h1 className="text-2xl font-bold mt-4">{course.title}</h1>
          <p className="text-gray-600 mt-2">{course.description}</p>
        </div>

        {/* --- Right side (sidebar) --- */}
        <aside className="p-6 bg-white rounded shadow mx-auto flex flex-col justify-center">
          <h1 className="text-xl font-bold mt-4">
            Course Duration: <br /> {course.duration}
          </h1>
          <h1 className="text-xl font-bold mt-4">
            Course Category: <br /> {course.category}
          </h1>
          <div className="font-semibold mt-5">Price: $ {course.price}</div>

          {/* --- Buttons --- */}
          <div className="mt-6 space-y-3">
            <button
              onClick={enroll}
              disabled={isEnrolled}
              className={`w-full py-2 rounded transition ${
                isEnrolled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}
            >
              {isEnrolled ? "Enrolled" : "Enroll Now"}
            </button>

            <button
              onClick={handleUpdate}
              className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition"
            >
              Edit Course
            </button>

            <button
              onClick={handleDelete}
              className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
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
