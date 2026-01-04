import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router";
import { toast } from "react-toastify";
import useTitle from "../hooks/useTitle";
import useAxios from "../hooks/UseAxios";
import useAuth from "../hooks/useAuth";
import GoogleLoginBtn from "../components/Common/GoogleLoginBtn";
import { useForm } from "react-hook-form";

const Register = () => {
  useTitle("Register");
  const { createUser, setUser, updateUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const AxiosInstance = useAxios();


  const handleShow = () => setShow((s) => !s);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm();

  const from = location.state || location.state?.from || "/";

  const onSubmit = async (values) => {
    const { name, email, password, photo } = values;
    setSubmitting(true);
    try {
      const result = await createUser(email, password);
      const user = result.user;

      // Persist to backend (best-effort)
      try {
        await AxiosInstance.post("/users", { name, email, photo, providerId: user?.providerId });
      } catch (dbErr) {
        console.error("Failed to save user to DB", dbErr);
      }

      // Update displayName and photo
      try {
        await updateUser({ displayName: name, photoURL: photo });
        setUser({ ...user, displayName: name, photoURL: photo });
      } catch (updateErr) {
        console.error("Failed to update user profile", updateErr);
      }

      toast.success("Registration successful");
      reset();
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      const msg = err?.message || "Registration failed. Please try again.";
      toast.error(msg);
      setError("email", { type: "server", message: msg });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-10 max-w-md">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-white p-6 rounded shadow"
        noValidate
      >
        <h2 className="text-2xl font-bold mb-6 text-black text-center">
          Register
        </h2>

        <div>
          <input
            placeholder="Full name"
            {...register("name", { required: "Name is required" })}
            className={`p-2 border w-full text-black ${
              errors.name ? "border-red-500" : ""
            }`}
          />
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <input
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                message: "Enter a valid email",
              },
            })}
            className={`p-2 border w-full text-black ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            placeholder="Photo URL (optional)"
            {...register("photo", {
              pattern: {
                value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))?$/i,
                message: "Enter a valid image URL",
              },
            })}
            className={`p-2 border w-full text-black ${
              errors.photo ? "border-red-500" : ""
            }`}
          />
          {errors.photo && (
            <p className="text-sm text-red-500 mt-1">{errors.photo.message}</p>
          )}
        </div>

        <div className="relative">
          <input
            type={show ? "text" : "password"}
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value: /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/,
                message:
                  "Must include uppercase & lowercase letters and be at least 6 characters",
              },
            })}
            className={`p-2 border w-full text-black ${
              errors.password ? "border-red-500" : ""
            }`}
          />
          <div
            onClick={handleShow}
            className="hover:cursor-pointer absolute top-3 right-3 text-black"
            role="button"
            tabIndex={0}
            aria-label={show ? "Hide password" : "Show password"}
          >
            {show ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
        {errors.password && (
          <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
        )}


        <button
          type="submit"
          disabled={submitting}
          className="bg-indigo-600 text-white px-4 py-2 font-semibold rounded w-full"
        >
          {submitting ? "Creating account..." : "Register"}
        </button>

        {/* Google sign-in */}
        <GoogleLoginBtn />

        <div className="text-black text-sm">
          Already have an account?{" "}
          <Link to="/login" className=" text-indigo-600">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
