import React, { use, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { AuthContext } from "../Provider/AuthContext";

const Login = () => {
  const { setUser, GoogleLogin, signIn } = use(AuthContext);

  //   const navigate = useNavigate();
  //   const location = useLocation();
  const handleGLogin = () => {
    GoogleLogin()
      .then((result) => {
        const user = result.user;
        console.log(user);
        setUser(user);
        toast.success("Successfully Logged In With Google");
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch(() => {
        toast.error("Something Went Wrong. Please Try Again");
      });
  };
  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    signIn(email, password);
  };

  return (
    <div className="container mx-auto py-10 max-w-md">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form className="space-y-4 bg-white p-6 rounded shadow">
        <input placeholder="Email" className="p-2 border w-full" required />
        <input
          type="password"
          placeholder="Password"
          className="p-2 border w-full"
          required
        />
        <button className="bg-indigo-600 text-white px-4 py-2 rounded w-full">
          Login
        </button>
        <button
          onClick={handleGLogin}
          className="btn bg-white text-black w-full border-[#e5e5e5]"
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>
        <div className="text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-indigo-600">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
