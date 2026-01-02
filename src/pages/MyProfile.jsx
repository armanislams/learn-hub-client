import React, { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthContext";
import useTitle from "../hooks/useTitle";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";

const MyProfile = () => {
  useTitle("My Profile");
  const { user, updateUserProfile } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    photoURL: user?.photoURL || "",
    phone: "",
    bio: "",
  });

  // Fetch user profile data
  const { data: profileData = {} } = useQuery({
    queryKey: ["userProfile", user?.email],
    queryFn: async () => {
      if (!user?.email) return {};
      const res = await axiosSecure.get(`/user/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Update profile mutation
  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: async (updatedData) => {
      await updateUserProfile(updatedData.name, updatedData.photoURL);
      return await axiosSecure.patch(`/user/${user.email}`, updatedData);
    },
    onSuccess: () => {
      setIsEditing(false);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
  };

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-base-100 rounded-lg shadow-lg p-8">
          {/* Profile Header */}
          <div className="text-center mb-8">
            <div className="avatar mb-4">
              <div className="w-32 rounded-full ring ring-indigo-500 ring-offset-2">
                <img
                  src={
                    formData.photoURL ||
                    user?.photoURL ||
                    "https://via.placeholder.com/150"
                  }
                  alt="Profile"
                  className="w-full"
                />
              </div>
            </div>
            <h1 className="heading text-3xl mb-2">
              {formData.name || user?.displayName || "User"}
            </h1>
            <p className="text-gray-500">{user?.email}</p>
          </div>

          {/* Profile Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-indigo-50 dark:bg-indigo-900 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-indigo-600">
                {profileData?.enrolledCourses || 0}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Enrolled Courses
              </p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">
                {profileData?.addedCourses || 0}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Added Courses
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-green-600">
                {profileData?.learningHours || 0}h
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Learning Hours
              </p>
            </div>
          </div>

          {/* Profile Form */}
          {!isEditing ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Profile Information</h2>
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn btn-sm btn-indigo"
                >
                  Edit Profile
                </button>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-semibold">{formData.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-semibold">{formData.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-semibold">{formData.phone || "Not added"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Bio</p>
                  <p className="font-semibold">{formData.bio || "Not added"}</p>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Full Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Email</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  className="input input-bordered"
                  disabled
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Photo URL</span>
                </label>
                <input
                  type="url"
                  name="photoURL"
                  value={formData.photoURL}
                  onChange={handleChange}
                  className="input input-bordered"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Phone</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input input-bordered"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Bio</span>
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="textarea textarea-bordered"
                  rows="4"
                ></textarea>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="submit"
                  disabled={isPending}
                  className="btn btn-indigo flex-1"
                >
                  {isPending ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="btn btn-ghost flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
