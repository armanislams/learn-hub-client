import React, { use, useState } from "react";
import { AuthContext } from "../Provider/AuthContext";
import useAxios from "../hooks/UseAxios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import useTitle from "../hooks/useTitle";

const AddCourse = () => {
  useTitle('Add Course')
  const { user } = use(AuthContext)
  const AxiosInstance = useAxios()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: "",
    image: "",
    price: Number(""),
    duration: "",
    category: "",
    description: "",
    isFeatured: false,
    instructorName: user?.displayName || "",
    instructorEmail: user?.email || "",
    instructorPhoto: user?.photoURL || "",
  });

  const handleChange = (k, v) => setForm((prev) => ({ ...prev, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AxiosInstance.post("/create-course", form);
      toast.success("Course added!");
      navigate('/all-course')
      
      // clear or redirect
    } catch (err) {
      if (err.response && err.response.status === 409) {
        toast.warn("A course with this title already exists!");
      } else {
        toast.error("Failed to add course.");
      }
    }
  };



  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-base-content">Add Course Details</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-base-100 max-w-3xl mx-auto grid md:grid-cols-2 gap-6 p-6 rounded-lg shadow-lg"
      >
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-base-content mb-2">Title</label>
          <input
            placeholder="Enter course title"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="w-full px-4 py-2 border border-base-300 rounded-md bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-base-content mb-2">Image URL</label>
          <input
            placeholder="Enter image URL"
            value={form.image}
            onChange={(e) => handleChange("image", e.target.value)}
            className="w-full px-4 py-2 border border-base-300 rounded-md bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-base-content mb-2">Price</label>
          <input
            placeholder="Enter price"
            value={form.price}
            onChange={(e) => handleChange("price", e.target.value)}
            className="w-full px-4 py-2 border border-base-300 rounded-md bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-base-content mb-2">Duration</label>
          <input
            placeholder="e.g., 4 weeks, 20 hours"
            value={form.duration}
            onChange={(e) => handleChange("duration", e.target.value)}
            className="w-full px-4 py-2 border border-base-300 rounded-md bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-base-content mb-2">Category</label>
          <input
            type="text"
            placeholder="Enter category (e.g., Web Development, Design)"
            value={form.category}
            onChange={(e) => handleChange("category", e.target.value)}
            className="w-full px-4 py-2 border border-base-300 rounded-md bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-base-content mb-2">Description</label>
          <textarea
            placeholder="Write a detailed description about the course"
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="w-full px-4 py-2 border border-base-300 rounded-md bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[100px]"
          />
        </div>

        <div className="md:col-span-1 flex flex-col items-center gap-3 p-4 bg-base-200 rounded-md">
          <input
            type="checkbox"
            id="isFeatured"
            checked={form.isFeatured}
            onChange={(e) => handleChange("isFeatured", e.target.checked)}
            className="h-5 w-5 rounded border-2 border-base-300 text-indigo-600 accent-indigo-600 cursor-pointer"
          />
          <label htmlFor="isFeatured" className="text-base-content font-medium cursor-pointer select-none flex-1">
            Mark as Featured Course
          </label>
        </div>

        <button
          type="submit"
          className="md:col-span-1 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-200"
        >
          Add Course
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
