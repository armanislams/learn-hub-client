// // src/pages/CourseDetails.jsx
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { toast } from "react-hot-toast";

// const CourseDetails = ({ user }) => {
//   const { id } = useParams();
//   const [course, setCourse] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {

//       .get(`/courses/${id}`)
//       .then((res) => setCourse(res.data))
//       .catch((err) => console.error(err))
//       .finally(() => setLoading(false));
//   }, [id]);

//   const enroll = async () => {
//     try {
//       // backend handles enrolling user by token
//       await api.post(`/enrollments`, { courseId: id });
//       toast.success("Enrolled successfully!");
//     } catch (err) {
//       toast.error("Enrollment failed.");
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (!course) return <div>Course not found</div>;

//   return (
//     <div className="container mx-auto py-10">
//       <div className="grid md:grid-cols-3 gap-6">
//         <div className="md:col-span-2 bg-white p-6 rounded shadow">
//           <img
//             src={course.imageUrl}
//             alt={course.title}
//             className="w-full h-64 object-cover rounded"
//           />
//           <h1 className="text-2xl font-bold mt-4">{course.title}</h1>
//           <p className="text-gray-600 mt-2">{course.description}</p>
//         </div>
//         <aside className="p-6 bg-white rounded shadow">
//           <div className="font-semibold">Price: RM {course.price}</div>
//           <div className="mt-4">
//             <button
//               onClick={enroll}
//               className="w-full bg-indigo-600 text-white py-2 rounded"
//             >
//               Enroll now
//             </button>
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// };

// export default CourseDetails;
