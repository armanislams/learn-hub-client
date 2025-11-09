import React from 'react';
import { createBrowserRouter } from 'react-router';
import Root from '../components/Root';
import Home from './Home';
import ErrorPage from './ErrorPage';
import PrivateRoute from '../Provider/PrivateRoute';
import AllCourses from './AllCourses';
import Login from './Login';
import Register from './Register';
import CourseDetails from './CourseDetails';
import { path } from 'framer-motion/client';
import UpdateCourse from './UpdateCourse';

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    // errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/*",
        Component: ErrorPage,
      },
      {
        // path: '/all-course',
        // element: <PrivateRoute>
        //     <AllCourses></AllCourses>
        // </PrivateRoute>
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
        path: "/course-details/:id",
        element: (
          <PrivateRoute>
            <CourseDetails></CourseDetails>
          </PrivateRoute>
        ),
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
]);
export default router;