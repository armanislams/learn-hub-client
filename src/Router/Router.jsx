import React from "react";
import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import AllCourses from "../pages/AllCourses";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CourseDetails from "../pages/CourseDetails";
import UpdateCourse from "../pages/UpdateCourse";
import AddCourse from "../pages/AddCourse";
import Dashboard from "../pages/Dashboard";
import MyCourses from "../pages/MyCourses";
import EnrolledCourses from "../pages/EnrolledCourses";
import HomeLayout from "../Layouts/HomeLayout";
import DashboardLayout from "../Layouts/DashboardLayout";
import ContactUs from "../pages/ContactUs";
import Loader from "../components/Common/Loader";
import MyProfile from "../pages/MyProfile";
import FAQ from "../pages/FAQ";
import AboutUs from "../pages/AboutUs";
import PrivateRoute from "../ProtectedRoutes/PrivateRoute";
import AllUsers from "../pages/AllUsers";
import AllCourse from "../pages/AdminPages/AllCourse";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    errorElement: <ErrorPage></ErrorPage>,
    HydrateFallback: <Loader></Loader>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/all-course",
        Component: AllCourses,
      },
      {
        path: "/contact-us",
        Component: ContactUs,
      },
      {
        path: "/about-us",
        Component: AboutUs,
      },
      {
        path: "/faq",
        Component: FAQ,
      },
      {
        path: "/course-details/:id",
        Component: CourseDetails
      },
      {
        path: "/update-course/:id",
        element: (
          <PrivateRoute>
            <UpdateCourse></UpdateCourse>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: Dashboard,
      },

      {
        path: "/dashboard/my-added-course",
        Component: MyCourses,
      },
      {
        path: "/dashboard/enrolled-course",
        Component: EnrolledCourses,
      },
      {
        path: "/dashboard/add-course",
       Component: AddCourse
      },
      {
        path: "/dashboard/my-profile",
       Component: MyProfile
      },
      {
        path: "/dashboard/all-users",
       Component: AllUsers
      },
      {
        path: "/dashboard/all-course",
       Component: AllCourse
      },
    ],
  },
]);
export default router;
