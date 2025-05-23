import React from 'react';
import { createHashRouter } from "react-router-dom";
import {
  App,
  ErrorPage,
  ProjectPage,
  AllProjectsPage,
  StudentPage,
  AllStudentsPage,
  RootPage,
  AboutPage,
  MessagePage,
  RootAboutPage,
  TeamPage,
  DonorPage,
} from "../pages";

//const LazyAbout = React.lazy(()=> import("../pages/AboutPage.js"))

export const routes = [
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <App />,
        errorElement: <ErrorPage />,
      },
      {
        path: "projects",
        element: <AllProjectsPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "projects/:projectUrl",
        element: <ProjectPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "students",
        element: <AllStudentsPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "students/:studentUrl",
        element: <StudentPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "about",
        element: <RootAboutPage />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "",
            element: <AboutPage />
//          {<React.Suspense fallback="loading...">
//          <LazyAbout />
//          </React.Suspense>},
          },
          {
            path: "message",
            element: <MessagePage />,
          },
          {
            path: "donor",
            element: <DonorPage />,
          },
          {
            path: "team",
            element: <TeamPage />,
          },
        ],
      },
    ],
  },
];
const router = createHashRouter(routes);

export default router;
