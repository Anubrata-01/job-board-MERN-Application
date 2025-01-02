import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home";
import Auth from "./Components/Authentication/Auth";
import Hero from "./Components/HeroComponent/Hero";
import Jobs from "./Components/NavComponents/Jobs";
import {
  ProtectedRoute,
  RecruiterProtectedRoute,
} from "./utilities/ProtectedRoute";
import Recruiter from "./Components/Recruiter";
import { useAtom } from "jotai";
import { userDataAtom } from "./store/store";
import { memo } from "react";
import JobDetails from "./Components/NavComponents/JobDetails";
import Profile from "./Components/NavComponents/Profile";

const MemoiezedJobs = memo(Jobs);
function App() {
  const [userData] = useAtom(userDataAtom);
  const isAuth = (userData && userData?.profileType) || false;
  console.log(isAuth);
  const routes = createBrowserRouter([
    {
      path: "/auth",
      element: <Auth />,
    },
    {
      path: "/",
      element: (
        // <ProtectedRoute isAuth={isAuth}>
        <Home />
        // </ProtectedRoute>
      ),
      children: [
        {
          path: "",
          element: <Hero />,
        },
        {
          path: "jobs",
          element: <MemoiezedJobs />,
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute isAuth={isAuth}>
              <Profile />
            </ProtectedRoute>
          ),
        },
        {
          path: "jobs/:jobId", // Route with jobId as a parameter
          element: <JobDetails />,
        },
      ],
    },
    {
      path: "/recruiter",
      element: (
        <RecruiterProtectedRoute>
          <Recruiter />
        </RecruiterProtectedRoute>
      ),
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
