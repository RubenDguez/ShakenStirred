import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import LandingPage from "../pages/Landing";

export const router = createBrowserRouter([
    {
      path: '/',
      element: <LandingPage />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <LandingPage />
        }, 
      ]
    }
  ])
