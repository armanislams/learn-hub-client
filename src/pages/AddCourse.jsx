// src/pages/AddCourse.jsx
import React, { useState } from "react";
import api from "../api/api";
import { toast } from "react-hot-toast";

const AddCourse = ({ user }) => {
  const [form, setForm] = useState({
    title: "",
    imageUrl: "",
    price: "",
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
      await api.post("/courses", form);
      toast.success("Course added!");
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
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={form.isFeatured}
            onChange={(e) => handleChange("isFeatured", e.target.checked)}
          />
          <span>Featured</span>
        </label>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Add Course
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
