import React, { use} from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../Provider/AuthContext";
import ThemeControl from "../ThemeControl";
import LoginBtn from "./LoginBtn";

const Header = () => {
   const { user} = use(AuthContext);

  // navlink class
    const navLinkClasses = ({ isActive }) =>
      `font-semibold px-3 py-2 text-base-content transition-colors duration-200 ${
        isActive
          ? "bg-indigo-600  px-4 py-2 rounded-lg text-white hover:bg-indigo-500"
          : " hover:bg-indigo-700"
      }`;
//nav links
  const links = (
    <>
      <li>
        <NavLink className={navLinkClasses} to={"/"}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink className={navLinkClasses} to={"/all-course"}>
          All Courses
        </NavLink>
      </li>
      <li>
        <NavLink className={navLinkClasses} to={"/contact-us"}>
          Contact Us
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink className={navLinkClasses} to={"/dashboard"}>
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );
 
  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50 md:px-15">
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
            {links}
            <div className="flex justify-around mt-4">
              <LoginBtn />
              <ThemeControl />
            </div>
          </ul>
        </div>
        <div>
          <Link to="/" className="text-2xl font-bold  text-indigo-600">
            LearnHub
          </Link>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1"> {links}</ul>
      </div>

      <div className="navbar-end mr-5 hidden lg:flex gap-5">
        <ThemeControl />
        <LoginBtn />
      </div>
    </div>
  );
};

export default Header;
