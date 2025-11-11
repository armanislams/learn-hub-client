import React, { use, useState } from "react";
import { AuthContext } from "../Provider/AuthContext";
import useAxios from "../hooks/UseAxios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const AddCourse = () => {
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
    <div className="container mx-auto py-10 rounded-2xl ">
      <h1 className="heading">Add Course Details</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white grid md:grid-cols-2 gap-6 p-6 rounded shadow"
      >
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
          required
        />
        <input
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => handleChange("image", e.target.value)}
          required
        />
        <input
          placeholder="Price"
          value={form.price}
          onChange={(e) => handleChange("price", e.target.value)}
          required
        />
        <input
          placeholder="Duration"
          value={form.duration}
          onChange={(e) => handleChange("duration", e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Category"
          value={form.category}
          onChange={(e) => handleChange("category", e.target.value)}
          className="p-2 border rounded-md col-span-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
          className="p-2 border md:col-span-1 rounded-md"
        />
        <div className="md:col-span-1 mb-4">
          <input
            type="checkbox"
            id="isFeatured"
            checked={form.isFeatured}
            onChange={(e) => handleChange("isFeatured", e.target.checked)}
            className="h-4 w-4"
          />
          <label htmlFor="isFeatured" className="select-none">
            Mark as Featured
          </label>
        </div>

        <button
          type="submit"
          className="bg-indigo-600 col-span-2 text-white px-4 py-2 rounded"
        >
          Add Course
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
