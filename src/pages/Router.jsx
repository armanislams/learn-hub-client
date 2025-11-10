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
import UpdateCourse from './UpdateCourse';
import AddCourse from './AddCourse';
import Dashboard from './Dashboard';

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
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
      {
        path: "/add-course",
        element: (
          <PrivateRoute>
            <AddCourse></AddCourse>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
export default router;