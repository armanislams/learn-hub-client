
import React, { useState } from "react";
import { useParams } from "react-router";
import useAxios from "../hooks/UseAxios";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const CourseDetails = () => {
    const AxiosInstance = useAxios()
    const {id} = useParams()

    
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

    AxiosInstance.get(`/course/${id}`)
        .then(data => {
            setCourse(data.data)
            setLoading(false)
    })

  const enroll = async () => {
    try {
      // backend handles enrolling user by token
      await AxiosInstance.post(`/enrollments`, { courseId: id });
      toast.success("Enrolled successfully!");
    } catch (err) {
        toast.error("Enrollment failed.");
        console.log(err);
        
    }
  };

  if (loading) return <Loader></Loader>
  if (!course) return <div>Course not found</div>;

  return (
    <div className="container mx-auto py-10">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white p-6 rounded shadow">
          <img
            src={course.imageUrl}
            alt={course.title}
            className="w-full h-64 object-cover rounded"
          />
          <h1 className="text-2xl font-bold mt-4">{course.title}</h1>
          <p className="text-gray-600 mt-2">{course.description}</p>
        </div>
        <aside className="p-6 bg-white rounded shadow mx-auto flex flex-col justify-center">
          <h1 className="text-xl font-bold mt-4">
            Course Duration: <br />{course.duration}
          </h1>
          <h1 className="text-xl font-bold mt-4">Course Category: <br />{course.category}</h1>
          <div className="font-semibold mt-5">Price: $ {course.price}</div>
          <div className="mt-4">
            <button
              onClick={enroll}
              className="w-full bg-indigo-600 text-white py-2 rounded"
            >
              Enroll now
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CourseDetails;
