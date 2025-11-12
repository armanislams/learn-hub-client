import React, { use, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthContext";
import { toast } from "react-toastify";
import useTitle from "../hooks/useTitle";
import { Eye } from "lucide";

const Register = () => {
    useTitle('Register')
  const { createUser, setUser, updateUser, GoogleLogin } =
    use(AuthContext);
  const navigate = useNavigate();
  const [show, setShow] = useState(false)

  const regEx = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;

  const handleShow = () => {
    setShow(!show)
  }

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
  const handleCreateUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photo = e.target.photo.value;
    if (!regEx.test(password)) {
      toast.error("Please Check Your Password");
      return
    } else {
      createUser(email, password).then((result) => {
        const user = result.user;
        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
        navigate(`${location.state ? location.state : "/"}`);
          })
          .catch(() => {
            toast.error("Something Went Wrong, Please try again");
          });
      });
    }
  };

  return (
    <div className="container mx-auto py-10 max-w-md">
      <form
        onSubmit={handleCreateUser}
        className="space-y-4 bg-white p-6 rounded shadow"
      >
        <h2 className="text-2xl font-bold mb-6 text-black text-center">
          Register
        </h2>
        <input
          placeholder="Name"
          name="name"
          className="p-2 border w-full text-black"
          required
        />
        <input
          placeholder="Email"
          name="email"
          className="p-2 border w-full text-black"
          required
        />
        <input
          placeholder="Photo URL"
          name="photo"
          className="p-2 border w-full text-black"
        />
        <div className="relative">
          <input
            type={show ? "text" : "password"}
            placeholder="Password"
            name="password"
            className="p-2 border w-full text-black"
            required
          />
          <div
            onClick={handleShow}
            className="hover:cursor-pointer absolute top-3 right-3 text-black"
          >
            {show ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
        <p className="text-xs text-black">
          - Must have an Uppercase & Lowercase letter in the password <br />-
          Length must be at least 6 characters
        </p>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 font-semibold rounded w-full"
        >
          Register
        </button>
        {/* Google */}
        <button
          onClick={handleGLogin}
          className="btn  dark:bg-indigo-500 dark:text-white w-full border-[#e5e5e5]"
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
