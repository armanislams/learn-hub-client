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
    imageUrl: "",
    price: "",
    duration: "",
    category: "",
    description: "",
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
      toast.error("Failed to add course");
    }
  };

  return (
    <div className="container mx-auto py-10">
      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 gap-6 bg-white p-6 rounded shadow"
      >
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
          className="p-2 border"
          required
        />
        <input
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={(e) => handleChange("imageUrl", e.target.value)}
          className="p-2 border"
          required
        />
        <input
          placeholder="Price"
          value={form.price}
          onChange={(e) => handleChange("price", e.target.value)}
          className="p-2 border"
          required
        />
        <input
          placeholder="Duration"
          value={form.duration}
          onChange={(e) => handleChange("duration", e.target.value)}
          className="p-2 border"
        />
        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) => handleChange("category", e.target.value)}
          className="p-2 border"
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
          className="p-2 border md:col-span-2"
        />

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
