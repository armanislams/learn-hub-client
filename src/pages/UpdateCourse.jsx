import React, { use, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxios from "../hooks/UseAxios";
import { toast } from "react-toastify";

const UpdateCourse = () => {
    const { id } = useParams();
  const AxiosInstance = useAxios();
  const navigate = useNavigate();

  const [course, setCourse] = useState({
    title: "",
    image: "",
    price: "",
    duration: "",
    category: "",
    description: "",
  });
  const [saving, setSaving] = useState(false);

  // Fetch course data when component mounts
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
  

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle update submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    try {
      await AxiosInstance.patch(`/course/${id}`, course);
      toast.success("Course updated successfully!");
      navigate(`/course-details/${id}`); // redirect back to details
    } catch (err) {
      console.error(err);
      toast.error("Failed to update course.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <h1 className="text-2xl font-bold text-center mb-6 text-white">
        Update Course Details
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg space-y-5"
      >
        {/* --- Title --- */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Course Title
          </label>
          <input
            type="text"
            name="title"
            value={course.title}
            onChange={handleChange}
            placeholder="Enter course title"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* --- Image URL --- */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image URL
          </label>
          <input
            type="text"
            name="imageUrl"
            value={course.imageUrl}
            onChange={handleChange}
            placeholder="Enter image URL"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* --- Price & Duration --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price ($)
            </label>
            <input
              type="number"
              name="price"
              value={course.price}
              onChange={handleChange}
              placeholder="Enter course price"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration
            </label>
            <input
              type="text"
              name="duration"
              value={course.duration}
              onChange={handleChange}
              placeholder="e.g., 4 weeks, 20 hours"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* --- Category --- */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            name="category"
            value={course.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select Category</option>
            <option value="Web Development">Web Development</option>
            <option value="Design">Design</option>
            <option value="Data Science">Data Science</option>
            <option value="Marketing">Marketing</option>
            <option value="Business">Business</option>
          </select>
        </div>

        {/* --- Description --- */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={course.description}
            onChange={handleChange}
            placeholder="Write a short description..."
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[100px]"
          />
        </div>

        {/* --- Buttons --- */}
        <div className="flex justify-between items-center mt-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-400 text-white px-5 py-2 rounded hover:bg-gray-500 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className={`${
              saving ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
            } text-white px-6 py-2 rounded transition`}
          >
            {saving ? "Updating..." : "Update Course"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateCourse;
