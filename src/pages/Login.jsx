import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router";
import { toast } from "react-toastify";
import useTitle from "../hooks/useTitle";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import GoogleLoginBtn from "../components/Common/GoogleLoginBtn";
import { useForm } from "react-hook-form";

const Login = () => {
  useTitle("Login");
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const handleShow = () => {
    setShow(!show);
  };

  // react-hook-form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const from = (location?.state || location?.state?.from) || "/";

  // user login (react-hook-form)
  const onSubmit = async (values) => {
    setSubmitting(true);
    try {
      await signIn(values.email, values.password);
      navigate(from, { replace: true });
    } catch (err) {
      const msg = err?.message || "Email or password doesn't match.";
      toast.error(msg);
      // set form error for accessibility
      setError("email", { type: "server", message: "" });
    } finally {
      setSubmitting(false);
    }
  };
  //demo login
  const handleDemoSignIn = () => {
    const email = "demo@learn-hub.com";
    const password = "@learnHub";
    signIn(email, password).then(() => {
      navigate(`${location.state ? location.state : "/"}`);
    });
  };

  return (
    <div className="container mx-auto py-10 max-w-md">
      <div className="bg-white p-6 rounded shadow space-y-4">
        <h2 className="text-2xl font-bold mb-6 text-black text-center">
          Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 rounded shadow">
          <div>
            <input
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
              className={`p-2 border w-full text-black ${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="relative">
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
              className={`p-2 border w-full text-black ${errors.password ? "border-red-500" : ""}`}
            />
            <div>
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
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="bg-indigo-600 text-white font-semibold px-4 py-2 rounded w-full"
          >
            {submitting ? "Signing in..." : "Login"}
          </button>
        </form>
        {/* google login */}
        <GoogleLoginBtn/>
        <button
          onClick={handleDemoSignIn}
          type="submit"
          className="bg-indigo-600 text-white font-semibold px-4 py-2 rounded w-full"
        >
          Demo User Login
        </button>
        <div className="text-black text-sm">
          Don't have an account?{" "}
          <Link to="/register" className=" text-indigo-600">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
