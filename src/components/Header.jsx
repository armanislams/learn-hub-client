import React, { use } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { AuthContext } from "../Provider/AuthContext";

const Header = () => {
  const { user, logOut } = use(AuthContext);
    const location = useLocation();
    const navLinkClasses = ({ isActive }) =>
      `font-semibold px-3 py-2 transition-colors duration-200 ${
        isActive
          ? "bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500"
          : "text-gray-700 hover:bg-indigo-700 "
      }`;

  // Check if we are in the dashboard layout
  const isDashboard = location.pathname.startsWith("/dashboard");
  console.log(isDashboard);
  const links = (
    <>
      <li>
        <NavLink className={navLinkClasses} to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink className={navLinkClasses} to={"/all-course"}>Courses</NavLink>
      </li>
      <li>
        <NavLink className={navLinkClasses} to={"/dashboard"}>Dashboard</NavLink>
      </li>
    </>
  );
  const dashboard = (
    <>
      <li>
        <NavLink className={navLinkClasses} to={"/enrolled-course"}>
          My Enrolled Course
        </NavLink>
      </li>
      <li>
        <NavLink className={navLinkClasses} to={"/add-course"}>
          Add a Course
        </NavLink>
      </li>
      <li>
        <NavLink className={navLinkClasses} to={"/my-added-course"}>
          My Added Course
        </NavLink>
      </li>
    </>
  );
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {isDashboard ? dashboard : links}
            </ul>
          </div>
          <Link to="/" className="text-2xl font-bold text-indigo-600">
            LearnSphere
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {" "}
            {isDashboard ? dashboard : links}
          </ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <button
              onClick={logOut}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
