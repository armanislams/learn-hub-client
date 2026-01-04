import React, { useState, useEffect } from "react";
import useTitle from "../hooks/useTitle";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import { FaEdit, FaUser, FaEnvelope, FaSave, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

const MyProfile = () => {
  useTitle("My Profile");
  const { user, updateUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    role: "",
  });

  // Fetch user profile data
  const { data: profileData = {}, refetch } = useQuery({
    queryKey: ["userProfile", user?.email],
    queryFn: async () => {
      if (!user?.email) return {};
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Sync formData with profileData when it loads
  useEffect(() => {
    if (profileData && Object.keys(profileData).length > 0) {
      setFormData({
        name: profileData.name || "",
        email: profileData.email || "",
        photoURL: profileData.photoURL || "",
        role: profileData.role || "",
      });
    }
  }, [profileData]);

  // Update profile mutation
  const { mutate: updateProfile, isLoading } = useMutation({
    mutationFn: async (updatedData) => {
      return await axiosSecure.patch(`/users/${profileData.email}`, updatedData);
    },
    onSuccess: () => {
      setIsEditing(false);
      refetch();
      toast.success("Profile updated successfully!");
    },
    onError: (error) => {
      toast.error("Failed to update profile. Please try again.");
      console.error("Update error:", error);
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

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data to original profile data
    if (profileData && Object.keys(profileData).length > 0) {
      setFormData({
        name: profileData.name || "",
        email: profileData.email || "",
        photoURL: profileData.photoURL || "",
        role: profileData.role || "",
      });
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-base-100 rounded-lg shadow-lg overflow-hidden">
          {/* Profile Header with Cover */}
          <div className="bg-linear-to-r from-indigo-600 to-purple-600 h-32"></div>

          <div className="px-8 pb-8">
            {/* Profile Avatar and Basic Info */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 mb-6">
              <div className="flex flex-col md:flex-row md:items-end gap-4">
                <div className="avatar">
                  <div className="w-32 h-32 rounded-full ring ring-base-100 ring-offset-2 bg-base-100">
                    <img
                      src={
                        formData.photoURL ||
                        user?.photoURL ||
                        "https://via.placeholder.com/150"
                      }
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="mb-2">
                  <h1 className="text-3xl font-bold text-base-content">
                    {formData.name || user?.displayName || "User"}
                  </h1>
                  <p className="text-gray-500 flex items-center gap-2 mt-1">
                    <FaEnvelope className="text-sm" />
                    {user?.email}
                  </p>
                  {formData.role && (
                    <span className="badge badge-indigo mt-2 capitalize">
                      {formData.role}
                    </span>
                  )}
                </div>
              </div>

              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn btn-indigo gap-2 mt-4 md:mt-0"
                >
                  <FaEdit />
                  Edit Profile
                </button>
              )}
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

            {/* Profile Content */}
            {!isEditing ? (
              <div className="space-y-6">
                {/* Profile Information */}
                <div>
                  <h2 className="text-xl font-bold mb-3">Profile Information</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                      <FaUser className="text-indigo-600" />
                      <div>
                        <p className="text-sm text-gray-500">Full Name</p>
                        <p className="font-semibold">{formData.name || "Not provided"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                      <FaEnvelope className="text-indigo-600" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-semibold">{formData.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

                <div className="space-y-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Full Name *</span>
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
                      className="input input-bordered bg-base-200"
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
                      placeholder="https://example.com/photo.jpg"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-indigo flex-1 gap-2"
                  >
                    <FaSave />
                    {isLoading ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="btn btn-ghost flex-1 gap-2"
                  >
                    <FaTimes />
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
