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
        <select
          value={form.category}
          onChange={(e) => handleChange("category", e.target.value)}
          className="p-2 border rounded-md col-span-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select Category</option>
          <option value="Web Development">Web Development</option>
          <option value="Design">Design</option>
          <option value="Data Science">Data Science</option>
          <option value="Marketing">Marketing</option>
          <option value="Business">Business</option>
        </select>

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
