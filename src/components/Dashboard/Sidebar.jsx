import React from "react";
import { FaBook, FaHome, FaUser, FaUsers } from "react-icons/fa";
import { MdOutlineBookmarkAdd, MdOutlineBookmarkAdded, MdOutlineBookmarkBorder } from "react-icons/md";
import { Link, NavLink, Outlet } from "react-router";
import useRole from "../../hooks/useRole";
import Loader from "../Common/Loader";

const Sidebar = () => {
  const { role, roleLoading } = useRole();

  if (roleLoading) {
    return <Loader />;
  }
    
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <Link to="/" className="text-2xl font-bold  text-indigo-600">
            LearnHub
          </Link>
        </nav>
        {/* Page content here */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <NavLink
                to={"/dashboard"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                {/* Home icon */}
                <FaHome className="my-1.5 inline-block size-5" />
                <span className="is-drawer-close:hidden">Homepage</span>
              </NavLink>
            </li>
            {/* render all links for admin, limited set for normal users */}
            {role === "admin" ? (
              <>
                <li>
                  <NavLink
                    to={"/dashboard/enrolled-course"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Enrolled Course"
                  >
                    <MdOutlineBookmarkAdded className="my-1.5 inline-block size-5" />
                    <span className="is-drawer-close:hidden">
                      My Enrolled Course
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to={"/dashboard/add-course"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Add a Course"
                  >
                    <MdOutlineBookmarkAdd className="my-1.5 inline-block size-5" />
                    <span className="is-drawer-close:hidden">Add a Course</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to={"/dashboard/my-added-course"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Added Course"
                  >
                    <MdOutlineBookmarkBorder className="my-1.5 inline-block size-5" />
                    <span className="is-drawer-close:hidden">
                      My Added Course
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to={"/dashboard/all-users"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="All Users"
                  >
                    <FaUsers className="my-1.5 inline-block size-5" />
                    <span className="is-drawer-close:hidden">All Users</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to={"/dashboard/all-course"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="All Course"
                  >
                    <FaBook className="my-1.5 inline-block size-5" />
                    <span className="is-drawer-close:hidden">All Course</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to={"/dashboard/my-profile"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Profile"
                  >
                    <FaUser className="my-1.5 inline-block size-5" />
                    <span className="is-drawer-close:hidden">My Profile</span>
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to={"/dashboard/enrolled-course"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Enrolled Course"
                  >
                    <MdOutlineBookmarkAdded className="my-1.5 inline-block size-5" />
                    <span className="is-drawer-close:hidden">
                      My Enrolled Course
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to={"/dashboard/my-profile"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Profile"
                  >
                    <FaUser className="my-1.5 inline-block size-5" />
                    <span className="is-drawer-close:hidden">My Profile</span>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
